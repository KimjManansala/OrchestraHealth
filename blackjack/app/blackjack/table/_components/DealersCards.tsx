import { Button, Card,
    CardBody, CardHeader, useToast, Wrap } from '@chakra-ui/react';
import React from 'react';
import PlayingCard from './PlayingCard';
import { drawCardsFromDeck, ICard, reshuffleDeck } from '../../../../helpers';
import { useBlackJackContextProvider } from '../../../../contexts';

interface IDealerCards {
    startGame: () => void;
    shuffleDeck: () => void;
}

const DealersCards: React.FC<IDealerCards> = ({ startGame, shuffleDeck }) => {
    const { deckData, dealerCards, isCardsShuffling } = useBlackJackContextProvider();
    const toast = useToast();

    return (
        <Card>
            <CardHeader>
                Dealers Cards
                {deckData.remaining >= 0 ? (
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