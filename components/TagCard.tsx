import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Tag as TagType } from '@/constants/types';

interface TagCardProps {
    tag: TagType;
}

const TagCard = ({ tag }: TagCardProps) => {
    return (
        <View style={styles.tagCard}>
            <View>
                <Text style={styles.tagName}>{tag.name}</Text>
            </View>
            <View style={[styles.colorTag, { backgroundColor: tag.color + '80' }]}>
                <Text style={styles.colortext}>{tag.color}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tagCard: {
        padding: 15,
        borderColor: 'black',
        borderRadius: 5,
        marginTop: 15,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    colorTag: {
        // width: 20,
        // height: 20,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    colortext: {
        color: 'black',
    },
    tagName: {
        fontSize: 16,
    },
});

export default TagCard;
