import "@fontsource/ubuntu";
import { HStack, Stack, Text, Icon, Heading, Box } from '@chakra-ui/react'
import { RxDashboard } from "react-icons/rx";
import { TbArrowsDoubleNeSw } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
const Sidenav = () => {

    const navLinks = [
        {
            icon: RxDashboard,
            Link: '/',
            text: 'Dashboard'
        },
        {
            icon: TbArrowsDoubleNeSw,
            Link: '/transactions',
            text: 'Transactions'
        }
    ]

    return (
        <Stack maxW='16rem' height='100vh'  backgroundColor='whiteSmoke' boxShadow='lg' justify='space-between' >
            <Box>

                <Heading as='h1' textAlign='center' mt='24px' fontSize='23px' fontWeight='bolder'>
                    @CRYPHER</Heading>
                <Box mt='6'>
                    {navLinks.map((link, index) => {
                        return (
                            <HStack
                                marginLeft='0'
                                key={index}
                                color='gray.500'
                                p='5px'
                                mt='10px'
                                cursor='pointer'
                                transition="0.3s all ease"
                                _hover={
                                    { color: 'black', bg: 'white', fontWeight: 'bolder' }
                                }
                                marginRight='0px'

                            >

                                <Icon as={link.icon} />
                                <Text fontSize='14px' fontWeight='bold'>{link.text}</Text>

                            </HStack>
                        )
                    })}
                </Box>
            </Box>
            <Box>
                <HStack
                    color='gray.500'
                    p='5px'
                    mt='10px'
                    cursor='pointer'
                    transition="0.3s all ease"
                    _hover={
                        { color: 'black', fontWeight: 'bolder' }
                    }
                    marginLeft='60px'
                    marginBottom='20px'
                >

                    <Icon as={BiSupport} />
                    <Text fontSize='14px' fontWeight='bold'>Support</Text>

                </HStack>
            </Box>
        </Stack>
    )
}

export default Sidenav;