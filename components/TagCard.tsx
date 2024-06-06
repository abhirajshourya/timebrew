import React from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'
import { Tag as TagType } from '@/constants/types'
import { Feather } from '@expo/vector-icons'

interface TagCardProps {
    tag: TagType
    handleEdit: (tag: TagType) => void
}

const TagCard = ({ tag, handleEdit }: TagCardProps) => {
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
                <Text style={styles.tagName}>{tag.name}</Text>
                <TouchableHighlight
                    onPress={() => handleEdit(tag)}
                    activeOpacity={0.6}
                    underlayColor={'#e2e2e2'}
                >
                    <Feather name="edit" size={16} color="#525252" />
                </TouchableHighlight>
            </View>
            <View
                style={[
                    styles.colorTag,
                    { backgroundColor: tag.color + '80' },
                    { borderColor: tag.color },
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    tagCard: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
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
    },
    colorTag: {
        width: 40,
        height: 20,
        borderRadius: 25,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagName: {
        fontSize: 16,
        color: '#005c99',
    },
})

export default TagCard
