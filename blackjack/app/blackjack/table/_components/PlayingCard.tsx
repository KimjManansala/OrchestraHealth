import React from 'react';
import { ICard } from '../../../../helpers';
import { Image} from '@chakra-ui/react'

interface IPlayerCard {
    isFaceUp?: boolean;
    card: ICard
}

const PlayingCard: React.FC<IPlayerCard> = ({
    isFaceUp = true,
    card,
}) => {
    if (!isFaceUp) {
        return (
            <Image
                boxSize='150px'
                objectFit='scale-down'
                src='https://deckofcardsapi.com/static/img/back.png'
                alt={card.code}
            />
        )
    }
    return (
        <Image
            boxSize='150px'
            objectFit='scale-down'
            src={card.image}
            alt={card.code}
        />
    );
};

export default PlayingCard;