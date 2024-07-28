import { View, Card, H2, Paragraph, XStack, Button, useTheme } from 'tamagui'
import TutorialOverlay from './TutorialOverlay'
import { useState } from 'react'
import { useMMKVString } from 'react-native-mmkv'
import { Defs, Mask, Rect, Svg } from 'react-native-svg'

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
            {/* Step 1 : Welcome */}
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
            {/* Step 2 : Track your time */}
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
                                <Rect
                                    x={'5%'}
                                    y={'23%'}
                                    ry={20}
                                    height={400}
                                    width={'90%'}
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
            {/* Step 3 : View your timelogs */}
            {tutorialSetting !== 'false' && tutorialStep === 2 && (
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
                                <Rect
                                    x={'5%'}
                                    y={'70%'}
                                    ry={20}
                                    height={150}
                                    width={'90%'}
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
                        top={20}
                        left={0}
                        right={0}
                        animation={'medium'}
                        padding={20}
                        margin={20}
                        gap={20}
                        backgroundColor={'#fff'}
                        marginTop={50}
                    >
                        <H2>View your timelogs</H2>
                        <Paragraph>
                            View your recent timelogs in the home screen.
                        </Paragraph>
                        <XStack gap={20} justifyContent="flex-end">
                            <Button chromeless onPress={handleSkipTutorial}>
                                Skip Tutorial
                            </Button>
                            <Button onPress={() => setTutorialStep(1)}>
                                Back
                            </Button>
                            <Button onPress={() => setTutorialStep(3)}>
                                Next
                            </Button>
                        </XStack>
                    </Card>
                </View>
            )}
            {/* Step 4 : Manage your Tasks & Tags */}
            {tutorialSetting !== 'false' && tutorialStep === 3 && (
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
                                <Rect
                                    x={'27%'}
                                    y={'90%'}
                                    ry={20}
                                    height={60}
                                    width={'45%'}
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
                        top={20}
                        left={0}
                        right={0}
                        animation={'medium'}
                        padding={20}
                        margin={20}
                        gap={20}
                        backgroundColor={'#fff'}
                        marginTop={50}
                    >
                        <H2>Manage your Tasks & Tags</H2>
                        <Paragraph>
                            You can manage your tasks and tags in their
                            respective sections.
                        </Paragraph>
                        <XStack gap={20} justifyContent="flex-end">
                            <Button chromeless onPress={handleSkipTutorial}>
                                Skip Tutorial
                            </Button>
                            <Button onPress={() => setTutorialStep(2)}>
                                Back
                            </Button>
                            <Button onPress={() => setTutorialStep(4)}>
                                Next
                            </Button>
                        </XStack>
                    </Card>
                </View>
            )}
            {/* Step 5 : Get Insights */}
            {tutorialSetting !== 'false' && tutorialStep === 4 && (
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
                                <Rect
                                    x={'77%'}
                                    y={'91%'}
                                    ry={20}
                                    height={60}
                                    width={'20%'}
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
                        top={20}
                        left={0}
                        right={0}
                        animation={'medium'}
                        padding={20}
                        margin={20}
                        gap={20}
                        backgroundColor={'#fff'}
                        marginTop={50}
                    >
                        <H2>Get Insights</H2>
                        <Paragraph>
                            You can view insights on your time usage in the
                            insights section.
                        </Paragraph>
                        <XStack gap={20} justifyContent="flex-end">
                            <Button chromeless onPress={handleSkipTutorial}>
                                Skip Tutorial
                            </Button>
                            <Button onPress={() => setTutorialStep(3)}>
                                Back
                            </Button>
                            <Button onPress={() => setTutorialStep(5)}>
                                Next
                            </Button>
                        </XStack>
                    </Card>
                </View>
            )}
            {/* Step 6 : Themes, Goals & More */}
            {tutorialSetting !== 'false' && tutorialStep === 5 && (
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
                                <Rect
                                    x={'79%'}
                                    y={'6%'}
                                    ry={20}
                                    height={60}
                                    width={'20%'}
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
                        <H2>Themes, Goals & More</H2>
                        <Paragraph>
                            You can set themes, goals and more in the settings
                            section.
                        </Paragraph>
                        <XStack gap={20} justifyContent="flex-end">
                            <Button chromeless onPress={handleSkipTutorial}>
                                Skip Tutorial
                            </Button>
                            <Button onPress={() => setTutorialStep(4)}>
                                Back
                            </Button>
                            <Button onPress={() => handleSkipTutorial()}>
                                Finish
                            </Button>
                        </XStack>
                    </Card>
                </View>
            )}
        </TutorialOverlay>
    )
}

export default Index
