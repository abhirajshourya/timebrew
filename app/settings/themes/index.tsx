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
    Square,
} from 'tamagui'
import { Theme } from '@/constants/types'
import { Ionicons } from '@expo/vector-icons'
import { useMMKVString } from 'react-native-mmkv'
import { ThemesColors } from '@/constants/Themes'
import { capitalizeFirstLetter } from '@/helpers/text-helpers'

const Index = () => {
    const [themeSettings, setThemeSettings] = useMMKVString('settings.themes')
    const [theme, setTheme] = useState<Theme>(JSON.parse(themeSettings || '{}'))

    useEffect(() => {
        setThemeSettings(JSON.stringify(theme))
    }, [theme])

    const colorScheme = useColorScheme()

    const [systemTheme, setSystemTheme] = React.useState(theme.system)

    // const [selectedTheme, setSelectedTheme] = React.useState(
    //     theme.custom || ThemesColors[0].toLowerCase()
    // )
    const [selectedColor, setSelectedColor] = React.useState(
        theme.color || ThemesColors[0].toLowerCase()
    )

    useEffect(() => {
        setTheme({
            ...theme,
            system: systemTheme,
            // custom: selectedTheme,
            color: selectedColor,
        })
    }, [systemTheme, selectedColor])

    return (
        <ScrollView>
            <YStack margin={20} gap={20}>
                <YGroup>
                    <H4>System Theme</H4>
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
                {/* <YGroup>
                    <H4>Custom Color</H4>
                </YGroup> */}
                {/* <YGroup>
                    {Themes.map((theme, i) => (
                        <YGroup.Item key={i}>
                            <ListItem
                                key={theme.id}
                                pressTheme
                                title={theme.name}
                                disabled={systemTheme}
                                icon={
                                    <Ionicons name="color-palette" size={24} />
                                }
                                iconAfter={
                                    selectedTheme ===
                                    theme.name.toLowerCase() ? (
                                        <Ionicons name="checkmark" size={24} />
                                    ) : null
                                }
                                onPress={() =>
                                    setSelectedTheme(theme.name.toLowerCase())
                                }
                            />
                        </YGroup.Item>
                    ))}
                    <YGroup.Item>
                        <ListItem disabled title={Themes.length + ' Themes'} />
                    </YGroup.Item>
                </YGroup> */}
                <YGroup>
                    <H4>Colors</H4>
                </YGroup>
                <YGroup>
                    {ThemesColors.map((color,i)=>(
                        <YGroup.Item key={i} >
                            <ListItem
                                key={`${color}-${i}`}
                                pressTheme
                                title={capitalizeFirstLetter(color)}
                                icon={
                                    <Square size={24} backgroundColor={color} borderRadius={5} borderColor={'#00000038'} borderWidth={1} />
                                }
                                iconAfter={
                                    selectedColor ===
                                    color.toLowerCase() ? (
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
