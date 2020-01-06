import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => { //received as a param/prop from App file
  
  return(
    <div>
      <p className='f3'>
        {'Detecting faces - magically!'}
      </p>
      <div className='center'>
        <div className='form center pa2 br2 shadow-5'>
          <input className='f6 pa2 w-70 center' type='text' onChange={onInputChange}/>
          <button 
            className='w-30 grow f6 link ph3 pv2 dib btn btn-info'
            onClick={onButtonSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm