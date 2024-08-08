import React from 'react';
import { IDeckOfCards } from '../../../helpers';
import { Container, Grid, GridItem, HStack, SimpleGrid, VStack, Wrap } from '@chakra-ui/react';

interface ITable {
    deckOfCards: IDeckOfCards
}

const Table: React.FC<ITable> = ({
    deckOfCards
}) => {
    return (
        <Container maxW='xl' mt={{base: '5%', md: '15%'}}>
            <SimpleGrid>
                Dealers Cards
            </SimpleGrid>
            <Wrap>
                Players cards
            </Wrap>
        </Container>
    );
};

export default Table;