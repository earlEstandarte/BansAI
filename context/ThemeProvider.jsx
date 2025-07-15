import { createContext, useState, useEffect } from 'react';
import { Appearance, Text,  } from 'react-native';
import { Colors } from '@/constants/Colors'

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) =>{
    const [colorScheme, setColorScheme] = useState(Appearance.setColorScheme());

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setColorScheme(colorScheme);
        })

        return () => {
            subscription.remove
        }
    }, []);

    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light

    return(
        <ThemeContext.Provider value={{ colorScheme, setColorScheme, theme}}>
            {children}
        </ThemeContext.Provider>
    )
}