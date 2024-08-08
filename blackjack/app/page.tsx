import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Container, useToast } from '@chakra-ui/react';

// 1. import `ChakraProvider` component


export default function Home() {
  return (

      <Container maxW='md' bg='blue.600' color='white'>
                Hi
        </Container>

  );
}
