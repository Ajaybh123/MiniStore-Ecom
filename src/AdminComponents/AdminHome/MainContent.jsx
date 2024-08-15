import React from 'react'
import './Miancontent.css'
export default function MainContent({children}) {
  return (
    <>
      <div className="main">{children}</div>
    </>
  )
}
