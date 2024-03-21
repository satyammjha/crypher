import { useContext, useState } from 'react';
import { Customcard } from '../Customcard/Customcard'
import {
    HStack, Text, Badge, Button, Icon, Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    Tag,
    PopoverCloseButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    PopoverAnchor,
    Input,
    InputLeftAddon,
    InputGroup,
    Stack
} from '@chakra-ui/react'
import ButtonItem from '../../Utilities/Button';
import { IoMdAddCircle } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";
import { MdOutlineArrowOutward } from "react-icons/md";
import Areachart from '../Charts/Areachart'
import { IoIosArrowDropdown } from "react-icons/io";

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

    const [currency, setCurrency] = useState('USD');
    const [currentPrice, setCurrentPrice] = useState('33,000');
    const [buyInput, setBuyInput] = useState('btc');
    const [selected, setSelected] = useState('INR');
    const [inputAmount, setInputAmount] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0);

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
                    <Popover>
                        <PopoverTrigger>
                            <Button style={btnStyles} leftIcon={<IoMdAddCircle />} colorScheme={'purple'}>Buy</Button>
                        </PopoverTrigger>
                        <PopoverTrigger>
                            <Button style={btnStyles} leftIcon={<GrSubtractCircle />} colorScheme={'purple'}>Sell</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader><Tag colorScheme={purple}>Confirm your Trade</Tag> </PopoverHeader>
                            <PopoverBody>
                                <Stack gap={8}>
                                    <HStack>
                                        <Menu>
                                            <MenuButton size={'sm'} as={Button} colorScheme={purple}>
                                                <HStack>
                                                    <Text>{currency}</Text>
                                                    <IoIosArrowDropdown />
                                                </HStack>
                                            </MenuButton>
                                            <MenuList>
                                                <MenuItem onClick={() => { setCurrency('USD') }}>USD</MenuItem>
                                                <MenuItem onClick={() => { setCurrency('INR') }}>INR</MenuItem>
                                            </MenuList>
                                        </Menu>
                                        <Text>
                                            <Tag> Current Price: </Tag>{currentPrice} {currency}
                                        </Text>
                                    </HStack>
                                    <HStack gap={8}>
                                        <Tag>Buy in:</Tag>
                                        <Tag colorScheme={selected === 'BTC' ? 'purple' : 'inherit'} cursor={'pointer'} onClick={() => {
                                            setSelected('BTC')
                                        }}>BTC</Tag>
                                        <Tag colorScheme={selected === 'INR' ? 'purple' : 'inherit'} cursor={'pointer'} onClick={() => {
                                            setSelected('INR')
                                        }}>INR</Tag>
                                    </HStack>
                                    <InputGroup>
                                        <InputLeftAddon fontWeight={'bold'} fontSize={'13px'}>
                                            Enter Amount({selected})
                                        </InputLeftAddon>
                                        <Input type='number' placeholder={`Enter in ${selected}`} />
                                    </InputGroup>
                                </Stack>
                                <HStack>
                                    <Tag>
                                        Total Amount:
                                    </Tag>
                                    {/* <Text>{selected === "INR" ? (currentPrice / parseFloat(inputAmount)) : (currentPrice * parseFloat(inputAmount))}
                                </Text> */}
                                    <Text marginTop={'10px'} fontWeight={'bold'}>{totalAmount}</Text>
                                </HStack>
                                <HStack marginTop={'10px'} marginLeft={'20%'}> <ButtonItem text={"Buy"} scheme={purple} icon={<IoMdAddCircle />} style={btnStyles} />
                                    <ButtonItem text={"sell"} scheme={purple} icon={<GrSubtractCircle />} style={btnStyles} /></HStack>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                    {/* <ButtonItem text={"Buy"} scheme={purple} icon={<IoMdAddCircle />} style={btnStyles} />
                    <ButtonItem text={"sell"} scheme={purple} icon={<GrSubtractCircle />} style={btnStyles} /> */}
                </HStack>
            </HStack>
        </HStack>
        <Areachart data={dummyData.oneMonth} height={130} />
    </Customcard >

}
export default Currentprice;