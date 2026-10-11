export const EXPENSE_CATS=['Food','Shopping','Transport','Education','Entertainment','Health','Bills','Rent','Travel','Groceries','Other'];
export const INCOME_CATS=['Salary','Freelance','Business','Investment','Other'];
export const METHODS=['Cash','UPI','Card','Bank Transfer'];
export const money=n=>'₹'+Number(n||0).toLocaleString('en-IN',{maximumFractionDigits:2});
export const COLORS=['#4f46e5','#10b981','#f59e0b','#ef4444','#06b6d4','#8b5cf6','#ec4899','#84cc16','#f97316','#14b8a6','#64748b'];
export function toast(msg,err=false){const d=document.createElement('div');d.className='toast'+(err?' err':'');d.textContent=msg;document.body.appendChild(d);setTimeout(()=>d.remove(),3000);}
