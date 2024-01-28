import { Button } from '@chakra-ui/react'

const ButtonItem = ({ icon, text, scheme,style }) => {
    return <Button leftIcon={icon} colorScheme={scheme} variant='solid' style={style}>
        {text}
    </Button>
}

export default ButtonItem;
