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
  } from '@chakra-ui/react'

  import Cookies from 'js-cookie'

  import { useState } from 'react'
  
  const SignIn = () => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const emailChange = (e) => {
        setEmail(e.target.value)
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
            body : JSON.stringify({ username : email, password : password})
            
        })
            .then(response => response.json())
            .then(json => {
                Cookies.set("authToken", json.access_token, { expires: 7 })
            })
    }


    return (
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <form onSubmit={handleClick}>
                <Stack spacing="8">
                    <Stack spacing="6">

                    <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                        <Heading size={{ base: 'xs', md: 'sm' }}>Log in to your account</Heading>
                        <HStack spacing="1" justify="center">
                        <Text color="muted">Don't have an account?</Text>
                        <Button variant="link" colorScheme="blue">
                            Sign up
                        </Button>
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
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input id="email" type="text" onChange={emailChange}/>
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input id="password" type="password" onChange={passwordChange} />
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