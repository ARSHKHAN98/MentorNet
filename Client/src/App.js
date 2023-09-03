import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { createBrowserRouter, RouterProvider, Outlet, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ProfileCard from "./components/profileCard/ProfileCard";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { useSelector } from "react-redux";
import Share from "./components/share/Share";
import Requests from "./pages/requests/Requests";
import LockNav from "./components/lockNav/LockNav";
import Referrals from "./pages/referrals/Referrals";

function App() {
	const { darkMode } = useContext(DarkModeContext);
	const { user } = useSelector((state) => state.auth);

	const Layout = () => {
		return (
			<div className={`theme-${darkMode ? "dark" : "light"}`}>
				<Navbar />
				<div style={{ display: "flex" }}>
					<div style={{ flex: 1 }}>
						<ProfileCard userID={user._id} />
					</div>
					<div style={{ flex: 3 }}>
						<Outlet />
					</div>
					<div style={{ flex: 1 }}>
						<Share />
					</div>
				</div>
			</div>
		);
	};

	const Log = () => {
		return (
			<div className={`theme-${darkMode ? "dark" : "light"}`}>
				<LockNav />
				<Login />
			</div>
		);
	};

	const Pro = () => {
		return (
			<div className={`theme-${darkMode ? "dark" : "light"}`}>
				<Navbar />
				<div style={{ flex: 3 }}>
					<Profile />
				</div>
			</div>
		);
	};

	const Reg = () => {
		return (
			<div className={`theme-${darkMode ? "dark" : "light"}`}>
				<LockNav />
				<Register />
			</div>
		);
	};

	const Ref = () => {
		return (
			<div className={`theme-${darkMode ? "dark" : "light"}`}>
				<Navbar />
				<Referrals />
			</div>
		);
	};

	const Req = () => {
		return (
			<div className={`theme-${darkMode ? "dark" : "light"}`}>
				<Navbar />
				<Requests />
			</div>
		);
	};

	const ProtectedRoute = ({ children }) => {
		const { auth } = useSelector((state) => state.auth);
		const location = useLocation();
		if (!auth) {
			return <Navigate to="/login" state={{ from: location }} />;
		}
		return children;
	};

	const router = createBrowserRouter([
		{
			path: "/",
			element: (
				<ProtectedRoute>
					<Layout />
				</ProtectedRoute>
			),
			children: [
				{
					path: "/",
					element: <Home />,
				},
			],
		},
		{
			path: "/profile/:id",
			element: <Pro />,
		},
		{
			path: "/login",
			element: <Log />,
		},
		{
			path: "/register",
			element: <Reg />,
		},
		{
			path: "/requests",
			element: <Req />,
		},
		{
			path: "/referrals",
			element: <Ref />,
		},
	]);

	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
