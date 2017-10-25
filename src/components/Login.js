import React, { Component } from 'react';

import './Login.css'
import Header from './Header'
import LoginForm from './LoginComponents/LoginForm'
import LoginFooter from './LoginComponents/LoginFooter'

class Login extends Component {

  render() {
    return (
      <div className="Login">
        <Header/>
        <LoginForm />
        <LoginFooter />
      </div>
    )
  }
}

export default Login
