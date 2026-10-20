// 論文雷達：時事 × 一魚兩吃（課堂素材 + 論文切角）
// 排程任務每週一、三、五更新，新的放最前面
window.FT = window.FT || {};
window.FT.thesisUpdated = "2026-10-20";
window.FT.thesis = [
  {
    date: "2026-10-15", domain: "digital-assets",
    headline: "美國 OCC 署長 Gould 於 DC Fintech Week 表示，GENIUS Act 穩定幣最終規則預計 10 月底前發布（原目標 11 月）",
    link: "https://en.bloomingbit.io/feed/news/122298",
    classUse: "課堂：GENIUS Act 生效日為 2027/1/18 或最終規則發布後 120 天（取早者），OCC 提前定案等於啟動發行人申請倒數；可把 OCC 2 月提出的 376 頁草案（準備資產、資本、稽核、監理）對照台灣虛擬資產服務法子法「十足準備、面額贖回、禁止付息、金融機構先行」，做美台穩定幣發行門檻比較表。",
    thesisAngle: "論文：穩定幣監理規則的「確定性」是否影響市場結構？可檢驗：OCC / FDIC 最終規則發布前後，受監理美元穩定幣（USDC 等）相對於離岸穩定幣（USDT）的市占、鏈上轉帳量與二級市場價格偏離（depeg 幅度）是否顯著改變；亦可檢驗 Circle 及擬發行穩定幣之銀行股價對規則里程碑的異常報酬。",
    method: "事件研究法（以 GENIUS Act 立法、各機關草案、最終規則發布日為事件，樣本：COIN、CRCL、參與聯合發行穩定幣之銀行）＋ 鏈上資料（DefiLlama / Artemis 穩定幣市占、Dune 轉帳量）做 DiD（受監理 vs. 離岸穩定幣）。最終規則實際發布日待查證。",
    fit: 5
  },
  {
    date: "2026-10-15", domain: "wealth",
    headline: "渣打攜手摩根大通推出台灣首筆上市櫃股票跨境質押擔保方案，外資可以台股作為境外融資 / 衍生品擔保品",
    link: "https://uanalyze.com.tw/articles/2096857143",
    classUse: "課堂：從 2023/8 金管會開放外資以台股作境外擔保品、2026/3/30 證交所開放質權設定，到本次首筆落地，說明「擔保品流動性」如何成為亞洲資產管理中心政策的一環；可延伸討論若台股未來代幣化（集保 RWA 擬真交易），擔保品移轉能否即時化（collateral mobility）。",
    thesisAngle: "論文：開放台股作為跨境擔保品，是否提升外資持股意願與個股流動性？可檢驗：可作擔保品的大型權值股（例如納入國際指數者）在制度開放後，外資持股比率、借券 / 質押餘額與買賣價差的變化是否顯著大於對照組股票。",
    method: "DiD（以 2026/3/30 質權設定開放與首筆方案上線為事件，處理組：外資高持股或 MSCI 成分股；對照組：其他上市櫃股票），資料：TEJ 外資持股、證交所借券與質押統計、日內價差；搭配個案訪談（保管銀行、外資券商）。實際使用規模待查證。",
    fit: 3
  },
  {
    date: "2026-10-16", domain: "wealth",
    headline: "金管會立院業務報告揭 6 大重點：金融業務知識大語言模型（FinLLM）預計 2027 年第 1 季發布首版",
    link: "https://www.cna.com.tw/news/afe/202610160252.aspx",
    classUse: "課堂：同週金管會調查顯示金融業 AI 使用率由 2024 年 29% 升至 43%、使用者中生成式 AI 導入率達 76%；以「監理機關主導共用 FinLLM」對照「各家自建 / 採購商用模型」，討論公共財模型對中小型金融機構（信合社、中小券商）的意義與資料治理問題。",
    thesisAngle: "論文：產業共用 FinLLM 能否縮小金融機構間的 AI 落差？可檢驗：控制規模與 IT 預算後，中小型機構的生成式 AI 導入意願對「可取得共用模型」的敏感度是否顯著高於大型機構；亦可檢驗 FinLLM 在中文金融法規問答的正確率是否優於通用模型。",
    method: "問卷（金融機構 IT / 法遵主管，搭配金管會 AI 調查的公開統計作為母體對照）＋ Logit / 有序迴歸；或建立中文金融法規問答測試集做模型評測（benchmark）。FinLLM 規格、開放對象待查證。",
    fit: 4
  },
  {
    date: "2026-10-16", domain: "digital-assets",
    headline: "Deutsche Bank 宣布數週內推出首項加密資產保管服務，2027 年擴展至亞洲；穩定幣兌換與代幣化存款列入後續規劃",
    link: "https://financefeeds.com/deutsche-bank-nears-launch-of-first-crypto-custody-service-in-germany/",
    classUse: "課堂：對照台灣 5 家本國銀行（聯邦、中信、凱基、國泰世華、台新）試辦虛擬資產保管、銀行公會年底前報請核備規範，比較德國（MiCA + 銀行執照）與台灣（虛擬資產服務法子法尚在研訂）的銀行保管路徑與風險隔離設計。",
    thesisAngle: "論文：傳統銀行進入加密資產保管，是否降低投資人對交易所保管的依賴？可檢驗：大型銀行宣布 / 上線保管服務後，該市場中心化交易所的機構資金淨流出或鏈上冷錢包集中度是否顯著改變；或以台灣試辦銀行為處理組，檢驗其股價 / 存款結構的事件反應。",
    method: "事件研究法（銀行宣布保管服務日之股價異常報酬，跨國樣本：Deutsche Bank、BNY、State Street、台灣試辦銀行）＋ 鏈上資料（交易所錢包餘額，CryptoQuant / Glassnode）；可加跨國個案比較（MiCA vs. 台灣虛擬資產服務法）。上線確切日期待查證。",
    fit: 4
  },
  {
    date: "2026-10-15", domain: "payments",
    headline: "Visa Direct 以 USDC 預存資金（prefunding）進入正式商轉，銀行等業者可用穩定幣預先注資跨境付款",
    link: "https://coingape.com/visa-advances-stablecoin-strategy-as-usdc-prefunding-hits-live-operations-on-visa-direct/",
    classUse: "課堂：拆解跨境匯款的「預存資金」痛點（需在各國預先放法幣、週末無法調撥），說明穩定幣如何縮短資金占用；搭配 21 家國際銀行合組穩定幣公司的新聞，討論卡組織、銀行、穩定幣發行商在支付價值鏈上的競合。",
    thesisAngle: "論文：穩定幣結算是否降低跨境匯款成本與資金占用？可檢驗：導入穩定幣預存 / 結算的匯款通道，其平均匯款成本（World Bank RPW）或到帳時間是否較未導入通道顯著下降（DiD），並探討台灣若開放新台幣穩定幣對移工匯款市場的潛在效果。",
    method: "World Bank Remittance Prices Worldwide 通道資料 + 業者公開導入時點，DiD；或對支付業者做個案比較 / 深度訪談（Visa、Circle、台灣電子支付業者）。Visa 實際參與機構與規模待查證，宜以 Visa 官方新聞稿為準。",
    fit: 5
  },
  {
    date: "2026-10-13", domain: "wealth",
    headline: "金管會發布「金融業運用代理AI安全諮詢文件」，依資料敏感度、動作影響、能力邊界三軸分級，徵詢意見 30 天",
    link: "https://udn.com/news/story/7239/9812217",
    classUse: "課堂：比較「聊天式 AI」與「代理 AI（能呼叫工具、觸發交易系統）」的風險差異，用文件的三軸分級為理財機器人、智能客服、自動核保等情境打分，討論「數位員工」該如何問責。",
    thesisAngle: "論文：金融機構導入代理 AI 的意願與治理成熟度是否受監理指引影響？可檢驗：諮詢文件發布後，銀行 / 券商 / 投信在年報、永續報告書中揭露的 AI 治理措施（權限控管、人工覆核、稽核軌跡）是否顯著增加，且大型機構增幅較大。",
    method: "文字探勘（公開資訊觀測站年報、永續報告書、法說會逐字稿，建立 AI 治理揭露指標）＋ 前後比較 / DiD（以已導入生成式 AI 之機構為處理組）；可加半結構式訪談資訊長。諮詢期 30 天，定稿內容待查證。",
    fit: 4
  },
  {
    date: "2026-10-12", domain: "digital-assets",
    headline: "FSB 於 G20 財長會議前發布全球穩定幣跨境脆弱性報告：監理框架尚未經壓力與破產情境檢驗",
    link: "https://cryptotimes.io/2026/10/12/fsb-flags-stablecoin-and-ai-risks-ahead-of-g20-meeting",
    classUse: "課堂：用 FSB 定義「全球穩定幣」（跨司法管轄區規模 + 系統重要性），對照 2025 年同儕檢視僅 11/28 個轄區完成穩定幣框架，討論台灣虛擬資產服務法子法（金管會預計 11 月預告）該如何處理境外穩定幣。",
    thesisAngle: "論文：大型穩定幣的贖回壓力是否會傳導至其準備資產市場？可檢驗：USDT / USDC 大額淨贖回日，短天期美國國庫券殖利率與附買回利率是否出現顯著異常變動，且效果在監理不明確的發行者較強。",
    method: "鏈上資料（發行 / 銷毀量，DefiLlama、Etherscan）＋ 美國 T-bill / 附買回利率日資料（FRED）；事件研究法或 VAR / 局部投影法。FSB 原文應以 fsb.org 公布之 note 為準，二手報導細節待查證。",
    fit: 5
  },
  {
    date: "2026-10-13", domain: "payments",
    headline: "Wells Fargo 法說會：為穩定幣機會做準備、已對企業客戶推出代幣化存款；21 家國際銀行合組穩定幣公司，擬 2027 上半年發行美元穩定幣",
    link: "https://coingape.com/wells-fargo-ceo-says-bank-is-preparing-for-potential-stablecoin-opportunities-in-the-us/",
    classUse: "課堂：同一家銀行同時做「代幣化存款」與「參與穩定幣合資」——用這個案例解釋兩者在負債性質、可流通範圍、監理（GENIUS Act / MiCA）上的差異，並對照台灣金管會允許跨業合資發行穩定幣的規劃。",
    thesisAngle: "論文：銀行聯合發行穩定幣是防禦性策略還是擴張性策略？可檢驗：宣布加入穩定幣聯盟的銀行，其宣布日股價異常報酬是否與其支付手續費收入占比、存款流失風險（非計息存款比重）相關。",
    method: "事件研究法（聯盟宣布日，參與 vs. 未參與大型銀行 CAR）＋ 橫斷面迴歸（解釋變數取自 FR Y-9C / 年報）；台灣延伸可做銀行訪談比較。聯盟名單與時程依二手報導，待查證官方新聞稿。",
    fit: 5
  },
  {
    date: "2026-10-11", domain: "payments",
    headline: "評論：穩定幣 vs. 代幣化存款，建立共通標準才是數位貨幣的勝負手",
    link: "https://ec.ltn.com.tw/article/breakingnews/5602277",
    classUse: "課堂：用「發行者負債性質、準備資產、贖回責任」三軸比較穩定幣、存款代幣與 CBDC，搭配金管會 9/22 開放存款代幣試辦（目前僅台新表態、先做行內）做台灣現況簡報。",
    thesisAngle: "論文：在台灣制度下，銀行選擇發行存款代幣或參與穩定幣合資的決定因素為何？銀行規模、數位化程度、跨境業務比重是否顯著影響參與意願？",
    method: "個案比較 ＋ 半結構式訪談（銀行數位金融部門）；輔以銀行年報 / 法說會逐字稿文字探勘（關鍵字：存款代幣、穩定幣、RWA）建立參與意願指標，做 logit 迴歸。屬評論文章，觀點非官方立場。",
    fit: 5
  },
  {
    date: "2026-10-08", domain: "digital-assets",
    headline: "日本財務省召開代幣化國債研究會首次會議，提出三種 JGB 上鏈模式",
    link: "https://crypto-economy.com/japan-explores-putting-government-bonds-on-chain-to-attract-new-investors/",
    classUse: "課堂：主權債代幣化的三條路（既有債券數位包裝 vs. 原生數位發行等），討論對清算、保管機構的衝擊，可對照台灣央債與集保結算所的角色。",
    thesisAngle: "論文：代幣化公債（如 BlackRock BUIDL、Ondo 等代幣化美債）相對傳統公債是否具有可量化的結算效率或流動性溢酬？主權債代幣化公告是否影響相關基礎設施業者股價？",
    method: "事件研究法（日本 MoF 公告前後，日本交易所集團、銀行、保管機構股價異常報酬）＋ 代幣化美債鏈上資料（RWA.xyz）的殖利率價差比較。目前僅有二手報導，三種模式細節待查證，請以財務省官網會議資料為準。",
    fit: 4
  },
  {
    date: "2026-10-05", domain: "digital-assets",
    headline: "印尼 OJK：盧比穩定幣、資產代幣化等規範目標 2027 年初完成，並與印尼央行協調",
    link: "https://en.tempo.co/read/2121273/indonesia-targets-stablecoin-regulations-by-early-2027-ojk-says",
    classUse: "課堂：亞洲穩定幣監理比較——印尼（OJK 管、央行推數位盧比、穩定幣暫不可作支付工具）vs. 台灣（虛擬資產服務法、發行須會商央行）vs. 香港。",
    thesisAngle: "論文：亞洲各國穩定幣監理框架在「發行主體限制、準備資產要求、支付用途」上的差異，是否與該國貨幣主權顧慮（資本管制程度、美元化程度）系統性相關？",
    method: "比較法制研究 ＋ 監理強度指標編碼（參考 regulatory index 文獻），跨國橫斷面比較（台、港、星、日、韓、印尼）；資料來源：各國監理機關文件、IMF AREAER 資本管制資料。",
    fit: 4
  },
  {
    date: "2026-09-30", domain: "sustainable",
    headline: "英國 FCA 發布 PS26/19：上市公司依 UK SRS（ISSB 基礎）採「遵循或解釋」揭露，放棄原擬強制氣候揭露",
    link: "https://www.fca.org.uk/publications/policy-statements/ps26-19-aligning-listed-issuers-sustainability-disclosures-international-standards",
    classUse: "課堂：強制 vs. comply-or-explain 的監理哲學辯論；對照台灣金管會依 IFRS S1/S2 分階段強制上市櫃公司永續揭露的路線。",
    thesisAngle: "論文：永續揭露採「強制」或「遵循或解釋」制度，對企業揭露品質與資金成本的影響是否不同？台灣強制接軌 IFRS S1/S2 後，揭露品質提升是否反映在權益資金成本下降？",
    method: "DiD：以台灣分階段適用（依資本額）為準自然實驗，比較首批 vs. 後批適用公司的揭露品質（文字探勘評分）與資金成本（implied cost of capital）；資料：TEJ、公開資訊觀測站永續報告書。新聞日期略早於 3 天窗口，因永續領域本週缺新聞而納入。",
    fit: 4
  },
  {
    date: "2026-10-08", domain: "digital-assets",
    headline: "ESMA 要求各國監理機關於 2027/1/8 前處理未取得 MiCA 授權的穩定幣（USDT、PYUSD 等）曝險",
    link: "https://cointelegraph.com/news/esma-unauthorised-stablecoins-three-month-deadline",
    classUse: "課堂：MiCA 從「立法」走到「執法」的實例——Coinbase 已對歐洲用戶下架 USDT / PYUSD / DAI 並強制轉 USDC，可做監理如何重塑穩定幣市場結構的簡報。",
    thesisAngle: "論文：監理授權（MiCA 合規 vs. 不合規）是否造成歐洲交易所穩定幣交易量與市占的移轉？合規穩定幣（USDC、EURC）是否出現顯著的流入？",
    method: "事件研究法 / DiD：以 ESMA 公告與交易所下架日為事件，比較 EEA 交易所 vs. 非 EEA 交易所的 USDT / USDC 交易量與鏈上流量（Kaiko、CoinGecko、Dune、Artemis）。可延伸對照台灣《虛擬資產服務法》子法設計。",
    fit: 5
  },
  {
    date: "2026-10-08", domain: "wealth",
    headline: "IMF《全球金融穩定報告》代幣化專章：代幣化股票流動性較低、波動較高，逾半交易發生在正常交易時段外",
    link: "https://cointelegraph.com/news/imf-flags-volatility-liquidity-risks-tokenized-markets-grow",
    classUse: "課堂：RWA / 代幣化股票的效率與脆弱性兩面——24/7 交易、碎股化帶來的投資人行為與流動性風險，適合做正反辯論。",
    thesisAngle: "論文：代幣化股票相對其標的股票是否存在系統性的價格偏離與流動性折價？非交易時段的價格變動能否預測隔日標的股開盤報酬（價格發現）？",
    method: "配對樣本比較 ＋ 時間序列（Amihud 非流動性指標、realized volatility、premium/discount）；資料來源：鏈上交易資料（Dune、RWA.xyz）＋ 標的股 TAQ / Yahoo Finance。IMF 原始報告細節待查證，引用前請讀 GFSR 原文。",
    fit: 4
  },
  {
    date: "2026-10-09", domain: "payments",
    headline: "美國 NCUA 提案要求信用合作社於季報新增 26 項穩定幣相關申報欄位",
    link: "https://news.bitcoin.com/regulation-and-legal/credit-unions-could-face-26-new-stablecoin-reporting-fields",
    classUse: "課堂：GENIUS Act 落地後，監理機關如何用「申報資料」掌握穩定幣曝險——可對照台灣金管會對銀行試辦存款代幣 / 穩定幣的監理工具。",
    thesisAngle: "論文：小型存款機構參與穩定幣業務，是否會導致存款流失或改變其流動性結構？監理申報要求是否提高參與門檻？",
    method: "未來可用 NCUA 5300 Call Report 公開資料做面板迴歸 / DiD（參與 vs. 未參與機構）；短期內可做監理文件文字探勘與跨機構（Fed、OCC、NCUA）規則比較。提案內容細節待查證。",
    fit: 3
  },
  {
    date: "2026-10-08", domain: "insurtech",
    headline: "金管會：高雄專區試辦保單達效益，10 家壽險業可於專區外銷售給高資產客戶",
    link: "https://tw.stock.yahoo.com/news/%E9%87%91%E7%AE%A1%E6%9C%83-%E9%96%8B%E6%94%BE%E9%AB%98%E9%9B%84%E5%B0%88%E5%8D%80%E8%B2%A1%E7%AE%A1%E4%BF%9D%E9%9A%AA%E5%95%86%E5%93%81-%E8%90%BD%E5%9C%B0%E5%85%A8%E5%8F%B0-090913476.html",
    classUse: "課堂：「監理沙盒 / 專區試辦 → 全國推廣」的政策擴散路徑，可搭配高雄專區與家族辦公室規範做財富管理監理專題。",
    thesisAngle: "論文：專區試辦商品擴大至全台後，獲准壽險公司的高資產客戶保費收入是否顯著成長？試辦—推廣模式是否提升監理效率？",
    method: "DiD：10 家獲准業者 vs. 其他壽險公司的保費月報（保險事業發展中心、壽險公會公開資料）；搭配業者訪談的個案研究。新聞確切發布日待查證。",
    fit: 3
  },
  {
    date: "2026-10-10", domain: "digital-assets",
    headline: "金管會擬允許穩定幣跨業合資發行（銀行 + 科技業 / VASP / 境外發行商）",
    link: "https://udn.com/news/story/7239/9805542",
    classUse: "課堂：比較「銀行獨資 vs. 跨業合資」的穩定幣發行模式，可做成產業結構與競合分析的簡報。",
    thesisAngle: "論文：發行人型態（銀行 / 非銀行 / 合資）如何影響穩定幣的信任、儲備透明度與脫鉤風險？",
    method: "跨國比較（美國 GENIUS Act、歐盟 MiCA、香港穩定幣條例）＋ 事件研究法看監理公告對相關個股反應。",
    fit: 5
  },
  {
    date: "2026-09-22", domain: "payments",
    headline: "金管會開放銀行申請試辦「存款代幣」業務",
    link: "https://www.banking.gov.tw/",
    classUse: "課堂：解釋存款代幣（tokenized deposits）和穩定幣、CBDC 的差異，是很好的三角比較圖。",
    thesisAngle: "論文：存款代幣能否降低跨行 / 跨境清算成本？對銀行存款結構與流動性有什麼影響？",
    method: "個案研究（試辦銀行）＋ 訪談；或用國際試點（如 JPM Kinexys、Project Agorá）做比較。",
    fit: 4
  },
  {
    date: "2026-06-30", domain: "digital-assets",
    headline: "《虛擬資產服務法》三讀，VASP 改許可制；穩定幣發行須會商央行",
    link: "https://abmedia.io/taiwan-virtual-asset-act-crypto-regulation",
    classUse: "課堂：監理從「登記制 → 許可制」的轉變，可作為金融監理與創新平衡的教材。",
    thesisAngle: "論文：專法上路前後，台灣 VASP 的市占、交易量與用戶信任是否改變？（自然實驗）",
    method: "差異中的差異 (DiD)：以台灣 vs. 未立法市場比較；或問卷調查用戶信任變化。",
    fit: 4
  },
  {
    date: "2026-10-08", domain: "wealth",
    headline: "金管會發布「銀行辦理家族辦公室顧問業務規範」",
    link: "https://www.banking.gov.tw/",
    classUse: "課堂：財富管理分眾化——高資產客戶服務如何數位化。",
    thesisAngle: "論文：高資產財管數位化（WealthTech）與一般大眾 Robo-Advisor 的服務落差與監理差異。",
    method: "文獻回顧 ＋ 業者個案比較。",
    fit: 3
  }
];
