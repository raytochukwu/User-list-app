import React from 'react'
import Layout from './Layout'
import style from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useRef } from 'react'
import validator from 'validator'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../services/users'

const EditUser = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const allUsers = useSelector((state) => state.users.value)
  const nameInputRef = useRef()
  const emailInputRef = useRef()
  const [namelEmpty, setNameEmpty] = useState(false)
  const [emailEmpty, setEmailEmpty] = useState(false)
  const [emailNotValid, setEmailNotValid] = useState(false)
  const { id: userid } = useParams()

  const user = allUsers.find((user) => user.id === parseInt(userid))

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      id: user.id,
      name: nameInputRef.current.value,
      email: emailInputRef.current.value,
    }

    if (data.name === '') {
      setNameEmpty(true)
    } else if (data.email === '') {
      setEmailEmpty(true)
    } else if (validator.isEmail(data.email) === false) {
      setEmailNotValid(true)
    } else {
      dispatch(updateUser(data))
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
                ref={nameInputRef}
                defaultValue={user.name}
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
                defaultValue={user.email}
                required
                className="text-field "
                ref={emailInputRef}
                onFocus={(e) => {
                  setEmailEmpty(false)
                  setEmailNotValid(false)
                }}
              />
              {emailNotValid && <div className="error">Invalid Email</div>}
              {emailEmpty && <div className="error">Enter an email</div>}
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
            UpDate
          </button>
        </div>
      </Form>
    </Layout>
  )
}

export default EditUser

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
    @media screen and (max-width: 480px) {
    font-size:12px;
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
