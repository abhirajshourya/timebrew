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
                options={{ headerShown: false, title: 'Tags' }}
            />
            <Stack.Screen
                name="add"
                options={{ headerShown: true, title: 'Create Tag' }}
            />
        </Stack>
    )
}
