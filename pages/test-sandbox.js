var doc = window.parent.document;

var p = doc.createElement('p');
p.innerHTML = 'I-WAS-INJECTED-IN-SANDBOX';
doc.body.appendChild(p);