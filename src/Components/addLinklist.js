import React from 'react'
import "./AddLinklist.css"

export default function addLinklist() {
  return (
    <div className='AddLinkList'>
      Add Linklist
      <div>
        <input type="text" className='addListInput' placeholder='Enter value' />
        <input type="text" className='addListInput' placeholder='Enter address' />
      </div>
      <button className='btn'>Add LinkList</button>
      
    </div>
  )
}
