import { useFocusEffect, useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { Spinner, YStack } from 'tamagui'

const App = () => {
    const router = useRouter()

    useFocusEffect(() => {
        router.replace('home')
    })

    return (
        <YStack>
            <Spinner />
            <Text>Loading...</Text>
        </YStack>
    )
}

export default App
