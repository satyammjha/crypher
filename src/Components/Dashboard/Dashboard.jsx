import React from 'react'
import NavigationLayout from '../NavigationLayout/NavigationLayout'
import Portfolio from '../PortfolioSection/Portfolio'

const Dashboard = () => {
    return <NavigationLayout title={"Dashboard"}>
        <Portfolio/>
    </NavigationLayout>
}
export default Dashboard;