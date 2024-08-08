import { BlackJackContextProvider } from "../../contexts";

interface ILayout {
    children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => (
     <BlackJackContextProvider>
        {children}
     </BlackJackContextProvider>
);

export default Layout