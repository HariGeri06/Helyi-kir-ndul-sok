// form-validation.js - natív JS validáció (legalább 5 mező validálása)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const messages = document.getElementById('formMessages');

  function showMessage(msg, ok=true){
    messages.textContent = msg;
    messages.style.color = ok ? 'green' : 'crimson';
  }

  function validateDateNotPast(value){
    if(!value) return false;
    const d = new Date(value);
    const today = new Date(); today.setHours(0,0,0,0);
    return d >= today;
  }

  if(!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const people = Number(form.people.value);
    const date = form.date.value;
    const type = form.type.value;

    if(name.length < 2){ showMessage('A név túl rövid.', false); return; }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ showMessage('Érvénytelen email.', false); return; }
    if(!Number.isInteger(people) || people < 1){ showMessage('A résztvevők száma legalább 1 kell legyen.', false); return; }
    if(!validateDateNotPast(date)){ showMessage('Érvénytelen vagy múltbeli dátum.', false); return; }
    if(type === ''){ showMessage('Válasszon túratípust.', false); return; }

    showMessage('Sikeres beküldés! Hamarosan felvesszük Önnel a kapcsolatot.');
    form.reset();
  });
});
