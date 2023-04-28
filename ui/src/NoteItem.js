import React from 'react'
import { Link } from 'react-router-dom'
import { Center, Text, Container, Card, Box } from '@chakra-ui/react'



export const NoteItem = ( {note} ) => {
  return (

    <Center p='6' color='white' axis='both'>

      <Link to={`/note/${note.id}`}>
        <Card sx={{ width: '100%', textAlign: 'center' }}>
          <Container>
            <Box padding='4'>
              <Text color={'black'}>{note.body}</Text>
            </Box>
          </Container>
        </Card>
      </Link>
    </Center>
  )
}

export default NoteItem;
