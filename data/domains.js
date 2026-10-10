// 五大領域內容（對應 Discord「專案進行中」的 5 個頻道）
// 推薦課程連結使用平台搜尋頁，避免課程下架造成死連結
window.FT = window.FT || {};
window.FT.domains = [
  {
    id: "wealth",
    no: 1,
    name: "投資與財富管理",
    en: "WealthTech",
    icon: "📈",
    tagline: "機器人理財、量化投資、財富管理數位化",
    intro: "從資產配置理論到 Robo-Advisor 演算法，理解科技如何讓財富管理從「高資產專屬」走向「人人可用」。",
    topics: ["現代投資組合理論 (MPT)", "機器人理財 Robo-Advisor", "量化交易與回測", "ESG 投資與評分", "財富管理 KYC / 適合度", "AI 投顧與法規"],
    path: [
      { level: "入門", items: ["讀懂 MPT 與效率前緣", "認識台灣機器人理財業者（如王道、國泰、FinTech 投顧）", "了解投信投顧法對自動化投顧的規範"] },
      { level: "進階", items: ["用 Python 做資產配置回測（pandas / yfinance）", "因子投資與 Smart Beta", "大型語言模型在投研的應用"] },
      { level: "實戰", items: ["做一個再平衡策略並寫成報告", "比較三家 Robo-Advisor 費用與績效", "參與實驗室專案頻道 #1 的題目"] }
    ],
    courses: [
      { platform: "Coursera", title: "Investment Management / Portfolio Construction", q: "investment management python" },
      { platform: "Udemy", title: "Python for Finance & Algorithmic Trading", q: "python for finance algorithmic trading" },
      { platform: "Hahow", title: "投資理財 / 量化交易", q: "量化交易" }
    ],
    thesisKeywords: ["robo-advisor 採用意願", "AI 投顧信任", "ESG 評分分歧", "散戶行為偏誤與 App 設計"]
  },
  {
    id: "sustainable",
    no: 2,
    name: "永續金融",
    en: "Sustainable Finance",
    icon: "🌱",
    tagline: "ESG、綠色債券、碳權交易與氣候風險",
    intro: "金管會「綠色及轉型金融行動方案」推動下，永續揭露與碳定價正在重塑金融業的風險管理與產品設計。",
    topics: ["ESG 揭露框架 (IFRS S1/S2、TCFD)", "綠色 / 永續連結債券", "碳權交易所與碳定價", "氣候風險壓力測試", "漂綠 (Greenwashing) 偵測", "永續分類標準 Taxonomy"],
    path: [
      { level: "入門", items: ["讀懂 IFRS S1/S2 與台灣接軌時程", "認識臺灣碳權交易所", "了解綠色債券的認證流程"] },
      { level: "進階", items: ["用 NLP 分析永續報告書", "氣候情境分析 (NGFS scenarios)", "永續連結貸款 KPI 設計"] },
      { level: "實戰", items: ["挑一家金控做 ESG 評分比較", "做漂綠文字偵測小工具", "參與實驗室專案頻道 #2 的題目"] }
    ],
    courses: [
      { platform: "Coursera", title: "Sustainable Finance / ESG Investing", q: "sustainable finance esg" },
      { platform: "Udemy", title: "ESG & Climate Risk", q: "esg climate risk" },
      { platform: "天下學習", title: "ESG 永續轉型", q: "ESG" }
    ],
    thesisKeywords: ["ESG 評分與資金成本", "碳價對銀行授信", "永續報告書文字探勘", "漂綠與股價反應"]
  },
  {
    id: "digital-assets",
    no: 3,
    name: "數位資產",
    en: "Digital Assets",
    icon: "🪙",
    tagline: "區塊鏈、穩定幣、代幣化資產 (RWA) 與 CBDC",
    intro: "從比特幣 ETF、穩定幣立法到資產代幣化，數位資產正從投機標的走向金融基礎設施。",
    topics: ["區塊鏈與智能合約基礎", "穩定幣與儲備機制", "資產代幣化 RWA / STO", "央行數位貨幣 CBDC", "VASP 監理與虛擬資產專法", "DeFi 風險與鏈上分析"],
    path: [
      { level: "入門", items: ["讀比特幣白皮書與以太坊概念", "了解《虛擬資產服務法》（2026/6 三讀）：VASP 許可制與穩定幣規範", "認識央行 CBDC 研究進度"] },
      { level: "進階", items: ["Solidity 寫一個簡單代幣合約", "用 Dune 做鏈上數據分析", "穩定幣脫鉤事件研究"] },
      { level: "實戰", items: ["比較各國穩定幣監理框架", "做一份 RWA 代幣化商業模式分析", "參與實驗室專案頻道 #3 的題目"] }
    ],
    courses: [
      { platform: "Coursera", title: "Blockchain / Cryptocurrency Technologies", q: "blockchain cryptocurrency" },
      { platform: "Udemy", title: "Solidity & Smart Contracts", q: "solidity smart contracts" },
      { platform: "Hahow", title: "區塊鏈", q: "區塊鏈" }
    ],
    thesisKeywords: ["穩定幣與貨幣政策傳導", "比特幣 ETF 與價格發現", "RWA 流動性溢酬", "VASP 監理事件研究"]
  },
  {
    id: "payments",
    no: 4,
    name: "支付與轉帳",
    en: "Payments",
    icon: "💳",
    tagline: "電子支付、跨境匯款、開放銀行與即時清算",
    intro: "行動支付普及、開放銀行第三階段、跨境即時支付網路，支付是金融科技最貼近日常、也最快變現的戰場。",
    topics: ["電子支付與電子票證整併", "開放銀行 / 開放 API", "跨境支付與 SWIFT / mBridge", "BNPL 先買後付", "反洗錢 AML 與詐騙偵測", "即時支付系統 (FXML、FedNow)"],
    path: [
      { level: "入門", items: ["了解台灣電子支付條例與主要業者", "開放銀行三階段內容", "認識財金資訊公司的角色"] },
      { level: "進階", items: ["支付交易詐騙偵測模型（不平衡資料）", "BNPL 信用風險", "跨境支付成本結構"] },
      { level: "實戰", items: ["用公開資料集做詐騙偵測專題", "比較台灣三大行動支付使用者體驗", "參與實驗室專案頻道 #4 的題目"] }
    ],
    courses: [
      { platform: "Coursera", title: "Payments & FinTech", q: "fintech payments" },
      { platform: "Udemy", title: "Fraud Detection with Machine Learning", q: "fraud detection machine learning" },
      { platform: "Shifu", title: "金融科技 / 支付", q: "金融科技" }
    ],
    thesisKeywords: ["行動支付採用與消費行為", "開放銀行與銀行競爭", "BNPL 與家庭負債", "詐騙偵測可解釋性"]
  },
  {
    id: "insurtech",
    no: 5,
    name: "保險科技",
    en: "InsurTech",
    icon: "🛡️",
    tagline: "UBI 車險、理賠自動化、精算 AI 與嵌入式保險",
    intro: "從純網保到嵌入式保險、從穿戴裝置到 AI 理賠，保險科技重新定義「風險怎麼定價、服務怎麼交付」。",
    topics: ["UBI 使用量計價車險", "AI 理賠與影像辨識", "嵌入式保險 Embedded Insurance", "純網路保險公司", "健康數據與穿戴裝置", "保險監理沙盒"],
    path: [
      { level: "入門", items: ["認識台灣純網路保險公司與保險業監理沙盒案例", "了解保險業數位化法規", "基礎精算概念"] },
      { level: "進階", items: ["用機器學習做理賠預測（GLM vs. GBM）", "UBI 定價模型", "保險詐欺偵測"] },
      { level: "實戰", items: ["設計一個嵌入式保險產品", "分析一家保險公司的數位轉型", "參與實驗室專案頻道 #5 的題目"] }
    ],
    courses: [
      { platform: "Coursera", title: "InsurTech / Actuarial Data Science", q: "insurance analytics" },
      { platform: "Udemy", title: "Machine Learning for Insurance", q: "insurance machine learning" },
      { platform: "Tibame", title: "數據分析", q: "數據分析" }
    ],
    thesisKeywords: ["UBI 與駕駛行為", "AI 理賠公平性", "嵌入式保險轉換率", "氣候風險與巨災保險"]
  }
];

window.FT.platforms = {
  "Coursera": "https://www.coursera.org/search?query=",
  "Udemy": "https://www.udemy.com/courses/search/?q=",
  "Hahow": "https://hahow.in/search?query=",
  // 下列平台站內搜尋網址不固定，改用 Google 站內搜尋
  "天下學習": "https://www.google.com/search?q=天下學習+",
  "Shifu": "https://www.google.com/search?q=Shifu+課程+",
  "Tibame": "https://www.google.com/search?q=TibaMe+"
};
