import {
    View,
    Text,
    YStack,
    H1,
    Card,
    H2,
    Paragraph,
    XStack,
    Button,
    useTheme,
} from 'tamagui'
import TutorialOverlay from './TutorialOverlay'
import { useState } from 'react'
import { useMMKVString } from 'react-native-mmkv'
import { Circle, Defs, Mask, Rect, Svg } from 'react-native-svg'

const Index = () => {
    const [tutorialStep, setTutorialStep] = useState(0)
    const [tutorialSetting, setTutorialSetting] =
        useMMKVString('settings.tutorial')

    const theme = useTheme()

    const handleSkipTutorial = () => {
        setTutorialSetting('false')
        setTutorialStep(0)
    }

    // Tutorial for the home page
    return (
        <TutorialOverlay open={tutorialSetting !== 'false'}>
            {/* Step 1 */}
            {tutorialSetting !== 'false' && tutorialStep === 0 && (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }}
                >
                    <Card
                        padding={20}
                        margin={20}
                        gap={20}
                        backgroundColor={'#fff'}
                    >
                        <H2>Welcome to Timebrew!</H2>
                        <Paragraph>
                            Timebrew is a time tracking app that helps you keep
                            track of your time spent on different tasks.
                        </Paragraph>
                        <XStack gap={20} justifyContent="flex-end">
                            <Button chromeless onPress={handleSkipTutorial}>
                                Skip Tutorial
                            </Button>
                            <Button onPress={() => setTutorialStep(1)}>
                                Next
                            </Button>
                        </XStack>
                    </Card>
                </View>
            )}
            {/* Step 2 */}
            {tutorialSetting !== 'false' && tutorialStep === 1 && (
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <Svg height={'100%'} width={'100%'}>
                        <Defs>
                            <Mask
                                id="mask"
                                x="0"
                                y="0"
                                height="100%"
                                width="100%"
                            >
                                <Rect height="100%" width="100%" fill="pink" />
                                <Circle
                                    cx={200}
                                    cy={350}
                                    r={150}
                                    // fill="#000"
                                />
                            </Mask>
                        </Defs>
                        <Rect
                            height="100%"
                            width="100%"
                            fill={'rgba(0,0,0,0.5)'}
                            mask="url(#mask)"
                            // fillOpacity={0.5}
                        />
                    </Svg>
                    <Card
                        position="absolute"
                        bottom={20}
                        left={0}
                        right={0}
                        animation={'medium'}
                        padding={20}
                        margin={20}
                        gap={20}
                        backgroundColor={'#fff'}
                        marginTop={50}
                    >
                        <H2>Track your time</H2>
                        <Paragraph>
                            Use the timer to track your time spent on tasks.
                        </Paragraph>
                        <XStack gap={20} justifyContent="flex-end">
                            <Button chromeless onPress={handleSkipTutorial}>
                                Skip Tutorial
                            </Button>
                            <Button onPress={() => setTutorialStep(0)}>
                                Back
                            </Button>
                            <Button onPress={() => setTutorialStep(2)}>
                                Next
                            </Button>
                        </XStack>
                    </Card>
                </View>
            )}
            {/* Step 3 */}
            {tutorialSetting !== 'false' && tutorialStep === 2 && (
                <Card
                    padding={20}
                    margin={20}
                    gap={20}
                    backgroundColor={'#fff'}
                >
                    <H2>View your time logs</H2>
                    <Paragraph>
                        View your time logs to see how much time you've spent on
                        different tasks.
                    </Paragraph>
                    <XStack gap={20} justifyContent="flex-end">
                        <Button chromeless onPress={handleSkipTutorial}>
                            Skip Tutorial
                        </Button>
                        <Button onPress={() => setTutorialStep(1)}>Back</Button>
                        <Button onPress={() => setTutorialStep(3)}>Next</Button>
                    </XStack>
                </Card>
            )}
            {/* Step 4 */}
        </TutorialOverlay>
    )
}

export default Index
