import React from 'react'
import NoteItem from './NoteItem'
import { useState, useEffect } from 'react'

export const NotesList = () => {

  const [notes, setNotes] = useState([])  

  useEffect(() => {
    fetch('/api/notes/')
        .then(response => response.json())
        .then(json => setNotes(json))

  }, [notes])

  return (
    <div>
        <div className='notes-list'>
            {notes.map((item, index) => {
                return (
                    <NoteItem key={index} note={item} />
                )
            })}
        </div>
    </div>
  )
}

export default NotesList