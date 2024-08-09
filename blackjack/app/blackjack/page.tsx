'use client';
import React, { useEffect } from 'react';
import { BlackJackContextProvider, useBlackJackContextProvider } from '../../contexts';
import { getDeckOfCards } from '../../helpers';
import { Container, useToast, Text, Center, Button, VStack } from '@chakra-ui/react';
import { BasicLoader } from '../../components';
import { useRouter } from 'next/navigation';

interface IBlackJackTablePage {
}

const BlackJackTablePage: React.FC<IBlackJackTablePage> = () => {
    const router = useRouter();
    const {deckData, setDeckData} = useBlackJackContextProvider();
    const [isDeckLoading, setIsDeckLoading] = React.useState(false);
    const toast = useToast();

    const startGame = async () => {
        setIsDeckLoading(true);
        try {
            const deckOfCards = await getDeckOfCards();
            if (deckOfCards) {
                setDeckData(deckOfCards);
                router.push('/blackjack/table');
            } else {
                throw new Error('Failed to fetch deck of cards');
            }
        } catch (error) {
            toast({
                description: 'Failed to fetch deck of cards',
                status: 'error',
            })
        } finally {
            setIsDeckLoading(false);
        }
    }

    return (
            <Container maxW='md' mt={{base: '5%', md: '15%'}}>
                <VStack>
                    <Text fontSize='6xl'>
                        Welcome!
                    </Text>
                    <Text fontSize='1xl'>
                        To play blackjack, click on the 'Enter Table' button!
                    </Text>
                    {/* <BasicLoader isLoading={isDeckLoading}> */}
                        <Button isLoading={isDeckLoading} onClick={startGame} id='enter-game-button'>
                            Enter Table
                        </Button>
                    {/* </BasicLoader> */}
                </VStack>
            </Container>
    );
};

export default BlackJackTablePage;