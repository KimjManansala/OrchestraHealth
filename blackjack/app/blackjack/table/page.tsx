"use client";
import React, { useEffect } from 'react';
import { calculateHandValue, drawCardsFromDeck, isPlayerWinner, reshuffleDeck } from '../../../helpers';
import { Container, useDisclosure, useToast } from '@chakra-ui/react';
import { useBlackJackContextProvider } from '../../../contexts';
import DealersCards from './_components/DealersCards';
import PlayerCards from './_components/PlayerCards';
import GameOverAlert from './_components/GameOverAlert';

interface ITable {
}

const Table: React.FC<ITable> = ({
}) => {
    const { deckData, playerCards, dealerCards, setDeckData, setDealerCards, setPlayerCards } = useBlackJackContextProvider();
    const toast = useToast();
    const { isOpen: isOpenEndGameAlert, onOpen: onOpenEndGameAlert, onClose: onCloseEndGameAlert } = useDisclosure()
    const cancelRef = React.useRef()
    const [gameOverMessage, setGameOverMessage] = React.useState<string>('')

    const startGame = async () => {
        if (deckData) {
            try {
                    const newShuffleDeck = await reshuffleDeck(deckData.deck_id, );
                    const initialCards = await drawCardsFromDeck(deckData.deck_id, 4);
                    setDealerCards(initialCards.slice(0, 2));
                    setPlayerCards(initialCards.slice(2));
                    setDeckData((prev) => ({...prev, remaining: newShuffleDeck.remaining - 4}));
            } catch (error) {
                console.error(error);
                useToast({
                    description: 'Unable to deal initial cards',
                    status: 'error'
                })
            }
        }
    }

    const handleGameStand = (values?: {playerValue: number, dealerValue: number}) => {
        let playerValue;
        let dealerValue;
        if (!values) {
            playerValue = calculateHandValue(playerCards);
            dealerValue = calculateHandValue(dealerCards);
        } else {
            playerValue = values.playerValue
            dealerValue = values.dealerValue
        }

        if (isPlayerWinner(playerValue, dealerValue)) {
            setGameOverMessage('You won!')
        } else {
            setGameOverMessage('You lost!')
        }
        onOpenEndGameAlert();
    }

    useEffect(() => {
        if (deckData?.remaining <= 0) {
            toast({
                'description': 'Deck is empty, Start shuffle and deal cards',
                'status': 'info'
            })
        }
    }, [deckData?.remaining])

    useEffect(() => {
        if (playerCards.length > 0 && dealerCards.length > 0) {
            const playerValue = calculateHandValue(playerCards);
            const dealerValue = calculateHandValue(dealerCards);
            console.log({
                playerValue,
                dealerValue
            })
            if (playerValue >= 21) {
                handleGameStand({playerValue, dealerValue})
            } else {
                console.log('can continue', isPlayerWinner(playerValue, dealerValue))
            }
        }
    }, [playerCards, dealerCards])


    return (
        <Container maxW='xl' mt={{base: '5%', md: '15%'}}>
            <DealersCards startGame={startGame} />
            <PlayerCards deckData={deckData} handleStand={handleGameStand} />
            <GameOverAlert
                isOpen={isOpenEndGameAlert}
                onClose={onCloseEndGameAlert}
                message={gameOverMessage}
                cancelRef={cancelRef}
                playerCards={playerCards}
            />
        </Container>
    );
};

export default Table;