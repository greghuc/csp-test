document.addEventListener('DOMContentLoaded', function() {
    var doc = window.document;

    var p = doc.createElement('p');
    p.innerHTML = 'HELLO';
    doc.body.appendChild(p);

    var frame = doc.createElement('iframe');
    frame.src = 'http://localhost:6001/frame.html';
    frame.style.top = '0px'
    frame.style.left = '0px'
    frame.style.zIndex = '100'
    frame.style.position = 'fixed'
    frame.style.width = '300px'
    frame.style.height = '100%'
    doc.body.appendChild(frame);
});

