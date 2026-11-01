// 校園競賽：以學生團隊為主、學士 / 碩士可參加的金融科技相關競賽
// 由手動排程「校園競賽雷達」更新；狀態（報名中 / 已截止）由網站依今天日期自動判斷
// status: "tbd" 代表今年還沒公告；verify: true 代表細節來自轉載，報名前請看官方簡章
window.FT = window.FT || {};
window.FT.contestsUpdated = "2026-11-01";
window.FT.contests = [
  {
    id: "tabf-frontier-fin-2026", name: "前瞻金融研究競賽", en: "Excellence Competition on Frontier Financial Research",
    organizer: "台灣經濟學會 × 中研院經濟所 × 台灣金融研訓院", kind: "研究報告", domains: ["digital-assets", "payments", "wealth"],
    levels: ["學士（大三、大四）", "碩士", "博士"], team: "3–5 人（同校）＋ 1 位指導老師",
    theme: "三選一：生成式 AI 與行為財務（永豐銀）／數位金融、穩定幣與跨境支付（兆豐銀）／金融市場信用風險管理（聯徵中心）",
    regEnd: "2026-11-18", dates: [{ label: "報名截止", date: "2026-11-18" }, { label: "研究報告繳交", date: "2026-12-21" }, { label: "書審公布", date: "2027-01-12" }, { label: "決賽簡報", date: "2027-01-22" }],
    prize: "每組別總獎金 31 萬（首獎 8 萬）＋合作機構實習名額", fit: 5,
    why: "「穩定幣與跨境支付」組幾乎就是你的論文題目；8–12 頁研究報告可以直接當論文前導研究。",
    link: "https://web.tabf.org.tw/frontierfin"
  },
  {
    id: "national-fintech-campus-2026", name: "2026 全國金融科技校園創新創意競賽", organizer: "朝陽科技大學會計系（公告單位）", kind: "創意提案",
    domains: ["sustainable"], levels: ["學士", "碩士"], team: "請看簡章",
    theme: "韌性金融：AI × 永續 × 治理",
    regEnd: "2026-11-06", dates: [{ label: "初賽報名截止（12:00）", date: "2026-11-06" }],
    prize: "請看簡章", fit: 3,
    why: "「治理」可以接穩定幣監理；截止很近，適合已經有點子的團隊。",
    link: "https://acc.cyut.edu.tw/p/404-1027-41350.php?Lang=zh-tw", verify: true
  },
  {
    id: "concordium-trusted-agents", name: "Concordium Trusted Agents Hackathon", organizer: "Encode Club × Concordium", kind: "線上黑客松",
    domains: ["digital-assets"], levels: ["學士", "碩士", "不限學生"], team: "可個人或組隊",
    theme: "為 AI agent 加上鏈上信任與問責；3 週學習 + 3 週實作，免費、線上",
    regEnd: "2026-11-02", dates: [{ label: "開跑", date: "2026-11-02" }],
    prize: "請看官網", fit: 3,
    why: "#3 數位資產組的候選 Plan A，國際賽、不限校園，但很適合練區塊鏈實作。",
    link: "https://www.encodeclub.com/programmes/concordium-trusted-agents-hackathon", verify: true
  },
  {
    id: "cardif-insurhack", name: "Cardif InsurHack 法國巴黎人壽校園黑客松", organizer: "法國巴黎人壽", kind: "商業競賽", status: "tbd",
    domains: ["insurtech"], levels: ["學士", "碩士"], team: "3–5 人",
    theme: "往年題目：銷售流程科技化、產品與服務創新、AI / 數位工具優化營運",
    regEnd: "", dates: [{ label: "往年報名截止", date: "10/31" }],
    prize: "往年前五名 1–6 萬", fit: 2,
    why: "#5 保險科技頻道有在討論；第四屆時程未公告，留意 #5 與官方消息。",
    link: "https://bhuntr.com/tw/competitions/2026_cardif_insurhack", verify: true
  },
  {
    id: "huanan-fintech-3", name: "第三屆華南金控金融科技創新競賽", organizer: "華南金控", kind: "創意提案 / 技術實證", status: "tbd",
    domains: ["payments"], levels: ["學士", "碩士", "MBA"], team: "3–5 人（至少半數為在學生）",
    theme: "創新服務設計組／創新技術實證 MBA 組",
    regEnd: "", dates: [], prize: "請看簡章", fit: 3,
    why: "分組讓商管背景也能參加；時程未查到，報名前請確認。",
    link: "https://bhuntr.com/tw/competitions/19153824130018102w", verify: true
  },
  {
    id: "tbb-fintech-2026", name: "臺灣企銀校園金融科技創意挑戰賽", organizer: "臺灣中小企業銀行", kind: "創意提案",
    domains: ["payments", "wealth"], levels: ["學士", "碩士"], team: "請看簡章",
    theme: "實現 AI．未來無限：以創新視角提出金融服務提案",
    regEnd: "2026-10-14", dates: [{ label: "報名截止", date: "2026-10-14" }, { label: "複賽簡報繳交", date: "2026-11-29" }],
    prize: "總獎金 36 萬（最高 18 萬）", fit: 3,
    why: "銀行主辦的年度校園賽，2027 年大約 8 月底開報名。",
    link: "https://bhuntr.com/tw/competitions/k2nk4039a72nz5cbrc"
  },
  {
    id: "esun-ai-cup-2026", name: "AI CUP 2026 玉山人工智慧公開挑戰賽", organizer: "玉山銀行 × 教育部 AI CUP", kind: "AI 程式競賽",
    domains: ["wealth"], levels: ["學士", "碩士", "不限學生"], team: "請看簡章",
    theme: "Agent 基金經理人：用自己設計的 Agent 打造最佳 ETF 投資組合",
    regEnd: "2026-10-19", dates: [{ label: "報名截止", date: "2026-10-19" }, { label: "實體複賽", date: "2026-12-19" }],
    prize: "決賽最高 12 萬", fit: 3,
    why: "#1 投資與財富管理組以此為專案；明年可以跨組一起報。",
    link: "https://money.udn.com/money/story/5613/9768263"
  },
  {
    id: "twse-wise-king-23", name: "第 23 屆校園證券投資智慧王", organizer: "臺灣證券交易所", kind: "知識競賽",
    domains: ["wealth"], levels: ["學士", "碩士"], team: "可跨系組隊",
    theme: "證券市場與投資知識競賽（線上初賽 → 區域複賽 → 決賽）",
    regEnd: "2026-10-30", dates: [{ label: "報名截止", date: "2026-10-30" }, { label: "線上初賽", date: "2026-11-11" }, { label: "決賽（台北 101）", date: "2026-12-24" }],
    prize: "總獎金 80 萬以上（冠軍 12 萬）", fit: 1,
    why: "知識型比賽，適合衝面試履歷；明年 10 月底前報名。",
    link: "https://money.udn.com/money/story/5607/9803810"
  },
  {
    id: "ntub-fintech-service-2026", name: "2026 FinTech 金融服務校際創意競賽", organizer: "國立臺北商業大學財務金融系", kind: "創意企劃書",
    domains: ["payments"], levels: ["學士", "碩士"], team: "2–5 人",
    theme: "不限技術，提出金融服務創意企劃，不必做出產品",
    regEnd: "2026-09-28", dates: [{ label: "徵件截止", date: "2026-09-28" }, { label: "決賽", date: "2026-10-30" }],
    prize: "請看簡章", fit: 2,
    why: "門檻低、只要企劃書，適合第一次參賽的團隊練手。",
    link: "https://bhuntr.com/tw/competitions/0euuc09f1ukmzv1j4j"
  },
  {
    id: "fintech-taipei-awards-campus", name: "台北金融科技獎 FinTech Taipei Awards（校園組）", organizer: "金管會相關單位", kind: "創新獎項",
    domains: ["payments", "digital-assets"], levels: ["學士", "碩士"], team: "請看簡章",
    theme: "金融科技創新應用（校園組）",
    regEnd: "2026-08-21", dates: [{ label: "報名截止", date: "2026-08-21" }],
    prize: "請看簡章", fit: 3,
    why: "官方級獎項，得獎很加分；2027 年約 6 月底開報名。",
    link: "https://bhuntr.com/tw/competitions/cbgkrznrqnl64691mx"
  }
];
