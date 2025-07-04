import React from 'react'

export default function Input({
    label, id, name, value, onChange,errors}) {
  return (
    <div className="input-container">
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          name={name}
          value={value}
          onChange={onChange}
        />
        <p className='error'>{errors}</p>
      </div>
  )
}
