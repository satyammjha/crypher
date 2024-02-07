import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Transactionspage from './Components/Transactions/Transactionpage'



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/transactions' element={<Transactionspage />}></Route>
      </Routes>
    </Router>
  );
}






export default App;