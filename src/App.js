import './App.css';
import {TextField} from '@mui/material'

function App() {
  return (
    <div className="">
      <h1 className='text-center mt-10 text-green-400'> this is demo project </h1>
      <TextField
      name='field'
      label='First Name'
      fullWidth
      />
    </div>
  );
}

export default App;
