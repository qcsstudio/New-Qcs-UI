'use client';
import Image from "next/image";
import React, { useState } from "react";
// import "./signup.css";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
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
      {/* <div className="left-panel p-4 border">
        <h1 className="brand-title text-center">Signup</h1>
      </div> */}
<h1 className="brand-title text-center my-5">Signup</h1>
      <div className="flex-grow-1 d-flex justify-content-center align-items-center ">
        
        <div className="form-box">

          <h2 className="heading-small">Hey,</h2>
          <h1 className="heading-large">Let's Get Started!</h1>
          <p className="text-muted mb-4">We're excited to have you join us!</p>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label small">Name</label>
              <input type="text" className="form-control" name="name" value={form.name} onChange={onChange} placeholder="example@gmail.com" required/>
            </div>

            <div className="mb-3">
              <label className="form-label small">Email</label>
              <input type="email" className="form-control" name="email" value={form.email} onChange={onChange} placeholder="example@gmail.com" required/>
            </div>

            <div className="mb-3">
              <label className="form-label small">Password</label>
              <input type="password" className="form-control" name="password" value={form.password} onChange={onChange} placeholder="••••••••" required/>
            </div>

            <div className="mb-3">
              <label className="form-label small">Confirm Password</label>
              <input type="password" className="form-control" name="confirm" value={form.confirm} onChange={onChange} placeholder="••••••••" />
            </div>

            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="agree" name="agree" checked={form.agree} onChange={onChange} required/>
              <label htmlFor="agree" className="form-check-label small">
                By signing up, you are creating a QCS account, and you agree to QCS’s <a href="#" className="text-primary">Term of Use</a> and <a href="#" className="text-primary">Privacy Policy</a>.
              </label>
            </div>

            <button type="submit" className="btn btn-signup w-100 mb-3">Sign Up</button>

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
