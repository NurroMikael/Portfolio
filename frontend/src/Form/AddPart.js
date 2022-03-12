import react, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Button, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, ThemeProvider, Toolbar, Typography, TextField, Alert } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@mui/styles';
import axios from 'axios'
import CharAutoComplete from '../AutoComplete/CharAutoComplete';

const useStyles = makeStyles({
    multilineColor: {
        backgroundColor: '#fff',
    },
    grid: {
        padding: 10
    }
});

const AddPart = (props) => {
    const { callback } = props
    const classes = useStyles()
    const theme = useTheme()

    const [nameError, setNameError] = useState(false)
    const [stationError, setStationError] = useState(false)

    const [name, setName] = useState("")
    const [station, setStation] = useState(null)


    const handleCreate = () => {
        name == "" ? setNameError(true) : setNameError(false)
        station == "" ? setStationError(true) : setStationError(false)

        if (name != "" && station != null) {
            callback(name, station)
        }
    }

    const selectStation = (obj) => {
        setStation(obj)
        if (obj != null) {
            setStationError(false)
        }
    }

    const ajaxQuery = (event) => {
        let filter = {
            where: {
                name: { like: '%' + event.target.value + '%' }
            }
        }

        return axios.post(window.BACKENDURL + "Stations/findData", { filter: { ...filter } }).then(res => {
            return res.data.stations
        })
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
            <Grid item xs={12} className={classes.grid}>
                <CharAutoComplete label={"Stations"} ajaxQuery={ajaxQuery} onSelect={selectStation} />
                {stationError && (<Alert severity="error">Station cannot be empty!</Alert>)}
            </Grid>

            <Grid item xs={12}>
                <Button variant="contained" color="success" fullWidth onClick={handleCreate}>Create</Button>
            </Grid>
        </Grid>
    </Container>
}

export default AddPart;
