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
                options={{ headerShown: false, title: 'Home' }}
            />
            <Stack.Screen
                name="pomodoro"
                options={{
                    headerShown: true,
                    title: 'Pomodoro',
                    headerStyle: { backgroundColor: '#323232' },
                    headerTintColor: 'white',
                }}
            />
        </Stack>
    )
}
