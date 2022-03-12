import react, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import { Button, Drawer, Grid, IconButton, Toolbar, Typography, useTheme } from '@mui/material'
import { makeStyles } from '@material-ui/styles';
import AppBar from '@mui/material/AppBar';
import { grey } from '@mui/material/colors';
import CustomDialog from '../Dialogs/CustomDialog'
import SkillBar from 'react-skillbars';
import '../css/Experiences.css'
import '../css/FadeAndChars.css'
import useAssetHooks from '../hooks/useAssetHooks';
import DancingLines from '../DancingLines/Dancinglines';

const useStyles = makeStyles({

});






const Experiences = (props) => {
    const classes = useStyles()
    const theme = useTheme()
    const specs = useAssetHooks.renderSpecs()


    let SKILLS = [
        {
            "type": "Java",
            "level": 60
        },
        {
            "type": "React-Native",
            "level": 75
        },
        {
            "type": "React",
            "level": 85
        },
        {
            "type": "Javascript",
            "level": 85
        },
        {
            "type": "NodeRed",
            "level": 80
        },
        {
            "type": "Docker",
            "level": 50
        },
        {
            "type": "MySQL",
            "level": 85
        },
        {
            "type": "AWS",
            "level": 40
        }
    ]

    SKILLS = SKILLS.sort(({ level: a }, { level: b }) => b - a);


    const colors = {
        "bar": "#0777a3",
        "title": {
            //"z-index": 9,
            //"width": '160px',
            "text": "#fff",
            "background": "#043f57"
        }
    }

    const text = "My Skills"

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

    return <>
        <Container maxWidth={'xl'}  >
            <Grid container spacing={2} direction="row">
                <Grid item xs={6} style={{ zIndex: 1 }}>
                    <Grid item xs={12}>
                        <div id="fadeText" dangerouslySetInnerHTML={{ __html: characters() }} />
                        <Typography style={{ color: theme.palette.getContrastText(theme.palette.primary.main) }} variant="p">
                            I have experiences with React as a web-developer.{<br />} I am familiar with React´s structures and hooks
                            I have also worked with mobile applications{<br />} with React-native for android and ios.{<br />}
                            For backend i am familiar with MySQL databases and data-models.{<br />}{<br />}
                            I have been mainly working with loopback-mysql.{<br />}
                            NodeRed as a middle handler is a very useful tool to handle data between front- and backend.{<br />}
                            I have been using NodeRed as a database integration tool.{<br />}

                            I also have experience with Java from my computer science studies. Python goes into same category also.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: 95 }}>
                        <Grid container spacing={2} direction="row">
                            {specs.map((s, index) => {
                                return <Grid item={6} key={index}><Typography id="Typo">{s}</Typography></Grid>
                            })}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6} style={{ zIndex: 1 }}>
                    <SkillBar skills={SKILLS} animationDuration={7000} animationDelay={0} colors={colors} height={'48px'} />
                </Grid>

                <Grid item xs={2}>
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
        </Container>


    </>

}

export default Experiences;

