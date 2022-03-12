import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { grey, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { Alert, CircularProgress, Grid, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import WorkCard from './WorkCard';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ApiError from '../ApiError/ApiError';
import ProductPartAccordion from '../Accordion/ProductPartAccordion';
import { useTheme } from '@mui/styles';

const StationCard = (props) => {
    const { station, openProductDialog, openWorkDialog } = props
    const [productParts, setProductsParts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const theme = useTheme()
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(4)
    const [loadingMore, setLoadingMore] = useState(false)
    const [noMore, setNoMore] = useState(false)


    useEffect(() => {
        getData(page, pageSize)
    }, [])

    const getData = (page, pageSize) => {
        setLoading(true)
        let filter = {
            where: {
                stationId: station.id
            },
            include: [{ relation: 'product' }],
            limit: pageSize,
            skip: page * pageSize
        }
        axios.post(window.BACKENDURL + "ProductParts/findData", { filter: filter }).then(res => {
            setProductsParts(res.data.productParts)
            setLoading(false)
        }).catch((e) => {
            setError(true)
        })
    }

    const loadMore = (page, pageSize) => {
        setLoadingMore(true)
        let filter = {
            where: {
                stationId: station.id
            },
            limit: pageSize,
            skip: page * pageSize
        }
        axios.post(window.BACKENDURL + "ProductParts/findData", { filter: filter }).then(res => {
            if (res.data.productParts.length > 0) {
                let final = [
                    ...productParts,
                    ...res.data.productParts
                ]

                setProductsParts(final)
            } else {
                setNoMore(true)
            }

            setLoadingMore(false)
        }).catch((e) => {
            setError(true)
        })
    }



    return (
        <Card sx={{ maxHeight: '400px', height: '360px', overflow: 'auto', maxWidth: 345, width: 400, backgroundColor: grey[400] }}>
            <CardHeader
                sx={{ borderBottom: '1px solid black' }}
                title={<><Grid container spacing={2} justifyContent="center" alignItems={"center"}>
                    <Grid item >
                        <Typography>{station.name}</Typography>
                    </Grid>
                </Grid>
                    <Grid container spacing={2} justifyContent="center" alignItems={"center"}>
                        <Grid item>
                            <Button onClick={(() => {
                                openProductDialog(station)
                            })} variant="outlined" color="success">
                                New product part
                            </Button>
                        </Grid>
                    </Grid>
                </>
                }
            />
            <CardContent>
                <Grid container spacing={2} justifyContent="center" alignItems={"center"}>
                    {error && (<ApiError title="Rest api error" msg="Error happened in rest api!" />)}
                    {loading ? <CircularProgress /> : <>
                        {productParts?.length > 0 ?
                            <>
                                {productParts.map(part => {
                                    return <Grid item xs={12}><ProductPartAccordion openWorkDialog={openWorkDialog} productPart={part} /></Grid>
                                })}

                                <Grid item xs={12}>
                                    {loadingMore ? <CircularProgress /> : <>
                                        {noMore ? <Alert severity="info">No more results</Alert> :
                                            <IconButton onMouseEnter={(() => {
                                                setPage(page + 1)
                                                loadMore(page + 1, pageSize)
                                            })} sx={{ color: theme.palette.success.main }}><ExpandMoreIcon /></IconButton>
                                        }
                                    </>

                                    }
                                </Grid>
                            </>
                            :
                            <Grid item xs={12}>
                                <Alert severity="info">No product parts</Alert>
                            </Grid>
                        }

                    </>
                    }
                </Grid>
            </CardContent>
        </Card >
    );
}

export default StationCard

