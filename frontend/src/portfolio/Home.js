import react, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import { Button, Drawer, Grid, IconButton, Toolbar, Typography, useTheme } from '@mui/material'
import { makeStyles } from '@material-ui/styles';
import AppBar from '@mui/material/AppBar';
import { grey } from '@mui/material/colors';
import '../css/Home.css'
import '../css/FadeAndChars.css'
import CustomDialog from '../Dialogs/CustomDialog'
import useAssetHooks from '../hooks/useAssetHooks';
import DancingLines from '../DancingLines/Dancinglines'

const useStyles = makeStyles({
    root: {
        //height: '100vw',
        //width: '100vw',
        marginTop: '5%',
    },
    div: {
        marginTop: 200,
        marginLeft: 200
    },
});





const Home = (props) => {
    const { pushToHistory } = props
    const classes = useStyles()
    const renderStars = useAssetHooks.renderStars()
    const [open, setOpen] = useState(false)
    const specs = useAssetHooks.renderSpecs()


    const text = "Hi I am Mikael Nurro web-developer"

    const characters = () => {
        let res = "<span id=char1>"

        for (var i = 0; i < text.length; i++) {

            if (i == 0) {
                res += text[i] + "</span>"
            } else if (i == 2 || i == 20) {
                res += '<br/>'
            }
            else if (i == 8 || i == 15) {
                res += "<span id=char" + 2 + " >" + text[i] + "</span>"

            }
            else {
                res += "<span id=char" + 1 + " >" + text[i] + "</span>"
            }

        }
        return res
    }

    /*  const openContactDialog = () => {
          setOpen(true)
      }
  */

    return <Container maxWidth={false} className={classes.root} >
        <Grid container spacing={2} direction="row">
            <Grid item xs={6} sx={{ zIndex: 1 }}>
                <div dangerouslySetInnerHTML={{ __html: characters() }} />
                {/*<Button onClick={(() => {
                    pushToHistory("/contact-me")
                })} variant="outlined" id="animatedButton" color="success" style={{ margin: 10 }}>Contact Me</Button>*/}
                <Grid container spacing={4} direction="row" >
                    {specs.map((s, index) => {
                        return <Grid item={6} key={index}><Typography id="Typo">{s}</Typography></Grid>
                    })}
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <DancingLines
                    addLinearGradienBG={true}
                    debug={false}
                    trails={60}
                    lineWidth={.5}
                    linearGradientStops={[0, 0, 0, 2000]}
                    linearGradientColors={[{ stop: 0, color: 'rgb(0, 0, 0)' }, { stop: .5, color: 'rgb(6, 1, 45)' }, { stop: 1, color: 'rgb(0,20,15)' }]}
                />
            </Grid>

        </Grid>




        {
            open && (
                <CustomDialog open={open} setOpen={setOpen} title={"Contact Me"} content={<Container maxWidth="xl" id="background">
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} style={{ marginTop: 10 }}>
                        </Grid>
                    </Grid>
                </Container>} />
            )
        }
    </Container>

}

export default Home;

