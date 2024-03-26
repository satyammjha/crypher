import { useParams } from 'react-router-dom';
import NavigationLayout from '../NavigationLayout/NavigationLayout'
import { Customcard } from '../Customcard/Customcard';
import { ModeContext } from '../../Context/ModeProvider'
import { currencyContext } from '../../Context/CurrencyProvider';
import { Box, Badge, Heading, HStack, Text, Icon, Tag, Input, Button, Stack, Image } from '@chakra-ui/react';
import { useContext, useState, useEffect } from 'react';
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { MdFavorite } from "react-icons/md";
import { IoDocumentSharp } from "react-icons/io5";
import AreaChart from '../Charts/Areachart';
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
    const [activeCoin, setActiveCoin] = useState(id);
    const [coinDetailsData, setCoinDetailsData] = useState({

        ath: 0,
        maxSupply: 0,
        volume: 0,
        imgSrc: '',
        athDate: '',
        atlDate: ''
    });

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
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${activeCoin}&vs_currencies=${currency}&include_24hr_change=true`, options);

        const data = await response.json();
        setTimeout(() => {
            setCurrentPrice(data[activeCoin][Currency]);
            setChangePercent(data[activeCoin][`${Currency}_24h_change`]);
        }, 1000)
    }


    const getCoinDetails = async () => {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${activeCoin}`, options);
        const data = await response.json();

        // const athTimestamp = data[0].ath_date
        // const date = new Date(athTimestamp);
        // const year = date.getFullYear();
        // const month = String(date.getMonth() + 1).padStart(2, '0');
        // const day = String(date.getDate()).padStart(2, '0');
        // const athDateString = `${year}-${month}-${day}`

        // const atlTimestamp = data[0].atl_date
        // const atldate = new Date(atlTimestamp);
        // const atlyear = date.getFullYear();
        // const atlmonth = String(atldate.getMonth() + 1).padStart(2, '0');
        // const atlday = String(atldate.getDate()).padStart(2, '0');
        // const atlDateString = `${atlyear}-${atlmonth}-${atlday}`

        setCoinDetailsData({
            ath: data[0].ath,
            maxSupply: data[0].max_supply,
            volume: data[0].total_volume,
            imgSrc: data[0].image,
            // athDate: athDateString,
            // atlDate: atlDateString
        });
        console.log(coinDetailsData)
    }

    let timer;
    const handleChange = (e) => {

        if (e.target.value === '') { setActiveCoin('bitcoin') }
        else {
            clearTimeout(timer);
            const inputVal = e.target.value;
            timer = setTimeout(() => {
                setActiveCoin(inputVal.toLowerCase());
            }, 3000);
        }
    };

    useEffect(() => {
        if (activeCoin === '') {
            setActiveCoin('bitcoin');
        }

        getChartData()
        getCurrentPrice()
        getCoinDetails()

    }, [currency, days, activeCoin])


    return (
        <NavigationLayout title="Coin Details">
            <Customcard w={"99%"} mt={'10px'} height={'90%'} padding={'10px'} backgroundColor={mode === 'light' ? 'whitesmoke' : '#1A202C'} borderRadius={'5px'} marginLeft={'10px'}>

                <Stack>
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
                        <Button colorScheme='purple' p={'0px 5px'} size={'sm'}>Wishlist <Box marginLeft={'3px'} marginTop={'1px'}><MdFavorite /></Box></Button>
                    </HStack>

                    {chartDataLoading === true ?
                        (
                            <Stack>
                                <Text fontWeight={'bold'} marginLeft={'40%'}>Loading...</Text>
                                {/* <Image src={lineChartGif} marginLeft={'30%'} height={'16.6vh'} width={"30vw"} /> */}
                            </Stack>
                        ) : <AreaChart data={chartData} height={'200%'} />}
                    <hr />
                    <Stack>
                        <HStack gap={4} color={mode === 'light' ? 'black' : 'whitesmoke'}>
                            <HStack gap={4}>
                                <Heading as={'h1'} fontSize={'22px'}>Details:</Heading>
                                <Tag colorScheme='purple'><Image src={coinDetailsData.imgSrc} height={'50px'} /></Tag>
                            </HStack>
                            <HStack gap={16}>
                                <Text fontWeight={'bold'}>All time high(ATH):{currency === 'USD' ? ' $' : ' ₹'}{coinDetailsData.ath}</Text>
                                <Text fontWeight={'bold'}>Max supply: {coinDetailsData.maupply ? coinDetailsData.maxSupply : 'not available'}</Text>
                            </HStack>
                            <Text fontWeight={'bold'}>Volume:{currency === 'USD' ? ' $' : ' ₹'}{coinDetailsData.volume}</Text>

                        </HStack>
                        <HStack color={mode === 'light' ? 'black' : 'whitesmoke'}>
                            <Heading as={'h1'} fontSize={'22px'}>Description:</Heading>
                            <Text>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit omnis, praesentium cupiditate reprehenderit suscipit molestiae id! Iure, ducimus. Iste aperiam quisquam omnis voluptatum ut molestiae sint. Exercitationem nisi asperiores facere voluptate, temporibus qui! Expedita aut pariatur molestiae nam, a debitis similique delectus, ex rerum unde natus itaque, aliquid at temporibus?
                            </Text>
                        </HStack>
                        <HStack marginTop={'10px'}>
                            <Button colorScheme='purple' p={'0px 5px'} size={'sm'}>Whitepaper <Box marginLeft={'3px'} marginTop={'1px'}><IoDocumentSharp /></Box></Button>
                            <Button colorScheme='purple' p={'0px 5px'} size={'sm'}>Wishlist <Box marginLeft={'3px'} marginTop={'1px'}><MdFavorite /></Box></Button>
                            <Button colorScheme='purple' p={'0px 5px'} size={'sm'}>Wishlist <Box marginLeft={'3px'} marginTop={'1px'}><MdFavorite /></Box></Button>
                        </HStack>
                    </Stack>
                </Stack>
            </Customcard>
        </NavigationLayout>
    )
}
export default CoinDetails;