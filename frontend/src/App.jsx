import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';
import VerdictPage from './pages/VerdictPage';
import SubmitPage from './pages/SubmitPage';
import ProfilePage from './pages/ProfilePage';
import CreateTask from './pages/CreateTask';
import UpdateTask from './pages/UpdateTask';
import JustAPage from './pages/TestingAndDebugging';

function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/task" element={<TaskPage/>}/>
        <Route path="/verdict" element={<VerdictPage/>}/>
        <Route path="/submit" element={<SubmitPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/createTask" element={<CreateTask/>}/>
        <Route path="/editTask" element={<UpdateTask/>}/>
        <Route path="/testing" element={<JustAPage/>}/>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
