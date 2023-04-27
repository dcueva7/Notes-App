import React from 'react'

import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react'

import { Card, CardHeader, CardBody, Heading, Textarea, IconButton } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

export const NotePage = (props ) => {

    
    const params = useParams();

    const [ note, setNote ] = useState("")

    useEffect(() =>{
        fetch(`/api/notes/${params.id}`)
            .then(response => response.json())
            .then(json => setNote(json))
        
        }, [params.id]
    )
    

    return (
      <Flex h="100vh" align="center" justify="center">
        <Card sx={{ width: '60%', textAlign: 'center', minHeight: '400px' }}>
            <CardHeader textAlign='center'>
              <Flex justifyContent="space-between" alignItems="center">
                <IconButton icon={<ArrowBackIcon />} aria-label="Back" />
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