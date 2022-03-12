import react, { useEffect, useRef, useState } from 'react'
import Container from '@mui/material/Container'
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { Alert, AppBar, Button, CircularProgress, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, ThemeProvider, Toolbar, Typography } from '@mui/material';
import CustomAppBar from '../AppBar/CustomAppBar';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@mui/styles';
import ProjectsAppBar from '../AppBar/ProjectsAppBar';
import axios from 'axios';
import ApiError from '../ApiError/ApiError';
import StationCard from '../Card/StationCard';
import '../css/Background.css'
import CustomDialog from '../Dialogs/CustomDialog';
import AddName from '../Form/AddName'
import AddPart from '../Form/AddPart';
import AddProduct from '../Form/AddProduct';
import AddProductPartWihtoutProduct from '../Form/AddProductPartWithoutProduct';
import TablePagination from '@mui/material/TablePagination';

const useStyles = makeStyles({

});


const Stations = (props) => {
    const classes = useStyles()
    const navigator = useNavigate()
    const path = useLocation();
    const theme = useTheme()
    const [stations, setStations] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [open, setOpen] = useState(false)
    const [openAddProductPart, setOpenAddProductPart] = useState(false)
    const [stationForProductPart, setStationForProductPart] = useState(null)
    const [openAddWork, setOpenAddWork] = useState(false)
    const [productPartForWork, setProductPartForWork] = useState(null)
    const [totalCount, setTotalCount] = useState(0)

    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(4)


    useEffect(() => {
        getData(page, pageSize)
    }, [])

    const getData = (page, pageSize) => {
        setLoading(true)

        let filter = {
            where: {

            },
            limit: pageSize,
            skip: page * pageSize
        }

        axios.post(window.BACKENDURL + "Stations/findData", { count: true, filter: filter })
            .then(res => {
                setStations(res.data.stations.stations)
                setTotalCount(res.data.stations.totalCount)
                setLoading(false)
            }).catch((e) => {
                setError(true)
            })
    }

    const openStationsDialog = () => {
        setOpen(true)
    }

    const addStations = (name) => {
        setOpen(false)
        let obj = {
            name: name
        }
        axios.post(window.BACKENDURL + "Stations/createStations", { ...obj }).then(res => {
            getData()
        })
    }

    const openProductDialog = (station) => {
        setStationForProductPart(station)
        setOpenAddProductPart(true)
    }

    const addProductPart = (name, product) => {
        setOpenAddProductPart(false)

        let obj = {
            name: name,
            productId: product.id,
            stationId: stationForProductPart.id
        }
        axios.post(window.BACKENDURL + "ProductParts/createProductPart", { ...obj }).then(res => {
            getData()
        }).catch((e) => {
            setError(true)
        })
    }

    const addWork = (name) => {
        setOpenAddWork(false)
        let obj = {
            name: name,
            productPartId: productPartForWork.id
        }

        axios.post(window.BACKENDURL + "Works/createWork", { ...obj }).then(res => {
            getData()
        }).catch((e) => {
            setError(true)
        })
    }


    const openWorkDialog = (productPart) => {
        setProductPartForWork(productPart)
        setOpenAddWork(true)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
        getData(newPage, pageSize)
    };

    const handleChangeRowsPerPage = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
        getData(0, parseInt(event.target.value, 10))
    };



    return <>
        <ProjectsAppBar />
        <Container maxWidth={'xl'} id="background" sx={{ height: '100%', width: '100%', position: 'fixed', overflow: 'auto' }}>
            <Grid container spacing={2} direction="row" sx={{ marginTop: 10, marginBottom: 10 }}>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" sx={{ backgroundColor: theme.palette.success.main, color: theme.palette.getContrastText(theme.palette.success.main) }} onClick={openStationsDialog}>Add stations</Button>
                </Grid>
                {loading ? <CircularProgress /> : <>
                    {stations.map(station => {
                        return <Grid item><StationCard openWorkDialog={openWorkDialog} openProductDialog={openProductDialog} station={station} /></Grid>
                    })}
                </>
                }
            </Grid>
            <Grid item xs={12} style={{ backgroundColor: '#fff', padding: 10, maxWidth: '96%', marginBottom: 10 }}>
                <TablePagination
                    component="div"
                    count={totalCount}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={pageSize}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={['4', '8', '16']}
                />
            </Grid>

            {error && (<ApiError title="Rest api error" msg="Error happened in rest api!" />)}


            {
                open && (
                    <CustomDialog fullScreen={false} maxWidth="xl" open={open} setOpen={setOpen} title={"Add station"} content={
                        <AddName callback={addStations} />
                    }
                    />
                )
            }
            {
                openAddProductPart && (
                    <CustomDialog fullScreen={false} maxWidth="xl" open={openAddProductPart} setOpen={setOpenAddProductPart} title={"Add product part"} content={
                        <AddProductPartWihtoutProduct callback={addProductPart} />
                    }
                    />
                )
            }
            {
                openAddWork && (
                    <CustomDialog fullScreen={false} maxWidth="xl" open={openAddWork} setOpen={setOpenAddWork} title={"Add work"} content={
                        <AddName callback={addWork} />
                    }
                    />
                )
            }

        </Container>
    </>
}

export default Stations;
