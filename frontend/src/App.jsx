import { Routes, Route, BrowserRouter } from "react-router-dom"
import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import EventDashboard from "./pages/EventDashboard"


function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element = {
            <HomePage />
          }/>
          <Route path="/eventdashboard" element = {
            <EventDashboard />
          }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
