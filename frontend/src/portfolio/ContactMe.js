import react, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import { Button, Drawer, Grid, IconButton, Toolbar, Typography, useTheme } from '@mui/material'
import { makeStyles } from '@material-ui/styles';
import AppBar from '@mui/material/AppBar';
import { grey } from '@mui/material/colors';
import '../css/FadeAndChars.css'
import CustomDialog from '../Dialogs/CustomDialog'

const useStyles = makeStyles({
    root: {
        //   height: '100vw',
        //   width: '100vw',
        //   marginTop: '10%',
    },
    div: {
        marginTop: 200,
        marginLeft: 200
    },
});





const ContactMe = (props) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)



    return <>
        <Container disableGutters={true} maxWidth={'sm'} className={classes.root} >
            Not necessary
        </Container>


    </>

}

export default ContactMe;

