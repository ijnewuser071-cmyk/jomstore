import { useMemo, useState } from 'react'
import { ArrowRight, Box, ChevronRight, Menu, Search, ShoppingBag, Sparkles, User, X } from 'lucide-react'

type Product = {
  id: number
  category: string
  title: string
  description: string
  price: string
  oldPrice?: string
  tag?: string
  visual: string
}

const products: Product[] = [
  { id: 1, category: 'Design & Social Media', title: 'Pack Social Media Pro', description: 'Templates profissionais para transformar sua presença nas redes.', price: 'R$ 47,90', oldPrice: 'R$ 79,90', tag: 'JOM ORIGINAL', visual: 'SOCIAL\nMEDIA' },
  { id: 2, category: 'Marketing Digital', title: 'Kit Presença Digital', description: 'Recursos selecionados para fortalecer sua marca no digital.', price: 'R$ 67,90', oldPrice: 'R$ 97,90', tag: 'OFERTA DE PARCEIRO', visual: 'DIGITAL\nKIT' },
  { id: 3, category: 'Criação de Sites', title: 'Site Profissional JOM', description: 'Seu negócio com uma presença digital moderna, rápida e responsiva.', price: 'A partir de R$ 497', tag: 'SERVIÇO JOM', visual: 'YOUR\nWEBSITE' },
]

const categories = ['Todos', 'Packs de vídeos', 'Packs de fotos', 'Templates', 'Sites personalizáveis']

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todos')
  const [cart, setCart] = useState(0)

  const filtered = useMemo(() => products.filter(p => {
    const q = query.toLowerCase().trim()
    const matchesQuery = !q || `${p.title} ${p.description} ${p.category}`.toLowerCase().includes(q)
    const matchesCategory = category === 'Todos' || (category === 'Sites personalizáveis' ? p.category === 'Criação de Sites' : true)
    return matchesQuery && matchesCategory
  }), [query, category])

  return <div className="app-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header className="topbar">
      <a className="brand" href="#top" aria-label="JOM Store"><span>JOM</span><b>STORE</b></a>
      <nav className="desktop-nav"><a href="#produtos">Produtos</a><a href="#sites">Sites</a><a href="#beneficios">Benefícios</a><a href="#suporte">Suporte</a></nav>
      <div className="header-actions"><button className="icon-button" aria-label="Minha conta"><User size={19}/></button><button className="cart-button"><ShoppingBag size={18}/><span>Carrinho</span><b>{cart}</b></button><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></div>
    </header>
    {menuOpen && <nav className="mobile-nav"><a href="#produtos" onClick={()=>setMenuOpen(false)}>Produtos</a><a href="#sites">Sites</a><a href="#beneficios">Benefícios</a><a href="#suporte">Suporte</a></nav>}

    <main id="top">
      <section className="hero">
        <div className="eyebrow"><Sparkles size={14}/> JOM STORE · DIGITAL BY NATURE</div>
        <h1>SEU PRÓXIMO<br/><em>PROJETO</em> COMEÇA<br/>AQUI.</h1>
        <p>Packs, templates e sites para quem quer transformar uma boa ideia em uma presença digital que chama atenção.</p>
        <div className="hero-actions"><a className="primary" href="#produtos">Explorar produtos <ArrowRight size={18}/></a><a className="secondary" href="#sites">Encontre seu site</a></div>
        <div className="hero-stamp"><span>CREATE</span><strong>SOMETHING</strong><span>DIFFERENT.</span></div>
      </section>

      <section className="ticker" aria-hidden="true"><div>CREATE SOMETHING DIFFERENT ✦ RECURSOS DIGITAIS ✦ POSSIBILIDADES REAIS ✦ JOM STORE ✦</div></section>

      <section className="benefits" id="beneficios">
        <div><Box/><span>01</span><h3>JOM ORIGINALS</h3><p>Recursos pensados para você começar melhor e criar mais rápido.</p></div>
        <div><Sparkles/><span>02</span><h3>MAIS TEMPO PARA CRIAR</h3><p>Materiais prontos para acelerar projetos sem perder personalidade.</p></div>
        <div><ShoppingBag/><span>03</span><h3>TUDO EM UM SÓ LUGAR</h3><p>Produtos digitais, serviços e sua futura biblioteca JOM.</p></div>
      </section>

      <section className="store" id="produtos">
        <div className="section-heading"><div><small>EXPLORE · ESCOLHA · CRIE</small><h2>Seu próximo grande <i>projeto.</i></h2></div><p>Recursos para tirar ideias do papel e colocar sua marca em movimento.</p></div>
        <div className="store-tools">
          <label className="search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar produtos"/></label>
          <div className="chips">{categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div>
        </div>
        <div className="product-grid">
          {filtered.map((p, index)=><article className={`product-card card-${index+1}`} key={p.id}>
            <div className="product-visual"><span className="product-tag">{p.tag}</span><div className="visual-grid"/><strong>{p.visual.split('\n').map((x,i)=><span key={i}>{x}</span>)}</strong><div className="orb"/></div>
            <div className="product-copy"><small>{p.category}</small><h3>{p.title}</h3><p>{p.description}</p><div className="price-row"><div>{p.oldPrice&&<del>{p.oldPrice}</del>}<strong>{p.price}</strong></div><button onClick={()=>setCart(v=>v+1)} aria-label={`Adicionar ${p.title}`}><ChevronRight/></button></div></div>
          </article>)}
        </div>
      </section>

      <section className="site-cta" id="sites"><div><small>UMA PRESENÇA DIGITAL COM A SUA CARA</small><h2>Seu negócio merece<br/>um site <em>à altura.</em></h2><p>Da primeira ideia ao lançamento. Uma experiência digital criada para apresentar sua marca e gerar oportunidades.</p><a href="#suporte">Quero meu site <ArrowRight size={18}/></a></div><div className="browser-mock"><div className="browser-bar"><i/><i/><i/></div><div className="mock-brand">JOM</div><h3>MAKE YOUR<br/>BUSINESS <span>VISIBLE.</span></h3><div className="mock-line"/><div className="mock-button">COMEÇAR AGORA</div></div></section>
    </main>

    <footer id="suporte"><div className="footer-brand"><span>JOM</span><b>STORE</b><p>Recursos digitais.<br/>Ideias sem limites.</p></div><div><strong>LOJA</strong><a href="#produtos">Produtos</a><a href="#sites">Sites personalizáveis</a><a href="#beneficios">Benefícios</a></div><div><strong>AJUDA</strong><a href="#suporte">Central de ajuda</a><a href="#suporte">Suporte</a><a href="#suporte">Minha conta</a></div><div className="footer-end"><small>© 2026 JOM STORE</small><p>FEITO PARA CRIAR ✦</p></div></footer>
  </div>
}
