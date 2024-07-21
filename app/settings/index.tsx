import { ChevronRight, Goal, Palette } from '@tamagui/lucide-icons'
import i18n from '@/constants/translations'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, ScrollView, YGroup } from 'tamagui'

const Settings = () => {
    const router = useRouter()

    return (
        <ScrollView margin={20}>
            <YGroup>
                <YGroup.Item>
                    <ListItem
                        title={i18n.t('settings.themes')}
                        pressTheme
                        icon={<Palette size={24} />}
                        iconAfter={<ChevronRight size={24} />}
                        onPress={() => {
                            router.push('settings/themes')
                        }}
                    />
                </YGroup.Item>
                <YGroup.Item>
                    <ListItem
                        title={i18n.t('settings.goals')}
                        pressTheme
                        icon={<Goal size={24} />}
                        iconAfter={<ChevronRight size={24} />}
                        onPress={() => {
                            router.push('settings/goal')
                        }}
                    />
                </YGroup.Item>
            </YGroup>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
})

export default Settings
