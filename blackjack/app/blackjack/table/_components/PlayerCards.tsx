import { Button, Card, CardBody, CardHeader, useToast, Wrap } from '@chakra-ui/react';
import React from 'react';
import PlayingCard from './PlayingCard';
import { drawCardsFromDeck, ICard, IDeckOfCards } from '../../../../helpers';
import { useBlackJackContextProvider } from '../../../../contexts';

interface IPlayerCards {
    playerCards: ICard[];
    deckData: IDeckOfCards
}

const PlayerCards: React.FC<IPlayerCards> = ({ playerCards, deckData }) => {
    const { setPlayerCards } = useBlackJackContextProvider();
    const toast = useToast();
    const [isCardLoading, setIsCardLoading] = React.useState(false);
    const hitDeck = () => {
        if (deckData.deck_id) {
            ((async () => {
                setIsCardLoading(true)
                try {
                    const initialCard = await drawCardsFromDeck(deckData.deck_id, 1);
                    setPlayerCards((prev) => [...prev, ...initialCard]);
                } catch (error) {
                    console.error(error);
                    useToast({
                        description: 'Unable to deal initial cards',
                        status: 'error'
                    })
                } finally {
                    setIsCardLoading(false)
                }
            })())
        }
    }

    return (
        <Card mt={5}>
            <CardHeader>
                Player Cards
                <Button
                    colorScheme='blue'
                    ml={5}
                    float='right'
                    isLoading={isCardLoading}
                    onClick={hitDeck}
                >
                        Hit
                </Button>
            </CardHeader>
            <CardBody>
                <Wrap>
                    {playerCards.map((card, index) => (
                        <PlayingCard
                            key={index}
                            card={card}
                            isFaceUp
                        />
                    ))}
                </Wrap>
            </CardBody>
        </Card>
    );
};

export default PlayerCards;