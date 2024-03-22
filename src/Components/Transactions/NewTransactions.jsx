
import { Customcard } from '../Customcard/Customcard'
import { Text, Stack, HStack, Icon, Badge, Box } from '@chakra-ui/react'
import { AiFillDollarCircle } from "react-icons/ai";

const NewTransactions = () => {

    const transactionsData = [

        {
            name: 'INR Deposit',
            date: '23-01-2024 03:33 AM',
            amount: '+ ₹ 33,000'

        },

        {
            name: 'Btc Withdrawl',
            date: '23-01-2024 03:33 AM',
            amount: '- 0.0003 btc'

        },

        {
            name: 'TRX Transfer',
            date: '23-01-2024 03:33 AM',
            amount: '- 139 trx'

        },

        {
            name: 'INR Withdrawl',
            date: '23-01-2024 03:33 AM',
            amount: '- ₹ 3,000'

        },

        {
            name: 'BTC Deposit',
            date: '23-01-2024 03:33 AM',
            amount: '+0.000437 btc'

        },
        {
            name: 'INR Deposit',
            date: '23-01-2024 03:33 AM',
            amount: '+ ₹ 33,000'

        },

    ]
    return (
        <>
            <Customcard height={'37vh'} marginTop={'10px'} overflowY={'scroll'} scrollBehavior={'hidden'}
                css={{
                    overflowY: 'auto',
                    '::-webkit-scrollbar': {
                        width: '12px', // Set the width of the scrollbar
                    },
                    '::-webkit-scrollbar-button': {
                        width: '1', // Hide the scrollbar arrows
                    },
                }}>

                <Box>
                    <Text fontSize={"13px"} color={"gray"} fontWeight={"bold"} p={'5px'} marginLeft={'-13px'}
                        marginTop={'-1.5rem'} position={'fixed'} bg={'white'} w={'25vw'}>Recent Transactions</Text>
                </Box>

                {transactionsData.map((data, index) => (
                    <>
                        <HStack gap={12}
                            marginTop={0}
                            marginBottom={'10px'}
                            key={index}
                            cursor={'pointer'}
                            _hover={
                                {
                                    bg: 'gray.100'
                                }

                            }>

                            <Badge borderRadius={'10px'} marginTop={'17px'}>
                                <Icon as={AiFillDollarCircle} /></Badge>
                            <Stack marginTop={'8px'}>
                                <Text fontWeight={500} fontSize={'13px'}>{data.name}</Text>
                                <Text fontWeight={500} fontSize={'13px'} color={'gray'}>{data.date}</Text>
                            </Stack>

                            <Text fontWeight={'bold'} fontSize={'13px'} my={'-10px'} color={'green'} marginTop={'3px'} mx={'auto'}>{data.amount}</Text>
                        </HStack>
                        <hr />

                    </>

                ))
                }

            </Customcard>
        </>
    )
}

export default NewTransactions;