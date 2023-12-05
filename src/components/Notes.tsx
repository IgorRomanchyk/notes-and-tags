import { useState } from 'react';
import { TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NotesStore from '../store/notesStore';
import { INotes } from '../types/notes';
import { observer } from 'mobx-react-lite';

import './notes.css';

interface IProps {
  item: INotes
}

const Notes = observer(({item}: IProps) => {

  const [showIcon, setShowIcon] = useState(true)
  const [value, setValue] = useState(item.note)
  return (
    <div className='noteContainer'>
      {showIcon ? (
        <>
          <li className='note'>{item.note}</li>
          <div style={{display: 'flex'}}>
            <EditIcon style={{marginLeft: '30px'}} className='icon' onClick={() => setShowIcon(!showIcon)}/>
            <DeleteIcon className='icon' onClick={() => NotesStore.deleteNote(item.id, item.note)}/>
          </div>
        </>
      ) : (
        <>
          <TextField 
            id="standard-basic" 
            value={value} 
            multiline
            variant="standard" 
            onChange={(e) => setValue(e.target.value)}
            className='inputNote'
            style={{padding: '0', marginLeft: '5px'}}
          />
          <CheckCircleIcon className='icon ok' onClick={() => {
              setShowIcon(!showIcon)
              NotesStore.editNote(item.id, value)
            }}
          />
        </>
      )}
    </div>
  );
})

export default Notes;
