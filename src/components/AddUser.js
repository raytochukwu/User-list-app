import React from 'react'
import Layout from './Layout'
import style from 'styled-components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../services/users'
import validator from 'validator'
import { useSelector, useDispatch } from 'react-redux'

const AddUser = () => {
  const navigate = useNavigate()
  const [newUser, setNewUser] = useState({ name: '', email: '' })
  const [emailExist, setEmailExist] = useState(false)
  const [emailEmpty, setEmailEmpty] = useState(false)
  const [namelEmpty, setNameEmpty] = useState(false)
  const [emailNotValid, setEmailNotValid] = useState(false)

  const allUsers = useSelector((state) => state.users.value)
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()

    if (newUser.name === '') {
      setNameEmpty(true)
    } else if (newUser.email === '') {
      setEmailEmpty(true)
    } else if (allUsers.find((user) => user.email === newUser.email)) {
      setEmailExist(true)
    } else if (validator.isEmail(newUser.email)) {
      setEmailNotValid(true)
    } else {
      dispatch(addUser(newUser))
      navigate('/')
    }
  }

  return (
    <Layout>
      <Form>
        <div className="header">
          <h4>Form</h4>
        </div>
        <div className="input-Con">
          <div style={{ width: '100%', textAlign: 'end' }}>
            <div style={{ marginBottom: '50px', marginRight: '50px' }}>
              <label htmlFor="name" style={{ marginRight: '50px' }}>
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="text-field"
                onChange={(e) => {
                  setNewUser({ ...newUser, name: e.target.value })
                }}
                onFocus={(e) => {
                  setNameEmpty(false)
                }}
              />
              {namelEmpty && <div className="error">Enter a name</div>}
            </div>
            <div style={{ marginRight: '50px' }}>
              <label htmlFor="email" style={{ marginRight: '50px' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="text-field "
                onChange={(e) => {
                  setNewUser({ ...newUser, email: e.target.value })
                }}
                onFocus={(e) => {
                  setEmailEmpty(false)
                  setEmailExist(false)
                  setEmailNotValid(false)
                }}
              />
              {emailNotValid && <div className="error">Invalid Email</div>}
              {emailEmpty && <div className="error">Enter an email</div>}
              {emailExist && <div className="error">Email already exists</div>}
            </div>
          </div>
        </div>
        <div className="footer">
          <button
            className="btn"
            onClick={() => {
              navigate('/')
            }}
          >
            Cancel
          </button>
          <button type="submit" className="btn2" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </Form>
    </Layout>
  )
}

export default AddUser

const Form = style.div`
height:400px;
max-width:1200px;
border-radius: 10px;
box-shadow: 1px 1px 5px 2px rgb(0 0 0 / 15%);
margin-top: 100px;
.header{
    width:100%;
    height:60px;
    border-bottom: 1px solid lightgrey;
    h4{
        padding-left: 20px;
        padding-top: 15px;
        font-size: larger;
    }
}
.input-Con{
    height:250px;
    display:flex;
    justify-content:right;
    align-items:center;
    @media screen and (max-width: 480px) {
      font-size:12px;
      }
    .text-field{
        width:60%;
        padding: 10px;
    }
    .error{
      font-size: 12px;
    color: red;
    @media screen and (max-width: 480px) {
      font-size:10px;
      }
    }
}
.footer{
  display:flex;
  justify-content:right;
  .btn{
    height: 40px;
    width: 90px;
    margin-right: 20px;
    border: 1px solid red;
    background: white;
    color: red;
    border-radius: 3px;
  }
  .btn2{
    background: limegreen;
    margin-right: 50px;
    width: 90px;
    height: 40px;
    border: none;
    border-radius: 3px;
    color: white;
  }
}
`
