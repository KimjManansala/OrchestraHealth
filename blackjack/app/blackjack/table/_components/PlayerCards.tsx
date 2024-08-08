import { Card, CardBody, CardHeader, Wrap } from '@chakra-ui/react';
import React from 'react';
import PlayingCard from './PlayingCard';
import { ICard } from '../../../../helpers';

interface IPlayerCards {
    playerCards: ICard[];
}

const PlayerCards: React.FC<IPlayerCards> = ({ playerCards }) => {

    return (
        <Card mt={5}>
            <CardHeader>
                Player Cards
            </CardHeader>
            <CardBody>
                <Wrap>
                    {playerCards.map((card, index) => (
                        <PlayingCard key={index} card={card} isFaceUp />
                    ))}
                </Wrap>
            </CardBody>
        </Card>
    );
};

export default PlayerCards;