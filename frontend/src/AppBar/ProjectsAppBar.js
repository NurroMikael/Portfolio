import react, { useEffect, useRef, useState } from 'react'
import Container from '@mui/material/Container'
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { Alert, AppBar, Button, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, ThemeProvider, Toolbar, Typography } from '@mui/material';
import CustomAppBar from '../AppBar/CustomAppBar';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


const useStyles = makeStyles({
    text: {
        '&:hover': {
            color: "rgb(25, 151, 165)",
        },
    },
});

const ProjectsAppBar = (props) => {
    const classes = useStyles()
    const navigator = useNavigate()
    const path = useLocation();
    const theme = useTheme()




    const appBar = <>
        <Grid item xs={4}>
            <Grid container spacing={2} direction="row" alignItems="flex-start" justifyContent="flex-start">
                <IconButton onClick={(() => {
                    navigator("/")
                })}>
                    <HomeIcon className={classes.text} fontSize='large' style={{ color: theme.palette.getContrastText(theme.palette.primary.main) }} />
                </IconButton>
            </Grid>
        </Grid>
        <Grid item xs={12}>

            <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
                <List >
                    <ListItem button onClick={(() => { navigator("/projects") })} style={{ color: path.pathname === "/projects" ? 'rgb(25, 151, 165)' : theme.palette.getContrastText(theme.palette.primary.main) }}>
                        <ListItemText className={classes.text} primary={"Products"} />
                    </ListItem>
                </List>

                <List >
                    <ListItem button onClick={(() => { navigator("/stations") })} style={{ color: path.pathname === "/stations" ? 'rgb(25, 151, 165)' : theme.palette.getContrastText(theme.palette.primary.main) }}>
                        <ListItemText className={classes.text} primary={"Stations"} />
                    </ListItem>
                </List>
                <List >
                    <ListItem button onClick={(() => { navigator("/works") })} style={{ color: path.pathname === "/works" ? 'rgb(25, 151, 165)' : theme.palette.getContrastText(theme.palette.primary.main) }}>
                        <ListItemText className={classes.text} primary={"Works"} />
                    </ListItem>
                </List>
                <List >
                    <ListItem button onClick={(() => { navigator("/portfolio") })} style={{ color: theme.palette.getContrastText(theme.palette.primary.main) }}>
                        <ListItemText className={classes.text} primary={"Portfolio"} />
                    </ListItem>
                </List>
            </Grid>
        </Grid>

        <Grid item xs={4}>
            <Grid container spacing={2} direction="row" alignItems="flex-start" justifyContent="flex-end">
                <IconButton onClick={(() => {
                    window.open('https://github.com/NurroMikael')

                })}>
                    <GitHubIcon className={classes.text} fontSize='large' style={{ color: theme.palette.getContrastText(theme.palette.primary.main) }} />
                </IconButton>
                <IconButton onClick={(() => {
                    window.open('https://www.linkedin.com/in/mikael-nurro-187494191/", "_blank')
                })}>
                    <LinkedInIcon className={classes.text} fontSize='large' style={{ color: theme.palette.getContrastText(theme.palette.primary.main) }} />
                </IconButton>
            </Grid>
        </Grid>
    </>



    return <>
        <CustomAppBar customComponent={appBar} />
    </>
}

export default ProjectsAppBar;
