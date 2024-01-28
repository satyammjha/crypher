import React from 'react'
import { Customcard } from '../Customcard/Customcard'
import { HStack, Text, Badge, Icon } from '@chakra-ui/react'
import ButtonItem from '../../Utilities/Button';
import { IoMdAddCircle } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";
import { MdOutlineArrowOutward } from "react-icons/md";

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



    return <Customcard w={"max-content"} mt={'10px'}>
        <Text fontSize={"13px"} color={"gray"} fontWeight={"bold"}>Current Value:</Text>

        <HStack>
            <HStack>
                <HStack>
                    <Text fontSize={"15px"} color={'black'} fontWeight={"bold"}>₹{balances.investment}</Text>

                    <Text fontSize={"13px"} color={parseInt(balances.gain) > 0 ? 'green' : 'red'} fontWeight={"bold"} >
                        {balances.gain}
                        <Badge colorScheme='green' fontSize={'7px'} ml={'6px'}>
                            <Icon as={MdOutlineArrowOutward} /></Badge></Text>

                </HStack>

                <HStack spacing={8} ml={"100px"}>
                    <ButtonItem text={"Buy"} scheme={purple} icon={<IoMdAddCircle />} style={btnStyles} />
                    <ButtonItem text={"sell"} scheme={purple} icon={<GrSubtractCircle />} style={btnStyles} />
                </HStack>
            </HStack>
        </HStack>

        {/* <Areachart /> */}

    </Customcard>
}
export default Currentprice;