import React,{useRef, useState} from 'react'
import axios from 'axios';


import { Formik, Form, Field } from "formik";
function Home() {
  const fileref = useRef(null)
  const [filevalue, setfilevalue] = useState(null);
  const [filename, setfilename] = useState('');
  const fileHandeler = (e) => {
    setfilevalue(e.target.files[0])
    setfilename(e.target.files[0].name)
    let size = e.target.files[0].size
    console.log("The size of the file is ",size)
  }
    const initialValues = {
      text: "",
      pic:null
        
  };
  const UploadImageHandeler = () => {
    fileref.current.click()
  }
    // const fileref = useRef(null)
    const [image, setimage] = useState('');
  const onSubmit = (data) => {
 
    // e.preventDefault();
    // now we have to read the blob in text
    const reader = new FileReader();
    reader.readAsDataURL(filevalue)
    reader.onload =async () => {
      console.log(reader.result)
      data.pic = reader.result;
      // var picbinarydata = []
      // picbinarydata.push(reader.result)
      // const picurl = URL.createObjectURL(new Blob(picbinarydata, { type: "image/png" }))
      // data.pic = picurl;
        // ============>>>>>>>> It is very important to provide responseType so that we can convert the file to original form===================//
        axios.post("http://localhost:3001/", data, { responseType:'blob'}).then((res) => {
          var binaryData = [];
          binaryData.push(res.data);
         const url= URL.createObjectURL(new Blob(binaryData, {type: "image/png"}))
            // const url = URL.createObjectURL(res.data);
            console.log("This is url ", url)
            // console.log("This is response ",res.data)
            setimage(url)
          }).catch(err => {
            console.log(err)
          })
        
    }
    console.log(data)
    
    
    
    
      
  };
  // const onSubmitHandeler = (e) => {
  //   e.preventDefault();
  // }
  return (
      <div className='w-[90%] sm:w-1/3 flex flex-col justify-center mx-auto my-24 space-y-4'>
          <Formik initialValues={initialValues} onSubmit={onSubmit}  >
        <Form className='space-y-4'>
              
                
                <Field type="text" id="inputCreatePost" className="focus:outline-none focus:ring-offset-0 text-white placeholder-gray-200 text-sm rounded-lg  block w-full p-2.5 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700" placeholder="Enter Your Name" name="text"/>
               
                               
                <input hidden type="file" id="" className=" focus:outline-none focus:ring-offset-0 text-white placeholder-gray-200 text-sm rounded-lg  w-full p-2.5 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 " placeholder="" name='pic' ref={fileref}    onChange={fileHandeler} />
               
                               
                <button
                    className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-lg text-white  font-bold uppercase text-sm px-6 py-2  shadow hover:shadow-lg  hover:shadow-black outline-none mr-1 mb-1 ease-linear transition-all duration-150 focus:ring-2 focus:shadow-md focus:shadow-gray-600 focus:ring-purple-600"
                    type="submit" onClick={UploadImageHandeler}
                  >
                   Upload Image
                  </button>      
                  <button
                    className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-lg text-white active:bg-gradient-to-r-from-indigo-200-via-purple-200-to-pink-200  font-bold uppercase text-sm px-6 py-2  shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:shadow-black focus:ring-2 focus:ring-purple-600 focus:shadow-md focus:shadow-gray-600"
                    type="submit" 
                  >
                    Save Changes
          </button>
         {filename && <p className='text-sm -mt-10 font-bold'>Selected File :<span className='text-green-600'> {filename }</span> </p>}
          </Form>
          </Formik>
          

          <div>This is the response
{/* <<<<<<< HEAD */}
          
        {/* <img src={image}></img> */}
{/* ======= */}
        <img src={image} className="my-2 shadow-lg shadow-gray-500"></img>
{/* >>>>>>> netlify */}
        <a href={image} download className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-lg text-white active:bg-gradient-to-r-from-indigo-200-via-purple-200-to-pink-200  font-bold uppercase text-sm px-6 py-2  shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:shadow-black focus:ring-2 focus:ring-purple-600 focus:shadow-md focus:shadow-gray-600">download</a>
          </div>
    </div>
  )
}

export default Home