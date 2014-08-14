var doc = window.document;

var p = doc.createElement('p');
p.innerHTML = 'I-WAS-INJECTED-FROM-TRANSITIVE-JS';
doc.body.appendChild(p);