import React, { useContext } from 'react';
import { Customcard } from '../Customcard/Customcard';
import { HStack, Heading, Input, Image, Stack } from '@chakra-ui/react';
import { ModeContext } from '../../Context/ModeProvider';

const Topmovers = () => {
    const { mode } = useContext(ModeContext);
    return (
        <Customcard
            height={'73vh'}
            marginTop={'10px'}
            background={mode === 'light' ? 'white' : '#1A202C'}
            width={'30vw'}
            css={{
                overflowY: 'hidden',
                '::-webkit-scrollbar': {
                    width: '12px',
                },
                '::-webkit-scrollbar-button': {
                    width: '1',
                },
            }
            }
        >
            <Input variant='outline' placeholder='search 🔍' textAlign={'center'} />
            <HStack gap={'6rem'} background={'#5F00D9'} color='white' borderRadius={'3px'} marginTop={'13px'}>
                <Heading fontSize={'14px'} padding={'10px'}   >Coin</Heading>
                <Heading fontSize={'14px'} padding={'10px'}   >Price</Heading>
                <Heading fontSize={'14px'} padding={'10px'}   >Change</Heading>
            </HStack>
            <Customcard height={'80%'} width={'100%'} marginTop={'10px'} backgroundColor={mode === 'light' ? 'white' : '#060606'} >
                <Stack gap={4 / 2}>
                    <HStack gap={'6rem'} color={mode === 'light' ? 'black' : 'white'} borderRadius={'3px'} marginTop={'3px'}>
                        <HStack marginLeft={'-15px'}>
                            <Image src={'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAyL3JtNDY3LWNyeXB0b2N1cnJlbmN5LTAxMy5wbmc.png'} height={'30px'} width={'30px'} borderRadius={'50%'} />
                            <Heading fontSize={'14px'}>Bitcoin</Heading>
                        </HStack>
                        <Heading fontSize={'14px'}>$60,000</Heading>
                        <Heading fontSize={'14px'}>+2.5%</Heading>

                    </HStack>
                    <hr />
                </Stack>
            </Customcard>
        </Customcard>
    )
}
export default Topmovers;