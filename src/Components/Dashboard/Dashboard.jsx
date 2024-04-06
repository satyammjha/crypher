import NavigationLayout from '../NavigationLayout/NavigationLayout'
import Portfolio from '../PortfolioSection/Portfolio'
import Currentprice from '../Currentprice/Currentprice'
import { Box, HStack, Stack } from '@chakra-ui/layout'
import NewTransactions from '../Transactions/NewTransactions'
import News from '../News/News'
import Topmovers from '../Crypto/Topmovers'
import Watchlist from '../Watchlist/Watchlist'
const Dashboard = () => {
    return <NavigationLayout title={"Dashboard"}>
        <Box marginTop={'-8px'}>
            <Portfolio />
        </Box>
        <Stack alignItems={'top'} direction={{
            base: 'column',
            md: 'row',
            lg: 'row'
        }}>
            <Stack>
                <HStack>
                    <Currentprice />
                </HStack>
                <HStack>
                    <Watchlist />
                    <News />
                </HStack>
            </Stack>
            <Topmovers />
        </Stack>
    </NavigationLayout >
}
export default Dashboard;