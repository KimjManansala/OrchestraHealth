import React from 'react';

interface ICard {
    suit: string;
    value: string;
}

const Card: React.FC<ICard> = ({ suit, value }) => {
    return (
        <div className="card">
            <span className="suit">{suit}</span>
            <span className="value">{value}</span>
        </div>
    );
};

export default Card;