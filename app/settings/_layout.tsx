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
            {/* TODO: i18n */}
            <Stack.Screen
                name="index"
                options={{ headerShown: false, title: 'Settings'}}
            />
            <Stack.Screen
                name="themes"
                options={{ headerShown: true, title: 'Themes' }}
            />
        </Stack>
    )
}
