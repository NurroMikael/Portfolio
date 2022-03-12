import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ApiError from '../ApiError/ApiError';
import { CircularProgress, Grid, Button } from '@mui/material';
import WorkCard from '../Card/WorkCard';
import { grey } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add'

const ProductPartAccordion = (props) => {
    const { productPart, openWorkDialog } = props
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [works, setWorks] = useState([])

    useEffect(() => {
        setLoading(true)

        let filter = {
            where: {
                productPartId: productPart.id
            }
        }

        axios.post(window.BACKENDURL + "Works/findData", { filter: filter }).then(res => {
            setWorks(res.data.works)
            setLoading(false)
        }).catch((e) => {
            setError(true)
        })
    }, [productPart])

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{productPart.name}</Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ backgroundColor: grey[800] }}>

                    {error && (<ApiError title="Rest api error" msg="Error happened in rest api!" />)}

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button color="success" variant="contained" onClick={(() => { openWorkDialog(productPart) })}>
                                Add work
                                <AddIcon />
                            </Button>
                        </Grid>

                        {loading ? <CircularProgress /> : <>
                            {works.map(work => {
                                return <Grid item><WorkCard product={productPart.product} work={work} /></Grid>
                            })}
                        </>
                        }
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default ProductPartAccordion