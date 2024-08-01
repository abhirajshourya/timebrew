import { useFocusEffect, useRouter } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const App = () => {
    const router = useRouter()

    useFocusEffect(() => {
        router.replace('home')
    })

    return (
        // <AnimatedSplashScreen
        //     translucent={true}
        //     // isLoaded={this.state.isLoaded}
        //     logoImage={require("../assets/images/logoTimebrew.png")}
        //     backgroundColor={"#262626"}
        //     logoHeight={150}
        //     logoWidth={150}
        // >
            <View>
                <Text>Loading...</Text>
            </View>
        // {/* </AnimatedSplashScreen>         */}
    )
}

export default App
