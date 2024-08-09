import { ICard, calculateHandValue, isPlayerWinner } from "../../../helpers";

describe('Blackjack Utils', () => {
    describe('calculateHandValue', () => {
        it('should return 0 for an empty hand', () => {
            const hand: ICard[] = [];
            const result = calculateHandValue(hand);
            expect(result).toBe(0); // Use 'toBe' for exact equality
        });

        it('should return the sum of card values for a non-empty hand', () => {
            const hand: ICard[] = [
                { value: '2', suit: 'hearts' } as ICard,
                { value: '5', suit: 'diamonds' } as ICard,
                { value: '10', suit: 'clubs' } as ICard,
            ];
            const result = calculateHandValue(hand);
            expect(result).toBe(17); // Use 'toBe' for exact equality
        });

        it('should handle face cards and ace correctly', () => {
            const hand: ICard[] = [
                { value: '10', suit: 'hearts' } as ICard, // Jack
                { value: '10', suit: 'diamonds' } as ICard, // Queen
                { value: 'ACE', suit: 'clubs' } as ICard, // ACE
            ];
            const result = calculateHandValue(hand);
            expect(result).toBe(21); // Use 'toBe' for exact equality
        });

        it('should handle multiple aces correctly', () => {
            const hand: ICard[] = [
                { value: '2', suit: 'hearts' } as ICard,
                { value: '5', suit: 'diamonds' } as ICard,
                { value: 'ACE', suit: 'clubs' } as ICard,
                { value: '10', suit: 'hearts' } as ICard,
            ];
            const result = calculateHandValue(hand);
            expect(result).toBe(18); // Adjusted expected value to 20 for multiple aces
        });
    });
    describe('isPlayerWinner', () => {
        it('should return false if playerValue is greater than 21', () => {
            const playerValue = 22;
            const dealerValue = 20;
            const result = isPlayerWinner(playerValue, dealerValue);
            expect(result).toBe(false);
        });

        it('should return true if playerValue is 21 and dealerValue is less than 21', () => {
            const playerValue = 21;
            const dealerValue = 20;
            const result = isPlayerWinner(playerValue, dealerValue);
            expect(result).toBe(true);
        });
        it('should return true if playerValue is 17 and dealerValue is less than 15', () => {
            const playerValue = 17;
            const dealerValue = 15;
            const result = isPlayerWinner(playerValue, dealerValue);
            expect(result).toBe(true);
        });

        it('should return false if playerValue is 17 and dealerValue is less than 17', () => {
            const playerValue = 17;
            const dealerValue = 17;
            const result = isPlayerWinner(playerValue, dealerValue);
            expect(result).toBe(false);
        });

        it('should return false if playerValue is 17 and dealerValue is less than 21', () => {
            const playerValue = 17;
            const dealerValue = 21;
            const result = isPlayerWinner(playerValue, dealerValue);
            expect(result).toBe(false);
        });

        it('should return false if playerValue is 17 and dealerValue is less than 17', () => {
            const playerValue = 17;
            const dealerValue = 17;
            const result = isPlayerWinner(playerValue, dealerValue);
            expect(result).toBe(false);
        });

        it('should return false if playerValue is 21 and dealerValue is less than 21', () => {
            const playerValue = 21;
            const dealerValue = 21;
            const result = isPlayerWinner(playerValue, dealerValue);
            expect(result).toBe(false);
        });
    })
});