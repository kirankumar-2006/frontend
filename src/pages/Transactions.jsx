import {useState} from 'react'; import {Link} from 'react-router-dom'; import api from '../services/api'; import useFetch from '../hooks/useFetch';
import {Loading,ErrorBox,Empty} from '../components/Ui.jsx'; import {money,toast,EXPENSE_CATS,INCOME_CATS} from '../utils/helpers';
export default function Transactions(){const [f,setF]=useState({search:'',category:'',type:'',date:''}),[page,setPage]=useState(0);
 const params=Object.fromEntries(Object.entries({...f,page,size:8}).filter(([,v])=>v!==''));
 const {data,loading,error,reload}=useFetch('/transactions',params); const set=k=>e=>{setF({...f,[k]:e.target.value});setPage(0);};
 const del=async t=>{if(!window.confirm(`Delete this ${t.category} transaction?`))return;try{await api.delete('/transactions/'+t.id);toast('Transaction deleted');reload();}catch(e){toast(e.message,true);}};
 const cats=[...new Set([...EXPENSE_CATS,...INCOME_CATS])];
 return <><div className="bar"><h1>Transactions</h1><Link className="btn" to="/transactions/new">+ Add</Link></div>
 <div className="filters"><input placeholder="Search…" value={f.search} onChange={set('search')}/>
 <select value={f.category} onChange={set('category')}><option value="">All categories</option>{cats.map(c=><option key={c}>{c}</option>)}</select>
 <select value={f.type} onChange={set('type')}><option value="">All types</option><option value="INCOME">Income</option><option value="EXPENSE">Expense</option></select>
 <input type="date" value={f.date} onChange={set('date')}/></div>
 {loading?<Loading/>:error?<ErrorBox msg={error}/>:!data.content.length?<Empty text="No transactions found"/>:<>
 <div className="scroll"><table><thead><tr><th>Date</th><th>Type</th><th>Category</th><th>Amount</th><th>Payment</th><th>Description</th><th>Actions</th></tr></thead><tbody>
 {data.content.map(t=><tr key={t.id}><td>{t.date}</td><td><span className={'tag '+t.type}>{t.type}</span></td><td>{t.category}</td><td>{money(t.amount)}</td><td>{t.paymentMethod}</td><td>{t.description}</td>
 <td className="act"><Link to={`/transactions/${t.id}/edit`}>Edit</Link><button className="link" onClick={()=>del(t)}>Delete</button></td></tr>)}</tbody></table></div>
 <div className="pager"><button className="btn light" disabled={page===0} onClick={()=>setPage(page-1)}>Prev</button><span>Page {page+1} of {Math.max(data.totalPages,1)}</span><button className="btn light" disabled={page+1>=data.totalPages} onClick={()=>setPage(page+1)}>Next</button></div></>}</>;}
