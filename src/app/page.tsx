'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, LineChart, PieChart, Activity, Zap, Smartphone, Target, Layers, ChevronRight } from 'lucide-react'

export default function LandingPage() {
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BarChart className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold">LogShark</span>
        </div>
        <nav className="hidden md:flex space-x-4">
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
          <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
        </nav>
        <Link href="/login">
          <Button>Sign In</Button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6"
          {...fadeIn}
        >
          Unlock the Power of Real-Time Analytics
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
          {...fadeIn}
          transition={{ delay: 0.2 }}
        >
          LogShark gives you deep insights into user behavior, performance metrics, and system health with privacy-first, real-time analytics.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          {...fadeIn}
          transition={{ delay: 0.4 }}
        >
          <Link href="/register">
          <Button size="lg" className="w-full sm:w-auto">Get Started Now</Button>
          </Link>
          <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={() => setVideoModalOpen(true)}>
            Watch Demo
          </Button>
        </motion.div>
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Image height={100} width={100} src="https://i.im.ge/2024/09/06/fRFdj1.logShark-dashboard.png" alt="LogShark Dashboard" className="rounded-lg shadow-xl w-full h-full" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Powerful Features for Deep Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <LineChart className="h-8 w-8 text-blue-600" />, title: "User Behavior Analytics", description: "Track user sessions, page views, clicks, and scroll depth." },
              { icon: <Activity className="h-8 w-8 text-blue-600" />, title: "Engagement Metrics", description: "Monitor user retention, active users, and churn rates." },
              { icon: <Zap className="h-8 w-8 text-blue-600" />, title: "Performance Analytics", description: "Measure page load time, API response times, crash reports, and uptime monitoring." },
              { icon: <PieChart className="h-8 w-8 text-blue-600" />, title: "API Usage Analytics", description: "Track API call volume, latency, and success vs. failure rates." },
              { icon: <Smartphone className="h-8 w-8 text-blue-600" />, title: "Mobile App-Specific Metrics", description: "Monitor in-app purchases, app version usage, and device-specific performance." },
              { icon: <Target className="h-8 w-8 text-blue-600" />, title: "Custom Events & Goals", description: "Set up tracking for video plays, file downloads, and other custom-defined goals." },
              // { icon: <Lock className="h-8 w-8 text-blue-600" />, title: "Privacy-Focused Analytics", description: "Fully compliant with GDPR, CCPA, and other regulations." }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How LogShark Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
            {[
              { number: "1", title: "Integrate", description: "Add the LogShark script or SDK to your website, mobile app, or API." },
              { number: "2", title: "Track & Visualize", description: "Start capturing data with customizable dashboards." },
              { number: "3", title: "Optimize", description: "Use insights to improve performance, engagement, and revenue." }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center max-w-xs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gaps and Opportunities Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why LogShark?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Zap className="h-12 w-12" />, title: "Real-Time Data", description: "Instant insights with no delays." },
              { icon: <Layers className="h-12 w-12" />, title: "Cross-Platform Analytics", description: "Unified data for websites, APIs, and mobile apps." },
              { icon: <Target className="h-12 w-12" />, title: "Actionable Recommendations", description: "Suggestions for optimizing performance and user experience." }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                {item.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "John Doe", role: "CTO, TechCorp", content: "LogShark has revolutionized how we analyze our user data. The insights we've gained have directly contributed to a 30% increase in user engagement." },
              { name: "Jane Smith", role: "Lead Developer, StartupX", content: "The real-time analytics provided by LogShark have been a game-changer for our API performance monitoring. We can now identify and fix issues before they impact our users." },
              { name: "Alex Johnson", role: "Data Analyst, BigCo", content: "LogShark's privacy-first approach gives us peace of mind when dealing with sensitive user data. It's the perfect balance of powerful analytics and data protection." }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <p className="text-gray-600 mb-4">&quot;{testimonial.content}&quot;</p>
                <div className="flex items-center">
                  <Image height={100} width={100} src={`https://picsum.photos/40/40`} alt={testimonial.name} className="w-10 h-10 rounded-full mr-4" />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Free", price: "$0", description: "Basic analytics for small websites", features: ["Up to 10,000 monthly events", "7-day data retention", "Basic dashboards", "Email support"] },
              { name: "Pro", price: "$99", description: "Advanced analytics for growing businesses", features: ["Up to 1,000,000 monthly events", "30-day data retention", "Advanced dashboards", "API access", "Priority email support"] },
              { name: "Enterprise", price: "Custom", description: "Full analytics suite with custom solutions", features: ["Unlimited events", "12-month data retention", "Custom dashboards", "Dedicated account manager", "24/7 phone & email support"] }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold mb-4">{plan.price}</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <ChevronRight className="h-4 w-4 text-blue-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">{plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Unlock the Power of Your Data?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust LogShark for their analytics needs. Start your journey to data-driven success today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg">Get Started Now</Button>
            <Button size="lg" variant="outline">Schedule a Demo</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BarChart className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">LogShark</span>
              </div>
              <p className="text-gray-400">Empowering businesses with real-time, privacy-focused analytics.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GDPR Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} LogShark. All rights reserved.</p>
            {/* <p className="mt-2">LogShark is fully compliant with GDPR, CCPA, and other data protection regulations.</p> */}
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-3xl w-full">
            <div className="flex justify-end mb-2">
              <button onClick={() => setVideoModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="aspect-w-16 aspect-h-9 h-[70vh]">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}