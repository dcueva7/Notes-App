import React from 'react'

export const NoteItem = ( {note} ) => {
  return (
    <h3>{note.body}</h3>
  )
}

export default NoteItem
