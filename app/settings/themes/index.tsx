import React, { useEffect, useState } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import {
    View,
    Text,
    H3,
    YStack,
    ListItem,
    YGroup,
    Separator,
    Switch,
    XStack,
    Label,
    H4,
    ListItemTitle,
    ScrollView,
} from 'tamagui'
import { Themes } from '@/constants/Themes'
import { Theme } from '@/constants/types'
import { Ionicons } from '@expo/vector-icons'
import { useMMKVString } from 'react-native-mmkv'

const Index = () => {
    const [themeSettings, setThemeSettings] = useMMKVString('settings.themes')
    const [theme, setTheme] = useState<Theme>(JSON.parse(themeSettings || '{}'))

    useEffect(() => {
        setThemeSettings(JSON.stringify(theme))
    }, [theme])

    const colorScheme = useColorScheme()

    const [systemTheme, setSystemTheme] = React.useState(theme.system)

    const [selectedTheme, setSelectedTheme] = React.useState(
        theme.custom || Themes[0].name
    )

    useEffect(() => {
        setTheme({
            ...theme,
            system: systemTheme,
            custom: selectedTheme,
        })
    }, [selectedTheme, systemTheme])

    return (
        <ScrollView>
            <YStack margin={20} gap={20}>
                <YGroup>
                    <H4>Sytem Theme</H4>
                </YGroup>
                <YGroup>
                    <YGroup.Item>
                        <ListItem
                            pressTheme
                            title={`${
                                colorScheme === 'dark' ? 'Dark' : 'Light'
                            } Mode`}
                        >
                            <XStack
                                gap={10}
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <H4>{systemTheme ? 'On' : 'Off'}</H4>
                                <Switch
                                    size={'$3'}
                                    checked={systemTheme}
                                    onCheckedChange={setSystemTheme}
                                    native
                                >
                                    <Switch.Thumb animation={'bouncy'} />
                                </Switch>
                            </XStack>
                        </ListItem>
                    </YGroup.Item>
                </YGroup>
                <Separator />
                <YGroup>
                    <H4>Custom Themes</H4>
                </YGroup>
                <YGroup>
                    {Themes.map((theme) => (
                        <YGroup.Item>
                            <ListItem
                                key={theme.id}
                                pressTheme
                                title={theme.name}
                                disabled={systemTheme}
                                icon={
                                    <Ionicons name="color-palette" size={24} />
                                }
                                iconAfter={
                                    selectedTheme === theme.name ? (
                                        <Ionicons name="checkmark" size={24} />
                                    ) : null
                                }
                                onPress={() => setSelectedTheme(theme.name)}
                            />
                        </YGroup.Item>
                    ))}
                    <YGroup.Item>
                        <ListItem disabled title={Themes.length + ' Themes'} />
                    </YGroup.Item>
                </YGroup>
            </YStack>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})

export default Index
