import { Stack } from 'expo-router/stack'

export default function StackLayout() {
    Stack.defaultProps = {
        initialRouteName: 'index',
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'All Task',headerShown: false }} />
            <Stack.Screen name="add_task" options={{ title: 'Add Task' }} />
            <Stack.Screen name="edit_task" options={{ title: 'Edit Task' }} />
        </Stack>
    )
}
