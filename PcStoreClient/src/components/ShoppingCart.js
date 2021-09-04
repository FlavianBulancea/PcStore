import React , { useState, useEffect } from "react";
import TopBar from "./TopBar";
import {totalPrice, getTotalTaxa} from "../utils/getTotalPrice";
import {buildDate} from "../utils/buildDate";

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Axios from "axios";
import {url} from "../utils/api";
import {images} from '../assets/images'
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const Row = (props) => {
    const { row, changeQ } = props;
    const classes = useRowStyles();
    const [open, setOpen] = React.useState(false);
    const [quantity, setQuantity] = useState(1)
    const [products, setProducts] = useState()

    useEffect(() => {
        const getProducts = () => {
                Axios.get(url.products)
                    .then((res) => {
                        let localProducts = res.data.filter(item => item.title === row.title);
                        setProducts(localProducts)
                    })
                    .catch((err) => {
                        alert(err)
                        console.log(err)
                    })

        }
        getProducts();
    }, [])

    const handleChange = (event, title) => {
        changeQ(mapQuantity => { return {...mapQuantity, [title]: event.target.value}})
        setQuantity(event.target.value);
        localStorage.setItem(`${products[0].title}`, JSON.stringify(event.target.value))
    };

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" >
                    <div className='componenta-produs-cart'>
                        <img src={row.image} alt="prod" style={{width: '150px', height: '100px'}}/>
                        <div className='div-with-p-div'>
                            <p className='titlu-produs-cart'>{row.title}</p>
                            <div className='descriere-produs-cart'>
                                <p>Disponibil in stoc</p>
                                <p>Garantie inclusa: 24 luni</p>
                            </div>
                        </div>
                    </div>

                </TableCell>
                <TableCell >
                    <Select
                        value={quantity}
                        onChange={e => handleChange(e, row.title)}
                        displayEmpty
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        {
                            products?.map((item, index) => {
                                return(
                                    <MenuItem key={index} value={index+1}>{index+1}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </TableCell>
                <TableCell style={{fontWeight: 'bold'}}>{row.price}</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>{(row.price * quantity).toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Descriere:
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>CPU</TableCell>
                                        <TableCell>Video Card</TableCell>
                                        <TableCell>Ram</TableCell>
                                        <TableCell>Internal Memory</TableCell>
                                        <TableCell>Camera</TableCell>
                                        <TableCell>Battery Life</TableCell>
                                        <TableCell>Display</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow >
                                        <TableCell component="th" scope="row">
                                            {row.cpu}
                                        </TableCell>
                                        <TableCell>{row.videoCard}</TableCell>
                                        <TableCell>{row.ram}</TableCell>
                                        <TableCell>
                                            {row.internalMemory}
                                        </TableCell>
                                        {row.camera === '' ? <TableCell>--</TableCell> : <TableCell>{row.camera}</TableCell>}
                                        {row.batteryLife === '' ? <TableCell>--</TableCell> : <TableCell>{row.batteryLife}</TableCell>}
                                        {row.display === '' ? <TableCell>--</TableCell> : <TableCell>{row.display}</TableCell>}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const ShoppingCart = ({history}) => {
    const [items, setItems] = useState([])
    const [products, setProducts] = useState([])
    const [userData, setUserData] = useState(0)
    const [total, setTotal] = useState(0)
    const [totalTaxa, setTotalTaxa] = useState(0)
    const [mapQuantity, setMapQuantity] = useState()
    const classes = useTableStyles()

    useEffect(() => {
        const getProducts = () => {
            Axios.get(url.products)
                .then((res) => {
                    setProducts(res.data)
                })
                .catch((err) => {
                    alert(err)
                    console.log(err)
                })

        }
        getProducts();
    }, [])

    useEffect(() => {
        const getCart = () => {
            let localData = JSON.parse(localStorage.getItem('user'))

            if(localData !== null) {
                Axios.post(url.cart, {userId: localData.id})
                    .then((res) => {
                        console.log(res.data)
                        if (res.data.length > 0) {
                            res.data.map(item => {
                                if (item.type === 'computer') {
                                    item['image'] = images.computer
                                }
                                if (item.type === 'laptop') {
                                    item['image'] = images.laptop
                                }
                                if (item.type === 'mobile') {
                                    item['image'] = images.mobile
                                }
                                setMapQuantity(mapQuantity => { return {...mapQuantity, [item.title]: 1}})
                            })
                        }
                        setItems(res.data)
                    })
                    .catch((err) => {
                        alert(err)
                        console.log(err)
                    })
            }

        }
        getCart();
    }, [])

    useEffect(() => {
        let localData = JSON.parse(localStorage.getItem('user'))
        setUserData(localData)
    }, [])

    useEffect(() => {
        let total = 0
        if(mapQuantity !== null && mapQuantity !== undefined){
            let quant = Object.values(mapQuantity)
            for(let i=0;i<items?.length;i++) {
                total = total + items[i].price * quant[i]
            }
        }

        setTotal(total)
    }, [items, mapQuantity])

    const finnishOrder = () => {
        let localList = []
        items.map(item => {
            let sameProducts = products.filter(prod => prod.title === item.title)
            console.log(sameProducts)
            sameProducts.map(selected => {
                let quant = Object.values(mapQuantity)
                console.log(quant)
                if(sameProducts.indexOf(selected)+1 > quant[items.indexOf(item)]){
                    return 0
                } else {
                    let date = buildDate()
                    localList.push({userId: userData.id, deviceId: selected.id, dateTime: date, amount: selected.price})
                }
            })
        })
        Axios.post(url.makePayment, localList)
            .then(res => {
                items.map(item => {
                    return Axios.delete(url.deleteFromCart, {data: {userId: userData.id, deviceId: item.id}})
                        .then(res => {
                            console.log(res)
                            alert('Comanda finalizata cu succes!')
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
                window.location.href = '/'
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <div>
            <TopBar history={history} userData={userData}/>
            <div className='cart-title'>Cosul tau de cumparaturi:</div>

            <div className='cart-sumar'>
                {items.length !== 0 ?
                    <TableContainer component={Paper} className={classes.root}>
                        <Table aria-label="collapsible table">
                            <TableHead className={classes.head}>
                                <TableRow className={classes.row}>
                                    <TableCell/>
                                    <TableCell className={classes.cell}>Produs</TableCell>
                                    <TableCell className={classes.cell}>Cantitate</TableCell>
                                    <TableCell className={classes.cell}>Pret Unitar</TableCell>
                                    <TableCell className={classes.cell}>Pret Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items?.map((row) => (
                                    <Row key={row.id} row={row} changeQ={setMapQuantity}/>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer> :
                    <div style={{width: '60%',
                        marginLeft: '10%',
                        marginTop: '30px',}}>Cosul tau de cumparaturi este gol!</div>
                }

                <div className='sumar-comanda'>
                    <div className='sumar-comanda-titlu'>Sumar Comanda</div>
                    <div className='sumar-comanda-prod'>
                        <div>Cost Produse:</div>
                            <div className='pret-sumar'>{total.toFixed(2)} RON</div>
                    </div>
                    <div className='sumar-comanda-prod'>
                        <div>Cost Livrare:</div>
                        <div className='pret-sumar'>5.99 RON</div>
                    </div>
                    <div className='separator'> </div>
                    <div className='total-sumar'>
                        Total: {(total+5.99).toFixed(2)} RON
                    </div>
                    <div className='div-with-btn'>
                        <button className='pop-button' >
                            <div>
                                <ArrowForwardIosIcon/>
                                <ArrowForwardIosIcon/>
                            </div>
                            <p onClick={() => finnishOrder()}>Comanda</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const useRowStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
            height: '100px',
        },
    },

    selectEmpty: {
        marginTop: theme.spacing(2),
    }
}));

const useTableStyles = makeStyles({
    root: {
        width: '60%',
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

export default ShoppingCart