import React, {useEffect, useState} from 'react'

import {url} from '../../utils/api'
import Axios from 'axios'
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {makeStyles} from "@material-ui/core/styles";


const PaymentHistory = () => {
    const classes = useStyles()
    const [payments, setPayments] = useState([])

    useEffect(() => {
        const getPayments = () => {
            Axios.get(url.payments)
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
    <TableContainer component={Paper} className={classes.root}>
        {payments.length !== 0 ?
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
                </Table> :
            <div style={{fontWeight: 'bold', fontSize: '26px'}}>Nu exista plati inregistrate!</div>                   
        }
    </TableContainer>
)
}
const useStyles = makeStyles({
    root: {
        width: '80%',
        marginLeft: '10%',
        marginTop: '30px',
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
    }

});

export default PaymentHistory