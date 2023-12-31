import React, { useEffect, useState } from "react";
import Request from "../../components/request/Request";
import "./requests.scss";
import axios from "axios";
import { useSelector } from "react-redux";

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

	const handleChange = (requestID) => {
		setRequests(requests.filter((request) => request._id !== requestID));
	};

	return (
		<div className="containerr">
			<div className="body">
				<div className="requests">{requests && requests.map((request) => request.receiverID === user._id && request.status === "Pending" && <Request handleChange={handleChange} request={request} key={request._id} />)}</div>
			</div>
		</div>
	);
};

export default Requests;
