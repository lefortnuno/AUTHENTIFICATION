import axios from "../../api/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const URL = `/`;

export default function ModalAjout(props) {
  const [userInfo, setuserInfo] = useState({
    file:[],
    filepreview:null,
   });

   const handleInputChange = (event) => {
     setuserInfo({
       ...userInfo,
       file:event.target.files[0],
       filepreview:URL.createObjectURL(event.target.files[0]),
     });
 
   }
   const [isSucces, setSuccess] = useState(null);

   const submit = async () =>{
    const formdata = new FormData(); 
    formdata.append('avatar', userInfo.file);

    axios.post(URL, formdata,{   
            headers: { "Content-Type": "multipart/form-data" } 
    })
    .then(res => { // then print response status
      console.warn(res);
      if(res.data.success === 1){
        setSuccess("Image upload successfully");
      }

    })
  }

  return (
    <div className="container mr-60">
      <h3 className="text-white">React Image Upload And Preview Using Node Js - <span> codeat21.com </span> </h3>

      <div className="formdesign">
      {isSucces !== null ? <h4> {isSucces} </h4> :null }
        <div className="form-row">
          <label className="text-white">Select Image :</label>
          <input type="file" className="form-control" name="upload_file"  onChange={handleInputChange} />
        </div>

        <div className="form-row">
          <button type="submit" className="btn btn-dark" onClick={()=>submit()} > Save </button>
          
        </div>
      </div>
      
      {userInfo.filepreview !== null ? 
        <img className="previewimg"  src={userInfo.filepreview} alt="UploadImage" />
      : null}

    </div>
  );
}
