import { Card, CardBody, CardHeader, Wrap } from '@chakra-ui/react';
import React from 'react';
import PlayingCard from './PlayingCard';
import { ICard } from '../../../../helpers';

interface IDealerCards {
    dealerCards: ICard[];
}

const DealersCards: React.FC<IDealerCards> = ({ dealerCards }) => {

    return (
        <Card>
            <CardHeader>
                Dealers Cards
            </CardHeader>
            <CardBody>
                <Wrap>
                    {dealerCards.map((card, index) => (
                        <PlayingCard key={index} card={card} isFaceUp />
                    ))}
                </Wrap>
            </CardBody>
        </Card>
    );
};

export default DealersCards;