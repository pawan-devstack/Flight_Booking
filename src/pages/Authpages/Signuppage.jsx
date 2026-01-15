import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Signuppage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const videoPath = "/bgvideo.mp4";

  const [formdata, setFormdata] = useState({
    name: "",
    lastname: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordChecks, setPasswordChecks] = useState({
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecial: false,
    minLength: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, seterror] = useState({});

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });

    if (error[name]) {
      const newError = { ...error };
      delete newError[name];
      seterror(newError);
    }

    if (name === "password") {
      setPasswordChecks({
        hasUpper: /[A-Z]/.test(value),
        hasLower: /[a-z]/.test(value),
        hasNumber: /[0-9]/.test(value),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        minLength: value.length >= 8,
      });
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    // ✅ validations
    if (formdata.password !== formdata.confirmPassword) {
      seterror({ confirmPassword: "Passwords do not match" });
      return;
    }

    const isStrong =
      passwordChecks.hasUpper &&
      passwordChecks.hasLower &&
      passwordChecks.hasNumber &&
      passwordChecks.hasSpecial &&
      passwordChecks.minLength;

    if (!isStrong) {
      seterror({
        password:
          "Password must include Uppercase, Lowercase, Number, Special char & min 8 characters",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      await signup({
        name: `${formdata.name} ${formdata.lastname}`,
        email: formdata.email,
        password: formdata.password,
      });

      alert("✅ Signup successful");
      navigate("/login");
    } catch (err) {
      seterror({ email: err.message });
    } finally {
      setIsSubmitting(false);
    }
  }
  const handleLogin = () => {
    navigate('/')
  }

  return (
    <>
      <div className='min-h-screen bg-linear-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center p-8'>
        <video src={videoPath} type='video/mp4' autoPlay
          loop
          muted
          playsInline
          className="fixed"></video>
        <h1 className='text-4xl md:text-5xl font-bold text-black mb-8 text-center drop-shadow-lg uppercase tracking-wide'>
          Sign Up
        </h1>

        <form onSubmit={handlesubmit} className='w-full max-w-lg space-y-4'>
          {/* First Name */}
          <div>
            <input
              type="text"
              name="name"
              value={formdata.name}
              onChange={handlechange}
              placeholder='First name'
              className={`w-full p-3 rounded-lg border-2 focus:outline-none transition-all duration-300 transform focus:scale-105 placeholder-black bg-white/10 backdrop-blur-sm ${error.name ? 'border-red-400' : 'border-white'
                }`}
            />
            {error.name && <p className='text-red-300 text-sm mt-1 ml-2'>{error.name}</p>}
          </div>

          {/* Last Name */}
          <div>
            <input
              type="text"
              name="lastname"
              value={formdata.lastname}
              onChange={handlechange}
              placeholder='Last name'
              className={`w-full p-3 rounded-lg border-2 focus:outline-none transition-all duration-300 transform focus:scale-105 placeholder-black bg-white/10 backdrop-blur-sm ${error.lastname ? 'border-red-400' : 'border-white'
                }`}
            />
            {error.lastname && <p className='text-red-300 text-sm mt-1 ml-2'>{error.lastname}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              value={formdata.email}
              onChange={handlechange}
              placeholder='Email'
              className={`w-full p-3 rounded-lg border-2 focus:outline-none transition-all duration-300 transform focus:scale-105 placeholder-black bg-white/10 backdrop-blur-sm ${error.email ? 'border-red-400' : 'border-white'
                }`}
            />
            {error.email && <p className='text-red-300 text-sm mt-1 ml-2'>{error.email}</p>}
          </div>

          {/* Gender */}
          <div>
            <select
              name="gender"
              value={formdata.gender}
              onChange={handlechange}
              className={`w-full p-3 rounded-lg border-2 focus:outline-none transition-all duration-300 transform focus:scale-105 bg-white/10 backdrop-blur-sm text-black ${error.gender ? 'border-red-400' : 'border-white'
                }`}
            >
              <option value="" disabled className='text-black'>Select Gender</option>
              <option value="male" className='text-black'>Male</option>
              <option value="female" className='text-black'>Female</option>
              <option value="other" className='text-black'>Other</option>
            </select>
            {error.gender && <p className='text-red-300 text-sm mt-1 ml-2'>{error.gender}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              value={formdata.password}
              onChange={handlechange}
              placeholder='Password (min 8 chars)'
              className={`w-full p-3 rounded-lg border-2 focus:outline-none transition-all duration-300 transform focus:scale-105 placeholder-black bg-white/10 backdrop-blur-sm ${error.password ? 'border-red-400' : 'border-white'
                }`}
            />
            {error.password && <p className="bg-red-500/20 border-2 border-red-400 text-black mt-3 p-4 rounded-xl backdrop-blur-sm text-sm leading-relaxed">{error.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              value={formdata.confirmPassword}
              onChange={handlechange}
              placeholder="Confirm Password"
              className={`w-full p-3 rounded-lg border-2 focus:outline-none transition-all duration-300 transform focus:scale-105 placeholder-black bg-white/10 backdrop-blur-sm ${error.confirmPassword ? 'border-red-400' : 'border-white'
                }`}
            />
            {error.confirmPassword && <p className='bg-red-500/20 border-2 border-red-400 text-black mt-3 p-4 rounded-xl backdrop-blur-sm text-sm leading-relaxed'>{error.confirmPassword}</p>}
          </div>

          {/* Buttons */}
          <div className='relative flex flex-col sm:flex-row gap-4 pt-6'>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`relative flex-1 py-4 px-8 rounded-xl font-bold text-xl shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${isSubmitting
                ? 'bg-gray-500 border-gray-400 cursor-not-allowed'
                : 'bg-white text-purple-600 hover:bg-purple-100 border-4 border-white shadow-xl'
                }`}
            >
              {isSubmitting ? 'Signing Up...' : 'Signup'}
            </button>

            <button
              type="button"
              onClick={handleLogin}
              disabled={isSubmitting}
              className="relative flex-1 py-4 px-8 rounded-xl font-bold text-xl bg-transparent border-2 border-white text-black hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-1 shadow-xl"
            >
              Go To Dashboard
            </button>
          </div>
          <p className="relative text-black text-center text-lg">
            already have account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="relative font-bold transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </>
  )
}

export default Signuppage
