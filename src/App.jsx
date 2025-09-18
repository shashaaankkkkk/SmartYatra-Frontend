import { useState } from 'react'
import Login from './components/Login'
import Navbar from './components/dashboard/navbar'
import Bus from './pages/Bus'
import PageContent from './components/dashboard/PageContent'



function App() {
  const [currentPage, setCurrentPage] = useState('login')


  const handleLogin = (userData) => {

    setCurrentPage('dashboard')
  }

  const handleLogout = () => {

    setCurrentPage('login')
  }

  return (
    <>
      {currentPage === 'login' ? (
        <div className='grid w-[100%] justify-center h-screen place-items-center'>
          <Login onLogin={handleLogin} />
        </div>
      ) : (
        <Navbar onLogout={handleLogout} />
        
      )}
      <div>
      <PageContent/>
      </div>
    </>
  )
}

export default App
