import {
    Button,
    FormControl,
    Grid,
    IconButton,
    Typography,
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import axios from 'axios'
import { FieldArray, Form, Formik } from 'formik'
import React, { useEffect, useState, useCallback } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { ChipsList } from '../components/chips-list'
import { FormikField } from '../components/formik-field'
import { Page } from '../components/page'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'
export const MovieFields = () => [
    <FormikField
        name="name"
        readOnly={true}
        label="Name"
        helper="movies name"
    />,
    <FormikField label="Year" name="year" helper="Year movie was made" />,
    <FormikField
        label="Synopsis"
        name="synopsis"
        helper="Synopsis of the movie"
    />,
    <FormikField label="Rating" name="rating" helper="rating of the movie" />,
    <FormikField
        label="Age limit"
        name="ageLimit"
        helper="age limit of the movie"
    />,
    <FormikField
        label="Director"
        name="director"
        helper="Director of the movie"
    />,
]
export const Genres = () => (
    <FormControl>
        <Typography variant="subtitle1">Genres</Typography>
        <ChipsList name="genres" />
    </FormControl>
)

export const Actors = () => [
    <Typography variant="subtitle1">Actors</Typography>,
    <FieldArray
        name="actors"
        render={(arrayHelpers) => {
            const { actors } = arrayHelpers.form.values
            const addActor = () => {
                arrayHelpers.push('')
            }
            const deleteActor = (index) => () => {
                arrayHelpers.remove(index)
            }

            return (
                <Grid item>
                    <Grid container direction="column">
                        {actors &&
                            actors.map((a, i) => {
                                return (
                                    <Grid>
                                        <FormikField name={`actors.${i}`} />
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                        >
                                            <Delete onClick={deleteActor(i)} />
                                        </IconButton>
                                    </Grid>
                                )
                            })}
                        <Button onClick={addActor}>Add actor</Button>
                    </Grid>
                </Grid>
            )
        }}
    />,
]
export const Movie = (props) => {
    const [movie, setMovie] = useState({})
    const [error, setError] = useState(undefined)
    const location = useLocation()
    const history = useHistory()

    const getMovie = useCallback(() => {
        const query = new URLSearchParams(location.search)
        axios
            .get(`${API_URL}/movie?name=${query.get('name')}`)
            .then((movie) => {
                setMovie(movie.data)
            })
            .catch(setError)
    }, [location.search])

    useEffect(() => {
        getMovie()
    }, [getMovie])

    const onClickBack = () => {
        history.goBack()
    }

    if (error || !movie) {
        return (
            <div>
                <Button onClick={onClickBack}>Back</Button>
                <span>Elokuvaa ei olemassa</span>
            </div>
        )
    }
    return (
        <Page>
            <Formik
                initialValues={movie}
                isInitialValid
                enableReinitialize
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500))
                    alert(JSON.stringify(values, null, 2))
                }}
            >
                <Form>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <MovieFields />
                        <Actors />
                        <Genres />
                        <Grid item>
                            <Button onClick={onClickBack}>Cancel</Button>
                            <Button type="submit" variant="contained" disabled>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </Page>
    )
}
