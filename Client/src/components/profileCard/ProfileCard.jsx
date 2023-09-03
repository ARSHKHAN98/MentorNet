import "./profileCard.scss";
import { useSelector } from "react-redux";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { AiTwotoneEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Update from "./../update/Update";
import axios from "axios";

const ProfileCard = (userID) => {
	const { user } = useSelector((state) => state.auth);
	const [openupdate, setOpenupdate] = useState(false);
	const [user2, setUser] = useState();

	useEffect(() => {
		const fun = async () => {
			if (userID !== {}) {
				const newuser = await axios.post("http://localhost:8800/api/users/find/" + userID.userID, { userID: userID.userID }, { withCredentials: true });
				setUser(newuser.data);
			}
		};
		fun();
	}, []);

	return (
		<div className="leftbar">
			<div className="card">
				<div className="right">
					<div className="header">
						<Link className="subheader" to={`/profile/${user2 ? user2._id : user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
							<img className="image" src={user2 ? user2.profilepic : user.profilepic} alt=""></img>
							<h1 className="name">{user2 ? user2.name : user.name}</h1>
						</Link>
						<div className="icon">
							<AiTwotoneEdit
								onClick={() => {
									setOpenupdate(true);
								}}
								size={25}
								style={{ cursor: "pointer" }}
							/>
							{openupdate && <Update setOpenupdate={setOpenupdate} user={user} />}
						</div>
					</div>
					<hr />
					{(user2 ? user2.branch : user.branch) !== "" && (
						<div className="body">
							<div className="subbody">
								<span className="lhs"> Graduation Year:</span>
								<span className="rhs">{user2 ? user2.YOP : user.YOP}</span>
							</div>
							<div className="subbody">
								<span className="lhs"> Branch:</span>
								<span className="rhs">{user2 ? user2.branch : user.branch}</span>
							</div>
							<div className="subbody">
								<span className="lhs"> Number of Times Referred:</span>
								<span className="rhs">10</span>
							</div>
						</div>
					)}
					{(user2 ? user2.currentCompany : user.currentCompany) !== "" && (
						<div className="body">
							<div className="subbody">
								<div className="lhs"> Graduation Year:</div>
								<div className="rhs">{user2 ? user2.YOP : user.YOP}</div>
							</div>
							<div className="subbody">
								<span className="lhs"> Current Company:</span>
								<span className="rhs">{user2 ? user2.currentCompany : user.currentCompany}</span>
							</div>
							<div className="subbody">
								<span className="lhs">Role:</span>
								<span className="rhs"> {user2 ? user2.role : user.role}</span>
							</div>
							<div className="subbody">
								<span className="lhs">Number of Opportunities posted: </span>
								<span className="rhs"> {user2 ? user2.applied.length : user.applied.length}</span>
							</div>
						</div>
					)}

					{((user2 ? user2.github : user.github) || (user2 ? user2.linkedin : user.linkedin)) && <hr />}

					{(user2 ? user2.github : user.github) && (
						<div className="body">
							<div className="subbody">
								<span className="lhs">
									<a href={user2 ? user2.github : user.github} className="links">
										<BsGithub size={30} />
										Github
									</a>
								</span>
							</div>
							{(user2 ? user2.linkedin : user.linkedin) !== "" && (
								<div className="subbody">
									<span className="lhs">
										<a href={user2 ? user2.linkedin : user.linkedin} className="links">
											<BsLinkedin size={30} />
											Linkedin
										</a>
									</span>
								</div>
							)}
						</div>
					)}
					<div></div>
				</div>
			</div>
		</div>
	);
};

export default ProfileCard;
