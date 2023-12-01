import React, { useState } from 'react'
import noteContext from './noteContext'
const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  // Add a Note
  const getNote = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2NWZjNWMyMDQ1YWIyMDRhNjJhYzZjIn0sImlhdCI6MTcwMTE4MjYwOH0.l1I6dX2yTtrlVjrMu7fvC0XahmwnpfMBdJasSFqXPQ0"
      }
    });
    const json = await response.json();
    // console.log(json)
    setNotes(json)
  }


  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/addnotes`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2NWZjNWMyMDQ1YWIyMDRhNjJhYzZjIn0sImlhdCI6MTcwMTE4MjYwOH0.l1I6dX2yTtrlVjrMu7fvC0XahmwnpfMBdJasSFqXPQ0"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    // console.log(json)
    // const note = {
    //   "_id": "655db459186fb7d604a98bf7",
    //   "user": "655c557acf272537f72cc607",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2023-11-22T07:57:13.559Z",
    //   "__v": 0
    // }
    setNotes(notes.concat(json))
  }
  // Delete a Note
  const deleteNote = async (id) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2NWZjNWMyMDQ1YWIyMDRhNjJhYzZjIn0sImlhdCI6MTcwMTE4MjYwOH0.l1I6dX2yTtrlVjrMu7fvC0XahmwnpfMBdJasSFqXPQ0"
      }
    });
    // console.log("Deleting a note"+id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call

    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2NWZjNWMyMDQ1YWIyMDRhNjJhYzZjIn0sImlhdCI6MTcwMTE4MjYwOH0.l1I6dX2yTtrlVjrMu7fvC0XahmwnpfMBdJasSFqXPQ0"
      },
      body: JSON.stringify({title, description, tag})
    });
    let newNotes=JSON.parse(JSON.stringify(notes))
    // console.log(newNotes)
    // Edit Note 
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }
  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState
