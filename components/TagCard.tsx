import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableHighlight } from 'react-native'
import { Tag as TagType } from '@/constants/types'
import { Feather } from '@expo/vector-icons'
import TagChip from './TagChip'
import { Button, Card, XStack, YStack, Text } from 'tamagui'
import { Edit3 } from '@tamagui/lucide-icons'
import useDatabase from '@/hooks/useDatabase'
import { useSegments } from 'expo-router'
import { formatTime } from '@/helpers/time-format'

interface TagCardProps {
    tag: TagType
    handleEdit: (tag: TagType) => void
}

const TagCard = ({ tag, handleEdit }: TagCardProps) => {
    const { getTotalTimelogForTag } = useDatabase()
    const [totalTime, setTotalTime] = useState(0)
    const segement = useSegments()

    useEffect(() => {
        getTotalTimelogForTag(tag.id).then(setTotalTime)
    }, [segement])

    return (
        <Card shadowOpacity={0.12} shadowRadius={4}>
            <XStack
                padding={24}
                justifyContent="space-between"
                alignItems="center"
            >
                <YStack gap={4}>
                    <XStack>
                        <TagChip tag={tag} cardProps={{ padding: '$2' }} />
                    </XStack>
                    <Text>{formatTime(totalTime) || 'No time logged'}</Text>
                </YStack>
                <Button
                    onPress={() => handleEdit(tag)}
                    chromeless
                    icon={<Edit3 size={16} />}
                />
                {/* <Feather name="edit" size={16} color="#525252" /> */}
            </XStack>
        </Card>
    )
}

const styles = StyleSheet.create({
    tagCard: {
        // display: 'flex',
        // flexDirection: 'column',
        // padding: 20,
        // // marginHorizontal: 20,
        // backgroundColor: '#f9f9f9',
        // borderRadius: 10,
        // marginBottom: 10,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 4,
        // },
        // shadowOpacity: 0.12,
        // shadowRadius: 20,
        // elevation: 8,
    },
    colorTag: {
        // width: 40,
        paddingHorizontal: 5,
        height: 20,
        borderRadius: 25,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagName: {
        fontSize: 12,
    },
})

export default TagCard
