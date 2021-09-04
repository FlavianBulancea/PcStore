import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AppsIcon from '@material-ui/icons/Apps';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import LaptopIcon from '@material-ui/icons/Laptop';
import MobileScreenShareIcon from '@material-ui/icons/MobileScreenShare';

const MenuBar = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="transparent" shadow='none'>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    style={{marginLeft: '20%', width: '60%', display: 'inline-block', float: 'none'}}
                >
                    <Tab label="Toate" icon={<AppsIcon />}  onClick={() => props.filterProducts(' ')}/>
                    <Tab label="Computer" icon={<DesktopWindowsIcon />}  onClick={() => props.filterProducts('computer')}/>
                    <Tab label="Laptop" icon={<LaptopIcon />}  onClick={() => props.filterProducts('laptop')}/>
                    <Tab label="Mobile" icon={<MobileScreenShareIcon />}  onClick={() => props.filterProducts('mobile')}/>

                </Tabs>
            </AppBar>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '80%',
        margin: '0 16%',
        backgroundColor: '#fff',
        marginTop: '60px',
        marginLeft: '10%',
        marginRight: '10%',
        textAlign: 'center'
    },
}));

export default MenuBar;