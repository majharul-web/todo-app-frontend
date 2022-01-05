import { Alert, Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ImGooglePlus3 } from 'react-icons/im'
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';

const imgUrl = 'https://i.ibb.co/pj9XcHW/insert.jpg'
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

const AddToDo = () => {
    const { user } = useAuth();

    // all State
    const [newToDoData, setNewToDoData] = useState({});
    const [success, setSuccess] = useState('');

    // get data from form
    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        newToDoData[field] = value;
        setNewToDoData(newToDoData);

    }

    // send data backend
    const handleSubmit = e => {
        e.preventDefault();

        axios.post('http://localhost:5000/addTodo', newToDoData)
            .then(res => {
                const success = res.data.insertedId;
                if (success) {
                    setSuccess('Add Success');
                    e.target.reset();
                }
            })
    }

    return (
        <Box style={styles.paperContainer} sx={{
            minHeight: '100vh', display: "flex", alignItems: "center", justifycontent: "center", pt: 10, pb: 5
        }} className='addTodo' >
            < Box sx={{
                maxWidth: '500px', width: "90%", background: "#fff", margin: "auto", padding: "30px", borderRadius: "5px", textAlign: "center"
            }}>
                <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>Add ToDo</Typography>

                <Box sx={{ textAlign: 'center' }}>
                    {
                        success &&
                        <Alert severity="success">{success}</Alert>
                    }
                </Box>

                {/* form */}
                <form onSubmit={handleSubmit}>
                    <TextField
                        sx={{ my: 1 }}
                        fullWidth label="name"
                        id="fullWidth"
                        value={user.displayName || ''}
                        name='userName'
                        autoFocus

                        onBlur={handleOnBlur}
                    />
                    <TextField
                        sx={{ my: 1 }}
                        fullWidth label="Email"
                        id="fullWidth"
                        type='email'
                        value={user.email || ''}
                        name='userEmail'
                        autoFocus

                        onBlur={handleOnBlur}
                    />
                    <TextField
                        label="Task Name"
                        placeholder="Task Name.."
                        name='taskName'
                        required
                        type='text'
                        sx={{ width: "100%", my: 1 }}
                        onBlur={handleOnBlur}
                    />
                    <TextField
                        sx={{ my: 1 }}
                        fullWidth label=""
                        id="fullWidth"
                        required
                        type='date'
                        name='date'
                        onBlur={handleOnBlur}
                    />

                    <TextField
                        sx={{ my: 1 }}
                        rows={4}
                        required
                        multiline
                        fullWidth
                        label="Description"
                        id="fullWidth"
                        name='desc'
                        onBlur={handleOnBlur}
                    />
                    {/* submit button */}
                    <Button style={styles.submitBtn} sx={{ mt: 1 }} type="submit" variant="contained">Add</Button>
                </form>


            </Box >
        </Box >
    );
};

export default AddToDo;