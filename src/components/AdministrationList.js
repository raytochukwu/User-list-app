import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import style from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../services/users'

const AdministrationList = () => {
  const navigate = useNavigate()
  const allUsers = useSelector((state) => state.users.value)
  const [users, setUsers] = useState(allUsers)
  const [userId, setUserId] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    setUsers(allUsers)
  }, [allUsers])
  console.log(allUsers)
  function handleDelete(e) {
    e.preventDefault()
    dispatch(deleteUser(userId))
    setModalOpen(false)
  }
  function handleSortAsc(e) {
    e.preventDefault()
    const arr = []

    allUsers.map((user) => {
      arr.push(user.username)
      return arr
    })
    const aToZ = arr.sort()

    const newArr = []

    aToZ.map((username) => {
      let a = allUsers.find((user) => user.username === username)
      newArr.push(a)
      return a
    })
    setUsers(newArr)
  }

  function handleSortDesc(e) {
    e.preventDefault()
    const arr = []

    allUsers.map((user) => {
      arr.push(user.username)
      return arr
    })
    const aToZ = arr.sort()
    const zToA = aToZ.reverse()

    const newArr = []

    zToA.map((username) => {
      let a = allUsers.find((user) => user.username === username)
      newArr.push(a)
      return a
    })
    setUsers(newArr)
  }

  return (
    <Layout>
      <Container>
        {modalOpen && (
          <Modal>
            <div className="container ">
              <div className="header">
                <h1 style={{ fontSize: 'large' }}>Delete</h1>
              </div>
              <div className="body">
                <p className=" font-medium">
                  Are you Sure you want to delete{' '}
                  {users?.find((user) => user.id === userId)?.name}?{' '}
                </p>
              </div>
              <div className="footer">
                <button
                  className="btn"
                  onClick={() => {
                    setModalOpen(false)
                  }}
                >
                  Cancel
                </button>
                <button className="btn2" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </Modal>
        )}
        <div className="header">
          <div className="user"> User list</div>
          <button className="btn" onClick={() => navigate('/addUser')}>
            Add new
          </button>
        </div>
        <div className="table-Con">
          <div style={{ padding: '8px' }}>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <button
                style={{
                  background: 'linear-gradient(45deg, black, transparent)',
                  border: 'none',
                  color: 'white',
                }}
                onClick={handleSortAsc}
              >
                Asc
              </button>
              <button
                style={{
                  background: 'linear-gradient(45deg, black, transparent)',
                  border: 'none',
                  color: 'white',
                  marginLeft: '8px',
                }}
                onClick={handleSortDesc}
              >
                Desc
              </button>
            </div>
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
                {users.map((user) => (
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
                          navigate(`/editUser/${user.id}`)
                        }}
                      >
                        edit
                      </button>
                    </td>
                    <td className="">
                      <button
                        className="btn2"
                        onClick={() => {
                          setModalOpen(true)
                          setUserId(user.id)
                        }}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default AdministrationList

const Container = style.div`
width:100%;
border-radius: 10px;
box-shadow: 1px 1px 5px 2px rgb(0 0 0 / 15%);

.header{
    display:flex;
    justify-content: space-between;
    width:100%;
    height:80px;
    align-items: center;
    border-bottom: 1px solid lightgrey;
    .user{
    font-size: larger;
    padding-left: 30px;
    }
    .btn{
        background: rgb(27, 153, 249);
        border: none;
        padding: 10px 40px;
        font-size: inherit;
        color: white;
        margin-right: 10px;
        border-radius: 5px;
    }
}
.table-Con{

width:100%;
overflow: scroll;
margin-bottom:50px;

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
}

`

const Modal = style.div`
height:100vh;
width:100%;
background:#c8c8c8d9;
display:flex;
justify-content:center;
align-items:center;
position: fixed;
top:0;
left:0;

.container{
    width:400px;
    height:220px;
    background:white;
    border-radius:10px;
    .header{
        height: 50px;
    border-bottom: 1px solid lightgrey;
    display:flex;
    align-items:center;
    padding-left: 20px;
    }
    .body{
        height: 100px;
        display:flex;
        justify-content:center;
        align-items:center;
        border-bottom: 1px solid lightgrey;
        p{
          max-width:300px;
        }

    }
    .footer{
        height: 70px;
        display:flex;
        justify-content:right;
        align-items:center;
    }
    .btn{
        height: 40px;
        margin-right: 15px;
        width: 80px;
        border: none;
        background: grey;
        color: white;
        border-radius: 3px;
    }
    .btn2{
        height: 40px;
        width: 100px;
        margin-right: 10px;
        background: red;
        border: none;
        color: white;
        border-radius: 3px;
    }
}
`
