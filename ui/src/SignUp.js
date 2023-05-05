import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    HStack,
  } from '@chakra-ui/react'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SignUp = () => {
    const nav = useNavigate();
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleClick = (e) => {
        e.preventDefault()
        
        fetch('/auth/users/', {
            method : 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({email : email, username : username, password : password})
            
        }).then(response => {
            response.json()
        }).then(json => {
            Cookies.set("authToken", json.auth_token, { expires : 7} )
            console.log(json)
        })

        nav('/')

    }

    return (
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <form onSubmit={handleClick}>
                <Stack spacing="8">
                    <Stack spacing="6">

                    <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                        <Heading size={{ base: 'xs', md: 'sm' }}>Please Create An Account Here</Heading>
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
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <Input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </FormControl>
                        
                        </Stack>

                        <HStack spacing="6" justifyContent="center">
                        <Button variant="primary" type="submit">Sign Up</Button>

                        <Button variant="primary" onClick={() => nav('/sign_in')}>Sign In</Button>
                        
                        </HStack>
                    </Stack>
                    </Box>
                </Stack>
            </form>
        </Container>
    )

}

export default SignUp