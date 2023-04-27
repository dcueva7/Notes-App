import React from 'react'

import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react'

import { Card, CardHeader, CardBody, Heading, Textarea } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'

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
    <Center p="6" color='white' axis='both'>
      <Card size="lg">
          <CardHeader>
            <Heading size='lg'>Note</Heading>
          </CardHeader>

          <CardBody>
                  <Textarea defaultValue={note.body} onChange={e => setNote({...note, 'body': e.target.value})} />
          </CardBody>
          
      </Card>
    </Center>
        
    )
}

export default NotePage;