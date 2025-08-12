import React, { useState } from 'react'

export default function Payments(){
  const BANK_IBAN = process.env.NEXT_PUBLIC_BANK_IBAN || 'OM930270344005368570053'
  const BANK_NAME = process.env.NEXT_PUBLIC_BANK_NAME || 'Bank Muscat'
  const BANK_SWIFT = process.env.NEXT_PUBLIC_BANK_SWIFT || 'BMUSOMRXXXX'
  const BENEFICIARY = process.env.NEXT_PUBLIC_BENEFICIARY_NAME || 'MOHAMMED IBRAHIM MOHAMMED AL SALAMI'
  const PAYPAL_ME_URL = process.env.NEXT_PUBLIC_PAYPAL_ME_URL || 'https://paypal.me/SokaLiwa'

  const [method,setMethod] = useState('bank')
  const [amount,setAmount] = useState('25')
  const [ref,setRef] = useState('')
  const [note,setNote] = useState('')
  const [out,setOut] = useState('')

  const copy = (txt)=>navigator.clipboard.writeText(txt)

  async function confirmPayment(){
    setOut('')
    try{
      const r = await fetch('/api/confirm',{method:'POST',headers:{'Content-Type':'application/json'},
        body: JSON.stringify({method, amount: Number(amount), reference: ref, note})})
      const d = await r.json()
      setOut(JSON.stringify(d,null,2))
    }catch(e){
      setOut('Error: '+e.message)
    }
  }

  return (
    <div className="container">
      <h1>طرق الدفع + تأكيد الدفع (سحابي)</h1>
      <div className="grid" style={{marginTop:16}}>
        <div className="card">
          <h3>تحويل بنكي مباشر (USD)</h3>
          <div style={{display:'grid',gap:8}}>
            <div><strong>المستفيد:</strong> {BENEFICIARY}</div>
            <div><strong>البنك:</strong> {BANK_NAME}</div>
            <div><strong>IBAN:</strong> {BANK_IBAN} <button className="btn" onClick={()=>copy(BANK_IBAN)} style={{marginLeft:8}}>نسخ</button></div>
            <div><strong>SWIFT:</strong> {BANK_SWIFT}</div>
          </div>
        </div>

        <div className="card">
          <h3>PayPal Business</h3>
          <a className="btn" href={PAYPAL_ME_URL} target="_blank" rel="noreferrer">الدفع عبر PayPal</a>
          <div style={{display:'flex',gap:8,marginTop:10,flexWrap:'wrap'}}>
            {[5,10,25].map(v=>(
              <a key={v} className="btn secondary" href={`${PAYPAL_ME_URL}/${v}`} target="_blank" rel="noreferrer">{`$${v}`}</a>
            ))}
          </div>
        </div>

        <div className="card" style={{gridColumn:'1 / -1'}}>
          <h3>تأكيد الدفع</h3>
          <div style={{display:'grid',gap:10,maxWidth:560}}>
            <div>
              <label>طريقة الدفع</label>
              <select className="input" value={method} onChange={e=>setMethod(e.target.value)}>
                <option value="bank">تحويل بنكي</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
            <div>
              <label>المبلغ (USD)</label>
              <input className="input" value={amount} onChange={e=>setAmount(e.target.value)} />
            </div>
            <div>
              <label>مرجع العملية (اختياري: رقم الحوالة/لقطة شاشة)</label>
              <input className="input" value={ref} onChange={e=>setRef(e.target.value)} placeholder="مثال: رقم العملية أو رابط صورة" />
            </div>
            <div>
              <label>ملاحظة</label>
              <textarea className="input" value={note} onChange={e=>setNote(e.target.value)} placeholder="أي تفاصيل إضافية"></textarea>
            </div>
            <button className="btn" onClick={confirmPayment}>تأكيد الدفع الآن</button>
            {out && <pre className="success">{out}</pre>}
          </div>
        </div>
      </div>
    </div>
  )
}
