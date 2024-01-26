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
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <Sidenav />

                </DrawerContent>
            </Drawer>
        </>
    )
}
export default NavigationDrawer
