import React from 'react';

interface ICard {
    isFaceUp?: boolean;
    frontImage: string
    suit: string;
    value: string;
}

const Card: React.FC<ICard> = ({
    isFaceUp = true,
    frontImage,
    suit,
    value
}) => {
    // TODO create card styling
    return (
        <div className="card">
            <span className="suit">{suit}</span>
            <span className="value">{value}</span>
        </div>
    );
};

export default Card;