// 知識庫：新聞、論文、期刊、白皮書、企業報告、監理文件 —— 只整理知識點
// 排程「知識庫」每週二、六更新；verify: true 代表數字來自二手報導，引用前請查原文
window.FT = window.FT || {};
window.FT.libraryUpdated = "2026-10-11";
window.FT.library = [
  {
    type: "監理報告", domain: "digital-assets", date: "2026-06", source: "BIS Annual Economic Report 2026",
    title: "Anchoring trust in money: innovation beyond stablecoins（BIS 年報第三章）",
    link: "https://www.jakeclaver.com/bis-annual-economic-report-2026-stablecoins-and-dollarization/",
    points: [
      "貨幣三項檢驗：單一性 (singleness)、彈性 (elasticity)、完整性 (integrity)，BIS 認為現行穩定幣三項都不及格",
      "贖回摩擦會讓價格偏離面值，性質更接近 ETF 份額而非支付工具",
      "美元穩定幣可能造成新興市場「穩定幣美元化」，削弱當地貨幣政策",
      "BIS 偏好的路線：以央行貨幣為基礎的代幣化 + 統一帳本（如 Project Agorá）"
    ],
    verify: true
  },
  {
    type: "白皮書", domain: "digital-assets", date: "2026-05", source: "IMF Notes 2026/006",
    title: "The Rise of Tokenization: Deciphering New Trends in Payments",
    link: "https://www.imf.org/-/media/files/publications/imf-notes/2026/english/insea2026006.pdf",
    points: [
      "把存款代幣 (tokenized deposits) 和穩定幣視為兩種不同的貨幣負債，比較其發行通路、治理與損失吸收能力",
      "穩定幣的核心風險是「流動性」而非「償付能力」：準備資產夠，但能否及時變現以面值贖回",
      "穩定幣缺乏央行清算管道、存款保險與處理機制",
      "新興市場風險最高：資本流動波動、貨幣替代、貨幣主權流失"
    ]
  },
  {
    type: "企業報告", domain: "payments", date: "2026-01", source: "BCG",
    title: "Stablecoin Payments: The Truth Behind the Numbers",
    link: "https://www.bcg.com/assets/2026/white-paper-stablecoin-payments-truth-behind-numbers.pdf",
    points: [
      "鏈上總量要先剔除機器人與內部轉帳，調整後大部分穩定幣活動是金融市場基礎設施用途，而非實體支付",
      "實體經濟支付量雖小，但 2024→2025 成長約 60%",
      "TRON 是最大的穩定幣結算鏈，主因是低手續費與 USDT 深度流動性",
      "研究啟示：做穩定幣實證研究時，「交易量如何定義與清洗」本身就是方法論重點"
    ]
  },
  {
    type: "論文", domain: "digital-assets", date: "2026-08", source: "Aspen Economic Strategy Group（Liang & Neiman）",
    title: "Stablecoins After GENIUS: Private Money, Public Debt, and the Global Dollar",
    link: "https://www.economicstrategygroup.org/wp-content/uploads/2026/08/Liang_Neiman.pdf",
    points: [
      "討論美國 GENIUS Act 之後，穩定幣作為私人貨幣與美國公債需求、美元國際地位的連結",
      "穩定幣準備資產大量持有短期美債 → 與公債市場形成新的傳導管道",
      "可作為論文文獻回顧中「穩定幣 × 總體金融」的近期代表文獻"
    ]
  },
  {
    type: "研究報導", domain: "wealth", date: "2026", source: "AAII Journal",
    title: "2026 Robo-Advice Landscape: Survivors Search for the Next Leg of Growth",
    link: "https://www.aaii.com/journal/article/489779-2026-robo-advice-landscape-survivors-search-for-the-next-leg-of-growth",
    points: [
      "Robinhood Strategies（收購 AI 理財工具 Pluto 後推出）是主要機器人理財中唯一以 AI 推薦引擎為核心的產品",
      "Betterment、Wealthfront、SoFi、Fidelity Go 尚未推出同等的 AI 主導建議",
      "受託責任 (fiduciary duty)、成本與監理疑慮，是 AI 顧問落地慢的主因",
      "論文切角：AI 投顧的「信任落差」與受託責任設計"
    ]
  },
  {
    type: "數據整理", domain: "wealth", date: "2026", source: "產業統計彙整",
    title: "機器人理財市場規模與 AI 投資工具使用率",
    link: "https://walnutinvest.com/stats/ai-investing-statistics",
    points: [
      "全球機器人理財 AUM 2025 年約破 1 兆美元，預估 2029 年約 7 兆",
      "龍頭仍是傳統業者：Vanguard Digital Advisor（>3,110 億）、Empower（~2,000 億）、Schwab（~810 億）",
      "美國散戶調查：62% 曾用 AI 工具輔助投資，但只有 7% 說上一個重大決策來自 AI → 信任落差"
    ],
    verify: true
  },
  {
    type: "監理文件", domain: "sustainable", date: "2026-07", source: "金管會（新聞報導）",
    title: "綠色及轉型金融行動方案：綠色投融資突破 5 兆",
    link: "https://ec.ltn.com.tw/article/breakingnews/5499746",
    points: [
      "2024/10 發布，六大面向（資金、資料、揭露、培力、生態系、國際影響力）共 30 項措施",
      "截至 2026/5 底綠色投融資 5 兆 3,046 億元，達 2030 年 6 兆目標的 88%",
      "結構：綠色授信 2.16 兆、永續績效連結授信 2.12 兆、永續發展債券 0.93 兆",
      "綠色授信認定將由聯徵中心統一定義，預計 2028 年起列入金檢",
      "保險業 RBC：投資永續企業等風險係數由 37.5% 降到 30%"
    ],
    verify: true
  },
  {
    type: "準則動態", domain: "sustainable", date: "2026-04", source: "ISSB / 永續揭露",
    title: "ISSB 決定不另訂「自然」準則，改發實務公告",
    link: "https://sustainablefutures.linklaters.com/post/102mrou/esg-newsletter-may-2026",
    points: [
      "不修改 IFRS S1/S2，改以 IFRS 實務公告處理自然相關揭露（重大性時自願採用）",
      "預計 2026/10 發布徵求意見稿",
      "台灣：自 2026 會計年度起，上市櫃公司依資本額分三階段適用 IFRS 永續揭露準則",
      "金控子公司自 2026 年起可併入母公司永續報告書揭露"
    ]
  },
  {
    type: "企業報告", domain: "payments", date: "2025", source: "Swift × McKinsey",
    title: "跨境支付客戶體驗基準研究",
    link: "https://www.swift.com/news-events/news/path-enhanced-cross-border-payment-experiences",
    points: [
      "McKinsey 估計 2027 年跨境支付規模達 183 兆美元",
      "客戶最在意：速度、透明度、可預測性、低成本",
      "G20 跨境支付路線圖設定 2027 年改善目標（成本、速度、透明度、可及性）"
    ]
  },
  {
    type: "研究報告", domain: "payments", date: "2026", source: "Juniper Research（報導）",
    title: "即時支付規模與跨境互通的瓶頸",
    link: "https://paymentsindustryintelligence.com/?p=42266",
    points: [
      "即時支付交易值預估 2026 年 27.7 兆美元（2021 年 4.8 兆）",
      "超過 70% 仍是國內交易：各國即時支付系統缺乏跨境互通",
      "即使採用 ISO 20022，串接各國系統仍困難；BIS Project Nexus（印度、馬來西亞、菲律賓、泰國、新加坡）在做多邊串接"
    ],
    verify: true
  },
  {
    type: "企業報告", domain: "insurtech", date: "2026-Q1", source: "Gallagher Re",
    title: "Global InsurTech Report Q1 2026",
    link: "https://www.ajg.com/gallagherre/news-and-insights/global-insurtech-report-for-q1-2026/",
    points: [
      "2025 全年 AI 保險科技拿走約三分之二融資：33.5 億美元、227 筆",
      "2026 Q1 有 95% 的融資流向 AI 公司",
      "新議題：AI 責任險與網路保險市場的關係",
      "AI 主要用於核保加速、理賠處理、客製化保障與詐欺偵測"
    ]
  },
  {
    type: "企業報告", domain: "insurtech", date: "2026-06", source: "NTT DATA",
    title: "Insurtech Global Outlook 2026",
    link: "https://insurance-edge.net/2026/06/11/new-report-from-ntt-data-looks-at-global-insurtech-outlook/",
    points: [
      "只有 22% 的保險公司把 AI 擴展到正式上線，但 66% 的員工已在用 AI 工具",
      "瓶頸不是技術，而是信任、治理與營運模式",
      "嵌入式保險 2025 年市場規模超過 1,160 億美元（不同機構定義差異大）"
    ]
  }
];
