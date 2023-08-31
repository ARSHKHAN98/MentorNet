import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, setAuth } from "../../store/authSlice.js";

const Login = () => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});

	const [err, setErr] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const user = await axios.post("http://localhost:8800/api/auth/login", inputs, { withCredentials: true });
			dispatch(setUser(user.data));
			dispatch(setAuth({ auth: true }));
			navigate("/");
		} catch (ee) {
			setErr(ee.response.data.message);
		}
	};

	return (
		<div className="login">
			<div className="card">
				<div className="right">
					<h1>Login</h1>
					<form>
						<input type="text" placeholder="Email" name="email" onChange={handleChange} />
						<input type="password" placeholder="Password" name="password" onChange={handleChange} />
						{err && <span className="error">{err}</span>}
						<button onClick={handleLogin}>Login</button>
						<span className="registercheck">
							Not Resgistered?
							<Link to="/register" className="link">
								Register
							</Link>
						</span>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
