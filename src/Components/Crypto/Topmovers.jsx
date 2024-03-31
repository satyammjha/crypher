import React, { useContext, useState, useEffect } from 'react';
import { Customcard } from '../Customcard/Customcard';
import { HStack, Heading, Input, Image, Stack, SkeletonCircle, SkeletonText, Button } from '@chakra-ui/react';
import { ModeContext } from '../../Context/ModeProvider';
import { currencyContext } from '../../Context/CurrencyProvider';
import { Link } from 'react-router-dom';
import { db } from '../../Firebase';
import { doc, setDoc } from 'firebase/firestore';
import Watchlist from '../Watchlist/Watchlist';

const apiKey = process.env.REACT_APP_API_KEY;
const Topmovers = () => {
    const { mode } = useContext(ModeContext);
    const { currency } = useContext(currencyContext);
    const [coinList, setCoinList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [inputText, setInputText] = useState('');
    const { watchlist, setWatchList } = useContext(currencyContext)


    const handleSearch = async () => {
        setLoading(true);
        const options = { method: 'GET', headers: { 'x-cg-demo-api-key': `${apiKey}` } };

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${inputText}`, options);
            const data = await response.json();
            console.log(data.coins);
            setCoinList(data.coins);
        } catch (error) {
            console.error('Error searching coins:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCoins = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&x_cg_demo_api_key=${apiKey}`);
            const data = await response.json();
            setCoinList(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching coins:', error);
            setLoading(false);
        }
    };


    const addToWatchList = async (id) => {
        const coinRef = doc(db, 'watchlist', id);
        try {
            await setDoc(coinRef,
                { coins: watchlist ? [...watchlist, coinList.id] : [coinList.id] });
        }
        catch {
            console.log('error adding to watchlist');
        }
    }

    useEffect(() => {
        fetchCoins();
    }, [currency]);


    return (
        <Customcard
            height={'76vh'}
            marginTop={'10px'}
            marginLeft={0}
            background={mode === 'light' ? 'white' : '#1A202C'}
        >
            <Input variant='outline' placeholder='search 🔍' value={inputText} textAlign={'center'} color={mode === 'light' ? 'black' : 'white'} onChange={(e) => {

                if (e.target.value === ' ') {
                    fetchCoins();
                }
                else {
                    setInputText(e.target.value)
                    handleSearch(e.target.value)
                }
            }} />
            <HStack gap={'4rem'} background={'#5F00D9'} color='white' borderRadius={'3px'} marginTop={'13px'}>
                <Heading fontSize={'14px'} padding={'10px'}>Coin</Heading>
                <Heading fontSize={'14px'} marginLeft={'3.3vw'} padding={'10px'}>Price</Heading>
                <Heading fontSize={'14px'} padding={'10px'}>Change(24hrs.)</Heading>
            </HStack>
            <Customcard height={'82%'} width={'100%'} marginTop={'10px'} backgroundColor={mode === 'light' ? 'white' : '#060606'} overflowY={'scroll'} scrollBehavior={'hidden'}
                css={{
                    overflowY: 'auto',
                    '::-webkit-scrollbar': {
                        width: '12px',
                    },
                    '::-webkit-scrollbar-button': {
                        width: '1',
                    },
                }}>
                <Stack gap={4 / 2} >
                    {loading ? (
                        <Stack>
                            <SkeletonCircle size="10" />
                            <SkeletonText noOfLines={20} spacing="4" width="100%" />
                        </Stack>
                    ) : (
                        <>
                            {coinList.map((coin, index) => (
                                <React.Fragment key={index}>
                                    <Link to={`/coindetails/${coin.name.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                                        <HStack transition={'0.1s ease-in all'} justify={'space-between'} color={mode === 'light' ? 'black' : 'whitesmoke'} cursor={'pointer'}
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                            _hover={{
                                                opacity: '0.8',
                                                padding: '0px',
                                                borderRadius: '1px',
                                                backgroundColor: mode === 'light' ? 'whitesmoke' : '#1A202C'
                                            }}>
                                            <HStack marginLeft={'-15px'}>
                                                <Image src={coin.image || coin.thumb} height={'30px'} width={'30px'} borderRadius={'50%'} />
                                                <Heading fontSize={'14px'}>{coin.symbol}</Heading>
                                            </HStack>
                                            <Heading fontSize={'14px'}>
                                                {currency === 'USD' ? '$ ' : '₹ '}
                                                {coin.current_price}
                                            </Heading>
                                            {hoveredIndex === index ? (
                                                <HStack transition={'0.1s ease-in all'} >
                                                    <Button height={'15px'} padding={'10px'}
                                                        width={'5vw'} borderRadius={'5px'} color={'whitesmoke'}
                                                        backgroundColor={'#5F00D9'}
                                                        _hover={{
                                                            color: 'black',
                                                        }}
                                                        fontSize={'13px'}
                                                        variant="solid" onClick={() => {
                                                            addToWatchList(coin.id);
                                                        }}  >Watchlist</Button>
                                                    <Button height={'15px'}
                                                        padding={'10px'}
                                                        width={'5vw'}
                                                        borderRadius={'5px'}
                                                        backgroundColor={'#5F00D9'}
                                                        color={'whitesmoke'}
                                                        _hover={{
                                                            color: 'black',
                                                        }}
                                                        fontSize={'13px'}
                                                        variant="solid">Trade</Button>
                                                </HStack>
                                            ) : (
                                                <Heading fontSize={'14px'} color={coin.price_change_percentage_24h < 0 ? 'red' : 'green'}>
                                                    {coin.price_change_percentage_24h < 0 ? '' : '+'}
                                                    {coin.price_change_percentage_24h}{'%'}
                                                </Heading>
                                            )}
                                        </HStack>
                                    </Link>
                                    <hr />
                                </React.Fragment>
                            ))}
                        </>
                    )}
                </Stack>
            </Customcard>
        </Customcard>
    )
}

export default Topmovers;