import { useParams } from 'react-router-dom';
import NavigationLayout from '../NavigationLayout/NavigationLayout'
import { Customcard } from '../Customcard/Customcard';
import { ModeContext } from '../../Context/ModeProvider'
import { Heading } from '@chakra-ui/layout';
import { useContext } from 'react';
const CoinDetails = () => {
    const { mode } = useContext(ModeContext);
    const { id } = useParams("id");
    return (
        <NavigationLayout title="Coin Details">
            <Customcard w={"99%"} mt={'10px'} height={'90%'} padding={'10px'} backgroundColor={mode === 'light' ? 'whitesmoke' : '#1A202C'} borderRadius={'5px'}>
                <Heading as={'h1'}>{id[0].toUpperCase() + id.slice(1)}</Heading>
            </Customcard>
        </NavigationLayout>
    )
}

export default CoinDetails;