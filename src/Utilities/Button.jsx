import { Button } from '@chakra-ui/react'

const ButtonItem = ({ icon, text, scheme }) => {
    return <Button leftIcon={icon} colorScheme={scheme} variant='solid'>
        {text}
    </Button>
}

export default ButtonItem;
