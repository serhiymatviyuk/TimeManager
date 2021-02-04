import * as React from 'react';
import AppRoutings from './appRoutings';
import ModalDialog from './modal/modal';
import { Container } from '@material-ui/core';
import AppHeader from './header/appHeader';
import Projects from './projects/projects';

const AppRoot: React.FC = (props: any) => {
    return (
        <Container maxWidth="lg">
            <AppHeader />

            <AppRoutings />

            <ModalDialog />
        </Container>
    )
};

export default AppRoot;