import React from 'react'
import Sidenav from '../Sidenav/Sidenav';
import Topnav from '../Topnav/Topnav';
import { Flex, Box } from '@chakra-ui/react';

const Dashboard = () => {
    return (
        <>
            <Flex>
                <Sidenav />

                <Box flexGrow={1}>
                    <Topnav />
                </Box>
            </Flex>


        </>
    )
}

export default Dashboard;