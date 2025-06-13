// import React, { useEffect, useState } from 'react'
// import { useNavigate,useParams } from 'react-router-dom'
// import axios from 'axios'
// // import './nav.css'

// function EditNote() {
//   const {id} = useParams()

//   const [note, setNote] = useState({
//     title: " ",
//     content: " ",
//     date: " ",
//     id: " "

//   })

//   const history = useNavigate()

//   useEffect(() => {
//     const getNote = async () => {
//       const token = localStorage.getItem('tokenStore')
//       if (id) {
//         const res = await axios.get(`/api/notes/${id}`, {
//           headers: { Authorization: token }
//         })
//      setNote({
//       title: res.data.title,
//       content : res.data.content,
//       date: new Date(res.data.date).toLocaleDateString() ,
//       id:res.data._id
//      })
//       }
//     }

//     getNote()
//   },[id])

//   const onChaneInput = e => {
//     const { name, value } = e.target;
//     setNote({ ...note, [name]: value })
//   }

//   const editNote = async e => {
    
//     e.preventDefault()
//     try {
//       const token = localStorage.getItem('tokenStore')
//       if (token) {
//         const { title, content, date,id } = note;
//         const newNote = {
//           title, content, date
//         }

//         await axios.put(`/api/notes/${id}`, newNote, {
//           headers: { Authorization: token }
//         })

//         return history.push('/')
       

//       }

//     } catch (err) {
//       window.location.href = "/";
//     }
//   }



//   return (
//     <div className="create-note">
//       <h2>Edit note</h2>

//       <form onSubmit={editNote} autoComplete='off'>
//         <div className="row">
//           <label htmlFor="title">Title</label>
//           <input type="text" id='title' name="title"
//             value={note.title} required onChange={onChaneInput}
//           />
//         </div>

//         <div className="row">
//           <label htmlFor="content">Content</label>
//           <textarea cols="30" rows="10" type="textarea" id='content' name="content"
//             value={note.content} required
//             onChange={onChaneInput}
//           />
//         </div>

//         <label htmlFor="date">Date:{note.date}</label>
//         <div className="row">
//           <input type="date" id='date' name="date"
//          onChange={onChaneInput}
//           />
//         </div>

//         <button type='submit'>save</button>
//       </form>
//     </div>
//   )
// }

// export default EditNote


import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function EditNote() {
  const { id } = useParams()
  
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
    id: ""
  })
  
  const navigate = useNavigate()
  
  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem('tokenStore')
      if (id) {
        try {
          const res = await axios.get(`/api/notes/${id}`, {
            headers: { Authorization: token }
          })
          
          // Get today's date in YYYY-MM-DD format for the date input
          const today = new Date().toISOString().split('T')[0]
          
          setNote({
            title: res.data.title,
            content: res.data.content,
            date: today, // Set to today's date instead of original date
            id: res.data._id
          })
        } catch (err) {
          console.error('Error fetching note:', err)
          navigate('/')
        }
      }
    }
    
    getNote()
  }, [id, navigate])
  
  const onChangeInput = e => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value })
  }
  
  const editNote = async e => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('tokenStore')
      if (token) {
        const { title, content, date, id } = note;
        
        // Create the updated note object
        const updatedNote = {
          title,
          content,
          date: date || new Date().toISOString() // Use selected date or current date
        }
        
        await axios.put(`/api/notes/${id}`, updatedNote, {
          headers: { Authorization: token }
        })
        
        // Navigate back to home page
        navigate('/')
      }
    } catch (err) {
      console.error('Error updating note:', err)
      navigate('/')
    }
  }
  
  return (
    <div className="create-note">
      <h2>Edit note</h2>
      
      <form onSubmit={editNote} autoComplete='off'>
        <div className="row">
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            id='title' 
            name="title"
            value={note.title} 
            required 
            onChange={onChangeInput}
          />
        </div>
        
        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea 
            cols="30" 
            rows="10" 
            id='content' 
            name="content"
            value={note.content} 
            required
            onChange={onChangeInput}
          />
        </div>
        
        <div className="row">
          <label htmlFor="date">Date</label>
          <input 
            type="date" 
            id='date' 
            name="date"
            value={note.date}
            onChange={onChangeInput}
          />
        </div>
        
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default EditNote