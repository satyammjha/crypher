import NavigationDrawer from '../NavigationDrawer/NavigationDrawer';
import Sidenav from '../Sidenav/Sidenav';
import Topnav from '../Topnav/Topnav';
import { Flex, Box, useDisclosure } from '@chakra-ui/react';
import { useContext } from 'react';
import { ModeContext } from '../../Context/ModeProvider';

const Dashboard = ({ title, children }) => {

    const { mode } = useContext(ModeContext)

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Flex>
                <Box display={{
                    base: 'none',
                    lg: 'flex'
                }}>
                    <Sidenav boxShadow={"xl"} backgroundColor={mode === 'light' ? 'whitesmoke' : '#1A202C'} />
                </Box>
                <NavigationDrawer isOpen={isOpen} onClose={onClose} />
                <Box flexGrow={1}>
                    <Topnav title={title} isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
                    <Box p={"1"}>{children}</Box>
                </Box>
            </Flex>
        </>
    )
}

export default Dashboard;