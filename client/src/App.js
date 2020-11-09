import React from 'react'
import LeadState from './context/lead/LeadState'
import "./App.css";
import LexisUpload from './components/LexisUpload';





const App = () => {
  return (
    <LeadState>
      <div>
        <LexisUpload/>
      </div>
    </LeadState>
  )
}

export default App



