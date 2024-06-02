import { firestore } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc,setDoc, updateDoc, doc, getDoc } from 'firebase/firestore/lite';


export const getUsers = async () => {
  const usersCollection = collection(firestore, 'users');
  const usersSnapshot = await getDocs(usersCollection);
  return usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getUserByID = async (userID) => {
  const usersRef = doc(firestore, 'users', userID);
  const userSnapshot = await getDoc(usersRef);

  if (!userSnapshot.exists()) {
    throw new Error('Korisnik ne postoji.');
  }

  return { id: userSnapshot.id, ...userSnapshot.data() };
};

export const createUser = async (userID, formData) => {
  await setDoc(doc(firestore, 'users', userID), formData);
};

export const deleteUser = async (userID) => {
  const userRef = doc(firestore, 'users', userID);
  await deleteDoc(userRef);
};

export const updateUser = async (userID, updatedUserData) => {
  const userRef = doc(firestore, 'users', userID);
  await updateDoc(userRef, updatedUserData);
  console.log('Korisnik uspješno ažuriran!');
};




