import React, { PropsWithChildren } from 'react'
import { StyleSheet, ModalProps } from 'react-native'
import { View, H3, YStack, XStack, Button } from 'tamagui'
import { Sheet } from '@tamagui/sheet'
import { X } from '@tamagui/lucide-icons'

type TimeLogModalProps = PropsWithChildren<ModalProps> & {
    isVisible: boolean
    onClose: () => void
    title?: string
}

const TimeLogModal = ({
    isVisible,
    onClose,
    children,
    title,
}: TimeLogModalProps) => {
    const [position, setPosition] = React.useState(0)
    return (
        // <Modal
        //     visible={isVisible}
        //     animationType="slide"
        //     transparent={true}
        //     style={styles.modal}
        //     onRequestClose={onClose}
        // >
        //     <View style={styles.modalContent}>
        //         <View style={styles.modalHeader}>
        //             <Text style={styles.modalHeaderText}>
        //                 {title || 'Time Log'}
        //             </Text>

        //             <Pressable onPress={onClose}>
        //                 <Ionicons name="close" size={24} />
        //             </Pressable>
        //         </View>
        //         <View style={styles.modalBody}>{children}</View>
        //     </View>
        // </Modal>
        <View>
            <Sheet
                forceRemoveScrollEnabled={true}
                modal={true}
                open={isVisible}
                onOpenChange={onClose}
                dismissOnSnapToBottom={true}
                position={position}
                onPositionChange={setPosition}
                zIndex={100_000}
                animation="medium"
            >
                <Sheet.Overlay
                    animation={'lazy'}
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                />
                <Sheet.Handle themeInverse />
                <Sheet.Frame>
                    <YStack padding={20} gap={20}>
                        <XStack
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <H3>{title || 'Time Log'}</H3>

                            <Button
                                onPress={onClose}
                                chromeless
                                padding={0}
                                icon={<X size={30} />}
                            />
                        </XStack>
                        <YStack gap={12}>{children}</YStack>
                    </YStack>
                </Sheet.Frame>
            </Sheet>
        </View>
    )
}

const styles = StyleSheet.create({
    modal: {
        // borderTopWidth: 1,
        // borderTopColor: 'grey',
        // height: '100%',
    },
    modalContent: {
        // flex: 1,
        justifyContent: 'flex-end',
        // alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalHeader: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // padding: 20,
        // backgroundColor: 'white',
        // width: '100%',
        // // borderTopWidth: 1,
        // borderTopColor: 'grey',
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
    },
    modalHeaderText: {
        // fontSize: 18,
        // fontWeight: 'bold',
    },
    modalBody: {
        // backgroundColor: 'white',
        // width: '100%',
        // padding: 20,
        // minHeight: 500,
    },
})

export default TimeLogModal
