// 知識庫：新聞、論文、期刊、白皮書、企業報告、監理文件 —— 只整理知識點
// 排程「知識庫」每週二、六更新；verify: true 代表數字來自二手報導，引用前請查原文
window.FT = window.FT || {};
window.FT.libraryUpdated = "2026-10-17";
window.FT.library = [
  {
    type: "論文", domain: "digital-assets", date: "2026-10-13", source: "BIS Working Paper No 1382（Rashad Ahmed & Iñaki Aldasoro）",
    title: "Are stablecoins and bank deposits substitutes?",
    link: "https://www.bis.org/publications/working-paper-1382-are-stablecoins-and-bank-deposits-substitutes",
    points: [
      "研究問題：穩定幣與銀行存款是否互為替代品；方法是用 2019/1–2025/6 美國週資料做 local projections，估計穩定幣市值對存款利率的半彈性",
      "結論：兩者是「部分替代」，存款利率上升之後，穩定幣市值成長會放緩",
      "識別策略：利用銀行對政策利率的非線性轉嫁（聯邦基金利率約超過 3% 後存款才明顯調升）處理雙向因果，並控制公債殖利率、匯率、比特幣價格與波動度",
      "效果在 USDC 比 USDT 強，作者連結到 USDC 持有人與美國存款戶較接近；非穩定幣加密資產則看不到此效果（安慰劑檢定）",
      "研究啟示：可直接作為「穩定幣擴張 → 銀行資金成本」管道的實證基準，也能延伸檢驗 GENIUS Act 禁止付息條款的影響"
    ]
  },
  {
    type: "監理文件", domain: "digital-assets", date: "2026-10-08", source: "European Securities and Markets Authority（ESMA）",
    title: "ESMA sets out supervisory expectations on services related to unauthorised stablecoins",
    link: "https://www.esma.europa.eu/press-news/esma-news/esma-sets-out-supervisory-expectations-services-related-unauthorised",
    points: [
      "ESMA 意見書：取得 MiCA 授權的加密資產服務商（CASP）應停止對歐盟客戶提供涉及未經 MiCA 授權之 ART / EMT（穩定幣）的服務",
      "各國主管機關須要求業者以技術、契約與組織控管，防止客戶取得或增加對這類代幣的曝險；既有曝險最遲 2027-01-08 前處理完畢",
      "過渡期內只允許出場型服務（變現、轉換、提領、移轉、保管），且須暫時並受監督；意見書未點名特定代幣，但市場普遍解讀 USDT、PYUSD 首當其衝",
      "性質是監理指引而非新法律；ESMA 同時在 MiCA 檢討回應中建議修法，把此限制明文化",
      "研究啟示：與美國 GENIUS Act、台灣《虛擬資產服務法》比較時，可把「未授權外國穩定幣的通路責任落在 CASP」當作一個監理設計維度"
    ],
    verify: true
  },
  {
    type: "新聞報導", domain: "payments", date: "2026-10-01", source: "RTÉ News",
    title: "European payments groups join forces in challenge to US",
    link: "https://www.rte.ie/news/business/2026/1001/1593639-european-payments-group/",
    points: [
      "Bizum（西班牙）、Bancomat（義大利）與 Wero（EPI）等歐洲支付業者宣布合組合資公司「European Network for Payments」，總部設於馬德里",
      "機制：不另建新錢包，而是把各國既有的國內支付系統互聯，讓跨境 P2P 與商店付款可以互通",
      "動機是降低歐洲對 Visa、Mastercard 等美國卡組織的依賴，屬於「支付主權」政策脈絡",
      "研究啟示：與數位歐元、即時支付互聯（TIPS、ECB-SNB 連結）並列，可觀察公部門 CBDC 與私部門網路整合兩條路徑如何分工"
    ],
    verify: true
  },
  {
    type: "企業報告", domain: "wealth", date: "2026-10-14", source: "Morgan Stanley Research / Oliver Wyman",
    title: "AI and Tokenization Could Decide Who Wins in Asset and Wealth Management",
    link: "https://morganstanley.com/insights/articles/asset-wealth-mangement-growth-outlook-2030",
    points: [
      "全球資產管理規模 2025 年創下約 159 兆美元新高，預估至 2030 年每年成長約 9%；家戶金融財富年增約 7%",
      "代幣化實體資產（RWA）目前約 400 億美元，報告預估 2030 年可達 2.3 兆美元",
      "勝負關鍵：能把 AI 帶來的生產力轉成營收成長與更高利潤率的業者，會與同業拉開差距",
      "研究啟示：代幣化基金與穩定幣結算是連動議題；若 RWA 真的成長數十倍，鏈上「現金腿」的監理（穩定幣或代幣化存款）就會成為瓶頸"
    ]
  },
  {
    type: "研究報告", domain: "sustainable", date: "2026-09-10", source: "Environmental Finance",
    title: "Environmental Finance publishes its 2026 Sustainable Loans Insight",
    link: "https://www.environmental-finance.com/content/news/environmental-finance-publishes-its-2026-sustainable-loans-insight.html",
    points: [
      "第四版永續貸款報告，主軸是轉型金融（transition finance）：資金如何流向高排放產業的減碳，而非只投「純綠」項目",
      "公開標示的永續貸款 2025 年超過 8,000 億美元，低於 2024 年約 9,600 億美元的紀錄，2026 年開局也偏慢",
      "《轉型貸款原則》（Transition Loan Principles）預計 2026 年 11 月定稿，將成為轉型貸款標籤的共同標準",
      "研究啟示：可對照台灣「綠色及轉型金融行動方案」，追蹤國際轉型標籤定案後本地銀行授信分類是否跟進"
    ]
  },
  {
    type: "企業報告", domain: "insurtech", date: "2026-04", source: "Deloitte 瑞士",
    title: "Deloitte Insurance and AI 2026",
    link: "https://www.deloitte.com/ch/en/Industries/insurance/perspectives/insurance-and-ai.html",
    points: [
      "調查 1,291 位瑞士保戶（2026 年 2–3 月），結論是對保險業 AI 的「有條件接受」",
      "只有約 18% 對保險 AI 持正面看法，但約 85% 認為保險公司早已在用 AI，形成明顯的信任落差",
      "AI 從「輔助」走向「決定」時接受度大幅下滑：約 61% 反對由 AI 決定核保准駁，約 41% 反對 AI 主導風險分級與定價",
      "接受條件：AI 負責解釋而非拍板、由人負最終責任、決策過程透明",
      "研究啟示：保險科技的瓶頸不只在技術，還在可解釋性與問責設計，可連結金管會金融業運用 AI 指引討論"
    ],
    verify: true
  },
  {
    type: "監理報告", domain: "digital-assets", date: "2026-10-12", source: "Financial Stability Board（FSB）",
    title: "Global Stablecoin Arrangements: Cross-border vulnerabilities and financial stability monitoring",
    link: "https://www.fsb.org/2026/10/global-stablecoin-arrangements-cross-border-vulnerabilities-and-financial-stability-monitoring/",
    points: [
      "FSB 在 10/15 G20 財長暨央行總裁會議前提交的監測報告，定位為進行中的工作摘要，不具拘束力",
      "核心判斷：全球穩定幣橫跨國境與產業，單一監理機關難以獨力評估或處理其風險",
      "點出的脆弱點包括：發行人不知道持有人在哪、跨國破產法適用不明、多發行人架構下贖回壓力可能集中在單一實體、代幣 24/7 交易但準備金管理只在傳統營業時間運作",
      "風險外溢管道：被迫拋售準備資產、銀行存款流失、支付中斷與外匯市場效應；新興市場在較低採用率下就可能出現系統性影響（貨幣替代、資本管制失效）",
      "市場規模約 3,000 億美元、99% 為美元計價（二手報導數字）；研究啟示：可把「持有人地理分布」與「贖回集中度」設計成論文的監測指標"
    ],
    verify: true
  },
  {
    type: "白皮書", domain: "digital-assets", date: "2026-10-08", source: "IMF Global Financial Stability Report 第 3 章 / IMF Blog",
    title: "What Is Needed for Tokenization to Deliver",
    link: "https://www.imf.org/en/blogs/articles/2026/10/08/blog-what-is-needed-for-tokenization-to-deliver",
    points: [
      "代幣化可把發行、交易、清算交割與資產服務整合在同一帳本，縮短目前依序處理的流程",
      "代幣化附買回 (repo) 每日交易量約 3,000–3,500 億美元，其他代幣化資產（信用、貨幣市場基金、股票）約 650 億美元，相較美國 repo 日均約 13 兆美元仍很小",
      "超過一半交易發生在傳統交易時段之外；約 80% 代幣化股票交易小於一股，顯示碎股與全天候需求",
      "四大成長瓶頸：法律確定性、監理明確性、互通性、以安全且普遍接受的貨幣結算",
      "規模擴大後，現行流程中的「摩擦」所提供的緩衝會消失，可能放大拋售、擠兌與傳染；IMF 主張技術中立、同業務同監理"
    ]
  },
  {
    type: "論文", domain: "digital-assets", date: "2026-09", source: "Acharya, Koudijs & Tuckman（NYU Stern；The Financial Review 即將刊登）",
    title: "Stablecoins and the Upcoming Battle for Depositors: Motivating Facts and Open Questions",
    link: "https://w4.stern.nyu.edu/sternfin/vacharya/public_html/pdfs/publications/Stablecoins_and_the_Battle_for_Depositors_draft_Sep12_FINAL.pdf",
    points: [
      "問題意識：GENIUS Act 之後，支付型穩定幣能否成為日常支付工具？其準備金是否來自銀行存款的移轉？",
      "受威脅存款規模的估計落差極大：美國財政部借款諮詢委員會認為約 6.6 兆美元交易性存款有風險，但既有實證幾乎找不到存款流失效果",
      "穩定幣在兩個邊際競爭：金錢邊際（法律禁止發行人付息，但分銷商可用準備收益發放獎勵）與服務邊際（Fed 清算帳戶、信託銀行執照決定支付品質）",
      "借鏡 1970 年代貨幣市場基金搶存款的歷史：銀行會用政治遊說、新產品與重新定價防守最有價值的存款",
      "研究啟示：論文提出的三個政策問題（付息/獎勵、央行清算帳戶、執照）可直接對照台灣虛擬資產服務法子法的設計"
    ]
  },
  {
    type: "監理文件", domain: "payments", date: "2026-10-02", source: "European Central Bank（Governing Council）",
    title: "Decisions taken by the Governing Council of the ECB (in addition to decisions setting interest rates) – October 2026",
    link: "https://ecb.europa.eu//press/govcdec/otherdec/2026/html/ecb.gc261002~54c6b5672b.en.html",
    points: [
      "Pontes 已於 2026-09-21 上線：用央行貨幣結算批發型代幣化資產交易，是歐元體系 DLT 結算的第一步",
      "Visa Europe Payment System 被認定為「系統重要性支付系統」(ECB/2026/22)，由 ECB 擔任主要監督者",
      "TIPS 與其他快速支付系統互連取得進展，並核准評估與巴西 Pix 連結的可行性",
      "數位歐元試點持續招募：電商/行動商務商家申請至 10/27，創新業者申請至 11/9，2027 年試點將做可用性與無障礙測試",
      "研究啟示：歐洲路線是「央行貨幣結算 + 快速支付互連」，可和美國以私人穩定幣為主的路線對照"
    ]
  },
  {
    type: "白皮書", domain: "sustainable", date: "2026-06", source: "OECD",
    title: "OECD Review on Aligning Finance with Climate Goals 2026",
    link: "https://www.oecd.org/en/publications/oecd-review-on-aligning-finance-with-climate-goals-2026_79415c38-en.html",
    points: [
      "第二版報告，從三個面向追蹤金融與氣候目標的一致性：金融部門政策、資金流向的氣候一致性、氣候衡量指標",
      "2023–2025 年間，各國氣候相關金融部門政策數量成長超過 25%",
      "銀行每年對化石燃料的融資，從 2021 年約 1.3 兆美元降到 2024 年略高於 1 兆美元",
      "研究啟示：可作為比較台灣金管會永續金融政策與國際趨勢的基準資料"
    ],
    verify: true
  },
  {
    type: "企業報告", domain: "wealth", date: "2026-07-08", source: "Edward Jones × Morning Consult",
    title: "AI and the Future of Financial Advisors 2026 Research",
    link: "https://www.edwardjones.com/us-en/why-edward-jones/news-media/press-releases/ai-future-financial-advisor-research-2026",
    points: [
      "2026 年 5 月調查 201 位美國理財顧問：82% 已在業務中使用 AI，69% 認為 AI 對產業有正面影響",
      "38% 表示客戶會拿顧問建議去和網路或 AI 工具的答案比較，AI 已成為顧問的「比價對象」",
      "68% 認為長期客戶信任仍需要人的接觸；顧問最想交給 AI 的是行政工作（59%）與例行客戶郵件（53%）",
      "97% 表示客戶對話已擴展到財富傳承、財務焦慮與人生決策，顯示顧問價值從選股轉向行為與規劃"
    ]
  },
  {
    type: "研究報告", domain: "insurtech", date: "2026-01-13", source: "Swiss Re Institute（Reinsurance News 報導）",
    title: "AI-driven disruption to reallocate rather than increase insurance demand: Swiss Re Institute",
    link: "https://www.reinsurancene.ws/ai-driven-disruption-to-reallocate-rather-than-increase-insurance-demand-swiss-re-institute/",
    points: [
      "核心結論：長期來看，AI 帶來的是保費在險種之間「重新分配」，而不是讓整體保險需求增加",
      "短期內資料中心等 AI 基礎建設投資（情境下 2030 年可達 7 兆美元）會推升工程、財產等保費",
      "受分析的保險公司中不到 5% 揭露 AI 導入帶來的財務影響；效率提升也可能因競爭轉嫁給保戶，難以變成持續的承保利潤",
      "新風險集中在網路攻擊、D&O/E&O 責任與對少數雲端與 AI 供應商的集中度風險，但損失資料仍有限"
    ],
    verify: true
  },
  {
    type: "論文", domain: "digital-assets", date: "2026-09", source: "NBER Working Paper 35768（Bordo & Wilkins）",
    title: "Money and Power: Historical Lessons for Stablecoins and U.S. Dollar Dominance",
    link: "https://www.nber.org/papers/w35768",
    points: [
      "回顧英、美、加、瑞典、瑞士的私人貨幣史，結論是能否維持面值取決於制度安排，而不是支付技術",
      "提出私人貨幣可規模化的五個基礎：可信的兌換性、高品質透明的準備、一致的監理範圍、面值清算基礎設施、危機處理與損失分配規則",
      "GENIUS Act 對前幾項處理較完整，但危機處理與跨境協調仍是明顯缺口",
      "美元穩定幣能擴大美元結算的觸角，但能否強化美元地位，仍取決於美國制度信任、財政能力與貨幣政策可信度",
      "研究啟示：五個基礎可直接當成比較各國穩定幣法制（含台灣虛擬資產服務法）的分析框架"
    ]
  },
  {
    type: "監理文件", domain: "digital-assets", date: "2026-08-18", source: "U.S. Treasury（Thomson Reuters 報導）",
    title: "Treasury proposes rules defining stablecoin issuance, sales in U.S.",
    link: "https://tax.thomsonreuters.com/news/treasury-proposes-rules-defining-stablecoin-issuance-sales-in-u-s/",
    points: [
      "財政部依 GENIUS Act 第 3 條提出規則草案，界定什麼行為算是在美國「發行、提供或銷售」支付型穩定幣",
      "「發行」定義為發行人首次移轉穩定幣、使對方取得使用或贖回權；贖回後再流通視為新的發行",
      "「發行人」以負有固定金額贖回義務者認定，用來釐清白牌 (white-label) 合作中的角色",
      "境外發行人只要不在美國、不對美國人行銷並有防範政策，即適用安全港；財政部也在考慮類似 Regulation S 的替代做法",
      "發行禁令預計 2027-01-18 生效，對服務提供者的禁令則在 2028-07-18 生效"
    ]
  },
  {
    type: "新聞報導", domain: "digital-assets", date: "2026-10-10", source: "經濟日報",
    title: "穩定幣發行 金管會將允跨業合資",
    link: "https://udn.com/news/story/7239/9805542",
    points: [
      "金管會預計下個月預告《虛擬資產服務法》子法，穩定幣發行是重點之一",
      "除了銀行獨資發行，也研議讓銀行與科技業、VASP、境外發行商合資發行，但會限制銀行持股比例",
      "銀行本身最低資本額已達 100 億元，審查重點可能在近年有無重大違規裁罰等法遵紀錄",
      "學者楊岳平研判境外夥伴較可能是香港、新加坡、日本已取得牌照的業者，而不是 Tether 或 Circle",
      "研究啟示：台灣是「銀行主導 + 合資」路線，可與美國 GENIUS Act 開放非銀行發行的模式做對照"
    ]
  },
  {
    type: "白皮書", domain: "payments", date: "2026-03", source: "BIS Papers No 167（Claessens & Rice）",
    title: "Cross-border payment technologies: innovations and challenges",
    link: "https://www.bis.org/publ/bppdf/bispap167.pdf",
    points: [
      "跨境支付（含匯款與零售）在成本、速度、可及性與透明度上，仍明顯落後國內支付",
      "作者認為跨境支付存在多種市場失靈，單靠私部門無法解決，需要公部門主動協作",
      "最主要的瓶頸是互通性不足，根源在多邊市場摩擦與各國制度差異",
      "政策建議：統一訊息傳輸等標準、提升法遵機制效率、強化競爭；私部門也在試行以穩定幣與代幣化資產做跨境支付"
    ]
  },
  {
    type: "研究報告", domain: "wealth", date: "2026-09-09", source: "Cerulli Associates × Vista Equity Partners",
    title: "State of Wealth Management AI Adoption",
    link: "https://www.vistaequitypartners.com/news/advisor-headcount-set-to-grow-as-ai-expands-capacity/",
    points: [
      "樣本為 68 家美國大型 RIA（合計管理約 1.2 兆美元），2026 年 5–7 月調查",
      "AI 支出占科技預算比重預計從 8% 提高到 15%；每家平均 AI 專屬支出約 49.4 萬美元（2025 年約 23.7 萬）",
      "AI 沒有取代顧問：多數公司計畫增聘初階顧問（73%）、客服助理（67%）與資深顧問（56%）",
      "64% 表示 AI 減少了行政作業；依成熟度分級，只有 12% 屬於領先者，一半仍在探索階段",
      "結論：決定 AI 成效的是營運紀律，不是公司規模或預算"
    ],
    verify: true
  },
  {
    type: "監理報告", domain: "sustainable", date: "2026-09-21", source: "NGFS",
    title: "Guide for supervisors: Integrating climate and nature-related risks into prudential supervision（2026）",
    link: "https://www.ngfs.net/en/press-release/ngfs-publishes-2026-guide-supervisors-climate-and-nature-related-financial-risks",
    points: [
      "更新 2020 年版監理指引，把氣候與「自然」相關金融風險一起納入審慎監理",
      "內容涵蓋：實體與轉型風險的傳導管道、與監理職權的關係、組織安排、曝險評估、監理期望與總體／個體審慎工具",
      "新增轉型計畫、調適 (adaptation)、情境與壓力測試、氣候訴訟風險與揭露框架等主題",
      "採「漸進且符合比例」原則，讓不同資源與起點的監理機關都能套用；依據涵蓋 70% 會員轄區的監理機關調查"
    ]
  },
  {
    type: "新聞報導", domain: "sustainable", date: "2026-09-23", source: "Business Insider Taiwan",
    title: "金管會重劃永續揭露門檻：資本額20億以下不強制、1400 家暫緩接軌",
    link: "https://www.businessinsider.tw/article/7473",
    points: [
      "金管會與環境部宣布，IFRS 永續揭露準則強制接軌家數由約 1,970 家降到約 560 家",
      "三階段：資本額 100 億以上 126 家（2026）、50–100 億 118 家（2027）、20–50 億及環境部列管者 316 家（2028）",
      "第三階段範疇三改為自願；保留下來的公司仍涵蓋逾 87% 市值與約 96% 範疇一、二排放",
      "調整理由：中小企業缺工具與人力、國內確信機構量能不足，且歐盟、日、韓也在縮小適用範圍"
    ]
  },
  {
    type: "企業報告", domain: "insurtech", date: "2026-08-06", source: "Gallagher Re（Reinsurance News 報導）",
    title: "Global InsurTech Report Q2 2026",
    link: "https://www.reinsurancene.ws/insurtech-funding-hits-four-year-high-as-ai-firms-capture-99-of-investment-gallagher-re/",
    points: [
      "2026 年第二季保險科技募資 24.4 億美元，是 2022 年第二季以來最高的單季金額",
      "AI 相關公司拿走 99.1% 的資金（約 24.2 億美元、95 筆交易），資金高度集中在 AI",
      "億元級大型輪次回歸，合計約 16.7 億美元；交易數 107 筆，但早期輪次金額季減 51.8%",
      "這波回升主要由創投與私募推動，(再)保險公司本身參與 27 筆科技投資"
    ],
    verify: true
  },
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
