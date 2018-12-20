import React, { Component } from 'react';

import { HashRouter } from 'react-router-dom';
import Routes from './components/Main/Routes';


class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="app">
          <Routes/>
        </div>  
      </HashRouter> 
    );
  }
}

export default App;
