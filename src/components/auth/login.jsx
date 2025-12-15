'use client';
import Image from "next/image";
import React, { useState } from "react";
// import "./signup.css";

export default function Login() {
  const [form, setForm] = useState({
   
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    alert("Signup submitted (demo)\n" + JSON.stringify(form, null, 2));
  };

  return (
    <div className="signup-container  min-vh-100 p-0">
 
<h1 className="brand-title text-center my-5">Login</h1>
      <div className="flex-grow-1 d-flex justify-content-center align-items-center ">
        
        <div className="form-box">

          <h2 className="heading-small">Hey,</h2>
          <h1 className="heading-large">Welcome Back !</h1>
          <p className="text-muted mb-4">We are very happy to see you back!</p>

          <form onSubmit={onSubmit}>
           

            <div className="mb-3">
              <label className="form-label small">Email</label>
              <input type="email" className="form-control" name="email" value={form.email} onChange={onChange} placeholder="example@gmail.com" required/>
            </div>

            <div className="mb-3">
              <label className="form-label small">Password</label>
              <input type="password" className="form-control" name="password" value={form.password} onChange={onChange} placeholder="••••••••" required/>
            </div>

            

            <button type="submit" className="btn btn-signup w-100 mb-3">Login</button>

            <div className="or-divider mb-3">
              <span>OR</span>
            </div>

            <button type="button" className="btn btn-google w-100">
              <Image src="/assets/img/Images/Google.png" alt="google-logo" width={34} height={34}  /><span>Login with Google</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
