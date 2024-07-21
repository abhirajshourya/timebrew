import { ThemesColors } from '@/constants/Themes'
import i18n from '@/constants/translations'
import { Theme } from '@/constants/types'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import { useMMKVString } from 'react-native-mmkv'
import {
    H4,
    ListItem,
    ScrollView,
    Square,
    Switch,
    XStack,
    YGroup,
    YStack,
} from 'tamagui'

const Index = () => {
    const [themeSettings, setThemeSettings] = useMMKVString('settings.themes')
    const [theme, setTheme] = useState<Theme>(JSON.parse(themeSettings || '{}'))

    useEffect(() => {
        setThemeSettings(JSON.stringify(theme))
    }, [theme])

    const colorScheme = useColorScheme()
    const [systemTheme, setSystemTheme] = useState(theme.system)

    const [selectedColor, setSelectedColor] = useState(
        theme.color || ThemesColors[0].toLowerCase()
    )

    useEffect(() => {
        setTheme({
            ...theme,
            system: systemTheme,
            color: selectedColor,
        })
    }, [systemTheme, selectedColor])

    return (
        <ScrollView>
            <YStack margin={20} gap={20}>
                <YGroup>
                    <H4>{i18n.t('themes.title')}</H4>
                </YGroup>
                <YGroup>
                    <YGroup.Item>
                        <ListItem pressTheme title={i18n.t('themes.dark_mode')}>
                            <XStack
                                gap={10}
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <H4>
                                    {systemTheme
                                        ? i18n.t('themes.on')
                                        : i18n.t('themes.off')}
                                </H4>
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
                <YGroup>
                    <H4>{i18n.t('themes.colors')}</H4>
                </YGroup>
                <YGroup>
                    {ThemesColors.map((color, i) => (
                        <YGroup.Item key={i}>
                            <ListItem
                                key={`${color}-${i}`}
                                pressTheme
                                title={
                                    // capitalizeFirstLetter(color)
                                    color === 'red'
                                        ? i18n.t('themes.red')
                                        : color === 'blue'
                                        ? i18n.t('themes.blue')
                                        : color === 'green'
                                        ? i18n.t('themes.green')
                                        : color === 'yellow'
                                        ? i18n.t('themes.yellow')
                                        : color === 'orange'
                                        ? i18n.t('themes.orange')
                                        : color === 'purple'
                                        ? i18n.t('themes.purple')
                                        : color === 'pink'
                                        ? i18n.t('themes.pink')
                                        : i18n.t('themes.blue')
                                }
                                icon={
                                    <Square
                                        size={24}
                                        backgroundColor={color}
                                        borderRadius={5}
                                        borderColor={'#00000038'}
                                        borderWidth={1}
                                    />
                                }
                                iconAfter={
                                    selectedColor === color.toLowerCase() ? (
                                        <Ionicons name="checkmark" size={24} />
                                    ) : null
                                }
                                onPress={() =>
                                    setSelectedColor(color.toLowerCase())
                                }
                            />
                        </YGroup.Item>
                    ))}
                </YGroup>
            </YStack>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})

export default Index
