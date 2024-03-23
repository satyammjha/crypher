import NavigationLayout from '../NavigationLayout/NavigationLayout'
import Portfolio from '../PortfolioSection/Portfolio'
import Currentprice from '../Currentprice/Currentprice'
import { Box, HStack, Stack } from '@chakra-ui/layout'
import NewTransactions from '../Transactions/NewTransactions'
import News from '../News/News'
import Topmovers from '../Crypto/Topmovers'
const Dashboard = () => {
    return <NavigationLayout title={"Dashboard"}>
        <Box marginTop={'-8px'}>
            <Portfolio />
        </Box>
        <HStack alignItems={'top'}>
            <Stack>
                <HStack>
                    <Currentprice />
                    {/* <NewTransactions /> */}
                </HStack>
                <News />
            </Stack>
            <Topmovers />
        </HStack>
    </NavigationLayout >
}
export default Dashboard;