import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { getUserByID } from '../firebase/CRUD_User';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user,setUser] =useState(null);

  async function initializeUser(u) {
    if (u) {
      setCurrentUser({ ...u });
      setUserLoggedIn(true);
      const userData = await setUsersData(u.uid);
      setIsAdmin(userData?.email === "admin@admin.com");
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
      setIsAdmin(false);
    }
    setLoading(false);
  }
  
  async function setUsersData(id) {
    try {
      const userData = await getUserByID(id);
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return () => unsubscribe();
  }, []);
  
 
  const value = {
    userLoggedIn,
    currentUser,
    setCurrentUser,
    isAdmin,
    setIsAdmin,
    user,
    setUsersData
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
}

export const useAuth = () => useContext(UserContext);