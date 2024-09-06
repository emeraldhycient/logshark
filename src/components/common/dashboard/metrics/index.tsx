// components/Metric.tsx
import React from 'react'

interface MetricProps {
    id: string
    name: string
    value: number
    icon: React.ReactNode
}

export function Metric({ name, value, icon }: MetricProps) {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0 bg-black rounded-md p-3">
                        {icon}
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">{name}</dt>
                            <dd className="text-lg font-semibold text-gray-900">{value.toLocaleString()}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}
