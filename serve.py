#!/usr/bin/env python3
"""Cross-platform local server launcher for the GCC Value MVP Framework.

Run with: python3 serve.py  (or double-click on Windows if .py files are
associated with Python, otherwise run "python serve.py" from a terminal).

Opening index.html directly (file://) does not work: browsers block local
pages from loading the app's script files. This starts a local web server
and opens the app in the default browser instead.
"""
import http.server
import os
import socketserver
import webbrowser

os.chdir(os.path.dirname(os.path.abspath(__file__)))

port = 8000
while True:
    try:
        httpd = socketserver.TCPServer(("", port), http.server.SimpleHTTPRequestHandler)
        break
    except OSError:
        port += 1

url = "http://localhost:{}/".format(port)
print("GCC Value MVP is running at " + url)
print("Keep this window open while using the app. Press Ctrl+C to stop the server.")
webbrowser.open(url)
httpd.serve_forever()
