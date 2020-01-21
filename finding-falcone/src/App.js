import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import FindFalcone from './components/FindFalcone';
import Result from './components/Result';

function App() {

  return (
    <>
      <Header />
      <br />
      <Switch>
          <Route exact path='/' component={FindFalcone} />
          <Route path='/result' component={Result} />
      </Switch>
      <br />
      <Footer style={{ position: 'relative' }} />
    </>

  );
}

export default App;
