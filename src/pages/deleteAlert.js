import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

import axios from 'axios';

class DeleteDialog extends Component {
  state = {
    user: {}
  };

  handleEntering = () => {
    let {user} = this.props;
    this.setState({
      user: user
    });
  };

  handleCancel = () => {
    this.props.onClose(this.props.value);
  };

  handleDelete = () => {
    axios.delete(`http://localhost:3000/users/${this.state.user._id}`)
      .then(response => {
        this.props.onClose(this.props.value);
        this.setState({
          user: {}
        });
      })
      .catch(err => {
        console.log(err);
      })
  };

  render() {
    const { user, ...other } = this.props;
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        {...other}
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.state.user.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            cancel
          </Button>
          <Button onClick={this.handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DeleteDialog;
