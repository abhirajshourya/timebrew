import { View, Card, H2, Paragraph, XStack, Button, useTheme } from 'tamagui'
import TutorialOverlay from './TutorialOverlay'
import { useState } from 'react'
import { useMMKVString } from 'react-native-mmkv'
import { Defs, Mask, Rect, Svg } from 'react-native-svg'
import i18n from '@/constants/translations'

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
                        <H2>{i18n.t('tutorial.step1.title')}</H2>
                        <Paragraph>
                            {i18n.t('tutorial.step1.description')}
                        </Paragraph>
                        <XStack gap={20} justifyContent="flex-end">
                            <Button chromeless onPress={handleSkipTutorial}>
                                {i18n.t('tutorial.skip_btn')}
                            </Button>
                            <Button onPress={() => setTutorialStep(1)}>
                                {i18n.t('tutorial.next_btn')}
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
                        <H2>{i18n.t('tutorial.step2.title')}</H2>
                        <Paragraph>
                            {i18n.t('tutorial.step2.description')}
                        </Paragraph>
                        <XStack gap={20} justifyContent="flex-end">
                            <Button chromeless onPress={handleSkipTutorial}>
                                {i18n.t('tutorial.skip_btn')}
                            </Button>
                            <Button onPress={() => setTutorialStep(0)}>
                                {i18n.t('tutorial.back_btn')}
                            </Button>
                            <Button onPress={() => setTutorialStep(2)}>
                                {i18n.t('tutorial.next_btn')}
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
                        <H2>{i18n.t('tutorial.step3.title')}</H2>
                        <Paragraph>
                            {i18n.t('tutorial.step3.description')}
                        </Paragraph>
                        <XStack gap={20} justifyContent="flex-end">
                            <Button chromeless onPress={handleSkipTutorial}>
                                {i18n.t('tutorial.skip_btn')}
                            </Button>
                            <Button onPress={() => setTutorialStep(1)}>
                                {i18n.t('tutorial.back_btn')}
                            </Button>
                            <Button onPress={() => setTutorialStep(3)}>
                                {i18n.t('tutorial.next_btn')}
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
                        <H2>{i18n.t('tutorial.step4.title')}</H2>
                        <Paragraph>
                            {i18n.t('tutorial.step4.description')}
                        </Paragraph>
                        <XStack gap={20} justifyContent="flex-end">
                            <Button chromeless onPress={handleSkipTutorial}>
                                {i18n.t('tutorial.skip_btn')}
                            </Button>
                            <Button onPress={() => setTutorialStep(2)}>
                                {i18n.t('tutorial.back_btn')}
                            </Button>
                            <Button onPress={() => setTutorialStep(4)}>
                                {i18n.t('tutorial.next_btn')}
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
                        <H2>{i18n.t('tutorial.step5.title')}</H2>
                        <Paragraph>
                            {i18n.t('tutorial.step5.description')}
                        </Paragraph>
                        <XStack gap={20} justifyContent="flex-end">
                            <Button chromeless onPress={handleSkipTutorial}>
                                {i18n.t('tutorial.skip_btn')}
                            </Button>
                            <Button onPress={() => setTutorialStep(3)}>
                                {i18n.t('tutorial.back_btn')}
                            </Button>
                            <Button onPress={() => setTutorialStep(5)}>
                                {i18n.t('tutorial.next_btn')}
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
                        <H2>{i18n.t('tutorial.step6.title')}</H2>
                        <Paragraph>
                            {i18n.t('tutorial.step6.description')}
                        </Paragraph>
                        <XStack gap={20} justifyContent="flex-end">
                            <Button chromeless onPress={handleSkipTutorial}>
                                {i18n.t('tutorial.skip_btn')}
                            </Button>
                            <Button onPress={() => setTutorialStep(4)}>
                                {i18n.t('tutorial.back_btn')}
                            </Button>
                            <Button onPress={() => handleSkipTutorial()}>
                                {i18n.t('tutorial.finish_btn')}
                            </Button>
                        </XStack>
                    </Card>
                </View>
            )}
        </TutorialOverlay>
    )
}

export default Index
