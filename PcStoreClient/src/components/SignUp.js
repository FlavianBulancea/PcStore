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

const SignUp = () => {
    const classes = useStyles();
    const [userData, setUserData] = useState({})

    const registerUser = (e) => {
        e.preventDefault()
        Axios.post(url.createUser, {
            username: userData.username,
            email: userData.email,
            fullName: userData.fullName,
            dateOfBirth: userData.dateOfBirth,
            phoneNumber: userData.phoneNumber,
            password: userData.password  })
        .then(res => {
            if (res.status === 200) {
                window.location.href = '/'
            }
        })
        .catch(err => console.error(err))

    }

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
                    Inregistrare
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fullName"
                                name="fullName"
                                variant="outlined"
                                required
                                fullWidth
                                id="fullName"
                                label="Nume Complet"
                                autoFocus
                                onChange={e => setUserData({ ...userData, [e.target.name]: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Nume de utilizator"
                                name="username"
                                onChange={e => setUserData({ ...userData, [e.target.name]: e.target.value })}
                                autoComplete="username"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Adresa de Email"
                                name="email"
                                onChange={e => setUserData({ ...userData, [e.target.name]: e.target.value })}
                                autoComplete="email"
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
                                onChange={e => setUserData({ ...userData, [e.target.name]: e.target.value })}
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="phone"
                                label="Numar de Telefon"
                                name="phoneNumber"
                                onChange={e => setUserData({ ...userData, [e.target.name]:  parseInt(e.target.value) })}
                                autoComplete="phoneNumber"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="date"
                                required
                                fullWidth
                                label="Data Nasterii"
                                type="date"
                                name="dateOfBirth"
                                defaultValue="2000-05-24"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={e => setUserData({ ...userData, [e.target.name]: e.target.value })}
                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={e => registerUser(e)}
                    >
                        Inregistrare
                    </Button>

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/sign-in" variant="body2">
                                Ai deja un cont? Autentifica-te!
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <button onClick={() => console.log(userData)}>check user</button>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default SignUp;