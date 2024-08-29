import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PuzzleWalletProvider } from "@puzzlehq/sdk";

ReactDOM.createRoot(document.getElementById("root")).render(
	<PuzzleWalletProvider>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</PuzzleWalletProvider>
);
