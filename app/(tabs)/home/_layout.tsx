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
                options={{ headerShown: false, title: i18n.t('tracker_screen.layout.home') }}
            />
            <Stack.Screen
                name="pomodoro"
                options={{
                    headerShown: false,
                    title: 'Pomodoro',
                    headerStyle: { backgroundColor: '#323232' },
                    headerTintColor: 'white',
                }}
            />
        </Stack>
    )
}
