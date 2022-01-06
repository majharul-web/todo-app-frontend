import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import useAuth from '../../../hooks/useAuth';

const style = {
    modalStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }
    ,
    updateBtn: {
        background: 'linear-gradient(45deg, #27b1fc 30%, #57e2ff 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 35,
        padding: '0 30px',
        width: "80px",
        margin: "0 5px",
    }
};

const UpdateModal = (props) => {
    const { open, handleClose, children } = props;
    const { userName, userEmail, taskName, deadLine, desc, _id } = children[1];
    // const { user } = useAuth();

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
        console.log(newToDoData)

        fetch(`http://localhost:5000/update/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            }
            ,
            body: JSON.stringify(newToDoData)
        })
            .then()

    }


    return (
        <Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style.modalStyle}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Update Todo {userName}
                        </Typography>


                        {/* form */}
                        <form onSubmit={handleSubmit} >
                            <TextField
                                sx={{ my: 1 }}
                                fullWidth label="name"
                                id="fullWidth"
                                value={userName}
                                name='userName'
                                autoFocus
                                onBlur={handleOnBlur}
                            />
                            <TextField
                                sx={{ my: 1 }}
                                fullWidth label="Email"
                                id="fullWidth"
                                type='email'
                                name='userEmail'
                                autoFocus
                                value={userEmail}
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
                                defaultValue={taskName}
                                autoFocus
                            />
                            <TextField
                                sx={{ my: 1 }}
                                fullWidth label=""
                                id="fullWidth"
                                required
                                type='date'
                                name='deadLine'
                                onBlur={handleOnBlur}
                                defaultValue={deadLine}
                                autoFocus
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
                                defaultValue={desc}
                                autoFocus
                            />

                            <Button type='submit' style={style.updateBtn}>Update</Button>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </Box >
    );
};

export default UpdateModal;