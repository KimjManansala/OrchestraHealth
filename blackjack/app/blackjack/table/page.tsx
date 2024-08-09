"use client";
import React, { useEffect } from 'react';
import { redirect} from 'next/navigation';
import { calculateHandValue, drawCardsFromDeck, ICard, isPlayerWinner, reshuffleDeck } from '../../../helpers';
import { Center, Container, Heading, useDisclosure, useToast } from '@chakra-ui/react';
import { useBlackJackContextProvider } from '../../../contexts';
import DealersCards from './_components/DealersCards';
import PlayerCards from './_components/PlayerCards';
import GameOverAlert from './_components/GameOverAlert';
import GameRuleSet from './_components/GameRuleSet';

interface ITable {
}

const Table: React.FC<ITable> = ({
}) => {
    const { deckData, playerCards, dealerCards, setDeckData, setDealerCards, setPlayerCards, setIsCardsShuffling} = useBlackJackContextProvider();
    const toast = useToast();
    const { isOpen: isOpenEndGameAlert, onOpen: onOpenEndGameAlert, onClose: onCloseEndGameAlert } = useDisclosure()
    const cancelRef = React.useRef()
    const [gameOverMessage, setGameOverMessage] = React.useState<string>('')
    const [gameValues, setGameValues] = React.useState<{playerValue: number, dealerValue: number}>({playerValue: 0, dealerValue: 0})
    const [isWinner, setIsWinner] = React.useState<boolean>(false)

    if (!deckData) {
        redirect('/blackjack')
    }

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

    const shuffleDeck = () => {
        if (deckData.deck_id) {
            ((async () => {
                setIsCardsShuffling(true)
                try {
                    const data = await reshuffleDeck(deckData.deck_id, true);
                    const initialCards = await drawCardsFromDeck(deckData.deck_id, 4);
                    setDealerCards(initialCards.slice(0, 2));
                    setPlayerCards(initialCards.slice(2));
                    setDeckData((prev) => ({...prev, remaining: prev.remaining - 4}));
                } catch (error) {
                    console.error(error);
                    toast({
                        description: 'Unable to deal initial cards',
                        status: 'error'
                    })
                } finally {
                    setIsCardsShuffling(false)
                }
            })())
        }
    }

    const handleGameStand = (_playerCards: ICard[], _dealerCards: ICard[], values?: {playerValue: number, dealerValue: number}) => {
        let playerValue;
        let dealerValue;
        if (!values) {
            playerValue = calculateHandValue(_playerCards);
            dealerValue = calculateHandValue(_dealerCards);
        } else {
            playerValue = values.playerValue
            dealerValue = values.dealerValue
        }
        if (isPlayerWinner(playerValue, dealerValue)) {
            setGameOverMessage('You won!')
            setIsWinner(true)
        } else {
            setGameOverMessage('You lost!')
            setIsWinner(false)
        }
        setGameValues({playerValue, dealerValue})
        onOpenEndGameAlert();
    }

    useEffect(() => {
        if (deckData?.remaining <= 0) {
            toast({
                'description': 'Deck is empty, Collect Cards, reshuffle and deal cards',
                'status': 'info'
            })
        }
    }, [deckData?.remaining])

    useEffect(() => {
        if (playerCards.length > 0 && dealerCards.length > 0) {
            const playerValue = calculateHandValue(playerCards);
            const dealerValue = calculateHandValue(dealerCards);
            if (playerValue >= 21 || dealerValue === 21) {
                handleGameStand(playerCards, dealerCards, {playerValue, dealerValue})
            }
        }
    }, [playerCards, dealerCards])

    const handleClose = () => {
        if (deckData.remaining <=0) {
            startGame();
        } else {
            shuffleDeck();
        }
        onCloseEndGameAlert();
    }


    return (
        <Container maxW='xl' mt={{base: '5%'}}>
            <Center>
                <Heading mb={5} textAlign='center'>
                    Welcome to the Blackjack table!
                </Heading>
            </Center>
            <DealersCards startGame={startGame} shuffleDeck={shuffleDeck} />
            <PlayerCards deckData={deckData} handleStand={handleGameStand} />
            <GameOverAlert
                isOpen={isOpenEndGameAlert}
                onClose={handleClose}
                message={gameOverMessage}
                cancelRef={cancelRef}
                playerCards={playerCards}
                gameValues={gameValues}
                isWinner={isWinner}
            />
            <GameRuleSet />
        </Container>
    );
};

export default Table;