"use client";
import React, { useEffect } from 'react';
import { drawCardsFromDeck, IDeckOfCards } from '../../../helpers';
import { Container, useToast } from '@chakra-ui/react';
import { useBlackJackContextProvider } from '../../../contexts';
import DealersCards from './_components/DealersCards';
import PlayerCards from './_components/PlayerCards';

interface ITable {
}

const Table: React.FC<ITable> = ({
}) => {
    const { deckData, playerCards, dealerCards, setDealerCards, setPlayerCards } = useBlackJackContextProvider();
    const toast = useToast();

    useEffect(() => {
        if (deckData) {
            (async () => {
                try {
                    const initialCards = await drawCardsFromDeck(deckData.deck_id, 4);
                    console.log(initialCards)
                    setDealerCards(initialCards.slice(0, 2));
                    setPlayerCards(initialCards.slice(2));
                } catch (error) {
                    console.error(error);
                    useToast({
                        description: 'Unable to deal dealers cards',
                        status: 'error'
                    })
                }
            })()
        }
    }, [])

    return (
        <Container maxW='xl' mt={{base: '5%', md: '15%'}}>
            <DealersCards dealerCards={dealerCards} />
            <PlayerCards playerCards={playerCards}/>
        </Container>
    );
};

export default Table;