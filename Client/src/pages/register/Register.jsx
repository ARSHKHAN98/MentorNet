import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";

const Register = () => {
	const [inputs, setInputs] = useState({
		username: "",
		email: "",
		password: "",
		name: "",
		confirmpassword: "",
		graduationyear: new Date().getFullYear(),
		branch: "",
		resume: "",
		currentCompany: "",
		role: "",
	});

	const [next, setNext] = useState(false);
	const [student, setStudent] = useState(true);
	const [err, setErr] = useState("");

	const navigate = useNavigate();

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleNext = (e) => {
		e.preventDefault();
		setErr("");
		if (inputs.username.length === 0) setErr("Provide Username");
		else if (inputs.name.length === 0) setErr("Provide Name");
		else if (inputs.email.length === 0) setErr("Provide Email");
		else if (inputs.graduationyear.length === 0) setErr("Provide Graduation Year");
		else if (inputs.password.length === 0) setErr("Provide Password");
		else if (inputs.confirmpassword.length === 0) setErr("Provide Confirm Password");
		else if (inputs.password !== inputs.confirmpassword) setErr("Password doesn't match with Confirm Password");
		else {
			const currentYear = new Date().getFullYear();
			if (Number(inputs.graduationyear) < currentYear) {
				setStudent(false);
			} else setStudent(true);
			setNext(true);
		}
	};

	const handleBack = (e) => {
		e.preventDefault();
		setNext(false);
	};

	const handleClick = async (e) => {
		e.preventDefault();
		try {
			// , profilepic: profile, coverpic: cover
			await axios.post("http://localhost:8800/api/auth/register", { ...inputs });
			navigate("/login");
			if (student) {
			}
			setInputs({
				username: "",
				email: "",
				password: "",
				name: "",
				confirmpassword: "",
				graduationyear: new Date().getFullYear(),
				branch: "",
				resume: "",
				currentCompany: "",
				role: "",
			});
		} catch (er) {
			setErr(er.response.data.message);
		}
	};

	return next ? (
		student ? (
			<div className="register">
				<div className="card">
					<div className="right">
						<h1>Student Register</h1>
						<form>
							<input type="text" placeholder="Branch" name="branch" onChange={handleChange} value={inputs.branch} />
							<input type="text" placeholder="Resume" name="resume" onChange={handleChange} value={inputs.resume} />
							{err && <span className="error">{err}</span>}
							<button onClick={handleClick}>Sign Up</button>
							<span className="logincheck">
								Go back to Register page ?
								<Link to="/register" className="link" onClick={handleBack}>
									Register
								</Link>
							</span>
						</form>
					</div>
				</div>
			</div>
		) : (
			<div className="register">
				<div className="card">
					<div className="right">
						<h1>Passout Register</h1>
						<form>
							<input type="text" placeholder="Current Company" name="currentCompany" onChange={handleChange} value={inputs.currentCompany} />
							<input type="text" placeholder="Role" name="role" onChange={handleChange} value={inputs.role} />
							<input type="text" placeholder="Resume" name="resume" onChange={handleChange} value={inputs.resume} />
							{err && <span className="error">{err}</span>}
							<button onClick={handleClick}>Sign Up</button>
							<span className="logincheck">
								Go back to Register page ?
								<Link to="/register" className="link" onClick={handleBack}>
									Register
								</Link>
							</span>
						</form>
					</div>
				</div>
			</div>
		)
	) : (
		<div className="register">
			<div className="card">
				<div className="right">
					<h1>Register</h1>
					<form>
						<input type="text" placeholder="Name" name="name" onChange={handleChange} value={inputs.name} />
						<input type="text" placeholder="Username" name="username" onChange={handleChange} value={inputs.username} />
						<input type="email" placeholder="Email" name="email" onChange={handleChange} value={inputs.email} />
						<input type="password" placeholder="Password" name="password" onChange={handleChange} value={inputs.password} />
						<input type="password" placeholder="Confirm Password" name="confirmpassword" onChange={handleChange} value={inputs.confirmpassword} />
						<input type="number" placeholder="Graduation Year" name="graduationyear" onChange={handleChange} value={inputs.graduationyear} />
						{err && <span className="error">{err}</span>}
						<button onClick={handleNext}>Next</button>
						<span className="logincheck">
							Already Resgistered?
							<Link to="/login" className="link">
								Login
							</Link>
						</span>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
