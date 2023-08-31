import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setUser } from "../../store/authSlice";
import { MdOutlinePendingActions } from "react-icons/md";
import axios from "axios";

const Navbar = () => {
	const { toggle, darkMode } = useContext(DarkModeContext);
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const { setSearch } = useState("");
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleLogout = async (e) => {
		e.preventDefault();
		try {
			setIsOpen(false);
			await axios.post("http://localhost:8800/api/auth/logout", {}, { withCredentials: true });
			dispatch(setUser(""));
			dispatch(setAuth(false));
			localStorage.clear();
			navigate("/login");
		} catch (ee) {
			console.log(ee.response.data.message);
		}
	};

	return (
		<div className="navbar">
			<div className="left">
				<Link to="/" style={{ textDecoration: "none" }}>
					<span>MentorNet</span>
				</Link>
				<div className="search">
					<input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
					<SearchOutlinedIcon />
				</div>
			</div>
			<div className="right">
				<Link to="/requests" className="icons">
					<MdOutlinePendingActions size={25} />
				</Link>
				{darkMode ? <WbSunnyOutlinedIcon onClick={toggle} className="icons" /> : <DarkModeOutlinedIcon onClick={toggle} className="icons" />}
				<div className="logout">
					<div className="dropdown">
						<button className="dropdown-toggle" onClick={toggleDropdown}>
							<span className="name">{user.name}</span>
							<span className={`arrow ${isOpen ? "open" : ""}`}>&#9662;</span>
						</button>
						{isOpen && (
							<div className="dropdown-menu">
								<div className="menu-item">
									<Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }} onClick={() => setIsOpen(false)}>
										<span className="name">{user.name}</span>
									</Link>
								</div>
								<div className="menu-item" onClick={handleLogout}>
									Logout
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
