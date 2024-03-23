import React, { useEffect, useState } from 'react';
import { Customcard } from '../Customcard/Customcard';
import { Box, Text, HStack, Image, Stack, Heading } from '@chakra-ui/react';
const apiKey = process.env.REACT_APP_API_KEY_1;

const News = () => {
    const [result, setResult] = useState([]);

    useEffect(() => {
        const newsFunc = async () => {
            const url = 'https://crypto-news16.p.rapidapi.com/news/top/5';
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': `${apiKey}`,
                    'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                console.log(result);
                setResult(result)

            } catch (error) {
                console.error(error);
            }
        };

        newsFunc();
    }, []);

    return (
        <Customcard
            height={'46.6vh'}
            backgroundColor={'whitesmoke'}
            width={'28.5vw'}
            css={{
                overflowY: 'auto',
                '::-webkit-scrollbar': {
                    width: '12px',
                },
                '::-webkit-scrollbar-button': {
                    width: '1',
                },
            }}
            padding={'unset'}
        >
            <Box>
                <Text backgroundColor={"#5F00D9"} padding={'2px 6px'} fontSize={"16px"} color={'whitesmoke'} fontWeight={"bold"}
                    position={'relative'} w={'100%'}>Latest</Text>
            </Box>

            {/* <HStack alignContent={'center'} marginTop={'10px'}
                cursor={'pointer'}
                _hover={
                    {
                        bg: 'gray.100'
                    }}
                padding={'10px'}
                borderRadius={'3px'}
            >
                <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' height={'70px'} width={'70px'} />
                <Stack>

                    <Heading as={"h5"} size='sm'>
                        FTX Seeks to Sell 8% Stake in Anthropic for Sake of 'Shareholders'
                    </Heading>
                    <Text size={'sm'} fontSize={'13px'}>
                        Court filings show the crypto estate wants to agree procedures so that it can sell the shares at the "optimal" time.</Text>
                    <hr />
                </Stack>
            </HStack> */}

            {
                result.length > 0 ? (

                    result.map((item, index) => (
                        <HStack alignContent={'center'} marginTop={'10px'}
                            cursor={'pointer'}
                            _hover={
                                {
                                    bg: 'gray.100'
                                }}
                            padding={'10px'}
                            borderRadius={'3px'}
                            key={index}
                        >
                            <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' height={'70px'} width={'20px'} marginRight={'13px'} />
                            <Stack>
                                <HStack>
                                    <Heading as={"h5"} size='sm' fontSize={'10px'}>
                                        {item.title}
                                    </Heading>
                                    -- <Text fontSize={'10px'}>{(item.date.toLocaleString())}</Text>
                                </HStack>
                                {/* <Text size={'sm'} fontSize={'10px'}>
                                    {item.description}</Text> */}
                                <hr />
                            </Stack>
                        </HStack>
                    ))) :
                    (
                        <h1>Loading...</h1>
                    )
            }

        </Customcard>
    );
};
export default News;