

import React from 'react';
import { Container } from '@chakra-ui/react';
import { BlackJackContextProvider } from '../../contexts';

interface ILayout {
    children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {

    return (
        <BlackJackContextProvider>
            <Container maxW='container.xl'>{children}</Container>
        </BlackJackContextProvider>
    );
};

export default Layout;