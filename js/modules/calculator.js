export function init(){
  const display = document.querySelector('.calc-display');
  if(!display) return;
  // temizle
  display.textContent = '';

  function append(v){ display.textContent = (display.textContent || '') + v; }
  function clear(){ display.textContent = ''; }
  function evaluate(){
    try{
      // Güvenlik: eval kullanımı basit örnek için, gerçek projede expression parser önerilir
      const result = Function('return (' + display.textContent + ')')();
      display.textContent = String(result);
    }catch(e){ display.textContent = 'Hata'; }
  }

  document.querySelectorAll('.calc-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const v = btn.dataset.value;
      if(v === 'C') return clear();
      if(v === '=') return evaluate();
      append(v);
    });
  });
}

// otomatik init: module import edildiğinde çalışması yeterli
// not: app.js modülü import edip init fonksiyonunu çağırıyor
