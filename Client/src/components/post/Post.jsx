import "./post.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const Post = ({ post }) => {
  const [profilepic, setProfilepic] = useState();

  useEffect(() => {
    const fun = async () => {
      const newuser = await axios.post(
        "http://localhost:8800/api/users/find/" + post.userID,
        { userID: post.userID },
        { withCredentials: true }
      );
      setProfilepic(newuser.data.profilepic);
    };
    fun();
  }, []);

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8800/api/requests",
        { receiverID: post.userID, postID: post._id },
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="post">
      <div className="container">
        <div className="header">
          <div className="left">
            <img className="image" src={profilepic} alt=""></img>
            <div className="info">
              <div className="role">{post.role}</div>
              <div className="company"> {post.companyname}</div>
            </div>
          </div>
          <div className="right">
            <button className="button" onClick={handleApply}>
              Apply
            </button>
          </div>
        </div>
        <div className="body">
          <div className="bheader"> Job Description:</div>
          <div className="desc">{post.desc}</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
