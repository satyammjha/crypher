import React from 'react'
import NavigationLayout from '../NavigationLayout/NavigationLayout'
import Portfolio from '../PortfolioSection/Portfolio'
import Currentprice from '../Currentprice/Currentprice'

const Dashboard = () => {
    return <NavigationLayout title={"Dashboard"}>
        <Portfolio />
        <Currentprice />
    </NavigationLayout>
}
export default Dashboard;