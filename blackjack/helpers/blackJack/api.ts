import axios from "axios";
import { ICard, IDeckOfCards } from "./types";

/**
 * Retrieves a new deck of cards from the Deck of Cards API.
 * @returns A promise that resolves to an object representing the deck of cards.
 * @throws An error if there is an issue calling the Deck of Cards API.
 */
export const getDeckOfCards: () => Promise<IDeckOfCards> = async () => {
    try {
    const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    return response.data;
    } catch (error) {
        console.error('Unable to retrieve Deck of Cards');
        throw new Error(error);
    }
}

/**
 * Draws a specified number of cards from a deck.
 * @param deckId - The ID of the deck to draw cards from.
 * @param numberOfCards - The number of cards to draw from the deck.
 * @returns A promise that resolves to an array of cards.
 * @throws If unable to draw cards from the deck.
 */
export const drawCardsFromDeck: (deckId: string, numberOfCards: number) => Promise<ICard[]> = async (deckId, numberOfCards) => {
    try {
        const response = await axios(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numberOfCards}`);
        return response.data.cards
    } catch (error) {
        console.error('Unable to draw cards from deck');
        throw new Error(error);
    }
}

/**
 * Reshuffles the deck of cards.
 * @param deckId - The ID of the deck to reshuffle.
 * @param keepRemaining - Optional. If true, keeps the remaining cards in the deck. Defaults to false.
 * @returns A promise that resolves to the reshuffled deck of cards.
 * @throws An error if unable to reshuffle the deck.
 */
export const reshuffleDeck: (deckId: string, keepRemaining?: boolean ) => Promise<IDeckOfCards> = async (deckId, keepRemaining=false) => {
    try {
        const response = await axios(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/${keepRemaining ? '?remaining=true': ''}`);
        return response.data;
    } catch (error) {
        console.error('Unable to reshuffle deck');
        throw new Error(error);
    }
}