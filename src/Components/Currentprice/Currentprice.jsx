import { useContext, useState, useEffect } from 'react';
import { Customcard } from '../Customcard/Customcard'
import {
    HStack, Text, Badge, Button, Icon, Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    Tag,
    PopoverCloseButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
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
import { currencyContext } from '../../Context/CurrencyProvider';
const apiKey = process.env.REACT_APP_API_KEY;

const Currentprice = () => {
    const [days, setDays] = useState(365);
    const [chartData, setChartData] = useState([])
    const { currency } = useContext(currencyContext);

    const getChartData = async () => {
        console.log("Currency is", currency)

        try {
            const options = { method: 'GET', headers: { 'x-cg-demo-api-key': `${apiKey}` } };
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=7`, options);
            const data = await response.json();
            console.log("Data from API:", data);

            if (data.prices.length > 0) {
                setChartData(data[1]);
                const timestamp = data.prices[0][0];
                console.log("Date is", new Date(timestamp));
            } else {
                console.log("No data available");
            }
        } catch (error) {
            console.error("Error fetching chart data:", error);
        }
    }

    useEffect(() => {
        getChartData()
    }, [])

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
    const [tradeCurrency, setTradeCurrency] = useState('USD');
    const [currentPrice, setCurrentPrice] = useState(33, 0o0);
    const [buyInput, setBuyInput] = useState('btc');
    const [selected, setSelected] = useState('INR');
    const [inputAmount, setInputAmount] = useState(1);
    const [totalAmount, setTotalAmount] = useState();

    return <Customcard w={"55vw"} mt={'10px'} height={'max-content'} padding={'10px'}>
        <Text Text fontSize={"13px"} color={"gray"} fontWeight={"bold"} ></Text>
        <HStack>
            <HStack>
                <HStack>
                    <Text fontSize={"15px"} color={'black'} fontWeight={"bold"}>₹{balances.investment}</Text>
                    <Text fontSize={"13px"} color={parseInt(balances.gain) > 0 ? 'green' : 'red'} fontWeight={"bold"} >
                        {balances.gain}
                    </Text>
                    <Badge colorScheme='green' fontSize={'7px'} ml={'6px'}>
                        <Icon as={MdOutlineArrowOutward} /></Badge>
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
                                                    <Text>{tradeCurrency}</Text>
                                                    <IoIosArrowDropdown />
                                                </HStack>
                                            </MenuButton>
                                            <MenuList>
                                                <MenuItem onClick={() => { setTradeCurrency('USD') }}>USD</MenuItem>
                                                <MenuItem onClick={() => { setTradeCurrency('INR') }}>INR</MenuItem>
                                            </MenuList>
                                        </Menu>
                                        <Text>
                                            <Tag> Current Price: </Tag>{currentPrice} {tradeCurrency}
                                        </Text>
                                    </HStack>
                                    <HStack gap={8}>
                                        <Tag>Buy in:</Tag>
                                        <Tag colorScheme={selected === 'BTC' ? 'purple' : 'inherit'} cursor={'pointer'} onClick={() => {
                                            setSelected('BTC')
                                            setTotalAmount(buyInput * currentPrice)
                                        }}>BTC</Tag>
                                        <Tag colorScheme={selected === 'INR' ? 'purple' : 'inherit'} cursor={'pointer'} onClick={() => {
                                            setSelected('INR')
                                            setTotalAmount(buyInput / currentPrice)
                                        }}>INR</Tag>
                                    </HStack>
                                    <InputGroup>
                                        <InputLeftAddon fontWeight={'bold'} fontSize={'13px'}>
                                            Enter Amount({selected})
                                        </InputLeftAddon>
                                        <Input type='number' placeholder={`Enter in ${selected}`} onChange={(e) => {
                                            if (inputAmount > 100) {
                                                return alert('Amount cannot be more than 100')
                                            }
                                            else {
                                                setBuyInput(e.target.value)
                                                selected === 'INR' ? setTotalAmount(e.target.value / currentPrice) : setTotalAmount(e.target.value * currentPrice)
                                            }
                                        }} />
                                    </InputGroup>
                                </Stack>
                                <HStack marginY={'3px'}>
                                    <Tag>
                                        Total Amount:
                                    </Tag>
                                    {/* <Text>{selected === "INR" ? (currentPrice / parseFloat(inputAmount)) : (currentPrice * parseFloat(inputAmount))}
                                </Text> */}
                                    <Text marginTop={'px'} fontWeight={'bold'}>{totalAmount} {selected === 'INR' ? 'btc' : 'inr.'}</Text>
                                </HStack>
                                <hr />
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
        <Areachart data={chartData} height={'100%'} />
    </Customcard >
}
export default Currentprice;