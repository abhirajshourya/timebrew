import TaskCard from '@/components/TaskCard'
import { Task } from '@/constants/types'
import useDatabase from '@/hooks/useDatabase'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { Button, Text, View, ScrollView, YStack } from 'tamagui'
import EditTask from './edit_task'
import AddTask from './add_task'
import { Feather } from '@expo/vector-icons'
import { useRouter, useSegments } from 'expo-router'
import { Plus } from '@tamagui/lucide-icons'



const TasksPage = () => {
    const router = useRouter()
    const { getTasks } = useDatabase()
    const [tasks, setTasks] = useState<Task[]>([])
    const segment = useSegments()

    const handleFABPress = () => {
        // navigation.navigate('AddTask')
        router.push('tasks/add_task')

    }

    useEffect(() => {
        getTasks().then(setTasks)
    }, [segment])

    return (
        <SafeAreaView>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    // margin: 20,
                    padding: 20,
                }}
            >
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                    }}
                >
                    All Tasks
                </Text>
                <Button
                    onPress={handleFABPress}
                    chromeless
                    marginEnd={-20}
                    icon={<Plus size={24} />}
                />
                {/* <Feather name="plus" size={24} color="black" /> */}
            </View>
            <ScrollView
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <YStack
                    style={{
                        marginBottom: 200,
                    }}
                    gap={10}
                    marginHorizontal={20}
                >
                    {tasks &&
                        tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                            />
                        ))}
                </YStack>
            </ScrollView>
        </SafeAreaView>
    )
}

// const Tasks = () => {
//     const TasksStack = createNativeStackNavigator()

//     return (
//         <TasksStack.Navigator
//             initialRouteName="TaskPage"
//             screenOptions={{
//                 headerShown: true,
//             }}
//         >
//             <TasksStack.Screen
//                 name="TasksPage"
//                 component={TasksPage}
//                 options={{
//                     headerShown: false,
//                 }}
//             />
//             <TasksStack.Screen
//                 name="EditTask"
//                 component={EditTask}
//                 options={{
//                     title: 'Edit Task',
//                     headerBackTitle: 'All Tasks',
//                 }}
//             />
//             <TasksStack.Screen
//                 name="AddTask"
//                 component={AddTask}
//                 options={{
//                     title: 'Add Task',
//                     headerBackTitle: 'All Tasks',
//                 }}
//             />
//         </TasksStack.Navigator>
//     )
// }

export default TasksPage
