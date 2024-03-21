import NavigationLayout from '../NavigationLayout/NavigationLayout'
import Portfolio from '../PortfolioSection/Portfolio'
import Currentprice from '../Currentprice/Currentprice'
import { HStack, Stack } from '@chakra-ui/layout'
import NewTransactions from '../Transactions/NewTransactions'
import News from '../News/News'
import Topmovers from '../Crypto/Topmovers'
const Dashboard = () => {
    return <NavigationLayout title={"Dashboard"}>
        <Portfolio />
        <HStack>
            <Stack>
                <HStack>
                    <Currentprice />
                    <NewTransactions />
                </HStack>
                <News />
            </Stack>
            <Topmovers />
        </HStack>
    </NavigationLayout >
}
export default Dashboard;