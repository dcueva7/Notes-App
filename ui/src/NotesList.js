import React from 'react'
import NoteItem from './NoteItem'
import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, IconButton } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import {  AddIcon } from '@chakra-ui/icons'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Button } from '@chakra-ui/react';


const AddNoteDialog = ({isOpen, onClose}) => {

  const [noteBody, setNoteBody ] = useState('')

  const handleNoteBodyChange = e => { setNoteBody(e.target.value) }

  const handleSaveNote = () => {
    fetch(`/api/add/`, {
      method : 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body : JSON.stringify({'body': noteBody})
    })
      .then(response => response.json())
      .then(json => console.log(json))

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
              <textarea name='noteBody' value={noteBody} onChange={handleNoteBodyChange} />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Cancel</Button>
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

  useEffect(() => {
    fetch('/api/notes/')
        .then(response => response.json())
        .then(json => setNotes(json))

  },[])

  const openDialog = () => setDialogOpen(true)
  const closeDialog = () => setDialogOpen(false)


  return (
  <Flex h="100vh" align="center" justify="center">
      <Card sx={{ width: '50%', textAlign: 'center' }}>
          <CardHeader>
            <IconButton icon={<AddIcon/>} position="absolute" right="13" onClick={openDialog}/>
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
      <AddNoteDialog isOpen={dialogOpen} onClose={closeDialog} />

    </Flex>
  )
}

export default NotesList