import React from 'react'
import { Link } from 'react-router-dom'

export const NoteItem = ( {note} ) => {
  return (
    <Link to={`/note/${note.id}`}>
      {note.body}
    </Link>
  )
}

export default NoteItem
