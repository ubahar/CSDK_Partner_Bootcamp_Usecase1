import { ReactNode } from 'react';

import Container from '@mui/material/Container';

type ContentPropsType = {
    childComponent?: ReactNode
}

const ContentPage = (ContentProps: ContentPropsType) => {
    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            
            {ContentProps.childComponent}

          </Container>
    )
}

export default ContentPage