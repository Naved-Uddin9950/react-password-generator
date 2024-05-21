import { useState, useCallback, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let [length, setLength] = useState(8);
  let [numberAllowed, setNumberAllowed] = useState(false);
  let [charAllowed, setCharAllowed] = useState(false);
  let [password, setPassword] = useState('');

  let passGen = useCallback(() => {
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let pass = '';

    if(numberAllowed) str += '1234567890';
    if(charAllowed) str += '~`!@#$%^&*()_+=-[]{}<>?';

    for(let i=0; i<length; i++) {
      let rand = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(rand);
    }

    setPassword(pass);
    
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => passGen, [length, numberAllowed, charAllowed, setPassword, passGen]);

  let passRef = useRef(null);

  let copyToClipboard = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full h-screen flex flex-row justify-center bg-slate-900">
        <div className="my-20 bg-white w-fit h-fit px-3 py-1 border rounded-lg">
          <input type="text" value={password} placeholder='Password' className="border border-slate-400 py-1 px-2" readOnly ref={passRef} />
          <button type="button" className="border rounded-lg bg-blue-600 py-1 px-2 mx-2 border-black hover:bg-blue-700 active:bg-blue-800 focus:outline-none" onClick={copyToClipboard}>Copy</button>

          <div className="flex flex-col flex-wrap gap-1">
            <div className="flex flex-row items-center">
              <label htmlFor="rangeField">Length ({length}) : </label>
              <input type="range" min="6" max="24" value={length} id="rangeField" onChange={(e) => setLength(e.target.value)} />
            </div>

            <div>
              <label htmlFor="isNumberAllowed">Allow Numbers : </label>
              <input type="checkbox" id="isNumberAllowed" onChange={() => setNumberAllowed((prev) => !prev)} />
            </div>

            <div>
              <label htmlFor="isCharAllowed">Allow Character : </label>
              <input type="checkbox" id="isCharAllowed" onChange={() => setCharAllowed((prev) => !prev)} />
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
