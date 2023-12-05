import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import NotesStore from './store/notesStore'
import Tags from './components/Tags';
import Notes from './components/Notes';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { observer } from 'mobx-react-lite';
import { INotes } from './types/notes';

import './App.css';

const App = observer(() => {
  const [note, setNote] = useState('')
  const [activeTag, setActiveTag] = useState(JSON.parse(localStorage.getItem('actievTag') || '[]') || [])
  
  const addNote = () => {
    NotesStore.setNote(note)
    setNote('')
  }

  const checkTag = () => {
    NotesStore.setTag(note)
    setNote('')
  }

  const filterArr = () => {
    if (activeTag.length) {
      const newArr: INotes[] = []
      const checkDuplicate: string[] = []
      NotesStore.notesArr.map((note: INotes) => {
        const tag = note.note.split(' ')
        activeTag.map((item: string) => {
          if (!checkDuplicate.includes(note.note) && tag.includes(item)) {
            checkDuplicate.push(note.note)
            newArr.push(note)
          }
        })
      })
      return newArr
    } else {
      return NotesStore.notesArr.filter((item: INotes) => {
        return item.note.toLowerCase().includes(note.toLocaleLowerCase())
      })
    }
    
  }

  return (
    <div className="App">
      <h2>Введите или выберите вашу заметку</h2>
      <div className='containter'>
        <TextField
          className='textField'
          value={note} 
          onChange={(e) => {
            setActiveTag([])
            setNote(e.target.value)
          }}
        />
        {note && <HighlightOffIcon onClick={() => setNote('')} className='closeIcon'/>}
        <Button 
          sx={{marginTop: '20px', marginBottom: '20px'}} 
          onClick={() => {
            addNote()
            checkTag()
          }} 
          variant="contained"
        >
          Ok
        </Button>
      </div>
      
      <div className='tagContainet'>
        {NotesStore.tagArr && NotesStore.tagArr.map((item: any) => {
          return (
            <Tags 
              key={item.name} 
              item={item.name} 
              activeTag={activeTag} 
              setActiveTag={setActiveTag}
            />
          )
        })}
      </div>
      <div>
        {NotesStore.notesArr && (
          <ul className='listOfNotes'>
            {NotesStore.notesArr && filterArr().map((item: INotes) => (
                <Notes 
                  key={item.id}
                  item={item}
                />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
})

export default App;
