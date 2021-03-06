import { Alert, Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ImGooglePlus3 } from 'react-icons/im'
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';


const imgUrl = 'https://i.ibb.co/TcTnn4c/login.jpg'
const styles = {
    paperContainer: {
        backgroundImage: `url(${imgUrl})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
    },
    googleStyle: {
        background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,40,29,1) 50%, rgba(252,176,69,1) 100%)',
        border: 0,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        margin: "auto",
        borderRadius: "50px",
    },
    submitBtn: {
        background: 'linear-gradient(45deg, #27b1fc 30%, #57e2ff 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        width: "120px",
        margin: "auto",
    },
};



const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const { googleSignIn, createUser, error, success } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    // submit data
    const handleSubmit = (e) => {
        e.preventDefault()
        createUser(email, password, name, navigate, location)

        e.target.reset()

    }

    // google login
    const handleGoogle = () => {
        googleSignIn(location, navigate)
    }

    return (
        <Box style={styles.paperContainer} sx={{
            minHeight: '100vh', display: "flex", alignItems: "center", justifycontent: "center", pt: 10, pb: 5
        }} className='login' >
            < Box sx={{
                maxWidth: '500px', width: "90%", background: "#fff", margin: "auto", padding: "30px", borderRadius: "5px", textAlign: "center"
            }}>
                <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>Registration Form</Typography>

                {/* main form */}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Your Name"
                        placeholder="Type Name.."
                        type='text'
                        required
                        sx={{ width: "100%", my: 1 }}
                        onBlur={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Your Email"
                        placeholder="Type Email.."
                        type='email'
                        required
                        sx={{ width: "100%", my: 1 }}
                        onBlur={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        placeholder="Type Password.."
                        type="password"
                        required
                        sx={{ width: "100%", my: 1 }}
                        onBlur={(e) => setPassword(e.target.value)}
                    />

                    {/* submit button */}
                    <Button style={styles.submitBtn} sx={{ mt: 1 }} type="submit" variant="contained">Register</Button>
                </form>

                <Typography sx={{ textAlign: "center", my: 2 }}>----------OR----------</Typography>

                {/* google login */}
                <Button onClick={handleGoogle} style={styles.googleStyle} variant="contained"><ImGooglePlus3 style={{ fontSize: "20px", marginRight: "5px" }} />Google Sing In</Button>

                {/* show error */}
                {
                    error.length ? <Alert sx={{ mt: 2 }} severity="error">{error}</Alert> : ''
                }
                {
                    success ? <Alert sx={{ mt: 2 }} onClose={() => { }}> Successfully created user</Alert> : ''
                }
            </Box >
        </Box >
    );
};

export default Register;