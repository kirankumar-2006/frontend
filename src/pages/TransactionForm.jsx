import {useEffect,useState} from 'react'; import {useNavigate,useParams} from 'react-router-dom'; import api from '../services/api'; import {toast,EXPENSE_CATS,INCOME_CATS,METHODS} from '../utils/helpers';
export default function TransactionForm(){const {id}=useParams(),nav=useNavigate();const [err,setErr]=useState(''),[busy,setBusy]=useState(false);
 const [f,setF]=useState({type:'EXPENSE',amount:'',category:'Food',date:new Date().toISOString().slice(0,10),paymentMethod:'Cash',description:''});
 useEffect(()=>{if(id)api.get('/transactions/'+id).then(r=>setF({...r.data,amount:String(r.data.amount),description:r.data.description||'',paymentMethod:r.data.paymentMethod||'Cash'})).catch(e=>setErr(e.message));},[id]);
 const cats=f.type==='INCOME'?INCOME_CATS:EXPENSE_CATS; const set=k=>e=>setF({...f,[k]:e.target.value});
 const submit=async e=>{e.preventDefault();if(!(Number(f.amount)>0))return setErr('Amount must be greater than 0');if(!f.date)return setErr('Date is required');
  setBusy(true);const body={type:f.type,amount:Number(f.amount),category:f.category,date:f.date,paymentMethod:f.paymentMethod,description:f.description};
  try{id?await api.put('/transactions/'+id,body):await api.post('/transactions',body);toast(id?'Transaction updated':'Transaction added');nav('/transactions');}catch(x){setErr(x.message);}finally{setBusy(false);}};
 return <><h1>{id?'Edit':'Add'} Transaction</h1><form className="panel form" onSubmit={submit}>{err&&<div className="errbox">{err}</div>}
 <label>Type<select value={f.type} onChange={e=>setF({...f,type:e.target.value,category:(e.target.value==='INCOME'?INCOME_CATS:EXPENSE_CATS)[0]})}><option value="INCOME">Income</option><option value="EXPENSE">Expense</option></select></label>
 <label>Amount<input type="number" step="0.01" value={f.amount} onChange={set('amount')}/></label>
 <label>Category<select value={f.category} onChange={set('category')}>{cats.map(c=><option key={c}>{c}</option>)}</select></label>
 <label>Date<input type="date" value={f.date} onChange={set('date')}/></label>
 <label>Payment Method<select value={f.paymentMethod} onChange={set('paymentMethod')}>{METHODS.map(c=><option key={c}>{c}</option>)}</select></label>
 <label>Description<input value={f.description} onChange={set('description')}/></label>
 <div className="bar"><button className="btn" disabled={busy}>{id?'Update':'Add Transaction'}</button><button type="button" className="btn light" onClick={()=>nav('/transactions')}>Cancel</button></div></form></>;}
