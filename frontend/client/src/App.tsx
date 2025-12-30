import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import { AuthContext } from "./context/AuthContext"
import UserDashboar from "./pages/UserDashboar"
import AdminDashboard from "./pages/AdminDashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminProtectedRoute from "./components/AdminProtectedRoute"
import ListProducts from "./components/ListProducts"
import Index from "./components/Index"
import ListUsers from "./components/ListUsers"
import ListMovemements from "./components/ListMovemements"
import ListCategories from "./components/ListCategories"
import AdminIndex from "./components/AdminIndex"
import AdminListUsers from "./components/AdminListUsers"
import RegisterPage from "./pages/RegisterPage"
import AdminListProducts from "./components/AdminListProducts"

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthContext>
          <Routes>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
            <Route path="/" element={<ProtectedRoute><h1>Index</h1></ProtectedRoute>}></Route>
            <Route path="/user-login" element={<ProtectedRoute><UserDashboar></UserDashboar></ProtectedRoute>}>
              <Route path="products" element={<ListProducts></ListProducts>}></Route>
              <Route path="users" element={<ListUsers></ListUsers>}></Route>
              <Route path="" element={<Index></Index>}></Route>
              <Route path="movements" element={<ListMovemements></ListMovemements>}></Route>
              <Route path="categories" element={<ListCategories></ListCategories>}></Route>
            </Route>
            <Route path="/admin-login" element={<ProtectedRoute><AdminProtectedRoute><AdminDashboard></AdminDashboard></AdminProtectedRoute></ProtectedRoute>}>
              <Route path="index" element={<AdminIndex></AdminIndex>}></Route>
              <Route path="users" element={<AdminListUsers></AdminListUsers>}></Route>
              <Route path="products" element={<AdminListProducts></AdminListProducts>}></Route>
            </Route>
          </Routes>
        </AuthContext>
      </BrowserRouter>

    </>
  )
}

export default App
