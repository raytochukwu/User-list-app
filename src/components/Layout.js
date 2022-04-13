import React from 'react'
import style from 'styled-components'

const Layout = ({ children }) => {
  return (
    <Layouts>
      <h1 className="dasboard">Dashboard</h1>
      {children}
    </Layouts>
  )
}

export default Layout

const Layouts = style.div`
padding-right: 20px;
padding-left: 20px;


`
