import React, { ReactNode } from 'react'
import VectorCombined from '../vector-combined'
type Props = {
    children: ReactNode
}
const VectorCard = ({ children }: Props) => {
    return (
        <div className="w-full lg:w-1/2 h-[70vh] lg:fixed lg:top-0 lg:left-0 lg:h-screen p-0 lg:p-3 rounded-xl overflow-hidden">
            <div className="w-full h-full relative   rounded-xl overflow-hidden">

                {children}
                <div className="absolute right-0 bottom-0 ">
                    <VectorCombined title="Photography" position="bottom-right" />
                </div>
            </div>
        </div>
    )
}

export default VectorCard