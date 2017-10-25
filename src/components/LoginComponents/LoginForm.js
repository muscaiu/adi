import React, { Component } from 'react';
// import { hashHistory } from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
// import validator from 'validator'
import axios from 'axios'

import { subscribeToTimer, emitLogin } from '../../api';

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {},
      password: '',
      username: '',
    }

    subscribeToTimer((err, timestamp) => this.setState({
      timestamp: 'no timestamp yet'
    }));
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    // // Validation
    // if (!validator.isLength(this.state.username, { min: 2, max: 100 })) {
    //   this.setState({ errors: { username: 'Must be 2-100 characters long' } })
    //   return false
    // }

    // if (!validator.isLength(this.state.password, { min: 6, max: undefined })) {
    //   this.setState({ errors: { password: 'Must be at least 6 characters long' } })
    //   return false
    // }

    // // this.props.startSpinner()
    // this.setState({ errors: {} })

    // return this.props.login(this.state.username, this.state.password)
    //   .then((response) => {
    //     if (response.loggedIn === true) {
    //       hashHistory.push('/home')
    //     }
    //     else {
    //       // this.props.stopSpinner()
    //       // this.props.openSnack(4000, 'Failed to login.')
    //     }
    //   })
    //   .catch(err => {
    //     // console.error(err)
    //   })

    let loginData = {
      username: this.state.username,
      password: this.state.password
    }
    // axios.get('http://localhost:3001/api/login', loginData)
    //   .then(res => console.log(res.data))
    //   .catch(err => console.log(err))

    axios.post('http://localhost:3001/api/login', loginData)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))

    emitLogin(loginData)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form-login">
          <div className="form-group">
            <TextField
              name="username" hintText="Email" errorText={this.state.errors.username || ''}
              onChange={this.handleChange} id="usernameTextField"
            />
          </div>
          <div className="form-group">
            <TextField
              name="password" hintText="Password" errorText={this.state.errors.password || ''}
              type="password" onChange={this.handleChange} id="passwordTextField"
            />
          </div>

          <div className="submit">
            <RaisedButton className="bigLogin" label="Login" type="submit" primary />
            {/* <DynamicSpinner spinnerRunning={this.props.spinnerRunning} /> */}
          </div>
          {/* <DynamicSnack
                        snackOpen={this.props.snackOpen}
                        snackTimer={this.props.snackTimer}
                        snackMessage={this.props.snackMessage}
                        closeSnack={this.props.closeSnack}
                        stopSpinner={this.props.stopSpinner}
                    /> */}
        </form>

        This is the timer value: {this.state.timestamp}

      </div>
    )
  }
}

export default LoginForm
