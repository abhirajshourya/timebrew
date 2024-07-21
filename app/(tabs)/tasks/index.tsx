import TaskCard from '@/components/TaskCard'
import i18n from '@/constants/translations'
import { Task } from '@/constants/types'
import useDatabase from '@/hooks/useDatabase'
import React, { useEffect, useMemo, useState } from 'react'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { Button, Text, View, ScrollView, YStack } from 'tamagui'
import { useRouter, useSegments } from 'expo-router'
import { Plus } from '@tamagui/lucide-icons'

const TasksPage = () => {
    const router = useRouter()
    const { getTasks } = useDatabase()
    const [tasks, setTasks] = useState<Task[]>([])
    const memoTasks = useMemo(() => tasks, [tasks])
    const segment = useSegments()

    const handleFABPress = () => {
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
                    {i18n.t('task_screen.index.all_tasks')}
                </Text>
                <Button
                    onPress={handleFABPress}
                    chromeless
                    marginEnd={-20}
                    icon={<Plus size={24} />}
                />
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
                    {memoTasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </YStack>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TasksPage
