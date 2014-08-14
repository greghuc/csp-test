chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('Content script called - injecting script, css and iframe elements');

    var fromRemoteOrigin = function(file) {
        return 'http://assets.someremoteorigin.com:6001' + file + '?r=' + (Math.random() * 99999999);
    }

    var testJsInjection = function(doc) {
        var injectedJs = doc.createElement('script');
        injectedJs.src = fromRemoteOrigin('/test.js');
        doc.getElementsByTagName('head')[0].appendChild(injectedJs);
    };

    var testSandboxJsInjection = function(doc) {
        var sandbox = doc.createElement('iframe');
        sandbox.style.display = 'none';
        sandbox.onload = function() {
            var iDoc = sandbox.contentWindow.document
            var sandboxedJs = doc.createElement('script');
            sandboxedJs.src = fromRemoteOrigin('/test-sandbox.js');
            iDoc.getElementsByTagName('head')[0].appendChild(sandboxedJs);
        };
        doc.body.appendChild(sandbox);
    };

    var testCssInjection = function(doc) {
        var injectedCss = doc.createElement('link');
        injectedCss.rel = 'stylesheet';
        injectedCss.href = fromRemoteOrigin('/test.css');
        doc.getElementsByTagName('head')[0].appendChild(injectedCss);
    };

    var testIframeInjection = function(doc) {
        var frame = doc.createElement('iframe');
        frame.src = fromRemoteOrigin('/frame.html');
        frame.style.top = '0px'
        frame.style.left = '0px'
        frame.style.zIndex = '100'
        frame.style.position = 'fixed'
        frame.style.width = '300px'
        frame.style.height = '100%'
        doc.body.appendChild(frame);
    };

    var d = window.document;
    testJsInjection(d);
    testSandboxJsInjection(d);
    testCssInjection(d);
    testIframeInjection(d);

    console.log('Injection complete');
});
