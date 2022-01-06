import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import ToDo from '../ToDo/ToDo';

const ShowToDo = () => {
    const { user } = useAuth();
    const [todos, setTodos] = useState([]);
    const [isDeleted, setIsDeleted] = useState(null);

    useEffect(() => {
        fetch(`https://tranquil-crag-67673.herokuapp.com/todo/${user.email}`)
            .then(res => res.json())
            .then(data => setTodos(data))
    }, [user.email, isDeleted]);

    // delete
    const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure to Delete');
        if (proceed) {
            fetch(`https://tranquil-crag-67673.herokuapp.com/todo/delete/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(result => {
                    if (result.deletedCount) {
                        alert('delete success');
                        // const remaining = products.filter(product => product._id !== id);
                        // setProducts(remaining)
                        setIsDeleted(true);
                    }
                    else {
                        setIsDeleted(false)
                    }
                });
        }

    }

    return (
        <Box>
            <Typography style={{ fontSize: '1.5rem', textAlign: 'center', textDecoration: 'underline' }}> My <span style={{ color: '#F63E7B' }}>Todo</span></Typography>
            <Container>
                <Box sx={{ flexGrow: 1, mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 4, md: 12, xl: 12 }}>
                        {
                            todos.map(todo => <ToDo key={todo._id} todo={todo} handleDelete={handleDelete}></ToDo>)
                        }
                    </Grid>
                </Box>

            </Container>
        </Box>
    );
};

export default ShowToDo;