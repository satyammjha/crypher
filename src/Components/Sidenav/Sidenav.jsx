import "@fontsource/ubuntu";
import { HStack, Stack, Text, Icon, Heading, Box } from '@chakra-ui/react'
import { RxDashboard } from "react-icons/rx";
import { TbArrowsDoubleNeSw } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { FaBriefcase } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ModeContext } from "../../Context/ModeProvider";
import { useContext } from "react";


const Sidenav = ({ boxShadow, backgroundColor }) => {

    const { mode } = useContext(ModeContext)

    const navLinks = [
        {
            icon: RxDashboard,
            Link: '/',
            text: 'Dashboard'

        },
        {
            icon: FaBriefcase,
            Link: '/portfolio',
            text: 'Portfolio'
        },
        {
            icon: TbArrowsDoubleNeSw,
            Link: '/transactions',
            text: 'Transactions'
        }
    ]

    return (
        <Stack maxW='16rem'
            height='100vh'
            backgroundColor={backgroundColor}
            boxShadow={boxShadow}
            justify='space-between'
        >
            <Box>

                <Heading as='h1' textAlign='center' mt='24px' color={mode === 'light' ? 'inherit' : 'whitesmoke'} fontSize='23px' fontWeight='bolder'>
                    @CRYPHER</Heading>
                <Box mt='6'>
                    {navLinks.map((link, index) => {
                        return (
                            <Link to={link.Link}>
                                <HStack
                                    marginLeft='0'
                                    color={mode === 'light' ? 'gray.500' : 'whitesmoke'}
                                    key={index}
                                    p='5px'
                                    mt='10px'
                                    cursor='pointer'
                                    transition="0.3s all ease"
                                    _hover={
                                        { color: 'black', bg: '#C5C6D0', fontWeight: 'bolder' }
                                    }
                                    marginRight='0px'
                                >


                                    <Icon as={link.icon} />
                                    <Text fontSize='14px' fontWeight='bold'>{link.text}</Text>
                                </HStack>
                                <hr color={mode==='light'?'black':'white'}/>
                            </Link>
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