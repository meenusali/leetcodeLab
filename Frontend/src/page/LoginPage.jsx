import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from 'react-router-dom'
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";

import { z } from "zod";
import { useAuthStore } from '../store/useAuthStore';

const LoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be atleast of 6 characters"),
})

const LoginPage = () => {
  const { isLoggingIn, login } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema)
  })

  const onSubmit = async (data) => {
    try {
      await login(data)
    } catch (error) {
      console.error("Login failed", error)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-100 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-right gradient blob */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        
        {/* Bottom-left gradient blob */}
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
        
        {/* Floating circles */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary/10 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-primary/10 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-primary/10 rounded-full"></div>
        
        {/* Gradient lines */}
        <div className="absolute top-1/4 left-0 w-32 h-[1px] bg-gradient-to-r from-primary/20 to-transparent"></div>
        <div className="absolute bottom-1/3 right-0 w-32 h-[1px] bg-gradient-to-l from-primary/20 to-transparent"></div>
      </div>

      <div className="w-full max-w-md mx-auto px-6 relative">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <img
              src="/logo.png"
              alt="Codexium Logo"
              className="w-16 h-16 p-2 rounded-2xl"
            />
            <div className="absolute -right-1 -bottom-1 w-8 h-8 bg-gradient-to-r from-primary/10 to-primary/30 rounded-full blur-sm"></div>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-primary via-blue-400 to-primary/70 text-transparent bg-clip-text">
              Welcome
            </span>
          </h1>
          <p className="text-base text-gray-400">
            Sign in to continue your coding journey
          </p>
        </div>

        {/* Login Form - Adding subtle backdrop */}
        <div className="relative">
          <div className="absolute inset-0 bg-base-200/50 backdrop-blur-sm rounded-2xl"></div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative p-6 rounded-2xl">
            {/* Email */}
            <div className="form-control">
              <label className="label py-1">
                <span className="text-base font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-primary/60" />
                </div>
                <input
                  type="email"
                  {...register("email")}
                  className={`input h-12 w-full pl-11 bg-base-100/50 focus:bg-base-100 transition-colors ${
                    errors.email ? "border-error" : "border-base-300 focus:border-primary"
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <label className="label py-1">
                  <span className="text-error text-sm">{errors.email.message}</span>
                </label>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label py-1">
                <span className="text-base font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-primary/60" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`input h-12 w-full pl-11 bg-base-100/50 focus:bg-base-100 transition-colors ${
                    errors.password ? "border-error" : "border-base-300 focus:border-primary"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <label className="label py-1">
                  <span className="text-error text-sm">{errors.password.message}</span>
                </label>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn h-12 bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary hover:border-primary/40 w-full text-base"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-base text-gray-400">
            Don't have an account?{" "}
            <Link 
              to="/signup" 
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage