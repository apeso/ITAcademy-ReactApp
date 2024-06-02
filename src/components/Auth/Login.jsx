import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword } from '../../auth.js';
import { useAuth} from '../../context/UserContext.jsx';
import ContactInfo from '../Home/ContactInfo';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    CircularProgress
} from '@mui/material';

const Login = () => {
    const { userLoggedIn } = useAuth();
    const {setIsAdmin} =useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
                if(email=="admin@admin.com"){
                    setIsAdmin(true);
                }
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setIsSigningIn(false);
            }
        }
    };

    return (
        <>
        <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {userLoggedIn && (<Navigate to={'/'} replace={true} />)}

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                boxShadow={3}
                p={3}
                borderRadius={2}
                textAlign="center"
                sx={{ border: '1px solid #ddd', bgcolor: 'white' }}
            >
                <Typography variant="h5" component="h1" color="black" gutterBottom>
                    Welcome!
                </Typography>
                <form onSubmit={onSubmit} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
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
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                    />
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
                        disabled={isSigningIn}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {isSigningIn ? <CircularProgress size={24} /> : 'Sign In'}
                    </Button>
                </form>
                <Typography variant="body2" color="textSecondary" align="center">
                    Don't have an account? <Link to="/register" style={{ color: 'blue' }}>Register now</Link>
                </Typography>
            </Box>
        </Container>
         <ContactInfo />
        </>
    );
};

export default Login;
