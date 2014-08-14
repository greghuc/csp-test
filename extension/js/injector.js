
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('Content script called - injecting script, css and iframe elements');

    var fromRemoteOrigin = function(file) {
        return 'http://localhost:6001' + file;
    }

    var doc = window.document;

    var injectedJs = doc.createElement('script');
    injectedJs.src = fromRemoteOrigin('/test.js');
    doc.getElementsByTagName('head')[0].appendChild(injectedJs);

    var injectedCss = doc.createElement('link');
    injectedCss.rel = 'stylesheet';
    injectedCss.href = fromRemoteOrigin('/test.css');
    doc.getElementsByTagName('head')[0].appendChild(injectedCss);

    var frame = doc.createElement('iframe');
    frame.src = fromRemoteOrigin('/frame.html');
    frame.style.top = '0px'
    frame.style.left = '0px'
    frame.style.zIndex = '100'
    frame.style.position = 'fixed'
    frame.style.width = '300px'
    frame.style.height = '100%'
    doc.body.appendChild(frame);

    console.log('Injection complete');
});
