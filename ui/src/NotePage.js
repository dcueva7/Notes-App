import React from 'react'

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react'

import { Card, CardHeader, CardBody, Heading, IconButton } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import { ArrowBackIcon, DeleteIcon } from '@chakra-ui/icons'

import ReactQuill from 'react-quill'

export const NotePage = (props ) => {

    const nav = useNavigate();
    const params = useParams();

    const [ note, setNote ] = useState("")

    useEffect(() =>{
        fetch(`/api/notes/${params.id}`, {  credentials : "include" } )
            .then(response => response.json())
            .then(json => setNote(json))
        
        }, [params.id]
    )

    const updateNote = () => {
      fetch(`/api/update/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-type' : 'application/json'
        },
        body : JSON.stringify({'body' : note.body}),
        credentials : "include",
        
      })
        .then(response => response.json())
        .then(json => console.log(json))

      nav('/');

    }

    const deleteNote = () => {
      fetch(`/api/delete/${params.id}`, {
        method: 'DELETE',
        credentials : "include" 
      })
        .then(response => response.json())
        .then(json => console.log(json))

      nav('/')
    }

    return (
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
        
    )
}

export default NotePage;