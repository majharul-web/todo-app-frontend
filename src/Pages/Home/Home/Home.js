import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Outlet } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

// import { NavLink, Outlet, Link } from 'react-router-dom';

const drawerWidth = 250;

const Home = (props) => {

    const { user, singOutUser } = useAuth();

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Typography sx={{ textAlign: 'center' }} variant="h5" component="div">
                {user.displayName}
            </Typography>
            <Divider />
            <List sx={{ mx: 2 }}>
                {/* conditional rendering */}

                {
                    user.email ?
                        <Box>

                            <Link to='showTodo' style={{ textDecoration: 'none' }}>
                                <ListItem button style={{ background: 'linear-gradient(45deg, #27b1fc 30%, #57e2ff 90%)', marginTop: '5px', color: 'white' }} >
                                    <ListItemIcon></ListItemIcon>
                                    <ListItemText >My ToDo</ListItemText>
                                </ListItem>
                            </Link>

                            <Link to='addTodo' style={{ textDecoration: 'none' }}>
                                <ListItem button style={{ background: 'linear-gradient(45deg, #27b1fc 30%, #57e2ff 90%)', marginTop: '15px', color: 'white' }} >
                                    <ListItemIcon></ListItemIcon>
                                    <ListItemText >Add ToDo</ListItemText>
                                </ListItem>
                            </Link>

                            {/* logout */}

                            <ListItem button onClick={singOutUser} style={{ background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,40,29,1) 50%, rgba(252,176,69,1) 100%)', marginTop: '15px', color: 'white' }} >
                                <ListItemIcon></ListItemIcon>
                                <ListItemText >Logout</ListItemText>
                            </ListItem>

                        </Box>
                        :
                        <Box>

                            <Link to='login' style={{ textDecoration: 'none' }}>
                                <ListItem button style={{ background: 'linear-gradient(45deg, #27b1fc 30%, #57e2ff 90%)', marginTop: '15px', color: 'white' }} >
                                    <ListItemIcon></ListItemIcon>
                                    <ListItemText >Login</ListItemText>
                                </ListItem>
                            </Link>
                            <Link to='register' style={{ textDecoration: 'none' }}>
                                <ListItem button style={{ background: 'linear-gradient(45deg, #27b1fc 30%, #57e2ff 90%)', marginTop: '15px', color: 'white' }} >
                                    <ListItemIcon></ListItemIcon>
                                    <ListItemText >Register</ListItemText>
                                </ListItem>
                            </Link>

                        </Box>
                }

            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    background: 'linear-gradient(45deg, #27b1fc 30%, #57e2ff 90%)'

                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                        <Typography variant="h5" component="div">
                            ToDo List
                        </Typography>
                    </Link>


                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />

                <Outlet />


            </Box>
        </Box>
    );
};

Home.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Home;