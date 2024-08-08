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
    // Setters / Functions
    setDeckData: Dispatch<SetStateAction<IBlackJackContext['deckData']>>
    setDealerCards: Dispatch<SetStateAction<IBlackJackContext['dealerCards']>>
    setPlayerCards: Dispatch<SetStateAction<IBlackJackContext['playerCards']>>
}

const useBlackJackContext = createContext<IBlackJackContext>({
    deckData: undefined,
    dealerCards: [],
    playerCards: [],
    setDeckData: () => {},
    setDealerCards: () => [],
    setPlayerCards: () => [],
});

export const BlackJackContextProvider: React.FC<IBlackJackContextProvider> = (props) => {
    const [deckData, setDeckData] = useState<IDeckOfCards>();
    const [dealerCards, setDealerCards] = useState<ICard[]>([]);
    const [playerCards, setPlayerCards] = useState<ICard[]>([]);
    return (
            <useBlackJackContext.Provider value={{
                deckData,
                dealerCards,
                playerCards,

                setDeckData,
                setDealerCards,
                setPlayerCards
            }}>
                {props.children}
            </useBlackJackContext.Provider>
    )
}

export const useBlackJackContextProvider = () => {
    return useContext(useBlackJackContext);
};