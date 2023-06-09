import React from 'react'

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react'

import { Card, CardHeader, CardBody, Heading, IconButton, Button } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import { ArrowBackIcon, DeleteIcon } from '@chakra-ui/icons'

import ReactQuill from 'react-quill'
import Cookies from 'js-cookie'

import useAuth from './UseAuth';

export const NotePage = (props ) => {


  useAuth();
  
  const nav = useNavigate();
  const params = useParams();

  const [ note, setNote ] = useState("")

  useEffect(() =>{
      const authToken = Cookies.get("authToken")

      fetch(`/api/notes/${params.id}`, {  
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Token ${authToken}`,
        }, })
          .then(response => response.json())
          .then(json => setNote(json))
      
      }, [params.id]
  )

  const updateNote = () => {
    const authToken = Cookies.get("authToken")

    fetch(`/api/update/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${authToken}`,
      },
      body : JSON.stringify({'body' : note.body}),
      
    })
      .then(response => response.json())
      .then(json => console.log(json))

    nav('/');

  }

  const deleteNote = () => {
    const authToken = Cookies.get("authToken")
    fetch(`/api/delete/${params.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${authToken}`,
      }, 
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        
      })

      nav('/')
    
  }

  return (
    <>
      <Flex justifyContent="flex-end" px={4} py={2}>
        <Button colorScheme='red' onClick={() => {
          Cookies.remove("authToken")
          nav('/sign_in')
        }}>Logout</Button>

      </Flex>
      <Flex h="100vh" align="center" justify="center">
        <Card sx={{ width: '60%', textAlign: 'center', minHeight: '400px' }}>
            <CardHeader textAlign='center'>
              <Flex justifyContent="space-between" alignItems="center">
                <IconButton 
                icon={<ArrowBackIcon />} 
                aria-label="Back" 
                onClick={updateNote} />

                <Heading size='lg'>Note</Heading>
                <div style={{ width: '24px' }}></div>

                <IconButton 
                icon={<DeleteIcon color='red' />}
                aria-label='black'
                onClick={deleteNote}
                />

              </Flex>
            </CardHeader>
            <CardBody>
                    <ReactQuill 
                      value={note.body} 
                      onChange={content => setNote({...note, 'body': content})} 
                      style={{height : "200px"}} />
            </CardBody>
        </Card>
    </Flex>
  </>
      
  )
}

export default NotePage;