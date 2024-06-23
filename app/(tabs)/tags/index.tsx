import FAB from '@/components/FAB'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import useDatabase from '@/hooks/useDatabase'
import { useRouter, useSegments } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
    Pressable,
} from 'react-native'
import { Tag as TagType } from '@/constants/types'
import TagCard from '@/components/TagCard'

const Tags = () => {
    const [tags, setTags] = useState<TagType[]>([])
    const { getTags } = useDatabase()
    const router = useRouter()
    const segment = useSegments()

    const handleFABPress = () => {
        router.push('tags/add')
    }

    const handleEdit = (tag: TagType) => {
        router.push({ pathname: 'tags/add', params: { ...tag } })
    }

    useEffect(() => {
        getTags().then(setTags)
    }, [segment])

    return (
        <>
            <SafeAreaView>
                <Text style={styles.heading}>Tags</Text>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={{ marginBottom: 200, marginHorizontal: 20 }}>
                        {tags.map((tag) => (
                            <Pressable key={tag.id}>
                                <TagCard tag={tag} handleEdit={handleEdit} />
                            </Pressable>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
            <FAB onPress={handleFABPress}>
                <TabBarIcon name="add" color="white" />
            </FAB>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        // padding: 20,
        // paddingTop: 25,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 20,
    },
})

export default Tags
