import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => { //received as a param/prop from App file

  function showFaces() {
    return (
      box.length > 0 ? box.map((value, index) => {
        return   <div key={index} className='bounding-box' style={{top: value.topRow, right: value.rightCol, bottom: value.bottomRow, left: value.leftCol}}></div>
      }) : null
    )
  }

  return(
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputImage' alt='' src={imageUrl} width='500px' height='auto' />
        <div id='imgScan'>
          { showFaces() }
        </div>
      </div>
    </div>
  )
}

export default FaceRecognition