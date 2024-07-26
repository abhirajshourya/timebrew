import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import {
    YStack,
    ListItem,
    YGroup,
    Switch,
    XStack,
    H4,
    ScrollView,
    Input,
    Button,
} from 'tamagui'
import { formatTime, formatTimeToSeconds } from '@/helpers/time-format'
import { mmkv_storage } from '@/app/_layout'
import i18n from '@/constants/translations'
import * as Notifications from 'expo-notifications'
import { router } from 'expo-router'

const Index = () => {
    const [dailyGoal, setDailyGoal] = useState(true)

    const [dailyGoalTime, setDailyGoalTime] = useState(0)

    function onSetDailyGoalTimeHandler() {
        mmkv_storage.set('goal.dailytime', dailyGoalTime)
        Alert.alert(i18n.t('alert.goalSet'), i18n.t('alert.goalSetMessage'), [
            {
                text: i18n.t('alert.ok'),
                style: 'default',
            },
        ])
        scheduleNotification()
    }

    useEffect(() => {
        const goal_daily = mmkv_storage.getBoolean('goal.daily')
        setDailyGoal(goal_daily || false)

        if (goal_daily) {
            const goal_dailytime = mmkv_storage.getNumber('goal.dailytime')
            setDailyGoalTime(goal_dailytime || 0)
        }
    }, [])

    useEffect(() => {
        const subscription = Notifications.addNotificationReceivedListener(
            (notification) => {
                console.log(
                    'Notification received:',
                    notification.request.content.title,
                    notification.request.content.subtitle
                )
            }
        )

        const responseSubscription =
            Notifications.addNotificationResponseReceivedListener(() => {
                router.navigate('/home')
            })

        return () => {
            subscription.remove()
            responseSubscription.remove()
        }
    }, [])

    async function scheduleNotification() {
        await cancelAllNotifications()
        await Notifications.requestPermissionsAsync().then(() => {
            Notifications.scheduleNotificationAsync({
                content: {
                    title: '⏱️ Daily Goal',
                    subtitle: 'Make sure to complete your daily goal!',
                },
                trigger: {
                    repeats: true,
                    hour: 16,
                    minute: 0,
                },
            })
        })
    }

    async function cancelAllNotifications() {
        await Notifications.cancelAllScheduledNotificationsAsync()
        console.log('All scheduled notifications have been canceled')
    }

    return (
        <ScrollView>
            <YStack margin={20} gap={20}>
                <YGroup>
                    <H4>{i18n.t('goals_screen.title')}</H4>
                </YGroup>
                <YGroup>
                    <YGroup.Item>
                        <ListItem
                            pressTheme
                            title={i18n.t('goals_screen.dailyGoalTitile')}
                        >
                            <XStack
                                gap={10}
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <H4>
                                    {dailyGoal
                                        ? i18n.t('goals_screen.on')
                                        : i18n.t('goals_screen.off')}
                                </H4>
                                <Switch
                                    size={'$3'}
                                    checked={dailyGoal}
                                    onCheckedChange={async (checked) => {
                                        setDailyGoal(checked)
                                        mmkv_storage.set('goal.daily', checked)
                                    }}
                                    native
                                >
                                    <Switch.Thumb animation={'superBouncy'} />
                                </Switch>
                            </XStack>
                        </ListItem>
                    </YGroup.Item>
                    {dailyGoal && (
                        <YGroup.Item>
                            <ListItem pressTheme>
                                <XStack
                                    gap={10}
                                    justifyContent="space-between"
                                    width={'100%'}
                                >
                                    <Input
                                        placeholder={i18n.t(
                                            'goals_screen.inputPlaceholder'
                                        )}
                                        keyboardType="number-pad"
                                        enterKeyHint="done"
                                        onChangeText={(text) => {
                                            setDailyGoalTime(
                                                formatTimeToSeconds(text)
                                            )
                                        }}
                                        width={'70%'}
                                    />
                                    <Button onPress={onSetDailyGoalTimeHandler}>
                                        {i18n.t('goals_screen.setBtn')}
                                    </Button>
                                </XStack>
                            </ListItem>
                        </YGroup.Item>
                    )}
                    {dailyGoal && (
                        <YGroup.Item>
                            <ListItem
                                pressTheme
                                title={`${i18n.t(
                                    'goals_screen.prevGoalTime'
                                )}: ${formatTime(
                                    mmkv_storage.getNumber('goal.dailytime') ||
                                        dailyGoalTime
                                )}`}
                            />
                        </YGroup.Item>
                    )}
                </YGroup>
            </YStack>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})

export default Index
