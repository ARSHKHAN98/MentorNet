import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetch = async () => {
			const res = await axios.get("http://localhost:8800/api/posts", { withCredentials: true });
			setPosts(res.data);
		};
		fetch();
	}, []);

	return <PostContext.Provider value={{ posts, setPosts }}>{children}</PostContext.Provider>;
};
