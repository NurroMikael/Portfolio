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

const AddProductPartWihtoutProduct = (props) => {
    const { callback } = props
    const classes = useStyles()
    const theme = useTheme()

    const [nameError, setNameError] = useState(false)
    const [productError, setProductError] = useState(false)

    const [name, setName] = useState("")
    const [product, setProduct] = useState(null)


    const handleCreate = () => {
        name == "" ? setNameError(true) : setNameError(false)
        product == "" ? setProductError(true) : setProductError(false)

        if (name != "" && product != null) {
            callback(name, product)
        }
    }



    const selectProduct = (obj) => {
        setProduct(obj)
        if (obj != null) {
            setProductError(false)
        }
    }

    const ajaxQueryForProduct = (event) => {

        let filter = {
            where: {
                name: { like: '%' + event.target.value + '%' }
            }
        }

        return axios.post(window.BACKENDURL + "Products/findData", { filter: { ...filter } }).then(res => {
            console.log(res)
            return res.data.productParts
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
                <CharAutoComplete label={"Products"} ajaxQuery={ajaxQueryForProduct} onSelect={selectProduct} />
                {productError && (<Alert severity="error">Product cannot be empty!</Alert>)}
            </Grid>

            <Grid item xs={12}>
                <Button variant="contained" color="success" fullWidth onClick={handleCreate}>Create</Button>
            </Grid>
        </Grid>
    </Container>
}

export default AddProductPartWihtoutProduct;
