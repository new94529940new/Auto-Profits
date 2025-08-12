import React, { useEffect, useState } from 'react'

export default function Dashboard(){
  const [items,setItems] = useState([])
  useEffect(()=>{ (async()=>{
    const r = await fetch('/api/confirm'); const d = await r.json(); setItems(d.items||[])
  })() },[])

  return (
    <div className="container">
      <h1>لوحة التحكم — سجل المدفوعات (Supabase)</h1>
      <div className="card" style={{marginTop:12}}>
        <table style={{width:'100%', borderCollapse:'collapse'}}>
          <thead>
            <tr>
              <th style={{textAlign:'left', padding:'8px'}}>التاريخ</th>
              <th style={{textAlign:'left', padding:'8px'}}>الطريقة</th>
              <th style={{textAlign:'left', padding:'8px'}}>المبلغ</th>
              <th style={{textAlign:'left', padding:'8px'}}>المرجع</th>
              <th style={{textAlign:'left', padding:'8px'}}>ملاحظة</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r,i)=>(
              <tr key={i} style={{borderTop:'1px solid #e5e7eb'}}>
                <td style={{padding:'8px'}}>{new Date(r.ts).toLocaleString()}</td>
                <td style={{padding:'8px'}}>{r.method}</td>
                <td style={{padding:'8px'}}>{r.amount}</td>
                <td style={{padding:'8px'}}>{r.reference||'-'}</td>
                <td style={{padding:'8px'}}>{r.note||'-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length===0 && <p style={{marginTop:12,color:'#6b7280'}}>لا يوجد سجلات بعد.</p>}
      </div>
    </div>
  )
}
