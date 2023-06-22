import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';


export default function RegisterPage() {

  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  async function registerUser(e){
    e.preventDefault();
    try{
    console.log("hii")
    var test=axios.get('/test');
    await axios.post('/register',{name,email,password});
    alert("The user is sucessfully registered");
    }
    catch(e){
      alert("Registration failed");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-6">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input type="text" placeholder="username" value={name} onChange={e=>setName(e.target.value)} />
          <input type="email" placeholder="yourmail@email.com" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="primary">Register</button>
          <div className="text-gray-500">
            Already have an account?{" "}
            <Link to={"/Login"} className="underline text-black">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
