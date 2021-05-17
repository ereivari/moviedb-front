import React from 'react'
import ReactDOM from 'react-dom'
import { ListMovies } from './pages/list-movies'
import { Movie } from './pages/movie'
import { AddMovie } from './pages/add-movie'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#fff',
        },
    },
})

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <Route path="/list" component={ListMovies} />
                    <Route path="/movie" component={Movie} />
                    <Route path="/add-movie" component={AddMovie} />
                    <Redirect to="/list" />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
