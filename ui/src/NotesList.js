import React from 'react'
import NoteItem from './NoteItem'
import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, Box, Heading, Stack, StackDivider, Text } from '@chakra-ui/react'

export const NotesList = () => {

  const [notes, setNotes] = useState([])  

  useEffect(() => {
    fetch('/api/notes/')
        .then(response => response.json())
        .then(json => setNotes(json))

  }, [notes])

  return (

    <Card>
        <CardHeader>
          <Heading size='md'>Note List</Heading>
        </CardHeader>

        <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              {notes.map((item, index) => {
                  return (
                    <Box>
                      <Text pt='2' fontSize='sm'><NoteItem key={index} note={item} /></Text>
                    </Box>
                  )
              })}
            </Stack>
         </CardBody>
        
    </Card>
  )
}

export default NotesList