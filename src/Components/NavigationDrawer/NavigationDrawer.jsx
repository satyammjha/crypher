import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import Sidenav from '../Sidenav/Sidenav';

function NavigationDrawer({ isOpen, onClose }) {
    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                bg="white"
                isFullHeight={true}
            >
                <DrawerOverlay />
                <DrawerContent width={{
                    base: '10vw'
                }}>
                    <DrawerCloseButton />
                    <Sidenav />

                </DrawerContent>
            </Drawer>
        </>
    )
}
export default NavigationDrawer
