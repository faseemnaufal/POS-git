import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import POSPage from './pages/POSPage';
import Store from './pages/Store';
import AddPage from './pages/AddPage';
import Edit from './pages/Edit';
import SalesReports from './pages/SalesReports';
import StockReports from './pages/StockReports';
import BillReports from './pages/BillReports';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/pos" element={<POSPage/>} />
        <Route path="/add" element={<AddPage/>} />
        <Route path="/store" element={<Store/>} />
        <Route path="/edit/:id" element={<Edit/>} />
        <Route path="/salesReport" element={<SalesReports/>} />
        <Route path='/stockReport' element={<StockReports />} />
        <Route path='/billReport' element={<BillReports />} />
      </Routes>
    </Router>
  );
}

export default App;
