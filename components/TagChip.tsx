import React, { PropsWithChildren } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Tag } from '@/constants/types'

type TagChipProps = {
    tag: Tag
} & PropsWithChildren

const TagChip = ({ children, tag }: TagChipProps) => {
    return (
        <View
            style={[
                styles.colorTag,
                { backgroundColor: tag.color + '2a' },
                { borderColor: tag.color },
            ]}
        >
            <Text style={[styles.tagName, { color: '#000000d6' }]}>
                {tag.name}
            </Text>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    colorTag: {
        paddingHorizontal: 5,
        height: 20,
        borderRadius: 25,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    tagName: {
        fontSize: 12,
    },
})

export default TagChip
