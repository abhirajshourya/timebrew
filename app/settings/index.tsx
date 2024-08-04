import { ChevronRight, Goal, MonitorPlay, Palette } from '@tamagui/lucide-icons'
import i18n from '@/constants/translations'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, ScrollView, Switch, YGroup } from 'tamagui'
import { useMMKVString } from 'react-native-mmkv'

const Settings = () => {
    const router = useRouter()
    const [tutorialSetting, setTutorialSetting] =
        useMMKVString('settings.tutorial')

    useEffect(() => {
        if (tutorialSetting === null) {
            setTutorialSetting('true')
        }
    }, [])

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
                    >
                        <ListItem.Subtitle>
                            {i18n.t('settings.themes_subtitle')}
                        </ListItem.Subtitle>
                    </ListItem>
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
                    >
                        <ListItem.Subtitle>
                            {i18n.t('settings.goals_subtitle')}
                        </ListItem.Subtitle>
                    </ListItem>
                </YGroup.Item>
                <YGroup.Item>
                    <ListItem
                        title={i18n.t('settings.tutorial')}
                        pressTheme
                        icon={<MonitorPlay size={24} />}
                        iconAfter={
                            <Switch
                                defaultChecked={tutorialSetting === 'true'}
                                onCheckedChange={(value) => {
                                    setTutorialSetting(value.toString())
                                }}
                                native
                            />
                        }
                    >
                        <ListItem.Subtitle>
                            {i18n.t('settings.tutorial_subtitle')}
                        </ListItem.Subtitle>
                    </ListItem>
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
