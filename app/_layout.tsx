import i18n from '@/constants/translations'
import { type Theme } from '@/constants/types'
import { useColorScheme } from '@/hooks/useColorScheme'
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native'
import { Theme as NavigationThemeType } from '@react-navigation/native/src/types'
import { config } from '@tamagui/config/v3'
import { TamaguiProvider, createTamagui } from '@tamagui/core'; // or 'tamagui'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { SQLiteProvider } from 'expo-sqlite/next'
import { StatusBar } from 'expo-status-bar'
import { Suspense, useEffect, useState } from 'react'
import { LogBox, Text, View } from 'react-native'
import { useMMKVString } from 'react-native-mmkv'
import 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PortalProvider } from 'tamagui'
import { MMKV } from 'react-native-mmkv'

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
                                    <Text>{i18n.t('loading_db')}</Text>
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
                        </Suspense>
                    </SafeAreaView>
                </PortalProvider>
            </ThemeProvider>
        </TamaguiProvider>
    )
}
