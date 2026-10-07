export const Loading=()=><div className="state">Loading…</div>;
export const ErrorBox=({msg})=><div className="state errbox">⚠ {msg}</div>;
export const Empty=({text})=><div className="state">{text}</div>;
export const Card=({label,value,cls=''})=><div className={'card '+cls}><span>{label}</span><b>{value}</b></div>;
