# 本機伺服器：關閉快取，並提供「存成筆記」的 Notion 待同步佇列
import http.server, functools, json, os, sys, time
ROOT = os.path.dirname(os.path.abspath(__file__))
QUEUE = os.path.join(ROOT, "data", "notion-queue.json")
PROGRESS = os.path.join(ROOT, "data", "course-progress.json")

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_POST(self):
        if self.path == "/api/course-progress":
            return self.course_progress()
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

    def course_progress(self):
        # 記錄上完的課程，給每週課程推薦排程參考
        try:
            item = json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0))) or b"{}")
            data = json.load(open(PROGRESS, encoding="utf-8")) if os.path.exists(PROGRESS) else {"completed": []}
            data["completed"] = [c for c in data["completed"] if c.get("id") != item.get("id")]
            if item.get("done"):
                data["completed"].append({k: item.get(k) for k in ("id", "title", "domain", "platform", "level")} | {"doneAt": time.strftime("%Y-%m-%d")})
            json.dump(data, open(PROGRESS, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
            body = json.dumps({"ok": True, "completed": len(data["completed"])}).encode()
            self.send_response(200)
        except Exception as e:
            body = json.dumps({"ok": False, "error": str(e)}).encode()
            self.send_response(400)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(body)

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8791
http.server.ThreadingHTTPServer(("127.0.0.1", port), functools.partial(Handler, directory=ROOT)).serve_forever()
