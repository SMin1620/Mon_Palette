import NavigationBarHeader from './NavigationBar/NavigationBarHeader';
import NavigationBarBottom from './NavigationBar/NavigationBarBottom';
import FeedMain from './Feed/FeedMain';
import SearchResult from './SearchResult/SearchResult'
import { Routes, Route } from 'react-router-dom'
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={[<NavigationBarHeader/>, <NavigationBarBottom/>]}/>

        <Route path='/feed/' element={[<NavigationBarHeader/>, <NavigationBarBottom/>, <FeedMain />] }/>

        {/* path={`/search/${검색결과 변수이름}`} */}
        {/* 네비 헤더 부분 빠지고 검색창의 top 부분 들어가야함 */}
        <Route path='/search/' element={[<NavigationBarHeader/>, <NavigationBarBottom/>,<SearchResult/>]}/>
      </Routes>
    </div>
  );
}

export default App;
