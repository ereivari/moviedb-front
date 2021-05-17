import {
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
} from '@material-ui/core'
import { useField } from 'formik'
import React from 'react'

export const FormikField = (props) => {
    const { label, helper } = props

    const [formikField] = useField(props)

    return (
        <FormControl>
            <InputLabel shrink={!!formikField.value} htmlFor="my-input">
                {label}
            </InputLabel>
            <Input
                {...formikField}
                id="my-input"
                aria-describedby="my-helper-text"
            />
            <FormHelperText id="my-helper-text">{helper}</FormHelperText>
        </FormControl>
    )
}
