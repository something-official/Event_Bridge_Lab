const target = document.querySelector('#target');
const log = document.querySelector('#log');
const status = document.querySelector('#status');
const reset = document.querySelector('#reset');
const emit = document.querySelector('#emit');
let entries = [];
function addEntry(name, detail = '') { entries.unshift(`${name}${detail ? ` · ${detail}` : ''}`); entries = entries.slice(0, 8); log.innerHTML = entries.map((entry) => `<li>${entry}</li>`).join(''); status.textContent = `Last event: ${entries[0]}`; }
['pointerenter', 'pointerleave', 'focus', 'blur'].forEach((name) => target.addEventListener(name, () => addEntry(name)));
target.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') addEntry('keydown', event.key); });
target.addEventListener('click', () => addEntry('click', 'default action'));
target.addEventListener('bridge:ping', (event) => addEntry('bridge:ping', event.detail));
emit.addEventListener('click', () => target.dispatchEvent(new CustomEvent('bridge:ping', { detail: 'custom payload' })));
reset.addEventListener('click', () => { entries = []; log.innerHTML = ''; status.textContent = 'Event log reset.'; });
