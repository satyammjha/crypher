import React from 'react'
import { Customcard } from '../Customcard/Customcard'
import { HStack, Text, Badge, Icon } from '@chakra-ui/react'
import ButtonItem from '../../Utilities/Button';
import { IoMdAddCircle } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";
import { MdOutlineArrowOutward } from "react-icons/md";
import Areachart from '../Charts/Areachart'

const Currentprice = () => {
    const btnStyles = {
        height: '30px',
        bg: 'white',
        fontSize: '13px',
        width: 'max-content',
    }

    let purple = "purple";
    const balances = {
        investment: '33,000',
        btcBalance: '0.893',
        inrBalance: '73,000',
        gain: '-3.33%'
    }

    const generateDummyData = (startDate, numberOfDays, interval) => {
        const data = [];
        for (let i = 0; i < numberOfDays; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i * interval);
            data.push({
                x: currentDate.getTime(),
                y: Math.floor(Math.random() * 100) + 1,
            });
        }
        return data;
    };

    const currentDate = new Date();
    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    const sixMonthsAgo = new Date(currentDate);
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

    const dummyData = {
        oneMonth: generateDummyData(oneMonthAgo, 30, 1), // 30 days for one month
        sixMonths: generateDummyData(sixMonthsAgo, 180, 1), // 180 days for six months
        oneYear: generateDummyData(oneYearAgo, 365, 1), // 365 days for one year
        allTime: generateDummyData(new Date('2020-01-01'), 100, 3), // 100 days with a 3-day interval
    };


    return <Customcard w={"max-content"} mt={'10px'}>
        <Text Text fontSize={"13px"} color={"gray"} fontWeight={"bold"} > Current price:</Text>

        <HStack>
            <HStack>
                <HStack>
                    <Text fontSize={"15px"} color={'black'} fontWeight={"bold"}>₹{balances.investment}</Text>

                    <Text fontSize={"13px"} color={parseInt(balances.gain) > 0 ? 'green' : 'red'} fontWeight={"bold"} >
                        {balances.gain}
                        <Badge colorScheme='green' fontSize={'7px'} ml={'6px'}>
                            <Icon as={MdOutlineArrowOutward} /></Badge></Text>

                </HStack>

                <HStack ml={"100px"}>
                    <ButtonItem text={"Buy"} scheme={purple} icon={<IoMdAddCircle />} style={btnStyles} />
                    <ButtonItem text={"sell"} scheme={purple} icon={<GrSubtractCircle />} style={btnStyles} />
                </HStack>
            </HStack>
        </HStack>

        <Areachart data={dummyData.oneMonth} height={130} />

    </Customcard >
}
export default Currentprice;