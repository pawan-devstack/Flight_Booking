import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Loginpage = () => {
  const navigate = useNavigate()
  const videoPath ='/bgvideo.mp4'

  const [formdata, setFormdata] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, seterror] = useState('')

  const handlechange = (e) => {
    const { name, value } = e.target
    setFormdata({ ...formdata, [name]: value })

    if (error) seterror('')
  }

  const handlesubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const savedUser = localStorage.getItem('userdata')

    if (!savedUser) {
      seterror('No account found! Please signup first.')
      setIsSubmitting(false)
      return
    }

    const userData = JSON.parse(savedUser)

    if (formdata.email === userData.email && formdata.password === userData.password) {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('currentUser', JSON.stringify(userData))

      alert(`✅ Welcome back, ${userData.name} ${userData.lastname}!`)
      setIsSubmitting(false)
      navigate('/')
    } else {
      seterror('❌ Invalid email or password!')
      setIsSubmitting(false)
    }
  }

  const handleLogin = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-linear-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center p-8">
      <video src={videoPath} type='video/mp4' autoPlay
        loop
        muted
        playsInline
        className="absolute fixed"></video>
      <h1 className="text-4xl md:text-5xl font-bold text-black mb-8 text-center drop-shadow-lg uppercase tracking-wide">
        Login
      </h1>

      <form onSubmit={handlesubmit} className="w-full max-w-lg space-y-6">
        {/* Email Field */}
        <input
          type="email"
          name="email"
          value={formdata.email}
          onChange={handlechange}
          placeholder="Email"
          className="w-full p-4 rounded-xl border-2 border-white focus:outline-none focus:border-blue-300 transition-all duration-300 transform focus:scale-105 placeholder-black bg-white/10 backdrop-blur-sm text-black text-lg"
          required
        />
        {/* Password Field */}
        <input
          type="password"
          name="password"
          value={formdata.password}
          onChange={handlechange}
          placeholder="Password"
          className="w-full p-4 rounded-xl border-2 border-white focus:outline-none focus:border-blue-300 transition-all duration-300 transform focus:scale-105 bg-white/10 backdrop-blur-sm text-black text-lg placeholder-black"
          required
        />
        {/* Error Display */}
        {error && (
          <div
            className="bg-red-500/20 border-2 border-red-400 text-red-200 p-4 rounded-xl backdrop-blur-sm text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: error }}
          />
        )}
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`relative flex-1 py-4 px-8 rounded-xl font-bold text-xl shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${isSubmitting
                ? 'bg-gray-500 border-gray-400 cursor-not-allowed'
                : 'bg-white text-purple-600 hover:bg-purple-100 border-4 border-white shadow-xl'
              }`}
          >
            {isSubmitting ? 'Logging In...' : 'Login'}
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
          Don't have account?{' '}
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="font-bold transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  )
}

export default Loginpage
