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
    Image,
    Input,
    InputLeftAddon,
    InputGroup,
    Stack
} from '@chakra-ui/react'
import ButtonItem from '../../Utilities/Button';
import { IoMdAddCircle } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";
import Areachart from '../Charts/Areachart'
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { currencyContext } from '../../Context/CurrencyProvider';
import { ModeContext } from '../../Context/ModeProvider'
import lineChartGif from '../../Assets/urban-chart.gif'
const apiKey = process.env.REACT_APP_API_KEY;

const Currentprice = () => {

    const options = { method: 'GET', headers: { 'x-cg-demo-api-key': `${apiKey}` } };

    const [days, setDays] = useState(1);
    const [chartData, setChartData] = useState([])
    const [chartDataLoading, setChartDataLoading] = useState()
    // const [tradeCurrency, setTradeCurrency] = useState('USD');
    const [currentPrice, setCurrentPrice] = useState();
    const [buyInput, setBuyInput] = useState('btc');
    const [selected, setSelected] = useState('INR');
    const [inputAmount, setInputAmount] = useState(1);
    const [totalAmount, setTotalAmount] = useState();
    const [changePercent, setChangePercent] = useState(0);
    const [activeCoin, setActiveCoin] = useState('bitcoin');

    const { currency } = useContext(currencyContext);
    const { mode } = useContext(ModeContext)

    const getChartData = async () => {
        setChartDataLoading(true);

        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${activeCoin}/market_chart?vs_currency=${currency}&days=${days}`, options);
        const data = await response.json();
        setChartData(data.prices);
        setChartDataLoading(false);
    };

    const getCurrentPrice = async () => {
        let Currency = currency.toLowerCase();
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${activeCoin}&vs_currencies=${Currency}&include_24hr_change=true`, options);

        const data = await response.json();
        console.log('crnt price', currency, data[activeCoin][currency.toLowerCase()])
        setTimeout(() => {
            setCurrentPrice(data[activeCoin][Currency]);
            setChangePercent(data[activeCoin][`${Currency}_24h_change`]);
        }, 1000)
    }
    let timer;
    const handleChange = (e) => {

        if (e.target.value === '') { setActiveCoin('bitcoin') }
        else {
            clearTimeout(timer);
            const inputVal = e.target.value;
            timer = setTimeout(() => {
                setActiveCoin(inputVal);
            }, 3000);
        }
    };

    useEffect(() => {
        if (activeCoin === '') {
            setActiveCoin('bitcoin');
        }
        getChartData()
        getCurrentPrice()

    }, [currency, days, activeCoin])

    const btnStyles = {
        height: '30px',
        bg: 'white',
        fontSize: '13px',
        width: 'max-content',
    }

    let purple = "purple";


    return <Customcard w={"57.5vw"} mt={'10px'} height={'max-content'} padding={'10px'} backgroundColor={mode === 'light' ? 'whitesmoke' : '#1A202C'}>
        <Text Text fontSize={"13px"} color={"gray"} fontWeight={"bold"} ></Text>
        <HStack >
            <HStack>
                <HStack >
                    <HStack >
                        <Text fontSize={"15px"} color={mode === 'light' ? 'black' : 'whitesmoke'} fontWeight={"bold"}>
                            {activeCoin[0].toUpperCase() +
                                activeCoin.slice(1)}:{" "}
                            {currency === 'USD' ? '$' : '₹'}
                            {currentPrice}
                        </Text>
                    </HStack>
                    <Text fontSize={"10px"} marginLeft={'-3%'} color={changePercent > 0 ? 'green' : 'red'} fontWeight={"bold"} >
                        {changePercent ? changePercent.toFixed() : changePercent}%
                    </Text>
                    <Badge colorScheme='green' fontSize={'7px'}>
                        <Icon as={changePercent > 0 ? GoArrowUpRight : GoArrowDownLeft} />
                    </Badge>
                </HStack>
                <HStack gap={4 / 2} marginLeft={'16px'}>
                    <Tag width={'max-content'} borderRadius={'3px'} cursor={'pointer'} color={days === 1 ? 'white' : 'black'} backgroundColor={days === 1 ? '#5F00D9' : '#C5C6D0'} onClick={() => {

                        setDays(1)

                    }} >24 Hrs.</Tag>

                    <Tag borderRadius={'3px'} cursor={'pointer'} backgroundColor={days === 7 ? '#5F00D9' : '#C5C6D0'} color={days === 7 ? 'white' : 'black'} onClick={() => {

                        setDays(7)

                    }}>7 Days</Tag>

                    <Tag borderRadius={'3px'} cursor={'pointer'} color={days === 30 ? 'white' : 'initial'} backgroundColor={days === 30 ? '#5F00D9' : '#C5C6D0'} onClick={() => {

                        setDays(30)

                    }}>1 Month</Tag>
                    <Tag borderRadius={'3px'} cursor={'pointer'} color={days === 365 ? 'white' : 'initial'} backgroundColor={days === 365 ? '#5F00D9' : '#C5C6D0'} onClick={() => {

                        setDays(365)

                    }}>1 Year</Tag>
                </HStack>
                <Input height={'1.7rem'} textAlign={'center'} color={mode === 'light' ? 'black' : 'whitesmoke'} fontWeight={'bold'} placeholder='search 🔍' border={'1px solid blue'} width={'20%'} onChange={handleChange} />
                <HStack ml={'auto'}>
                    <Popover>
                        <PopoverTrigger>
                            <Button style={btnStyles} leftIcon={<IoMdAddCircle />} colorScheme={'purple'}>Buy</Button>
                        </PopoverTrigger>
                        <Button style={btnStyles} leftIcon={<GrSubtractCircle />} colorScheme={'purple'}>Details</Button>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader><Tag colorScheme={purple}>Confirm your Trade</Tag> </PopoverHeader>
                            <PopoverBody>
                                <Stack gap={8}>
                                    <HStack>
                                        {/* <Menu>
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
                                        </Menu> */}
                                        <Text>
                                            <Tag> Current Price: </Tag>{currentPrice} {currency}
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

                </HStack>
            </HStack>
        </HStack>
        {chartDataLoading === true ?
            (
                <Stack>
                    <Text fontWeight={'bold'} marginLeft={'40%'}>Loading...</Text>
                    <Image src={lineChartGif} marginLeft={'30%'} height={'16.6vh'} width={"30vw"} />
                </Stack>
            ) : <Areachart data={chartData} height={'100%'} />}
    </Customcard >
}
export default Currentprice;