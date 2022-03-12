import react, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Button, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, ThemeProvider, Toolbar, Typography, TextField, Alert } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@mui/styles';

const useStyles = makeStyles({
    multilineColor: {
        backgroundColor: '#fff',
    },
    grid: {
        padding: 10
    }
});

const AddName = (props) => {
    const { callback } = props
    const classes = useStyles()
    const theme = useTheme()

    const [nameError, setNameError] = useState(false)
    const [name, setName] = useState("")


    const handleCreate = () => {
        name == "" ? setNameError(true) : setNameError(false)

        if (name != "") {
            callback(name)
        }
    }


    return <Container maxWidth="sm" >
        <Grid container spacing={2} sx={{ padding: 5 }}>
            <Grid item xs={12} className={classes.grid}>
                <TextField fullWidth value={name}
                    onChange={((e) => {
                        setName(e.target.value)

                        if (e.target.value.length > 0) {
                            setNameError(false)
                        }
                    })}
                    InputProps={{
                        className: classes.multilineColor
                    }}
                    label="Name" variant="outlined" />
                {nameError && (<Alert severity="error">Name cannot be empty!</Alert>)}
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="success" fullWidth onClick={handleCreate}>Create</Button>
            </Grid>
        </Grid>
    </Container>
}

export default AddName;
