import i18n from '@/constants/translations'
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
import { Text, View, LogBox } from 'react-native'
import { useFonts } from 'expo-font'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TamaguiProvider, createTamagui } from '@tamagui/core' // or 'tamagui'
import { config } from '@tamagui/config/v3'
import { PortalProvider, useTheme } from 'tamagui'
import { useMMKVString } from 'react-native-mmkv'
import { type Theme } from '@/constants/types'
import { Theme as NavigationThemeType } from '@react-navigation/native/src/types'
import { StatusBar } from 'expo-status-bar'

// Override the default Tamagui config with your custom config
// config.themes = {
//     ...config.themes,
//     // ...CustomThemes,
// }

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
    const [NavigationTheme, setNavigationTheme] =
        useState<NavigationThemeType>(DefaultTheme)

    // this is a workaround for a bug in react-native-reanimated specifically on iOS
    LogBox.ignoreLogs([
        'Sending `onAnimatedValueUpdate` with no listeners registered.',
    ])
    // this is a workaround for a error which appears only once when changing the theme
    LogBox.ignoreLogs(['Warning: Cannot update a component'])

    const colorScheme = useColorScheme()
    // const usedTheme = useTheme()

    // const NavigationTheme: NavigationThemeType = {
    //     dark: theme.system && colorScheme === 'light' ? false : true,
    //     colors: {
    //         primary: usedTheme.accentColor.get(),
    //         background: usedTheme.background.get(),
    //         card: usedTheme.background.get(),
    //         text: usedTheme.color.get(),
    //         border: usedTheme.borderColor.get(),
    //         notification: usedTheme.accentColor.get(),
    //     },
    // }

    useEffect(() => {
        setTheme(JSON.parse(themeSettings || '{}'))
        // setNavigationTheme({
        //     dark: theme.system && colorScheme === 'light' ? false : true,
        //     colors: {
        //         primary: usedTheme.accentColor.val ?? DefaultTheme.colors.primary,
        //         background: usedTheme.background.val ?? DefaultTheme.colors.background,
        //         card: usedTheme.background.val ?? DefaultTheme.colors.card,
        //         text: usedTheme.color.val ?? DefaultTheme.colors.text,
        //         border: usedTheme.borderColor.val ?? DefaultTheme.colors.border,
        //         notification: usedTheme.accentColor.val ?? DefaultTheme.colors.notification,
        //     },
        // })
    }, [themeSettings])

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

    // console.log(
    //     'themeSettings',
    //     `${theme.system && colorScheme === 'light' ? 'light' : 'dark'}_${
    //         theme.color
    //     }`,
    //     usedTheme
    // )
    return (
        <TamaguiProvider
            config={tamaguiConfig}
            defaultTheme={`${theme.system ? 'dark' : 'light'}_${
                theme.color || 'blue'
            }`}
            // defaultTheme={`${theme.system && colorScheme === 'light' ? 'light' : 'dark'}_${theme.color}`}
            // defaultTheme={theme.system ? colorScheme : 'dark'}
        >
            {/* <StatusBar style={theme.system ? colorScheme : 'dark'} /> */}
            <StatusBar style={colorScheme === 'light' ? 'light' : 'dark'} />
            <ThemeProvider
                value={theme.system ? DarkTheme : DefaultTheme}
                // value={NavigationTheme}
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
                                            title: i18n.t('tracker_screen.layout.tracker'),
                                        }}
                                    />
                                    {/* TODO: i18n */}
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
