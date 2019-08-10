import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import PlayIcon from '@material-ui/icons/PlayArrow';
import Slide from '@material-ui/core/Slide';
import ConfigTable from '../pages/ConfigTable';

const useStyles = makeStyles(theme => ({
  addPos: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddButton() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSave() {
      alert("Saving config file")
  }

  return (
    <div>
      <Fab onClick={handleClick} color="primary" aria-label="add" className={classes.addPos}>
        <AddIcon />
      </Fab>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <div className={classes.toolbarButtons}>
                <IconButton color="inherit" onClick={handleSave} aria-label="close">
                <PlayIcon />
                </IconButton>
                <IconButton color="inherit" onClick={handleSave} aria-label="close">
                <SaveIcon />
                </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <ConfigTable />
      </Dialog>
    </div>
  );
}