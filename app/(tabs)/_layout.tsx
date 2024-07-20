import { Tabs } from 'expo-router'
import React from 'react'

import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { Colors } from '@/constants/Colors'
import i18n from '@/constants/translations'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Pressable } from 'react-native'
import { BarChartBig, List, Tags, Timer } from '@tamagui/lucide-icons'
import { Button, useTheme } from 'tamagui'

export default function TabLayout() {
    const colorScheme = useColorScheme()
    const isDev = false
    const theme = useTheme()

    return (
        <Tabs
            initialRouteName="home"
            screenOptions={{
                tabBarActiveTintColor: theme.color10.get(),
                tabBarInactiveTintColor: theme.color.get(),
                tabBarActiveBackgroundColor: theme.background.get(),
                tabBarInactiveBackgroundColor: theme.background025.get(),
                // tabBarShowLabel: false,
                tabBarStyle: {
                    shadowColor: 'transparent',
                    elevation: 0,
                    paddingBottom: 10,
                    paddingTop: 10,
                    minHeight: 60,
                },
                tabBarHideOnKeyboard: true,
                headerShown: false,
            }}
            safeAreaInsets={{ top: 0, bottom: 0 }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: i18n.t('tracker_screen.layout.tracker'),
                    tabBarIcon: ({ color, focused }) => (
                        <Timer color={color} />
                        // <TabBarIcon
                        //     name={focused ? 'stopwatch' : 'stopwatch-outline'}
                        //     color={color}
                        // />
                    ),
                }}
            />
            <Tabs.Screen
                name="tasks"
                options={{
                    title: i18n.t('tracker_screen.layout.tasks'),
                    tabBarIcon: ({ color, focused }) => (
                        <List color={color} />
                        // <TabBarIcon
                        //     name={focused ? 'list' : 'list-outline'}
                        //     color={color}
                        // />
                    ),
                }}
            />
            <Tabs.Screen
                name="tags"
                options={{
                    title: i18n.t('tracker_screen.layout.tags'),
                    tabBarIcon: ({ color, focused }) => (
                        <Tags color={color} />
                        // <TabBarIcon
                        //     name={focused ? 'pricetag' : 'pricetag-outline'}
                        //     color={color}
                        // />
                    ),
                }}
            />
            <Tabs.Screen
                name="insights"
                options={{
                    title: i18n.t('tracker_screen.layout.insights'),
                    tabBarIcon: ({ color, focused }) => (
                        <BarChartBig color={color} />
                        // <TabBarIcon
                        //     name={focused ? 'bar-chart' : 'bar-chart-outline'}
                        //     color={color}
                        // />
                    ),
                }}
            />
            <Tabs.Screen
                name="devtools"
                options={{
                    title: 'Dev Tools',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'code-slash' : 'code-slash-outline'}
                            color={color}
                        />
                    ),
                    tabBarButton: (props) =>
                        isDev ? (
                            <Pressable {...props}>{props.children}</Pressable>
                        ) : null,
                }}
            />
        </Tabs>
    )
}
