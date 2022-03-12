import { createTheme } from '@mui/material/styles';
import { blue, green, grey, purple, } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#021a3d',
            light: '#6d69ff',
            dark: '#000000',
            contrastText: '#fff'
        }
    },
    secondary: {
        main: '#fff'
    },
});

const getDefaultTheme = () => {
    return theme
}

export default {
    getDefaultTheme
}