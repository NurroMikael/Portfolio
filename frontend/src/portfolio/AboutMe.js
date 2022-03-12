import react, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import { Alert, Button, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemText, Slide, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@material-ui/styles';
import AppBar from '@mui/material/AppBar';
import { grey } from '@mui/material/colors';
import CustomDialog from '../Dialogs/CustomDialog'
import useAssetHook from '../hooks/useAssetHooks';
import JPG from '../assets/Minä2.jpg'
import { useTheme } from '@mui/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DancingLines from '../DancingLines/Dancinglines';
import '../css/FadeAndChars.css'
import GitHubIcon from '@mui/icons-material/GitHub'

const useStyles = makeStyles({
    root: {
        // height: '100vw',
        // width: '100vw',
        //        marginTop: '0%',
    },

    list: {
        //backgroundColor: 'red',
        borderBottom: '1px solid #fff',
        padding: 20,
        '&:hover': {
            backgroundColor: "rgb(25, 151, 165)",
        },
    },
});





const AboutMe = (props) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const theme = useTheme()

    const [showCopied, setShowCopied] = useState(false)
    const [copiedText, setCopiedText] = useState("")
    const specs = useAssetHook.renderSpecs()


    const text = "React-Developer"

    const characters = () => {
        let res = "<span id=char1>"

        for (var i = 0; i < text.length; i++) {

            if (i == 0) {
                res += text[i] + "</span>"
            }
            else {
                res += "<span id=char" + 1 + " >" + text[i] + "</span>"
            }

        }
        return res
    }

    const copied = (value) => {
        setCopiedText(value)
        navigator.clipboard.writeText(value)
        setShowCopied(true)

        setTimeout(() => {
            setShowCopied(false)
        }, 2000)
    }


    return <>
        <Container maxWidth={'xl'} className={classes.root} >
            <Grid container spacing={2} direction="row">
                <Grid item xs={6} sx={{ zIndex: 1 }}>
                    <Grid container spacing={2} direction="column" justifyContent={"flex-start"} alignItems="flex-start">
                        <Grid item xs={12}>
                            <div id="fadeText" dangerouslySetInnerHTML={{ __html: characters() }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography style={{ color: theme.palette.getContrastText(theme.palette.primary.main) }} variant="p">
                                I am an web-developer located in Finland Oulu. I am passioned about {<br />}
                                beautiful UI-views, complicated data-models, Rest-api, database integration and leadership. {<br />}I have been
                                working on industrial processes with React and React-native {<br />} for over a year as a professional.

                                {<br />}{<br />}
                                I have very strong background for teamwork and leading from my athlete background.{<br />}
                                I have studied psychology and marketing as my minor studies as they{<br />}
                                support my knowledge and passions.
                                I am currently studying computer science in Easter Finlands university.{<br />}In spring 2022
                                i am going to apply to Oulu´s university.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: 21, zIndex: 20 }}>
                            <Grid container spacing={2} direction="row">
                                {specs.map((s, index) => {
                                    return <Grid item={6} key={index}><Typography id="Typo">{s}</Typography></Grid>
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>



                <Grid item xs={6} sx={{ zIndex: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <Grid container spacing={2} direction="row" justifyContent={"center"} alignItems="center">
                                <Grid item xs={6}>
                                    {showCopied && (<Slide direction="right" in={showCopied} mountOnEnter unmountOnExit>
                                        <Alert severity="success" style={{ backgroundColor: 'green', color: 'white' }}>({copiedText}) Copied To Clipboard!</Alert>

                                    </Slide>)}
                                </Grid>
                                {/* <Grid item xs={6}>
                                    <img src={JPG} style={{ height: 150, width: 150 }} />

                            </Grid>*/}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: 8, }}>
                            <List className={classes.list} sx={{ borderTop: '1px solid #fff' }} onClick={(() => {
                                copied("Mikael Nurro")
                            })}>
                                <ListItem button style={{ color: theme.palette.getContrastText(theme.palette.primary.main), }}>
                                    <ListItemText primary={"Mikael Nurro"} />
                                    <ContentCopyIcon />
                                </ListItem>
                            </List>
                            <List className={classes.list} onClick={(() => {
                                copied("+358 40 593 4413")
                            })}>
                                <ListItem button style={{ color: theme.palette.getContrastText(theme.palette.primary.main) }}>
                                    <ListItemText primary={"+358 40 593 4413"} />
                                    <ContentCopyIcon />
                                </ListItem>
                            </List>
                            <List className={classes.list} onClick={(() => {
                                copied("nurro.mikael@gmail.com")
                            })}>
                                <ListItem button style={{ color: theme.palette.getContrastText(theme.palette.primary.main) }}>
                                    <ListItemText primary={"nurro.mikael@gmail.com"} />
                                    <ContentCopyIcon />
                                </ListItem>
                            </List>
                            <List className={classes.list}>
                                <ListItem button onClick={(() => {

                                    window.open("https://www.linkedin.com/in/mikael-nurro-187494191/", "_blank");
                                })} style={{ color: theme.palette.getContrastText(theme.palette.primary.main) }}>
                                    <ListItemText primary={"Check out my LinkedIn"} />
                                    <LinkedInIcon />
                                </ListItem>
                            </List>
                            <List className={classes.list}>
                                <ListItem button onClick={(() => {

                                    window.open('https://github.com/NurroMikael');
                                })} style={{ color: theme.palette.getContrastText(theme.palette.primary.main) }}>
                                    <ListItemText primary={"Check out my GitHub"} />
                                    <GitHubIcon />
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={2}>
                    <DancingLines
                        addLinearGradienBG={true}
                        debug={false}
                        trails={60}
                        lineWidth={.5}
                        linearGradientStops={[0, 0, 0, 2000]}
                        linearGradientColors={[{ stop: 0, color: 'rgb(0, 0, 0)' }, { stop: .5, color: 'rgb(6, 1, 45)' }, { stop: 1, color: 'rgb(0,20,15)' }]}
                    />    </Grid>

            </Grid>
        </Container>


    </>

}

export default AboutMe;

