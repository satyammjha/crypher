import { useContext, useState, useEffect } from 'react';
import { ModeContext } from '../../Context/ModeProvider';
import {
    Box,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Stack,
    Input,
    InputGroup,
    InputRightElement,
    Tabs,
    Image,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Text,
    Badge,
    useToast,
    Flex
} from '@chakra-ui/react'
import { IoLogIn, IoLogOut } from "react-icons/io5";
import googleIcon from '../../Assets/google.png'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../Firebase';
import { userContext } from '../../Context/UserProvider';

const Login = () => {
    const toast = useToast()
    const { mode } = useContext(ModeContext);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const [activeTab, setActiveTab] = useState("signin");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [toastMsg, setToastMsg] = useState()

    const { user, setUser, userLoggedIn, setUserLoggedIn } = useContext(userContext);

    console.log(userLoggedIn)

    const handleSignUp = async () => {

        if (password !== confirmPassword) {
            alert('Password and Confirm Password should be same')
        }
        else {
            try {
                const result = await createUserWithEmailAndPassword(auth, email, password);
                alert('User Created Successfully')
                onClose()
            }
            catch (error) {
                console.log('error:', error.message)
            }
        }
    }

    const handleLogIn = async () => {
        if (email === "" || password === "") {
            alert('Please fill all the fields')
        }
        else {
            const result = await signInWithEmailAndPassword(auth, email, password);
            setUserLoggedIn(true)
            alert(result.user.email)
            console.log('result:', result.user.email)
            onClose()
        }
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                setUserLoggedIn(false);
                console.log(userLoggedIn);
                setToastMsg('User logged out successfully')
                document.getElementById('toastBtn').click()
            })
            .catch(error => {
                console.error('Sign-out error:', error);
            });
    }
    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                setToastMsg('User logged in successfully')
                setUserLoggedIn(true);
                onClose();
                document.getElementById('toastBtn').click()
                console.log("User logged in:", userLoggedIn);
                console.log("Sign-in result:", result);
            })
            .catch((error) => {
                console.error("Sign-in error:", error);
            });
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                console.log('user:', user.email)
                console.log(user)
            }
            else {
                setUser(null)
            }
        }
        )
    })

    return (
        <>
            <Button
                id='toastBtn'
                display={'none'}
                onClick={() =>
                    toast({
                        isClosable: true,
                        position: 'top-right',
                        render: ({ onClose }) => (
                            <Box color={'whitesmoke'} p={3} bg={mode === 'light' ? '#5F00D9' : 'black'}>
                                <Flex justify="space-between" align="center">
                                    <Box color={mode === 'light' ? 'black' : 'whitesmoke'}>{toastMsg}</Box>
                                    <Button onClick={onClose} variant="ghost" colorScheme="whitesmoke">
                                        X
                                    </Button>
                                </Flex>
                            </Box>
                        ),
                    })
                }
            >
                Show Toast
            </Button>
            {userLoggedIn === false ? (
                <Button onClick={onOpen} leftIcon={<IoLogIn />} backgroundColor={"#5F00D9"} color={'white'}>
                    Login
                </Button>
            ) : (
                <Button rightIcon={<IoLogOut />} backgroundColor={"#5F00D9"} _hover={{ opacity: '0.8' }} color={'white'} onClick={() => {
                    handleSignOut();
                    console.log(userLoggedIn);
                }}>
                    Logout
                </Button>
            )}

            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent backgroundColor={mode === 'light' ? 'whitesmoke' : 'black'} color={mode === 'light' ? 'whitesmoke' : 'black'}>
                    <Tabs variant='enclosed'>
                        <TabList gap={0}>
                            <Tab onClick={() => {
                                setActiveTab('signin')
                            }} backgroundColor={activeTab === 'signin' ? '#5f00d9' : 'unset'} color={activeTab === 'signin' ? 'whitesmoke' : 'black'}>SignIn</Tab>
                            <Tab onClick={() => {
                                setActiveTab('signup')
                            }} backgroundColor={activeTab === 'signup' ? '#5f00d9' : 'unset'} color={activeTab === 'signup' ? 'whitesmoke' : 'black'}>SignUp</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <ModalCloseButton color={mode === 'light' ? 'black' : 'white'} />
                                <ModalBody>
                                    <Stack spacing={4}>
                                        <Input placeholder='Email' color={'white'} onChange={(e) => {
                                            setEmail(e.target.value)
                                        }} />
                                        <InputGroup size='md'>
                                            <Input
                                                pr='4.5rem'
                                                type={show ? 'text' : 'password'}
                                                placeholder='Enter password'
                                                color={'white'}
                                                onChange={(e) => { setPassword(e.target.value) }}
                                            />
                                            <InputRightElement width='4.5rem'>
                                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                    {show ? 'Hide' : 'Show'}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                        <Button onClick={() => {
                                            onOpen()
                                            handleLogIn()
                                        }} leftIcon={<IoLogIn />} backgroundColor={"#5F00D9"} color={'white'}>Login</Button>
                                        <Text color={mode === 'light' ? 'black' : 'whitesmoke'} marginTop={'-10px'} marginLeft={'47%'}>OR</Text>
                                        <Badge marginLeft={'43%'} cursor={'pointer'} _hover={{
                                            opacity: '0.8'
                                        }} borderRadius={'50%'} padding={'0.5px'} maxWidth={'max-content'} colorScheme='purple' onClick={() => {

                                            signInWithGoogle();

                                        }}><Image src={googleIcon} height={'50px'} width={'50px'} /></Badge>
                                    </Stack>
                                </ModalBody>
                            </TabPanel>
                            <TabPanel>
                                <ModalCloseButton color={mode === 'light' ? 'black' : 'white'} />
                                <ModalBody>
                                    <Stack spacing={4}>
                                        <Input placeholder='Email' color={'white'} onChange={(e) => {
                                            setEmail(e.target.value)
                                        }} />
                                        <InputGroup size='md'>
                                            <Input
                                                pr='4.5rem'
                                                type={show ? 'text' : 'password'}
                                                placeholder='Enter password'
                                                color={'white'}
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                }
                                                }
                                            />
                                            <InputRightElement width='4.5rem'>
                                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                    {show ? 'Hide' : 'Show'}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                        <InputGroup size='md'>
                                            <Input
                                                pr='4.5rem'
                                                type={show ? 'text' : 'password'}
                                                placeholder='Confirm password'
                                                color={'white'}
                                                onChange={(e) => {
                                                    setConfirmPassword(e.target.value);
                                                }
                                                }
                                            />
                                            <InputRightElement width='4.5rem'>
                                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                    {show ? 'Hide' : 'Show'}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>

                                        <Button leftIcon={<IoLogIn />} backgroundColor={"#5F00D9"} color={'white'}
                                            onClick={() => {
                                                onOpen();
                                                handleSignUp();
                                            }}>SignUp</Button>
                                        <Text color={mode === 'light' ? 'black' : 'whitesmoke'} marginTop={'-10px'} marginLeft={'47%'}>OR</Text>
                                        <Badge marginLeft={'43%'} cursor={'pointer'} _hover={{
                                            opacity: '0.8'
                                        }} borderRadius={'50%'} padding={'0.5px'} maxWidth={'max-content'} colorScheme='purple'><Image src={googleIcon} height={'50px'} width={'50px'} onClick={() => {
                                            signInWithGoogle();
                                        }} /></Badge>
                                    </Stack>
                                </ModalBody>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </ModalContent>
            </Modal>
        </>
    )
}
export default Login