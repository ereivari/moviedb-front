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
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ChipsList } from '../components/chips-list'
import { FormikField } from '../components/formik-field'
import { Page } from '../components/page'

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
                        <FormikField
                            name="name"
                            readOnly={true}
                            label="Name"
                            helper="movies name"
                        />
                        <FormikField
                            label="Year"
                            name="year"
                            helper="Year movie was made"
                        />
                        <FormikField
                            label="Age limit"
                            name="ageLimit"
                            helper="age limit of the movie"
                        />
                        <FormikField
                            label="Director"
                            name="director"
                            helper="Director of the movie"
                        />
                        <FormikField
                            label="Synopsis"
                            name="synopsis"
                            helper="Synopsis of the movie"
                        />
                        <FormikField
                            label="Rating"
                            name="rating"
                            helper="rating of the movie"
                        />
                        <Typography variant="subtitle1">Actors</Typography>
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
                                                            <FormikField
                                                                name={`actors.${i}`}
                                                            />
                                                            <IconButton
                                                                edge="end"
                                                                aria-label="delete"
                                                            >
                                                                <Delete
                                                                    onClick={deleteActor(
                                                                        i
                                                                    )}
                                                                />
                                                            </IconButton>
                                                        </Grid>
                                                    )
                                                })}
                                            <Button onClick={addActor}>
                                                Add actor
                                            </Button>
                                        </Grid>
                                    </Grid>
                                )
                            }}
                        />
                        <FormControl>
                            <Typography variant="subtitle1">Genres</Typography>
                            <ChipsList name="genres" />
                        </FormControl>
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
