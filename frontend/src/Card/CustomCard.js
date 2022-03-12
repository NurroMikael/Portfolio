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
import { Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import WorkCard from './WorkCard';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const CustomCard = (props) => {
    const { product, productPart, img, openAddWorkDialog } = props

    const [show, setShow] = useState(false)

    return (
        <Card sx={{ width: 300 }}>
            <CardHeader
                action={<>
                    <IconButton title="Add work for product part" onClick={(() => {
                        openAddWorkDialog(productPart)
                    })}>
                        <AddIcon />
                    </IconButton>

                    {productPart?.works?.length > 0 && (
                        <IconButton title="Add work for product part" onClick={(() => {
                            setShow(!show)
                        })}>
                            {show ? <ArrowDropUpIcon /> :
                                <ArrowDropDownIcon />
                            }
                        </IconButton>
                    )}
                </>
                }
                title={<Grid container spacing={2}>
                    <Grid item xs={12}>
                        {productPart.name + "," + productPart.id}
                    </Grid>
                </Grid>}
                subheader={<Grid container spacing={2}>
                    <Grid item xs={12}>
                        {productPart.stations.name}<br />
                        {product.name}/{product.id}
                    </Grid>
                </Grid>}
            />
            {img != null && (
                <CardMedia
                    component="img"
                    height="140"
                    image={img.src}
                />
            )}
            {show && (
                <CardContent sx={{ backgroundColor: grey[300] }}>
                    <Grid container spacing={2}>
                        {productPart.works.map(work => {
                            return <Grid item xs={12}><WorkCard product={product} work={work} /></Grid>
                        })}
                    </Grid>
                </CardContent>
            )}
        </Card>
    );
}

export default CustomCard

