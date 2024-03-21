import {
    HStack, Heading, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Icon,
    Box
} from "@chakra-ui/react"
import { FaCircleUser } from "react-icons/fa6";
import { ChevronDownIcon } from '@chakra-ui/icons'
import { BiSupport } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext } from "react";
import { ModeContext } from "../../Context/ModeProvider";
import { GiMoon } from "react-icons/gi";
import { IoMdSunny } from "react-icons/io";

const Topnav = ({ title, onOpen }) => {

    const { mode, setMode } = useContext(ModeContext);

    let topNavLinks = [

        {
            link: 'Support',
            icon: BiSupport
        },
        {
            link: 'Career',
            icon: MdOutlineLibraryBooks
        },
        {
            link: 'Logout',
            icon: TbLogout
        }
    ]

    return (
        <>
            <HStack boxShadow='xl' h='16' justify={"space-between"} mx={"auto"} px='32' backgroundColor={mode === 'light' ? 'whitesmoke' : 'black'}>
                <Icon as={GiHamburgerMenu} display={{
                    lg: 'none',
                    base: 'block'
                }} onClick={onOpen} />
                <Heading color={mode === 'light' ? 'black' : 'white'} fontSize={"23px"}>{title}</Heading>
                <Box padding={'3px'} borderRadius={'50%'} border={'2px solid'} borderColor={mode === 'light' ? 'black' : 'white'} cursor={'pointer'} _hover={{
                    opacity: '0.8'
                }} style={{
                    transition: 'all 0.3s ease'
                }} fontSize={'23px'} alignItems={'center'} onClick={() => {
                    setMode(mode === 'light' ? 'dark' : 'light')
                }}>
                   
                        {mode === 'light' ? <GiMoon /> : <IoMdSunny color="white" />}
                  
                </Box>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        <Icon as={FaCircleUser} fontSize={"23px"} />
                    </MenuButton>
                    <MenuList>
                        {topNavLinks.map((Links, index) => {
                            return (
                                <MenuItem key={index} justify={"space-between"}>
                                    <Icon as={Links.icon} fontSize={'20px'} mx='10px' />
                                    {Links.link}
                                </MenuItem>
                            )
                        })}
                    </MenuList>
                </Menu>
            </HStack>
        </>
    )
}

export default Topnav;