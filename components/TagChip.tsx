import React, { PropsWithChildren } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Tag } from '@/constants/types'

type TagChipProps = {
    tag: Tag
    size?: 'small' | 'medium' | 'large'
} & PropsWithChildren

const TagChip = ({ children, tag, size = 'medium' }: TagChipProps) => {
    return (
        <View
            style={[
                styles.colorTag,
                { backgroundColor: tag.color + '2a' },
                { borderColor: tag.color },
                styles[`tag${size}`],
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
    tagsmall: {
        paddingHorizontal: 5,
        height: 20,
    },
    tagmedium: {
        paddingHorizontal: 10,
        height: 30,
    },
    taglarge: {
        paddingHorizontal: 15,
        height: 40,
    },
})

export default TagChip
