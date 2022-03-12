import react, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { Alert, AppBar, Button, CircularProgress, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@mui/styles';
import axios from 'axios'
import { blue, grey } from '@mui/material/colors';
import CustomCard from '../Card/CustomCard'




const ProductParts = (props) => {
    const { product, openAddWorkDialog } = props
    const navigator = useNavigate()
    const path = useLocation();
    const theme = useTheme()
    const [error, setError] = useState(false)
    const [productParts, setProductParts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        //fetch by productId
        setLoading(true)
        let filter = {
            where: {
                productId: product.id
            },
            include: [{ relation: 'stations' }, { relation: 'works' }]
        }

        axios.post(window.BACKENDURL + "ProductParts/findData", { filter: filter }).then(res => {
            setProductParts(res.data.productParts)
            setLoading(false)
        }).catch((e => {
            //setError(e) way to do but demo purposes :)
            setError(true)
        }))
    }, [product])


    return <Container maxWidth={false} disableGutters style={{ padding: 20, backgroundColor: grey[600] }}>
        {loading ? <CircularProgress /> :
            productParts.length > 0 ?
                <Grid container spacing={2} direction="row">
                    {productParts.map(part => {
                        return <Grid item><CustomCard openAddWorkDialog={openAddWorkDialog} product={product} productPart={part} /></Grid>
                    })}
                </Grid>
                :
                <Alert severity="warning">No parts found for this product</Alert>
        }

    </Container>
}

export default ProductParts;
