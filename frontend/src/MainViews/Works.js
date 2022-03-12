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
import { grey } from '@mui/material/colors';
import ApiError from '../ApiError/ApiError';
import ProjectsAppBar from '../AppBar/ProjectsAppBar';
import WorkCard from '../Card/WorkCard';


const useStyles = makeStyles({
    text: {
        '&:hover': {
            color: "rgb(25, 151, 165)",
        },
    },
    root: {
        marginTop: 100,
        marginBottom: 50,
        /* "& .MuiPaper-root": {
             backgroundColor: grey[300]
         },*/
        "& .MuiTableRow-root": {
            '&:hover': {
                // backgroundColor: "rgb(25, 151, 165)",
            },
        }
    },
    row: {

    }
});

const Works = (props) => {
    const classes = useStyles()
    const navigator = useNavigate()
    const path = useLocation();
    const theme = useTheme()
    const [error, setError] = useState(false)
    const tableRef = useRef()


    const ajax = (params) => {

        let filter = {
            where: {

            },
            include: [{
                relation: 'productPart', scope: {
                    include: [{ relation: 'product' }]
                }
            }],
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

        let promise = axios.post(window.BACKENDURL + "Works/getWorks", { ...filter })

        return Promise.resolve(promise).then(res => {
            return {
                data: res.data.result.data,
                page: params.page,
                totalCount: res.data.result.totalCount
            }
        })
    }


    const columns = [
        {
            title: 'name', field: 'name', render: (rowData) => {
                return <Container>
                    <Grid container spacing={2} justify="center" alignItems="center">
                        <Grid item xs={12}>
                            <WorkCard maxWidth={'100%'} product={rowData.productPart.product} work={rowData} />
                        </Grid>
                    </Grid>
                </Container>
            }
        },
    ]



    return <>
        <ProjectsAppBar />
        <Container maxWidth={'xl'} id="background" sx={{ height: '100%', width: '100%', position: 'fixed', overflow: 'auto' }}>
            <div className={classes.root}>
                {error && (<ApiError title="Rest api error" msg="Error happened in rest api!" />)}
                <MaterialTable
                    tableRef={tableRef}
                    icons={MaterialTableIcons.tableIcons}
                    columns={columns}
                    data={ajax}
                    title="Works"
                    options={{
                        actionsColumnIndex: -1,
                        headerStyle: {
                            backgroundColor: grey[600],
                            color: theme.palette.getContrastText(grey[600])
                        },
                    }}
                />
            </div>



        </Container>
    </>
}

export default Works;
