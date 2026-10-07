import {useState} from 'react'; import api from '../services/api'; import useFetch from '../hooks/useFetch'; import {Loading,ErrorBox,Empty} from '../components/Ui.jsx'; import {money,toast} from '../utils/helpers';
const now=new Date();
export default function Budget(){const {data,loading,error,reload}=useFetch('/budgets');const [f,setF]=useState({id:null,month:now.getMonth()+1,year:now.getFullYear(),amount:''}),[err,setErr]=useState('');
 const submit=async e=>{e.preventDefault();if(!(Number(f.amount)>0))return setErr('Budget amount must be greater than 0');
  const body={month:+f.month,year:+f.year,amount:+f.amount};try{f.id?await api.put('/budgets/'+f.id,body):await api.post('/budgets',body);toast(f.id?'Budget updated':'Budget created');setF({...f,id:null,amount:''});setErr('');reload();}catch(x){setErr(x.message);}};
 const del=async b=>{if(!window.confirm('Delete this budget?'))return;try{await api.delete('/budgets/'+b.id);toast('Budget deleted');reload();}catch(x){toast(x.message,true);}};
 return <><h1>Monthly Budgets</h1><form className="panel form" onSubmit={submit}>{err&&<div className="errbox">{err}</div>}
 <label>Month<input type="number" min="1" max="12" value={f.month} onChange={e=>setF({...f,month:e.target.value})}/></label>
 <label>Year<input type="number" value={f.year} onChange={e=>setF({...f,year:e.target.value})}/></label>
 <label>Amount<input type="number" value={f.amount} onChange={e=>setF({...f,amount:e.target.value})}/></label>
 <div className="bar"><button className="btn">{f.id?'Update Budget':'Create Budget'}</button>{f.id&&<button type="button" className="btn light" onClick={()=>setF({...f,id:null,amount:''})}>Cancel</button>}</div></form>
 {loading?<Loading/>:error?<ErrorBox msg={error}/>:!data.length?<Empty text="No budgets yet"/>:data.map(b=>{const p=Math.min(100,Math.round(b.used/b.amount*100));const w=b.used/b.amount;
 return <div className="panel" key={b.id}><div className="bar"><h3>{b.month}/{b.year} — {money(b.amount)}</h3><div><button className="link" onClick={()=>setF({id:b.id,month:b.month,year:b.year,amount:String(b.amount)})}>Edit</button> <button className="link" onClick={()=>del(b)}>Delete</button></div></div>
 <div className="progress"><div style={{width:p+'%',background:w>=1?'#ef4444':w>=0.8?'#f59e0b':'#10b981'}}/></div>
 <p>Used {money(b.used)} ({p}%) · Remaining {money(b.remaining)}</p>{w>=1?<div className="errbox">Budget exceeded!</div>:w>=0.8&&<div className="errbox">⚠ Approaching budget limit</div>}</div>;})}</>;}
