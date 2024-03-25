import { useParams } from 'react-router-dom';
import NavigationLayout from '../NavigationLayout/NavigationLayout'
import { Customcard } from '../Customcard/Customcard';
import { ModeContext } from '../../Context/ModeProvider'
import { currencyContext } from '../../Context/CurrencyProvider';
import { Box, Badge, Heading, HStack, Text, Icon, Tag, Input, Button } from '@chakra-ui/react';
import { useContext, useState, useEffect } from 'react';
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { MdFavorite } from "react-icons/md";
const apiKey = process.env.REACT_APP_API_KEY;

const CoinDetails = () => {
    const { id } = useParams("id");
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


    return (
        <NavigationLayout title="Coin Details">
            <Customcard w={"99%"} mt={'10px'} height={'90%'} padding={'10px'} backgroundColor={mode === 'light' ? 'whitesmoke' : '#1A202C'} borderRadius={'5px'}>
                <HStack alignItems={'center'} gap={4}>
                    <Heading as={'h1'} color={mode === 'light' ? 'black' : 'whitesmoke'}>
                        {activeCoin ? (activeCoin[0].toUpperCase() + activeCoin.slice(1))
                            : (id[0].toUpperCase() + id.slice(1))}:
                    </Heading>
                    <Text alignSelf={'center'} fontWeight={'bold'} fontSize={'25px'} color={changePercent > 0 ? '#17B169' : 'red'}> {currency === 'USD' ? '$' : '₹'}{currentPrice}</Text>
                    <HStack >
                        <Text fontSize={"16px"} marginLeft={'-10%'} color={changePercent > 0 ? '#17B169' : 'red'} fontWeight={"bold"} >
                            {changePercent ? changePercent.toFixed() : changePercent}%
                        </Text>
                        <Badge colorScheme={changePercent >= 0 ? 'green' : 'red'} fontSize={'10px'}>
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
                    <Button onClick={getCurrentPrice} colorScheme='purple' p={'0px 5px'} size={'sm'}>Wishlist <Box marginLeft={'3px'} marginTop={'1px'}><MdFavorite /></Box></Button>
                </HStack>
            </Customcard>
        </NavigationLayout>
    )
}
export default CoinDetails;