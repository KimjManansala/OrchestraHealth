import { Button, Card,
    CardBody, CardHeader, useToast, Wrap } from '@chakra-ui/react';
import React from 'react';
import PlayingCard from './PlayingCard';
import { drawCardsFromDeck, ICard, reshuffleDeck } from '../../../../helpers';
import { useBlackJackContextProvider } from '../../../../contexts';

interface IDealerCards {
    startGame: () => void;
}

const DealersCards: React.FC<IDealerCards> = ({ startGame }) => {
    const { deckData, dealerCards, setDeckData, setDealerCards, setPlayerCards, setIsCardsShuffling, isCardsShuffling } = useBlackJackContextProvider();
    const toast = useToast();

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
                    useToast({
                        description: 'Unable to deal initial cards',
                        status: 'error'
                    })
                } finally {
                    setIsCardsShuffling(false)
                }
            })())
        }
    }

    return (
        <Card>
            <CardHeader>
                Dealers Cards
                {dealerCards.length > 0 ? (
                    <Button
                        colorScheme='blue'
                        ml={5}
                        float='right'
                        isLoading={isCardsShuffling}
                        onClick={shuffleDeck}
                    >
                            Reshuffle & Redraw
                    </Button>
                ) :(
                    <Button
                        colorScheme='blue'
                        ml={5}
                        float='right'
                        isLoading={isCardsShuffling}
                        onClick={startGame}
                    >
                            Shuffle & deal
                    </Button>
                )}
            </CardHeader>
            <CardBody>
                <Wrap>
                    <PlayingCard
                        card={{
                            code: 'back',
                            image: '',
                            images: {
                                png: '',
                                svg: ''
                            },
                            value: '',
                            suit: ''
                        }}
                        isFaceUp={false}
                    />
                    {dealerCards.map((card, index) => (
                        <PlayingCard key={index} card={card} isFaceUp/>
                    ))}
                </Wrap>
            </CardBody>
        </Card>
    );
};

export default DealersCards;