import React, { useState } from 'react'
import "./styles/AddComponent.css"
import BottomNav from './BottomNav';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

let userPos = new Object()

navigator.geolocation.getCurrentPosition((position) => {
  userPos["lat"] = position.coords.latitude
  userPos["lng"] = position.coords.longitude
});

userPos = {lat: 49.2625931, lng: -123.2448568}

function AddComponent() {
  const [droppingItem, setDroppingItem] = useState(false)
  const [leavingNote, setLeavingNote] = useState(false)
  const [addingPhoto, setAddingPhoto] = useState(false)

  const recorderControls = useAudioRecorder(
      {
      noiseSuppression: true,
      echoCancellation: true,
      },
      (err) => console.table(err) // onNotAllowedOrFound
  );
  const addAudioElement = (blob) => {
      const url = URL.createObjectURL(blob);
      const audio = document.createElement('audio');
      audio.src = url;
      audio.controls = true;
      document.body.appendChild(audio);
  };

  function handleTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  return (
    <div className='AddComponent'>
      <div className='AddComponent_FormWrapper'>
        <div>Name</div>
        <input className='AddComponent_Name' placeholder='Very cool cache' />
        <div>Hint</div>
        <input className='AddComponent_Hint' placeholder='Under the rocks' />
        {droppingItem ? <div> <div> Hint </div>  </div> : ""}
          <div onClick={() => setLeavingNote(!leavingNote)} className='AddComponent_VoiceMemo'> Record a voice memo </div>
        {leavingNote ? 
        <div>
             <AudioRecorder
                onRecordingComplete={(blob) => addAudioElement(blob)}
                recorderControls={recorderControls}
                // downloadOnSavePress={true}
                // downloadFileExtension="mp3"
                showVisualizer={true}
            />
            <br />
            <button onClick={recorderControls.stopRecording}>Stop recording</button>
            <br />
        </div> : ""}
        <div onClick={() => setAddingPhoto(!addingPhoto)} className='AddComponent_Picture'>Add a picture</div>
        {addingPhoto ? 
        <Camera 
          idealFacingMode = "environment"
          onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }/> : ""}
      </div>
        <button className='AddComponent_SubmitButton'>Add cache</button>
        <BottomNav />
    </div>
  )
}

export default AddComponent