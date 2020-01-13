import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm = ({onInputChange, onButtonSubmit, loading}) => { //received as a param/prop from App file
  const onEnterKeyPress = (target) => {
    if (target.charCode === 13) {
      onButtonSubmit();
    }
  }
  return(
    <div>
      <p className='f3'>
        {'Detecting faces - magically!'}
      </p>
      <div className='center'>
        <div className='form center pa2 br2 shadow-5'>
          <input id="validationDefault01" 
          placeholder='Image URL here...' 
          className='f6 pa2 w-70 center' 
          type='text' 
          onKeyPress={onEnterKeyPress} 
          onChange={onInputChange} required/>
          <button 
            type='submit'
            className='w-30 grow f5 link dib btn btn-info scanImgBtn'
            onClick={onButtonSubmit}
          >Detect</button>
        </div>
      </div>
      <div className='center loading'>{loading && <span className='mb-2 error'>{'Loading...'}</span>}</div>
      
    </div>
  )
}

export default ImageLinkForm