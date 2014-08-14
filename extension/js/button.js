chrome.browserAction.onClicked.addListener(function(tab) {
    console.log('Button clicked');
    chrome.tabs.sendMessage(tab.id, { command: 'inject' }, function (response) {
        console.log('Got response from content script');
    });
});
