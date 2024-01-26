import NavigationDrawer from '../NavigationDrawer/NavigationDrawer';
import Sidenav from '../Sidenav/Sidenav';
import Topnav from '../Topnav/Topnav';
import { Flex, Box, useDisclosure } from '@chakra-ui/react';

const Dashboard = ({ title }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Flex>
                <Box display={{
                    base: 'none',
                    lg: 'flex'
                }}>
                    <Sidenav boxShadow={"lg"} backgroundColor={"whitesmoke"} />
                </Box>

                <NavigationDrawer isOpen={isOpen} onClose={onClose} />
                <Box flexGrow={1}>
                    <Topnav title={title} isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
                </Box>
            </Flex>


        </>
    )
}

export default Dashboard;