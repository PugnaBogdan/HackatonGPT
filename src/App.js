import logo from './logo.svg';
import p5 from "p5"
import React, { useEffect } from 'react';
import './App.css';


// const sketch = (p) => {
//   let fft;

//   p.setup = () => {
//     p.createCanvas(500, 500);
//     fft = new global.p5.('sine');
//   };

//   p.draw = () => {
//     p.background(0);
//     p.stroke(255);
//     p.noFill();

//     let wave = fft.waveform();

//     p.beginShape();
//     for (let i = 0; i < p.width; ++i) {
//       let index = p.floor(p.map(i, 0, p.width, 0, wave.length));

//       let x = i;
//       let y = wave[index] * 300 + p.height / 2;
//       p.vertex(x, y);
//     }
//     p.endShape();
//   };
// };

function App() {
  // useEffect(() => {
  //   new p5(sketch);
  // }, []);
  var html = document.querySelector('html');

// Add a class to the body element
html.classList.add('bg-gradient-to-tr');
html.classList.add('from-blue-400');
html.classList.add('to-red-400');



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
          
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue=""
          ></textarea>
        </div>
      </div>
      <div className="button-containert">
        <button
          type="submit"
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
