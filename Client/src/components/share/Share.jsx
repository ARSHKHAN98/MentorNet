import "./share.scss";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Share = () => {
  const { posts, setPosts } = useState();
  const [desc, setDesc] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [role, setRole] = useState("");
  const { user } = useSelector((state) => state.auth);

  const handleClick = async (e) => {
    e.preventDefault();
    const newpost = await axios.post(
      "http://localhost:8800/api/posts/create",
      { companyname, role, desc, userID: user._id },
      { withCredentials: true }
    );
    setPosts([newpost.data, ...posts]);
    setDesc("");
    setRole("");
    setCompanyname("");
  };

  return (
    <div className="share">
      <div className="card">
        <div className="right">
          <h1>Share Opening</h1>
          <form>
            <input
              type="text"
              placeholder="Company Name"
              name="companyname"
              onChange={(e) => setCompanyname(e.target.value)}
              value={companyname}
            />
            <input
              type="text"
              placeholder="Role"
              name="role"
              onChange={(e) => setRole(e.target.value)}
              value={role}
            />
            <input
              type="text"
              placeholder="Job Description"
              className="job"
              name="jobdescription"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
            <button onClick={handleClick}>Share</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Share;
