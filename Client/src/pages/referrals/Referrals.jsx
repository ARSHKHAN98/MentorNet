import React, { useEffect, useState } from "react";
import ProfileCard from "../../components/profileCard/ProfileCard";
import "./referrals.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import Referral from "../../components/referral/Referral";

const Requests = () => {
	const [requests, setRequests] = useState();
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		const func = async () => {
			const req = await axios.get("http://localhost:8800/api/requests", { withCredentials: true });
			setRequests(req.data);
		};
		func();
	}, []);

	return (
		<div className="containerr">
			<div className="body">
				<div className="requests">{requests && requests.map((request) => request.senderID === user._id && <Referral request={request} key={request._id} />)}</div>{" "}
			</div>
		</div>
	);
};

export default Requests;
