import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Function() {
	return (
		<div className="function_container">
			<div className="function4">
				<Link to="/personalcolor">
					<div className="function_text">Personal</div>
					<div className="function_text">Color</div>
				</Link>
			</div>
			&nbsp;
			<div className="function2">
				<Link to="/recommendyoutube">
					<div className="function_text">Recommend</div>
					<div className="function_text">Youtube</div>
				</Link>
			</div>
			&nbsp;
			<div className="function3">
				<Link to="AImakeup">
					<div className="function_text">My</div>
					<div className="function_text">palette</div>
				</Link>
			</div>
			&nbsp;
			<div className="function1">
				<Link to="/AImakeup">
					<div className="function_text">AI</div>
					<div className="function_text">MakeUp</div>
				</Link>
			</div>
		</div>
	);
}

export default Function;
