import { createContext, useContext, useEffect, useState } from 'react';


interface IBlackJackContextProvider {
    children: React.ReactNode;
}

export interface IBlackJackContext {
    // Define your interface properties here
}

const useBlackJackContext = createContext<IBlackJackContext>({
});

export const BlackJackContextProvider: React.FC<IBlackJackContextProvider> = (props) => {
    return (
            <useBlackJackContext.Provider value={{}}>
                {props.children}
            </useBlackJackContext.Provider>
    )
}

export const useBlackJackContextProvider = () => {
    return useContext(useBlackJackContext);
};