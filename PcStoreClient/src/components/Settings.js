import React, {useEffect, useState} from 'react'

import {url} from '../utils/api'
import Axios from 'axios'
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {makeStyles} from "@material-ui/core/styles";
import TopBar from "./TopBar";
import Tab from "@material-ui/core/Tab";
import AppsIcon from "@material-ui/icons/Apps";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import LaptopIcon from "@material-ui/icons/Laptop";
import MobileScreenShareIcon from "@material-ui/icons/MobileScreenShare";
import Tabs from "@material-ui/core/Tabs";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import Button from "@material-ui/core/Button";



const Settings = (props) => {
    const classes = useStyles()
    const [value, setValue] = useState(0)
    const [user, setUser] = useState(props.userData)
    const [menu, setMenu] = useState('name')

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const changeName = () => {
        console.log(user)
        localStorage.setItem('user', JSON.stringify(user))
        Axios.put(url.updateUser, {
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            dateOfBirth: user.dateOfBirth,
            phoneNumber: user.phoneNumber,
            password: user.password  })
            .then(res => {
                if (res.status === 200) {
                    window.location.href = '/'
                }
            })
            .catch(err => console.error(err))

    }

    return (
        <div className={classes.dialog}>
            <div className={classes.root} >
                {/*<button className={classes.button} onClick={() => props.setShowSettings(false)}>X</button>*/}
                <AppBar position="static" color="transparent" shadow='none'>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        component={Paper}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                        // style={{ width: '100%', display: 'inline-block', float: 'none'}}
                    >
                        <Tab label="Schimba Numele de Utilizator" icon={<PersonIcon />} style={{marginLeft: '20%'}} onClick={() => setMenu('name')}/>
                        <Tab label="Schimba Parola" icon={<LockIcon />} style={{marginLeft: '20%'}} onClick={() => setMenu('pass')}/>
                    </Tabs>
                </AppBar>
                {
                    menu === 'name' &&
                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="username"
                                        name="username"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Noul Nume de Utilizator"
                                        autoFocus
                                        onChange={e => setUser({...user, [e.target.name]: e.target.value})}
                                        style={{marginBottom: '10%'}}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={() => changeName()}
                            >
                                Salveaza Schimbari
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                                onClick={() => props.setShowSettings(false)}
                            >
                                Renunta la Schimbari
                            </Button>
                        </form>
                }
                {
                    menu === 'pass' &&
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="password"
                                    name="password"
                                    variant="outlined"
                                    type="password"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Noua Parola"
                                    autoFocus
                                    onChange={e => setUser({...user, [e.target.name]: e.target.value})}
                                    style={{marginBottom: '10%'}}

                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => changeName()}
                        >
                            Salveaza Schimbari
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={() => props.setShowSettings(false)}
                        >
                            Renunta la Schimbari
                        </Button>
                    </form>
                }

            </div>
        </div>

    )
}
const useStyles = makeStyles({
    root: {
        backgroundColor: 'white',
        // position: 'absolute',
        width: '80%',
        top: '120%',
        // marginLeft: '10% !important',
        // marginTop: '30px',
        zIndex: 10,
    },
    dialog: {
        position: "fixed",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        left: 0,
        zIndex: 2,
        width: '100vw',
        height: '100vh',
        background: '#282828dd',
    },
    head: {
        backgroundColor: '#bfbfbf',
    },
    row: {
        fontSize: '32px',
    },
    cell: {
        fontSize: '18px',
        fontWeight: 'bold'
    },
    button: {
        float: 'right',
        backgroundColor: '#f50057',
        borderRadius: '5px',
        border: '0.1px solid rgba(235, 235, 235, 0.8)',
    },
    form: {
        width: '50%',
        marginTop: '5%',
        marginBottom: '5%',
        marginLeft: '25%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submit: {
        marginTop: '5%'
    }
});

export default Settings