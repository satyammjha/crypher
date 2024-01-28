import { HStack, Stack, Icon, Text, Badge } from '@chakra-ui/react'
import { RiInformationFill } from "react-icons/ri";
import { IoWallet } from "react-icons/io5";
import ButtonItem from '../../Utilities/Button';
import { LuArrowDownToLine, LuArrowUpToLine } from "react-icons/lu";
const Portfolio = () => {
    let purple = "purple";
    const balances = {
        investment: '33,000',
        btcBalance: '0.893',
        inrBalance: '73,000'

    }

    return (
        <>

            <HStack borderRadius={"xl"} bg={'white'} padding={"10px"} mt={"10px"} color={"black.80"}>

                <Stack>
                    <HStack>
                        <Text fontSize={"17px"} color={"gray"} fontWeight={"bold"}>Total portfolio value:</Text>
                        <Icon as={RiInformationFill} />
                    </HStack>
                    <Text fontSize={"20px"} color={'black'} fontWeight={"bold"}>₹{balances.investment} <Badge colorScheme='green'>inr</Badge></Text>
                </Stack>
                <Stack mx={"5rem"}>
                    <HStack>
                        <Text fontSize={"17px"} color={"gray"} fontWeight={"bold"}>Wallet Balance:</Text>
                        <Icon as={IoWallet} />
                    </HStack>
                    <HStack position={"right"}>
                        <Text fontSize={"20px"} color={'black'} fontWeight={"bold"}>{balances.btcBalance} <Badge colorScheme='green'>btc</Badge></Text>
                        <Text fontSize={"20px"} color={'black'} fontWeight={"bold"} mx={"33px"}>₹ {balances.inrBalance}<Badge colorScheme='green' ml={"3px"}>inr</Badge> </Text>
                    </HStack>

                </Stack>

                <HStack marginLeft={"56"}>
                    <ButtonItem text={"Deposit"} scheme={purple} icon={<LuArrowDownToLine />} />
                    <ButtonItem text={"Withdraw"} scheme={purple} icon={<LuArrowUpToLine />} />

                </HStack>


            </HStack>

        </>
    )
}

export default Portfolio
