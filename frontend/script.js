document.getElementById('prefsForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const prefs = {
    safety: +form.safety.value,
    nightlife: +form.nightlife.value,
    schools: +form.schools.value,
    affordability: +form.affordability.value,
    greenery: +form.greenery.value,  
  transport: +form.transport.value,
  };

  const res = await fetch('http://localhost:3000/match', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(prefs)
  });

  const matches = await res.json();
  localStorage.setItem('matches', JSON.stringify(matches));
  window.location.href = 'result.html';
});
