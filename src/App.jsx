import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import Layout from './Component/Layout';
import Contact from './Component/Contact';
import About from './Component/About';

import AdminLogin from './Component/Dashboard/pages/AdminLogin.jsx';
import Dashboard from './Component/Dashboard/pages/Dashboard.jsx';
// import Users from './Component/Dashboard/pages/Users.jsx';
import Posts from './Component/Dashboard/pages/Posts.jsx';
// import AccountRequests from './Component/Dashboard/pages/AccountRequests.jsx';
import AdminRoutes from './Component/Dashboard/AdminRoutes.jsx';
import DashboardLayout from './Component/Dashboard/DashboardLayout.jsx';

import { AdminAuthProvider } from './context/AdminAuthContext.jsx';
import './App.css';
import AddPost from './Component/Dashboard/pages/AddPost.jsx';
import EditPost from './Component/Dashboard/pages/EditPost.jsx';
import PostRequest from './Component/PostRequest.jsx';
import AdminAccountRequests from './Component/Dashboard/pages/AdminAccountRequests.jsx';

function App() {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' element={<About />} />
            <Route path='/posts/:id' element={<PostRequest/>}/>
          </Route>

          <Route path='/admin/login' element={<AdminLogin />} />

          <Route element={<AdminRoutes />}>
            <Route element={<DashboardLayout />}>
              <Route path='/admin/dashboard' element={<Dashboard />} />
              {/* <Route path='/admin/users' element={<Users />} /> */}
              <Route path='/admin/posts' element={<Posts />} />
              <Route path='/admin/account-requests' element={<AdminAccountRequests />} />
              <Route path='/admin/posts/add' element={<AddPost/>}/>
              <Route path='/admin/posts/edit/:id' element={<EditPost/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  );
}

export default App;
