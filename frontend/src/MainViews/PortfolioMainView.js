import react, { useEffect, useRef, useState } from 'react'
import Container from '@mui/material/Container'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AppBar, Button, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, ThemeProvider, Toolbar, Typography } from '@mui/material';
import Home from '../portfolio/Home';
import useTheme from '../hooks/useTheme';
import CssBaseline from "@material-ui/core/CssBaseline";
import Projects from '../portfolio/Projects';
import Experiences from '../portfolio/Experiences';
import ContactMe from '../portfolio/ContactMe';
import AboutMe from '../portfolio/AboutMe';
import PortfolioHomePage from '../portfolio/PortfolioHomePage';
import PlaySound from '../sounds/PlaySound';

const PortFolioMainView = () => {

    const getDefaultTheme = useTheme.getDefaultTheme()
    const [open, setOpen] = useState(false)
    const [path, setPath] = useState("/")

    const pushToHistory = (path) => {
        setPath(path)
        setComponent(routes[path])
        if (open) {
            setOpen(!open)
        }
    }

    //Not usually the way how to build routes!!
    //Used like this to pass using component to children --> no reRendering when "changing page"
    //Not really changes the page but the used component
    //Used to keep the audio playing between pages :)
    const [routes, setRoutes] = useState({
        "/": <Home pushToHistory={pushToHistory} />,
        //"/contact-me": <ContactMe />,
        "/about-me": <AboutMe />,
        "/projects": <Projects />,
        "/experiences": <Experiences />
    })
    const [component, setComponent] = useState(routes["/"])





    return <>
        <Container maxWidth={false} style={{ height: '100vh', display: 'flex' }} id="background">
            <PortfolioHomePage path={path} open={open} setOpen={setOpen} component={component} setComponent={setComponent} routes={routes} theme={getDefaultTheme} callback={pushToHistory} />
        </Container>
    </>
}

export default PortFolioMainView;
