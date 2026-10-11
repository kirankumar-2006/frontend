import {useState} from 'react'; import {Link,useNavigate} from 'react-router-dom'; import api from '../services/api'; import {useAuth} from '../context/AuthContext.jsx';
export default function Login(){const [f,setF]=useState({email:'',password:''}),[err,setErr]=useState(''),[busy,setBusy]=useState(false);const {login}=useAuth(),nav=useNavigate();
const submit=async e=>{e.preventDefault();
 if(!/^\S+@\S+\.\S+$/.test(f.email))return setErr('Enter a valid email');if(!f.password)return setErr('Password is required');
 setBusy(true);try{const r=await api.post('/auth/login',f);login(r.data);nav('/');}catch(x){setErr(x.message);}finally{setBusy(false);}};
return <div className="auth"><form className="panel" onSubmit={submit}><h1>💰 Expense Tracker</h1><h3>Login</h3>{err&&<div className="errbox">{err}</div>}
<label>Email<input value={f.email} onChange={e=>setF({...f,email:e.target.value})}/></label>
<label>Password<input type="password" value={f.password} onChange={e=>setF({...f,password:e.target.value})}/></label>
<button className="btn" disabled={busy}>{busy?'Signing in…':'Login'}</button><p>No account? <Link to="/register">Register</Link></p></form></div>;}
