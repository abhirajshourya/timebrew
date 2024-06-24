import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { Suspense, useEffect } from 'react'
import 'react-native-reanimated'
import { useColorScheme } from '@/hooks/useColorScheme'
import { SQLiteProvider } from 'expo-sqlite/next'
import { Text, View } from 'react-native'
import { useFonts } from 'expo-font'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TamaguiProvider, createTamagui } from '@tamagui/core' // or 'tamagui'
import { config } from '@tamagui/config/v3'
import { PortalProvider } from 'tamagui'

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

    return (
        <TamaguiProvider config={tamaguiConfig}>
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
                        <SQLiteProvider useSuspense databaseName="timebrew.db">
                            <ThemeProvider
                                value={
                                    colorScheme === 'dark'
                                        ? DarkTheme
                                        : DefaultTheme
                                }
                            >
                                <Stack>
                                    <Stack.Screen
                                        name="(tabs)"
                                        options={{
                                            headerShown: false,
                                            title: 'Tracker',
                                        }}
                                    />
                                    <Stack.Screen
                                        name="settings"
                                        options={{ title: 'Settings' }}
                                    />
                                    <Stack.Screen name="+not-found" />
                                </Stack>
                            </ThemeProvider>
                        </SQLiteProvider>
                    </Suspense>
                </SafeAreaView>
            </PortalProvider>
        </TamaguiProvider>
    )
}
