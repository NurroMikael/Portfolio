import react, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { AppBar, Button, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, ThemeProvider, Toolbar, Typography } from '@mui/material';
import useTheme from './hooks/useTheme';
import CssBaseline from "@material-ui/core/CssBaseline";
import PortFolioMainView from './MainViews/PortfolioMainView';
import ProjectsMainView from './MainViews/ProductsMainView';
import Main from './MainViews/Main';
import Stations from './MainViews/Stations';
import Works from './MainViews/Works';


const routeWrapper = () => {
    return <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/portfolio" element={<PortFolioMainView />} />
        <Route path="/projects" element={<ProjectsMainView />} />
        <Route path="/stations" element={<Stations />} />
        <Route path="/works" element={<Works />} />
    </Routes>

}



const App = () => {
    const getDefaultTheme = useTheme.getDefaultTheme()

    return <>
        <ThemeProvider theme={getDefaultTheme}>
            <CssBaseline />
            {routeWrapper()}
        </ThemeProvider>
    </>
}

export default App;


