import { TagDataset } from '@/constants/types'
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import TagChip from '../TagChip'
import { formatTime, formatTimeToHours } from '@/helpers/time-format'

type TagStatProps = {
    tagStat: TagDataset
}

const TagStat = ({ tagStat }: TagStatProps) => {
    return (
        <View style={styles.tagCard}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 2,
                }}
            >
                <TagChip tag={tagStat.tag} />

                <View style={{ flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                 }}>
                    <Text>Total time: {formatTimeToHours(tagStat.totalDuration)}</Text>
                    {/* <Text>{formatTime(tagStat.totalDuration)}</Text> */}
                    <Text>
                        {tagStat.timeLogs.length}{' '}
                        {tagStat.timeLogs.length > 1 ? 'logs' : 'log'}
                    </Text>
                </View>
            </View>
        </View>
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
