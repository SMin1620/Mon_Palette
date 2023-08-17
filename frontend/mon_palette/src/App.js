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
							<NavigationBarHeader title="Mon, Palette" />,
							<Home />,
							<NavigationBarBottom />,
						]}
					/>
					<Route
						path="/feed/"
						element={[
							<NavigationBarHeader title="Mon, Palette" />,
							<NavigationBarBottom />,
							<FeedMain />,
						]}
					/>
					<Route
						path="/feed/write"
						element={[
							<NavigationBarBottom />, 
							<FeedWrite />
						]}
					/>
					<Route
						path="/feed/edit/:id"
						element={[
							<NavigationBarBottom />,
							<FeedEdit />
						]}
					/>
					<Route
						path="/feed/:feedId"
						element={[
							<NavigationBarHeader title="Mon, Palette" />,
							<FeedDetail />,
							<NavigationBarBottom />
						]}
					/>
					<Route
						path="/challenge"
						element={[
							<NavigationBarHeader title="Mon, Palette" />,
							<NavigationBarBottom />,
							<ChallengeHome />,
						]}
					/>
					<Route
						path="/challenge/create"
						element={[
							<NavigationBarBottom />,
							<ChallengeCreate />
						]}
					/>
					<Route
						path="/challenge/edit/:id"
						element={[
							<NavigationBarBottom />,
							<ChallengeEdit />
						]}
					/>
					<Route
						path="/challenge/:challengeId"
						element={[
							<ChallengeDetail />,
							<NavigationBarBottom />,
						]}
					/>
					<Route
						path="/userpage/:id"
						element={[
							<NavigationBarHeader title="Mon, Palette" />,
							<NavigationBarBottom />,
							<UserPage />,
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
							<NavigationBarHeader title="ChangeNickname" />,
							<ChangeNickname />,
							<NavigationBarBottom />,
						]}
					/>
					<Route
						path="/changepassword"
						element={[
							<NavigationBarHeader title="ChangePassword" />,
							<ChangePassword />,
							<NavigationBarBottom />,
						]}
					/>
					<Route
						path="/changephone"
						element={[
							<NavigationBarHeader title="ChangePhone" />,
							<ChangePhone />,
							<NavigationBarBottom />,
						]}
					/>
					<Route
						path="/changeaddress"
						element={[
							<NavigationBarHeader title="ChangeAddress" />,
							<ChangeAddress />,
							<NavigationBarBottom />,
						]}
					/>
					<Route
						path="/changeinfo/"
						element={[
							<NavigationBarHeader title="Edit profile" />,
							<NavigationBarBottom />,
							<ChangeInfo />,
						]}
					/>
					<Route
						path="/userpage/following/:id"
						element={[
							<NavigationBarHeader title="following" />,
							<NavigationBarBottom />,
							<FollowingList />,
						]}
					/>
					<Route
						path="/userpage/follower/:id"
						element={[
							<NavigationBarHeader title="follower" />,
							<NavigationBarBottom />,
							<FollowerList />,
						]}
					/>
					<Route
						path="/search/"
						element={[
							<NavigationBarBottom />, 
							<Search2 />
						]}
					/>
					<Route
						path="/result"
						element={[
							<NavigationBarBottom />, 
							<SearchResult />
						]}
					/>
					<Route 
						path="/AImakeup" 
						element={[
							<MakeUpStart />
						]} />
					<Route
						path="/personalcolor"
						element={[
							<StartPage />
						]}
					/>
					<Route 
						path="/makeupresult" 
						element={[
							<MakeUpResult />
							]}
					/>
					<Route
						path="/shop"
						element={[
							<NavigationBarHeader title="Mon, Palette" item="shop"/>,
							<ShopMain />,
							<NavigationBarBottom />
						]}
					/>
					<Route
						path="/cart"
						element={[
							<NavigationBarHeader title="Mon, Palette" item="shop"/>,
							<ShoppingCart />,
							<NavigationBarBottom />
						]}
					/>
					<Route
						path="/itemregist"
						element={[
							<NavigationBarHeader title="Mon, Palette" />,
							<NavigationBarBottom />,
							<ItemRegist />,
						]}
					/>
					<Route
						path="/handleProduct"
						element={[
							<NavigationBarHeader title="" />,
							<NavigationBarBottom />,
							<HandleProduct />,
						]}
					/>
					<Route
						path="/deliveryregist"
						element={[
							<NavigationBarHeader title="" />,
							<NavigationBarBottom />,
							<DeliveryRegist />,
						]}
					/>
					<Route
						path="/deliveryList"
						element={[
							<NavigationBarHeader title="Edit address" />,
							<DeliveryList />,
							// <NavigationBarBottom />
						]}
					/>
					<Route
						path="/orderList"
						element={[
							<NavigationBarHeader title="Mon, Palette" />,
							<OrderList />,
							<NavigationBarBottom />
						]}
					/>
					<Route
						path="/order/:id"
						element={[
							<NavigationBarHeader title="Mon, Palette" />,
							<OrderDetail />,
							<NavigationBarBottom />
						]}
					/>
					<Route
						path="/payment"
						element={[
							<NavigationBarHeader title="Mon, Palette" />,
							<Payment />,
							// <NavigationBarBottom />,
						]}
					/>
					<Route
						path="/paymentsucceed"
						element={[
							<NavigationBarHeader title="Mon, Palette" />,
							<NavigationBarBottom />,
							<PaymentSucceed />,
						]}
					/>
					<Route
						path="/paymentfailed"
						element={[
							<NavigationBarHeader title="Mon, Palette" />,
							<PaymentFailed />,
							<NavigationBarBottom />,
						]}
					/>		
					<Route
						path="/recommendyoutube"
						element={[
							// <NavigationBarHeader title="Mon, Palette" />,
							<RecommendYoutuber />,
							<NavigationBarBottom />,
						]}
					/>
					<Route
					path="/shop/shopdetail/:id"
					element={[
						<NavigationBarHeader title="Mon, Palette" />,
						<ItemDetailTop />,
						<ItemDetailBottom />,
					]}				
				/>					
				</Routes>
		</div>
	);
}

export default App;
