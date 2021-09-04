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


const UserHistory = (props) => {
    const classes = useStyles()
    const [payments, setPayments] = useState([])

    useEffect(() => {
        const getPayments = () => {
            Axios.post(url.userPayments, {userId: props.id})
                .then((res) => {
                    setPayments(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getPayments()
    }, [])

    return (
        <div className={classes.dialog}>
            <div className={classes.root}>
                <button className={classes.button} onClick={() => props.setShowHistory(false)}>X</button>
                {payments.length !== 0 ?
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead className={classes.head}>
                                <TableRow className={classes.row}>
                                    <TableCell/>
                                    <TableCell className={classes.cell}>Id Utilizator</TableCell>
                                    <TableCell className={classes.cell}>Id Dispozitiv</TableCell>
                                    <TableCell className={classes.cell}>Data</TableCell>
                                    <TableCell className={classes.cell}>Suma Platita</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {payments?.map((item, index) => (
                                    <TableRow className={classes.row} key={index}>
                                        <TableCell/>
                                        <TableCell className={classes.cell}>{item.userId}</TableCell>
                                        <TableCell className={classes.cell}>{item.deviceId}</TableCell>
                                        <TableCell className={classes.cell}>{item.dateTime.slice(0,19)}</TableCell>
                                        <TableCell className={classes.cell}>{item.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer> :
                    <div style={{marginLeft: '30%', fontWeight: 'bold', fontSize: '26px'}}>Istoricul platilor este gol!</div>
                }
            </div>
        </div>

    )
}
const useStyles = makeStyles({
    root: {
        width: '80%',
        top: '120%',
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
        cursor: 'pointer',
    }
});

export default UserHistory