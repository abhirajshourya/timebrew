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
            {/* <Stack.Screen
                name="index"
                options={{ headerShown: true, title: 'Themes' }}
            /> */}
        </Stack>
    )
}
