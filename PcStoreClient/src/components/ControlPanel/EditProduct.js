import React, {useEffect, useState} from 'react'
import Axios from "axios";
import {url} from "../../utils/api";
import {images} from '../../assets/images'
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const [isEditing, setIsEditing] = useState(false)
    const [item, setItem] = useState(row)

    const openDescription = () => {
        setOpen(!open)
        setIsEditing(false)
    }

    const startEdit = () => {
        setOpen(true)
        setIsEditing(true)
    }

    const dropEdit = () => {
        setOpen(false)
        setIsEditing(false)
        setItem(row)
    }

    const saveEdit = () => {
        Axios.put(url.productsUpdate, {
            id: item.id,
            type: item.type,
            title: item.title,
            cpu: item.cpu,
            videoCard: item.videoCard,
            ram : item.ram,
            internalMemory : item.internalMemory,
            camera: item.camera,
            batteryLife : item.batteryLife,
            display: item.display,
            price: item.price
        })
            .then((res) => {
            console.log(res.status)
        })
        window.location.href = '/control-panel'
    }

    const deleteProduct = () => {
        Axios.delete(url.productsDelete, {data: {deviceId: row.id}})
            .then((res) => {
                alert('Dispozitivul a fost sters cu succes!')
                window.location.href = '/control-panel'
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChange = (e) => {
        setItem({ ...item, [e.target.name]:  e.target.value })
    }

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => openDescription()}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" >
                    <div className='componenta-produs-cart'>
                        <img src={item.image} alt="prod" style={{width: '150px', height: '100px'}}/>
                        {!isEditing ?
                            <p className='titlu-produs-cart'>{row.title}</p> :
                            <TextField
                                variant="outlined"
                                type='text'
                                className='input-large'
                                value={item.title}
                                name='title'
                                label='Denumire'
                                onChange={e => handleChange(e)}
                                style={{display: 'none'}}
                            />

                        }
                    </div>
                </TableCell>
                {!isEditing ?
                    <TableCell style={{fontWeight: 'bold'}}>{row.price}</TableCell> :
                    <TableCell style={{display: 'none'}}>
                        <TextField
                            variant="outlined"
                            label='Pret'
                            style={{width: '90%'}} value={item.price} type='number' name='price'
                            onChange={e => handleChange(e)}/>
                    </TableCell>
                }
                {!isEditing ?
                    <TableCell style={{fontWeight: 'bold'}}><Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.submit}
                        onClick={() => startEdit()}>Edit</Button></TableCell> :
                    <TableCell style={{fontWeight: 'bold', display: 'grid', gridTemplateRows: '1fr 1fr', justifyContent: 'space-between'}}>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            className={classes.submit}
                            onClick={() => dropEdit()}>Abandoneaza schimbarile
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            style={{marginTop: '5%'}}
                            onClick={() => saveEdit()}>Salveaza schimbarile
                        </Button>
                    </TableCell>
                }
                {!isEditing ?
                    <TableCell style={{fontWeight: 'bold'}}><Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.submit}
                        onClick={() => deleteProduct()}
                    >Delete</Button></TableCell> :
                    <TableCell style={{fontWeight: 'bold'}}><Button
                        disabled
                    >Delete</Button></TableCell>
                }
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Detalii produs:
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                {!isEditing ?
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
                                    </TableHead> :
                                    <TableHead style={{display: 'none'}}></TableHead>
                                    }
                                {!isEditing ?
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {row.cpu}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.videoCard}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.ram}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.internalMemory}
                                            </TableCell>
                                            {row.camera === null ? <TableCell>--</TableCell> : <TableCell>{row.camera}</TableCell>}
                                            {row.batteryLife === null ? <TableCell>--</TableCell> : <TableCell>{row.batteryLife}</TableCell>}
                                            {row.display === null ? <TableCell>--</TableCell> : <TableCell>{row.display}</TableCell>}
                                        </TableRow>
                                    </TableBody>:
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <TextField
                                                    variant="outlined"
                                                    type='text'
                                                    value={item.title}
                                                    name='title'
                                                    label='Denumire'
                                                    onChange={e => handleChange(e)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    variant="outlined"
                                                    label='Pret'
                                                    style={{width: '90%'}} value={item.price} type='number' name='price'
                                                    onChange={e => handleChange(e)}/>
                                            </TableCell>
                                            <TableCell><TextField
                                                variant="outlined"
                                                label='CPU'
                                                style={{width: '100%'}} value={item.cpu}
                                                onChange={e => handleChange(e)}
                                                type="text" id="cpu" name="cpu"/>
                                            </TableCell>
                                            <TableCell><TextField
                                                variant="outlined"
                                                label='Card Video'
                                                style={{width: '100%'}}
                                                value={item.videoCard}
                                                name='videoCard'
                                                onChange={e => handleChange(e)}
                                            /></TableCell>
                                            <TableCell><TextField
                                                variant="outlined"
                                                label='RAM'
                                                style={{width: '100%'}} value={item.ram}
                                                name='ram'
                                                onChange={e => handleChange(e)}/></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><TextField
                                                variant="outlined"
                                                label='Memorie Interna'
                                                style={{width: '100%'}}
                                                value={item.internalMemory}
                                                name='internalMemory'
                                                onChange={e => handleChange(e)}/></TableCell>
                                            {row.camera === null ?
                                                <TableCell><TextField
                                                    variant="outlined"
                                                    label='Camera'
                                                    style={{width: '100%'}} placeholder='--'
                                                    name='camera'
                                                    onChange={e => handleChange(e)}/>
                                                </TableCell> :
                                                <TableCell><TextField
                                                    variant="outlined"
                                                    label='Camera'
                                                    style={{width: '100%'}} value={item.camera}
                                                    name='camera'
                                                    onChange={e => handleChange(e)}/>
                                                </TableCell>
                                            }
                                            {row.batteryLife === null ?
                                                <TableCell><TextField
                                                    variant="outlined"
                                                    label='Viata Baterie'
                                                    style={{width: '100%'}} placeholder='--'
                                                    name='batteryLife'
                                                    onChange={e => handleChange(e)}/>
                                                </TableCell> :
                                                <TableCell><TextField
                                                    variant="outlined"
                                                    label='Viata Baterie'
                                                    style={{width: '100%'}} value={item.batteryLife}
                                                    name='batteryLife'
                                                    onChange={e => handleChange(e)}/>
                                                </TableCell>
                                            }
                                            {row.display === null ?
                                                <TableCell><TextField
                                                    variant="outlined"
                                                    label='Display'
                                                    style={{width: '100%'}} placeholder='--'
                                                    name='display'
                                                    onChange={e => handleChange(e)}/>
                                                </TableCell> :
                                                <TableCell><TextField
                                                    variant="outlined"
                                                    label='Display'
                                                    style={{width: '100%'}} value={item.display}
                                                    name='display'
                                                    onChange={e => handleChange(e)}/>
                                                </TableCell>
                                            }
                                            <TableCell>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-label">Categorie</InputLabel>
                                                    <Select
                                                        variant='outlined'
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={item.type}
                                                        name='type'
                                                        onChange={e => handleChange(e)}
                                                    >
                                                        <MenuItem value='computer'>Computer</MenuItem>
                                                        <MenuItem value='laptop'>Laptop</MenuItem>
                                                        <MenuItem value='mobile'>Mobile</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                }
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


const EditProduct = () => {
    const [products, setProducts] = useState()
    const classes = useStyles()


    useEffect(() => {
        const getProducts = () => {
            Axios.get(url.products)
                .then((res) => {
                    for(let i=0;i<res.data.length;i++) {
                        if (res.data[i].type === 'computer') {
                            res.data[i]['image'] = images.computer
                        }
                        if (res.data[i].type === 'laptop') {
                            res.data[i]['image'] = images.laptop
                        }
                        if (res.data[i].type === 'mobile') {
                            res.data[i]['image'] = images.mobile
                        }
                    }

                    setProducts(res.data)
                })
                .catch((err) => {
                    alert(err)
                    console.log(err)
                })
        }
        getProducts();
    }, [])
    return (
        <div className='cart-sumar'>
            <TableContainer component={Paper} className={classes.root}>
                <Table aria-label="collapsible table">
                    <TableHead className={classes.head}>
                        <TableRow className={classes.row}>
                            <TableCell/>
                            <TableCell className={classes.cell}>Lista de Produse</TableCell>
                            <TableCell/>
                            <TableCell/>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products?.map((row) => (
                            <Row key={row.id} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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
    },
    formControl: {
        margin: theme.spacing(1),
        width: '90%',
    },

}));

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


export default EditProduct