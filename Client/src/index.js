import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { PostContextProvider } from "./context/postContext";
import { store } from "./store/index.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<DarkModeContextProvider>
		<PostContextProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</PostContextProvider>
	</DarkModeContextProvider>
);
