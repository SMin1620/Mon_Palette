import React, {lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { PropagateLoader }  from 'react-spinners';

const root = ReactDOM.createRoot(document.getElementById("root"));
const App = lazy(() => import("./App"))
root.render(
	<Router>
		<RecoilRoot>
				<Suspense fallback=
				{
				<div className="loading_page">
					<PropagateLoader color='#d72b76'/>
				</div>
				}>
					<App />
				</Suspense>
		</RecoilRoot>
	</Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
