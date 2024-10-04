'use client'

import dynamic from 'next/dynamic'
// import PricingSection from '@/components/landing-2/PricingSection'
const PricingSection = dynamic(() => import('@/components/landing-2/PricingSection'), { ssr: false })
import React from 'react'

function Page() {
  return (
    <div>
      <PricingSection isDisplay={false}/>
    </div>
  )
}

export default Page