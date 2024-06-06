import TaskCard from '@/components/TaskCard'
import { Task } from '@/constants/types'
import useDatabase from '@/hooks/useDatabase'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'
import EditTask from './edit_task'
import FAB from '@/components/FAB'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import AddTask from './add_task'

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
        <SafeAreaView
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    margin: 20,
                }}
            >
                All Tasks
            </Text>
            <ScrollView
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '90%',
                    padding: 20,
                    paddingTop: 25,
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
            </ScrollView>
            <FAB onPress={handleFABPress}>
                <TabBarIcon name="add" color="white" />
            </FAB>
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
