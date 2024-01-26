import {
    HStack, Heading, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Icon
} from "@chakra-ui/react"
import { FaCircleUser } from "react-icons/fa6";
import { ChevronDownIcon } from '@chakra-ui/icons'

const Topnav = () => {
    return (
        <>

            <HStack boxShadow='sm' h='16' justify={"space-between"} mx={"auto"} px='32'>

                <Heading fontSize={'28px'}>Dashboard</Heading>

                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        <Icon as={FaCircleUser} size={'xxl'} />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Download</MenuItem>
                        <MenuItem>Create a Copy</MenuItem>
                        <MenuItem>Mark as Draft</MenuItem>
                        <MenuItem>Delete</MenuItem>
                        <MenuItem>Attend a Workshop</MenuItem>
                    </MenuList>
                </Menu>

            </HStack>
        </>
    )
}

export default Topnav;