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

export enum CURRENT_GAME_STATUS {
    WIN = 'win',
    LOSE = 'lose',
    GAME_CAN_CONTINUE = 'game_can_continue'
}