import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FormComponent from './components/FormComponent';
import { createContext, useState } from 'react';
import SecondFormComponent from './components/SecondFormComponent';
export let Cardcontext = createContext()
export let Cardcontextsecond = createContext()
function App() {
  let [array, setarray] = useState(JSON.parse(localStorage.getItem("array")) || [])
  let [count, setcount] = useState(JSON.parse(localStorage.getItem("count")) || 0)
  let [obj, setobj] = useState({ title: '', subtitle: '', image: '', information: '', button: '' })
  let [editobj, seteditobj] = useState({})
  let [editid, seteditid] = useState(0)

  let [arraysecond, setarraysecond] = useState(JSON.parse(localStorage.getItem("arraysecond")) || [])
  let [countsecond, setcountsecond] = useState(JSON.parse(localStorage.getItem("countsecond")) || 0)
  let [objsecond, setobjsecond] = useState({ title: '', subtitle: '', image: '', information: '', button: '' })
  let [editobjsecond, seteditobjsecond] = useState({})
  let [editidsecond, seteditidsecond] = useState(0)

  // useEffect(() => {
  //   localStorage.setItem("array", JSON.stringify(array || []));
  //   localStorage.setItem("count", JSON.stringify(count || 0));
  // }, [array, count])


  // useEffect(() => {
  //   setarray(JSON.parse(localStorage.getItem("array")))
  //   setcount(JSON.parse(localStorage.getItem("count")))
  // }, [])
  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-6'>
            <Cardcontext.Provider value={{ array, count, obj, editobj, editid, setarray, setcount, setobj, seteditobj, seteditid }} >
              <FormComponent />
            </Cardcontext.Provider>
          </div>
          <div className='col-6'>
            <Cardcontextsecond.Provider value={{ arraysecond, countsecond, objsecond, editobjsecond, editidsecond, setarraysecond, setcountsecond, setobjsecond, seteditobjsecond, seteditidsecond }} >
              <SecondFormComponent />
            </Cardcontextsecond.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
