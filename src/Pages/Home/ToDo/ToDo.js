import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const ToDo = (props) => {
    const styles = {

        deleteBtn: {
            background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,40,29,1) 50%, rgba(252,176,69,1) 100%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: 35,
            padding: '0 30px',
            width: "80px",
            margin: "0 5px",
        },
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

    // destructuring
    const { taskName, desc, deadLine, _id } = props.todo;
    const { handleDelete } = props;


    return (
        <Grid item xs={4} sm={4} md={6} xl={4} sx={{ marginBottom: '40px' }}>
            <Card sx={{ minWidth: 275, border: 0, boxShadow: 3 }}>

                <CardContent>
                    <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }} gutterBottom>
                        Task:{taskName}
                    </Typography>
                    <Typography sx={{ fontSize: 15, textAlign: 'center', color: '#F63E7B', fontWeight: 'bold' }} gutterBottom>
                        Deadline: {deadLine}
                    </Typography>

                    <Typography sx={{ fontSize: 14, mb: 1.5, textAlign: 'center' }} color="text.secondary">
                        <span style={{ fontWeight: 'bold' }}>Description:</span> {desc}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box>
                            <Button style={styles.updateBtn}>Update</Button>
                        </Box>
                        <Box>
                            <Button onClick={() => handleDelete(_id)} style={styles.deleteBtn}>Delete</Button>
                        </Box>
                    </Box>

                </CardContent>
            </Card>
        </Grid>
    );
};

export default ToDo;