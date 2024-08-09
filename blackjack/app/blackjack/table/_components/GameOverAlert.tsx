import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button, Text, Wrap, Card, CardBody, CardHeader } from '@chakra-ui/react';
import React from 'react';
import { ICard } from '../../../../helpers';
import PlayingCard from './PlayingCard';

interface IGameOverAlert {
    isOpen: boolean
    onClose: () => void;
    message: string;
    cancelRef: React.MutableRefObject<any>
    playerCards: ICard[]
    gameValues: {playerValue: number, dealerValue: number}
    isWinner: boolean

}

const GameOverAlert: React.FC<IGameOverAlert> = ({ isOpen, onClose, message, cancelRef, playerCards, gameValues, isWinner }) => {
    return (
        <AlertDialog
            isOpen={isOpen}
            onClose={onClose}
            leastDestructiveRef={cancelRef}
        >
            <AlertDialogOverlay>
            <AlertDialogContent backgroundColor={isWinner ? 'lightgreen' : 'indianred'}>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                {message}
                </AlertDialogHeader>

                <AlertDialogBody>
                You had total points of
                {' '}
                <Text
                    fontWeight='bold'
                    display='inline'
                >
                    {String(gameValues.playerValue)}
                </Text>
                {' '}
                and the dealer had
                {' '}
                <Text
                    fontWeight='bold'
                    display='inline'
                >
                    {String(gameValues.dealerValue)}
                </Text>
                {' '}
                <Card mt={5} backgroundColor={isWinner ? 'green' : 'red'}>
                    <CardHeader>
                        <Text
                            fontWeight='bold'
                            display='inline'
                            fontSize='lg'
                        >
                            Your cards
                        </Text>
                    </CardHeader>
                    <CardBody>
                        <Wrap>
                            {playerCards.map((card, index) => (
                                <PlayingCard
                                    key={index}
                                    card={card}
                                    isFaceUp
                                />
                            ))}
                        </Wrap>
                    </CardBody>
                </Card>
                </AlertDialogBody>
                <AlertDialogFooter>
                <Button colorScheme='gray' onClick={onClose} ml={3} variant='ghost'>
                    Reshuffle
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default GameOverAlert;