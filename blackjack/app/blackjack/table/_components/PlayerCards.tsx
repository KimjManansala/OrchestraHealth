import { Button, Card, CardBody, CardHeader, useToast, Wrap } from '@chakra-ui/react';
import React from 'react';
import PlayingCard from './PlayingCard';
import { drawCardsFromDeck, ICard, IDeckOfCards } from '../../../../helpers';
import { useBlackJackContextProvider } from '../../../../contexts';

interface IPlayerCards {
    deckData: IDeckOfCards
    handleStand: (playerCards: ICard[], dealerCards: ICard[]) => void;
}

const PlayerCards: React.FC<IPlayerCards> = ({ deckData, handleStand }) => {
    const { dealerCards, playerCards, setPlayerCards, isCardsShuffling, setDeckData } = useBlackJackContextProvider();
    const toast = useToast();
    const [isCardLoading, setIsCardLoading] = React.useState(false);
    const hitDeck = () => {
        if (deckData.deck_id) {
            ((async () => {
                setIsCardLoading(true)
                try {
                    const initialCard = await drawCardsFromDeck(deckData.deck_id, 1);
                    setDeckData((prev) => ({...prev, remaining: prev.remaining - 1}));
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
            <CardHeader id='player-card-header'>
                Player Cards
                <Button
                    colorScheme='blue'
                    ml={5}
                    float='right'
                    isLoading={isCardLoading}
                    onClick={hitDeck}
                    isDisabled={isCardsShuffling || deckData?.remaining <= 0 || dealerCards.length < 2}
                >
                        Hit
                </Button>
                <Button
                    colorScheme='blue'
                    ml={5}
                    float='right'
                    isLoading={isCardLoading}
                    onClick={() => {handleStand(playerCards, dealerCards)}}
                    isDisabled={isCardsShuffling || deckData?.remaining <= 0 || dealerCards.length < 2}
                >
                        Stand
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