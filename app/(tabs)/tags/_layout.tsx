import { Stack } from 'expo-router/stack';
import Tags from '.';


export default function StackLayout() {

    Stack.defaultProps = {
        initialRouteName: 'index',
        screenOptions: {
            headerShown: false,
        },
    };

    return (
        <Stack>
            <Stack.Screen name="index" />
            <Stack.Screen name="add" options={{ headerShown: true, title: 'Add Tag' }} />
        </Stack>
    );
}