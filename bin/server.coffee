http = require 'http'
fs = require 'fs'
send = require 'send'
url = require 'url'

rootDir = process.argv[2]

console.log "Running server for directory: #{rootDir}"

app = http.createServer((req, res) ->
  console.log "Request: #{req.url}"

  error = (err) ->
    console.log "Error: #{req.url}"
    res.statusCode = err.status or 500
    res.end err.message

  headers = (res, path, stat) ->
    # Most paranoid CSP header
#    res.setHeader 'Content-Security-Policy', "default-src 'none';"
    # Whitelist remote domain for script, frame and style
    REMOTE_ORIGIN = "http://assets.someremoteorigin.com:6001"
    res.setHeader 'Content-Security-Policy', "default-src 'none'; script-src #{REMOTE_ORIGIN}; frame-src #{REMOTE_ORIGIN}; style-src #{REMOTE_ORIGIN};"

  send(req, url.parse(req.url).pathname, { root: rootDir })
    .on 'error', error
    .on 'headers', headers
    .pipe res

).listen 6001, '0.0.0.0'