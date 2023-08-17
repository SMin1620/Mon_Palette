import NavigationBarHeader from "./NavigationBar/NavigationBarHeader";
import NavigationBarBottom from "./NavigationBar/NavigationBarBottom";
import Home from "./Home/Home";
// 피드
import FeedMain from "./Feed/FeedMain";
import FeedWrite from "./Feed/FeedWrite";
import FeedEdit from "./Feed/FeedEdit";
import FeedDetail from "./Feed/FeedDetail/FeedDetail";
// 챌린지
import ChallengeHome from "./Challenge/ChallengeHome";
import ChallengeCreate from "./Challenge/ChallengeCreate";
import ChallengeDetail from "./Challenge/ChallengeDetail";
import ChallengeEdit from "./Challenge/ChallengeEdit";
// 유저
import UserPage from "./user/components/UserPage";
import LoginForm from "./user/components/LoginForm";
import SignUpForm from "./user/components/SignUpForm";
import ChangeNickname from "./user/components/ChangeNickname";
import ChangePassword from "./user/components/ChangePassword";
import ChangeAddress from "./user/components/ChangeAddress";
import ChangePhone from "./user/components/ChangePhone";
import ChangeInfo from "./user/components/ChangeInfo";
import FollowingList from "./user/components/FollowingList";
import FollowerList from "./user/components/FollowerList";
// 서치
import SearchResult from "./SearchResult/SearchResult";
import Search2 from "./Search/Search2";
// 퍼스널컬러 / 메이크업
import MakeUpStart from "./AIMakeUp/MakeUpStart";
import StartPage from "./PersonalColor/StartPage";
import MakeUpResult from "./AIMakeUp/MakeUpResult";
// 쇼핑몰
import ShopMain from "./Shop/ShopMain/ShopMain";
import ShoppingCart from "./Shop/ShoppingCart/ShoppingCart";
import ItemRegist from "./Shop/ItemRegist";
import HandleProduct from "./Shop/HandleProduct";
import DeliveryRegist from "./Shop/delivery/DeliveryRegist";
import DeliveryList from "./DeliveryList";
import Payment from "./Shop/Payment";
import PaymentFailed from "./Shop/PaymentFailed";
import PaymentSucceed from "./Shop/PaymentSucceed";
// 유튜브 추천
import RecommendYoutuber from "./Youtube/RecommendYoutuber";

import { Routes, Route } from "react-router-dom";
import ItemDetailTop from "./Shop/ItemDetail/ItemDetailTop/ItemDetailTop";
import ItemDetailBottom from "./Shop/ItemDetail/ItemDetailBottom/ItemDetailBottom";
import OrderList from './OrderList';
import OrderDetail from "./OrderDetail";
import OauthRedirect from "./user/components/OauthRedirect";
import PrivateRoute from "./PrivateRoute"

function App() {
	return (
		<div className="App">
				<Routes>
					<Route
						path="/"
						element={[
							<NavigationBarHeader title="login" item="shop"/>, 
							<LoginForm />
						]}
					/>
					<Route
						path="/home"
						element={[
							<PrivateRoute>
								<NavigationBarHeader title="Mon, Palette" />,
								<Home />
								<NavigationBarBottom />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/feed/"
						element={[
							<PrivateRoute>
								<NavigationBarHeader title="Mon, Palette" />
								<NavigationBarBottom />
								<FeedMain />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/feed/write"
						element={[
							<PrivateRoute>
								<NavigationBarBottom />
								<FeedWrite />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/feed/edit/:id"
						element={[
							<PrivateRoute>
								<NavigationBarBottom />
								<FeedEdit />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/feed/:feedId"
						element={[
							<PrivateRoute>
								<NavigationBarHeader title="Mon, Palette" />
								<FeedDetail />
								<NavigationBarBottom />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/challenge"
						element={[
							<PrivateRoute>
								<NavigationBarHeader title="Mon, Palette" />
								<NavigationBarBottom />
								<ChallengeHome />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/challenge/create"
						element={[
							<PrivateRoute>
								<NavigationBarBottom />
								<ChallengeCreate />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/challenge/edit/:id"
						element={[
							<PrivateRoute>
								<NavigationBarBottom />
								<ChallengeEdit />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/challenge/:challengeId"
						element={[
							<PrivateRoute>
								<ChallengeDetail />
								<NavigationBarBottom />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/userpage/:id"
						element={[
							<PrivateRoute>
								<NavigationBarHeader title="Mon, Palette" />
								<NavigationBarBottom />
								<UserPage />
							</PrivateRoute>
						]}
					/>
					<Route
						path="signupform"
						element={[
							<NavigationBarHeader title="Sign up" />,
							<SignUpForm />
						]}
					/>
					<Route
						path="/changenickname"
						element={[
							<PrivateRoute>
								<NavigationBarHeader title="ChangeNickname" />
								<ChangeNickname />
								<NavigationBarBottom />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/changepassword"
						element={[
							<PrivateRoute>
								<NavigationBarHeader title="ChangePassword" />
								<ChangePassword />
								<NavigationBarBottom />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/changephone"
						element={[
							<PrivateRoute>
								<NavigationBarHeader title="ChangePhone" />
								<ChangePhone />
								<NavigationBarBottom />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/changeaddress"
						element={[
							<PrivateRoute>
								<NavigationBarHeader title="ChangeAddress" />
								<ChangeAddress />
								<NavigationBarBottom />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/changeinfo/"
						element={[
							<PrivateRoute>
								<NavigationBarHeader title="Edit profile" />
								<NavigationBarBottom />
								<ChangeInfo />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/userpage/following/:id"
						element={[
							<PrivateRoute>
								<NavigationBarHeader title="following" />
								<NavigationBarBottom />
								<FollowingList />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/userpage/follower/:id"
						element={[
							<PrivateRoute>
								<NavigationBarHeader title="follower" />
								<NavigationBarBottom />
								<FollowerList />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/search/"
						element={[
							<PrivateRoute>
								<NavigationBarBottom />
								<Search2 />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/result"
						element={[
							<PrivateRoute>
								<NavigationBarBottom />
								<SearchResult />
							</PrivateRoute>
						]}
					/>
					<Route 
						path="/AImakeup" 
						element={[
							<PrivateRoute>
								<MakeUpStart />
							</PrivateRoute>
						]} />
					<Route
						path="/personalcolor"
						element={[
							<PrivateRoute>
								<StartPage />
							</PrivateRoute>
						]}
					/>
					<Route 
						path="/makeupresult" 
						element={[
							<PrivateRoute>
								<MakeUpResult />
							</PrivateRoute>
							]}
					/>
					<Route
						path="/shop"
						element={[
							<PrivateRoute>
								<NavigationBarHeader title="Mon, Palette" item="shop"/>
								<ShopMain />
								<NavigationBarBottom />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/cart"
						element={[
							<PrivateRoute>
								<NavigationBarHeader title="Mon, Palette" item="shop"/>
								<ShoppingCart />
								<NavigationBarBottom />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/itemregist"
						element={[
							<PrivateRoute>
								<NavigationBarHeader title="Mon, Palette" />
								<NavigationBarBottom />
								<ItemRegist />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/handleProduct"
						element={[
							<PrivateRoute>
								<NavigationBarHeader title="" />
								<NavigationBarBottom />
								<HandleProduct />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/deliveryregist"
						element={[
							<PrivateRoute>
								<NavigationBarHeader title="" />
								<NavigationBarBottom />
								<DeliveryRegist />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/deliveryList"
						element={[
							<PrivateRoute>
								<NavigationBarHeader title="Edit address" />
								<DeliveryList />
								<NavigationBarBottom />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/orderList"
						element={[
							<PrivateRoute>
								<NavigationBarHeader title="Mon, Palette" />
								<OrderList />
								<NavigationBarBottom />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/order/:id"
						element={[
							<PrivateRoute>
								<NavigationBarHeader title="Mon, Palette" />
								<OrderDetail />
								<NavigationBarBottom />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/payment"
						element={[
							<PrivateRoute>
								<NavigationBarHeader title="Mon, Palette" />
								<Payment />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/paymentsucceed"
						element={[
							<PrivateRoute>
								<NavigationBarHeader title="Mon, Palette" />
								<NavigationBarBottom />
								<PaymentSucceed />
							</PrivateRoute>
						]}
					/>
					<Route
						path="/paymentfailed"
						element={[
							<PrivateRoute>
								<NavigationBarHeader title="Mon, Palette" />
								<PaymentFailed />
								<NavigationBarBottom />
							</PrivateRoute>
						]}
					/>		
					<Route
						path="/recommendyoutube"
						element={[
							<PrivateRoute>
								<RecommendYoutuber />
								<NavigationBarBottom />
							</PrivateRoute>
						]}
					/>
					<Route
					path="/shop/shopdetail/:id"
					element={[
						<PrivateRoute>
							<NavigationBarHeader title="Mon, Palette" />
							<ItemDetailTop />
							<ItemDetailBottom />
						</PrivateRoute>
					]}				
				/>					
					<Route
					path="/oauthredirect"
					element={[
						<NavigationBarHeader title="Mon, Palette" />,
						<OauthRedirect />,
						<ItemDetailBottom />
					]}				
				/>					
				</Routes>
		</div>
	);
}

export default App;
