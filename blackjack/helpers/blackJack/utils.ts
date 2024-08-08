import { ICard } from "./types";

/**
 * Calculates the total value of a hand in a blackjack game.
 * @param cards - An array of cards representing the hand.
 * @returns The total value of the hand.
 */
export const calculateHandValue:(cards: ICard[]) => number = (cards) => {
    let totalValue = 0;
    let aceCount = 0;
    // Calculate the initial total value and count the number of aces
    cards.forEach((card) => {
        if (card.value === 'ACE') {
            aceCount++;
            totalValue += 11;
        } else if (['KING', 'QUEEN', 'JACK'].includes(card.value)) {
            totalValue += 10;
        } else {
            totalValue += parseInt(card.value, 10);
        }
    });

    // Adjust for aces if total value exceeds 21
    while (totalValue > 21 && aceCount > 0) {
        totalValue -= 10;
        aceCount--;
    }
    return totalValue;
}

/**
 * Determines whether the player wins in a blackjack game.
 * @param playerCards - An array of cards held by the player.
 * @param dealerCards - An array of cards held by the dealer.
 * @returns A boolean indicating whether the player wins.
 */
export const isPlayerWin:(playerCards: ICard[], dealerCards: ICard[]) => boolean = (
    playerCards,
    dealerCards
    ) => {
        const playerValue = calculateHandValue(playerCards);
        const dealerValue = calculateHandValue(dealerCards);

        return playerValue > 21 ? false // Player is greater than 21: Lose
            : playerValue === 21 && dealerValue !== 21 ? true // Player value is 21: Win
            : playerValue < 21 && playerValue > dealerValue ? true // Player is closer to 21: Win
            : playerValue < 21 && playerValue < dealerValue ? false // Dealer is closer to 21: Lose
            : playerValue === dealerValue ? false // Player and dealer have the same value: Lose
            : false; // Default to lose. The house always wins.
    }