import axios from 'axios'
import { ButtonBase } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { List } from '../components/list'
import { Page } from '../components/page'

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
        type: 'number',
        headerName: 'Vuosi',
        width: 100,
    },
    {
        field: 'genres',
        headerName: 'Genret',
        width: 210,
    },
    {
        field: 'actors',
        headerName: 'Actors',
        width: 210,
    },
    {
        field: 'director',
        headerName: 'Director',
        width: 210,
    },
]

export const ListMovies = () => {
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [count, setCount] = useState(0)

    const getMovies = (order, limit, offset, sort, search) => {
        const whereStr = search
            ? Object.keys(search)
                  .map((v) => search[v] && `${v}=${search[v]}`)
                  .join('&')
            : ''

        axios
            .get(
                `${API_URL}/movies?limit=${limit}&offset=${offset}&orderby=${order}&direction=${sort}&${whereStr}`
            )
            .then((movies) => {
                setError(undefined)
                setCount(movies.data.count)
                setMovies(movies.data.rows)
                setLoading(false)
            })
            .catch(setError)
    }

    useEffect(() => {
        setLoading(true)
        getMovies('name', 25, 0, 'asc')
    }, [])

    if (loading) {
        return <div>Ladataan</div>
    }

    return (
        <Page>
            {error && <div>Virhe haussa</div>}
            <List
                columns={COLUMNS}
                count={count}
                loading={loading}
                getRows={getMovies}
                rows={movies}
            />
            <ButtonBase>
                <Link to="/add-movie">Uusi Elokuva</Link>
            </ButtonBase>
        </Page>
    )
}
