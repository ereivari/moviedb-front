import react, { useEffect, setState, useState } from 'react'
import { List } from '../components/list'
import { grid } from '@material-ui/core'
import { Page } from '../components/page'
import axios from 'axios'

import { Link } from 'react-router-dom'
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'

const COLUMNS = [
    {
        field: 'name',
        headerName: 'Nimi',
        renderCell: ({ value }) => (
            <Link to={`/movie?name=${value}`}>{value}</Link>
        ),
        width: 410,
    },
    {
        field: 'year',
        headerName: 'Vuosi',
        width: 100,
    },
    {
        field: 'genres',
        headerName: 'Genret',
        width: 210,
    },
]

export const ListMovies = () => {
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [count, setCount] = useState(0)

    const getMovies = (order, limit, offset, sort) => {
        axios
            .get(
                `${API_URL}/movies?limit=${limit}&offset=${offset}&orderby=${order}&direction=${sort}`
            )
            .then((movies) => {
                setLoading(false)
                setCount(movies.data.count)
                setMovies(movies.data.rows)
            })
            .catch(setError)
    }

    useEffect(() => {
        setLoading(true)
        getMovies('name', 10, 0, 'asc')
    }, [])

    if (error) {
        return <div>Virhe tapahtui</div>
    }

    return (
        <Page>
            <List
                columns={COLUMNS}
                count={count}
                loading={loading}
                getRows={getMovies}
                rows={movies.map((m) => {
                    return { ...m, id: m.name }
                })}
            >
                asdsad
            </List>
        </Page>
    )
}
