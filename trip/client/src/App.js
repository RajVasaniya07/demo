import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import Home from "./components/Home/index";
import Gendata from "./components/gendata/index"
function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/home" />} />
			<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
			<Route path="/home" element={<Home />} />
			<Route path="/gendata" element={<Gendata />} />

		</Routes>
	);
}

export default App;
