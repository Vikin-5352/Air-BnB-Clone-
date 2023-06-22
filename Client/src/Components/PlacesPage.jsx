import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Perks from "./Perks";
import PhotosUploader from "./PhotosUploader";
import axios from "axios";



export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extrainfo, setExtrainfo] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [maxguest, setMaxguest] = useState(1);
  const [addedphotos, setAddedphotos] = useState([]);
  const [redirect,setRedirect]=useState('');
 async function addNewPlace(e){
  console.log("addNewPlace")
  e.preventDefault;
  await axios.post('/places',{
    title,address, description,perks,extrainfo,checkin,checkout,maxguest,addedphotos
  })
  setRedirect('/account/places')
 }

 if(redirect){
  return <Navigate to={redirect}/>
 }

  return (
    <div>
      <div className="text-center">
        {action !== "new" && (
          <Link
            className="bg-primary text-white text-center px-6 py-2 rounded-full justify-center inline-flex gap-1"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add Places
          </Link>
        )}
      </div>
      {action == "new" && (
        <div>
          <form onSubmit={addNewPlace}>
            <h2 className="text-2xl mt-2">Title</h2>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Give a nice title to your property "
            />
            <h2 className="text-2xl mt-2">Address</h2>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Add your address"
            />
            <h2 className="text-2xl mt-2">Photos</h2>
            <PhotosUploader addedphotos={addedphotos} onChange={setAddedphotos}/>
            <div>
              <h2 className="text-2xl mt-2">Description</h2>
              <textarea
                className="max-h-22 "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name=""
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <h2 className="text-2xl mt-2">Perks</h2>
            <p className="text-gray-500 text-sm">
              select all the perks you have{" "}
            </p>
            <Perks selected={perks} onChange={setPerks} />
            <h2 className="text-2xl mt-2">Extra info</h2>
            <p className="text-gray-500 text-sm">house rules,etc,</p>
            <textarea
              value={extrainfo}
              onChange={(e) => setExtrainfo(e.target.value)}
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
            <h2 className="text-2xl mt-2">Checkin and check out time</h2>
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="mt-2">
                <h3 className="mt-2">Check in time</h3>
                <input
                  value={checkin}
                  onChange={(e) => setCheckin(e.target.value)}
                  type="text"
                  placeholder="14:00"
                />
              </div>
              <div className="mt-2">
                <h3 className="mt-2">Check out time</h3>
                <input
                  value={checkout}
                  onChange={(e) => setCheckout(e.target.value)}
                  type="text"
                  placeholder="12:00"
                />
              </div>
              <div className="mt-2">
                <h3 className="mt-2">Max-number of guest</h3>
                <input
                  value={maxguest}
                  onChange={(e) => setMaxguest(e.target.value)}
                  type="number"
                  placeholder="4"
                />
              </div>
            </div>
            <div>
              <button className="primary my-4">Submit</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
