import { ChakraProvider } from "@chakra-ui/react"

export const metadata = {
  title: 'Orchestra Health Blackjack table',
  description: 'Blackjack table take home assignment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <ChakraProvider>
        {children}
      </ChakraProvider>
      </body>
    </html>
  )
}
