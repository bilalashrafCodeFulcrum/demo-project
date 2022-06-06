import  React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import moment from 'moment'

const allNotes = [
  {
    text: 'Note one',
    created: new Date()
  },
  {
    text: 'Note two',
    created: new Date()
  },
  {
    text: 'Note three',
    created: new Date()
  },
  {
    text: 'Note four',
    created: new Date()
  },
]

export default function SingelPatientDialog({open, handleClose, patientId}) {

const [note, setNote] = useState('')
//console.log({open, handleClose, patientId})
console.log({note})

  const {data: singlePatient, isLoading} = useQuery('get/single-patient', ()=> axios({
      url: '/api/kdfjd',
      method: 'GET'
    })
  )

  const {mutate: postNote, isLoading: loading} = useMutation(()=> axios({
    url: '/api/djfljd',
    method: 'post'
  }))


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='sm'
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        Patient Detail
        </DialogTitle>
        <DialogContent>
        <div className='w-full flex items-center space-x-4 my-4 px-4 border-b border-gray-200 pb-6'>
              <Avatar style={{width: '70px', height: '70px'}}> B </Avatar>
              <div className='flex flex-col space-y-1'>
                  <h3> Bilal Ashraf </h3>
                  <p className='text-xs text-gray-500'>Phone: +92343444454 </p>
                  <p className='text-xs text-gray-500'> Gender: Male </p>
                  <p className='text-xs text-gray-500'> Disabled: No </p>
              </div>

          </div>

          <div className=''>
              <h2 className='pb-2 border-b border-gray-200'>Notes</h2>
              <input className='h-8 w-full border border-gray-300 mt-2 pl-2' value={note} onChange={(e)=> setNote(e.target.value)} />
          </div>

          <div className='notes-list'>
            {allNotes.map(note => <div className='flex flex-col space-y-1'>
              <span className='text-sm'> {note.text} </span>
              <p className='text-xs text-gray-400'> {moment(note.created).format('DD-MM-YYYY')} </p>
            </div>)}
          </div>
          
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
