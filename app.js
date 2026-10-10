(function () {
  const FT = window.FT || {};
  const domains = FT.domains || [];
  // events.js 是私人檔，只存在本機；公開網站上載入失敗 → 公開模式
  const isPrivate = Array.isArray(FT.events);
  const events = FT.events || [];
  const jobs = [...(FT.privateJobs || []).map((j) => ({ ...j, private: true })), ...(FT.jobs || [])];
  const thesis = FT.thesis || [];
  const library = FT.library || [];
  if (!isPrivate) document.body.classList.add("public");

  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = (id, cls = "ic") => `<svg class="${cls}"><use href="#i-${id}"/></svg>`;
  const domainById = Object.fromEntries(domains.map((d) => [d.id, d]));
  const domainLabel = (id) => (domainById[id] ? `#${domainById[id].no} ${domainById[id].name}` : "綜合");

  // ---- 本機儲存（只存在這台瀏覽器）----
  const store = {
    get(k, def) { try { return JSON.parse(localStorage.getItem("ft:" + k)) ?? def; } catch { return def; } },
    set(k, v) { try { localStorage.setItem("ft:" + k, JSON.stringify(v)); } catch {} }
  };
  let progress = store.get("progress", {});
  let doneEvents = store.get("doneEvents", {});

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const todayStr = ymd(today);
  const parse = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const eventKey = (e) => e.date + "|" + e.title;

  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 2200);
  }

  // ---- 導覽列 ----
  $("#navToggle").onclick = () => $("#navLinks").classList.toggle("open");
  $("#navLinks").addEventListener("click", (e) => { if (e.target.tagName === "A") $("#navLinks").classList.remove("open"); });
  window.addEventListener("scroll", () => {
    const h = document.documentElement;
    $("#scrollBar").style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
  }, { passive: true });

  [["eventsUpdated", FT.eventsUpdated], ["jobsUpdated", FT.jobsUpdated], ["thesisUpdated", FT.thesisUpdated], ["libraryUpdated", FT.libraryUpdated]]
    .forEach(([id, v]) => { if (v && $("#" + id)) $("#" + id).textContent = "最後更新 " + v; });

  // ---- HERO ----
  function renderHeroCard() {
    $("#todayDate").textContent = today.toLocaleDateString("zh-TW", { month: "long", day: "numeric", weekday: "short" });
    if (isPrivate) {
      const end = new Date(today); end.setDate(end.getDate() + 7);
      const list = events
        .filter((e) => e.date && parse(e.date) >= today && parse(e.date) <= end && !doneEvents[eventKey(e)])
        .sort((a, b) => a.date.localeCompare(b.date));
      $("#upcomingList").innerHTML = list.length
        ? list.map((e) => `<li><span class="mini-date">${e.date.slice(5).replace("-", "/")}</span><span>${e.type === "todo" ? icon("check") + " " : ""}${esc(e.title)}</span></li>`).join("")
        : `<li class="mini-empty">這 7 天沒有排程，去學習路徑挑一件事做吧。</li>`;
    } else {
      $("#heroCardTitle").innerHTML = `${icon("book")} 最新知識點`;
      $("#heroMore").href = "#library"; $("#heroMore").textContent = "前往知識庫 →";
      $("#upcomingList").innerHTML = library.slice(0, 4).map((l) =>
        `<li><span class="mini-date">${esc(l.type)}</span><a href="#library">${esc(l.title)}</a></li>`).join("") || `<li class="mini-empty">知識庫準備中。</li>`;
    }
  }

  function renderTicker() {
    const items = domains.flatMap((d) => d.topics);
    const html = items.map((t) => `<span>${esc(t)}</span>`).join("");
    $("#ticker").innerHTML = html + html;
  }

  function countUp(el, target) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = target; return; }
    const start = performance.now(), dur = 900;
    (function f(now) {
      const p = Math.min(1, (now - start) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(f);
    })(start);
  }
  function renderStats() {
    const totalItems = domains.reduce((n, d) => n + d.path.reduce((m, l) => m + l.items.length, 0), 0);
    const doneItems = Object.values(progress).filter(Boolean).length;
    const openTodos = events.filter((e) => e.type === "todo" && !doneEvents[eventKey(e)]).length;
    const stats = [
      ["check", doneItems, `/${totalItems} 學習項目完成`],
      isPrivate ? ["calendar", openTodos, "未完成待辦"] : ["book", library.length, "篇知識整理"],
      ["briefcase", jobs.filter((j) => j.type !== "搜尋入口").length, "追蹤中的職缺"],
      ["compass", thesis.length, "論文線索"]
    ];
    $("#stats").innerHTML = stats.map(([ic, n, l]) => `<div class="stat">${icon(ic)}<b data-n="${n}">0</b><span>${l}</span></div>`).join("");
    $("#stats").querySelectorAll("b").forEach((b) => countUp(b, Number(b.dataset.n)));
  }

  // ---- 五大領域 ----
  const pathKey = (d, li, ii) => `${d.id}:${li}:${ii}`;
  function domainPct(d) {
    let total = 0, done = 0;
    d.path.forEach((l, li) => l.items.forEach((_, ii) => { total++; if (progress[pathKey(d, li, ii)]) done++; }));
    return total ? Math.round((done / total) * 100) : 0;
  }
  function renderDomains() {
    $("#domainGrid").innerHTML = domains.map((d) => {
      const pct = domainPct(d);
      return `<button class="domain-card" data-id="${d.id}">
        <span class="domain-no">0${d.no}</span>
        <div class="domain-icon">${icon(d.id)}</div>
        <h3>${esc(d.name)}</h3>
        <div class="domain-en">${esc(d.en)}</div>
        <p class="domain-tag">${esc(d.tagline)}</p>
        <div class="progress"><i style="width:${pct}%"></i></div>
        <div class="progress-label"><span>學習進度</span><span>${pct}%</span></div>
      </button>`;
    }).join("");
  }
  $("#domainGrid").addEventListener("click", (e) => {
    const card = e.target.closest(".domain-card");
    if (card) openDrawer(card.dataset.id);
  });

  function openDrawer(id) {
    const d = domainById[id];
    if (!d) return;
    const rel = [
      ...library.filter((l) => l.domain === id).map((l) => `<div class="related"><b>知識庫</b>${esc(l.title)}</div>`),
      ...(isPrivate ? events.filter((e) => e.domain === id).map((e) => `<div class="related"><b>行事曆</b>${esc(e.date || "")} ${esc(e.title)}</div>`) : []),
      ...jobs.filter((j) => j.domain === id).map((j) => `<div class="related"><b>職缺</b>${esc(j.company)}｜${esc(j.title)}</div>`),
      ...thesis.filter((t) => t.domain === id).map((t) => `<div class="related"><b>論文</b>${esc(t.headline)}</div>`)
    ];
    const noteCount = notesDB.notes.filter((n) => n.book === id).length;
    $("#drawerBody").innerHTML = `
      <div class="d-hero">
        <p class="eyebrow">0${d.no} · ${esc(d.en)}</p>
        <h2><span class="domain-icon">${icon(d.id)}</span>${esc(d.name)}</h2>
        <p>${esc(d.intro)}</p>
      </div>
      <div class="d-body">
        <h3>核心主題</h3>
        <div class="topics">${d.topics.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
        <h3>學習路徑</h3>
        ${d.path.map((l, li) => `<div class="level"><span class="level-name">${esc(l.level)}</span>
          ${l.items.map((it, ii) => { const k = pathKey(d, li, ii); return `<label class="check ${progress[k] ? "done" : ""}"><input type="checkbox" data-k="${k}" ${progress[k] ? "checked" : ""}><span>${esc(it)}</span></label>`; }).join("")}
        </div>`).join("")}
        <h3>推薦課程</h3>
        ${d.courses.map((c) => `<a class="course" target="_blank" rel="noopener" href="${(FT.platforms[c.platform] || "https://www.google.com/search?q=") + encodeURIComponent(c.q)}"><span>${esc(c.title)}</span><small>${esc(c.platform)} ↗</small></a>`).join("")}
        <h3>我的筆記</h3>
        <p>這個領域目前有 <b>${noteCount}</b> 則筆記。 <button class="link-btn" data-open-book="${d.id}">${icon("pen")} 打開${esc(d.name)}筆記本</button></p>
        <h3>論文關鍵字</h3>
        <div class="topics">${d.thesisKeywords.map((t) => `<span>🔎 ${esc(t)}</span>`).join("")}</div>
        <h3>相關動態</h3>
        ${rel.length ? rel.join("") : `<p class="empty">目前沒有相關資料。</p>`}
      </div>`;
    $("#drawer").classList.add("open"); $("#drawerBg").classList.add("open");
    $("#drawer").setAttribute("aria-hidden", "false");
  }
  function closeDrawer() {
    $("#drawer").classList.remove("open"); $("#drawerBg").classList.remove("open");
    $("#drawer").setAttribute("aria-hidden", "true");
  }
  $("#drawerClose").onclick = closeDrawer;
  $("#drawerBg").onclick = closeDrawer;
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });
  $("#drawerBody").addEventListener("change", (e) => {
    const k = e.target.dataset.k;
    if (!k) return;
    progress[k] = e.target.checked;
    store.set("progress", progress);
    e.target.closest(".check").classList.toggle("done", e.target.checked);
    renderDomains(); renderStats();
  });
  $("#drawerBody").addEventListener("click", (e) => {
    const b = e.target.closest("[data-open-book]");
    if (b) { closeDrawer(); selectBook(b.dataset.openBook); $("#notes").scrollIntoView(); }
  });

  // ---- 行事曆（僅本機）----
  let evFilter = "all", selDate = null;
  let calMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const typeName = { event: "活動", todo: "待辦", info: "資訊" };
  const srcName = { discord: "Discord", gmail: "Gmail", manual: "手動" };
  function renderEventFilters() {
    $("#eventFilters").innerHTML = [["all", "全部"], ["todo", "待辦"], ["event", "活動"], ["info", "資訊"]]
      .map(([v, l]) => `<button class="chip ${evFilter === v ? "on" : ""}" data-v="${v}">${l}</button>`).join("");
  }
  $("#eventFilters").addEventListener("click", (e) => {
    if (!e.target.dataset.v) return;
    evFilter = e.target.dataset.v; renderEventFilters(); renderEvents();
  });
  function renderCal() {
    const y = calMonth.getFullYear(), m = calMonth.getMonth();
    const dates = new Set(events.filter((e) => e.date).map((e) => e.date));
    const start = new Date(y, m, 1 - new Date(y, m, 1).getDay());
    let cells = "";
    for (let i = 0; i < 42; i++) {
      const d = new Date(start); d.setDate(start.getDate() + i);
      const s = ymd(d);
      const cls = ["cal-day", d.getMonth() !== m && "other", dates.has(s) && "has", s === todayStr && "today", s === selDate && "sel"].filter(Boolean).join(" ");
      cells += `<button class="${cls}" data-d="${dates.has(s) ? s : ""}">${d.getDate()}</button>`;
    }
    $("#cal").innerHTML = `
      <div class="cal-head"><button data-nav="-1" aria-label="上個月">‹</button><span>${y} 年 ${m + 1} 月</span><button data-nav="1" aria-label="下個月">›</button></div>
      <div class="cal-grid">${"日一二三四五六".split("").map((w) => `<div class="cal-dow">${w}</div>`).join("")}${cells}</div>`;
  }
  $("#cal").addEventListener("click", (e) => {
    const nav = e.target.dataset.nav;
    if (nav) { calMonth = new Date(calMonth.getFullYear(), calMonth.getMonth() + Number(nav), 1); renderCal(); return; }
    const d = e.target.dataset.d;
    if (d) { selDate = selDate === d ? null : d; renderCal(); renderEvents(); }
  });
  function renderEvents() {
    let list = events.filter((e) => evFilter === "all" || e.type === evFilter);
    if (selDate) list = list.filter((e) => e.date === selDate);
    list.sort((a, b) => (a.date || "9999").localeCompare(b.date || "9999"));
    $("#eventList").innerHTML = list.length ? list.map((e) => {
      const k = eventKey(e), done = !!doneEvents[k];
      const past = e.date && e.date < todayStr;
      return `<li class="event ${e.type} ${done ? "done" : ""}">
        <div class="event-top">
          <span class="badge ${e.type}">${typeName[e.type] || e.type}</span>
          <span>${e.date ? e.date.replace(/-/g, "/") : "未定日期"}${e.time ? " " + esc(e.time) : ""}${past ? "（已過）" : ""}</span>
          <span>· ${domainLabel(e.domain)}</span><span>· 來源 ${srcName[e.source] || esc(e.source)}</span>
        </div>
        <div class="event-title">${e.type === "todo" ? `<input type="checkbox" data-ek="${esc(k)}" ${done ? "checked" : ""} aria-label="完成">` : ""}<span>${esc(e.title)}</span></div>
        ${e.note ? `<p class="event-note">${esc(e.note)}</p>` : ""}
        ${e.link ? `<a href="${esc(e.link)}" target="_blank" rel="noopener">原始連結 ↗</a>` : ""}
      </li>`;
    }).join("") : `<li class="empty">${selDate ? selDate + " 沒有符合的項目" : "沒有符合的項目"}</li>`;
  }
  $("#eventList").addEventListener("change", (e) => {
    const k = e.target.dataset.ek;
    if (!k) return;
    doneEvents[k] = e.target.checked;
    store.set("doneEvents", doneEvents);
    renderEvents(); renderHeroCard(); renderStats();
  });

  // ---- 知識庫 ----
  const libCat = (t) => /論文|期刊/.test(t) ? "論文期刊" : /白皮書/.test(t) ? "白皮書" : /監理|準則|法規/.test(t) ? "監理文件" : /企業|研究報告/.test(t) ? "企業報告" : /新聞|報導/.test(t) ? "新聞報導" : "數據整理";
  const catIcon = { "論文期刊": "paper", "白皮書": "book", "監理文件": "landmark", "企業報告": "building", "新聞報導": "news", "數據整理": "chart" };
  let libType = "all", libDomain = "all";
  function renderLibFilters() {
    const cats = ["論文期刊", "白皮書", "企業報告", "監理文件", "新聞報導", "數據整理"].filter((c) => library.some((l) => libCat(l.type) === c));
    $("#libTypeFilters").innerHTML = [["all", "全部類型", library.length], ...cats.map((c) => [c, c, library.filter((l) => libCat(l.type) === c).length])]
      .map(([v, l, n]) => `<button class="chip ${libType === v ? "on" : ""}" data-t="${v}">${v !== "all" ? icon(catIcon[v]) : ""}${l}<span class="count">${n}</span></button>`).join("");
    $("#libDomainFilters").innerHTML = [["all", "全部領域"], ...domains.map((d) => [d.id, d.name])]
      .map(([v, l]) => `<button class="chip ${libDomain === v ? "on" : ""}" data-d="${v}">${v !== "all" ? icon(v) : ""}${esc(l)}</button>`).join("");
  }
  $("#libTypeFilters").addEventListener("click", (e) => { const b = e.target.closest("[data-t]"); if (b) { libType = b.dataset.t; renderLibFilters(); renderLibrary(); } });
  $("#libDomainFilters").addEventListener("click", (e) => { const b = e.target.closest("[data-d]"); if (b) { libDomain = b.dataset.d; renderLibFilters(); renderLibrary(); } });
  $("#libSearch").addEventListener("input", renderLibrary);
  function renderLibrary() {
    const q = $("#libSearch").value.trim().toLowerCase();
    const list = library.filter((l) =>
      (libType === "all" || libCat(l.type) === libType) && (libDomain === "all" || l.domain === libDomain) &&
      (!q || [l.title, l.source, l.type, ...(l.points || [])].join(" ").toLowerCase().includes(q)));
    $("#libGrid").innerHTML = list.length ? list.map((l) => {
      const i = library.indexOf(l), cat = libCat(l.type);
      return `<article class="lib">
        <div class="lib-top"><span class="lib-type">${icon(catIcon[cat])}</span>
          <div class="lib-meta"><b>${esc(l.type)} · ${esc(domainLabel(l.domain))}</b>${esc(l.source)} · ${esc(l.date)}</div></div>
        <h3>${esc(l.title)}</h3>
        <ul>${(l.points || []).map((p) => `<li>${icon("check")}${esc(p)}</li>`).join("")}</ul>
        <div class="lib-foot">
          <a href="${esc(l.link)}" target="_blank" rel="noopener">原文 ${icon("external")}</a>
          ${l.verify ? `<span class="verify">數字來自二手報導，引用前請查原文</span>` : ""}
          <button class="link-btn" data-lib="${i}">${icon("pen")} 存成筆記</button>
        </div>
      </article>`;
    }).join("") : `<p class="empty">沒有符合的資料。</p>`;
    observeStagger($("#libGrid"));
  }
  $("#libGrid").addEventListener("click", (e) => {
    const b = e.target.closest("[data-lib]");
    if (!b) return;
    const l = library[Number(b.dataset.lib)];
    const body = `> 來源：${l.source}（${l.date}）\n> ${l.link}\n\n## 知識點\n${(l.points || []).map((p) => "- " + p).join("\n")}\n\n## 我的想法\n- `;
    createNote(l.domain || "summary", l.title, body, [libCat(l.type)]);
  });

  // ---- 筆記 ----
  let notesDB = store.get("notes", null);
  if (!notesDB) {
    notesDB = { courses: [], notes: [{
      id: uid(), book: "summary", pinned: true, tags: ["使用說明"], updated: Date.now(),
      title: "👋 統整筆記怎麼用",
      body: "## 這裡是統整筆記\n- 左邊選**五大領域**或**課程**，各自獨立記筆記\n- 任何一則筆記按「收進統整」，就會同時出現在這裡\n- 知識庫、論文雷達的卡片可以按「存成筆記」，直接帶入知識點\n\n## 格式\n支援簡單 Markdown：`# 標題`、`- 清單`、`**粗體**`、`> 引用`、連結 [文字](網址)\n\n## 備份\n筆記只存在這台電腦的瀏覽器，記得定期按左下「匯出備份」。"
    }] };
  }
  let curBook = "summary", curNote = null, mode = "edit";
  function uid() { return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4); }
  function saveNotes() { store.set("notes", notesDB); }
  const bookName = (b) => b === "summary" ? "統整筆記" : b === "all" ? "全部筆記" : domainById[b] ? domainById[b].name : (notesDB.courses.find((c) => c.id === b) || {}).name || "未分類";
  const notesIn = (b) => b === "all" ? notesDB.notes : b === "summary" ? notesDB.notes.filter((n) => n.book === "summary" || n.pinned) : notesDB.notes.filter((n) => n.book === b);

  function renderBooks() {
    const btn = (id, ic, name, del) => `<button class="nb-book ${curBook === id ? "on" : ""}" data-book="${id}">${icon(ic)}<span>${esc(name)}</span><span class="n">${notesIn(id).length}</span>${del ? `<span class="del" data-delcourse="${id}" title="刪除課程筆記本">✕</span>` : ""}</button>`;
    $("#nbBooksMain").innerHTML = btn("summary", "layers", "統整筆記") + btn("all", "book", "全部筆記");
    $("#nbBooksDomain").innerHTML = domains.map((d) => btn(d.id, d.id, d.name)).join("");
    $("#nbBooksCourse").innerHTML = notesDB.courses.length ? notesDB.courses.map((c) => btn(c.id, "paper", c.name, true)).join("")
      : `<p class="nb-hint" style="padding:0 10px">按 + 新增課程，例如「金融科技概論」。</p>`;
  }
  function selectBook(b) { curBook = b; curNote = null; $("#noteSearch").value = ""; renderBooks(); renderNoteList(); renderEditor(); }
  document.querySelector(".nb-side").addEventListener("click", (e) => {
    const del = e.target.closest("[data-delcourse]");
    if (del) {
      e.stopPropagation();
      const id = del.dataset.delcourse, n = notesIn(id).length;
      if (!confirm(`刪除課程筆記本「${bookName(id)}」？${n ? `裡面的 ${n} 則筆記會移到「統整筆記」。` : ""}`)) return;
      notesDB.notes.forEach((x) => { if (x.book === id) x.book = "summary"; });
      notesDB.courses = notesDB.courses.filter((c) => c.id !== id);
      saveNotes(); selectBook("summary"); return;
    }
    const b = e.target.closest("[data-book]");
    if (b) selectBook(b.dataset.book);
  });
  $("#addCourse").onclick = () => {
    const name = (prompt("課程名稱（例如：金融科技概論、區塊鏈與智能合約）") || "").trim();
    if (!name) return;
    const c = { id: "c-" + uid(), name };
    notesDB.courses.push(c); saveNotes(); selectBook(c.id); toast(`已新增課程「${name}」`);
  };

  function renderNoteList() {
    $("#nbTitle").textContent = bookName(curBook);
    const q = $("#noteSearch").value.trim().toLowerCase();
    const list = notesIn(curBook)
      .filter((n) => !q || (n.title + n.body + (n.tags || []).join(" ")).toLowerCase().includes(q))
      .sort((a, b) => (b.pinned && curBook !== "summary") - (a.pinned && curBook !== "summary") || b.updated - a.updated);
    $("#noteList").innerHTML = list.length ? list.map((n) => `
      <li class="note-item ${curNote === n.id ? "on" : ""}" data-note="${n.id}">
        <b>${esc(n.title || "未命名筆記")}</b>
        <small>${n.pinned ? `<span class="pin">★ 統整</span>` : ""}${curBook === "all" || curBook === "summary" ? `<span>${esc(bookName(n.book))}</span>` : ""}<span>${new Date(n.updated).toLocaleDateString("zh-TW")}</span>${(n.tags || []).map((t) => `<span>#${esc(t)}</span>`).join("")}</small>
      </li>`).join("") : `<li class="nb-hint">${q ? "找不到符合的筆記" : "還沒有筆記，按「新筆記」開始。"}</li>`;
  }
  $("#noteList").addEventListener("click", (e) => {
    const li = e.target.closest("[data-note]");
    if (li) { curNote = li.dataset.note; mode = "edit"; renderNoteList(); renderEditor(); }
  });
  $("#noteSearch").addEventListener("input", renderNoteList);

  function createNote(book, title = "", body = "", tags = []) {
    const n = { id: uid(), book: book === "all" ? "summary" : book, title, body, tags, pinned: false, updated: Date.now() };
    notesDB.notes.push(n); saveNotes();
    curBook = n.book; curNote = n.id; mode = "edit";
    renderBooks(); renderNoteList(); renderEditor();
    if (title) { $("#notes").scrollIntoView(); toast(`已存到「${bookName(n.book)}」`); }
    setTimeout(() => (title ? $("#nbEditor textarea") : $("#nbEditor .title"))?.focus(), 50);
  }
  $("#newNote").onclick = () => createNote(curBook);

  function mdRender(src) {
    const inline = (s) => esc(s)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
      .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');
    let html = "", list = null;
    const close = () => { if (list) { html += `</${list}>`; list = null; } };
    for (const line of src.split("\n")) {
      let m;
      if ((m = line.match(/^(#{1,3})\s+(.*)/))) { close(); html += `<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`; }
      else if ((m = line.match(/^\s*[-*]\s+(.*)/))) { if (list !== "ul") { close(); html += "<ul>"; list = "ul"; } html += `<li>${inline(m[1])}</li>`; }
      else if ((m = line.match(/^\s*\d+\.\s+(.*)/))) { if (list !== "ol") { close(); html += "<ol>"; list = "ol"; } html += `<li>${inline(m[1])}</li>`; }
      else if ((m = line.match(/^>\s?(.*)/))) { close(); html += `<blockquote>${inline(m[1])}</blockquote>`; }
      else if (line.trim() === "") { close(); }
      else { close(); html += `<p>${inline(line)}</p>`; }
    }
    close();
    return html;
  }

  function bookOptions(sel) {
    const opt = (v, l) => `<option value="${v}" ${sel === v ? "selected" : ""}>${esc(l)}</option>`;
    return opt("summary", "統整筆記") + domains.map((d) => opt(d.id, d.name)).join("") + notesDB.courses.map((c) => opt(c.id, "課程｜" + c.name)).join("");
  }
  function renderEditor() {
    const n = notesDB.notes.find((x) => x.id === curNote);
    if (!n) {
      $("#nbEditor").innerHTML = `<div class="nb-empty">${icon("pen")}選一則筆記，或按「新筆記」開始寫。</div>`;
      return;
    }
    $("#nbEditor").innerHTML = `
      <input class="title" id="noteTitle" placeholder="筆記標題" value="${esc(n.title)}">
      <div class="nb-bar">
        <span>筆記本</span><select id="noteBook">${bookOptions(n.book)}</select>
        <span>標籤</span><input id="noteTags" placeholder="用逗號分隔" value="${esc((n.tags || []).join(", "))}">
        <span class="spacer"></span>
        <div class="seg"><button data-mode="edit" class="${mode === "edit" ? "on" : ""}">編輯</button><button data-mode="view" class="${mode === "view" ? "on" : ""}">預覽</button></div>
      </div>
      ${mode === "edit" ? `<textarea id="noteBody" placeholder="開始寫筆記…支援 # 標題、- 清單、**粗體**、> 引用">${esc(n.body)}</textarea>` : `<div class="md">${mdRender(n.body) || '<p class="nb-hint">（空白）</p>'}</div>`}
      <div class="nb-bar">
        <button class="mini-btn" id="notePin">${n.pinned ? "★ 已收進統整" : "☆ 收進統整"}</button>
        <button class="mini-btn" id="noteDel">${icon("trash")} 刪除</button>
        <span class="spacer"></span>
        <span class="saved" id="savedHint">已自動儲存 · ${new Date(n.updated).toLocaleString("zh-TW", { hour12: false })}</span>
      </div>`;
  }
  let saveTimer;
  function touch(n) {
    n.updated = Date.now();
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => { saveNotes(); renderNoteList(); renderBooks(); const h = $("#savedHint"); if (h) h.textContent = "已自動儲存 · " + new Date(n.updated).toLocaleString("zh-TW", { hour12: false }); }, 400);
  }
  $("#nbEditor").addEventListener("input", (e) => {
    const n = notesDB.notes.find((x) => x.id === curNote);
    if (!n) return;
    if (e.target.id === "noteTitle") n.title = e.target.value;
    else if (e.target.id === "noteBody") n.body = e.target.value;
    else if (e.target.id === "noteTags") n.tags = e.target.value.split(/[,，]/).map((s) => s.trim()).filter(Boolean);
    else return;
    touch(n);
  });
  $("#nbEditor").addEventListener("change", (e) => {
    if (e.target.id !== "noteBook") return;
    const n = notesDB.notes.find((x) => x.id === curNote);
    n.book = e.target.value; n.updated = Date.now(); saveNotes();
    curBook = n.book; renderBooks(); renderNoteList(); toast(`已移到「${bookName(n.book)}」`);
  });
  $("#nbEditor").addEventListener("click", (e) => {
    const n = notesDB.notes.find((x) => x.id === curNote);
    if (!n) return;
    const m = e.target.closest("[data-mode]");
    if (m) { mode = m.dataset.mode; renderEditor(); return; }
    if (e.target.closest("#notePin")) { n.pinned = !n.pinned; saveNotes(); renderEditor(); renderNoteList(); renderBooks(); toast(n.pinned ? "已收進統整筆記" : "已從統整筆記移除"); }
    if (e.target.closest("#noteDel")) {
      if (!confirm(`刪除「${n.title || "未命名筆記"}」？刪除後無法復原（除非你有匯出備份）。`)) return;
      notesDB.notes = notesDB.notes.filter((x) => x.id !== n.id); saveNotes();
      curNote = null; renderBooks(); renderNoteList(); renderEditor();
    }
  });

  function download(name, text, type) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type }));
    a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  $("#exportJson").onclick = () => { download(`craigs-fintech-notes-${todayStr}.json`, JSON.stringify(notesDB, null, 2), "application/json"); toast("已匯出備份檔"); };
  $("#exportMd").onclick = () => {
    const books = ["summary", ...domains.map((d) => d.id), ...notesDB.courses.map((c) => c.id)];
    const md = `# Craig's FinTech Lab 筆記（${todayStr}）\n\n` + books.map((b) => {
      const ns = notesDB.notes.filter((n) => n.book === b);
      return ns.length ? `# ${bookName(b)}\n\n` + ns.map((n) => `## ${n.title || "未命名筆記"}\n\n${n.body}\n`).join("\n") : "";
    }).filter(Boolean).join("\n---\n\n");
    download(`craigs-fintech-notes-${todayStr}.md`, md, "text/markdown");
    toast("已匯出 Markdown");
  };
  $("#importJson").onchange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    f.text().then((t) => {
      const d = JSON.parse(t);
      if (!Array.isArray(d.notes)) throw new Error("bad");
      if (!confirm(`匯入 ${d.notes.length} 則筆記？目前這台電腦上的筆記會被取代。`)) return;
      notesDB = { courses: d.courses || [], notes: d.notes }; saveNotes(); selectBook("summary"); toast("匯入完成");
    }).catch(() => toast("檔案格式不正確")).finally(() => { e.target.value = ""; });
  };

  // ---- 職缺 ----
  let jobFilter = "all";
  function renderJobFilters() {
    $("#jobFilters").innerHTML = [["all", "全部"], ...domains.map((d) => [d.id, d.name])]
      .map(([v, l]) => `<button class="chip ${jobFilter === v ? "on" : ""}" data-v="${v}">${v !== "all" ? icon(v) : ""}${esc(l)}</button>`).join("");
  }
  $("#jobFilters").addEventListener("click", (e) => { const b = e.target.closest("[data-v]"); if (b) { jobFilter = b.dataset.v; renderJobFilters(); renderJobs(); } });
  $("#jobSearch").addEventListener("input", renderJobs);
  function renderJobs() {
    const q = $("#jobSearch").value.trim().toLowerCase();
    const list = jobs.filter((j) => (jobFilter === "all" || j.domain === jobFilter || !j.domain) &&
      (!q || [j.company, j.title, j.note, j.location, j.type].join(" ").toLowerCase().includes(q)));
    $("#jobGrid").innerHTML = list.length ? list.map((j) => `
      <article class="job">
        <div class="job-company">${icon(j.domain || "briefcase")}${esc(j.company)}</div>
        <h3>${esc(j.title)}</h3>
        <div class="job-meta">${j.private ? `<span class="lock">🔒 實驗室內部</span>` : ""}<span>${esc(j.type)}</span><span>📍 ${esc(j.location)}</span>${j.status ? `<span>${esc(j.status)}</span>` : ""}</div>
        <p>${esc(j.note)}</p>
        <a href="${esc(j.link)}" target="_blank" rel="noopener">查看職缺 ${icon("external")}</a>
      </article>`).join("") : `<p class="empty">沒有符合的職缺。</p>`;
    observeStagger($("#jobGrid"));
  }

  // ---- 論文雷達 ----
  let thFilter = "all";
  function renderThesisFilters() {
    $("#thesisFilters").innerHTML = [["all", "全部"], ...domains.map((d) => [d.id, d.name])]
      .map(([v, l]) => `<button class="chip ${thFilter === v ? "on" : ""}" data-v="${v}">${v !== "all" ? icon(v) : ""}${esc(l)}</button>`).join("");
  }
  $("#thesisFilters").addEventListener("click", (e) => { const b = e.target.closest("[data-v]"); if (b) { thFilter = b.dataset.v; renderThesisFilters(); renderThesis(); } });
  function renderThesis() {
    const list = thesis.filter((t) => thFilter === "all" || t.domain === thFilter).sort((a, b) => b.date.localeCompare(a.date));
    $("#thesisList").innerHTML = list.length ? list.map((t) => `
      <article class="thesis">
        <div class="thesis-head">
          <div class="meta"><span>${t.date.replace(/-/g, "/")}</span><span class="badge">${icon(t.domain)} ${esc(domainLabel(t.domain))}</span><span>論文適配度 <span class="stars">${"★".repeat(t.fit || 0)}${"☆".repeat(5 - (t.fit || 0))}</span></span></div>
          <h3><a href="${esc(t.link)}" target="_blank" rel="noopener">${esc(t.headline)} ↗</a></h3>
        </div>
        <div class="fish">
          <div class="c"><h4>🐟 一吃：課堂素材</h4><p>${esc(t.classUse.replace(/^課堂：/, ""))}</p></div>
          <div class="t"><h4>🐟 二吃：論文切角</h4><p>${esc(t.thesisAngle.replace(/^論文：/, ""))}</p></div>
        </div>
        <div class="thesis-method"><span>${t.method ? `<b>可行方法：</b>${esc(t.method)}` : ""}</span><button class="link-btn" data-th="${thesis.indexOf(t)}">${icon("pen")} 存成筆記</button></div>
      </article>`).join("") : `<p class="empty">這個領域還沒有論文線索。</p>`;
    observeStagger($("#thesisList"));
  }
  $("#thesisList").addEventListener("click", (e) => {
    const b = e.target.closest("[data-th]");
    if (!b) return;
    const t = thesis[Number(b.dataset.th)];
    createNote(t.domain || "summary", "論文線索｜" + t.headline,
      `> ${t.date}｜${t.link}\n\n## 一吃：課堂素材\n${t.classUse.replace(/^課堂：/, "")}\n\n## 二吃：論文切角\n${t.thesisAngle.replace(/^論文：/, "")}\n\n## 可行方法\n${t.method || ""}\n\n## 我的想法\n- `, ["論文"]);
  });

  // ---- 課程平台（整理自 CLN 線上學習平台比較）----
  const platforms = [
    { name: "Coursera", fit: "最推薦", desc: "與美國名校合作，內容偏理論學術，證書受業界認可。", ft: "金融科技、區塊鏈、計量金融的專項課程最完整" },
    { name: "Udemy", fit: "實作", desc: "全球課程數最多，常有特價，字幕支援多種語言。", ft: "Python 金融、量化交易、Solidity 實作課多" },
    { name: "Hahow", fit: "中文", desc: "台灣原創平台，審核嚴格，品質穩定。", ft: "中文入門的投資理財、資料分析、區塊鏈課" },
    { name: "Shifu", fit: "財經", desc: "專注專業技能，業界講師授課，附講義與討論區。", ft: "財經投資、科技應用主題貼近台灣業界" },
    { name: "天下學習", fit: "趨勢", desc: "專家與 CEO 的實戰內容，涵蓋 AI 轉型、ESG。", ft: "永續金融、AI 轉型的管理面觀點" },
    { name: "Tibame", fit: "技能", desc: "數位人才培訓，提供線上、實體、直播三種上課方式。", ft: "資料分析、軟體開發基本功" },
    { name: "Yotta 友讀", fit: "商業", desc: "以商業與設計為主，課程從入門到進階編排完整。", ft: "商業模式、產品思維" },
    { name: "SAT. Knowledge", fit: "軟實力", desc: "資深前輩與 KOL 授課，價格偏高。", ft: "簡報、職場溝通，面試前可以補強" },
    { name: "Pressplay Academy", fit: "個人品牌", desc: "自媒體、個人品牌、影音剪輯，課程更新快。", ft: "經營 LinkedIn、分享研究成果" }
  ];
  function renderPlatforms() {
    $("#platformGrid").innerHTML = platforms.map((p) => `
      <div class="platform"><h3>${esc(p.name)}<span class="fit">${esc(p.fit)}</span></h3>
      <p>${esc(p.desc)}</p><p class="ft">${esc(p.ft)}</p></div>`).join("");
  }

  // ---- 動畫：捲動進場 + 導覽列目前區塊 ----
  const io = "IntersectionObserver" in window ? new IntersectionObserver((ents) => {
    ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.08 }) : null;
  function observeStagger(el) {
    if (!io) return;
    el.classList.add("stagger"); el.classList.remove("in"); io.observe(el);
  }
  document.querySelectorAll(".reveal").forEach((el) => io ? io.observe(el) : el.classList.add("in"));
  observeStagger($("#domainGrid")); observeStagger($("#platformGrid"));
  if ("IntersectionObserver" in window) {
    const links = [...document.querySelectorAll(".nav-links a")];
    const spy = new IntersectionObserver((ents) => {
      ents.forEach((en) => { if (en.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id)); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));
  }

  renderHeroCard(); renderTicker(); renderStats(); renderDomains();
  if (isPrivate) { renderEventFilters(); renderCal(); renderEvents(); }
  renderLibFilters(); renderLibrary();
  saveNotes(); renderBooks(); renderNoteList(); renderEditor();
  renderJobFilters(); renderJobs();
  renderThesisFilters(); renderThesis();
  renderPlatforms();
})();
