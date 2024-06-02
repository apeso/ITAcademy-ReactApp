import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/UserContext.jsx';
import { doCreateUserWithEmailAndPassword } from '../../auth.js';
import { createUser } from '../../firebase/CRUD_User.jsx';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    CircularProgress,
    IconButton
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CheckIcon from '@mui/icons-material/Check';
import ContactInfo from '../Home/ContactInfo.jsx';

const Register = () => {
    const navigate = useNavigate();
    const { userLoggedIn,user } = useAuth();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            setProfileImage(fileReader.result);
        };
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                console.log("tu");
                const userID =await doCreateUserWithEmailAndPassword(email, password);
                
                console.log(userID);
                const formData = {
                    ID: userID,
                    name: name,
                    surname: surname,
                    email: email,
                    role: "user",
                    profileImage: profileImage,
                    phoneNumber:"",
                    gender:"",
                    linkedin:"",
                    github:"",
                };
                await createUser(userID, formData);
                setIsRegistering(false);
                navigate('/profile');
            } catch (error) {
                setIsRegistering(false);
                setErrorMessage(error.message);
            }
        }
    };
    

    return (
        <>
        <Container maxWidth="sm" sx={{ height: '115vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {userLoggedIn && (<Navigate to={'/profile'} replace={true} />)}

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                p={3}
                borderRadius={2}
                textAlign="center"
                sx={{ backgroundColor: 'white', border: '1px solid #ddd'}}
            >
                <Typography variant="h5" color="primary" component="h1" gutterBottom>
                    Create a New Account
                </Typography>
                <form onSubmit={onSubmit} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="surname"
                        label="Surname"
                        name="surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        variant="outlined"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        disabled={isRegistering}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="off"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        variant="outlined"
                        disabled={isRegistering}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mt: 2,
                            mb: 2,
                            justifyContent: 'center'
                        }}
                    >
                        <IconButton
                            component="label"
                            sx={{ color: 'primary.main' }}
                        >
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleProfileImageChange}
                            />
                            <PhotoCamera />
                        </IconButton>
                        <Typography variant="body2" color="textSecondary">
                            Upload Profile Image
                        </Typography>
                    </Box>
                    {profileImage && (
                        
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                           <CheckIcon/> Image is uploaded 
                        </Typography>
                    )}
                    {errorMessage && (
                        <Typography color="error" variant="body2">
                            {errorMessage}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isRegistering}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {isRegistering ? <CircularProgress size={24} /> : 'Sign Up'}
                    </Button>
                </form>
                <Typography variant="body2" color="textSecondary" align="center">
                    Already have an account? <Link to="/login" style={{ color: 'primary.main' }}>Login</Link>
                </Typography>
            </Box>
        </Container>
        <ContactInfo />
        </>
    );
};

export default Register;

