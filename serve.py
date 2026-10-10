# 本機伺服器：關閉快取，並提供「存成筆記」的 Notion 待同步佇列
import http.server, functools, json, os, sys, time
ROOT = os.path.dirname(os.path.abspath(__file__))
QUEUE = os.path.join(ROOT, "data", "notion-queue.json")

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_POST(self):
        if self.path != "/api/notion-queue":
            self.send_error(404); return
        try:
            item = json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0))) or b"{}")
            item = {k: item.get(k) for k in ("title", "body", "domains", "type", "sourceType", "sourceOrg", "link", "published", "tags", "uses")}
            item["queuedAt"] = time.strftime("%Y-%m-%dT%H:%M:%S")
            queue = json.load(open(QUEUE, encoding="utf-8")) if os.path.exists(QUEUE) else []
            queue.append(item)
            json.dump(queue, open(QUEUE, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
            body = json.dumps({"ok": True, "queued": len(queue)}).encode()
            self.send_response(200)
        except Exception as e:
            body = json.dumps({"ok": False, "error": str(e)}).encode()
            self.send_response(400)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(body)

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8791
http.server.ThreadingHTTPServer(("127.0.0.1", port), functools.partial(Handler, directory=ROOT)).serve_forever()
