import React from 'react'
import {
    Grid,
    FormControl,
    InputLabel,
    Chip,
    Select,
    Paper,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TagFacesIcon from '@material-ui/icons/TagFaces'
import { FieldArray } from 'formik'
import { difference } from 'lodash'

const GENRES = [
    'Action',
    'Adventure',
    'Sci-fi',
    'Drama',
    'Animation',
    'Biography',
    'War',
]

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}))

export const ChipsList = (props) => {
    const classes = useStyles()
    const { name } = props

    return (
        <Paper component="ul" className={classes.root}>
            <FieldArray
                name={name}
                render={(arrayHelpers) => {
                    const addGenre = (e) => {
                        arrayHelpers.push(e.target.value)
                    }
                    return (
                        <Grid>
                            {arrayHelpers.form.values[name] &&
                                arrayHelpers.form.values[name].map((v, i) => (
                                    <li key={v}>
                                        <Chip
                                            icon={TagFacesIcon}
                                            label={v}
                                            onDelete={() => {
                                                arrayHelpers.remove(i)
                                            }}
                                            className={classes.chip}
                                        />
                                    </li>
                                ))}
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="Add genre">
                                    Add Genre
                                </InputLabel>
                                <Select
                                    native
                                    onChange={addGenre}
                                    inputProps={{
                                        name: 'genre',
                                        id: 'age-native-simple',
                                    }}
                                >
                                    {difference(
                                        GENRES,
                                        arrayHelpers.form.values[name] || []
                                    ).map((g) => {
                                        return <option value={g}>{g}</option>
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    )
                }}
            />
        </Paper>
    )
}
