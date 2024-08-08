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
    const { deckData, dealerCards, setDealerCards, setPlayerCards } = useBlackJackContextProvider();
    const toast = useToast();
    const [isShuffleLoading, setIsShuffleLoading] = React.useState(false);

    const shuffleDeck = () => {
        if (deckData.deck_id) {
            ((async () => {
                setIsShuffleLoading(true)
                try {
                    const data = await reshuffleDeck(deckData.deck_id, true);
                    const initialCards = await drawCardsFromDeck(deckData.deck_id, 4);
                    setDealerCards(initialCards.slice(0, 2));
                    setPlayerCards(initialCards.slice(2));
                } catch (error) {
                    console.error(error);
                    useToast({
                        description: 'Unable to deal initial cards',
                        status: 'error'
                    })
                } finally {
                    setIsShuffleLoading(false)
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
                        isLoading={isShuffleLoading}
                        onClick={shuffleDeck}
                    >
                            Reshuffle & Redraw
                    </Button>
                ) :(
                    <Button
                        colorScheme='blue'
                        ml={5}
                        float='right'
                        isLoading={isShuffleLoading}
                        onClick={startGame}
                    >
                            Start game
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