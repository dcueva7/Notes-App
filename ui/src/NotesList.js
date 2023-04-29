import React from 'react'
import NoteItem from './NoteItem'
import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, IconButton } from '@chakra-ui/react'
import { Flex, Input } from '@chakra-ui/react'
import {  AddIcon } from '@chakra-ui/icons'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Button } from '@chakra-ui/react';

import ReactQuill from 'react-quill'

const AddNoteDialog = ({isOpen, onClose, onNoteAdded}) => {

  const [noteBody, setNoteBody ] = useState('')

  const handleSaveNote = () => {
    fetch(`/api/add/`, {
      method : 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body : JSON.stringify({'body': noteBody})
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        onNoteAdded(json)})

    setNoteBody('')
    onClose();
  }
  

  return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Note</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ReactQuill value={noteBody} onChange={content => setNoteBody(content)} />
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => {
                setNoteBody('');
                onClose()
              }}>Cancel</Button>
              <Button colorScheme="blue" onClick={handleSaveNote}>Submit</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
  )

}

const NotesList = () => {

  const [notes, setNotes] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false) 
  const [searchQuery, setSearchQuery] = useState('') 

  useEffect(() => {
    fetch('/api/notes/')
        .then(response => response.json())
        .then(json => setNotes(json))

  },[])

  const openDialog = () => setDialogOpen(true)

  const closeDialog = () => {
    setDialogOpen(false)
    
  }
  
  const handleNoteAdded = (newNote) => {
    setNotes([...notes, newNote])
  }

  return (
  <Flex h="100vh" align="center" justify="center" >
      <Card sx={{ width: '50%', textAlign: 'center' }} overflow={true}>
          <CardHeader>
            <IconButton icon={<AddIcon/>} position="absolute" right="13" onClick={openDialog}/>
            <Heading size='lg'>Note List</Heading>
          </CardHeader>

          <CardBody maxH="80vh" overflowY="auto">
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                padding={4}
                placeholder='Search notes here...'
              />
              <Stack divider={<StackDivider />} spacing='4'>
                {notes
                  .filter((note) => note.body.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((item) => {
                    return(
                      <NoteItem key={item.id} note={item} />
                    )

                  })
                }
              </Stack>
          </CardBody> 
      </Card>
      <AddNoteDialog isOpen={dialogOpen} onClose={closeDialog} onNoteAdded={handleNoteAdded} />

    </Flex>
  )
}

export default NotesList