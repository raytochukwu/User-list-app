import React from 'react'
import style from 'styled-components'

const Table = (props) => {
  return (
    <TableCon>
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Username</td>
            <td>Email</td>
            <td>city</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <tr key={user.id}>
              <td>{user?.id}</td>
              <td>{user?.name}</td>
              <td>{user?.username}</td>
              <td>{user?.email}</td>
              <td>{user?.address?.city}</td>
              <td>
                <button
                  className="btn1"
                  onClick={() => {
                    props.navigate(`/editUser/${user.id}`)
                  }}
                >
                  edit
                </button>
              </td>
              <td className="">
                <button
                  className="btn2"
                  onClick={() => {
                    props.setModalOpen(true)
                    props.setUserId(user.id)
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableCon>
  )
}

export default Table

const TableCon = style.div`

    
    table{
        width:100%;
        min-width: 800px;
        border:2px solid lightgrey;
        border-collapse: collapse;
       
        tr{
            height:100px;
            border-bottom:2px solid lightgrey; 
        }
        thead{
            text-align:center;
            background:#EFEFEF;       
        }
        tbody{
            text-align:center;
        }
        td{
            width:14.3%;      
        }
      .btn1{
        width: 70px;
        background: orange;
        height: 25px;
        border-radius: 4px;
        border: none;
        color: white;
      }
      .btn2{
        width: 70px;
        background: red;
        height: 25px;
        border-radius: 4px;
        border: none;
        color: white;
      }
     
    }
    
    `
