import { CustomStyles } from '@/constants/Styles'
import i18n from '@/constants/translations'
import { Stack } from 'expo-router/stack'

export default function StackLayout() {
    const navStyle = CustomStyles().NavigationHeaderStyle()
    Stack.defaultProps = {
        initialRouteName: 'index',
    }

    return (
        <Stack screenOptions={navStyle}>
            <Stack.Screen
                name="index"
                options={{
                    title: i18n.t('task_screen.index.all_tasks'),
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="add_task"
                options={{ title: i18n.t('task_screen.index.add') }}
            />
            <Stack.Screen
                name="edit_task"
                options={{ title: i18n.t('task_screen.index.edit') }}
            />
        </Stack>
    )
}
