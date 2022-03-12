import react, { useEffect, useRef, useState } from 'react'
import Container from '@mui/material/Container'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../portfolio/Home';
import { AppBar, Button, CssBaseline, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, useThemeProps } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { grey } from '@mui/material/colors';
import MN from '../assets/MN.png'
import '../css/PortfolioHomePage.css'
import { Box } from '@mui/system';
import CustomDialog from '../Dialogs/CustomDialog';
import { useTheme } from '@mui/styles';
import PlaySound from '../sounds/PlaySound';
import DancingLines from '../DancingLines/Dancinglines';
import CustomAppBar from '../AppBar/CustomAppBar';


const useStyles = makeStyles({
    list: {
        padding: 20,
        '&:hover': {
            backgroundColor: "rgb(25, 151, 165)",
        },
    },
    text: {
        '&:hover': {
            color: "rgb(25, 151, 165)",
        },
    }
});

const PortfolioHomePage = (props) => {
    const { path, component, setComponent, routes, callback, open, setOpen } = props
    const classes = useStyles()
    const theme = useTheme()
    const navigator = useNavigate()

    useEffect(() => {
        let dom = document.getElementById('draggable')

        dom.style.bottom = 0
        dom.style.left = '25px'
    }, [path, component])


    useEffect(() => {
        //Handle audio dragging
        var x, y, target = null;

        let draggableDiv = document.getElementById('draggable');

        draggableDiv.style.left = 550
        draggableDiv.style.top = 500

        document.addEventListener('mousedown', function (e) {
            var clickedDragger = false;
            for (var i = 0; e.path[i] !== document.body; i++) {
                if (e.path[i].classList.contains('dragger')) {
                    clickedDragger = true;
                }
                else if (clickedDragger && e.path[i].classList.contains('draggable')) {
                    target = e.path[i];
                    target.classList.add('dragging');
                    x = e.clientX - target.style.left.slice(0, -2);
                    y = e.clientY - target.style.top.slice(0, -2);
                    return;
                }
            }
        });

        document.addEventListener('mouseup', function () {
            if (target !== null) target.classList.remove('dragging');
            target = null;
        });

        document.addEventListener('mousemove', function (e) {
            if (target === null) return;
            target.style.left = e.clientX - x + 'px';
            target.style.top = e.clientY - y + 'px';
            var pRect = target.parentElement.getBoundingClientRect();
            var tgtRect = target.getBoundingClientRect();

            if (tgtRect.left < pRect.left) target.style.left = 0;
            if (tgtRect.top < pRect.top) target.style.top = 0;
            if (tgtRect.right > pRect.right) target.style.left = pRect.width - tgtRect.width + 'px';
            if (tgtRect.bottom > pRect.bottom) target.style.top = pRect.height - tgtRect.height + 'px';
        });
    }, [])




    const handleClick = () => {
        setOpen(true)
    }



    const list = <>
        <Divider style={{ backgroundColor: theme.palette.getContrastText(theme.palette.primary.main) }} />
        <List className={classes.list}>
            <ListItem button onClick={(() => { callback("/about-me") })} style={{ color: theme.palette.getContrastText(theme.palette.primary.main) }}>
                <ListItemText primary={"About me"} />
            </ListItem>
        </List>
        <Divider style={{ backgroundColor: theme.palette.getContrastText(theme.palette.primary.main) }} />
        <List className={classes.list}>
            <ListItem button onClick={(() => { callback("/projects") })} style={{ color: theme.palette.getContrastText(theme.palette.primary.main) }}>
                <ListItemText primary={"Projects"} />
            </ListItem>
        </List>
        <Divider style={{ backgroundColor: theme.palette.getContrastText(theme.palette.primary.main) }} />
        <List className={classes.list}>
            <ListItem button onClick={(() => { callback("/experiences") })} style={{ color: theme.palette.getContrastText(theme.palette.primary.main) }}>
                <ListItemText primary={"Experiences"} />
            </ListItem>
        </List>
        <Divider style={{ backgroundColor: theme.palette.getContrastText(theme.palette.primary.main) }} />
        {/*<List className={classes.list}>
            <ListItem button onClick={(() => { callback("/contact-me") })} style={{ color: theme.palette.getContrastText(theme.palette.primary.main) }}>
                <ListItemText primary={"Contact Me"} />
            </ListItem>
        </List>
<Divider style={{ backgroundColor: theme.palette.getContrastText(theme.palette.primary.main) }} />*/}
    </>


    return <>
        <CustomAppBar path={path} callback={callback} handleClick={handleClick} />
        <div style={{ top: 70, left: 0, position: 'absolute', height: '540px', width: '100vw' }}>
            <PlaySound />
            <div style={{ marginTop: 30, }}>
                {component}
            </div>
        </div>
        {
            open && (
                <CustomDialog open={open} setOpen={setOpen} title={"Mikael Nurro (+358 40 593 4413)"} content={<Container maxWidth="xl" style={{ height: '90vh', }}
                    id="background">
                    <Grid container justifyContent={"center"} alignItems="center">
                        <img src={MN} style={{ height: 200, width: 200, marginTop: 10 }} onClick={(() => {
                            callback("/")

                        })} />
                    </Grid>
                    <Grid style={{ marginTop: 10 }}
                        container
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} style={{ marginTop: 10 }}>
                            {list}
                        </Grid>
                    </Grid>
                </Container>} />
            )
        }
    </ >

}

export default PortfolioHomePage;
