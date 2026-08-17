// Basit storage wrapper: IndexedDB eklenecek, şu anda localStorage fallback kullanılıyor
const DB = {
  async set(key, value){
    try{ localStorage.setItem(key, JSON.stringify(value)); }
    catch(e){ console.error('DB set error', e); }
  },
  async get(key){
    try{ const v = localStorage.getItem(key); return v? JSON.parse(v): null; }
    catch(e){ console.error('DB get error', e); return null; }
  },
  async remove(key){ try{ localStorage.removeItem(key); }catch(e){ /* ignore */ } }
};

export default DB;
