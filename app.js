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
  // ---- 品牌 logo：依名稱關鍵字對應官方網域，抓網站圖示；抓不到就顯示字母徽章 ----
  const BRANDS = [
    [/coursera/i, "coursera.org"], [/udemy/i, "udemy.com"], [/edx/i, "edx.org"], [/hahow/i, "hahow.in"], [/tibame/i, "tibame.com"],
    [/pressplay/i, "pressplay.cc"], [/天下學習/, "cwlearning.com.tw"], [/yotta|友讀/i, "yottau.com.tw"],
    [/wharton|華頓/i, "wharton.upenn.edu"], [/university of pennsylvania|upenn/i, "upenn.edu"], [/hkust|香港科技/i, "hkust.edu.hk"],
    [/edhec/i, "edhec.edu"], [/michigan/i, "umich.edu"], [/toronto/i, "utoronto.ca"],
    [/\bBIS\b/, "bis.org"], [/\bIMF\b/, "imf.org"], [/\bBCG\b/, "bcg.com"], [/mckinsey/i, "mckinsey.com"], [/swift/i, "swift.com"],
    [/gallagher/i, "ajg.com"], [/ntt data/i, "nttdata.com"], [/\bNBER\b/, "nber.org"], [/treasury/i, "treasury.gov"], [/\bNGFS\b/, "ngfs.net"],
    [/ISSB|IFRS/, "ifrs.org"], [/金管會|銀行局/, "fsc.gov.tw"], [/央行|中央銀行/, "cbc.gov.tw"], [/證交所|證券交易所/, "twse.com.tw"],
    [/經濟日報/, "udn.com"], [/business insider/i, "businessinsider.com"], [/cerulli/i, "cerulli.com"], [/\bAAII\b/, "aaii.com"],
    [/juniper/i, "juniperresearch.com"], [/\bESMA\b/, "esma.europa.eu"], [/world bank|世界銀行/i, "worldbank.org"], [/\bFSB\b/, "fsb.org"],
    [/\bOECD\b/, "oecd.org"], [/deloitte|勤業/i, "deloitte.com"], [/\bPwC\b|資誠/i, "pwc.com"], [/\bKPMG\b|安侯/i, "kpmg.com"], [/\bEY\b|安永/, "ey.com"],
    [/HSBC|滙豐/i, "hsbc.com.tw"], [/第一銀行/, "firstbank.com.tw"], [/DBS|星展/i, "dbs.com.tw"], [/富邦/, "fubon.com"], [/花旗|citi/i, "citi.com"],
    [/玉山/, "esunbank.com"], [/永豐/, "sinopac.com"], [/國泰/, "cathayholdings.com"], [/中國信託|中信/, "ctbcbank.com"], [/台新/, "taishinbank.com.tw"],
    [/point72/i, "point72.com"], [/^104/, "104.com.tw"], [/^cake/i, "cake.me"], [/^yourator/i, "yourator.co"], [/政大|NCCU/i, "nccu.edu.tw"]
  ];
  // 這些網站只是轉載 / 人力銀行 / 學校公告，不代表品牌本身
  const AGGREGATORS = /yes123|career\.ntu|cd\.nccu|money\.udn|104\.com|yourator|cake\.me|indeed|linkedin|classcentral|careers360|course\.careers|onestopesg|jakeclaver|walnutinvest|google\./;
  function brandDomain(name, link, allowHost = true) {
    for (const [re, d] of BRANDS) if (re.test(name || "")) return d;
    if (!allowHost || !link) return "";
    try { const h = new URL(link).hostname.replace(/^www\./, ""); return AGGREGATORS.test(h) ? "" : h; } catch { return ""; }
  }
  function logo(name, link, allowHost = true, cls = "") {
    const d = brandDomain(name, link, allowHost);
    const letter = esc((String(name || "?").replace(/[^\p{L}\p{N}]/gu, "")[0] || "?").toUpperCase());
    return d ? `<span class="brand ${cls}" data-letter="${letter}"><img src="https://www.google.com/s2/favicons?domain=${encodeURIComponent(d)}&sz=64" alt="" loading="lazy" referrerpolicy="no-referrer"></span>`
             : `<span class="brand ${cls} letter">${letter}</span>`;
  }
  document.addEventListener("error", (e) => {
    const img = e.target;
    if (img.tagName === "IMG" && img.parentElement?.classList.contains("brand")) { const b = img.parentElement; b.classList.add("letter"); b.textContent = b.dataset.letter; }
  }, true);
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
    // 相關動態：依類型分組，每組最多 4 筆，行事曆只顯示未來的項目
    const WD = "日一二三四五六";
    const dchip = (d) => { if (!d) return ""; const x = parse(d); return `<span class="rel-date"><b>${x.getMonth() + 1}/${x.getDate()}</b><small>週${WD[x.getDay()]}</small></span>`; };
    const relGroups = [
      { label: "行事曆", ic: "calendar", href: "#calendar", show: isPrivate,
        items: events.filter((e) => e.domain === id && (!e.date || e.date >= todayStr)).sort((a, b) => (a.date || "9").localeCompare(b.date || "9"))
          .map((e) => ({ lead: dchip(e.date), title: e.title, meta: [typeName[e.type], e.time].filter(Boolean).join("・") })) },
      { label: "知識庫", ic: "book", href: "#library", show: true,
        items: library.filter((l) => l.domain === id).map((l) => ({ lead: logo(l.source, l.link), title: l.title, meta: `${l.type}・${l.date}` })) },
      { label: "論文雷達", ic: "compass", href: "#thesis", show: true,
        items: thesis.filter((t) => t.domain === id).sort((a, b) => b.date.localeCompare(a.date)).map((t) => ({ lead: logo("", t.link), title: t.headline, meta: `${t.date.slice(5).replace("-", "/")}・適配度 ${"★".repeat(t.fit || 0)}` })) },
      { label: "職缺", ic: "briefcase", href: "#jobs", show: true,
        items: jobs.filter((j) => j.domain === id).map((j) => ({ lead: logo(j.company, j.link), title: j.title, meta: j.company })) }
    ].filter((g) => g.show && g.items.length);
    const relHtml = relGroups.map((g) => `
      <div class="rel-group">
        <div class="rel-head">${icon(g.ic)}<span>${g.label}</span><em>${g.items.length}</em><a href="${g.href}" data-close-drawer>看全部 →</a></div>
        <ul class="rel-list">${g.items.slice(0, 4).map((it) => `<li>${it.lead}<div class="rel-body"><p>${esc(it.title)}</p><small>${esc(it.meta)}</small></div></li>`).join("")}</ul>
      </div>`).join("");
    const noteCount = notesIn(id).length;
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
        ${activeCourses(d.id).length ? activeCourses(d.id).map((c) => `<a class="course" target="_blank" rel="noopener" href="${esc(c.link)}">${logo(c.platform, "", false)}<span>${esc(c.title)}<br><small class="muted">${esc(c.provider)}・${esc(c.level)}</small></span><small>${esc(c.platform)} ↗</small></a>`).join("") : `<p class="empty">這週的課都上完了 🎉 下週一會推薦新的。</p>`}
        <p><a class="link-btn" href="#courses" data-close-drawer>${icon("arrow")} 看本週全部推薦課程</a></p>
        <h3 class="private-only">我的筆記</h3>
        <p class="private-only">這個領域目前有 <b>${noteCount}</b> 則筆記。 <button class="link-btn" data-open-book="${d.id}">${icon("pen")} 打開${esc(d.name)}筆記本</button></p>
        <h3>論文關鍵字</h3>
        <div class="topics">${d.thesisKeywords.map((t) => `<span>🔎 ${esc(t)}</span>`).join("")}</div>
        <h3>相關動態</h3>
        ${relHtml || `<p class="empty">目前沒有相關資料。</p>`}
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
    if (e.target.closest("[data-close-drawer]")) closeDrawer();
    const b = e.target.closest("[data-open-book]");
    if (b) { closeDrawer(); selectBook(b.dataset.openBook); $("#notes").scrollIntoView(); }
  });

  // ---- 行事曆（僅本機）----
  let evFilter = "all", selDate = null;
  let calMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const typeName = { event: "活動", todo: "待辦", info: "資訊" };
  const srcName = { discord: "Discord", gmail: "Gmail", accupass: "Accupass", web: "活動雷達", manual: "手動" };
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
      return `<li class="event ${e.type} ${done ? "done" : ""} ${past ? "past" : ""}" ${!past && e.date ? `data-upcoming="1"` : ""}>
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
    const upcoming = list.filter((e) => !e.date || e.date >= todayStr).length;
    $("#eventCount").innerHTML = `共 <b>${list.length}</b> 筆・即將到來 <b>${upcoming}</b> 筆`;
    syncEventPanel();
    if (!selDate) scrollEventsToToday(false);
  }
  // 桌機：右側清單高度對齊左側月曆，超出的部分在面板內捲動
  function syncEventPanel() {
    const panel = $("#eventPanel"), list = $("#eventList");
    if (matchMedia("(min-width: 881px)").matches) {
      const head = panel.querySelector(".event-panel-head").offsetHeight, foot = panel.querySelector(".event-panel-foot").offsetHeight;
      list.style.maxHeight = Math.max(360, $("#cal").offsetHeight - head - foot) + "px";
    } else list.style.maxHeight = "";
    panel.classList.toggle("scrollable", list.scrollHeight > list.clientHeight + 4);
    updateEventFades();
  }
  function updateEventFades() {
    const list = $("#eventList"), panel = $("#eventPanel");
    panel.classList.toggle("at-top", list.scrollTop < 4);
    panel.classList.toggle("at-bottom", list.scrollTop + list.clientHeight >= list.scrollHeight - 4);
  }
  function scrollEventsToToday(smooth) {
    const list = $("#eventList"), first = list.querySelector("[data-upcoming]");
    if (!first) return;
    const top = first.offsetTop - list.offsetTop - 4;
    if (smooth) list.scrollTo({ top, behavior: "smooth" });
    else { list.style.scrollBehavior = "auto"; list.scrollTop = top; list.style.scrollBehavior = ""; }
    updateEventFades();
  }
  $("#eventList").addEventListener("scroll", updateEventFades, { passive: true });
  $("#eventToToday").addEventListener("click", () => { selDate = null; renderCal(); renderEvents(); scrollEventsToToday(true); });
  window.addEventListener("resize", () => { if (isPrivate) syncEventPanel(); });
  window.addEventListener("load", () => { if (isPrivate) { syncEventPanel(); scrollEventsToToday(false); } });
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
        <div class="lib-top">${logo(l.source, l.link, true, "lg")}<span class="lib-type sm" title="${esc(cat)}">${icon(catIcon[cat])}</span>
          <div class="lib-meta"><b>${esc(l.type)} · ${esc(domainLabel(l.domain))}</b>${esc(l.source)} · ${esc(l.date)}</div></div>
        <h3>${esc(l.title)}</h3>
        <ul>${(l.points || []).map((p) => `<li>${icon("check")}${esc(p)}</li>`).join("")}</ul>
        <div class="lib-foot">
          <a href="${esc(l.link)}" target="_blank" rel="noopener">原文 ${icon("external")}</a>
          ${l.verify ? `<span class="verify">數字來自二手報導，引用前請查原文</span>` : ""}
          <button class="link-btn private-only" data-lib="${i}">${icon("pen")} 存成筆記</button>
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
    createNote(l.domain, l.title, body, { type: "📄 文獻筆記", sourceType: srcTypeOpt[libCat(l.type)] || "", sourceOrg: l.source, link: l.link, published: /^\d{4}-\d{2}(-\d{2})?$/.test(l.date) ? (l.date.length === 7 ? l.date + "-01" : l.date) : "", uses: ["📚 自學"] });
  });

  // ---- 筆記（Notion 同步）----
  // data/notes.js 是 Notion「📒 筆記資料庫」的同步副本（私人檔）；「存成筆記」送到本機 serve.py 的佇列，下次同步寫進 Notion
  const notionDb = FT.notionDb || "";
  const notionNotes = (FT.notes || []).map((n) => ({ domains: [], tags: [], uses: [], ...n }));
  // Notion 選項名稱（含 emoji）↔ 網站 id
  const domainOpt = { wealth: "📈 投資與財富管理", sustainable: "🌱 永續金融", "digital-assets": "🪙 數位資產", payments: "💳 支付與轉帳", insurtech: "🛡️ 保險科技" };
  const optToDomain = Object.fromEntries(Object.entries(domainOpt).map(([k, v]) => [v, k]));
  const srcTypeOpt = { "論文期刊": "📑 論文", "白皮書": "📗 白皮書", "企業報告": "🏢 企業報告", "監理文件": "🏛️ 監理文件", "新聞報導": "📰 新聞", "數據整理": "📊 數據 / 統計" };
  const isSummary = (n) => n.pinned || /統整/.test(n.type || "");
  let pending = store.get("notionPending2", []).filter((p) => !notionNotes.some((n) => n.title === p.title));
  store.set("notionPending2", pending);
  const allNotes = () => [
    ...pending.map((p, i) => ({ id: "pending-" + i, pending: true, title: p.title, domains: (p.domains || []).map((d) => optToDomain[d]).filter(Boolean), type: p.type, sourceType: p.sourceType, sourceOrg: p.sourceOrg, link: p.link, published: p.published, tags: p.tags || [], uses: p.uses || [], summary: "", pinned: false, body: p.body, updated: p.queuedAt })),
    ...notionNotes
  ];
  let curBook = "summary", curNote = null, srcFilter = "all";
  const courses = () => [...new Set(notionNotes.map((n) => n.course).filter(Boolean))].sort();
  const bookName = (b) => b === "summary" ? "統整筆記" : b === "all" ? "全部筆記" : b === "cross" ? "跨領域" : domainById[b] ? domainById[b].name : b.startsWith("c:") ? b.slice(2) : "未分類";
  const notesIn = (b) => {
    const ns = allNotes();
    if (b === "all") return ns;
    if (b === "summary") return ns.filter(isSummary);
    if (b.startsWith("c:")) return ns.filter((n) => n.course === b.slice(2));
    if (b === "cross") return ns.filter((n) => n.cross || !n.domains.length);
    return ns.filter((n) => n.domains.includes(b));
  };
  if (FT.notesSynced) $("#notesSynced").textContent = "上次同步 " + FT.notesSynced;
  if (notionDb) { $("#openNotion").href = notionDb; $("#newNote").href = notionDb; }

  function renderBooks() {
    const btn = (id, ic, name) => `<button class="nb-book ${curBook === id ? "on" : ""}" data-book="${esc(id)}">${icon(ic)}<span>${esc(name)}</span><span class="n">${notesIn(id).length}</span></button>`;
    $("#nbBooksMain").innerHTML = btn("summary", "layers", "統整筆記") + btn("all", "book", "全部筆記");
    $("#nbBooksDomain").innerHTML = domains.map((d) => btn(d.id, d.id, d.name)).join("") + btn("cross", "link", "跨領域");
    $("#nbBooksCourse").innerHTML = courses().length ? courses().map((c) => btn("c:" + c, "paper", c)).join("")
      : `<p class="nb-hint" style="padding:0 10px">在 Notion 把「筆記類型」設為課程筆記並填「課程」，就會出現在這裡。</p>`;
  }
  function selectBook(b) { curBook = b; curNote = null; $("#noteSearch").value = ""; renderBooks(); renderNoteList(); renderEditor(); }
  document.querySelector(".nb-side").addEventListener("click", (e) => {
    const b = e.target.closest("[data-book]");
    if (b) selectBook(b.dataset.book);
  });

  function renderSrcFilter() {
    const types = [...new Set(allNotes().map((n) => n.sourceType).filter(Boolean))];
    $("#noteSrcFilter").innerHTML = `<option value="all">全部資料來源</option>` + types.map((t) => `<option ${srcFilter === t ? "selected" : ""}>${esc(t)}</option>`).join("");
  }
  $("#noteSrcFilter").addEventListener("change", (e) => { srcFilter = e.target.value; renderNoteList(); });

  function renderNoteList() {
    $("#nbTitle").textContent = bookName(curBook);
    const q = $("#noteSearch").value.trim().toLowerCase();
    const list = notesIn(curBook)
      .filter((n) => srcFilter === "all" || n.sourceType === srcFilter)
      .filter((n) => !q || [n.title, n.body, n.summary, n.sourceOrg, ...(n.tags || [])].join(" ").toLowerCase().includes(q))
      .sort((a, b) => (b.pending ? 1 : 0) - (a.pending ? 1 : 0) || String(b.updated).localeCompare(String(a.updated)));
    $("#noteList").innerHTML = list.length ? list.map((n) => `
      <li class="note-item ${curNote === n.id ? "on" : ""}" data-note="${esc(n.id)}">
        <b>${esc(n.icon ? n.icon + " " : "")}${esc(n.title || "未命名筆記")}</b>
        <small>${n.pending ? `<span class="queued">⏳ 待同步到 Notion</span>` : ""}${n.importance ? `<span class="pin">${esc(n.importance.split(" ")[0])}</span>` : ""}${n.sourceType ? `<span>${esc(n.sourceType)}</span>` : ""}${n.type ? `<span>${esc(n.type)}</span>` : ""}<span>${esc(String(n.updated || "").slice(0, 10))}</span></small>
      </li>`).join("") : `<li class="nb-hint">${q || srcFilter !== "all" ? "找不到符合的筆記" : "這本還沒有筆記。按「新筆記」會打開 Notion。"}</li>`;
  }
  $("#noteList").addEventListener("click", (e) => {
    const li = e.target.closest("[data-note]");
    if (li) { curNote = li.dataset.note; renderNoteList(); renderEditor(); }
  });
  $("#noteSearch").addEventListener("input", renderNoteList);

  function mdRender(src) {
    const inline = (s) => esc(s)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
      .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');
    let html = "", list = null;
    const close = () => { if (list) { html += `</${list}>`; list = null; } };
    for (const line of String(src || "").split("\n")) {
      let m;
      if ((m = line.match(/^(#{1,3})\s+(.*)/))) { close(); html += `<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`; }
      else if ((m = line.match(/^\s*[-*]\s+(\[[ x]\]\s*)?(.*)/))) { if (list !== "ul") { close(); html += "<ul>"; list = "ul"; } html += `<li>${m[1] ? (m[1].includes("x") ? "☑ " : "☐ ") : ""}${inline(m[2])}</li>`; }
      else if ((m = line.match(/^\s*\d+\.\s+(.*)/))) { if (list !== "ol") { close(); html += "<ol>"; list = "ol"; } html += `<li>${inline(m[1])}</li>`; }
      else if ((m = line.match(/^>\s?(.*)/))) { close(); html += `<blockquote>${inline(m[1])}</blockquote>`; }
      else if (line.trim() === "" || line.trim() === "---") { close(); }
      else { close(); html += `<p>${inline(line)}</p>`; }
    }
    close();
    return html;
  }

  function renderEditor() {
    const n = allNotes().find((x) => x.id === curNote);
    if (!n) {
      $("#nbEditor").innerHTML = `<div class="nb-empty">${icon("pen")}選一則筆記閱讀；要寫新筆記，按「新筆記」會打開 Notion。</div>`;
      return;
    }
    const chip = (v, cls = "") => v ? `<span class="${cls}">${esc(v)}</span>` : "";
    const hasSrc = n.sourceType || n.sourceOrg || n.link || n.published;
    $("#nbEditor").innerHTML = `
      <div class="nb-reader-head">
        <h3>${esc(n.icon ? n.icon + " " : "")}${esc(n.title || "未命名筆記")}</h3>
        ${n.pending ? `<span class="queued">⏳ 下次同步時會寫進 Notion</span>` : `<a class="btn btn-red btn-sm" href="${esc(n.url)}" target="_blank" rel="noopener">${icon("pen")} 在 Notion 編輯</a>`}
      </div>
      <div class="nb-meta">
        ${n.domains.map((d) => chip(domainOpt[d])).join("")}${(n.cross || !n.domains.length) ? chip("🔗 跨領域") : ""}${chip(n.type)}${chip(n.course && "課程｜" + n.course)}${chip(n.importance, "pin")}${chip(n.status)}${n.pinned ? `<span class="pin">★ 收進統整</span>` : ""}
      </div>
      ${n.summary ? `<div class="nb-summary">${icon("spark")}<span>${esc(n.summary)}</span></div>` : ""}
      ${hasSrc ? `<div class="nb-source">
        ${n.sourceType ? `<div><small>資料來源</small><b>${esc(n.sourceType)}</b></div>` : ""}
        ${n.sourceOrg ? `<div><small>機構 / 作者</small><b>${esc(n.sourceOrg)}</b></div>` : ""}
        ${n.published ? `<div><small>發布日期</small><b>${esc(n.published)}</b></div>` : ""}
        ${n.link ? `<div><small>連結</small><a href="${esc(n.link)}" target="_blank" rel="noopener">開啟原文 ${icon("external")}</a></div>` : ""}
      </div>` : ""}
      ${(n.tags.length || n.uses.length) ? `<div class="nb-meta">${n.tags.map((t) => `<span>#${esc(t)}</span>`).join("")}${n.uses.map((u) => `<span>${esc(u)}</span>`).join("")}</div>` : ""}
      <div class="md">${mdRender(n.body) || '<p class="nb-hint">（空白）</p>'}</div>`;
  }

  // 「存成筆記」：送進本機佇列，排程同步時寫進 Notion，欄位自動填好
  async function createNote(book, title = "", body = "", meta = {}) {
    const item = {
      title, body,
      domains: domainOpt[book] ? [domainOpt[book]] : ["🔗 跨領域"],  // 含 book === "cross"
      type: meta.type || "📄 文獻筆記",
      sourceType: meta.sourceType || "", sourceOrg: meta.sourceOrg || "", link: meta.link || "", published: meta.published || "",
      tags: [], uses: meta.uses || ["📚 自學"]
    };
    try {
      const r = await fetch("api/notion-queue", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
      if (!r.ok) throw new Error();
      const d = await r.json();
      pending.push({ ...item, queuedAt: new Date().toISOString().slice(0, 19) }); store.set("notionPending2", pending);
      curBook = domainOpt[book] ? book : "all"; curNote = "pending-" + (pending.length - 1);
      renderBooks(); renderSrcFilter(); renderNoteList(); renderEditor();
      $("#notes").scrollIntoView();
      toast(`已排入 Notion 同步佇列（共 ${d.queued} 則待同步）`);
    } catch {
      // 沒有本機伺服器時：複製成 Markdown，打開 Notion 手動貼上
      try { await navigator.clipboard.writeText(`# ${title}\n\n${body}`); } catch {}
      if (notionDb) window.open(notionDb, "_blank", "noopener");
      toast("已複製筆記內容，貼到 Notion 新頁面即可");
    }
  }

  function download(name, text, type) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type }));
    a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  $("#exportMd").onclick = () => {
    const md = `# Craig's FinTech Lab 筆記（${todayStr}）\n\n` + domains.map((d) => {
      const ns = notionNotes.filter((n) => n.domains[0] === d.id);
      return ns.length ? `# ${d.name}\n\n` + ns.map((n) => `## ${n.title || "未命名筆記"}\n\n${n.summary ? "> " + n.summary + "\n\n" : ""}${n.body}\n`).join("\n") : "";
    }).filter(Boolean).join("\n---\n\n");
    download(`craigs-fintech-notes-${todayStr}.md`, md, "text/markdown");
    toast("已匯出 Markdown");
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
        <div class="job-company">${logo(j.company, j.link)}${esc(j.company)}</div>
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
          <div class="meta">${logo(t.source || "", t.link)}<span>${t.date.replace(/-/g, "/")}</span><span class="badge">${icon(t.domain)} ${esc(domainLabel(t.domain))}</span><span>論文適配度 <span class="stars">${"★".repeat(t.fit || 0)}${"☆".repeat(5 - (t.fit || 0))}</span></span></div>
          <h3><a href="${esc(t.link)}" target="_blank" rel="noopener">${esc(t.headline)} ↗</a></h3>
        </div>
        <div class="fish">
          <div class="c"><h4>🐟 一吃：課堂素材</h4><p>${esc(t.classUse.replace(/^課堂：/, ""))}</p></div>
          <div class="t"><h4>🐟 二吃：論文切角</h4><p>${esc(t.thesisAngle.replace(/^論文：/, ""))}</p></div>
        </div>
        <div class="thesis-method"><span>${t.method ? `<b>可行方法：</b>${esc(t.method)}` : ""}</span><button class="link-btn private-only" data-th="${thesis.indexOf(t)}">${icon("pen")} 存成筆記</button></div>
      </article>`).join("") : `<p class="empty">這個領域還沒有論文線索。</p>`;
    observeStagger($("#thesisList"));
  }
  $("#thesisList").addEventListener("click", (e) => {
    const b = e.target.closest("[data-th]");
    if (!b) return;
    const t = thesis[Number(b.dataset.th)];
    createNote(t.domain || "summary", "論文線索｜" + t.headline,
      `> ${t.date}｜${t.link}\n\n## 一吃：課堂素材\n${t.classUse.replace(/^課堂：/, "")}\n\n## 二吃：論文切角\n${t.thesisAngle.replace(/^論文：/, "")}\n\n## 可行方法\n${t.method || ""}\n\n## 我的想法\n- `, { type: "💡 論文構想", sourceType: "📰 新聞", link: t.link, published: t.date, uses: ["🎯 論文"] });
  });

  // ---- 每週課程推薦 ----
  // 上完 → 本機記錄（localStorage）＋本機伺服器寫入 data/course-progress.json，讓每週排程知道你上完哪些、推薦下一階
  const weeklyCourses = FT.courses || [];
  let doneCourses = store.get("doneCourses", {});
  let courseFilter = "all";
  const PER_DOMAIN = 2;
  function activeCourses(domainId) {
    const left = weeklyCourses.filter((c) => c.domain === domainId && !doneCourses[c.id]);
    return [...left.filter((c) => c.slot === "pick"), ...left.filter((c) => c.slot !== "pick")].slice(0, PER_DOMAIN);
  }
  function renderCourseFilters() {
    $("#courseFilters").innerHTML = [["all", "全部領域"], ...domains.map((d) => [d.id, d.name])]
      .map(([v, l]) => `<button class="chip ${courseFilter === v ? "on" : ""}" data-v="${v}">${v !== "all" ? icon(v) : ""}${esc(l)}</button>`).join("");
  }
  $("#courseFilters").addEventListener("click", (e) => { const b = e.target.closest("[data-v]"); if (b) { courseFilter = b.dataset.v; renderCourseFilters(); renderCourses(); } });
  function renderCourses(flashId) {
    if (FT.coursesWeek) $("#coursesWeek").textContent = `本週：${FT.coursesWeek.replace(/-/g, "/")} 起`;
    const list = domains.filter((d) => courseFilter === "all" || d.id === courseFilter).flatMap((d) => {
      const act = activeCourses(d.id);
      return act.length ? act : [{ empty: true, domain: d.id }];
    });
    $("#courseGrid").innerHTML = list.map((c) => c.empty ? `
      <article class="course-card done-all"><div class="cc-top">${icon(c.domain)}<span>${esc(domainById[c.domain].name)}</span></div>
        <h3>這週的課都上完了 🎉</h3><p>下週一會依你的進度推薦更進階的課。</p></article>` : `
      <article class="course-card ${c.id === flashId ? "flash" : ""}">
        <div class="cc-top">${logo(c.platform, "", false, "lg")}<div><b>${esc(c.platform)}</b><small>${esc(c.provider)}</small></div>
          <span class="cc-domain">${icon(c.domain)} ${esc(domainById[c.domain]?.name || "")}</span></div>
        <h3>${esc(c.title)}</h3>
        <div class="job-meta"><span>${esc(c.level)}</span><span>⏱ ${esc(c.length)}</span><span>${esc(c.price)}</span>${c.slot !== "pick" ? `<span class="lock">遞補推薦</span>` : ""}</div>
        <p>${esc(c.why)}</p>
        ${c.verify ? `<span class="verify">資訊來自第三方課程目錄，報名前請確認</span>` : ""}
        <div class="cc-actions">
          <a class="btn btn-red btn-sm" href="${esc(c.link)}" target="_blank" rel="noopener">前往課程 ${icon("external")}</a>
          <button class="btn btn-ghost-dark btn-sm" data-done="${esc(c.id)}">${icon("check")} 上完了</button>
        </div>
      </article>`).join("");
    const done = weeklyCourses.filter((c) => doneCourses[c.id]);
    $("#coursesDone").innerHTML = done.length ? `<details><summary>本週已上完 ${done.length} 堂</summary><ul>${done.map((c) => `<li>${logo(c.platform, "", false)}${esc(c.title)} <button class="link-btn" data-undo="${esc(c.id)}">復原</button></li>`).join("")}</ul></details>` : "";
    observeStagger($("#courseGrid"));
  }
  async function reportCourse(c, done) {
    try { await fetch("api/course-progress", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: c.id, title: c.title, domain: c.domain, platform: c.platform, level: c.level, done }) }); } catch {}
  }
  $("#courseGrid").addEventListener("click", (e) => {
    const b = e.target.closest("[data-done]");
    if (!b) return;
    const c = weeklyCourses.find((x) => x.id === b.dataset.done);
    doneCourses[c.id] = new Date().toISOString().slice(0, 10); store.set("doneCourses", doneCourses);
    reportCourse(c, true);
    const next = activeCourses(c.domain).find((x) => x.slot !== "pick");
    renderCourses(next && next.id);
    toast(next ? `🎉 完成！已換上下一堂：${next.title}` : "🎉 完成！這個領域本週的課都上完了，下週一推薦新課");
  });
  $("#coursesDone").addEventListener("click", (e) => {
    const b = e.target.closest("[data-undo]");
    if (!b) return;
    const c = weeklyCourses.find((x) => x.id === b.dataset.undo);
    delete doneCourses[c.id]; store.set("doneCourses", doneCourses); reportCourse(c, false); renderCourses();
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
      <div class="platform"><div class="pf-head">${logo(p.name, "", false, "lg")}<div><h3>${esc(p.name)}</h3><span class="fit">${esc(p.fit)}</span></div></div>
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
  if (isPrivate) { renderBooks(); renderSrcFilter(); renderNoteList(); renderEditor(); }
  renderJobFilters(); renderJobs();
  renderThesisFilters(); renderThesis();
  renderCourseFilters(); renderCourses();
  renderPlatforms();
})();
