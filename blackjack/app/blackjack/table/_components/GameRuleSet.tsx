import { useDisclosure, Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, Card, CardBody, CardHeader, ListItem, UnorderedList, Text } from '@chakra-ui/react';
import React from 'react';

interface IGameRuleSet {
    // Define your properties here
}

const GameRuleSet: React.FC<IGameRuleSet> = () => {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Card mt={5}>
            <Accordion allowMultiple>
                <AccordionItem>
                <CardHeader>
                <h2>
                    <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                        FAQ
                    </Box>
                    <AccordionIcon />
                    </AccordionButton>
                </h2>
                </CardHeader>
                <CardBody mt={0} pt={0}>
                    <AccordionPanel pb={4}>
                        <Text fontWeight='bold' mt={5}>
                                Rules:
                        </Text>
                        <UnorderedList>
                            <ListItem>
                                {`Dealer is always initially dealt two cards. Any only two cards`}
                            </ListItem>
                            <ListItem>
                                You can hit: You are dealt one more card to add to your point value. The player may hit as many times as they like, until their card value exceeds 21, at which point the game ends in an automatic loss
                            </ListItem>
                            <ListItem>
                                Stand: Ends the round (for the purposes of this project, this will end the game)
                            </ListItem>
                        </UnorderedList>
                        <Text fontWeight='bold' mt={5}>
                            You win if:
                        </Text>
                        <UnorderedList>
                            <ListItem>
                                {`The House’s total is > 21 and your total is < 21 (for the purposes of this project, you can ignore this condition, since the House will only have two cards and cannot get a total > 21)`}
                            </ListItem>
                            <ListItem>
                                {`Your current total is < 21 but higher than the House’s total`}
                            </ListItem>
                            <ListItem>
                                {`Your current total is 21 and the House’s total is not 21`}
                            </ListItem>
                        </UnorderedList>
                        <Text fontWeight='bold' mt={5}>
                                You lose if:
                        </Text>
                        <UnorderedList>
                            <ListItem>
                                {`Your current total totals over 21 (don’t forget to factor in the different edge cases of the Ace card!)`}
                            </ListItem>
                            <ListItem>
                                {`You current total is < 21 but lower than the House’s total`}
                            </ListItem>
                            <ListItem>
                                {`You tie with the House`}
                            </ListItem>
                        </UnorderedList>
                    </AccordionPanel>
                </CardBody>
                </AccordionItem>
            </Accordion>
        </Card>
    )
};

export default GameRuleSet;