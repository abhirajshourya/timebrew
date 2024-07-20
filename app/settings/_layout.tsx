import i18n from '@/constants/translations'
import { Stack } from 'expo-router/stack'

export default function StackLayout() {
    Stack.defaultProps = {
        initialRouteName: 'index',
        screenOptions: {
            headerShown: false,
        },
    }

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerShown: false, title: i18n.t('settings.title') }}
            />
            <Stack.Screen
                name="themes"
                options={{ headerShown: true, title: i18n.t('settings.themes') }}
            />
        </Stack>
    )
}
