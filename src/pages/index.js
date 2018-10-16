import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import AddEditDialog from './addEditDialog';
import DeleteDialog from './deleteAlert';

import axios from 'axios';

class Users extends Component {
  state = {
    open: false,
    openDelete: false,
    users: [],
    user: {
      name: '',
      mobile: '',
      email: ''
    }
  };

  initialState = {
    open: false,
    users: [],
    user: {
      name: '',
      mobile: '',
      email: ''
    }
  };

  componentDidMount() {
    // const defaultAxiosOptions = {
    //   baseURL: process.env.api_url
    // };
    
    // Server request without authentication
    // const fetch = axios.create(defaultAxiosOptions);
    axios.get(`http://localhost:3000/users`)
      .then(response => {
        this.setState({users: response.data});
      })
      .catch(err => {
        console.log(err);
        this.setState({error: err});
      });
      
  }

  handleClickListItem = user => {
    console.log(user);
    if (user) {
      this.setState({
        user: {...user},
        open: true
      });
    } else {
      this.setState({ 
        user: {...this.initialState.user},
        open: true 
      });
    }
    
  };

  handleClose = value => {
    if (value) {
      axios.get(`http://localhost:3000/users`)
        .then(response => {
          this.setState({users: response.data});
          this.setState({ value, open: false });
        })
        .catch(err => {
          console.log(err);
          this.setState({error: err});
        });
    } else {
      this.setState({ 
        user: {
          name: '',
          mobile: '',
          email: ''
        }, 
        open: false 
      });
    }
  };

  handleDelete = user => {
    this.setState({
      user: {...user},
      openDelete: true
    });
  }

  handleCloseDelete = () => {
    axios.get(`http://localhost:3000/users`)
      .then(response => {
        this.setState({users: response.data});
        this.setState({
          user: {...this.initialState.user},
          openDelete: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({error: err});
      });
    // this.setState({
    //   user: {...this.initialState.user},
    //   openDelete: false
    // });
  }

  render() {
    let id = 0;
    function createData(name, calories, fat, carbs, protein) {
      id += 1;
      return { id, name, calories, fat, carbs, protein };
    }

    return (
      <React.Fragment>
        <Paper >
          <Button variant="outlined" color="primary" onClick={() => this.handleClickListItem()}>
            Add
          </Button>
          <AddEditDialog
            open={this.state.open}
            onClose={this.handleClose}
            user={this.state.user}
          />
          <DeleteDialog
            open={this.state.openDelete}
            onClose={this.handleCloseDelete}
            user={this.state.user}
          />
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell numeric>Mobile</TableCell>
              <TableCell numeric>Email</TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.users.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell numeric>{row.mobile}</TableCell>
                  <TableCell numeric>{row.email}</TableCell>
                  <TableCell numeric>
                    <Button variant="outlined" color="primary" 
                      onClick={() => {
                        this.handleClickListItem(row);
                      }}
                    >
                      edit
                    </Button>
                  </TableCell>
                  <TableCell numeric>
                    <Button variant="outlined" color="secondary"
                      onClick={() => {
                        this.handleDelete(row);
                      }}
                    >
                      delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        </Paper>
      </React.Fragment>
    )
  }
}

export default Users;