import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    height: '10%'
  },
  button: {
    margin: theme.spacing(2),
    textDecoration: 'inherit',
    color: 'inherit'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  toolbarButtons: {
    // margin: theme.spacing(1.5),
    marginLeft: 'auto',
    marginRight: -15
  }
}))

export default function NavBar() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <a
            href="https://hypertuner.github.io"
            target="_blank"
            rel="noopener noreferrer" 
            style={{ color: 'white' }}>
            <Typography
              style={{ fontFamily: 'Minimalust', color: 'white' }}
              variant="h5">
              hypErtUner
            </Typography>
          </a>
          <span className={classes.toolbarButtons}>
            <Link className={classes.button} to="/">
              <Button className={classes.button}>Configs</Button>
            </Link>
            <Link className={classes.button} to="/graph">
              <Button className={classes.button}>Graphs</Button>
            </Link>
            <Link className={classes.button} to="/terminal">
              <Button className={classes.button}>Terminal</Button>
            </Link>
          </span>
        </Toolbar>
      </AppBar>
    </div>
  )
}
