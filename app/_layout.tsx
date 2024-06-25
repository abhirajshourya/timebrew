import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { Suspense, useEffect, useState } from 'react'
import 'react-native-reanimated'
import { useColorScheme } from '@/hooks/useColorScheme'
import { SQLiteProvider } from 'expo-sqlite/next'
import { Text, View } from 'react-native'
import { useFonts } from 'expo-font'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TamaguiProvider, createTamagui } from '@tamagui/core' // or 'tamagui'
import { config } from '@tamagui/config/v3'
import { PortalProvider } from 'tamagui'
import { useMMKVString } from 'react-native-mmkv'
import { type Theme } from '@/constants/types'
import { StatusBar } from 'expo-status-bar'

const tamaguiConfig = createTamagui(config)

// make TypeScript type everything based on your config
type Conf = typeof tamaguiConfig
declare module 'tamagui' {
    // or 'tamagui'
    interface TamaguiCustomConfig extends Conf {}
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [themeSettings, setThemeSettings] = useMMKVString('settings.themes')
    const [theme, setTheme] = useState<Theme>(JSON.parse(themeSettings || '{}'))

    useEffect(() => {
        setTheme(JSON.parse(themeSettings || '{}'))
    }, [themeSettings])

    const colorScheme = useColorScheme()
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    })

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    const returnTheme = (givenTheme) => {
        switch (givenTheme) {
            case 'light':
                return DefaultTheme
            case 'dark':
                return DarkTheme
            default:
                return theme.system ? colorScheme : theme
        }
    }

    return (
        <TamaguiProvider
            config={tamaguiConfig}
            defaultTheme={theme.system ? colorScheme : 'dark'}
        >
            {/* <StatusBar style={theme.system ? colorScheme : 'dark'} /> */}
            <ThemeProvider
                value={
                    theme.system && colorScheme === 'light'
                        ? DefaultTheme
                        : DarkTheme
                }
            >
                <PortalProvider>
                    <SafeAreaView style={{ flex: 1 }}>
                        <Suspense
                            fallback={
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text>Loading Database...</Text>
                                </View>
                            }
                        >
                            <SQLiteProvider
                                useSuspense
                                databaseName="timebrew.db"
                            >
                                <Stack initialRouteName="Tracker">
                                    <Stack.Screen
                                        name="(tabs)"
                                        options={{
                                            headerShown: false,
                                            title: 'Tracker',
                                        }}
                                    />
                                    <Stack.Screen
                                        name="settings"
                                        options={{
                                            headerShown: true,
                                            title: 'Settings',
                                        }}
                                    />
                                    <Stack.Screen name="+not-found" />
                                </Stack>
                            </SQLiteProvider>
                        </Suspense>
                    </SafeAreaView>
                </PortalProvider>
            </ThemeProvider>
        </TamaguiProvider>
    )
}
