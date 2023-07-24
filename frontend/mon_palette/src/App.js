import NavigationBarHeader from './NavigationBar/NavigationBarHeader';
import NavigationBarBottom from './NavigationBar/NavigationBarBottom';
import { Routes, Route } from 'react-router-dom'
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={[<NavigationBarHeader/>, <NavigationBarBottom />]}/>
      </Routes>
    </div>
  );
}

export default App;
