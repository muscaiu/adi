import React, { Component } from 'react';
import { Link } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            < MuiThemeProvider >
                <div className="App">
                    <header className="App-header">
                        <Link to="/">
                            <img src={logo} className="App-logo" alt="logo" />
                        </Link>
                        <p>
                            <Link to="/login">Login</Link>
                            -
                            <Link to="/register">Register</Link>
                        </p>                    
                    </header>

                    {this.props.children}

                </div>
            </MuiThemeProvider >
        )
    }
}

export default App;
