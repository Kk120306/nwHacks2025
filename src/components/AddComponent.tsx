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
        <div>Name</div>
        <input className='AddComponent_Name' placeholder='Very cool cache' />
        <div>I am dropping an item</div> 
        <input type='checkbox' 
               className='AddComponent_ItemYesNo' 
               checked={droppingItem} 
               onChange={() => setDroppingItem(!droppingItem)} />
        {droppingItem ? <div> Hint <input className='AddComponent_Hint' /> </div> : ""}
        <div>I am leaving a voice note</div> 
        <input type='checkbox' 
               className='AddComponent_ItemYesNo' 
               checked={leavingNote} 
               onChange={() => setLeavingNote(!leavingNote)} />
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
        Add a photo?
        <input type='checkbox' 
               className='AddComponent_ItemYesNo' 
               checked={addingPhoto} 
               onChange={() => setAddingPhoto(!addingPhoto)} />
        {addingPhoto ? <Camera onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }/> : ""}
        <button className='AddComponent_SubmitButton'>Add cache!</button>
        <BottomNav />
    </div>
  )
}

export default AddComponent