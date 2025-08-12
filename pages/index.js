export default function Home(){
  return (
    <div className="container">
      <span className="badge">Auto Profit v4 — Supabase</span>
      <h1 style={{margin:'12px 0 8px',fontSize:36,lineHeight:1.2}}>تشغيل فوري + تخزين سحابي تلقائي</h1>
      <p style={{maxWidth:760,color:'#374151'}}>تأكيدات الدفع تُحفظ تلقائيًا في Supabase وتظهر في لوحة التحكم.</p>
      <div style={{display:'flex',gap:12,marginTop:16,flexWrap:'wrap'}}>
        <a className="btn" href="/payments">الدفع الآن / التبرع</a>
        <a className="btn secondary" href="/dashboard">لوحة التحكم</a>
      </div>
      <footer>© {new Date().getFullYear()} Auto Profit v4</footer>
    </div>
  )
}
