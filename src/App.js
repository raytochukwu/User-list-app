import { Route, Routes } from 'react-router-dom'
import './App.css'
import AdministrationList from './components/AdministrationList'
import AddUser from './components/AddUser'
import EditUser from './components/EditUser'

function App() {
  async function loadData() {
    const response = await fetch(
      'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data'
    )
    const data = await response.json()

    return data
  }
  loadData().then((data) => {
    if (typeof window !== 'undefined') {
      const users = JSON.stringify(data)
      localStorage.setItem('users', users)
    }
  })
  return (
    <>
      <Routes>
        <Route path="/" element={<AdministrationList />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/editUser/:id" element={<EditUser />} />
      </Routes>
    </>
  )
}

export default App
