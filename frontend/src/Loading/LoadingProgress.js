import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import MN from '../assets/MN.png'
import { Container, Grid } from '@mui/material';


const LoadingProgress = (props) => {
    const { value } = props

    return (
        <Box sx={{ width: '100%', marginTop: 20 }}>
            <Container maxWidth={"xs"}>
                <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
                    <img src={MN} style={{ height: '150px', width: '150px', marginBottom: 10 }} />
                    <LinearProgress variant="determinate" value={value} />
                </Grid>
            </Container>
        </Box>
    );
}

export default LoadingProgress