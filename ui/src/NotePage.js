import React from 'react'

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react'

import { Card, CardHeader, CardBody, Heading, Textarea, IconButton } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

export const NotePage = (props ) => {

    const nav = useNavigate();
    const params = useParams();

    const [ note, setNote ] = useState("")

    useEffect(() =>{
        fetch(`/api/notes/${params.id}`)
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
        body : JSON.stringify({'body' : note.body})
        
      })
        .then(response => response.json())
        .then(json => console.log(json))

      nav('/');

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
              </Flex>
            </CardHeader>
            <CardBody>
                    <Textarea 
                    defaultValue={note.body} 
                    onChange={e => setNote({...note, 'body': e.target.value})} 
                    height='auto'
                    maxHeight="200px"
                    sx={{ width: '100%', maxWidth: 'none', whiteSpace: 'pre-wrap' }} />
            </CardBody>
        </Card>
    </Flex>
        
    )
}

export default NotePage;