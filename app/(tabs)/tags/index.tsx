import TagCard from '@/components/TagCard'
import i18n from '@/constants/translations'
import { Tag as TagType } from '@/constants/types'
import useDatabase from '@/hooks/useDatabase'
import { useRouter, useSegments } from 'expo-router'
import React, { useEffect, useMemo, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { View, Text, ScrollView, Button, YStack } from 'tamagui'
import { Plus } from '@tamagui/lucide-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Tags = () => {
    const insets = useSafeAreaInsets()
    const [tags, setTags] = useState<TagType[]>([])
    const memoTags = useMemo(() => tags, [tags])
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
        <YStack backgroundColor={'$background025'} paddingTop={insets.top}>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 20,
                    paddingBottom: 20,
                }}
            >
                <Text style={styles.heading}>
                    {i18n.t('tag_screen.index.title')}
                </Text>
                <Button
                    onPress={handleFABPress}
                    chromeless
                    marginEnd={-20}
                    icon={<Plus size={24} />}
                />
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                <YStack
                    style={{ marginBottom: 200 }}
                    gap={10}
                    marginHorizontal={20}
                >
                    {memoTags.map((tag) => (
                        <View key={tag.id}>
                            <TagCard tag={tag} handleEdit={handleEdit} />
                        </View>
                    ))}
                </YStack>
            </ScrollView>
        </YStack>
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
    },
})

export default Tags
