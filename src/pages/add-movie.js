import { Button, Grid } from '@material-ui/core'
import axios from 'axios'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Page } from '../components/page'
import { Actors, Genres, MovieFields } from './movie'
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'

/**
 *  Form to add movie
 * @param {*} props
 * @returns
 */
export const AddMovie = (props) => {
    const [error] = useState(undefined)
    const history = useHistory()

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
            <Formik
                initialValues={{}}
                isInitialValid
                enableReinitialize
                onSubmit={async (values) => {
                    const dir = values.director.split(' ')

                    axios
                        .post(`${API_URL}/movie`, {
                            ...values,
                            director: {
                                firstName: dir[0],
                                lastName: dir[1],
                            },
                            actors: values.actors.map((a) => {
                                return {
                                    firstName: a[0],
                                    lastName: a[1],
                                }
                            }),
                        })
                        .then((p) => {
                            alert('Movie Added Successfully')
                        })
                        .catch((e) => alert(e))
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
                            <Button type="submit" variant="contained">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </Page>
    )
}
