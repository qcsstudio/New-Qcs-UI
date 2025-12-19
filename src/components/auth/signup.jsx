'use client';
import Image from "next/image";
import { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 🔴 Password match validation
    if (form.password !== form.confirm) {
      setError("Password and Confirm Password do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://13.127.109.214:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      alert("Signup Successful 🎉");

      // optional: form reset
      setForm({
        name: "",
        email: "",
        password: "",
        confirm: "",
        agree: false,
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container min-vh-100 p-0">

      <h1 className="brand-title text-center my-5">Signup</h1>

      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="form-box">

          <h2 className="heading-small">Hey,</h2>
          <h1 className="heading-large">Let's Get Started!</h1>
          <p className="text-muted mb-4">We're excited to have you join us!</p>

          {error && <p className="text-danger small">{error}</p>}

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label small">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={form.name}
                onChange={onChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label small">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={onChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label small">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={form.password}
                onChange={onChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label small">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirm"
                value={form.confirm}
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label small">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirm"
                value={form.confirm}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="agree"
                name="agree"
                checked={form.agree}
                onChange={onChange}
                required
              />
              <label htmlFor="agree" className="form-check-label small">
                By signing up, you agree to QCS’s Terms & Privacy Policy
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-signup w-100 mb-3"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

            <div className="or-divider mb-3">
              <span>OR</span>
            </div>

            <button type="button" className="btn btn-google w-100">
              <Image
                src="/assets/img/Images/Google-signup.png"
                alt="google-logo"
                width={34}
                height={34}
              />
              <span>Login with Google</span>
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
