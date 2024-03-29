import { useContext, useState } from 'react';
import { ModeContext } from '../../Context/ModeProvider';
import {
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Stack,
    Input,
    InputGroup,
    InputRightElement,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel
} from '@chakra-ui/react'
import { IoLogIn } from "react-icons/io5";

const Login = () => {
    const { mode } = useContext(ModeContext);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <>
            <Button onClick={onOpen} leftIcon={<IoLogIn />} backgroundColor={"#5F00D9"} color={'white'}>Login</Button>

            <Modal isOpen={isOpen} onClose={onClose} >


                <ModalOverlay />
                <ModalContent backgroundColor={mode === 'light' ? 'whitesmoke' : 'black'} color={mode === 'light' ? 'whitesmoke' : 'black'}>
                    <Tabs variant='enclosed'>
                        <TabList gap={0}>
                            <Tab backgroundColor={'#5F00D9'} color={'white'}>One</Tab>
                            <Tab backgroundColor={'#5F00D9'} color={'white'}>Two</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <ModalHeader color={mode === 'light' ? 'black' : 'whitesmoke'}>Login</ModalHeader>
                                <hr />
                                <ModalCloseButton color={mode === 'light' ? 'black' : 'white'} />
                                <ModalBody>
                                    <Stack spacing={4}>
                                        <Input placeholder='Email' color={'white'} />
                                        <InputGroup size='md'>
                                            <Input
                                                pr='4.5rem'
                                                type={show ? 'text' : 'password'}
                                                placeholder='Enter password'
                                                color={'white'}
                                            />
                                            <InputRightElement width='4.5rem'>
                                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                    {show ? 'Hide' : 'Show'}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </Stack>
                                </ModalBody>
                            </TabPanel>
                            <TabPanel>
                                Panel 2
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            SignUp
                        </Button>
                    </ModalFooter>

                </ModalContent>

            </Modal>

        </>
    )
}

export default Login;