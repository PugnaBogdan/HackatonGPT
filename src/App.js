import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');

  var html = document.querySelector('html');

  // Add a class to the body element
  html.classList.add('bg-gradient-to-tr');
  html.classList.add('from-blue-400');
  html.classList.add('to-red-400');

  const handlePress = async () => {
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
      let audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.log("Fetch or audio playback failed: ", error);
    }
  };

  return (
    <div className="containert">
      <div className="comment-containert">
        <div className="textarea-containert">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Add your comment
          </label>
          <div className="mt-2">
            <textarea
              rows="4"
              name="comment"
              id="comment"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>
        <div className="button-containert">
          <button
            onClick={handlePress}
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </div>

    {/* <div className="card-containert">
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
    </div> */}
    </div>
  );
}

export default App;
