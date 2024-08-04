import { useTheme } from "tamagui"


export function CustomStyles() {
    
    const theme = useTheme()

    const NavigationHeaderStyle = () => ({
        headerStyle: {
            backgroundColor: theme?.background?.get(),
            // backgroundColor: 'transparent',
        },
        headerTintColor: theme?.color10?.get(),
        headerTitleStyle: {
            color: theme?.color?.get(),
        },
    })

    return { NavigationHeaderStyle }
}
