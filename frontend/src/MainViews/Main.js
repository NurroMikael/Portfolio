import react, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { AppBar, Button, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, ThemeProvider, Toolbar, Typography } from '@mui/material';
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles({
  root: {
    //    top: 300,
    color: '#fff',
    background: '#357a38 !important',
    padding: '100px !important',

    '&:hover': {
      backgroundColor: '#4caf50 !important',
      color: 'white',
    }
  }
});

const Main = () => {
  const styles = useStyles()
  const navigator = useNavigate()

  return <>
    <Container id="background" maxWidth={false} style={{ height: '100vh', display: 'flex' }}  >
      <Container maxWidth="md">
        <Grid container spacing={6} direction="row" style={{ marginTop: 100 }}>
          <Grid item xs={6} >
            <Button variant="contained" className={styles.root} fullWidth
              onClick={(() => {
                navigator("/portfolio")
              })}
            >Portfolio</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" className={styles.root} fullWidth
              onClick={(() => {
                navigator("/projects")
              })}>Projects</Button>
          </Grid>

          <Grid item xs={6}>
            <Button variant="contained" className={styles.root} fullWidth
              onClick={(() => {
                window.open(window.EXPLORER)
              })}>localhost:3001/explorer</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" className={styles.root} fullWidth
              onClick={(() => {
                window.open(window.NODERED)
              })}>localhost:3001/red</Button>
          </Grid>
        </Grid>

      </Container>
    </Container>
  </>
}

export default Main;
