import Head from 'next/head';
import styles from '../styles/Home.module.css';

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'


export default function Home() {
  return (
    <ChakraProvider>
      <div>Hello</div>
    </ChakraProvider>
  );
}
