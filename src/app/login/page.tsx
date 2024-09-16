'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BarChart, Mail, Lock, Eye, EyeOff, Github } from 'lucide-react'
import Link from 'next/link'
import { Alert, AlertDescription } from '@/components/ui/alert'
import SocialLogins from '@/components/common/social-logins'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        if (!email || !password) {
            setError('Please fill in all fields.')
            return
        }
        if (!isValidEmail(email)) {
            setError('Please enter a valid email address.')
            return
        }
        // Handle login logic here
        console.log('Login submitted', { email, password, rememberMe })
    }

    const handleGoogleLogin = () => {
        // Handle Google login logic here
        console.log('Google login initiated')
    }

    const handleGitHubLogin = () => {
        // Handle GitHub login logic here
        console.log('GitHub login initiated')
    }

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col justify-between">
            {/* Header */}
            <header className="w-full p-4">
                <div className="max-w-md mx-auto">
                    <Link href="/" className="flex items-center space-x-2">
                        <BarChart className="h-8 w-8 text-blue-600" />
                        <span className="text-2xl font-bold text-gray-900">LogShark</span>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div>
                        <h2 className="mt-6 text-2xl font-extrabold text-gray-900">
                            Welcome Back to LogShark
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Log in to access real-time analytics and insights for your websites, APIs, and mobile apps.
                        </p>
                    </div>
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <Label htmlFor="email-address" className="sr-only">
                                    Email address
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="pl-10"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mt-4 pt-4">
                                <Label htmlFor="password" className="sr-only">
                                    Password
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        className="pl-10 pr-10"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Checkbox
                                    id="remember-me"
                                    checked={rememberMe}
                                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                                />
                                <Label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    Remember me
                                </Label>
                            </div>

                            <div className="text-sm">
                                <Link
                                    href="/forgot-password"
                                    className="font-medium text-blue-600 hover:text-blue-500"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4"
                            >
                                Log In
                            </Button>
                        </div>
                    </form>
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>
                        <SocialLogins/>
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don&apos;t have an account?
                            <Link
                                href="/register"
                                className="font-medium text-blue-600 hover:text-blue-500 ml-1"
                            >
                                Sign Up Here
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="w-full p-4 bg-gray-50">
                <div className="max-w-md mx-auto flex justify-between items-center text-sm text-gray-500">
                    <div className="space-x-4">
                        <Link href="/privacy" className="hover:text-gray-900">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-gray-900">
                            Terms of Service
                        </Link>
                    </div>
                    <div>
                        <a href="mailto:support@logshark.com" className="hover:text-gray-900">
                            support@logshark.com
                        </a>
                    </div>
                </div>
            </footer>

            {/* Background Pattern */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <svg
                    className="absolute bottom-0 left-0 w-full text-blue-50 opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                >
                    <path
                        fill="currentColor"
                        fillOpacity="1"
                        d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </div>
        </div>
    )
}