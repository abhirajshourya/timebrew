import React, { PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'
import { Tag } from '@/constants/types'
import { View, Text, Card } from 'tamagui'

type TagChipProps = {
    tag: Tag
    size?: 'small' | 'medium' | 'large'
} & PropsWithChildren

const TagChip = ({ children, tag, size = 'medium' }: TagChipProps) => {
    return (
        <Card backgroundColor={`${tag.color}70`} padding={5} borderRadius={100} flexDirection='row' alignItems='center' justifyContent='center' >
            <Text>{tag.name}</Text>
            {children}
        </Card>
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
