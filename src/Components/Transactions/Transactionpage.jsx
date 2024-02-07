import NavigationLayout from '../NavigationLayout/NavigationLayout';
import ButtonItem from '../../Utilities/Button';
import { GiSaveArrow } from "react-icons/gi";
import { Flex, Card, Tabs, TabList, TabPanels, Tab, TabPanel, Badge } from '@chakra-ui/react';

const Transactionpage = () => {

    const tabTitles = [
        {
            title: "All Transactions",
            count: 1000,
            tabPanel: "All Transactions Content"
        },
        {
            title: "Deposits",
            count: 999,
            tabPanel: "Deposits Content"
        },
        {
            title: "Withdraw",
            count: 333,
            tabPanel: "Withdraw Content"
        },
        {
            title: "Trade",
            count: 693,
            tabPanel: "Trade Content"
        },
    ];
    const purple = "purple"
    return (
        <NavigationLayout title={"Transactions"} mt={4}>
            <Flex justify='end'>
                <ButtonItem text={"Export as CSV"} scheme={"purple"} icon={<GiSaveArrow />} justify='end' />
            </Flex>
            <Card width={'83vw'} mt={4}>
                <Tabs colorScheme={purple}>
                    <TabList>
                        {tabTitles.map((tab, index) => (
                            <Tab key={index}>{tab.title}<Badge marginLeft={'3px'}>{tab.count}</Badge></Tab>

                        ))}
                    </TabList>
                    <TabPanels>
                        {tabTitles.map((tab, index) => (
                            <TabPanel key={index}>{tab.tabPanel}</TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </Card>
        </NavigationLayout>
    );
};

export default Transactionpage;
