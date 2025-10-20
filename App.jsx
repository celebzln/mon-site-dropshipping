import React, { useState, useEffect } from 'react'

const BRAND = {
  name: 'NovaTrend',
  tagline: 'Les produits tendance du moment, livrés chez vous',
  primary: '#2563eb',
  accent: '#facc15',
  email: 'contact@novatrend.example'
}

const SAMPLE_PRODUCTS = [
  { id: 'p1', title: 'Montre connectée NovaFit Pro', price: 39.90, img: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=800&q=60', short: 'Suivi santé, notifications et autonomie prolongée.' },
  { id: 'p2', title: 'Lampe Lune 3D NovaLight', price: 29.90, img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=60', short: 'Lampe décorative 3D, télécommande et plusieurs intensités.' },
  { id: 'p3', title: 'Épilateur à lumière pulsée NovaSkin', price: 59.90, img: 'https://images.unsplash.com/photo-1616627569967-7a6a6f6c3f43?w=800&q=60', short: 'Réduction visible des poils après quelques utilisations.' },
  { id: 'p4', title: 'Enceinte Bluetooth waterproof NovaSound', price: 34.90, img: 'https://images.unsplash.com/photo-1518444023064-0f6f9d6d2d6b?w=800&q=60', short: 'Son puissant, résistante à l'eau, parfaite pour l'extérieur.' },
  { id: 'p5', title: 'Brosse nettoyante visage NovaGlow', price: 24.90, img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=60', short: 'Peau nettoyée en profondeur et meilleure absorption des soins.' }
]

export default function App(){
  const [products, setProducts] = useState(SAMPLE_PRODUCTS)
  const [cart, setCart] = useState([])
  const [tab, setTab] = useState('home')

  useEffect(()=>{
    try{ const raw = localStorage.getItem('nova_cart'); if(raw) setCart(JSON.parse(raw)) }catch(e){}
  },[])
  useEffect(()=>{ try{ localStorage.setItem('nova_cart', JSON.stringify(cart)) }catch(e){} },[cart])

  function addToCart(p){ setCart(c=>{ const f=c.find(x=>x.id===p.id); if(f) return c.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x); return [...c,{...p,qty:1}] }) }
  function changeQty(id, d){ setCart(c=>c.map(x=>x.id===id?{...x,qty:Math.max(1,x.qty+d)}:x)) }
  function removeItem(id){ setCart(c=>c.filter(x=>x.id!==id)) }

  const subtotal = cart.reduce((s,it)=>s+it.price*it.qty,0)

  function checkout(){
    if(cart.length===0) return alert('Votre panier est vide.')
    // Simulation - redirect to a checkout simulation URL
    alert('Simulation de paiement (mode test). Dans un vrai déploiement, le site appelle endpoint serveur Stripe.')
    window.open('https://example.com/checkout-simulated', '_blank')
  }

  return (<div style={{fontFamily:'Inter, system-ui, Arial', background:'#f8fafc', minHeight:'100vh'}}>
    <header style={{background:'#fff', boxShadow:'0 2px 6px rgba(0,0,0,0.06)'}}>
      <div style={{maxWidth:1100, margin:'0 auto', padding:'18px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <div style={{width:48,height:48,background:BRAND.primary, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700}}>NT</div>
          <div>
            <div style={{fontSize:20, fontWeight:700}}>{BRAND.name}</div>
            <div style={{fontSize:12, color:'#6b7280'}}>{BRAND.tagline}</div>
          </div>
        </div>
        <nav style={{display:'flex', gap:12, alignItems:'center'}}>
          <button onClick={()=>setTab('home')} style={{background:'transparent', border:'none', cursor:'pointer'}}>Accueil</button>
          <button onClick={()=>setTab('shop')} style={{background:'transparent', border:'none', cursor:'pointer'}}>Boutique</button>
          <button onClick={()=>setTab('contact')} style={{background:'transparent', border:'none', cursor:'pointer'}}>Contact</button>
          <button onClick={()=>setTab('cart')} style={{background:BRAND.primary, color:'#fff', padding:'8px 12px', borderRadius:8, border:'none', cursor:'pointer'}}>Panier ({cart.reduce((s,it)=>s+it.qty,0)})</button>
        </nav>
      </div>
    </header>

    <main style={{maxWidth:1100, margin:'24px auto', padding:18}}>
      {tab==='home' && <section style={{display:'flex', gap:24, alignItems:'center'}}>
        <div style={{flex:1}}>
          <h1 style={{fontSize:34, margin:0}}>Bienvenue sur {BRAND.name}</h1>
          <p style={{color:'#374151'}}>Les meilleures trouvailles sélectionnées pour vous. Livraison rapide et service client réactif.</p>
          <div style={{marginTop:18}}>
            <button onClick={()=>setTab('shop')} style={{background:BRAND.primary,color:'#fff',border:'none',padding:'10px 14px',borderRadius:8,cursor:'pointer'}}>Visiter la boutique</button>
          </div>
        </div>
        <div style={{flex:'0 0 420px'}}>
          <img src={products[0].img} alt='' style={{width:'100%',borderRadius:12, boxShadow:'0 8px 30px rgba(16,24,40,0.08)'}}/>
        </div>
      </section>}

      {tab==='shop' && <section>
        <h2>Produits populaires</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:18,marginTop:12}}>
          {products.map(p=> (
            <div key={p.id} style={{background:'#fff', padding:12, borderRadius:10}}>
              <img src={p.img} alt='' style={{width:'100%', height:160, objectFit:'cover', borderRadius:8}}/>
              <div style={{marginTop:10}}>
                <div style={{fontWeight:700}}>{p.title}</div>
                <div style={{color:'#6b7280', fontSize:13}}>{p.short}</div>
                <div style={{marginTop:8, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div style={{fontWeight:700}}>{p.price.toFixed(2)} €</div>
                  <div style={{display:'flex', gap:8}}>
                    <button onClick={()=>addToCart(p)} style={{background:BRAND.primary,color:'#fff',border:'none',padding:'8px 12px',borderRadius:8,cursor:'pointer'}}>Ajouter</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>}

      {tab==='cart' && <section>
        <h2>Votre panier</h2>
        {cart.length===0 && <div style={{color:'#6b7280'}}>Votre panier est vide.</div>}
        {cart.map(item=> (
          <div key={item.id} style={{background:'#fff', padding:12, borderRadius:10, display:'flex', gap:12, marginTop:10}}>
            <img src={item.img} alt='' style={{width:100,height:80,objectFit:'cover',borderRadius:8}}/>
            <div style={{flex:1}}>
              <div style={{fontWeight:700}}>{item.title}</div>
              <div style={{color:'#6b7280'}}>{item.price.toFixed(2)} €</div>
              <div style={{marginTop:8, display:'flex', gap:8, alignItems:'center'}}>
                <button onClick={()=>changeQty(item.id,-1)} style={{padding:6}}>−</button>
                <div>{item.qty}</div>
                <button onClick={()=>changeQty(item.id,1)} style={{padding:6}}>+</button>
                <button onClick={()=>removeItem(item.id)} style={{marginLeft:12,color:'#ef4444'}}>Suppr.</button>
              </div>
            </div>
          </div>
        ))}

        <div style={{marginTop:12, background:'#fff', padding:12, borderRadius:10}}>
          <div style={{display:'flex', justifyContent:'space-between', fontWeight:700}}>Sous-total <span>{subtotal.toFixed(2)} €</span></div>
          <div style={{marginTop:10}}>
            <button onClick={checkout} style={{background:BRAND.accent,color:'#000',padding:10,borderRadius:8,border:'none',cursor:'pointer'}}>Procéder au paiement (simulation)</button>
          </div>
        </div>
      </section>}

      {tab==='contact' && <section>
        <h2>Contact</h2>
        <div style={{background:'#fff', padding:12, borderRadius:10}}>
          <p>Pour toute question : <a href={'mailto:'+BRAND.email}>{BRAND.email}</a></p>
          <p>Adresse : Exemple - Paris, France</p>
        </div>
      </section>}

    </main>

    <footer style={{background:'#fff', marginTop:40, padding:18}}>
      <div style={{maxWidth:1100, margin:'0 auto', display:'flex', justifyContent:'space-between'}}>
        <div>© {new Date().getFullYear()} {BRAND.name}. Tous droits réservés.</div>
        <div style={{color:'#6b7280'}}>CGV · Politique de confidentialité</div>
      </div>
    </footer>
  </div>)
}
