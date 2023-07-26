import React from 'react'

interface propsType {
    title: string;
    text: string;
    button: string;
    setPopupState: (result: boolean) => void
};

const Popup = ({ text, title, button, setPopupState }: propsType) => {

    return (
        <div className='absolute w-pw h-ph rounded-lg shadow-md bg-white border-gray-200 border p-6 text-center flex flex-col items-center' >
            <div className='mt-20 text-lg font-bold' >{title}</div>
            <div className='text-base mt-1' >{text}</div>
            <div className='w-bw2 h-bh2 bg-slate-200 mt-5 leading-9' onClick={() => setPopupState(false)} >{button}</div>
        </div>
    )
};

export default Popup;

