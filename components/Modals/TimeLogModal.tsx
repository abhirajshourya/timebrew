import { Ionicons } from '@expo/vector-icons'
import React, { PropsWithChildren } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Modal,
    ModalProps,
    Pressable,
} from 'react-native'

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
    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            style={styles.modal}
            onRequestClose={onClose}
        >
            <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalHeaderText}>
                        {title || 'Time Log'}
                    </Text>

                    <Pressable onPress={onClose}>
                        <Ionicons name="close" size={24} />
                    </Pressable>
                </View>
                <View style={styles.modalBody}>{children}</View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        borderTopWidth: 1,
        borderTopColor: 'grey',
        height: '100%',
    },
    modalContent: {
        flex: 1,
        justifyContent: 'flex-end',
        // alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: 'white',
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: 'grey',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    modalHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalBody: {
        backgroundColor: 'white',
        width: '100%',
        padding: 20,
        minHeight: 300,
    },
})

export default TimeLogModal
