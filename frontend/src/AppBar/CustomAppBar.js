import react, { useEffect, useRef, useState } from 'react'
import Container from '@mui/material/Container'
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { AppBar, Button, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, ThemeProvider, Toolbar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/styles';
import { makeStyles } from '@material-ui/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const useStyles = makeStyles({
    text: {
        '&:hover': {
            color: "rgb(25, 151, 165)",
        },
    }
});

const CustomAppBar = (props) => {
    const { path, callback, handleClick, customComponent } = props
    const classes = useStyles()
    const theme = useTheme()
    const navigator = useNavigate()

    return <>
        <AppBar position="fixed" color="primary">
            <Toolbar >
                {customComponent != null ?
                    customComponent
                    :
                    <>
                        <Grid item xs={4}>
                            <Grid container spacing={2} direction="row" alignItems="flex-start" justifyContent="flex-start">
                                <IconButton onClick={(() => {
                                    navigator("/")
                                })}>
                                    <HomeIcon className={classes.text} fontSize='large' style={{ color: theme.palette.getContrastText(theme.palette.primary.main) }} />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
                                <List >
                                    <ListItem button onClick={(() => { callback("/") })} style={{ color: path === "/" ? 'rgb(25, 151, 165)' : theme.palette.getContrastText(theme.palette.primary.main) }}>
                                        <ListItemText className={classes.text} primary={"Home"} />
                                    </ListItem>
                                </List>
                                <List >
                                    <ListItem button onClick={(() => { callback("/about-me") })} style={{ color: path === "/about-me" ? 'rgb(25, 151, 165)' : theme.palette.getContrastText(theme.palette.primary.main) }}>
                                        <ListItemText className={classes.text} primary={"About me"} />
                                    </ListItem>
                                </List>
                                <List >
                                    <ListItem button onClick={(() => { callback("/experiences") })} style={{ color: path === "/experiences" ? 'rgb(25, 151, 165)' : theme.palette.getContrastText(theme.palette.primary.main) }}>
                                        <ListItemText className={classes.text} primary={"Experiences"} />
                                    </ListItem>
                                </List>
                                <List >
                                    <ListItem button onClick={(() => { navigator("/projects") })} style={{ color: path === "projects" ? 'rgb(25, 151, 165)' : theme.palette.getContrastText(theme.palette.primary.main) }}>
                                        <ListItemText className={classes.text} primary={"Projects"} />
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
                                <IconButton onClick={handleClick}>
                                    <MenuIcon className={classes.text} fontSize='large' style={{ color: theme.palette.getContrastText(theme.palette.primary.main) }} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </>
                }
            </Toolbar>
        </AppBar>

    </>
}

export default CustomAppBar;

