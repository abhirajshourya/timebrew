import React from 'react'
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
import { Ionicons } from '@expo/vector-icons'

const Index = () => {
    const colorScheme = useColorScheme()

    const [systemTheme, setSystemTheme] = React.useState(false)

    const [selectedTheme, setSelectedTheme] = React.useState('Default')

    return (
        <ScrollView>
            <YStack margin={20} gap={20}>
                <YGroup gap={10}>
                    <YGroup.Item>
                        <ListItemTitle>System Theme</ListItemTitle>
                        <ListItem
                            pressTheme
                            title={colorScheme === 'dark' ? 'Dark' : 'Light'}
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
                    <Separator />
                    <YGroup.Item>
                        <ListItemTitle>Custom Themes</ListItemTitle>
                        {Themes.map((theme) => (
                            <ListItem
                                key={theme.id}
                                pressTheme
                                title={theme.name}
                                disabled={systemTheme}
                                iconAfter={
                                    selectedTheme === theme.name ? (
                                        <Ionicons name="checkmark" size={24} />
                                    ) : null
                                }
                                onPress={() => setSelectedTheme(theme.name)}
                            />
                        ))}
                        <ListItem
                            disabled
                            title={Themes.length + ' Themes'}
                        ></ListItem>
                    </YGroup.Item>
                </YGroup>
            </YStack>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})

export default Index
