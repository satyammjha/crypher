import NavigationLayout from '../NavigationLayout/NavigationLayout'
import Portfolio from '../PortfolioSection/Portfolio'
import Currentprice from '../Currentprice/Currentprice'
import { HStack } from '@chakra-ui/layout'
import NewTransactions from '../Transactions/NewTransactions'


const Dashboard = () => {
    return <NavigationLayout title={"Dashboard"}>
        <Portfolio />
        <HStack>
            <Currentprice />
            <NewTransactions />


        </HStack>
    </NavigationLayout >
}
export default Dashboard;