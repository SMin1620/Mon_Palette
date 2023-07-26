import NavigationBarHeader from './NavigationBar/NavigationBarHeader';
import NavigationBarBottom from './NavigationBar/NavigationBarBottom';
import FeedMain from './Feed/FeedMain';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={[<NavigationBarHeader/>, <NavigationBarBottom />]}/>
        <Route path='/feed/' element={[<NavigationBarHeader/>, <NavigationBarBottom />, <FeedMain />] }/>
      </Routes>
    </div>
  );
}

export default App;
