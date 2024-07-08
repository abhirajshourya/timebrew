import { Tag, Task, Timelog } from '@/constants/types'
import { formatTime, isToday } from '@/helpers/time-format'
import useDatabase from '@/hooks/useDatabase'
import { Feather, Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, TouchableOpacity } from 'react-native'
import TagChip from './TagChip'
import { View, Text, Card, H3, H4, H5, XStack, YStack, Button } from 'tamagui'
import { useSegments } from 'expo-router'

interface TimelogCardProps {
    timelog: Timelog
    setReload: React.Dispatch<React.SetStateAction<boolean>>
}

const TimelogCard = ({ timelog, setReload }: TimelogCardProps) => {
    const { getTask, deleteTimelog, getTagsForTimelog } = useDatabase()
    const segment = useSegments()

    const [task, setTask] = useState<Task | null>(null)
    const [tags, setTags] = useState<Tag[] | null>(null)

    useEffect(() => {
        getTask(timelog.task_id).then(setTask)
        getTagsForTimelog(timelog.id).then(setTags)
    }, [])

    const handleDeleteTimelog = async () => {
        try {
            Alert.alert(
                'Delete Timelog',
                'Are you sure you want to delete this timelog?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Delete',
                        onPress: () => {
                            deleteTimelog(timelog.id)
                            setReload(true)
                            Alert.alert('Success', 'Timelog deleted')
                        },
                    },
                ]
            )
            // await deleteTimelog(timelog.id)
        } catch (error) {
            Alert.alert('Error', 'Failed to delete timelog')
        }
    }

    return (
        <Card
            padding={20}
            shadowColor={'$shadowColor'}
            shadowOpacity={0.12}
            shadowRadius={20}
            elevation={8}
            borderRadius={10}
            backgroundColor={'$backgroundColor'}
        >
            <XStack justifyContent="space-between">
                <YStack justifyContent="space-between">
                    <H3 style={styles.timelogText}>
                        {formatTime(timelog.duration)}
                    </H3>
                    <Text>{task ? task.description : 'Loading...'}</Text>
                    <XStack marginTop={10} gap={10}>
                        {tags &&
                            tags.length > 0 &&
                            tags.map((tag) => (
                                <TagChip key={tag.id} tag={tag} />
                            ))}
                    </XStack>
                </YStack>
                <YStack alignItems="flex-end" justifyContent="space-between">
                    <Text fontSize={'$5'}>
                        {isToday(timelog.start_time)
                            ? moment(timelog.start_time).format('h:mm a')
                            : moment(timelog.start_time).format(
                                  'MMM D, h:mm a'
                              )}
                    </Text>
                    <Button
                        onPress={handleDeleteTimelog}
                        chromeless
                        icon={<Ionicons name="trash" size={24} />}
                    />
                </YStack>
            </XStack>
        </Card>
    )
}

const styles = StyleSheet.create({
    timelogCard: {
        display: 'flex',
        // flexDirection: 'column',
        // padding: 20,
        // backgroundColor: '#f9f9f9',
        // borderRadius: 10,
        // marginTop: 5,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 4,
        // },
        // shadowOpacity: 0.12,
        // shadowRadius: 20,
        // elevation: 8,
    },
    timelogText: {
        // fontSize: 24,
        // color: 'black',
    },
})

export default TimelogCard
