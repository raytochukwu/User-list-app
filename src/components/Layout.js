import React from 'react'
import style from 'styled-components'

const Layout = ({ children }) => {
  return (
    <Layouts>
      <div className="header">
        <img
          style={{ width: '150px', marginTop: '10px' }}
          src="https://uploads-ssl.webflow.com/610824d4fcb6d649baba751a/616ef5037713a882f83023ee_Proexe_logo_dark.svg"
          alt=""
        />
      </div>
      <h1 className="dasboard">Dashboard</h1>

      {children}
    </Layouts>
  )
}

export default Layout

const Layouts = style.div`
padding-right: 20px;
padding-left: 20px;
.header{
  display: flex;
    align-items: center;
    justify-content:center;
}

`
