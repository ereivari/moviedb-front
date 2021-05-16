import react, { useEffect, setState, useState } from 'react'
import { List } from '../components/list'
import { grid } from '@material-ui/core'
import { Page } from '../components/page'
import axios from 'axios'
import { useLocation, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField } from '@material-ui/core'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'

export const Movie = (props) => {
    const [movie, setMovie] = useState({})
    const [error, setError] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const location = useLocation()
    const history = useHistory()

    const getMovie = () => {
        const query = new URLSearchParams(location.search)
        axios
            .get(`${API_URL}/movie?name=${query.get('name')}`)
            .then((movie) => {
                setMovie(movie.data)
                setLoading(false)
            })
            .catch(setError)
    }

    useEffect(() => {
        setLoading(true)
        getMovie()
    }, [])

    const onClickBack = () => {
        history.goBack()
    }

    if (error) {
        return (
            <div>
                <Button onClick={onClickBack}>Back</Button>
                <span>Elokuvaa ei olemassa</span>
            </div>
        )
    }

    return (
        <Page>
            <Button onClick={onClickBack}>Back</Button>
            <TextField id="standard-basic" label="Standard" />
            <Button variant="contained">Submit</Button>
        </Page>
    )
}
