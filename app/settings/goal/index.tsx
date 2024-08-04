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
    XGroup,
} from 'tamagui'
import { formatTime, formatTimeToSeconds } from '@/helpers/time-format'
import { mmkv_storage } from '@/app/_layout'
import i18n from '@/constants/translations'
import * as Notifications from 'expo-notifications'
import { router } from 'expo-router'
import { Clock } from '@tamagui/lucide-icons'
import DatePicker from 'react-native-date-picker'

const Index = () => {
    const [dailyGoal, setDailyGoal] = useState(true)

    const [dailyGoalTime, setDailyGoalTime] = useState(0)

    const [notification, setNotification] = useState(false)
    const [notificationTime, setNotificationTime] = useState(new Date())
    const [timePickerVisible, setTimePickerVisible] = useState(false)

    function onSetDailyGoalTimeHandler() {
        if (dailyGoalTime === 0) {
            Alert.alert(i18n.t('alert.error'), i18n.t('alert.goalSetError'), [
                {
                    text: i18n.t('alert.ok'),
                    style: 'default',
                },
            ])
            return
        }
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

            const notification = mmkv_storage.getBoolean('goal.notification')
            setNotification(notification || false)

            if (notification) {
                const notificationTime = new Date(
                    mmkv_storage.getString('goal.notificationTime') ||
                        new Date()
                )
                setNotificationTime(notificationTime)
            }
        }
    }, [])

    useEffect(() => {
        if (dailyGoal && notification) {
            scheduleNotification()
        } else {
            cancelAllNotifications()
        }
    }, [dailyGoal, notification])

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
                    title: i18n.t('goals_screen.notificationTitle'),
                    subtitle: i18n.t('goals_screen.notificationMessage'),
                },
                trigger: {
                    repeats: true,
                    hour: notificationTime.getHours(),
                    minute: notificationTime.getMinutes(),
                },
            })
        })

        Alert.alert(
            i18n.t('alert.notificationSet'),
            i18n.t('alert.notificationSetMessage'),
            [
                {
                    text: i18n.t('alert.ok'),
                    style: 'default',
                },
            ]
        )
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
                                <XStack gap={10} justifyContent="space-between">
                                    <Input
                                        placeholder={i18n.t(
                                            'goals_screen.inputPlaceholder'
                                        )}
                                        enterKeyHint="done"
                                        onChangeText={(text) => {
                                            setDailyGoalTime(
                                                formatTimeToSeconds(text)
                                            )
                                        }}
                                        flex={1}
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
                    {dailyGoal && (
                        <YGroup.Item>
                            <ListItem
                                pressTheme
                                title={i18n.t('goals_screen.notificationLabel')}
                            >
                                <XStack
                                    gap={10}
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <H4>
                                        {notification
                                            ? i18n.t('goals_screen.on')
                                            : i18n.t('goals_screen.off')}
                                    </H4>
                                    <Switch
                                        size={'$3'}
                                        checked={notification}
                                        onCheckedChange={async (checked) => {
                                            setNotification(checked)
                                            mmkv_storage.set(
                                                'goal.notification',
                                                checked
                                            )
                                        }}
                                        native
                                    >
                                        <Switch.Thumb
                                            animation={'superBouncy'}
                                        />
                                    </Switch>
                                </XStack>
                            </ListItem>
                        </YGroup.Item>
                    )}
                    {dailyGoal && notification && (
                        <YGroup.Item>
                            <ListItem
                                pressTheme
                                title={i18n.t(
                                    'goals_screen.notificationTimeLabel'
                                )}
                            >
                                <XStack
                                    gap={10}
                                    justifyContent="space-between"
                                    width={'100%'}
                                >
                                    <XGroup gap={10} alignItems="center">
                                        <XGroup.Item>
                                            <Button
                                                variant="outlined"
                                                onPress={() =>
                                                    setTimePickerVisible(true)
                                                }
                                                icon={<Clock />}
                                            >
                                                {notificationTime.toLocaleTimeString(
                                                    'en-US',
                                                    {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    }
                                                )}
                                            </Button>
                                        </XGroup.Item>
                                    </XGroup>
                                    <DatePicker
                                        modal
                                        mode="time"
                                        open={timePickerVisible}
                                        date={notificationTime}
                                        onConfirm={(date) => {
                                            setTimePickerVisible(false)
                                            setNotificationTime(date)
                                            mmkv_storage.set(
                                                'goal.notificationTime',
                                                notificationTime.toString()
                                            )
                                        }}
                                        onCancel={() =>
                                            setTimePickerVisible(false)
                                        }
                                    />
                                    <Button onPress={scheduleNotification}>
                                        {i18n.t('goals_screen.setBtn')}
                                    </Button>
                                </XStack>
                            </ListItem>
                        </YGroup.Item>
                    )}
                </YGroup>
            </YStack>
        </ScrollView>
    )
}

export default Index
