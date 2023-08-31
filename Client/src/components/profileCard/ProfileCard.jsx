import "./profileCard.scss";
import { useSelector } from "react-redux";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { AiTwotoneEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import Update from "./../update/Update";

const ProfileCard = () => {
	const { user } = useSelector((state) => state.auth);
	const [openupdate, setOpenupdate] = useState(false);

	return (
		<div className="leftbar">
			<div className="card">
				<div className="right">
					<div className="header">
						<Link className="subheader" to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
							<img className="image" src={user.profilepic} alt=""></img>
							<h1 className="name">{user.name}</h1>
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
					{user.branch !== "" && (
						<div className="body">
							<div className="subbody">
								<span className="lhs"> Graduation Year:</span>
								<span className="rhs">{user.YOP}</span>
							</div>
							<div className="subbody">
								<span className="lhs"> Branch:</span>
								<span className="rhs">{user.branch}</span>
							</div>
							<div className="subbody">
								<span className="lhs"> Number of Times Referred:</span>
								<span className="rhs">10</span>
							</div>
						</div>
					)}
					{user.currentCompany !== "" && (
						<div className="body">
							<div className="subbody">
								<div className="lhs"> Graduation Year:</div>
								<div className="rhs">{user.YOP}</div>
							</div>
							<div className="subbody">
								<span className="lhs"> Current Company:</span>
								<span className="rhs">{user.currentCompany}</span>
							</div>
							<div className="subbody">
								<span className="lhs">Role:</span>
								<span className="rhs"> {user.role}</span>
							</div>
							<div className="subbody">
								<span className="lhs">Number of Opportunities posted: </span>
								<span className="rhs"> {user.applied.length}</span>
							</div>
						</div>
					)}

					{(user.github || user.linkedin) && <hr />}

					{user.github && (
						<div className="body">
							<div className="subbody">
								<span className="lhs">
									<a href={user.github} className="links">
										<BsGithub size={30} />
										Github
									</a>
								</span>
							</div>
							{user.linkedin !== "" && (
								<div className="subbody">
									<span className="lhs">
										<a href={user.linkedin} className="links">
											<BsLinkedin size={30} />
											Linekdin
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
