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
import AddIcon from '@mui/icons-material/Add';
import { Alert, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { useTheme } from '@mui/styles';
import moment from 'moment';
import axios from 'axios';

const WorkCard = (props) => {
    const { work, maxWidth = 345, product = null } = props

    const [usingWork, setUsingWork] = useState(work)
    const theme = useTheme()

    const [styling, setStyling] = useState({})


    useEffect(() => {
        let style = {
            backgroundColor: grey[50],
            color: theme.palette.getContrastText(grey[50])
        }


        if (usingWork.start != null && usingWork.end == null) {
            style.backgroundColor = theme.palette.success.main
            style.color = theme.palette.getContrastText(theme.palette.success.main)
        }

        if (usingWork.duration != null) {
            style.backgroundColor = theme.palette.info.main
            style.color = theme.palette.getContrastText(theme.palette.info.main)
        }

        setStyling(style)
    }, [usingWork])




    const start = () => {
        let obj = {
            start: moment()
        }
        axios.post(window.BACKENDURL + "Works/updateWorkById", { id: work.id, obj: obj }).then(res => {
            console.log('started', res.data.work)
            setUsingWork(res.data.work)
        })
    }

    const end = () => {
        let end = moment()
        let start = moment(usingWork.start)

        let diff = end.diff(start)
        let duration = moment.utc(diff).format("HH:mm:ss")

        console.log('duration', duration)

        let obj = {
            end: end,
            duration: duration.toString()
        }

        axios.post(window.BACKENDURL + "Works/updateWorkById", { id: work.id, obj: obj }).then(res => {
            console.log('ended', res.data.work)
            setUsingWork(res.data.work)
        })
    }


    return (
        <Card sx={{ maxWidth: maxWidth }} style={styling}>
            <CardHeader
                title={<Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography>{work.name}</Typography>
                        {usingWork.start != null && (
                            <Typography >{moment(usingWork.start).format('DD/MM/YYYY HH:mm:ss')}</Typography>
                        )}
                        {usingWork.end != null && (
                            <Typography >{moment(usingWork.end).format('DD/MM/YYYY HH:mm:ss')}</Typography>
                        )}
                        {usingWork.duration != null && (
                            <Typography >{usingWork.duration}</Typography>
                        )}
                    </Grid>
                </Grid>}
            />
            <CardActions>
                {product != null && product.ready ? <Alert severity="success">Work/Product is done</Alert> :
                    <>
                        {usingWork.start == null && usingWork.duration == null && (
                            <Grid container spacing={2} justifyContent="center" alignItems={"flex-start"}>
                                <IconButton onClick={(() => {
                                    start()
                                })} >
                                    <PlayArrowIcon />
                                </IconButton>
                            </Grid>
                        )}
                        {usingWork.end == null && usingWork.duration == null && usingWork.start != null && (
                            <Grid container spacing={2} justifyContent="center" alignItems={"flex-end"}>
                                <IconButton onClick={(() => {
                                    end()
                                })} >
                                    <StopIcon />
                                </IconButton>
                            </Grid>
                        )}
                    </>
                }
            </CardActions>
        </Card>
    );
}

export default WorkCard

