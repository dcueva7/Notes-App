import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
    Alert,
    AlertIcon,
  } from '@chakra-ui/react'

import Cookies from 'js-cookie'

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
  
  const SignIn = () => {
    const nav = useNavigate();
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ error, setError ] = useState('')
    const usernameChange = (e) => {
        setUsername(e.target.value)
    }

    const passwordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()

        fetch('/auth/token/login', {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({ username : username, password : password})
            
        })
            .then(response => {
                if(!response.ok){
                    setError("Invalid Credentials!")
                    throw new Error("Invalid Credentials!");
                }
                 return response.json()
            })
            .then(json => {
                Cookies.set("authToken", json.auth_token, { expires: 7 });
                nav('/');
            }).catch(error => console.log(error.message))
        
        
    }


    return (
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <form onSubmit={handleClick}>
                <Stack spacing="8">
                {error && 
                    <Alert status="error">
                        <AlertIcon />
                            {error}
                    </Alert>}
                    <Stack spacing="6">

                    <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                        <Heading size={{ base: 'xs', md: 'sm' }}>Log in to your account</Heading>
                        <HStack spacing="1" justify="center">
                        <Text color="muted">Don't have an account?</Text>
                        <Link to='/sign_up'>
                            <Button variant="link" colorScheme="blue">
                                Sign up
                            </Button>
                        </Link>
                        </HStack>
                    </Stack>
                    </Stack>
                    <Box
                    py={{ base: '0', sm: '8' }}
                    px={{ base: '4', sm: '10' }}
                    bg={{ base: 'transparent', sm: 'bg-surface' }}
                    boxShadow={{ base: 'none', sm: 'md' }}
                    borderRadius={{ base: 'none', sm: 'xl' }}
                    >
                    <Stack spacing="6">
                        <Stack spacing="5">
                        <FormControl>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <Input id="username" type="text" value={username} onChange={usernameChange}/>
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input id="password" type="password" value={password} onChange={passwordChange} />
                        </FormControl>
                        
                        </Stack>
                        <HStack justify="space-between">
                        
                        <Button variant="link" colorScheme="blue" size="sm">
                            Forgot password?
                        </Button>
                        </HStack>
                        <Stack spacing="6">
                        <Button variant="primary" type="submit">Sign in</Button>
                        
                        </Stack>
                    </Stack>
                    </Box>
                </Stack>
            </form>
        </Container>
    )
}

export default SignIn;