# 35 in 1 — Split into files

Bu PR, tek bir büyük HTML dosyasını daha yönetilebilir bir yapıya böler:

- index.html — uygulama kabuğu ve menü
- css/styles.css — tüm stil kuralları
- js/app.js — uygulama yükleyici / menü logic
- js/db.js — basit storage wrapper (localStorage, ileride IndexedDB eklenebilir)
- js/modules/* — her uygulama için modül (örnek: calculator.js)
- apps/* — uygulama partial HTML dosyaları (örnek: calculator.html)
- assets/* — manifest ve ikon

Nasıl test edilir
1. Branch'i çekin: `git fetch && git checkout split/css-js-db`
2. Basit bir statik sunucu ile dizini açın (ör: `npx http-server` veya `python -m http.server`)
3. Tarayıcıda `http://localhost:8080` (port sunucuya göre değişir) açın.

Notlar
- Mevcut PR örnek olarak 3 uygulama (hesap makinesi, fibonacci, qr) için yapılandırmayı başlatır. Diğer uygulamaları aynı pattern ile `apps/` ve `js/modules/` altına ekleyeceğim.
- Güvenlik: Basit hesap makinesi için expression değerlendirmesi fonksiyon ile yapıldı; production için expression parser önerilir.
