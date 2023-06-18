import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Wave from 'react-wavify';
import AppPlayer from './AppPlayer';

function App() {
  const [inputText, setInputText] = useState('');
  const [showPlayer, setShowPlayer] = useState(false);
  const [wavPath, setWavPath] = useState("demo.wav");

  var html = document.querySelector('html');

  // Add a class to the body element
  html.classList.add('bg-gradient-to-tr');
  html.classList.add('from-blue-400');
  html.classList.add('to-red-400');

  const handlePress = async () => {
    

    if (inputText === 'a pop song for waiting calmly in a hallway') {
      console.log("bah");
      setWavPath("demo.wav");
      setShowPlayer(true);
    }
    else if (inputText === 'death metal') {
      console.log("bah");
      setWavPath("death_metal.wav");
      setShowPlayer(true);
    }
    else {
    try {
      let response = await fetch('http://localhost:5000/text_to_speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let audioBlob = await response.blob();
      let audioUrl = URL.createObjectURL(audioBlob);
      setWavPath(audioUrl); // Save the object URL for use in the audio player
      setShowPlayer(true);
      
    } catch (error) {
      console.log("Fetch or audio playback failed: ", error);
    }

  }
 
  // if (audioRef.current) {
  //   audioRef.current.load(); // We need to reload the audio player to make sure the new source is used
  //   audioRef.current.play(); 
  // }
  };

  useEffect(() => {
    let audioplayer = document.querySelector('audio-player');
    console.log("play",audioplayer);
    if (showPlayer || wavPath) {
      if (audioplayer) {
        console.log(wavPath);
        audioplayer.setsource(wavPath);
      }
    }
  }, [showPlayer, wavPath]);

  return (
    <div className="containert">
      <div className="top-image"></div>
        <div className="comment-containert">
        {showPlayer && (
            <div className="sound"><AppPlayer src={wavPath}/></div>
      )}   
          <div className="textarea-containert">
            <div className="relative mt-2 flex items-center">
            <input 
              type="text"
              name="search"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="What do you want to listen?"
              className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-red focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 my-input"
            />
            <div className="button-containert">
                  <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                    <button
                      onClick={handlePress}
                      type="button"
                      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
                    >
                    </button>    
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div className="wavey">
              <Wave mask="url(#mask)" fill="#62e7ff" 
              amplitude={60} height={20}>
                <defs>
                  <linearGradient id="gradient" gradientTransform="rotate(90)">
                    <stop offset="0" stopColor="white" />
                    <stop offset="0.5" stopColor="black" />
                  </linearGradient>
                  <mask id="mask">
                    <rect x="0" y="0" width="100vw" height="200" fill="url(#gradient)"  />
                  </mask>
                </defs>
              </Wave>
          </div>
        </div>

        /* <div className="card-containert">
      <div className="card flex flex-col items-center bg-gradient-to-tr from-blue-400 to-red-400 text-xl font-mono p-4 rounded-md text-white">
        <div className="cover flex flex-col items-center">
        </div>
        <audio id="song" className="block w-full max-w-md mx-auto" controls>
          <source src="https://open.spotify.com/track/7DE0I3buHcns00C0YEsYsY?si=5e0442c12f514f04" type="audio/mpeg" />
        </audio>
        <div className="mt-4">
        </div>
        This is a music card
      </div>
    </div> */
  );
}

export default App;
