'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BarChart, User, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { Alert, AlertDescription } from '@/components/ui/alert'
import SocialLogins from '@/components/common/social-logins'
import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { MutationError, registerParams, SignUpFormValues } from '@/types'
import authservice from '@/services/auth/auth.service'
import { useRouter } from 'next/navigation'
import { useFormik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { AxiosResponse } from 'axios'


export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [globalError, setGlobalError] = useState<string | null>(null)
    const router = useRouter()

    // Validation schema using Yup
    const validationSchema = Yup.object({
        fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Please confirm your password'),
        agreeTerms: Yup.boolean().oneOf([true], 'You must accept the Terms and Conditions'),
    })

    // Mutation to handle signup
    const mutation: UseMutationResult<AxiosResponse, MutationError, registerParams> = useMutation({
        mutationFn: (data: registerParams) => authservice.register(data),
        onSuccess: () => {
            setLoading(false)
            router.push('/login')
        },
        onError: (error: MutationError) => {
            setLoading(false)
            setGlobalError(error.response?.data?.message || 'An Error Occurred!')
        }
    })

    // Formik setup
    const formik = useFormik<SignUpFormValues>({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeTerms: false,
        },
        validationSchema,
        onSubmit: (values: SignUpFormValues, {  }: FormikHelpers<SignUpFormValues>) => {
            setLoading(true)
            setGlobalError(null) // Reset global error on submit
            mutation.mutate({
                name: values.fullName,
                email: values.email,
                password: values.password,
            })
        },
    })

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
                            Create Your LogShark Account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Get started with real-time analytics for your websites, APIs, and mobile apps.
                        </p>
                    </div>
                    {globalError && (
                        <Alert variant="destructive">
                            <AlertDescription>{globalError}</AlertDescription>
                        </Alert>
                    )}
                    <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <Label htmlFor="full-name" className="sr-only">
                                    Full Name
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="full-name"
                                        name="fullName"
                                        type="text"
                                        className={`pl-10 text-gray-600 ${formik.touched.fullName && formik.errors.fullName ? 'border-red-500' : ''}`}
                                        placeholder="Enter your full name"
                                        value={formik.values.fullName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.fullName && formik.errors.fullName ? (
                                        <div className="text-red-500 text-sm">{formik.errors.fullName}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="mt-4 py-4">
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
                                        className={`pl-10 text-gray-600 ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
                                        placeholder="Enter your email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="text-red-500 text-sm">{formik.errors.email}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="mt-4 py-4">
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
                                        type={showPassword ? 'text' : 'password'}
                                        className={`pl-10 pr-10 text-gray-600 ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
                                        placeholder="Create a password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
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
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="text-red-500 text-sm">{formik.errors.password}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="mt-4">
                                <Label htmlFor="confirm-password" className="sr-only">
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="confirm-password"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        className={`pl-10 pr-10 text-gray-600 ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''}`}
                                        placeholder="Confirm your password"
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                        <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="agree-terms"
                                name="agreeTerms"
                                type="checkbox"
                                checked={formik.values.agreeTerms}
                                onChange={formik.handleChange} // Directly use formik's handleChange for the checkbox
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <Label
                                htmlFor="agree-terms"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                I agree to the{' '}
                                <Link href="/terms" className="font-medium text-blue-600 hover:text-blue-500">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
                                    Privacy Policy
                                </Link>
                            </Label>
                            {formik.touched.agreeTerms && formik.errors.agreeTerms ? (
                                <div className="text-red-500 text-sm ml-2">{formik.errors.agreeTerms}</div>
                            ) : null}
                        </div>



                        <div>
                            <Button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4"
                                disabled={loading || !formik.isValid || !formik.dirty} // Disable button during loading or invalid form
                            >
                                {loading ? 'Signing Up...' : 'Sign Up'}
                            </Button>
                        </div>
                    </form>
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                            </div>
                        </div>

                        <SocialLogins />

                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="font-medium text-blue-600 hover:text-blue-500"
                            >
                                Log In Here
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
                        <a href="mailto:support@logshark.cloud" className="hover:text-gray-900">
                            support@logshark.cloud
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
