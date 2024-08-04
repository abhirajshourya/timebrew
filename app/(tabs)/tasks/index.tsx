import TaskCard from '@/components/TaskCard'
import i18n from '@/constants/translations'
import { Task } from '@/constants/types'
import useDatabase from '@/hooks/useDatabase'
import React, { useEffect, useMemo, useState } from 'react'
import { RefreshControl, SafeAreaView, TouchableOpacity } from 'react-native'
import {
    Button,
    Text,
    View,
    ScrollView,
    YStack,
    useTheme,
    Spinner,
} from 'tamagui'
import { useRouter, useSegments } from 'expo-router'
import { Plus } from '@tamagui/lucide-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const TasksPage = () => {
    const insets = useSafeAreaInsets()
    const theme = useTheme()
    const router = useRouter()
    const { getTasks } = useDatabase()
    const [tasks, setTasks] = useState<Task[]>([])
    const [reload, setReload] = useState(false)
    const memoTasks = useMemo(() => tasks, [tasks])
    const segment = useSegments()

    const handleFABPress = () => {
        router.push('tasks/add_task')
    }

    useEffect(() => {
        getTasks()
            .then(setTasks)
            .then(() => setReload(false))
    }, [segment, reload])

    return (
        <YStack backgroundColor={'$background025'} paddingTop={insets.top}>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 20,
                    paddingBottom: 20,
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
                refreshControl={
                    <RefreshControl
                        refreshing={reload}
                        onRefresh={() => setReload(true)}
                        colors={[theme.color.get()]}
                        progressBackgroundColor={theme.background.get()}
                        tintColor={theme.color.get()}
                    />
                }
            >
                <YStack
                    style={{
                        marginBottom: 200,
                    }}
                    gap={10}
                    marginHorizontal={20}
                >
                    {reload && (
                        <Spinner size="large" color={theme.color.get()} />
                    )}
                    {!reload &&
                        memoTasks.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                </YStack>
            </ScrollView>
        </YStack>
    )
}

export default TasksPage
