console.log('Injected javascript tests transitive loading - injecting script, css and iframe elements');

var fromRemoteOrigin = function (file) {
    return 'http://assets.someremoteorigin.com:6001' + file + '?r=' + (Math.random() * 99999999);
}

var testJsInjection = function (doc) {
    var injectedJs = doc.createElement('script');
    injectedJs.src = fromRemoteOrigin('/transitive/test.js');
    doc.getElementsByTagName('head')[0].appendChild(injectedJs);
};

var testCssInjection = function (doc) {
    var injectedCss = doc.createElement('link');
    injectedCss.rel = 'stylesheet';
    injectedCss.href = fromRemoteOrigin('/transitive/test.css');
    doc.getElementsByTagName('head')[0].appendChild(injectedCss);
};

    var testIframeInjection = function(doc) {
        var frame = doc.createElement('iframe');
        frame.src = fromRemoteOrigin('/transitive/test.html');
        frame.style.top = '0px'
        frame.style.right = '0px'
        frame.style.zIndex = '100'
        frame.style.position = 'fixed'
        frame.style.width = '300px'
        frame.style.height = '100%'
        doc.body.appendChild(frame);
    };

var d = window.document;
testJsInjection(d);
testCssInjection(d);
testIframeInjection(d);

console.log('Transitive injection complete');
