import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/styles';

const ApiError = (props) => {
    const { title, msg } = props
    const theme = useTheme()

    return (
        <Alert sx={{ color: 'error.main', margin: 2 }} variant="outlined" severity="error">
            <AlertTitle>{title}</AlertTitle>
            {msg}
        </Alert>
    );
}

export default ApiError