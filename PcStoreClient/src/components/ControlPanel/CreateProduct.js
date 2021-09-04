import React , {useState} from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";


import Axios from "axios";
import {url} from "../../utils/api";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

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

const CreateProduct = () => {
    const classes = useStyles()
    const [productData, setProductData] = useState()
    const [price, setPrice] = useState()
    const [type, setType] = useState('computer')

    const createProduct = () => {
        console.log(productData)
        if (!productData.title || !price) {
            alert('Denumirea si preturl produsului sunt obligatorii!')
        } else {
            Axios.post(url.productsCreate, {
                type: type,
                title: productData.title,
                cpu: productData.cpu,
                videoCard: productData.videoCard,
                ram: productData.ram,
                internalMemory: productData.internalMemory,
                camera: productData.camera,
                batteryLife: productData.batteryLife,
                display: productData.display,
                price: price?.toFixed(2),
            })
            window.location.href = '/control-panel'
            alert('Produsul a fost creat cu succes!')
        }

    }

    return (
        <Container component="main" maxWidth="xs" style={{
            // position: 'absolute',
            // top: '70%',
            // left: '50%',
            // transform: 'translate(-50%, -50%)'
        }}>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Creeaza un nou produs
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>

                            <FormControl className={classes.form}>
                                <InputLabel id="demo-simple-select-label">Categorie</InputLabel>
                                <Select
                                    variant='outlined'
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={type}
                                    name='type'
                                    onChange={e => setType(e.target.value)}
                                >
                                    <MenuItem value='computer'>Computer</MenuItem>
                                    <MenuItem value='laptop'>Laptop</MenuItem>
                                    <MenuItem value='mobile'>Mobile</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="denumireProdus"
                                name="title"
                                variant="outlined"
                                required
                                fullWidth
                                id="denumireProdus"
                                label="Denumire Produs"
                                autoFocus
                                onChange={e => setProductData({ ...productData, [e.target.name]: e.target.value })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                type='number'
                                required
                                fullWidth
                                id="pret"
                                label="Pret"
                                name="price"
                                onChange={e => setPrice(parseFloat(e.target.value))}
                                autoComplete="pret"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="cpu"
                                label="Cpu"
                                name="cpu"
                                onChange={e => setProductData({ ...productData, [e.target.name]: e.target.value })}
                                autoComplete="cpu"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="videoCard"
                                label="Card Video"
                                name="videoCard"
                                onChange={e => setProductData({ ...productData, [e.target.name]: e.target.value })}
                                autoComplete="videoCard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="ram"
                                label="Ram"
                                id="ram"
                                onChange={e => setProductData({ ...productData, [e.target.name]: e.target.value })}
                                autoComplete="ram"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="internalMemory"
                                label="Memorie interna"
                                name="internalMemory"
                                onChange={e => setProductData({ ...productData, [e.target.name]:  e.target.value })}
                                autoComplete="internalMemory"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="camera"
                                label="Camera"
                                name="camera"
                                onChange={e => setProductData({ ...productData, [e.target.name]:  e.target.value })}
                                autoComplete="camera"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="batteryLife"
                                label="Viata Baterie"
                                name="batteryLife"
                                onChange={e => setProductData({ ...productData, [e.target.name]:  e.target.value })}
                                autoComplete="batteryLife"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="display"
                                label="Display"
                                name="display"
                                onChange={e => setProductData({ ...productData, [e.target.name]:  e.target.value })}
                                autoComplete="display"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => createProduct()}

                    >
                        Creeaza
                    </Button>
                </form>
            </div>

        </Container>
    )
}

export default CreateProduct