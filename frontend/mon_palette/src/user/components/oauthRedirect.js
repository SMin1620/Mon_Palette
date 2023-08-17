import React, { useState, useEffect, useCallback } from "react";

import { GoogleLogin } from "@react-oauth/google";
import { useRecoilState } from "recoil";
import { userId } from "./Atom/UserId";
import { loginState } from "./Atom/loginState";
const OauthRedirect = (response) => {
	useEffect(() => {
		response && console.log(response);
	}, [response]);

	// const googleLogin = useCallback((response) => {
	// 	const userInfo = {
	// 		profileImg: response.profileObj.imageUrl,
	// 		email: response.profileObj.email,
	// 		name: response.profileObj.name,
	// 	};
	// 	setUserInfo(userInfo);
	// 	setIsLogin(true);
	// }, []);
	return (
		// <GoogleLogin
		// 	clientId="103846021246-78is58di7n3hvgml8u73i4g9ro66o2v1.apps.googleusercontent.com"
		// 	buttonText="Login"
		// 	onSuccess={googleLogin}
		// 	onFailure={(res) => console.log(res)}
		// 	cookiePolicy={"single_host_origin"}
		// />
		<></>
	);
};
export default OauthRedirect;
