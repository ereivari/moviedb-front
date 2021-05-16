import React from 'react'
import ReactDOM from 'react-dom'
import { ListMovies } from './pages/list-movies'
import { Movie } from './pages/movie'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Switch>
                <Route path="/list" component={ListMovies} />
                <Route path="/movie" component={Movie} />
                <Redirect to="/list" />
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
