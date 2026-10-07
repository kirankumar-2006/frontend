import {Routes,Route,Navigate} from 'react-router-dom'; import {useAuth} from './context/AuthContext.jsx'; import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx'; import Register from './pages/Register.jsx'; import Dashboard from './pages/Dashboard.jsx';
import Transactions from './pages/Transactions.jsx'; import TransactionForm from './pages/TransactionForm.jsx'; import Budget from './pages/Budget.jsx'; import Reports from './pages/Reports.jsx';
function Private({children}){const {user}=useAuth();return user?children:<Navigate to="/login" replace/>;}
export default function App(){return <Routes>
<Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/>
<Route element={<Private><Layout/></Private>}>
<Route path="/" element={<Dashboard/>}/><Route path="/transactions" element={<Transactions/>}/>
<Route path="/transactions/new" element={<TransactionForm/>}/><Route path="/transactions/:id/edit" element={<TransactionForm/>}/>
<Route path="/budget" element={<Budget/>}/><Route path="/reports" element={<Reports/>}/></Route>
<Route path="*" element={<Navigate to="/"/>}/></Routes>;}
