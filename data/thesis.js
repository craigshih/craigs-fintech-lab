// 論文雷達：時事 × 一魚兩吃（課堂素材 + 論文切角）
// 排程任務每週一、三、五更新，新的放最前面
window.FT = window.FT || {};
window.FT.thesisUpdated = "2026-10-11";
window.FT.thesis = [
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
