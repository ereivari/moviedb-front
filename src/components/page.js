import react from 'react'

import { Box, Container } from '@material-ui/core'

export const Page = (props) => {
    return (
        <Box>
            <Container>{props.children}</Container>
        </Box>
    )
}
