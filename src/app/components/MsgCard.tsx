import React from 'react'

const MsgCard = ({ msg }: { msg: string }) => {
    return (
        <div className="flex items-center justify-center h-screen w-full bg-gray-100">
            {msg}
        </div>
    )
}

export default MsgCard