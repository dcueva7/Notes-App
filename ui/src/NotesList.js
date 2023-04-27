import React from 'react'
import NoteItem from './NoteItem'
import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, IconButton } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import {  AddIcon } from '@chakra-ui/icons'

export const NotesList = () => {

  const [notes, setNotes] = useState([])  

  useEffect(() => {
    fetch('/api/notes/')
        .then(response => response.json())
        .then(json => setNotes(json))

  }, [notes])

  return (
  <Center p='6' color='white' axis='both'>
      <Card>
          <CardHeader>
            <IconButton icon={<AddIcon/>} position="absolute" right="13" onClick={handleClick}/>
            <Heading size='lg'>Note List</Heading>
          </CardHeader>

          <CardBody>
              <Stack divider={<StackDivider />} spacing='4'>
                {notes.map((item) => {
                  return(
                    <NoteItem key={item.id} note={item} />
                  )
                })}
              </Stack>
          </CardBody> 
      </Card>
    </Center>
  )
}

export default NotesList