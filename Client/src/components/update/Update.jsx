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
  const [passout, setPassout] = useState(
    user.YOP > Number(new Date().getFullYear()) ? true : false
  );
  const [texts, setTexts] = useState({
    username: user.username,
    password: user.password,
    name: user.name,
    confirmpassword: "",
    graduationyear: user.YOP,
    branch: passout ? user.branch : "",
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
    const newuser = await axios.put("http://localhost:8800/api/users", {
      uuser: { ...texts, profilepic: profile },
      ID,
    });
    dispatch(setUser(newuser.data));
    setOpenupdate(false);
    setProfile(null);
  };

  return (
    <div className="update">
      <div className="wrapper">
        <div className="headerr">
          <h1>Update Your Profile</h1>
          <CloseIcon class="close" onClick={() => setOpenupdate(false)} />
        </div>
        <form>
          <div className="files">
            <label htmlFor="profile">
              <div className="imgContainer imgg">
                <span>Profile Picture</span>
                <img src={profile ? "" : profile} alt="" />
              </div>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => setProfile(base64)}
              />
            </label>
          </div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Linkedin Handle"
            name="linkedin"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Github Handle"
            name="github"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Resume"
            name="resume"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Graduation Year"
            name="YOP"
            onChange={handleChange}
          />
          {passout && (
            <input
              type="text"
              placeholder="Branch"
              name="branch"
              onChange={handleChange}
            />
          )}
          {!passout && (
            <input
              type="text"
              placeholder="Role"
              name="role"
              onChange={handleChange}
            />
          )}
          {!passout && (
            <input
              type="text"
              placeholder="Current Company"
              name="Current Company"
              onChange={handleChange}
            />
          )}
          <button onClick={handleClick}>Update</button>
        </form>
        {/* <button className="close" onClick={() => setOpenupdate(false)}>
					close
				</button> */}
      </div>
    </div>
  );
};

export default Update;
