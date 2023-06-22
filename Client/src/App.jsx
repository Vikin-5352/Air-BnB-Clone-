import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import LoginPage from "./Components/LoginPage";
import Layout from "./Components/Layout";
import IndexPage from "./Components/IndexPage";
import RegisterPage from "./Components/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./Components/AccountPage";

axios.defaults.baseURL='http://localhost:4000';
axios.defaults.withCredentials=true;


function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/account/:subpage?" element={<AccountPage/>}/>
        <Route path="/account/:subpage/:action" element={<AccountPage/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
