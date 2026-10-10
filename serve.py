# 本機伺服器：關閉快取，排程更新 data/*.js 後重新整理就能看到
import http.server, functools, os, sys
class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()
port = int(sys.argv[1]) if len(sys.argv) > 1 else 8791
root = os.path.dirname(os.path.abspath(__file__))
http.server.ThreadingHTTPServer(("127.0.0.1", port), functools.partial(NoCache, directory=root)).serve_forever()
