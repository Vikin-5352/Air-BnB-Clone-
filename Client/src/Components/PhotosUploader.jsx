
import axios from "axios";
import {useState} from 'react';



export default function PhotosUploader({addedphotos,onChange}){
  const [photolink, setPhotolink] = useState("");

  async function addPhotoByLink(e) {  
    e.preventDefault();
    console.log("photo link  " + photolink);
    console.log("inside if");
    const { data: fileName } = await axios.post("/upload_by_link", {
      link: photolink,
    });
    onChange((prevVal) => {
      return [...prevVal, fileName];
    });
    setPhotolink("");
    console.log("eol");
  }

  async function uploadFile(e) {
    console.log("object");
    const file = e.target.files[0];
    console.log(e.target.files);
    const photosStruc = new FormData();
    photosStruc.append("photos", file);
    console.log(photosStruc);
    const {data:fileName} = await axios.post("/upload",photosStruc, {
      headers: { "content-type": "multipart/form-data" },
    });
    onChange((prevVal) => {
      return [...prevVal, fileName];
    });
    console.log("eol");
  }

    return (
<>
<div className="flex gap-2">
              <input
                value={photolink}
                onChange={(e) => {
                  return setPhotolink(e.target.value);
                }}
                type="text"
                placeholder="add image using links...."
              />

              <button
                onClick={addPhotoByLink}
                className="bg-gray-300 rounded-2xl px-4"
              >
                Add&nbsp;photo
              </button>
            </div>
            {addedphotos.length > 0 &&
              addedphotos.map((link) => {
                return <div id={photolink}>{link}</div>;
              })}
            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <label className=" cursor-pointer gap-1 flex justify-center items-center border bg-transparent rounded-2xl p-4 text-gray-600">
                <input
                  type="file"
                  className="hidden"
                  onChange={uploadFile}
                ></input>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload
              </label>
            </div></>
    );
}