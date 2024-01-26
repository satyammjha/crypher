import {
    HStack, Heading, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Icon,
} from "@chakra-ui/react"
import { FaCircleUser } from "react-icons/fa6";
import { ChevronDownIcon } from '@chakra-ui/icons'
import { BiSupport } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

const Topnav = ({ title, onOpen }) => {

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

            <HStack boxShadow='xl' h='16' justify={"space-between"} mx={"auto"} px='32'>

                <Icon as={GiHamburgerMenu} display={{
                    lg: 'none',
                    base: 'block'
                }} onClick={onOpen} />

                <Heading fontSize={'28px'}>{title}</Heading>

                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        <Icon as={FaCircleUser} fontSize={"33px"} />
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