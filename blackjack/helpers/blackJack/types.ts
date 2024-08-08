export interface IDeckOfCards {
    success: boolean;
    deck_id: string;
    shuffled: boolean;
    remaining: number;
}

export interface ICard {
    code: string;
    image: string;
    images: {
        svg: string;
        png: string;
    };
    value: string;
    suit: string;
}