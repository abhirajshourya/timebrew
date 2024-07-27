import React from 'react'
import { Modal, StyleSheet } from 'react-native'
import { Sheet, SheetProps, View } from 'tamagui'

type TutorialOverlayProps = SheetProps & {
    children: React.ReactNode
}

const TutorialOverlay = ({ open, children }: TutorialOverlayProps) => {
    return (
        <Modal
            visible={open}
            transparent
            animationType="fade"
            statusBarTranslucent
        >
            <View
                style={{
                    flex: 1,
                    // backgroundColor: 'rgba(0,0,0,0.5)',
                }}
            >
                {children}
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({})

export default TutorialOverlay
