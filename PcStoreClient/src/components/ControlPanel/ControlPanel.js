import React from 'react'
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import HistoryIcon from '@material-ui/icons/History';
import {makeStyles} from "@material-ui/core/styles";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import PaymentHistory from "./PaymentHistory";

const useStyles = makeStyles((theme) => ({
     root: {
          flexGrow: 1,
          width: '80%',
          margin: '0 16%',
          backgroundColor: '#fff',
          marginTop: '60px',
          marginLeft: '10%',
     },
}));


const ControlPanel = () => {
     const classes = useStyles();
     const [value, setValue] = React.useState(0);
     const [menu, setMenu] = React.useState('create')

     const handleChange = (event, newValue) => {
          setValue(newValue);
     };

     const logOut = () => {
          localStorage.removeItem('user')
          window.location.href = '/'
     }

     return (
         <div style={{display: 'flex', flexDirection: 'column'}}>
              <div className='control-header'>Control Panel</div>
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
                            className='title-tabs'
                        >
                             <Tab label="Create Product" icon={<AddIcon />} style={{marginLeft: '10%'}} onClick={() => setMenu('create')} />
                             <Tab label="Edit/Delete Product" icon={<EditIcon />} style={{marginLeft: '8%'}} onClick={() => setMenu('edit')} />
                             <Tab label="Payment History" icon={<HistoryIcon />} style={{marginLeft: '8%'}} onClick={() => setMenu('payment')} />
                             <Tab label="Delogare" icon={<ExitToAppIcon />} style={{marginLeft: '8%'}} onClick={() => logOut()} />
                        </Tabs>
                   </AppBar>
              </div>

              {
                   menu === 'create' &&
                   <CreateProduct />
              }
              {
                   menu === 'edit' &&
                       <EditProduct />
              }
              {
                   menu === 'payment' &&
                   <PaymentHistory />
              }
         </div>

     )
}


export default ControlPanel