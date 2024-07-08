import { Task } from '@/constants/types'
import { formatTime } from '@/helpers/time-format'
import useDatabase from '@/hooks/useDatabase'
import { Feather } from '@expo/vector-icons'
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types'
import { Edit3 } from '@tamagui/lucide-icons'
import { useRouter, useSegments } from 'expo-router'
import React, { useEffect } from 'react'
import { TouchableHighlight } from 'react-native'
import { Button, Card, H4, H5, H6, Text, View, XStack, YStack } from 'tamagui'

interface TaskProps {
    task: Task
}

const TaskCard = ({ task }: TaskProps) => {
    const router = useRouter()
    const { getTotalTimelogForTask } = useDatabase()
    const [totalTime, setTotalTime] = React.useState(0)
    const segment = useSegments()

    useEffect(() => {
        getTotalTimelogForTask(task.id).then(setTotalTime)
    }, [segment])

    const handleEdit = () => {
        // navigation.navigate('EditTask', { task })
        router.push({ pathname: 'tasks/edit_task', params: { ...task } })
    }

    return (
        <Card shadowOpacity={0.12} shadowRadius={4}>
            <XStack padding={24}>
                <YStack flex={1} gap={4}>
                    <Text fontSize={16}>{task.description}</Text>

                    {/* <Feather name="edit" size={16} color="#525252" /> */}
                    <View>
                        <Text>{formatTime(totalTime) || 'No time logged'}</Text>
                    </View>
                </YStack>
                <Button
                    onPress={handleEdit}
                    chromeless
                    icon={<Edit3 size={16} />}
                />
            </XStack>
        </Card>
    )
}

export default TaskCard
