// === Kuesioner GIMB – Logic ===
const form = document.getElementById('form');
const btnDownload = document.getElementById('btnDownload');
const btnPrint = document.getElementById('btnPrint');
const btnReset = document.getElementById('btnReset');
const storageKey = 'kuesioner_gimb';
document.getElementById('year').textContent = new Date().getFullYear();

// Load saved from localStorage
(function loadSaved(){
  const saved = localStorage.getItem(storageKey);
  if (!saved) return;
  const data = JSON.parse(saved);
  for (const [k,v] of Object.entries(data)) {
    const els = form.elements[k];
    if (!els) continue;
    if (els instanceof RadioNodeList) {
      // Handle checkbox groups
      if (Array.isArray(v)) {
        [...form.querySelectorAll('input[type=checkbox][name="'+k+'"]')]
          .forEach(el => { el.checked = v.includes(el.value); });
      } else if (typeof v === 'string') {
        [...form.querySelectorAll('input[type=radio][name="'+k+'"]')]
          .forEach(el => { el.checked = (el.value === v); });
      } else if (els.length === undefined) {
        els.value = v;
      }
    } else if (els.type === 'checkbox') {
      els.checked = !!v;
    } else {
      els.value = v;
    }
  }
})();

function snapshot(){
  const data = {};
  const fields = new FormData(form);
  // FormData ignores unchecked boxes/radios; collect checkbox groups manually
  const checkGroups = {};
  form.querySelectorAll('input[type=checkbox][name]').forEach(cb => {
    const n = cb.name;
    checkGroups[n] = checkGroups[n] || [];
    if (cb.checked) checkGroups[n].push(cb.value);
  });
  for (const [k,v] of fields.entries()) data[k] = v;
  for (const [k,v] of Object.entries(checkGroups)) data[k] = v;
  // Additional linked fields
  const extra = ['pm_kendala','pm_brand_desc','layananLain'];
  extra.forEach(n => { const el = form.elements[n]; if (el) data[n] = el.value || ''; });
  localStorage.setItem(storageKey, JSON.stringify(data));
  return data;
}

form.addEventListener('input', snapshot);
form.addEventListener('change', snapshot);

btnDownload.addEventListener('click', (e)=>{
  e.preventDefault();
  const data = snapshot();
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const d = new Date().toISOString().slice(0,10);
  a.href = url; a.download = 'kuesioner_gimb_'+d+'.json';
  a.click();
  URL.revokeObjectURL(url);
});

btnPrint.addEventListener('click', (e)=>{
  e.preventDefault();
  window.print();
});

btnReset.addEventListener('click', (e)=>{
  e.preventDefault();
  if (confirm('Hapus semua isian?')){
    localStorage.removeItem(storageKey);
    form.reset();
  }
});
