import TaskCard from '@/components/TaskCard'
import { Task } from '@/constants/types'
import useDatabase from '@/hooks/useDatabase'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types'
import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import EditTask from './edit_task'
import AddTask from './add_task'
import { Feather } from '@expo/vector-icons'

interface TasksPageProps {
    navigation: NativeStackNavigationHelpers
}

const TasksPage = ({ navigation }: TasksPageProps) => {
    const { getTasks } = useDatabase()
    const [tasks, setTasks] = useState<Task[]>([])

    const handleFABPress = () => {
        navigation.navigate('AddTask')
    }

    useEffect(() => {
        getTasks().then(setTasks)
    })
    return (
        <SafeAreaView>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: 20,
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
                <TouchableOpacity onPress={handleFABPress}>
                    <Feather name="plus" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <View
                    style={{
                        marginBottom: 200,
                    }}
                >
                    {tasks &&
                        tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                navigation={navigation}
                            />
                        ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const Tasks = () => {
    const TasksStack = createNativeStackNavigator()

    return (
        <TasksStack.Navigator
            initialRouteName="TaskPage"
            screenOptions={{
                headerShown: true,
            }}
        >
            <TasksStack.Screen
                name="TasksPage"
                component={TasksPage}
                options={{
                    headerShown: false,
                }}
            />
            <TasksStack.Screen
                name="EditTask"
                component={EditTask}
                options={{
                    title: 'Edit Task',
                    headerBackTitle: 'All Tasks',
                }}
            />
            <TasksStack.Screen
                name="AddTask"
                component={AddTask}
                options={{
                    title: 'Add Task',
                    headerBackTitle: 'All Tasks',
                }}
            />
        </TasksStack.Navigator>
    )
}

export default Tasks
