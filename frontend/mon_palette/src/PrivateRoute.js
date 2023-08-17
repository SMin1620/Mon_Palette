import { Navigate } from "react-router-dom"
const { useRecoilValue } = require("recoil")
const { loginState } = require("./user/components/Atom/loginState")

const PrivateRoute = ({ children }) => {
  const token = useRecoilValue(loginState)
  return token ? children :  <Navigate to="/"/>
}
export default PrivateRoute