import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
// import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';

class AddEditDialog extends Component {
  constructor(props) {
    super();
    this.state = {
      value: props.value,
      formvalidation: {},
      fields: {
        name: '',
        mobile: '',
        email: ''
      },
      validationRule: {
        email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        mobile: /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/,
        required: /^.{1,}$/,
        name: /^.{1,}$/
      }
    };
  }

  handleEntering = () => {
    let {user} = this.props;
    console.log(user);
    this.setState({
      fields: {...user}
    });
  };
  

  handleCancel = () => {
    this.props.onClose(this.props.value);
  };

  validation = (field) => {
    let errorMessage = {};
    let isvalid = true;
    if (!this.state.formvalidation[field]) {
      this.setState({
        formvalidation: {
          [field]: {}
        }
      });
    }
    if (this.state.validationRule.required.test(this.state.fields[field]) === false) {
      errorMessage[field] = {};
      errorMessage[field].isvalid = false;
      errorMessage[field].message = `required.`;
      // this.setState({ formvalidation: errorMessage});
      isvalid = false;
    }
    if (this.state.validationRule[field].test(this.state.fields[field]) === false) {
      if (errorMessage[field] == null) {
        errorMessage[field] = {message: ''};
      }
      errorMessage[field].isvalid = false;
      errorMessage[field].message += `invalid.`;
      // this.setState({ formvalidation: errorMessage});
      isvalid = false;
    }
    this.setState({ formvalidation: errorMessage});
    return isvalid
  }

  handleOk = () => {
    if (
      this.validation('name') &&
      this.validation('mobile') &&
      this.validation('email')
    ) {
      console.log(this.state.fields)
      console.log(this.state.fields.id);
      if (this.state.fields._id) {
        axios.put(`http://localhost:3000/users/${this.state.fields._id}`, this.state.fields)
          .then(response => {
            this.props.onClose(true);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        axios.post(`http://localhost:3000/users/`, this.state.fields)
          .then(response => {
            this.props.onClose(true);
          })
          .catch(err => {
            console.log(err);
          });
      }      
    }
    
  };

  render() {
    const { value, ...other } = this.props;
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        {...other}
      >
        {/* <DialogTitle id="confirmation-dialog-title">Phone Ringtone</DialogTitle> */}
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="name"
            value={this.state.fields.name}
            onChange={event => {
              this.setState({ 
                fields: {
                  ...this.state.fields,
                  name: event.target.value
                } }, () => this.validation('name'));
              
            }}
            fullWidth
            error={
              this.state.formvalidation.name && 
                this.state.formvalidation.name.isvalid === false
                ? true
                : false
            }
            helperText={
              this.state.formvalidation.name && 
                this.state.formvalidation.name.isvalid === false 
                  ? this.state.formvalidation.name.message 
                  : ' '
            }
          />
          <TextField
            required
            margin="dense"
            id="mobile"
            label="Mobile"
            type="number"
            fullWidth
            value={this.state.fields.mobile}
            onChange={event => {
              this.setState({
                fields: {
                  ...this.state.fields,
                  mobile: event.target.value
                } 
              }, () => this.validation('mobile'));
            }}
            error={
              this.state.formvalidation.mobile && 
                this.state.formvalidation.mobile.isvalid === false
                ? true
                : false
            }
            helperText={
              this.state.formvalidation.mobile && 
                this.state.formvalidation.mobile.isvalid === false 
                  ? this.state.formvalidation.mobile.message 
                  : ' '
            }
          />
          <TextField
            required
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={this.state.fields.email}
            onChange={event => {
              this.setState({ 
                fields: {
                  ...this.state.fields,
                  email: event.target.value
                } 
              }, () => this.validation('email'));
            }}
            error={
              this.state.formvalidation.email && 
                this.state.formvalidation.email.isvalid === false
                ? true
                : false
            }
            helperText={
              this.state.formvalidation.email && 
                this.state.formvalidation.email.isvalid === false 
                  ? this.state.formvalidation.email.message 
                  : ' '
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleCancel()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.handleOk()} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AddEditDialog;
