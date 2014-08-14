var doc = window.document;

var p = doc.createElement('p');
p.innerHTML = 'I-WAS-INJECTED';
doc.body.appendChild(p);