import { HStack, Stack, Icon, Text, Badge } from '@chakra-ui/react'
import { RiInformationFill } from "react-icons/ri";
import { IoWallet } from "react-icons/io5";
import ButtonItem from '../../Utilities/Button';
import { GiSaveArrow } from "react-icons/gi";
import { HiUpload } from "react-icons/hi";
import { BalanceContext } from '../../Context/BalanceProvider';
import { useContext } from 'react';

const Portfolio = () => {
    let purple = "purple";

    const { portfolioBalance, setPortfolioBalance, walletBalance, setWalletBalance, btcBalance, setBtcBalance } = useContext(BalanceContext)

    const balances = {
        investment: portfolioBalance,
        btcBalance: btcBalance,
        inrBalance: walletBalance
    }

    return (
        <>

            <HStack
                borderRadius={"xl"}
                bg={'white'}
                padding={"10px"}
                mt={"10px"}
                color={"black.80"}
                align={
                    {
                        base: "flex-start",
                        xl: 'left',

                    }
                }
                flexDir={{
                    base: "column",
                    xl: "row"

                }}>

                <Stack>
                    <HStack>
                        <Text fontSize={"17px"} color={"gray"} fontWeight={"bold"}>Total portfolio value:</Text>
                        <Icon as={RiInformationFill} />
                    </HStack>
                    <Text fontSize={"20px"} color={'black'} fontWeight={"bold"}>₹{balances.investment} <Badge colorScheme='green'>inr</Badge></Text>
                </Stack>
                <Stack
                    marginLeft={{
                        base: '100px',

                    }}
                    marginRight={{
                        base: '96'
                    }}
                >
                    <HStack>
                        <Text fontSize={"17px"} color={"gray"} fontWeight={"bold"}>Wallet Balance:</Text>
                        <Icon as={IoWallet} />
                    </HStack>
                    <HStack>
                        <Text fontSize={"20px"} color={'black'} fontWeight={"bold"}>{balances.btcBalance} <Badge colorScheme='green'>btc</Badge></Text>
                        <Text fontSize={"20px"} color={'black'} fontWeight={"bold"} mx={"33px"}>₹ {balances.inrBalance}<Badge colorScheme='green' ml={"3px"}>inr</Badge> </Text>
                    </HStack>

                </Stack>

                <HStack
                    spacing={8}
                    marginLeft={{
                        xl: '-3px'

                    }
                    }

                >
                    <ButtonItem text={"Deposit"} scheme={purple} icon={<GiSaveArrow />} />
                    <ButtonItem text={"Withdraw"} scheme={purple} icon={<HiUpload />} />

                </HStack>


            </HStack>

        </>
    )
}

export default Portfolio;
