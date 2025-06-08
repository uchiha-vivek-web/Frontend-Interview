
import Main from "./projects/project1/main"

 

function App() {


  return (
    <>
      {/* <Routes>
        <Route path="/" element={<Navigate to="/form" />} />
        <Route path="/form" element={<Form />} />
        <Route path="/display" element={<Display />} />
        <Route path='/counter' element={<WordLimitInput/>}/>
      </Routes> */}
      <div>
         {/* <Webrtc/> */}
         {/* <VideoRecorder/> */}
         <Main/>
      </div>
    </>
  )
}

export default App
