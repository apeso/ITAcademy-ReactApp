import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/UserContext.jsx';
import { updateUser } from '../../firebase/CRUD_User.jsx';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    CircularProgress,
    IconButton,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Alert,
    AlertTitle
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SuccessModal from './SuccessModal';

const ProfileUpdateForm = () => {
    const navigate = useNavigate();
    const { user, setUsersData } = useAuth();

    const [ID, setID] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [github, setGithub] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (user) {
          setID(user.ID);
          setName(user.name);
          setSurname(user.surname);
          setEmail(user.email);
          setPhoneNumber(user.phoneNumber);
          setGender(user.gender);
          setLinkedin(user.linkedin);
          setGithub(user.github);
          setProfileImage(user.profileImage);
        }
      }, [user]);
      

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            setProfileImage(fileReader.result);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const updatedUserData = {
                ID: ID,
                name: name,
                surname: surname,
                email: email,
                role: "user",
                profileImage: profileImage,
                phoneNumber: phoneNumber,
                gender: gender,
                linkedin: linkedin,
                github: github,
            };
            await updateUser(ID, updatedUserData);
            setUsersData(ID);
            setIsLoading(false);
            setOpenModal(true);
            navigate('/profile');
        } catch (error) {
            setIsLoading(false);
            setErrorMessage(error.message);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                p={3}
                borderRadius={2}
                textAlign="center"
                sx={{ backgroundColor: 'white', border: '1px solid #ddd'}}
            >
                <Typography variant="h5" color="primary" component="h1" gutterBottom>
                    Edit Profile
                </Typography>
                <form onSubmit={handleSubmit} noValidate>
                    <Box sx={{ position: 'relative', width: '100%', marginBottom: 2 }}>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="icon-button-file"
                            type="file"
                            onChange={handleProfileImageChange}
                        />
                        <label htmlFor="icon-button-file" style={{ position: 'absolute',bottom:0, right: 0 }}>
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                            >
                                <PhotoCameraIcon />
                            </IconButton>
                            
                        </label>
                        <img src={profileImage} alt="Profile" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                    </Box>
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
                        fullWidth
                        id="phoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => {
                            const re = /^[0-9\b]+$/;
                            if (e.target.value === '' || re.test(e.target.value)) {
                                setPhoneNumber(e.target.value);
                            }
                        }}
                        variant="outlined"
                    />
                    <Box sx={{ width: '50%', textAlign: 'left' }}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="gender-label">Gender</InputLabel>
                            <Select
                                labelId="gender-label"
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                label="Gender"
                            >
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Do not identify">Do not identify</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="linkedin"
                        label="LinkedIn"
                        name="linkedin"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        variant="outlined"
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="github"
                        label="GitHub"
                        name="github"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        variant="outlined"
                    />
                    {errorMessage && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            <AlertTitle>Error</AlertTitle>
                            {errorMessage}
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        sx={{ mt: 3 }}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Update Profile'}
                    </Button>
                </form>
                <SuccessModal open={openModal} handleClose={handleCloseModal} />
            </Box>
        </Container>
    );
};

export default ProfileUpdateForm;
