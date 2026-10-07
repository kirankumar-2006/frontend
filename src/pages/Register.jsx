import {useState} from 'react'; import {Link,useNavigate} from 'react-router-dom'; import api from '../services/api'; import {toast} from '../utils/helpers';
export default function Register(){const [f,setF]=useState({name:'',email:'',password:'',confirm:''}),[err,setErr]=useState(''),[busy,setBusy]=useState(false);const nav=useNavigate();
const set=k=>e=>setF({...f,[k]:e.target.value});
const submit=async e=>{e.preventDefault();
 if(!f.name.trim())return setErr('Full name is required');if(!/^\S+@\S+\.\S+$/.test(f.email))return setErr('Enter a valid email');
 if(f.password.length<6)return setErr('Password must be at least 6 characters');if(f.password!==f.confirm)return setErr('Passwords do not match');
 setBusy(true);try{await api.post('/auth/register',{name:f.name,email:f.email,password:f.password});toast('Registered! Please log in.');nav('/login');}catch(x){setErr(x.message);}finally{setBusy(false);}};
return <div className="auth"><form className="panel" onSubmit={submit}><h1>💰 Expense Tracker</h1><h3>Create account</h3>{err&&<div className="errbox">{err}</div>}
<label>Full Name<input value={f.name} onChange={set('name')}/></label><label>Email<input value={f.email} onChange={set('email')}/></label>
<label>Password<input type="password" value={f.password} onChange={set('password')}/></label><label>Confirm Password<input type="password" value={f.confirm} onChange={set('confirm')}/></label>
<button className="btn" disabled={busy}>{busy?'Creating…':'Register'}</button><p>Have an account? <Link to="/login">Login</Link></p></form></div>;}
