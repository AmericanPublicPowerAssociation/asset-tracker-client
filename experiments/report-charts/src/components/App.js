import React from 'react'
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

const App = ({message}) =><h1>Hello from {message}</h1>;

App.propTypes = {
    message: PropTypes.string
};

export default hot(module)(App);