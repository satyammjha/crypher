import React from 'react';
import { Customcard } from '../Customcard/Customcard';
import { HStack, Heading, Input } from '@chakra-ui/react';

const Topmovers = () => {
    return (
        <Customcard
            height={'73vh'}
            marginTop={'10px'}
            width={'30vw'}
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
            <Input variant='outline' placeholder='search 🔍' textAlign={'center'} />
            <HStack gap={'6rem'} background={'#5F00D9'} color='white' borderRadius={'3px'} marginTop={'13px'}>
                <Heading fontSize={'14px'} padding={'10px'}   >Coin</Heading>
                <Heading fontSize={'14px'} padding={'10px'}   >Price</Heading>
                <Heading fontSize={'14px'} padding={'10px'}   >Change</Heading>
            </HStack>
        </Customcard>
    )
}

export default Topmovers;