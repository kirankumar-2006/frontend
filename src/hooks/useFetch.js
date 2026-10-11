import {useEffect,useState,useCallback} from 'react'; import api from '../services/api';
export default function useFetch(url,params){const [data,setData]=useState(null),[loading,setLoading]=useState(true),[error,setError]=useState('');
const key=JSON.stringify(params);
const load=useCallback(()=>{setLoading(true);api.get(url,{params}).then(r=>{setData(r.data);setError('');}).catch(e=>setError(e.message)).finally(()=>setLoading(false));},[url,key]);
useEffect(load,[load]);return {data,loading,error,reload:load};}
