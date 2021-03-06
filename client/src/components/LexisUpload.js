import React,{useState, useContext} from 'react'
import LeadContext from "../context/lead/leadContext"
const LexisUpload = () => {
    
  
  const leadContext = useContext(LeadContext)

  const {uploadFiles,sendTodays} = leadContext
  const [files, setFiles] = useState([]);

function readmultifiles (e) {
  const files = e.target.files;
  Object.keys(files).forEach(i => {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = (e) => {
       uploadFiles(reader.result)
    }
    reader.readAsBinaryString(file);
  })
};

  

  const onClick = e =>{
    uploadFiles(files)
  }
    
    return (
        <div>
            <input type='file' onChange={readmultifiles} style={{ width: "200px" }} multiple/>
            <button onClick={onClick}>Load Leads</button>

            <button onClick={()=>sendTodays()}>Send Todays Scrapes</button>
        </div>
    )
}

export default LexisUpload
