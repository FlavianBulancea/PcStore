import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {HOME, PANEL} from '../utils/routeConstants'

import {url} from '../utils/api'

import Axios from 'axios';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                PC Store
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const SignIn = ({history}) => {
    const [userData, setUserData] = useState({})

    const logInUser = () => {
        if(userData.username === 'admin' && userData.password === 'admin') {
            localStorage.setItem('user', JSON.stringify('admin'))
            history.push(PANEL)
        } else {
            Axios.post(url.getOneUser,  { username: userData.username, password: userData.password })
                .then((res) => {
                    if(res.status === 200) {
                        localStorage.setItem('user', JSON.stringify(res.data))
                        history.push(HOME)
                    } else {
                        alert('Nu exista acest utilizator!')
                    }

                })
                .catch((err) => {
                    alert(err)
                    console.log(err)
                })
        }

    }

    const classes = useStyles()

    return (
        <Container component="main" maxWidth="xs" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Autentificare
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Nume de utilizator"
                                name="username"
                                onChange={e => setUserData({...userData, [e.target.name] : e.target.value})}
                                autoComplete="username"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Parola"
                                type="password"
                                id="password"
                                onChange={e => setUserData({...userData, [e.target.name] : e.target.value})}
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        // type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={e => logInUser(e)}
                    >
                        Autentificare
                    </Button>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default SignIn;
