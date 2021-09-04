import React, { useState, useEffect } from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { makeStyles } from '@material-ui/core/styles';

import ShowCart from "./ShowCart";
import {HOME, CART, SIGN, SIGNIN, HISTORY} from '../utils/routeConstants'
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import {url} from "../utils/api";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from '@material-ui/icons/Settings';
import HistoryIcon from '@material-ui/icons/History';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import UserHistory from "./UserHistory";
import Settings from './Settings'


const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,

    },
}));

const TopBar = (props) => {
    const classes = useStyles()
    const [cart, setCart] = useState(0)
    const [openHover, setOpenHover] = useState(false)
    const [openUser, setOpenUser] = useState(false)
    const [openAccount, setOpenAccount] = useState(false)
    const [showIstoric, setShowIstoric] = useState(false)
    const [showSettings, setShowSettings] = useState(false)

    useEffect(() => {
        const getCart = () => {
            Axios.post(url.cart, {userId: props.userData.id})
                .then((res) => {
                    setCart(res.data)
                    console.log(props.userData.id)
                })
                .catch((err) => {
                    alert(err)
                    console.log(err)
                })

        }
        getCart();
    }, [props.userData?.id])

    const logOut = () => {
        localStorage.removeItem('user')
        window.location.href = '/'
    }


    return (
        <div className='ls-app-header'>
            <div
                className="logo"
                style={{ cursor: 'pointer', marginTop: '10px' }}
                onClick={e => window.location.href = '/'}
            >PC Store</div>

            {props.userData === null ?
                <div className='navigation-container'>
                    <div onClick={e => window.location.href = '/'}>Acasa</div>
                    <div onClick={() => props.history.push(SIGNIN)}>Autentificare</div>
                    <div onClick={() => props.history.push(SIGN)}>Inregistreaza-te</div>
                </div>
                 :
                <div className='navigation-container'>
                    {(window.location.href.indexOf("shopping-cart") > -1)?
                        <div>
                            <BackspaceIcon style={{ cursor:'pointer', display: 'none' }} onClick = {() => props.history.push(HOME)}/>
                        </div> :
                        <div className="shopping-cart">
                            <div
                                className="cart-icon-length"
                                style={{marginTop: '-8px'}}
                                onClick = {() => props.history.push(CART)}
                                onMouseOver={() => setOpenHover(true)}
                            >
                                <ShoppingCartIcon/>
                                <div className='number-of-items'>{cart?.length}</div>
                            </div>
                        </div>
                    }
                    <div onClick={e => window.location.href = '/'}> Acasa </div>
                    <div onMouseOver={() => setOpenAccount(true)}>Contul Meu</div>
                    <div style={{display: 'flex', marginRight: '3px'}} onMouseOver={() => setOpenUser(true)}>
                        <div>{props.userData?.username}</div>
                        <Avatar className={classes.avatar} style={{marginTop: '-5px', width: '30px', height: '30px'}}>
                        </Avatar>
                    </div>
                </div>
            }

            {openHover && <ShowCart history={props.history} setOpenHover={setOpenHover} userData={props.userData}/>}
            {openAccount &&
            <div className='container-acc'>
                <div onMouseLeave={() => setOpenAccount(false)} className='account-info'>
                    <div className='items-acc'>
                        <HistoryIcon color='primary' style={{paddingTop: '20%'}}/>
                        <Button
                            variant='contained'
                            color="primary"
                            size="small"
                            onClick={() => setShowIstoric(true)}>Istoric Plati</Button>
                    </div>
                    <div className='items-acc'>
                        <SettingsIcon color='primary' style={{paddingTop: '20%'}}/>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => setShowSettings(true)}>Setari</Button>
                    </div>

                </div>
            </div>
            }
            {openUser &&
            <div onMouseLeave={() => setOpenUser(false)} className='user-info'>
                <Button
                    className='delog-btn'
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => logOut()}>
                    Delogare
                </Button>
            </div>
            }
            {showIstoric &&
            <UserHistory id={props.userData?.id} setShowHistory={setShowIstoric}/>
            }
            {showSettings &&
            <Settings setShowSettings={setShowSettings} userData={props.userData}/>
            }
        </div>
    )
}

export default TopBar
