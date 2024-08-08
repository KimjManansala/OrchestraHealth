"use client";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { ICard, IDeckOfCards } from '../helpers';


interface IBlackJackContextProvider {
    children: React.ReactNode;
}

export interface IBlackJackContext {
    // States
    deckData?: IDeckOfCards
    dealerCards: ICard[]
    playerCards: ICard[]
    isCardsShuffling: boolean,
    // Setters / Functions
    setDeckData: Dispatch<SetStateAction<IBlackJackContext['deckData']>>
    setDealerCards: Dispatch<SetStateAction<IBlackJackContext['dealerCards']>>
    setPlayerCards: Dispatch<SetStateAction<IBlackJackContext['playerCards']>>
    setIsCardsShuffling: Dispatch<SetStateAction<IBlackJackContext['isCardsShuffling']>>
}

const useBlackJackContext = createContext<IBlackJackContext>({
    deckData: undefined,
    dealerCards: [],
    playerCards: [],
    isCardsShuffling: false,
    setDeckData: () => {},
    setDealerCards: () => [],
    setPlayerCards: () => [],
    setIsCardsShuffling: () => false
});

export const BlackJackContextProvider: React.FC<IBlackJackContextProvider> = (props) => {
    const [deckData, setDeckData] = useState<IDeckOfCards>();
    const [dealerCards, setDealerCards] = useState<ICard[]>([]);
    const [playerCards, setPlayerCards] = useState<ICard[]>([]);
    const [isCardsShuffling, setIsCardsShuffling] = useState<IBlackJackContext['isCardsShuffling']>(false);
    return (
            <useBlackJackContext.Provider value={{
                deckData,
                dealerCards,
                playerCards,
                isCardsShuffling,

                setDeckData,
                setDealerCards,
                setPlayerCards,
                setIsCardsShuffling,
            }}>
                {props.children}
            </useBlackJackContext.Provider>
    )
}

export const useBlackJackContextProvider = () => {
    return useContext(useBlackJackContext);
};