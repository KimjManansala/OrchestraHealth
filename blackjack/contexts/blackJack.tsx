"use client";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { IDeckOfCards } from '../helpers';


interface IBlackJackContextProvider {
    children: React.ReactNode;
}

export interface IBlackJackContext {
    // States
    deckData?: IDeckOfCards
    // Setters / Functions
    setDeckData: Dispatch<SetStateAction<IBlackJackContext['deckData']>>
}

const useBlackJackContext = createContext<IBlackJackContext>({
    deckData: undefined,
    setDeckData: () => {}
});

export const BlackJackContextProvider: React.FC<IBlackJackContextProvider> = (props) => {
    const [deckData, setDeckData] = useState<IDeckOfCards>();
    return (
            <useBlackJackContext.Provider value={{
                deckData,

                setDeckData
            }}>
                {props.children}
            </useBlackJackContext.Provider>
    )
}

export const useBlackJackContextProvider = () => {
    return useContext(useBlackJackContext);
};