import "./profile.scss";
import Posts from "../../components/posts/Posts";
import { useEffect, useState } from "react";
import axios from "axios";
import Update from "../../components/update/Update";
import { useLocation } from "react-router-dom";
import ProfileCard from "../../components/profileCard/ProfileCard";

const Profile = () => {
	const [openupdate, setOpenupdate] = useState(false);
	const userID = useLocation().pathname.split("/")[2];
	const [user, setUser] = useState([]);

	useEffect(() => {
		const fun = async () => {
			const newuser = await axios.post("http://localhost:8800/api/users/find/" + userID, { userID: userID }, { withCredentials: true });
			setUser(newuser.data);
		};
		fun();
	}, []);

	return (
		<div className="upper">
			<div className="card">
				<ProfileCard userID={userID} />
			</div>
			<div className="profile" style={{ flex: 3 }}>
				<div className="profileContainer">
					{openupdate && <Update setOpenupdate={setOpenupdate} user={user} />}
					<Posts userID={userID} />
				</div>
			</div>
		</div>
	);
};

export default Profile;
