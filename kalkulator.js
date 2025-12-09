// kalkulator.js - saját interaktív program: utazásköltség-kalkulátor
document.addEventListener('DOMContentLoaded', () => {
  const nights = document.getElementById('nights');
  const people = document.getElementById('people');
  const accom = document.getElementById('accom');
  const travel = document.getElementById('travel');
  const entry = document.getElementById('entry');
  const calcBtn = document.getElementById('calcBtn');
  const saveBtn = document.getElementById('saveBtn');
  const result = document.getElementById('calcResult');

  function formatFt(n){ return n.toLocaleString('hu-HU') + ' Ft'; }

  function calculate(){
    const n = Math.max(1, parseInt(nights.value,10)||1);
    const p = Math.max(1, parseInt(people.value,10)||1);
    const a = Math.max(0, parseFloat(accom.value)||0);
    const t = Math.max(0, parseFloat(travel.value)||0);
    const e = Math.max(0, parseFloat(entry.value)||0);

    const accomTotal = a * n;
    const travelTotal = t * p;
    const entryTotal = e * n;
    const total = accomTotal + travelTotal + entryTotal;
    const perPerson = total / p;

    return {n,p,a,t,e,accomTotal,travelTotal,entryTotal,total,perPerson};
  }

  function render(){
    const r = calculate();
    result.innerHTML = `
      <h3>Eredmény</h3>
      <ul>
        <li>Szállás összesen: ${formatFt(r.accomTotal)}</li>
        <li>Utazás összesen: ${formatFt(r.travelTotal)}</li>
        <li>Belépők összesen: ${formatFt(r.entryTotal)}</li>
        <li><strong>Teljes költség: ${formatFt(r.total)}</strong></li>
        <li>Költség / fő: ${formatFt(Math.round(r.perPerson))}</li>
      </ul>
    `;
  }

  calcBtn.addEventListener('click', render);

  saveBtn.addEventListener('click', () => {
    const r = calculate();
    const saved = JSON.parse(localStorage.getItem('tripPlans') || '[]');
    saved.push({date: new Date().toISOString(), summary: r});
    localStorage.setItem('tripPlans', JSON.stringify(saved));
    alert('Mentve a böngészőben (localStorage).');
  });

  [nights, people, accom, travel, entry].forEach(el => el && el.addEventListener('input', render));
  render();
});
