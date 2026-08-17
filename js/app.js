const APPS = [
  { id: 'calculator', title: 'Hesap Makinesi' },
  { id: 'fibonacci', title: 'Fibonacci' },
  { id: 'qr', title: 'QR Oluşturucu' }
  // diğer uygulamalar burada eklenecek
];

function renderMenu(){
  const menu = document.getElementById('app-menu');
  menu.innerHTML = '';
  APPS.forEach(a=>{
    const btn = document.createElement('button');
    btn.textContent = a.title;
    btn.className = 'menu-btn';
    btn.addEventListener('click', ()=> loadApp(a.id));
    menu.appendChild(btn);
  });
}

async function loadApp(name){
  const container = document.getElementById('app-container');
  const transition = document.getElementById('page-transition');
  transition.classList.add('active');
  try{
    const res = await fetch(`apps/${name}.html`);
    if(!res.ok) throw new Error('Yükleme hatası');
    const html = await res.text();
    // küçük bir bekleme ile geçiş efekti göster
    await new Promise(r=>setTimeout(r,200));
    container.innerHTML = html;
    // modül varsa import edip init fonksiyonunu çağır
    try{
      const mod = await import(`./modules/${name}.js`);
      if(mod && typeof mod.init === 'function') mod.init();
      else if(typeof mod.default === 'function') mod.default();
    }catch(e){
      // modül yoksa hata vermeyelim
      console.info('Modül yok veya init hatası', e);
    }
  }catch(err){
    container.innerHTML = `<p>Uygulama yüklenemedi: ${err.message}</p>`;
  }finally{
    transition.classList.remove('active');
    // göster geri tuşu
    const back = document.getElementById('back-to-menu');
    if(back) back.style.display = 'block';
  }
}

window.addEventListener('DOMContentLoaded', ()=>{
  renderMenu();
  const back = document.getElementById('back-to-menu');
  if(back) back.addEventListener('click', ()=>{
    document.getElementById('app-container').innerHTML = '';
    back.style.display = 'none';
  });
  // varsayılan uygulama
  loadApp('calculator');
});
