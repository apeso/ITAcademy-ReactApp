import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext.jsx';
import { Box, Button, Container ,Typography} from '@mui/material';
import ProfileUpdateForm from '../components/UserProfile/ProfileUpdateForm';
import PasswordChangeForm from '../components/UserProfile/PasswordChangeForm';
import '../style/UserProfile.css';

const UserProfile = () => {
  const { userLoggedIn ,setIsAdmin } = useAuth();


  return (
    <div className='pageUserProfile'>
      {!userLoggedIn && <Navigate to="/login" replace={true} />}
      <div className='updateProfile-section'>
     <ProfileUpdateForm />
     </div>
     <div className='changePass-section'>
      <PasswordChangeForm />
      </div>
      
      
  </div>
  );
};

export default UserProfile;
