import { useState } from "react";
import "./update.scss";
import axios from "axios";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice.js";
import CloseIcon from "@mui/icons-material/Close";

const Update = ({ setOpenupdate, user }) => {
	const [profile, setProfile] = useState(user.profilepic);
	const dispatch = useDispatch();
	const passout = user.YOP > Number(new Date().getFullYear()) ? true : false;

	const [texts, setTexts] = useState({
		username: user.username,
		name: user.name,
		graduationyear: user.YOP,
		branch: !passout ? user.branch : "",
		resume: user.resume,
		currentCompany: passout ? user.currentCompany : "",
		role: passout ? user.role : "",
	});

	const handleChange = (e) => {
		setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value][0] }));
	};

	const handleClick = async (e) => {
		e.preventDefault();
		const ID = user._id;
		const newuser = await axios.put(
			"http://localhost:8800/api/users",
			{
				uuser: { ...texts, profilepic: profile },
				ID,
			},
			{ withCredentials: true }
		);
		dispatch(setUser(newuser.data));
		setOpenupdate(false);
		setProfile(null);
	};

	return (
		<div className="update">
			<div className="wrapper">
				<div className="headerr">
					<h1>Update Your Profile</h1>
					<CloseIcon className="close" onClick={() => setOpenupdate(false)} />
				</div>
				<form>
					<input type="text" placeholder="Name" name="name" onChange={handleChange} />
					<input type="text" placeholder="Linkedin Handle" name="linkedin" onChange={handleChange} />
					<input type="text" placeholder="Github Handle" name="github" onChange={handleChange} />
					<input type="text" placeholder="Resume" name="resume" onChange={handleChange} />
					<input type="number" placeholder="Graduation Year" name="YOP" onChange={handleChange} />
					{passout && <input type="text" placeholder="Branch" name="branch" onChange={handleChange} />}
					{!passout && <input type="text" placeholder="Role" name="role" onChange={handleChange} />}
					{!passout && <input type="text" placeholder="Current Company" name="Current Company" onChange={handleChange} />}
					<div className="files">
						<label htmlFor="profile">
							<div className="imgContainer imgg">
								<span>Profile Picture</span>
								<img src={profile ? "" : profile} alt="" />
							</div>
							<FileBase type="file" multiple={false} onDone={({ base64 }) => setProfile(base64)} />
						</label>
					</div>
					<button onClick={handleClick}>Update</button>
				</form>
			</div>
		</div>
	);
};

export default Update;
