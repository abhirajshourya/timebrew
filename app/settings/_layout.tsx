import { CustomStyles } from '@/constants/Styles'
import i18n from '@/constants/translations'
import { Stack } from 'expo-router/stack'


export default function StackLayout() {
    const navStyle = CustomStyles().NavigationHeaderStyle()
    Stack.defaultProps = {
        initialRouteName: 'index',
        screenOptions: {
            headerShown: false,
        },
    }

    return (
        <Stack screenOptions={navStyle}>
            <Stack.Screen
                name="index"
                options={{ headerShown: false, title: i18n.t('settings.title') }}
            />
            <Stack.Screen
                name="themes"
                options={{ headerShown: true, title: i18n.t('settings.themes') }}
            />
            <Stack.Screen
                name="goal"
                options={{ headerShown: true, title: 'Goals' }}
            />
        </Stack>
    )
}
