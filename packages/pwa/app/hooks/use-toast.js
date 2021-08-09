import React from 'react'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    CloseButton,
    Spacer,
    useToast as useChakraToast
} from '@chakra-ui/react'

/**
 * Display a toast message on the screen.
 * This is a custom hook to handle showing toasts in the app, preventing duplicate toasts and to add action elements
 * to toasts when required. It supports all props supported by Chakra toast.
 *
 * @param {string} title Message text to be displayed in toast
 * @param {string} status Semantic state of the toast - success | error | info | warning
 * @param {node} action Optional component to be displayed in the toast (eg. Button to allow user to perform action)
 * @param {string} position The placement of the toast on screen
 * @param {number} duration The delay before the toast hides (in milliseconds)
 */
export function useToast() {
    const toast = useChakraToast()
    return ({
        title,
        status,
        action,
        position = 'top-right',
        duration = 5000,
        variant = 'subtle',
        isClosable = true
    }) => {
        const toastId = `${title}-${status}`.toLowerCase()
        let toastConfig = {
            id: toastId,
            title,
            status,
            isClosable,
            position,
            duration,
            variant
        }

        if (action) {
            toastConfig = {
                ...toastConfig,
                // eslint-disable-next-line react/display-name
                render: () => (
                    <Alert status={status} variant="subtle" borderRadius="md" py={3} width="sm">
                        <AlertIcon />
                        <AlertTitle> {title} </AlertTitle>
                        <Spacer />
                        {action}
                        <Spacer />
                        <CloseButton onClick={() => toast.close(toastId)} />
                    </Alert>
                )
            }
        }

        // Prevent duplicate toasts
        if (!toast.isActive(toastId)) {
            toast(toastConfig)
        }
    }
}