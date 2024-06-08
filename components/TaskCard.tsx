import { Task } from '@/constants/types'
import { formatTime } from '@/helpers/time-format'
import useDatabase from '@/hooks/useDatabase'
import { Feather } from '@expo/vector-icons'
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types'
import React, { useEffect } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'

interface TaskProps {
    task: Task
    navigation: NativeStackNavigationHelpers
}

const TaskCard = ({ task, navigation }: TaskProps) => {
    const { getTotalTimelogForTask } = useDatabase()
    const [totalTime, setTotalTime] = React.useState(0)

    useEffect(() => {
        getTotalTimelogForTask(task.id).then(setTotalTime)
    })

    const handleEdit = () => {
        navigation.navigate('EditTask', { task })
    }

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: 20,
                marginHorizontal: 20,
                backgroundColor: '#f9f9f9',
                borderRadius: 10,
                marginBottom: 10,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.12,
                shadowRadius: 20,
                elevation: 8,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 2,
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                        color: '#005c99',
                    }}
                >
                    {task.description}
                </Text>
                <TouchableHighlight
                    onPress={handleEdit}
                    activeOpacity={0.6}
                    underlayColor={'#e2e2e2'}
                >
                    <Feather name="edit" size={16} color="#525252" />
                </TouchableHighlight>
            </View>
            <View>
                <Text
                    style={{
                        fontSize: 14,
                        color: 'grey',
                    }}
                >
                    {formatTime(totalTime) || 'No time logged'}
                </Text>
            </View>
        </View>
    )
}

export default TaskCard
