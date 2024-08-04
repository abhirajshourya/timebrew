import i18n from '@/constants/translations'
import { type Theme } from '@/constants/types'
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native'
import { Theme as NavigationThemeType } from '@react-navigation/native/src/types'
import { config } from '@tamagui/config/v3'
import { TamaguiProvider, createTamagui } from '@tamagui/core' // or 'tamagui'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { SQLiteProvider } from 'expo-sqlite/next'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { LogBox, View } from 'react-native'
import AnimatedSplashScreen from 'react-native-animated-splash-screen'
import { MMKV, useMMKVString } from 'react-native-mmkv'
import 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PortalProvider } from 'tamagui'

const tamaguiConfig = createTamagui(config)

// make TypeScript type everything based on your config
type Conf = typeof tamaguiConfig
declare module 'tamagui' {
    // or 'tamagui'
    interface TamaguiCustomConfig extends Conf {}
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.hideAsync()

export const mmkv_storage = new MMKV()

export default function RootLayout() {
    const [themeSettings, setThemeSettings] = useMMKVString('settings.themes')
    const [theme, setTheme] = useState<Theme>(JSON.parse(themeSettings || '{}'))
    const [NavigationTheme, setNavigationTheme] =
        useState<NavigationThemeType>(DefaultTheme)

    // this is a workaround for a bug in react-native-reanimated specifically on iOS
    LogBox.ignoreLogs([
        'Sending `onAnimatedValueUpdate` with no listeners registered.',
    ])
    // this is a workaround for a error which appears only once when changing the theme
    LogBox.ignoreLogs(['Warning: Cannot update a component'])
    const [splashScreen, setSplashScreen] = useState(false)

    useEffect(() => {
        setTheme(JSON.parse(themeSettings || '{}'))
    }, [themeSettings])

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    })

    useEffect(() => {
        setTimeout(() => {
            setSplashScreen(true)
        }, 1000)
    }, [])

    if (!loaded) {
        return null
    }

    return (
        <TamaguiProvider
            config={tamaguiConfig}
            defaultTheme={`${theme.system ? 'dark' : 'light'}_${
                theme.color || 'blue'
            }`}
        >
            <StatusBar style={theme.system ? 'light' : 'dark'} />
            <ThemeProvider value={theme.system ? DarkTheme : DefaultTheme}>
                <PortalProvider>
                    {!splashScreen && loaded && (
                        <View style={{ width: '100%', height: '100%' }}>
                            <AnimatedSplashScreen
                                translucent={false}
                                isLoaded={splashScreen && loaded}
                                logoImage={require('../assets/images/logoTimebrew.png')}
                                backgroundColor={'#ffffff'}
                                logoHeight={0}
                                logoWidth={0}
                            ></AnimatedSplashScreen>
                        </View>
                    )}

                    <SQLiteProvider useSuspense databaseName="timebrew.db">
                        <Stack initialRouteName="Tracker">
                            <Stack.Screen
                                name="(tabs)"
                                options={{
                                    headerShown: false,
                                    title: i18n.t(
                                        'tracker_screen.layout.tracker'
                                    ),
                                }}
                            />
                            <Stack.Screen
                                name="settings"
                                options={{
                                    headerShown: true,
                                    title: i18n.t('settings.title'),
                                }}
                            />
                            <Stack.Screen name="+not-found" />
                        </Stack>
                    </SQLiteProvider>
                </PortalProvider>
            </ThemeProvider>
        </TamaguiProvider>
    )
}
