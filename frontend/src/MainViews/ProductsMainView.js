import react, { useEffect, useRef, useState } from 'react'
import Container from '@mui/material/Container'
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { Alert, AppBar, Button, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, ThemeProvider, Toolbar, Typography } from '@mui/material';
import '../css/Background.css'
import CustomAppBar from '../AppBar/CustomAppBar';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import MaterialTable from "material-table";
import axios from 'axios'
import { forwardRef } from 'react';
import MaterialTableIcons from '../MaterialTable/MaterialIcons'
import ProductParts from '../ProductParts/ProductParts';
import { grey } from '@mui/material/colors';
import CustomDialog from '../Dialogs/CustomDialog';
import AddPart from '../Form/AddPart';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ApiError from '../ApiError/ApiError';
import AddName from '../Form/AddName';
import ProjectsAppBar from '../AppBar/ProjectsAppBar';
import AddProduct from '../Form/AddProduct';
import ConfirmDialog from '../Dialogs/ConfirmDialog';


const useStyles = makeStyles({
    text: {
        '&:hover': {
            color: "rgb(25, 151, 165)",
        },
    },
    root: {
        marginTop: 100,
        /* "& .MuiPaper-root": {
             backgroundColor: grey[300]
         },*/
        "& .MuiTableRow-root": {
            '&:hover': {
                backgroundColor: "rgb(25, 151, 165)",
            },
        }
    },
    row: {

    }
});

const ProductsMainView = (props) => {
    const classes = useStyles()
    const navigator = useNavigate()
    const path = useLocation();
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const [addingProduct, setAddingProduct] = useState(null)
    const [error, setError] = useState(false)
    const tableRef = useRef()
    const [openWorkAdd, setOpenWorkAdd] = useState(false)
    const [workProductPart, setWorkProductPart] = useState(null)
    const [openAddProduct, setOpenAddProduct] = useState(false)
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
    const [product, setProduct] = useState(null)

    const ajax = (params) => {

        let filter = {
            where: {

            },
            limit: params.pageSize,
            skip: params.page * params.pageSize
        }
        //Limit and skip handling data fetch page by page

        if (params.search.length > 0) {
            filter.where.or = [
                { name: { like: '%' + params.search + '%' } },
                { type: { like: '%' + params.search + '%' } }
            ]
        }
        if (params.orderBy != null) {
            filter.order = params.orderBy.field + ' ' + params.orderDirection
        }

        let promise = axios.post(window.BACKENDURL + "Products/getProducts", { ...filter })

        return Promise.resolve(promise).then(res => {
            return {
                data: res.data.result.data,
                page: params.page,
                totalCount: res.data.result.totalCount
            }
        })
    }


    const columns = [
        { title: 'name', field: 'name' },
        { title: 'type', field: 'type' },
    ]

    const openAddWorkDialog = (productPart) => {
        setOpenWorkAdd(true)
        setWorkProductPart(productPart)
    }

    const detailPanel = (rowData) => {
        return (<Container maxWidth={"false"}>
            <ProductParts openAddWorkDialog={openAddWorkDialog} product={rowData} />
        </Container>

        )
    }

    const handleAddClick = (rowData) => {
        setOpen(true)
        setAddingProduct(rowData)
    }

    const addWorkForProductPart = (name) => {
        setOpenWorkAdd(false)
        let obj = {
            name: name,
            productPartId: workProductPart.id
        }

        axios.post(window.BACKENDURL + "works/createWork", { ...obj }).then(res => {
            tableRef.current.onQueryChange()

        }).catch((e) => { setError(true) })
    }

    const addPartForProduct = (name, station) => {
        setOpen(false)

        let object = {
            name: name,
            stationId: station.id,
            productId: addingProduct.id
        }

        axios.post(window.BACKENDURL + "ProductParts/createProductPart", { ...object })
            .then(res => {
                tableRef.current.onQueryChange();
                setError(false)
            }).catch((e) => {
                console.log('error', e)
                setError(true)
            })
    }

    const openProductDialog = () => {
        setOpenAddProduct(true)
    }

    const createProduct = (name, type) => {
        setOpenAddProduct(false)

        let object = {
            name: name,
            type: type,

        }

        axios.post(window.BACKENDURL + "Products/createProduct", { ...object })
            .then(res => {
                tableRef.current.onQueryChange()
            }).catch((e) => {
                console.log('error', e)
                setError(true)
            })
    }

    const setProductReady = (rowdata) => {
        setOpenConfirmDialog(true)
        setProduct(rowdata)
    }

    const makeProductReady = () => {
        setOpenConfirmDialog(false)

        let obj = {
            ready: 1
        }
        axios.post(window.BACKENDURL + "Products/updateProduct", { id: product.id, obj: obj }).then(res => {
            tableRef.current.onQueryChange()
        }).catch((e) => {
            setError(true)
        })
    }

    return <>
        <ProjectsAppBar />
        <Container maxWidth={'xl'} id="background" sx={{ height: '100%', width: '100%', position: 'fixed', overflow: 'auto' }}>
            <div className={classes.root}>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" sx={{ backgroundColor: theme.palette.success.main, color: theme.palette.getContrastText(theme.palette.success.main) }} onClick={openProductDialog}>Add Product</Button>
                </Grid>
                {error && (<ApiError title="Rest api error" msg="Error happened in rest api!" />)}
                <MaterialTable
                    tableRef={tableRef}
                    icons={MaterialTableIcons.tableIcons}
                    columns={columns}
                    data={ajax}
                    title="Products"
                    detailPanel={detailPanel}
                    options={{
                        actionsColumnIndex: -1,
                        headerStyle: {
                            backgroundColor: grey[600],
                            color: theme.palette.getContrastText(grey[600])
                        },
                        rowStyle: (rowData) => {



                            if (rowData.ready) {
                                return {
                                    backgroundColor: theme.palette.success.main,
                                    color: theme.palette.getContrastText(theme.palette.success.main)
                                };
                            }
                        },
                    }}
                    actions={[
                        (rowData) => {
                            if (!rowData.ready) {
                                return {
                                    icon: MaterialTableIcons.tableIcons.Add,
                                    tooltip: 'Add a product part',
                                    onClick: (event, rowData) => { handleAddClick(rowData) }
                                }
                            }
                        },
                        (rowData) => {
                            if (!rowData.ready) {
                                return {
                                    icon: MaterialTableIcons.tableIcons.Check,
                                    tooltip: 'Set product as ready!',
                                    onClick: (event, rowData) => { setProductReady(rowData) }
                                }
                            }
                        }
                    ]}
                />
            </div>

            {
                open && (
                    <CustomDialog fullScreen={false} maxWidth="xl" open={open} setOpen={setOpen} title={"Add part for product (" + addingProduct.id + ", " + addingProduct.name + ")"} content={
                        <AddPart callback={addPartForProduct} />
                    }
                    />
                )
            }
            {
                openWorkAdd && (
                    <CustomDialog fullScreen={false} maxWidth="xl" open={openWorkAdd} setOpen={setOpenWorkAdd} title={"Add work for product part (" + workProductPart.id + ", " + workProductPart.name + ")"} content={
                        <AddName callback={addWorkForProductPart} />
                    }
                    />
                )
            }
            {openAddProduct && (
                <CustomDialog fullScreen={false} maxWidth="xl" open={openAddProduct} setOpen={setOpenAddProduct} title={"Add product"} content={
                    <AddProduct callback={createProduct} />
                }
                />
            )
            }

            {openConfirmDialog && (
                <ConfirmDialog
                    open={openConfirmDialog}
                    setOpen={setOpenConfirmDialog}
                    title={"Make this product ready?"}
                    content={"By settings this product ready you cannot progress its works anymore"}
                    callback={makeProductReady}
                />
            )}
        </Container>
    </>
}

export default ProductsMainView;
