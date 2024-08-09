import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react';
import React from 'react';
import { ICard } from '../../../../helpers';

interface IGameOverAlert {
    isOpen: boolean
    onClose: () => void;
    message: string;
    cancelRef: React.MutableRefObject<any>
    playerCards: ICard[]

}

const GameOverAlert: React.FC<IGameOverAlert> = ({ isOpen, onClose, message, cancelRef }) => {
    return (
        <AlertDialog
            isOpen={isOpen}
            onClose={onClose}
            leastDestructiveRef={cancelRef}
        >
            <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                {message}
                </AlertDialogHeader>

                <AlertDialogBody>
                You had these
                </AlertDialogBody>
                <AlertDialogFooter>
                <Button colorScheme='red' onClick={onClose} ml={3}>
                    Reshuffle
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default GameOverAlert;