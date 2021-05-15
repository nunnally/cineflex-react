import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header'
import Movies from './components/Movies'
import Movie from './components/Movie'
import Session from './components/Session'
import Success from './components/Success'


import './reset.css'
import './style.css'

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route key="movies" path='/' exact component={Movies}/>
                <Route key="sucess" path='/success' exact component={Success}/>
                <Route key="movie" path="/movie/:movieId" exact component={Movie}/>
                <Route key="movieSession" path="/session/:sessionId" exact component={Session}/>
            
            </Switch>
          
        </BrowserRouter>
    );
}

ReactDOM.render(
    <App/>,
    document.querySelector('.root')
);