import { useContext } from 'react'
import { ModeContext } from '../../Context/ModeProvider'
import { userContext } from '../../Context/UserProvider'
import { currencyContext } from '../../Context/CurrencyProvider'
import { Customcard } from '../Customcard/Customcard'
import { Box, Text } from '@chakra-ui/react'

const Watchlist = () => {
    const { mode } = useContext(ModeContext)
    const { userLoggedIn } = useContext(userContext)
    const { watchlist, setWatchList } = useContext(currencyContext)
    return (
        <>
            <Customcard
                height={'46.5vh'}
                backgroundColor={mode === 'light' ? 'whitesmoke' : '#1A202C'}
                width={'28.5vw'}
                css={{
                    overflowY: 'auto',
                    '::-webkit-scrollbar': {
                        width: '12px',
                    },
                    '::-webkit-scrollbar-button': {
                        width: '1',
                    },
                }}
                padding={'unset'}
            >
                <Text backgroundColor={"#5F00D9"} padding={'2px 6px'} fontSize={"16px"} color={'whitesmoke'} fontWeight={"bold"}
                    position={'relative'} w={'100%'}>Watchlist</Text>

                <p>{
                    userLoggedIn === true ? 'You have no items in your watchlist' : 'Please login to view your watchlist'
                }</p>
            </Customcard>
        </>
    )
}

export default Watchlist;