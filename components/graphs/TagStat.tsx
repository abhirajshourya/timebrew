import i18n from '@/constants/translations'
import { TagDataset } from '@/constants/types'
import React from 'react'
import { StyleSheet } from 'react-native'
import TagChip from '../TagChip'
import { formatTime, formatTimeToHours } from '@/helpers/time-format'
import { View, Text, Card, XStack, YStack } from 'tamagui'

type TagStatProps = {
    tagStat: TagDataset
}

const TagStat = ({ tagStat }: TagStatProps) => {
    return (
        <Card shadowOpacity={0.12} shadowRadius={4}>
            <XStack
                padding={24}
                justifyContent="space-between"
                alignItems="center"
            >
                <YStack>
                    <TagChip tag={tagStat.tag} cardProps={{ padding: '$2' }} />
                </YStack>

                <XStack
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                    }}
                >
                    <Text fontSize={'$5'}>
                        {i18n.t('components.tag_stat.total_time')}{' '}
                        {formatTimeToHours(tagStat.totalDuration)}
                    </Text>
                    {/* <Text>{formatTime(tagStat.totalDuration)}</Text> */}
                    <Text>
                        {tagStat.timeLogs.length}{' '}
                        {tagStat.timeLogs.length > 1
                            ? i18n.t('components.tag_stat.logs')
                            : i18n.t('components.tag_stat.log')}
                    </Text>
                </XStack>
            </XStack>
        </Card>
    )
}

const styles = StyleSheet.create({
    tagCard: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        // marginHorizontal: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginBottom: 10,
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

export default TagStat
