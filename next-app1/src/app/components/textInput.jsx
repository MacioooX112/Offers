"use client"
import React from 'react'

function textInput({ name, handle_change, form_data, error }) {
  return (
    <>
        <label htmlFor={name} className="font-sans text-3xl ml-8 select-none inline-block">
              {name}
          </label>
          <input type="text" 
            name={name} 
            className="bg-gray-300 text-gray-300 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full mt-3 p-2.5" 
            placeholder="..."
            value={form_data[name]}
            onChange={handle_change()}/>
            {error && <p className='text-red-600'>{error}</p>}
    </>
  )
}

export default textInput