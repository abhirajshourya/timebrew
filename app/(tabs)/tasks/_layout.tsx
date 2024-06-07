import { Stack } from 'expo-router/stack'

export default function StackLayout() {
    Stack.defaultProps = {
        initialRouteName: 'index',
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="add_task" />
            <Stack.Screen name="edit_task" />
        </Stack>
    )
}
