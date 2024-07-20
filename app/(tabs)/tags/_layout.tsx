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
                options={{ headerShown: false, title: i18n.t('tag_screen.layout.title') }}
            />
            <Stack.Screen
                name="add"
                options={{ headerShown: true, title: i18n.t('tag_screen.layout.add_tags') }}
            />
        </Stack>
    )
}
