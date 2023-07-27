import NavigationBarHeader from './NavigationBar/NavigationBarHeader';
import NavigationBarBottom from './NavigationBar/NavigationBarBottom';
import FeedMain from './Feed/FeedMain';
import SearchResult from './SearchResult/SearchResult'
import Home from './Home'
import Search from './Search/Search2'
import LoginForm from './user/components/LoginForm'
import SignUp from './user/components/SignUp'
import SignUpForm from './user/components/SignUpForm'
import SearchInput from './Search/SearchInput';
import ChallengeHome from './Challenge/ChallengeHome'

import { Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={[<NavigationBarHeader title='login'/>, <LoginForm/>]}/>

        <Route path='/feed/' element={[<NavigationBarHeader title='Mon, Palette'/>, <NavigationBarBottom/>, <FeedMain />] }/>

        {/* path={`/search/${검색결과 변수이름}`} */}
        {/* 네비 헤더 부분 빠지고 검색창의 top 부분 들어가야함 */}
        <Route path='/search/' element={[<NavigationBarBottom/>,<Search/>]}/>

        <Route path='/signup'  element={[<NavigationBarHeader title='Sign up'/>, <SignUp/>]}/>

        <Route path='signupform' element={[<NavigationBarHeader title='Sign up'/>, <SignUpForm/>]}/>

        <Route path='searchResult/:searchInfo' element={[<SearchInput/>, <SearchResult/>, <NavigationBarBottom/>]} />
        
        <Route path='/challenge' element={[<NavigationBarHeader title="Challenge"/>, <ChallengeHome />, <NavigationBarBottom />]}/>
      </Routes>
    </div>
  );
}

export default App;
