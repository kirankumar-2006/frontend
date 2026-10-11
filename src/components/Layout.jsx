import {NavLink,Outlet,useNavigate} from 'react-router-dom'; import {useState} from 'react'; import {useAuth} from '../context/AuthContext.jsx';
const links=[['/','Dashboard'],['/transactions','Transactions'],['/transactions/new','Add Transaction'],['/budget','Budget'],['/reports','Reports']];
export default function Layout(){const {user,logout}=useAuth();const [open,setOpen]=useState(false);const nav=useNavigate();
return <div className="app"><header className="top"><button onClick={()=>setOpen(!open)} aria-label="Menu">☰</button><b>Expense Tracker</b></header>
<aside className={'side'+(open?' open':'')}><h2>💰 Expense Tracker</h2>
{links.map(([to,l])=><NavLink key={to} to={to} end onClick={()=>setOpen(false)}>{l}</NavLink>)}
<div className="grow"/><small>Signed in as {user.name}</small><button className="btn light" onClick={()=>{logout();nav('/login');}}>Logout</button></aside>
<main><Outlet/></main></div>;}
