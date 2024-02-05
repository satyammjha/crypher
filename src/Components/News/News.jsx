import React, { useEffect, useState } from 'react';
import { Customcard } from '../Customcard/Customcard';
import { Box, Text, HStack, Image, Stack, Heading } from '@chakra-ui/react';

const News = () => {
    const [result, setResult] = useState([]);

    useEffect(() => {
        const newsFunc = async () => {
            const url = 'https://crypto-news16.p.rapidapi.com/news/top/5';
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '4d6442ac9cmsh95ea1780187a163p136783jsnf2b8a7000228',
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
            height={'33vh'}
            marginTop={'10px'}
            width={'57vw'}
            css={{
                overflowY: 'auto',
                '::-webkit-scrollbar': {
                    width: '12px',
                },
                '::-webkit-scrollbar-button': {
                    width: '1',
                },
            }}
        >
            <Box>
                <Text fontSize={"13px"} color={"gray"} fontWeight={"bold"} p={'5px'} marginLeft={'-10px'}
                    marginTop={'-1.5rem'} position={'fixed'} bg={'white'} w={'max-content'}>Recent Transactions</Text>
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
                // result.length > 0 ? (

                //     result.map((item, index) => (
                //         <HStack alignContent={'center'} marginTop={'10px'}
                //             cursor={'pointer'}
                //             _hover={
                //                 {
                //                     bg: 'gray.100'
                //                 }}
                //             padding={'10px'}
                //             borderRadius={'3px'}
                //             key={index}
                //         >
                //             <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' height={'70px'} width={'70px'} marginRight={'13px'} />
                //             <Stack>
                //                 <HStack>
                //                     <Heading as={"h5"} size='sm'>
                //                         {item.title}
                //                     </Heading>
                //                     -- <Text fontSize={'11px'}>{(item.date)}</Text>
                //                 </HStack>
                //                 <Text size={'sm'} fontSize={'13px'}>
                //                     {item.description}</Text>
                //                 <hr />
                //             </Stack>
                //         </HStack>
                //     ))) :
                    (
                        <h1>Loading...</h1>
                    )
            }

        </Customcard>
    );
};
export default News;