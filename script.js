const STORAGE_KEY = 'rfAfterHoursSaveV1';

const initialStats = { pmAffection: 0, childTrust: 0, rfExpertise: 0, workReputation: 0, lifeBalance: 0 };
const labels = { pmAffection:'PM 好感度', childTrust:'Child Trust', rfExpertise:'RF Expertise', workReputation:'Work Reputation', lifeBalance:'Life Balance' };

const story = {
  start:{bg:'office',time:'RD OFFICE · 17:40',char:'rf',exp:'normal',speaker:'旁白',text:'星期二，下午五點四十分。辦公室裡響起收筆電、拉外套，和假裝沒看見主管的細碎聲音。',next:'s02'},
  s02:{bg:'office',time:'RD OFFICE · 17:42',char:'rf',exp:'normal',speaker:'林致遠｜RF Engineer',text:'致遠把最後一封信標成已讀。今天如果順利，他能趕上六點十二分的捷運。',next:'s03'},
  s03:{bg:'office',char:'pm',exp:'serious',speaker:'周予晴｜PM',text:'「OTA 剛剛通知我，n77 TRP 掉了 3 dB。」',next:'s04',sfx:'message'},
  s04:{bg:'office',char:'rf',exp:'serious',speaker:'林致遠',text:'「哪個 Band？」',next:'s05'},
  s05:{bg:'office',char:'pm',exp:'serious',speaker:'周予晴',text:'「n77。Golden sample 正常，明天九點客戶要看結果。」',next:'s06'},
  s06:{bg:'office',char:'rf',exp:'serious',speaker:'林致遠',text:'他的手停在背包拉鍊上。「Mechanical 有改嗎？」',next:'s07'},
  s07:{bg:'office',char:'pm',exp:'tired',speaker:'周予晴',text:'「下午剛換新的 housing。」她回答得很快，眼下卻藏著今天已經過長的疲倦。',choices:[
    {text:'直接去 OTA Lab',next:'c1a',effects:{workReputation:1}},
    {text:'先把 Golden sample 一起帶去',next:'c1b',effects:{rfExpertise:2,workReputation:1}},
    {text:'先問她今天是不是有事',next:'c1c',effects:{pmAffection:1,lifeBalance:1}}
  ]},
  c1a:{bg:'ota',time:'OTA CHAMBER · 17:55',char:'rf',exp:'serious',speaker:'林致遠',text:'「我先看數據。」他直奔暗室，卻在五分鐘後又回頭拿 Golden sample。快，不一定等於少走路。',next:'s08'},
  c1b:{bg:'ota',time:'OTA CHAMBER · 17:55',char:'rf',exp:'serious',speaker:'林致遠',text:'「Golden sample 帶上。同一個 setup 直接 A/B，比猜測快。」予晴點頭，把這句寫進 issue tracker。',next:'s08'},
  c1c:{bg:'office',char:'pm',exp:'surprised',speaker:'周予晴',text:'「我？沒事。」她看了一眼手機，又把螢幕扣回桌面。「先處理專案。」',next:'s08'},
  s08:{bg:'lab',time:'RF LAB · 18:18',char:'rf',exp:'serious',speaker:'旁白',text:'暗室的 re-test 重現了差異。致遠把兩台機器接上 VNA，曲線在螢幕上分開，像一句說到一半的話。',next:'s09'},
  s09:{bg:'lab',char:'pm',exp:'normal',speaker:'周予晴',text:'「客戶問多久可以解完。」',next:'s10'},
  s10:{bg:'lab',char:'rf',exp:'normal',speaker:'林致遠',text:'「不知道。」',next:'s11'},
  s11:{bg:'lab',char:'pm',exp:'serious',speaker:'周予晴',text:'「那我要怎麼回？」',next:'s12'},
  s12:{bg:'lab',char:'rf',exp:'normal',speaker:'林致遠',text:'「告訴他正在 Debug。」',next:'s13'},
  s13:{bg:'lab',char:'pm',exp:'tired',speaker:'周予晴',text:'「他就是因為知道我們在 Debug，才問要多久。」',next:'s14'},
  s14:{bg:'lab',char:'rf',exp:'normal',speaker:'林致遠',text:'「……這就是 PM 存在的理由吧。」',next:'s15'},
  s15:{bg:'lab',char:'pm',exp:'smile',speaker:'周予晴',text:'她盯著他兩秒，最後還是笑了。「林致遠，你最好真的很會 Debug。」',choices:[
    {text:'比對 Housing 拆裝前後',next:'c2a',effects:{rfExpertise:2}},
    {text:'先把 PA Power 調高補 3 dB',next:'c2b',effects:{rfExpertise:-1}},
    {text:'重刷一次 Software 排除變因',next:'c2c',effects:{workReputation:1}}
  ]},
  c2a:{bg:'lab',char:'rf',exp:'serious',speaker:'林致遠',text:'「Golden sample 正常、軟體相同，先回到唯一改過的東西。」他鬆開 housing，S11 的凹點慢慢回到原位。',next:'s16'},
  c2b:{bg:'lab',char:'rf',exp:'tired',speaker:'林致遠',text:'Power 拉高了，TRP 卻沒有如預期回來。「……不是 Power。我剛才想太快了。」承認得乾脆，也是 Debug 的一部分。',next:'s16'},
  c2c:{bg:'lab',char:'rf',exp:'serious',speaker:'旁白',text:'重刷沒有改變結果，卻替團隊劃掉一條岔路。錯誤沒有消失，但範圍變小了。',next:'s16'},
  s16:{bg:'lab',time:'RF LAB · 19:03',char:'pm',exp:'tired',speaker:'旁白',text:'七點過後，Lab 只剩儀器的風扇聲。予晴反覆點亮手機，像在等另一條看不見的進度更新。',next:'s17'},
  s17:{bg:'lab',char:'pm',exp:'tired',speaker:'周予晴',text:'她終於接起電話，聲音忽然柔下來。「寶貝，媽媽今天可能會晚一點。你先跟老師吃飯，好不好？」',next:'s18'},
  s18:{bg:'lab',char:'pm',exp:'serious',speaker:'旁白',text:'掛掉電話後，她安靜了三秒，再抬頭時，已經換回會議裡那張冷靜的臉。',next:'s19'},
  s19:{bg:'lab',char:'pm',exp:'serious',speaker:'周予晴',text:'「所以你覺得是 Antenna matching，還是 Housing？」',choices:[
    {text:'Housing 先拆掉確認',next:'c3a',effects:{rfExpertise:1,workReputation:1}},
    {text:'妳是不是要去接小孩？',next:'c3b',effects:{pmAffection:2,lifeBalance:2}},
    {text:'先看 Smith Chart',next:'c3c',effects:{rfExpertise:1}}
  ]},
  c3a:{bg:'lab',char:'rf',exp:'serious',speaker:'林致遠',text:'「先拆 housing。」他頓了一下，又指向她的手機。「還有，妳是不是有地方要去？」',next:'s20'},
  c3b:{bg:'lab',char:'pm',exp:'surprised',speaker:'周予晴',text:'「蛤？」這個晚上第一次，追著所有人進度的 PM 沒接上下一句。',next:'s20'},
  c3c:{bg:'lab',char:'rf',exp:'serious',speaker:'林致遠',text:'「先看 Smith Chart……」他放大軌跡，卻發現自己在意的是她剛才那三秒沉默。「還有，妳要去接小孩吧？」',next:'s20'},
  s20:{bg:'lab',char:'rf',exp:'normal',speaker:'林致遠',text:'「妳去吧。測試我留下來跑。」',next:'s21'},
  s21:{bg:'lab',char:'pm',exp:'serious',speaker:'周予晴',text:'「可是明天早上客戶——」',next:'s22'},
  s22:{bg:'lab',char:'rf',exp:'normal',speaker:'林致遠',text:'「九點以前，我會給妳結果。」',next:'s23'},
  s23:{bg:'lab',char:'pm',exp:'tired',speaker:'周予晴',text:'「我不需要你因為我是單親媽媽——」她的語氣很平，卻像早已練習過很多次。',choices:[
    {text:'不是同情，是分工',next:'c4a',effects:{pmAffection:2,workReputation:1}},
    {text:'明早記得幫我帶咖啡',next:'c4b',effects:{pmAffection:1,lifeBalance:1}},
    {text:'因為 RF 本來就是我的工作',next:'c4c',effects:{rfExpertise:1}}
  ]},
  c4a:{bg:'lab',char:'rf',exp:'normal',speaker:'林致遠',text:'「不是同情，是分工。妳處理妳現在非處理不可的，我處理我能處理的。」',next:'s24'},
  c4b:{bg:'lab',char:'rf',exp:'smile',speaker:'林致遠',text:'「那明早記得幫我帶咖啡。無糖。」他把人情改寫成一件很小、很容易歸還的事。',next:'s24'},
  c4c:{bg:'lab',char:'rf',exp:'normal',speaker:'林致遠',text:'「RF 本來就是我的工作。接小孩不是妳可以延後到明天的工作。」',next:'s24'},
  s24:{bg:'parking',time:'B2 PARKING · 19:16',char:'pm',exp:'tired',speaker:'旁白',text:'電梯門合上前，予晴按住開門鍵，看了他一眼。「……不要只吃餅乾。樓下便利商店有關東煮。」',next:'s25'},
  s25:{bg:'parking',char:'rf',exp:'surprised',speaker:'林致遠',text:'他還沒來得及回答，門已經關上。手機隨即震了一下，是她傳來的訊息：老師那邊趕得上，謝謝。',next:'s26'},
  s26:{bg:'lab',time:'RF LAB · 21:08',char:'rf',exp:'tired',speaker:'旁白',text:'問題最後落在新版 housing 內側的一片導電泡棉。壓合公差讓天線環境偏移，3 dB 並沒有消失，只是躲得很好。',choices:[
    {text:'先整理完整數據再回報',next:'c5a',effects:{rfExpertise:2,workReputation:2}},
    {text:'立刻傳訊息讓她放心',next:'c5b',effects:{pmAffection:2,lifeBalance:1}},
    {text:'兩件都做，但先去買晚餐',next:'c5c',effects:{lifeBalance:2,rfExpertise:1,pmAffection:1}}
  ]},
  c5a:{bg:'lab',char:'rf',exp:'serious',speaker:'林致遠',text:'他附上 A/B data、S11 與暫行對策。送出報告時，訊息框裡多了一句：「已定位，妳不用回公司。」',next:'finale'},
  c5b:{bg:'lab',char:'rf',exp:'normal',speaker:'林致遠',text:'他先傳：「找到原因了，今晚能收。」想了想，又補上：「小孩接到了嗎？」',next:'finale'},
  c5c:{bg:'convenience',time:'CONVENIENCE STORE · 21:14',char:'rf',exp:'tired',speaker:'旁白',text:'他第一次在測試還沒完全結束前離開儀器五分鐘。蘿蔔、黑輪、一杯熱湯；Life Balance 有時只是一頓沒被省略的晚餐。',next:'finale'},
  finale:{bg:'lab',time:'RF LAB · 21:42',char:'pm',exp:'smile',speaker:'周予晴｜訊息',text:'「接到了。她說謝謝那個讓媽媽可以準時出現的工程師。」',next:'end'},
  end:{bg:'office',time:'NEXT MORNING · 08:47',char:'rf',exp:'normal',speaker:'旁白',text:'一杯無糖咖啡放在致遠桌上。杯套背面寫著：3 dB 已回收。只是螢幕上最新的 OTA 結果，仍亮著紅色的 FAIL。',choices:[{text:'進入第二日｜早上九點以前',next:'d2_01'}],end:true},

  d2_01:{chapter:2,bg:'office',time:'RD OFFICE · 08:35',char:'rf',exp:'tired',speaker:'旁白',text:'第二日。致遠剛走進辦公室，咖啡甚至還沒打開，手機就連續震了三次。',next:'d2_02'},
  d2_02:{chapter:2,bg:'office',char:'pm',exp:'serious',speaker:'周予晴｜訊息',text:'「Meeting Room 3。現在。Customer 已經上線了。」',next:'d2_03',sfx:'message'},
  d2_03:{chapter:2,bg:'office',char:'rf',exp:'tired',speaker:'旁白',text:'他看了一眼昨晚留下的數據。Certification Window 已經逼近，而螢幕上仍是一個刺眼的結果。',data:[['n77 TRP','FAIL','fail'],['距離認證門檻','-2.6 dB','fail'],['Certification','THIS WEEK',''],['風險','Launch Schedule / Hardware','wide']],next:'d2_04'},
  d2_04:{chapter:2,bg:'meeting',time:'MEETING ROOM 3 · 08:38',char:'pm',exp:'serious',speaker:'旁白',text:'大型會議室坐滿了 RF、Antenna、Mechanical、SW、Certification 與 Program Team。螢幕另一端，客戶 PM 和 RF Engineer 已經上線。',next:'d2_05'},
  d2_05:{chapter:2,bg:'meeting',char:'pm',exp:'serious',speaker:'客戶 PM',text:'「We need to understand what happened. Certification is scheduled this week. If TRP cannot pass, the whole schedule will be impacted.」',next:'d2_06'},
  d2_06:{chapter:2,bg:'meeting',char:'rf',exp:'serious',speaker:'旁白',text:'主管追問昨天是否只是 Housing 問題。Antenna、Mechanical、SW 各自說明目前沒有直接證據。最後，所有人的視線落在致遠身上。予晴沒有催，只是安靜地等。',choices:[
    {text:'目前還沒有 Root Cause',next:'d2_c1a',effects:{workReputation:0}},
    {text:'應該是 Antenna 問題',next:'d2_c1b',effects:{rfExpertise:-1,workReputation:-1}},
    {text:'Housing 前後有差異，但需要完整 A/B comparison',next:'d2_c1c',effects:{rfExpertise:2,workReputation:2}},
    {text:'先把 PA Power 調高應該可以過',next:'d2_c1d',effects:{rfExpertise:-2}}
  ]},
  d2_c1a:{chapter:2,bg:'meeting',char:'rf',exp:'serious',speaker:'林致遠',text:'「目前還沒有 Root Cause。」答案誠實，卻不足以讓會議往前。他停了一秒，補上：「但我們有一條可以驗證的方向。」',next:'d2_07'},
  d2_c1b:{chapter:2,bg:'meeting',char:'rf',exp:'tired',speaker:'林致遠',text:'「可能是 Antenna。」Antenna Engineer 皺起眉。致遠立刻修正：「這只是 Hypothesis，我們還沒有足夠 Evidence。」',next:'d2_07'},
  d2_c1c:{chapter:2,bg:'meeting',char:'rf',exp:'serious',speaker:'林致遠',text:'「目前還不能直接定義 Root Cause。但 Golden、Issue Sample 和不同 Housing 的初步 Comparison，顯示差異與 Housing 高度相關。」',next:'d2_07'},
  d2_c1d:{chapter:2,bg:'meeting',char:'rf',exp:'tired',speaker:'林致遠',text:'「拉高 Power 也許能補。」客戶 RF Engineer 立刻問起 SAR 與 conducted limit。致遠停住：「……先不動 Power Table。我們回到 Evidence。」',next:'d2_07'},
  d2_07:{chapter:2,bg:'meeting',char:'rf',exp:'serious',speaker:'測試結果',text:'昨晚 A/B Comparison',data:[['Golden Sample','PASS','pass'],['Issue + Original Housing','接近 PASS',''],['Issue + New Housing','-2.6 dB','fail'],['待驗證','Matching / Ground / 公差','wide']],next:'d2_08'},
  d2_08:{chapter:2,bg:'meeting',char:'rf',exp:'serious',speaker:'林致遠',text:'「但這不代表一定是 Mechanical。還可能包含 Antenna matching、Ground coupling，甚至裝配公差。」',next:'d2_09'},
  d2_09:{chapter:2,bg:'meeting',char:'rf',exp:'serious',speaker:'客戶 RF Engineer',text:'「Can you recover it？」',choices:[
    {text:'可以',next:'d2_c2a',effects:{workReputation:-1}},
    {text:'不知道',next:'d2_c2b',effects:{rfExpertise:1}},
    {text:'今天先把 Root Cause 縮小到可以行動的範圍',next:'d2_c2c',effects:{rfExpertise:2,workReputation:2}},
    {text:'這個需要 Antenna Team 回答',next:'d2_c2d',effects:{workReputation:-1}}
  ]},
  d2_c2a:{chapter:2,bg:'meeting',char:'rf',exp:'serious',speaker:'林致遠',text:'「可以。」話一出口，他知道那不是結論，而是願望。予晴沒有拆穿，只在筆記上把承諾畫了一個圈。',next:'d2_10'},
  d2_c2b:{chapter:2,bg:'meeting',char:'rf',exp:'normal',speaker:'林致遠',text:'「現在不知道。Evidence 還不夠。」他不是逃避；對工程師而言，不知道只是尚未完成的判斷。',next:'d2_10'},
  d2_c2c:{chapter:2,bg:'meeting',char:'rf',exp:'serious',speaker:'林致遠',text:'「我不能保證今天 Recover 全部 2.6 dB。但今天會把 Root Cause 縮小到可以做 Decision 的範圍。」',next:'d2_10'},
  d2_c2d:{chapter:2,bg:'meeting',char:'rf',exp:'normal',speaker:'林致遠',text:'「需要 Antenna Team 一起確認。」他把責任分了出去，卻沒有回答客戶真正想知道的風險。',next:'d2_10'},
  d2_10:{chapter:2,bg:'meeting',char:'pm',exp:'serious',speaker:'客戶 PM',text:'「By when？」',next:'d2_11'},
  d2_11:{chapter:2,bg:'meeting',char:'pm',exp:'serious',speaker:'周予晴',text:'「We will provide the first update before 2 PM. If hardware modification is required, we will also provide the impact assessment.」',next:'d2_12'},
  d2_12:{chapter:2,bg:'meeting',char:'rf',exp:'normal',speaker:'旁白',text:'致遠轉頭看她。她沒有看他，只把模糊的技術風險，切成客戶聽得懂的 Action、Timeline 與 Decision。',next:'d2_13',effects:{pmAffection:1}},
  d2_13:{chapter:2,bg:'office',time:'OUTSIDE MEETING ROOM · 09:20',char:'rf',exp:'serious',speaker:'RF Manager',text:'「今天這個第一 Priority。需要什麼 Resource 直接講。」',next:'d2_14'},
  d2_14:{chapter:2,bg:'office',char:'rf',exp:'serious',speaker:'林致遠',text:'「一台 Golden、一台 Fail Sample，三套不同 Housing。OTA Chamber 今天先 Reserve 給我。」',next:'d2_15'},
  d2_15:{chapter:2,bg:'office',char:'pm',exp:'normal',speaker:'周予晴',text:'「我處理。」',next:'d2_16'},
  d2_16:{chapter:2,bg:'office',char:'rf',exp:'normal',speaker:'林致遠',text:'「妳剛才說兩點。我沒有說兩點能找到答案。」',next:'d2_17'},
  d2_17:{chapter:2,bg:'office',char:'pm',exp:'smile',speaker:'周予晴',text:'「我知道。我說的是 Update，不是 Root Cause。」她停下腳步。「工程師負責解問題，PM 負責替你爭取解問題的時間。」',next:'d2_18',effects:{pmAffection:1,workReputation:1}},
  d2_18:{chapter:2,bg:'office',time:'RD OFFICE · 09:27',char:'rf',exp:'normal',speaker:'旁白',text:'兩人準備往 RF Lab 走。致遠忽然注意到她桌上的飯糰還保持著便利商店貨架上的完整形狀。',next:'d2_19'},
  d2_19:{chapter:2,bg:'office',char:'rf',exp:'normal',speaker:'林致遠',text:'「妳沒吃早餐？昨天幾點睡？」',next:'d2_20'},
  d2_20:{chapter:2,bg:'office',char:'pm',exp:'tired',speaker:'周予晴',text:'「不知道。小孩今天早上還差點遲到。」她說完才察覺自己不小心交代了工作以外的事。',choices:[
    {text:'辛苦了',next:'d2_c3a',effects:{pmAffection:1}},
    {text:'妳先吃早餐，Lab 我先去',next:'d2_c3b',effects:{pmAffection:2,lifeBalance:2}},
    {text:'所以昨天幾點接到小孩？',next:'d2_c3c',effects:{pmAffection:1,lifeBalance:1}},
    {text:'專案比較重要',next:'d2_c3d',effects:{pmAffection:-2,lifeBalance:-2}}
  ]},
  d2_c3a:{chapter:2,bg:'office',char:'pm',exp:'normal',speaker:'周予晴',text:'「大家都辛苦。」她習慣性地把自己的疲憊藏回團隊裡。致遠指了指飯糰：「至少先吃兩口。」',next:'d2_21'},
  d2_c3b:{chapter:2,bg:'office',char:'rf',exp:'normal',speaker:'林致遠',text:'「妳先吃。OTA Chamber 又不會因為妳五分鐘沒出現就跑掉。」',next:'d2_21'},
  d2_c3c:{chapter:2,bg:'office',char:'pm',exp:'surprised',speaker:'周予晴',text:'「七點二十。差三分鐘老師就要打第二通電話。」她看著他。「你真的記得這件事？」',next:'d2_21'},
  d2_c3d:{chapter:2,bg:'office',char:'pm',exp:'serious',speaker:'周予晴',text:'「我知道。」她收起飯糰，也收起剛才短暫露出的生活。兩人之間重新只剩下 Schedule。',next:'d2_21'},
  d2_21:{chapter:2,bg:'office',char:'pm',exp:'smile',speaker:'周予晴',text:'「客戶可能會跑掉。」',next:'d2_22'},
  d2_22:{chapter:2,bg:'office',char:'rf',exp:'smile',speaker:'林致遠',text:'「那更應該吃。」',next:'d2_23'},
  d2_23:{chapter:2,bg:'office',char:'pm',exp:'smile',speaker:'周予晴',text:'她看著手上的飯糰，露出一點無奈的笑。「你們 RF 講話都這樣嗎？」',next:'d2_24'},
  d2_24:{chapter:2,bg:'office',char:'rf',exp:'normal',speaker:'林致遠',text:'「只有訊號不好的時候。」',next:'d2_25'},
  d2_25:{chapter:2,bg:'lab',time:'RF LAB · 09:38',char:'rf',exp:'serious',speaker:'今日 Debug Plan',text:'先用最少的假設，把問題拆成可以驗證的步驟。',data:[['1','Golden / Fail A-B',''],['2','Housing swap',''],['3','Antenna S11',''],['4','Conducted Tx Power',''],['5','OTA TRP re-test',''],['6','Ground / contact inspection','']],choices:[
    {text:'先調高 Tx Power',next:'d2_c4a',effects:{rfExpertise:-1}},
    {text:'先做 Conducted Power 確認',next:'d2_c4b',effects:{rfExpertise:2,workReputation:1}},
    {text:'直接拆 Antenna',next:'d2_c4c',effects:{rfExpertise:0}},
    {text:'重新刷 Software',next:'d2_c4d',effects:{rfExpertise:0}}
  ]},
  d2_c4a:{chapter:2,bg:'lab',char:'rf',exp:'tired',speaker:'林致遠',text:'「先不拉 Power。」他在動手前否決了自己。「那會改變限制條件，卻不會告訴我們損失在哪裡。」',next:'d2_26'},
  d2_c4b:{chapter:2,bg:'lab',char:'rf',exp:'serious',speaker:'林致遠',text:'「先確認 Conducted 端。如果 PA 輸出正常，就先把 Transmitter 排除，範圍縮到 Antenna path、Mechanical 或 OTA。」',next:'d2_26'},
  d2_c4c:{chapter:2,bg:'lab',char:'rf',exp:'serious',speaker:'林致遠',text:'他拿起工具又放下。「拆掉會改變原始狀態。先保留現場，量完 Conducted 再拆。」',next:'d2_26'},
  d2_c4d:{chapter:2,bg:'lab',char:'rf',exp:'normal',speaker:'林致遠',text:'昨晚 Software 已經排除。致遠把這項標成已驗證，轉向 Conducted Power；重複並非總是謹慎。',next:'d2_26'},
  d2_26:{chapter:2,bg:'lab',char:'pm',exp:'serious',speaker:'周予晴',text:'「所以 Conducted 正常，我兩點可以跟客戶說 RF IC 跟 PA 目前沒有看到異常？」',next:'d2_27'},
  d2_27:{chapter:2,bg:'lab',char:'rf',exp:'surprised',speaker:'林致遠',text:'「對。」他看了她一眼。她沒有假裝聽懂，而是在確認每個工程判斷真正代表的 Action 與 Risk。',next:'d2_28',effects:{pmAffection:1,workReputation:1}},
  d2_28:{chapter:2,bg:'ota',time:'OTA CHAMBER · 13:47',char:'rf',exp:'serious',speaker:'第一輪 Debug 結果',text:'距離承諾的 Update，還有十三分鐘。',data:[['Conducted Tx Power','PASS','pass'],['S11 Difference','Small',''],['New Housing removed','+2.4 dB','pass'],['n77 TRP','接近正常值','pass']],next:'d2_29'},
  d2_29:{chapter:2,bg:'ota',char:'pm',exp:'surprised',speaker:'周予晴',text:'「所以真的是 Housing？」',next:'d2_30'},
  d2_30:{chapter:2,bg:'ota',char:'rf',exp:'serious',speaker:'旁白',text:'致遠沒有回答。他拿起 Housing，沿著邊緣逐一按壓，最後停在一個幾乎不會被注意的位置。',next:'d2_31'},
  d2_31:{chapter:2,bg:'ota',char:'rf',exp:'serious',speaker:'林致遠',text:'原本應該接觸 Ground 的金屬彈片，在組裝後沒有完全壓合。缺口只有 0.3 毫米。',next:'d2_32'},
  d2_32:{chapter:2,bg:'ota',char:'rf',exp:'normal',speaker:'林致遠',text:'「……可能不是 Housing 設計。是 Assembly。」',next:'d2_end'},
  d2_end:{chapter:2,bg:'ota',time:'CHAPTER 02 · END',char:'pm',exp:'serious',speaker:'下一段',text:'當工程問題進入工廠、裝配公差與責任歸屬，他們已經不再是 RF Engineer 對上 PM，而是同一個戰壕裡的人。',choices:[{text:'進入第三章｜今天傍晚，飛吉隆坡',next:'d3_01'}],end:true},

  d3_01:{chapter:3,bg:'lab',time:'RF LAB · 14:10',char:'rf',exp:'serious',speaker:'旁白',text:'最新一次 A/B Test 完成。螢幕上的數字，把一個 Sample 的異常變成了整批生產的風險。',data:[['Before Rework','TRP FAIL','fail'],['Ground Contact Rework','TRP PASS','pass'],['Recovery','+2.5 dB','pass'],['Samples','3 / 3 相同現象','wide']],next:'d3_02'},
  d3_02:{chapter:3,bg:'lab',char:'pm',exp:'serious',speaker:'周予晴',text:'「再換一台。」',next:'d3_03'},
  d3_03:{chapter:3,bg:'lab',char:'rf',exp:'normal',speaker:'林致遠',text:'「已經第三台了。」',next:'d3_04'},
  d3_04:{chapter:3,bg:'lab',char:'rf',exp:'serious',speaker:'Antenna Engineer',text:'「三台都有同樣現象。」',next:'d3_05'},
  d3_05:{chapter:3,bg:'lab',char:'rf',exp:'serious',speaker:'林致遠',text:'他拿起其中一台機器。「Ground spring 沒有完全接觸。壓回去以後，TRP 就回來了。」',next:'d3_06'},
  d3_06:{chapter:3,bg:'lab',char:'pm',exp:'serious',speaker:'周予晴',text:'「所以不是 Design issue？」',next:'d3_07'},
  d3_07:{chapter:3,bg:'lab',char:'rf',exp:'serious',speaker:'林致遠',text:'「目前看起來不是。比較像 Assembly variation。」',next:'d3_08'},
  d3_08:{chapter:3,bg:'lab',char:'pm',exp:'serious',speaker:'旁白',text:'予晴的表情立刻變了。因為兩人都知道，問題已經從「一台機器壞了」，變成「工廠到底生產了多少台？」',next:'d3_09'},
  d3_09:{chapter:3,bg:'meeting',time:'BU HEAD MEETING ROOM · 14:25',char:'pm',exp:'serious',speaker:'旁白',text:'BU Head、PM、RF、Manufacturing PM、SQE、ME 與秘書坐在同一張桌前。沒有人帶咖啡進來。',next:'d3_10'},
  d3_10:{chapter:3,bg:'meeting',char:'rf',exp:'serious',speaker:'BU Head',text:'「工廠現在有多少台？」',next:'d3_11'},
  d3_11:{chapter:3,bg:'meeting',char:'pm',exp:'tired',speaker:'Manufacturing PM',text:'「Pilot Run 已經完成一批。目前只有抽測 OTA。」',next:'d3_12'},
  d3_12:{chapter:3,bg:'meeting',char:'pm',exp:'serious',speaker:'周予晴',text:'「客戶只知道我們找到與 Assembly 相關的 Root Cause，還不知道 Factory impact 的範圍。」',next:'d3_13'},
  d3_13:{chapter:3,bg:'meeting',char:'rf',exp:'surprised',speaker:'BU Head',text:'「妳跟 RF 去馬來西亞。今天。」',next:'d3_14',sfx:'message'},
  d3_14:{chapter:3,bg:'meeting',char:'pm',exp:'surprised',speaker:'周予晴',text:'「今天？」',next:'d3_15'},
  d3_15:{chapter:3,bg:'meeting',char:'rf',exp:'serious',speaker:'BU Head',text:'「直接到工廠確認 Assembly station、Ground spring，以及已生產機台是否需要 100% screening。客戶 Update 在飛機起飛前完成。」',next:'d3_16'},
  d3_16:{chapter:3,bg:'meeting',char:'pm',exp:'serious',speaker:'秘書',text:'「傍晚五點左右，有星宇航空從桃園直飛吉隆坡。」',next:'d3_17'},
  d3_17:{chapter:3,bg:'meeting',char:'rf',exp:'serious',speaker:'BU Head',text:'「就那班。在客戶質疑量產品質以前，我要 Factory condition 和足夠的 Evidence。」',choices:[
    {text:'我連行李都沒有',next:'d3_c1a',effects:{lifeBalance:1}},
    {text:'Factory sample 資料先傳給我',next:'d3_c1b',effects:{rfExpertise:2,workReputation:2}},
    {text:'PM 也要一起去？',next:'d3_c1c',effects:{pmAffection:1}},
    {text:'今天一定要飛嗎？',next:'d3_c1d',effects:{workReputation:-1}}
  ]},
  d3_c1a:{chapter:3,bg:'meeting',char:'rf',exp:'surprised',speaker:'林致遠',text:'「我連行李都沒有。」這是他今天第一句與 RF 無關的話。',next:'d3_18'},
  d3_c1b:{chapter:3,bg:'meeting',char:'rf',exp:'serious',speaker:'林致遠',text:'「先把 Factory station flow、assembly drawing 跟 lot history 傳給我。飛機上可以先看。」',next:'d3_18'},
  d3_c1c:{chapter:3,bg:'meeting',char:'rf',exp:'surprised',speaker:'林致遠',text:'「PM 也要一起去？」予晴挑眉：「不然你要自己跟客戶解釋 containment plan？」',next:'d3_18'},
  d3_c1d:{chapter:3,bg:'meeting',char:'rf',exp:'tired',speaker:'林致遠',text:'「今天一定要飛？」BU Head 只看了一眼牆上的 Certification Schedule。答案已經寫在上面。',next:'d3_18'},
  d3_18:{chapter:3,bg:'meeting',char:'pm',exp:'smile',speaker:'周予晴',text:'「你真的完全不先想行李的事？」',next:'d3_19'},
  d3_19:{chapter:3,bg:'meeting',char:'rf',exp:'normal',speaker:'林致遠',text:'「便利商店買得到。」',next:'d3_20'},
  d3_20:{chapter:3,bg:'meeting',char:'pm',exp:'smile',speaker:'周予晴',text:'「……內衣也嗎？」',next:'d3_21'},
  d3_21:{chapter:3,bg:'meeting',char:'rf',exp:'surprised',speaker:'旁白',text:'面對 2.6 dB，他有六種量測方法。面對這個問題，他第一次完全不知道怎麼回答。',next:'d3_22'},
  d3_22:{chapter:3,bg:'office',time:'RD OFFICE · 14:40',char:'pm',exp:'tired',speaker:'周予晴｜電話',text:'「媽，我今天臨時要出國。對，今天……可能兩三天。可以幫我接他嗎？」她的聲音比開會時柔軟很多。',next:'d3_23'},
  d3_23:{chapter:3,bg:'office',char:'pm',exp:'normal',speaker:'旁白',text:'致遠原本要問 Factory 資料，卻停在幾步之外。電話掛斷後，予晴抬起頭。',next:'d3_24'},
  d3_24:{chapter:3,bg:'office',char:'pm',exp:'serious',speaker:'周予晴',text:'「你站多久了？」',next:'d3_25'},
  d3_25:{chapter:3,bg:'office',char:'rf',exp:'normal',speaker:'林致遠',text:'「剛到。」她明顯知道他在說謊，卻沒有拆穿。',choices:[
    {text:'小孩那邊沒問題嗎？',next:'d3_c2a',effects:{pmAffection:2,lifeBalance:1}},
    {text:'工廠資料好了嗎？',next:'d3_c2b',effects:{workReputation:1}},
    {text:'如果不方便，我可以自己去',next:'d3_c2c',effects:{pmAffection:1}},
    {text:'第一次這麼臨時出差？',next:'d3_c2d',effects:{pmAffection:1}}
  ]},
  d3_c2a:{chapter:3,bg:'office',char:'pm',exp:'tired',speaker:'周予晴',text:'「我媽可以幫忙。只是他晚上應該會問，我為什麼又不在。」',next:'d3_26'},
  d3_c2b:{chapter:3,bg:'office',char:'pm',exp:'serious',speaker:'周予晴',text:'「秘書在傳。」她回答得像平常一樣俐落，也把剛才那通電話重新收回生活背面。',next:'d3_26'},
  d3_c2c:{chapter:3,bg:'office',char:'pm',exp:'serious',speaker:'周予晴',text:'「不用。工廠是你的問題，客戶和家庭是我的問題。我會安排。」',next:'d3_26'},
  d3_c2d:{chapter:3,bg:'office',char:'pm',exp:'normal',speaker:'周予晴',text:'「不是。只是每一次臨時，都要先確認另一套 Schedule 不會一起爆掉。」',next:'d3_26'},
  d3_26:{chapter:3,bg:'office',char:'pm',exp:'smile',speaker:'周予晴',text:'她看見他的表情，笑了一下。「你不要露出那種表情。這就是我的工作。」',next:'d3_27'},
  d3_27:{chapter:3,bg:'office',char:'rf',exp:'normal',speaker:'旁白',text:'對他而言，臨時出差只是收一個背包。對她而言，卻是重新安排一整個家庭。',next:'d3_28'},
  d3_28:{chapter:3,bg:'car',time:'AIRPORT TRANSFER · 15:25',char:'pm',exp:'serious',speaker:'旁白',text:'公司派車往桃園機場。予晴準備客戶 Update；致遠打開 Factory assembly drawing。車內只剩鍵盤聲和高速公路的低鳴。',data:[['PM','Containment / Risk',''],['PM','Factory Verification',''],['RF','Ground Spring Position',''],['RF','Contact Force / Tolerance','']],next:'d3_29'},
  d3_29:{chapter:3,bg:'car',char:'pm',exp:'normal',speaker:'周予晴',text:'「你常這樣臨時出差嗎？」',next:'d3_30'},
  d3_30:{chapter:3,bg:'car',char:'rf',exp:'normal',speaker:'林致遠',text:'「以前常。」',next:'d3_31'},
  d3_31:{chapter:3,bg:'car',char:'pm',exp:'tired',speaker:'周予晴',text:'「羨慕。可以只想自己要帶什麼。」她望著車窗外，語氣輕得像不是在對他說。',next:'d3_32'},
  d3_32:{chapter:3,bg:'airport',time:'TAOYUAN AIRPORT · 16:05',char:'pm',exp:'smile',speaker:'周予晴',text:'「你真的什麼都沒帶？」',next:'d3_33'},
  d3_33:{chapter:3,bg:'airport',char:'rf',exp:'normal',speaker:'林致遠',text:'「Notebook、充電器、護照。」',next:'d3_34'},
  d3_34:{chapter:3,bg:'airport',char:'pm',exp:'surprised',speaker:'周予晴',text:'「衣服呢？」',next:'d3_35'},
  d3_35:{chapter:3,bg:'airport',char:'rf',exp:'normal',speaker:'林致遠',text:'「吉隆坡有 Uniqlo 吧。」',next:'d3_36'},
  d3_36:{chapter:3,bg:'airport',char:'pm',exp:'smile',speaker:'周予晴',text:'「你們工程師都這麼活嗎？」',next:'d3_37'},
  d3_37:{chapter:3,bg:'airport',char:'rf',exp:'smile',speaker:'林致遠',text:'「能開機就好。」',next:'d3_38'},
  d3_38:{chapter:3,bg:'airport',time:'BOARDING GATE · 16:28',char:'pm',exp:'serious',speaker:'客戶 PM｜電話',text:'「Is this a factory issue？」',next:'d3_39'},
  d3_39:{chapter:3,bg:'airport',char:'rf',exp:'serious',speaker:'旁白',text:'予晴看向致遠。他輕輕搖頭——目前的 Evidence，還不足以直接定義。',next:'d3_40'},
  d3_40:{chapter:3,bg:'airport',char:'pm',exp:'serious',speaker:'周予晴',text:'「We identified a strong correlation with assembly condition. Our team is flying to the factory now. We will provide containment status tomorrow morning.」',next:'d3_41'},
  d3_41:{chapter:3,bg:'airport',char:'rf',exp:'normal',speaker:'林致遠',text:'掛掉電話，他說：「妳很會講。」',next:'d3_42'},
  d3_42:{chapter:3,bg:'airport',char:'pm',exp:'smile',speaker:'周予晴',text:'「哪一句？」',next:'d3_43'},
  d3_43:{chapter:3,bg:'airport',char:'rf',exp:'normal',speaker:'林致遠',text:'「全部。」',next:'d3_44'},
  d3_44:{chapter:3,bg:'airport',char:'pm',exp:'smile',speaker:'周予晴',text:'「這就是 PM 存在的理由。」她把昨天那句話原封不動地還給他。這是第一個只屬於他們的職場玩笑。',next:'d3_45',effects:{pmAffection:1}},
  d3_45:{chapter:3,bg:'plane',time:'JX FLIGHT · 17:06',char:'pm',exp:'normal',speaker:'旁白',text:'班機離開桃園。窗外的雲被傍晚染成橘紅色，台灣在機翼下逐漸遠去。專案壓力沒有消失，環境卻忽然從辦公室變成一段旅程。',next:'d3_46',bgm:'sunset_flight'},
  d3_46:{chapter:3,bg:'plane',char:'pm',exp:'normal',speaker:'周予晴',text:'「我們真的就這樣去馬來西亞了。今天早上，我還在想晚上要不要幫小孩買早餐材料。」',next:'d3_47'},
  d3_47:{chapter:3,bg:'plane',char:'rf',exp:'normal',speaker:'林致遠',text:'「我今天早上在想 TRP 為什麼掉 3 dB。」',next:'d3_48'},
  d3_48:{chapter:3,bg:'plane',char:'pm',exp:'smile',speaker:'周予晴',text:'「你的人生真的很單純。」',next:'d3_49'},
  d3_49:{chapter:3,bg:'plane',char:'rf',exp:'normal',speaker:'林致遠',text:'「現在不單純了。」',next:'d3_50'},
  d3_50:{chapter:3,bg:'plane',char:'pm',exp:'surprised',speaker:'周予晴',text:'「因為 Factory issue？」',choices:[
    {text:'對',next:'d3_c3a',effects:{rfExpertise:1}},
    {text:'因為旁邊坐了一個很會追 Schedule 的 PM',next:'d3_c3b',effects:{pmAffection:1}},
    {text:'因為我開始知道 PM 為什麼總是看時間',next:'d3_c3c',effects:{pmAffection:2,lifeBalance:2}},
    {text:'睡覺吧，等等還要看資料',next:'d3_c3d',effects:{lifeBalance:1}}
  ]},
  d3_c3a:{chapter:3,bg:'plane',char:'rf',exp:'normal',speaker:'林致遠',text:'「對。」他把視線放回工程圖。答案沒有錯，只是少了一部分。',next:'d3_51'},
  d3_c3b:{chapter:3,bg:'plane',char:'rf',exp:'smile',speaker:'林致遠',text:'「因為旁邊坐了一個很會追 Schedule 的 PM。」她瞇起眼睛，卻忍不住笑了。',next:'d3_51'},
  d3_c3c:{chapter:3,bg:'plane',char:'rf',exp:'normal',speaker:'林致遠',text:'「因為我開始知道，PM 為什麼總是在看時間。」',next:'d3_51'},
  d3_c3d:{chapter:3,bg:'plane',char:'rf',exp:'normal',speaker:'林致遠',text:'「睡覺吧，等等還要看資料。」他把這句關心包裝成工作安排。',next:'d3_51'},
  d3_51:{chapter:3,bg:'plane',char:'pm',exp:'smile',speaker:'旁白',text:'予晴沒有立刻回答，只把視線移向橘紅色的窗外。玻璃上映著她微微上揚的嘴角。',next:'d3_52'},
  d3_52:{chapter:3,bg:'plane',time:'CRUISING ALTITUDE · 18:12',char:'pm',exp:'tired',speaker:'旁白',text:'進入巡航後，她仍在整理 Factory Action Plan，直到前一晚累積的睡意終於贏過意志。Notebook 慢慢滑向座椅邊緣。',next:'d3_53'},
  d3_53:{chapter:3,bg:'plane',char:'rf',exp:'normal',speaker:'旁白',text:'致遠扶穩她的 Notebook，沒有叫醒她。空服員放低聲音問：「需要幫這位小姐準備餐點嗎？」',choices:[
    {text:'等她醒來再說',next:'d3_c4a',effects:{lifeBalance:1}},
    {text:'可以先幫她留著嗎？',next:'d3_c4b',effects:{pmAffection:2,lifeBalance:1}},
    {text:'把她叫醒',next:'d3_c4c',effects:{workReputation:1}}
  ]},
  d3_c4a:{chapter:3,bg:'plane',char:'rf',exp:'normal',speaker:'林致遠',text:'「等她醒來再說。」至少這一小段時間，不需要任何人向她追 Schedule。',next:'d3_54'},
  d3_c4b:{chapter:3,bg:'plane',char:'rf',exp:'normal',speaker:'林致遠',text:'「可以先幫她留一下嗎？」空服員微笑點頭。他重新戴上耳機，繼續看 Assembly drawing。',next:'d3_54'},
  d3_c4c:{chapter:3,bg:'plane',char:'pm',exp:'tired',speaker:'周予晴',text:'她被輕聲叫醒，第一句是：「客戶有回信嗎？」致遠把餐盤推向她：「先吃。」',next:'d3_54'},
  d3_54:{chapter:3,bg:'plane',char:'rf',exp:'normal',speaker:'旁白',text:'機艙燈光柔和。她睡在他旁邊，他面前攤著 Ground spring 的工程圖。他們第一次離開公司，共同踏進另一座城市。',next:'d3_end'},
  d3_end:{chapter:3,bg:'plane',time:'CHAPTER 03 · END',char:'pm',exp:'tired',speaker:'下一章',text:'在台灣時，他們只是同一個專案的 RF 與 PM。登上飛機後，他們成了被一起丟到海外解決問題的兩個人。',choices:[{text:'進入第四章｜吉隆坡，凌晨零點',next:'d4_01'}],end:true},

  d4_01:{chapter:4,bg:'klia',time:'KLIA · 22:38',char:'rf',exp:'tired',speaker:'旁白',text:'數小時後，班機降落吉隆坡。從早上的緊急會議到現在，他們幾乎沒有真正休息。致遠打開手機，第一眼仍是 Factory Group。',data:[['Manufacturing PM','Tomorrow line start 8:30 AM',''],['Factory Team','Failed units ready',''],['Participants','ME / QA / RF / PM',''],['Status','LINE WALK CONFIRMED','pass']],next:'d4_02',bgm:'klia_night'},
  d4_02:{chapter:4,bg:'klia',char:'rf',exp:'normal',speaker:'林致遠',text:'「明天八點半。」',next:'d4_03'},
  d4_03:{chapter:4,bg:'klia',char:'pm',exp:'tired',speaker:'周予晴',text:'「嗯。」她一邊回答，一邊滑開手機，突然停住。',next:'d4_04'},
  d4_04:{chapter:4,bg:'klia',char:'rf',exp:'normal',speaker:'林致遠',text:'「怎麼了？」',next:'d4_05'},
  d4_05:{chapter:4,bg:'klia',char:'pm',exp:'normal',speaker:'周予晴',text:'「我在看今晚住哪。」',next:'d4_06'},
  d4_06:{chapter:4,bg:'klia',char:'pm',exp:'serious',speaker:'Business Trip Arrangement',text:'公司秘書在下午完成的行程安排。',data:[['Hotel','Shah Alam Business Hotel',''],['Check-in','Tonight',''],['Factory','Shah Alam Industrial Area',''],['Transportation','Airport → Hotel → Factory','wide']],next:'d4_07'},
  d4_07:{chapter:4,bg:'klia',char:'pm',exp:'surprised',speaker:'周予晴',text:'「Shah Alam？」她打開地圖，幾秒後補了一句：「……好遠。」',next:'d4_08'},
  d4_08:{chapter:4,bg:'klia',char:'rf',exp:'normal',speaker:'林致遠',text:'「工廠附近？」',next:'d4_09'},
  d4_09:{chapter:4,bg:'klia',char:'pm',exp:'tired',speaker:'周予晴',text:'「應該是。入境、領行李、等車，再開過去，Check-in 大概已經凌晨了。」',next:'d4_10'},
  d4_10:{chapter:4,bg:'klia',char:'rf',exp:'normal',speaker:'林致遠',text:'「車在外面，那就走吧。」',next:'d4_11'},
  d4_11:{chapter:4,bg:'klia',char:'pm',exp:'normal',speaker:'周予晴',text:'「你都不會抱怨嗎？」',next:'d4_12'},
  d4_12:{chapter:4,bg:'klia',char:'rf',exp:'normal',speaker:'林致遠',text:'「抱怨可以讓飯店變近嗎？」',next:'d4_13'},
  d4_13:{chapter:4,bg:'klia',char:'pm',exp:'smile',speaker:'周予晴',text:'「……不行。你這個人真的很適合做工程師。」',next:'d4_14'},
  d4_14:{chapter:4,bg:'klia',time:'KLIA ARRIVAL HALL · 22:57',char:'pm',exp:'tired',speaker:'旁白',text:'兩人拖著行李穿過英文與馬來文指示牌。玻璃帷幕外是熱帶植物、Grab 接送區，和深夜仍然明亮的車道。',next:'d4_15'},
  d4_15:{chapter:4,bg:'klia',char:'pm',exp:'surprised',speaker:'周予晴',text:'自動門打開，濕熱空氣迎面而來。「好熱。」',next:'d4_16',sfx:'door'},
  d4_16:{chapter:4,bg:'klia',char:'rf',exp:'normal',speaker:'林致遠',text:'「台灣現在也差不多吧。」',next:'d4_17'},
  d4_17:{chapter:4,bg:'klia',char:'pm',exp:'normal',speaker:'周予晴',text:'「但是剛才飛機裡很冷。」',next:'d4_18'},
  d4_18:{chapter:4,bg:'klia',char:'rf',exp:'normal',speaker:'林致遠',text:'「所以是 Step Response。」',next:'d4_19'},
  d4_19:{chapter:4,bg:'klia',char:'pm',exp:'surprised',speaker:'周予晴',text:'「這也可以 RF？」',next:'d4_20'},
  d4_20:{chapter:4,bg:'klia',char:'rf',exp:'normal',speaker:'林致遠',text:'「不能。」',next:'d4_21'},
  d4_21:{chapter:4,bg:'malaysia-road',time:'AIRPORT PICKUP · 23:10',char:'pm',exp:'normal',speaker:'司機',text:'「Shah Alam？ Long way.」',next:'d4_22'},
  d4_22:{chapter:4,bg:'malaysia-road',char:'rf',exp:'smile',speaker:'林致遠',text:'「連司機都這樣說。」',next:'d4_23'},
  d4_23:{chapter:4,bg:'malaysia-road',char:'pm',exp:'tired',speaker:'導航',text:'夜間高速公路路線已建立。',data:[['Destination','Shah Alam',''],['Estimated Arrival','00:48','fail'],['Distance','約 60 km',''],['Traffic','Smooth','pass']],next:'d4_24'},
  d4_24:{chapter:4,bg:'malaysia-road',char:'pm',exp:'tired',speaker:'周予晴',text:'「快兩個小時。我還要整理明天的 Meeting Agenda。」',next:'d4_25'},
  d4_25:{chapter:4,bg:'malaysia-road',char:'rf',exp:'normal',speaker:'林致遠',text:'「睡一下吧。明天八點半 Line Walk，所以現在更應該睡。」',next:'d4_26'},
  d4_26:{chapter:4,bg:'malaysia-road',char:'pm',exp:'smile',speaker:'周予晴',text:'「你昨天也是這樣叫我吃早餐。」',next:'d4_27'},
  d4_27:{chapter:4,bg:'malaysia-road',char:'rf',exp:'smile',speaker:'林致遠',text:'「妳昨天也沒聽。」',next:'d4_28'},
  d4_28:{chapter:4,bg:'malaysia-road',time:'MALAYSIA HIGHWAY · 23:26',char:'pm',exp:'normal',speaker:'旁白',text:'車子駛上高速公路。路燈越過椰子樹影，清真寺尖塔和仍亮著燈的休息站在窗外緩慢後退。',next:'d4_29',bgm:'city_night_malaysia'},
  d4_29:{chapter:4,bg:'malaysia-road',char:'pm',exp:'normal',speaker:'周予晴',text:'「我第一次來馬來西亞。」',choices:[
    {text:'我以前來過',next:'d4_c1a',effects:{workReputation:1}},
    {text:'我也是',next:'d4_c1b',effects:{pmAffection:1}},
    {text:'妳第一次出差？',next:'d4_c1c',effects:{pmAffection:1}},
    {text:'明天應該沒時間觀光',next:'d4_c1d',effects:{lifeBalance:-1}}
  ]},
  d4_c1a:{chapter:4,bg:'malaysia-road',char:'rf',exp:'normal',speaker:'林致遠',text:'「以前支援過 Factory，差不多這一帶。」',next:'d4_30'},
  d4_c1b:{chapter:4,bg:'malaysia-road',char:'rf',exp:'normal',speaker:'林致遠',text:'「我也是。」兩個第一次來到這座城市的人，卻沒有一個像觀光客。',next:'d4_30'},
  d4_c1c:{chapter:4,bg:'malaysia-road',char:'pm',exp:'normal',speaker:'周予晴',text:'「不是。但以前至少有三天準備，不是三小時。」',next:'d4_30'},
  d4_c1d:{chapter:4,bg:'malaysia-road',char:'pm',exp:'tired',speaker:'周予晴',text:'她看了一眼明天滿滿的 Schedule。「……好像真的不行。」',next:'d4_30'},
  d4_30:{chapter:4,bg:'malaysia-road',char:'pm',exp:'normal',speaker:'周予晴',text:'「那你熟嗎？」',next:'d4_31'},
  d4_31:{chapter:4,bg:'malaysia-road',char:'rf',exp:'normal',speaker:'林致遠',text:'「只熟公司、飯店跟工廠。」',next:'d4_32'},
  d4_32:{chapter:4,bg:'malaysia-road',char:'pm',exp:'smile',speaker:'周予晴',text:'「……果然。正常人至少會想出去走走吧。」',next:'d4_33'},
  d4_33:{chapter:4,bg:'malaysia-road',char:'rf',exp:'normal',speaker:'林致遠',text:'「我們這次像是可以出去走走嗎？」',next:'d4_34'},
  d4_34:{chapter:4,bg:'malaysia-road',char:'pm',exp:'tired',speaker:'旁白',text:'她還沒回答，手機先震了。來電顯示只有兩個字：寶貝。她的表情在一秒內從 PM 變成了媽媽。',next:'d4_35',sfx:'message'},
  d4_35:{chapter:4,bg:'malaysia-road',char:'pm',exp:'smile',speaker:'周予晴｜電話',text:'「喂？媽媽到了，現在在車上。你怎麼還沒睡？」',next:'d4_36'},
  d4_36:{chapter:4,bg:'malaysia-road',char:'pm',exp:'smile',speaker:'小禾｜電話',text:'「我要等妳。媽媽那邊有老虎嗎？有大象嗎？」',next:'d4_37'},
  d4_37:{chapter:4,bg:'malaysia-road',char:'pm',exp:'smile',speaker:'周予晴',text:'「沒有啦，媽媽現在只有看到高速公路。」她笑得完全不像會議室裡的 PM。致遠默默關掉 Notebook 音量。',choices:[
    {text:'繼續看資料，不打擾她',next:'d4_c2a',effects:{lifeBalance:1}},
    {text:'小聲說：這裡有很多猴子',next:'d4_c2b',effects:{childTrust:2,pmAffection:1},unlock:'monkey_quest'},
    {text:'跟孩子打招呼',next:'d4_c2c',effects:{childTrust:1,pmAffection:1}},
    {text:'假裝睡著',next:'d4_c2d',effects:{lifeBalance:0}}
  ]},
  d4_c2a:{chapter:4,bg:'malaysia-road',char:'rf',exp:'normal',speaker:'旁白',text:'他把視線留在工程圖上，也把聲音全部關掉。這是一種不靠近的體貼。',next:'d4_38'},
  d4_c2b:{chapter:4,bg:'malaysia-road',char:'rf',exp:'normal',speaker:'林致遠',text:'「可以跟他說，這裡有很多猴子。」',next:'d4_monkey'},
  d4_monkey:{chapter:4,bg:'malaysia-road',char:'pm',exp:'surprised',speaker:'小禾｜電話',text:'「哪個叔叔？是不是那個讓手機有訊號的叔叔？」',next:'d4_monkey2'},
  d4_monkey2:{chapter:4,bg:'malaysia-road',char:'pm',exp:'smile',speaker:'周予晴',text:'「對。」電話那頭立刻下令，要叔叔拍猴子。她摀著手機，小聲說：「接到任務了。」',data:[['SIDE QUEST','UNLOCKED','pass'],['任務','幫孩子找到馬來西亞的猴子','wide']],next:'d4_38'},
  d4_c2c:{chapter:4,bg:'malaysia-road',char:'rf',exp:'surprised',speaker:'林致遠',text:'「嗨，我是……」他還在決定該怎麼介紹，小禾已經問：「你有看到老虎嗎？」',next:'d4_38'},
  d4_c2d:{chapter:4,bg:'malaysia-road',char:'rf',exp:'tired',speaker:'旁白',text:'他閉上眼睛。幾分鐘後，卻記住了孩子問的每一個問題。',next:'d4_38'},
  d4_38:{chapter:4,bg:'malaysia-road',char:'pm',exp:'tired',speaker:'周予晴',text:'電話結束後，她低聲說：「不好意思，他話很多。」',next:'d4_39'},
  d4_39:{chapter:4,bg:'malaysia-road',char:'rf',exp:'normal',speaker:'林致遠',text:'「小孩不是都這樣？」',next:'d4_40'},
  d4_40:{chapter:4,bg:'malaysia-road',char:'pm',exp:'tired',speaker:'周予晴',text:'「我每次出差，他都會等我電話。所以我其實很不喜歡臨時出差。」',next:'d4_41'},
  d4_41:{chapter:4,bg:'malaysia-road',char:'pm',exp:'serious',speaker:'周予晴',text:'「別人臨時出差只是收行李。我臨時出差以前，要先找到一個人接手我原本的生活。」',next:'d4_42'},
  d4_42:{chapter:4,bg:'malaysia-road',char:'rf',exp:'normal',speaker:'旁白',text:'車內安靜了很久。她不是抱怨，只是第一次把生活的現實，說給他聽。',choices:[
    {text:'所以妳今天其實很辛苦',next:'d4_c3a',effects:{pmAffection:1}},
    {text:'那以後可以拒絕出差',next:'d4_c3b',effects:{pmAffection:-1}},
    {text:'至少妳媽媽願意幫忙',next:'d4_c3c',effects:{lifeBalance:0}},
    {text:'謝謝妳還是來了',next:'d4_c3d',effects:{pmAffection:2,lifeBalance:1}}
  ]},
  d4_c3a:{chapter:4,bg:'malaysia-road',char:'rf',exp:'normal',speaker:'林致遠',text:'「所以妳今天其實很辛苦。」她沒有否認，只是靠回椅背。',next:'d4_43'},
  d4_c3b:{chapter:4,bg:'malaysia-road',char:'pm',exp:'serious',speaker:'周予晴',text:'「有些事可以拒絕，有些事拒絕以後，壓力只是落到別人身上。」',next:'d4_43'},
  d4_c3c:{chapter:4,bg:'malaysia-road',char:'pm',exp:'tired',speaker:'周予晴',text:'「是啊。所以每次麻煩她，我才更清楚這不是理所當然。」',next:'d4_43'},
  d4_c3d:{chapter:4,bg:'malaysia-road',char:'rf',exp:'normal',speaker:'林致遠',text:'「謝謝妳還是來了。工作是一回事，能不能說走就走，是另一回事。」',next:'d4_43'},
  d4_43:{chapter:4,bg:'malaysia-road',char:'pm',exp:'tired',speaker:'周予晴',text:'她愣了一下。「這本來就是我的工作。」過了一會兒，又很輕地補上一聲：「嗯。」',next:'d4_44'},
  d4_44:{chapter:4,bg:'shah-alam',time:'SHAH ALAM · 00:45',char:'pm',exp:'normal',speaker:'旁白',text:'車子進入 Shah Alam。寬闊道路、低密度商業區、棕櫚樹與二十四小時 Mamak 餐廳掠過車窗，遠處立著清真寺的輪廓。',next:'d4_45'},
  d4_45:{chapter:4,bg:'shah-alam',char:'pm',exp:'surprised',speaker:'周予晴',text:'「那是什麼？」',next:'d4_46'},
  d4_46:{chapter:4,bg:'shah-alam',char:'rf',exp:'normal',speaker:'林致遠',text:'「清真寺吧。」',next:'d4_47'},
  d4_47:{chapter:4,bg:'shah-alam',char:'pm',exp:'smile',speaker:'周予晴',text:'「好漂亮。」致遠原本想繼續看資料，最後也轉頭看了一眼。',next:'d4_48'},
  d4_48:{chapter:4,bg:'hotel',time:'SHAH ALAM HOTEL · 01:05',char:'pm',exp:'tired',speaker:'旁白',text:'車停在飯店門口。大理石地板、挑高 Lobby 和柔和黃光安靜地迎接兩個已經明顯過載的人。',next:'d4_49'},
  d4_49:{chapter:4,bg:'hotel',char:'pm',exp:'tired',speaker:'周予晴',text:'「終於……」',next:'d4_50'},
  d4_50:{chapter:4,bg:'hotel',char:'rf',exp:'tired',speaker:'林致遠',text:'「還活著。」',next:'d4_51'},
  d4_51:{chapter:4,bg:'hotel',char:'pm',exp:'smile',speaker:'周予晴',text:'「你不要講得像 Debug 結束一樣。」',next:'d4_52'},
  d4_52:{chapter:4,bg:'hotel',char:'rf',exp:'normal',speaker:'林致遠',text:'「Debug 還沒開始。」',next:'d4_53'},
  d4_53:{chapter:4,bg:'hotel',char:'pm',exp:'tired',speaker:'周予晴',text:'「你一定要提醒我嗎？」',next:'d4_54'},
  d4_54:{chapter:4,bg:'hotel',time:'HOTEL CHECK-IN · 01:12',char:'pm',exp:'normal',speaker:'Front Desk',text:'「Two rooms. Breakfast starts at 6:30 AM.」沒有只剩一間房，只有兩張正常房卡和不太正常的起床時間。',next:'d4_55'},
  d4_55:{chapter:4,bg:'hotel',char:'pm',exp:'surprised',speaker:'周予晴',text:'她看了一眼時間。「五個小時。」',next:'d4_56'},
  d4_56:{chapter:4,bg:'hotel',char:'rf',exp:'normal',speaker:'林致遠',text:'「夠了。工程師標準。」',next:'d4_57'},
  d4_57:{chapter:4,bg:'hotel',char:'pm',exp:'smile',speaker:'周予晴',text:'「難怪你們平均壽命……」她說到一半停住。「沒事。」',next:'d4_58'},
  d4_58:{chapter:4,bg:'elevator',time:'HOTEL ELEVATOR · 01:16',char:'pm',exp:'tired',speaker:'周予晴',text:'「今天好像過了三天。」電梯裡沒有 Customer、沒有 Meeting，也沒有其他同事。',next:'d4_59'},
  d4_59:{chapter:4,bg:'elevator',char:'rf',exp:'normal',speaker:'林致遠',text:'「早上 Certification meeting，下午找到 Root Cause，傍晚飛馬來西亞。」',next:'d4_60'},
  d4_60:{chapter:4,bg:'elevator',char:'pm',exp:'smile',speaker:'周予晴',text:'「現在凌晨一點在 Shah Alam。」她忽然笑了。「我們昨天這個時間，還根本不熟吧？」',next:'d4_61'},
  d4_61:{chapter:4,bg:'elevator',char:'rf',exp:'surprised',speaker:'旁白',text:'昨天以前，她只是那個很會追 Schedule 的 PM。現在，他們一起 Debug、面對客戶、臨時出國，又在馬來西亞飯店的電梯裡分享同一種疲憊。',choices:[
    {text:'現在也沒有很熟',next:'d4_c4a',effects:{pmAffection:-1}},
    {text:'至少知道妳有一個很會問問題的小孩',next:'d4_c4b',effects:{pmAffection:1,childTrust:1}},
    {text:'我現在知道妳為什麼一直看時間了',next:'d4_c4c',effects:{pmAffection:2,lifeBalance:1}},
    {text:'明天八點半還是要準時',next:'d4_c4d',effects:{workReputation:1}}
  ]},
  d4_c4a:{chapter:4,bg:'elevator',char:'pm',exp:'normal',speaker:'周予晴',text:'「也是。」她回答得很快，笑意卻比剛才淡了一點。',next:'d4_62'},
  d4_c4b:{chapter:4,bg:'elevator',char:'rf',exp:'smile',speaker:'林致遠',text:'「至少知道，妳有一個很會問問題的小孩。」',next:'d4_62'},
  d4_c4c:{chapter:4,bg:'elevator',char:'rf',exp:'normal',speaker:'林致遠',text:'「我現在知道，妳為什麼一直看時間了。」',next:'d4_62'},
  d4_c4d:{chapter:4,bg:'elevator',char:'rf',exp:'normal',speaker:'林致遠',text:'「明天八點半還是要準時。」她瞪了他一眼，然後又笑了。',next:'d4_62'},
  d4_62:{chapter:4,bg:'elevator',char:'pm',exp:'surprised',speaker:'旁白',text:'「叮。」電梯門打開。她走出去幾步，又回過頭。',next:'d4_63',sfx:'door'},
  d4_63:{chapter:4,bg:'elevator',char:'pm',exp:'smile',speaker:'周予晴',text:'「晚安，RF Engineer。明天七點早餐。」',next:'d4_64'},
  d4_64:{chapter:4,bg:'elevator',char:'rf',exp:'smile',speaker:'林致遠',text:'「不是六點半？」',next:'d4_65'},
  d4_65:{chapter:4,bg:'elevator',char:'pm',exp:'serious',speaker:'周予晴',text:'「……不要挑戰我的底線。」',next:'d4_66'},
  d4_66:{chapter:4,bg:'hotel-room',time:'HOTEL ROOM · 01:24',char:'rf',exp:'tired',speaker:'旁白',text:'致遠進入房間。Shah Alam 的城市燈光仍在窗外亮著，手機很快收到兩則訊息。',data:[['周予晴','明早 7:00 Lobby',''],['周予晴','不要遲到','']],next:'d4_67'},
  d4_67:{chapter:4,bg:'hotel-room',char:'rf',exp:'normal',speaker:'旁白',text:'他輸入「OK」，停頓，刪除。重新輸入：「收到，早點睡。」',next:'d4_68'},
  d4_68:{chapter:4,bg:'hotel-room',char:'pm',exp:'smile',speaker:'周予晴｜訊息',text:'「你也是。」',next:'d4_69'},
  d4_69:{chapter:4,bg:'hotel-room',char:'rf',exp:'normal',speaker:'旁白',text:'昨天晚上，他們還只是同一個 Project 裡的 RF 與 PM。而今晚，在距離台灣三千公里外的城市，他們第一次知道彼此工作以外的一點點事情。',next:'d4_end'},
  d4_end:{chapter:4,bg:'hotel-room',time:'MALAYSIA · NEXT MORNING',char:'pm',exp:'normal',speaker:'下一章',text:'隔天早上，真正的 Factory Debug 才要開始。知道 Failure Mechanism，不代表 Root Cause 已經結束。',choices:[{text:'進入第五章｜Root Cause 還沒有結束',next:'d5_01'},{text:'週末支線｜沒有 Pass / Fail 的星期六',next:'w1_01'}],end:true},

  d5_01:{chapter:5,bg:'factory-line',time:'SHAH ALAM FACTORY · 08:34',char:'rf',exp:'serious',speaker:'旁白',text:'產線重新啟動。致遠面前排著 Golden、Fail、Reworked Sample，不同 Lot 機台、OTA 結果與 Contact Resistance 紀錄。今天的問題不再是 Ground Spring 有沒有接觸。',next:'d5_02',bgm:'factory_morning'},
  d5_02:{chapter:5,bg:'factory-line',char:'rf',exp:'serious',speaker:'林致遠',text:'真正的問題是：同一套製程，為什麼有些機台正常，有些機台失效？',data:[['Possible Factor','Fixture Force Variation',''],['Material','Ground Spring Tolerance',''],['Assembly','Operator / Stack-up',''],['Control Gap','WI / QA Sampling','fail']],next:'d5_03'},
  d5_03:{chapter:5,bg:'factory-line',char:'rf',exp:'serious',speaker:'Factory ME',text:'「我們之前做了幾千台都沒有問題。也可能是 Design Margin 太小。」',next:'d5_04'},
  d5_04:{chapter:5,bg:'factory-line',char:'rf',exp:'normal',speaker:'林致遠',text:'「所以我要知道 Margin 到底有多少。」',next:'d5_05'},
  d5_05:{chapter:5,bg:'factory-line',char:'rf',exp:'serious',speaker:'Factory ME',text:'「我們 Assembly 都有按照 WI。」',next:'d5_06'},
  d5_06:{chapter:5,bg:'factory-line',char:'rf',exp:'normal',speaker:'林致遠',text:'「那就一起看 WI。」他沒有站到 RD 或 Factory 任一邊。每個人都有壓力，也都害怕問題最後落在自己身上。',next:'d5_07'},
  d5_07:{chapter:5,bg:'factory-line',char:'rf',exp:'serious',speaker:'Factory Debug',text:'下一步要如何縮小 Variation？',choices:[
    {text:'直接要求 Factory 100% Rework',next:'d5_c1a',effects:{workReputation:-1}},
    {text:'做 Operator A/B Comparison',next:'d5_c1b',effects:{rfExpertise:2,workReputation:1}},
    {text:'要求換一批 Ground Spring',next:'d5_c1c',effects:{rfExpertise:1}},
    {text:'只看 OTA 結果',next:'d5_c1d',effects:{rfExpertise:-1}},
    {text:'量 Contact Resistance 建立 Correlation',next:'d5_c1e',effects:{rfExpertise:2,workReputation:2}}
  ]},
  d5_c1a:{chapter:5,bg:'factory-line',char:'rf',exp:'tired',speaker:'Factory ME',text:'「你能證明所有機台都有同樣風險嗎？」致遠沒有回答。Engineering Decision 不能只靠直覺，100% Rework 也可能製造新的 Variation。',next:'d5_08'},
  d5_c1b:{chapter:5,bg:'factory-line',char:'rf',exp:'serious',speaker:'林致遠',text:'「換 Operator。相同 Fixture、相同 Lot，裝配前後都記錄。」如果手法改變分布，WI 就沒有把關鍵動作定義清楚。',next:'d5_08'},
  d5_c1c:{chapter:5,bg:'factory-line',char:'rf',exp:'serious',speaker:'林致遠',text:'「同一台機器換不同 Lot 的 Spring，來料尺寸和 Contact Force 都記錄。」這能測材料，但還不能單獨排除 Fixture 與 Operator。',next:'d5_08'},
  d5_c1d:{chapter:5,bg:'factory-line',char:'rf',exp:'tired',speaker:'旁白',text:'OTA 告訴他結果，卻沒告訴他製程的哪一個動作造成結果。他很快回到 Line，把中間參數補回來。',next:'d5_08'},
  d5_c1e:{chapter:5,bg:'factory-line',char:'rf',exp:'serious',speaker:'林致遠',text:'「每台先量 Contact Resistance，再跑 OTA。我要知道兩個數字是否一起移動。」當相關性建立，抽象的接觸不良才會變成可控制的規格。',next:'d5_08'},
  d5_08:{chapter:5,bg:'factory-line',time:'PRODUCTION LINE · 10:42',char:'rf',exp:'serious',speaker:'旁白',text:'「換 Operator。換 Fixture。再做一台。Golden 一起做。Rework 前後都記錄。」他反覆重排條件，把所有人的立場拆成可以驗證的 Hypothesis。',next:'d5_09'},
  d5_09:{chapter:5,bg:'factory-line',char:'rf',exp:'serious',speaker:'初步資料',text:'Variation 開始浮出輪廓，但還沒有單一因素足以解釋所有 Fail。',data:[['Fixture #1','Stable','pass'],['Fixture #2','Force spread ↑','fail'],['Operator A/B','Small difference',''],['Contact R vs TRP','Correlation observed','pass']],next:'d5_10'},
  d5_10:{chapter:5,bg:'factory-office',time:'FACTORY OFFICE · SAME TIME',char:'pm',exp:'serious',speaker:'旁白',text:'同一時間，予晴整天待在 Factory Office。她不量測；她負責讓 Customer、BU、Taiwan Team、Certification、Factory PM、QA 與 Manufacturing 看見同一個現實。',next:'d5_11'},
  d5_11:{chapter:5,bg:'factory-office',char:'pm',exp:'serious',speaker:'Customer PM｜電話',text:'「Yesterday you said the issue was identified. Then why can’t you guarantee the next build？」',next:'d5_12'},
  d5_12:{chapter:5,bg:'factory-office',char:'pm',exp:'serious',speaker:'周予晴',text:'「The failure mechanism is understood. We are still verifying process variation and containment effectiveness.」',next:'d5_13'},
  d5_13:{chapter:5,bg:'factory-office',char:'pm',exp:'tired',speaker:'Customer PM',text:'「So the root cause is not closed？」',next:'d5_14'},
  d5_14:{chapter:5,bg:'factory-office',char:'pm',exp:'serious',speaker:'周予晴',text:'「The failure mechanism is understood. Production control is still being verified.」',next:'d5_15'},
  d5_15:{chapter:5,bg:'factory-office',char:'pm',exp:'tired',speaker:'旁白',text:'一整天，她用不同方式回答同樣的問題：好了沒？何時可以保證？下一批會不會再發生？是 Design 還是 Factory？',next:'d5_16'},
  d5_16:{chapter:5,bg:'factory-office',char:'pm',exp:'serious',speaker:'旁白',text:'她把仍然不完整的工程狀態，翻譯成 Action、Risk、Timeline、Containment 與 Next Update。最累的不是不知道，而是即使不知道，也不能讓會議失控。',data:[['Action','Fixture / Operator A-B',''],['Risk','Next Build recurrence','fail'],['Containment','Screening under verification',''],['Next Update','18:00 MYT','pass']],next:'d5_17'},
  d5_17:{chapter:5,bg:'factory-office',time:'FACTORY OFFICE · 20:30',char:'pm',exp:'tired',speaker:'旁白',text:'最後一通 Customer Call 結束。辦公室幾乎空了。她摘下耳機，沒有立刻站起來，只看著 Containment Plan、Risk Assessment 和 Open Issue。',next:'d5_18'},
  d5_18:{chapter:5,bg:'factory-office',char:'pm',exp:'tired',speaker:'周予晴',text:'「終於。」',next:'d5_19'},
  d5_19:{chapter:5,bg:'factory-office',char:'rf',exp:'tired',speaker:'旁白',text:'致遠從 Production Line 回來，手裡仍是測試記錄，臉色比數據更難看。',next:'d5_20'},
  d5_20:{chapter:5,bg:'factory-office',char:'pm',exp:'normal',speaker:'周予晴',text:'「還是沒收斂？」',next:'d5_21'},
  d5_21:{chapter:5,bg:'factory-office',char:'rf',exp:'tired',speaker:'林致遠',text:'「有方向。」',next:'d5_22'},
  d5_22:{chapter:5,bg:'factory-office',char:'pm',exp:'tired',speaker:'周予晴',text:'「但沒有答案。」',next:'d5_23'},
  d5_23:{chapter:5,bg:'factory-office',char:'rf',exp:'normal',speaker:'林致遠',text:'「對。」兩個人都沒有再假裝今天還有力氣。',next:'d5_24'},
  d5_24:{chapter:5,bg:'lounge',time:'HOTEL LOUNGE · 22:03',char:'pm',exp:'tired',speaker:'旁白',text:'回到飯店，他們原本準備各自上樓。予晴卻在 Lounge Bar 前停下。暖色燈光、低聲 Jazz 和落地窗外的 Shah Alam 夜景，像一個暫時不必回答問題的地方。',next:'d5_25',bgm:'lounge_jazz'},
  d5_25:{chapter:5,bg:'lounge',char:'pm',exp:'normal',speaker:'周予晴',text:'「要不要喝一杯？」',next:'d5_26'},
  d5_26:{chapter:5,bg:'lounge',char:'rf',exp:'normal',speaker:'林致遠',text:'「妳不是說明天七點早餐？」',next:'d5_27'},
  d5_27:{chapter:5,bg:'lounge',char:'pm',exp:'tired',speaker:'周予晴',text:'「我現在後悔排七點了。一杯。」',next:'d5_28'},
  d5_28:{chapter:5,bg:'lounge',char:'rf',exp:'normal',speaker:'林致遠',text:'「一杯。」這不是約會。只是兩個累了一整天的人，不想立刻回到只有報告和自己的房間。',next:'d5_29'},
  d5_29:{chapter:5,bg:'lounge',char:'pm',exp:'normal',speaker:'周予晴',text:'「你今天臉很臭。」',next:'d5_30'},
  d5_30:{chapter:5,bg:'lounge',char:'rf',exp:'surprised',speaker:'林致遠',text:'「有嗎？」',next:'d5_31'},
  d5_31:{chapter:5,bg:'lounge',char:'pm',exp:'smile',speaker:'周予晴',text:'「有。」',next:'d5_32'},
  d5_32:{chapter:5,bg:'lounge',char:'rf',exp:'tired',speaker:'林致遠',text:'「Factory 一直說製程沒問題。我最怕的不是他們說沒問題，是他們真的覺得沒問題。」',next:'d5_33'},
  d5_33:{chapter:5,bg:'lounge',char:'pm',exp:'tired',speaker:'周予晴',text:'「我今天最怕的也不是客戶生氣，是他們一直問我什麼時候可以保證。」',next:'d5_34'},
  d5_34:{chapter:5,bg:'lounge',char:'rf',exp:'normal',speaker:'林致遠',text:'「妳怎麼回？」',next:'d5_35'},
  d5_35:{chapter:5,bg:'lounge',char:'pm',exp:'normal',speaker:'周予晴',text:'「不能保證的事，就不要說保證。」',next:'d5_36'},
  d5_36:{chapter:5,bg:'lounge',char:'rf',exp:'smile',speaker:'林致遠',text:'「妳以前不是很會給日期？」',next:'d5_37'},
  d5_37:{chapter:5,bg:'lounge',char:'pm',exp:'smile',speaker:'周予晴',text:'「我給的是 Update 日期，不是奇蹟發生日期。」兩人第一次因為彼此都懂這種荒謬，一起笑出來。',next:'d5_38'},
  d5_38:{chapter:5,bg:'lounge',char:'pm',exp:'normal',speaker:'周予晴',text:'「你知道 PM 最討厭哪一句嗎？」',next:'d5_39'},
  d5_39:{chapter:5,bg:'lounge',char:'rf',exp:'normal',speaker:'林致遠',text:'「ASAP？」',next:'d5_40'},
  d5_40:{chapter:5,bg:'lounge',char:'pm',exp:'smile',speaker:'周予晴',text:'「不是。『你們不是已經找到 Root Cause 了嗎？』」',next:'d5_41'},
  d5_41:{chapter:5,bg:'lounge',char:'rf',exp:'smile',speaker:'林致遠',text:'「工程師最討厭的是：『找到 Root Cause 為什麼還不能 Close？』」',next:'d5_42'},
  d5_42:{chapter:5,bg:'lounge',char:'pm',exp:'smile',speaker:'周予晴',text:'她舉起杯子。「敬 Root Cause。」',next:'d5_43'},
  d5_43:{chapter:5,bg:'lounge',char:'rf',exp:'smile',speaker:'林致遠',text:'他也舉杯。「永遠比想像中複雜。」兩只杯子輕輕碰在一起。終於有人懂，今天為什麼這麼累。',next:'d5_44',effects:{pmAffection:1}},
  d5_44:{chapter:5,bg:'lounge',char:'pm',exp:'tired',speaker:'周予晴',text:'「其實有時候，我很羨慕你。你至少可以說：目前 Evidence 不足。」',next:'d5_45'},
  d5_45:{chapter:5,bg:'lounge',char:'rf',exp:'normal',speaker:'林致遠',text:'「妳不行？」',next:'d5_46'},
  d5_46:{chapter:5,bg:'lounge',char:'pm',exp:'serious',speaker:'周予晴',text:'「客戶不想聽不知道。有時候我也不知道，但不能讓他們感覺我不知道。」',choices:[
    {text:'所以 PM 是把不知道講得像知道？',next:'d5_c2a',effects:{pmAffection:-1}},
    {text:'其實妳今天做得很好',next:'d5_c2b',effects:{pmAffection:1}},
    {text:'妳可以跟我說不知道',next:'d5_c2c',effects:{pmAffection:2,lifeBalance:1}},
    {text:'那就不要當 PM',next:'d5_c2d',effects:{pmAffection:-2}}
  ]},
  d5_c2a:{chapter:5,bg:'lounge',char:'pm',exp:'tired',speaker:'周予晴',text:'「不是。是把不知道整理成大家還能往前走的下一步。」她沒有生氣，只是太累了。',next:'d5_47'},
  d5_c2b:{chapter:5,bg:'lounge',char:'rf',exp:'normal',speaker:'林致遠',text:'「其實妳今天做得很好。」她低頭看了看杯子，像是不太習慣工程師給沒有數據的評語。',next:'d5_47'},
  d5_c2c:{chapter:5,bg:'lounge',char:'rf',exp:'normal',speaker:'林致遠',text:'「妳可以跟我說不知道。至少不用在每個人面前都裝沒事。」',next:'d5_47'},
  d5_c2d:{chapter:5,bg:'lounge',char:'pm',exp:'serious',speaker:'周予晴',text:'「事情不會因為我不當 PM 就變簡單。」她看向窗外，兩人之間短暫恢復成工作距離。',next:'d5_47'},
  d5_47:{chapter:5,bg:'lounge',char:'pm',exp:'smile',speaker:'旁白',text:'她沒有道謝，只是低頭笑了一下。手機就在這時震動：寶貝 Video Call。',next:'d5_48',sfx:'message'},
  d5_48:{chapter:5,bg:'lounge',char:'pm',exp:'surprised',speaker:'周予晴',text:'「糟了。我答應他今天要視訊。」她接通電話，整個人的表情瞬間從 PM 變成媽媽。',next:'d5_49'},
  d5_49:{chapter:5,bg:'lounge',char:'pm',exp:'smile',speaker:'小禾｜視訊',text:'「媽媽！妳在哪裡？為什麼這麼暗？妳喝酒？」',next:'d5_50'},
  d5_50:{chapter:5,bg:'lounge',char:'pm',exp:'surprised',speaker:'周予晴',text:'「只有一點點。不要跟阿嬤告狀。」',next:'d5_51'},
  d5_51:{chapter:5,bg:'lounge',char:'pm',exp:'surprised',speaker:'小禾｜視訊',text:'「媽媽，旁邊有人。是不是訊號叔叔？」兩個成年人同時停住。',next:'d5_52'},
  d5_52:{chapter:5,bg:'lounge',char:'rf',exp:'surprised',speaker:'林致遠',text:'手機慢慢移過來。他出現在鏡頭裡。「……嗨。」',next:'d5_53'},
  d5_53:{chapter:5,bg:'lounge',char:'rf',exp:'normal',speaker:'小禾｜視訊',text:'「真的是訊號叔叔！你也喝酒嗎？」',next:'d5_54'},
  d5_54:{chapter:5,bg:'lounge',char:'rf',exp:'normal',speaker:'林致遠',text:'「一點點。」',next:'d5_55'},
  d5_55:{chapter:5,bg:'lounge',char:'pm',exp:'smile',speaker:'小禾｜視訊',text:'「你們兩個都不乖。叔叔，你們今天有找到手機為什麼壞掉嗎？」',next:'d5_56'},
  d5_56:{chapter:5,bg:'lounge',char:'rf',exp:'normal',speaker:'林致遠',text:'「還沒有完全找到。」',next:'d5_57'},
  d5_57:{chapter:5,bg:'lounge',char:'rf',exp:'normal',speaker:'小禾｜視訊',text:'「那你明天要加油。不要讓媽媽太晚睡。」',next:'d5_58'},
  d5_58:{chapter:5,bg:'lounge',char:'rf',exp:'normal',speaker:'林致遠',text:'他看了予晴一眼。「好。」',next:'d5_59'},
  d5_59:{chapter:5,bg:'lounge',char:'pm',exp:'surprised',speaker:'周予晴',text:'「你不要隨便答應。」',next:'d5_60'},
  d5_60:{chapter:5,bg:'lounge',char:'rf',exp:'smile',speaker:'林致遠',text:'「嗯，我說好了。」',next:'d5_61',effects:{childTrust:2,pmAffection:1}},
  d5_61:{chapter:5,bg:'lounge',char:'pm',exp:'tired',speaker:'小禾｜視訊',text:'「媽媽什麼時候回來？訊號叔叔也一起回來嗎？回來可以一起吃飯嗎？」',next:'d5_62'},
  d5_62:{chapter:5,bg:'lounge',char:'pm',exp:'surprised',speaker:'周予晴',text:'她看向致遠。「再看看。」',next:'d5_63'},
  d5_63:{chapter:5,bg:'lounge',char:'pm',exp:'smile',speaker:'小禾｜視訊',text:'「什麼叫再看看？」',next:'d5_64'},
  d5_64:{chapter:5,bg:'lounge',char:'pm',exp:'smile',speaker:'周予晴',text:'「就是小孩該睡覺了的意思。」電話那頭大喊「媽媽作弊」，視訊終於結束。',next:'d5_65'},
  d5_65:{chapter:5,bg:'lounge',char:'pm',exp:'tired',speaker:'周予晴',text:'「不好意思。他很愛亂講。」',next:'d5_66'},
  d5_66:{chapter:5,bg:'lounge',char:'rf',exp:'normal',speaker:'林致遠',text:'「小孩不是都這樣？」',next:'d5_67'},
  d5_67:{chapter:5,bg:'lounge',char:'pm',exp:'normal',speaker:'周予晴',text:'「你每次都這句。」她停了一會兒。「如果他真的叫你一起吃飯，你會介意嗎？」',next:'d5_68'},
  d5_68:{chapter:5,bg:'lounge',char:'rf',exp:'normal',speaker:'旁白',text:'這不是普通同事聚餐。是走進她和孩子原本很私人的生活。',choices:[
    {text:'不會',next:'d5_c3a',effects:{pmAffection:1,childTrust:1}},
    {text:'再看看',next:'d5_c3b',effects:{pmAffection:-1}},
    {text:'如果妳不介意',next:'d5_c3c',effects:{pmAffection:2,childTrust:1}},
    {text:'我不太會跟小孩相處',next:'d5_c3d',effects:{pmAffection:1}}
  ]},
  d5_c3a:{chapter:5,bg:'lounge',char:'rf',exp:'normal',speaker:'林致遠',text:'「不會。」答案太快，連他自己都愣了一下。',next:'d5_69'},
  d5_c3b:{chapter:5,bg:'lounge',char:'rf',exp:'normal',speaker:'林致遠',text:'「再看看。」他借用了她剛才的答案。她笑了，卻沒有再追問。',next:'d5_69'},
  d5_c3c:{chapter:5,bg:'lounge',char:'rf',exp:'normal',speaker:'林致遠',text:'「如果妳不介意。」',next:'d5_69'},
  d5_c3d:{chapter:5,bg:'lounge',char:'rf',exp:'normal',speaker:'林致遠',text:'「我不太會跟小孩相處。」她輕聲說：「他好像不介意。」',next:'d5_69'},
  d5_69:{chapter:5,bg:'lounge',char:'pm',exp:'normal',speaker:'周予晴',text:'她看著他，沒有立刻說話。最後只回了一聲：「嗯。」比他平常的「嗯」更有重量。',next:'d5_70'},
  d5_70:{chapter:5,bg:'lounge',char:'pm',exp:'tired',speaker:'旁白',text:'她站起來時稍微晃了一下。致遠下意識扶住她的手臂，只是一瞬間。',next:'d5_71'},
  d5_71:{chapter:5,bg:'lounge',char:'pm',exp:'serious',speaker:'周予晴',text:'「我沒有醉。」',next:'d5_72'},
  d5_72:{chapter:5,bg:'lounge',char:'rf',exp:'normal',speaker:'林致遠',text:'「我知道。」',next:'d5_73'},
  d5_73:{chapter:5,bg:'lounge',char:'pm',exp:'normal',speaker:'周予晴',text:'「那你扶什麼？」',next:'d5_74'},
  d5_74:{chapter:5,bg:'lounge',char:'rf',exp:'smile',speaker:'林致遠',text:'「Safety Margin。」',next:'d5_75'},
  d5_75:{chapter:5,bg:'lounge',char:'pm',exp:'smile',speaker:'周予晴',text:'她愣住，然後笑了。「走啦，訊號叔叔。現在是 Family Approved nickname。」',next:'d5_76'},
  d5_76:{chapter:5,bg:'elevator',time:'HOTEL ELEVATOR · 23:08',char:'rf',exp:'surprised',speaker:'林致遠',text:'「……Family？」',next:'d5_77'},
  d5_77:{chapter:5,bg:'elevator',char:'pm',exp:'surprised',speaker:'旁白',text:'她也意識到自己說了什麼，腳步慢了半拍，隨即裝作沒事。',next:'d5_78'},
  d5_78:{chapter:5,bg:'elevator',char:'pm',exp:'normal',speaker:'周予晴',text:'「不要想太多。」',next:'d5_end'},
  d5_end:{chapter:5,bg:'elevator',time:'CHAPTER 05 · END',char:'rf',exp:'normal',speaker:'旁白',text:'沒有告白、牽手或接吻。但他開始走進她與孩子的私人生活；而她也第一次讓他看見，那個會累、會不知道答案、也需要有人聽她抱怨的自己。當感情碰到家庭，兩個成年人都會變得更慎重。',end:true},

  w1_01:{chapter:'EX',bg:'hotel',time:'FRIDAY · 21:30',char:'pm',exp:'tired',speaker:'周予晴',text:'她結束最後一場客戶電話，闔上 Notebook，長長吐了一口氣。「客戶接受 Containment Plan 了。」',next:'w1_02',bgm:'hotel_evening'},
  w1_02:{chapter:'EX',bg:'hotel',char:'rf',exp:'tired',speaker:'林致遠',text:'「所以明天不用進 Factory？」',next:'w1_03'},
  w1_03:{chapter:'EX',bg:'hotel',char:'pm',exp:'normal',speaker:'周予晴',text:'「目前不用。」兩人同時安靜下來。連續幾天醒來就是 Factory、Measurement、Meeting、Customer、Report；突然自由，反而不知道要做什麼。',next:'w1_04'},
  w1_04:{chapter:'EX',bg:'hotel',char:'rf',exp:'normal',speaker:'林致遠',text:'「那明天要幹嘛？」',next:'w1_05'},
  w1_05:{chapter:'EX',bg:'hotel',char:'pm',exp:'surprised',speaker:'周予晴',text:'「……你的人生真的只有工作嗎？」',next:'w1_06'},
  w1_06:{chapter:'EX',bg:'hotel',char:'rf',exp:'normal',speaker:'林致遠',text:'「以前出差休假，我通常睡覺。」',next:'w1_07'},
  w1_07:{chapter:'EX',bg:'hotel',char:'pm',exp:'serious',speaker:'周予晴',text:'「不行。都來馬來西亞了，我不想回台灣以後，只記得 Factory。」',next:'w1_08'},
  w1_08:{chapter:'EX',bg:'hotel',char:'rf',exp:'normal',speaker:'林致遠',text:'「那妳想去哪？」',next:'w1_09'},
  w1_09:{chapter:'EX',bg:'hotel',char:'pm',exp:'normal',speaker:'周予晴',text:'「不知道。你不是以前來過？推薦啊。」',next:'w1_10'},
  w1_10:{chapter:'EX',bg:'hotel',char:'rf',exp:'normal',speaker:'林致遠',text:'「以前只去過飯店、公司、工廠。」',next:'w1_11'},
  w1_11:{chapter:'EX',bg:'hotel',char:'pm',exp:'tired',speaker:'周予晴',text:'「我就知道。」',next:'w1_12'},
  w1_12:{chapter:'EX',bg:'hotel-day',time:'SATURDAY · 10:30',char:'rf',exp:'normal',outfit:'casual',speaker:'旁白',text:'隔天，兩人難得睡晚。致遠換掉公司襯衫和識別證，只帶手機與錢包來到 Lobby。',next:'w1_13',bgm:'weekend_morning'},
  w1_13:{chapter:'EX',bg:'hotel-day',char:'pm',exp:'normal',outfit:'casual',speaker:'旁白',text:'予晴穿著簡單的白色上衣與長裙，頭髮也比平常隨意。致遠看了她幾秒。',next:'w1_14'},
  w1_14:{chapter:'EX',bg:'hotel-day',char:'pm',exp:'surprised',outfit:'casual',speaker:'周予晴',text:'「怎麼了？你剛才明明一直看。」',next:'w1_15'},
  w1_15:{chapter:'EX',bg:'hotel-day',char:'rf',exp:'normal',outfit:'casual',speaker:'林致遠',text:'「只是第一次看到妳沒有帶 Notebook。還有，沒有掛識別證。」',next:'w1_16'},
  w1_16:{chapter:'EX',bg:'hotel-day',char:'pm',exp:'tired',outfit:'casual',speaker:'周予晴',text:'「……你就只注意到這個？」',next:'w1_17'},
  w1_17:{chapter:'EX',bg:'hotel-day',char:'rf',exp:'normal',outfit:'casual',speaker:'林致遠',text:'「還有今天沒有 Schedule。」',next:'w1_18'},
  w1_18:{chapter:'EX',bg:'kl-city',time:'KLANG VALLEY · 12:05',char:'pm',exp:'normal',outfit:'casual',speaker:'旁白',text:'他們沒有說這是約會。只是反正今天不用工作，所以一起喝咖啡、吃午餐，在陌生街道上慢慢走。致遠手裡第一次沒有 Notebook。',next:'w1_19'},
  w1_19:{chapter:'EX',bg:'kl-city',char:'pm',exp:'smile',outfit:'casual',speaker:'周予晴',text:'她拍下一張街景。「我要傳給他看，讓他知道媽媽今天沒有在 Factory。」',next:'w1_20'},
  w1_20:{chapter:'EX',bg:'kl-city',char:'pm',exp:'smile',outfit:'casual',speaker:'小禾｜訊息',text:'「媽媽今天不用工作嗎？」',data:[['周予晴','不用',''],['小禾','那妳要玩！','pass']],next:'w1_21'},
  w1_21:{chapter:'EX',bg:'kl-city',char:'rf',exp:'normal',outfit:'casual',speaker:'林致遠',text:'「指令很明確。」',next:'w1_22'},
  w1_22:{chapter:'EX',bg:'kl-city',char:'pm',exp:'smile',outfit:'casual',speaker:'周予晴',text:'「比客戶 Requirement 清楚。」',next:'w1_23'},
  w1_23:{chapter:'EX',bg:'holi',time:'SATURDAY AFTERNOON',char:'pm',exp:'surprised',outfit:'casual',speaker:'旁白',text:'午後，遠處傳來音樂、鼓聲和歡呼。印度家庭、孩子與年輕人在社群活動裡跳舞，紅、黃、藍、綠與粉紅色粉末自然地飛進笑聲中。',next:'w1_24',bgm:'festival_intro'},
  w1_24:{chapter:'EX',bg:'holi',char:'pm',exp:'normal',outfit:'casual',speaker:'周予晴',text:'「那邊是什麼？」',next:'w1_25'},
  w1_25:{chapter:'EX',bg:'holi',char:'rf',exp:'normal',outfit:'casual',speaker:'林致遠',text:'「不知道。」',next:'w1_26'},
  w1_26:{chapter:'EX',bg:'holi',char:'rf',exp:'surprised',outfit:'casual',speaker:'活動參與者',text:'「First time Holi？」致遠還沒理解，臉頰已被輕輕抹上一點彩粉。',next:'w1_27'},
  w1_27:{chapter:'EX',bg:'holi',char:'pm',exp:'smile',outfit:'casual',speaker:'周予晴',text:'她愣了一秒，接著真的大笑起來。「哈哈哈哈哈哈！」不是禮貌，也不是會議裡那種控制過音量的笑。',next:'w1_28'},
  w1_28:{chapter:'EX',bg:'holi',char:'rf',exp:'normal',outfit:'casual',speaker:'林致遠',text:'「很好笑？」',next:'w1_29'},
  w1_29:{chapter:'EX',bg:'holi',char:'pm',exp:'smile',outfit:'casual',speaker:'周予晴',text:'「超好笑。」',next:'w1_30'},
  w1_30:{chapter:'EX',bg:'holi',char:'rf',exp:'smile',outfit:'casual',speaker:'旁白',text:'致遠拿起一點粉紅色彩粉。予晴立刻後退。「等一下，你敢——」',next:'w1_31'},
  w1_31:{chapter:'EX',bg:'holi',char:'pm',exp:'surprised',outfit:'casual',speaker:'旁白',text:'粉紅色落在她臉頰。附近的人歡呼起來。她安靜兩秒，抓起一大把黃色彩粉。',next:'w1_32'},
  w1_32:{chapter:'EX',bg:'holi',char:'pm',exp:'smile',outfit:'casual',speaker:'周予晴',text:'「那就一起髒！」',next:'w1_33'},
  w1_33:{chapter:'EX',bg:'holi',char:'pm',exp:'smile',outfit:'casual',speaker:'旁白',text:'音樂加快，孩子在人群間跑動，陌生人互相祝福。她抓著彩粉追過來。',choices:[
    {text:'躲開她的彩粉',next:'w1_c1a',effects:{lifeBalance:1}},
    {text:'正面反擊',next:'w1_c1b',effects:{pmAffection:1,lifeBalance:1}},
    {text:'故意站著讓她灑',next:'w1_c1c',effects:{pmAffection:2,lifeBalance:2}},
    {text:'用藍色彩粉從側面偷襲',next:'w1_c1d',effects:{pmAffection:1,lifeBalance:1}}
  ],bgm:'festival_happy'},
  w1_c1a:{chapter:'EX',bg:'holi',char:'rf',exp:'smile',outfit:'casual',speaker:'林致遠',text:'他側身躲開。彩粉落到後面一個笑著的小男孩身上，下一秒，兩個人同時成為反擊目標。',next:'w1_34'},
  w1_c1b:{chapter:'EX',bg:'holi',char:'rf',exp:'smile',outfit:'casual',speaker:'林致遠',text:'他正面撒出彩粉。予晴閉著眼睛大笑：「你不是很理性嗎？」',next:'w1_34'},
  w1_c1c:{chapter:'EX',bg:'holi',char:'rf',exp:'smile',outfit:'casual',speaker:'旁白',text:'她把彩粉灑到他身上，才發現他根本沒有躲。',next:'w1_c1c2'},
  w1_c1c2:{chapter:'EX',bg:'holi',char:'pm',exp:'surprised',outfit:'casual',speaker:'周予晴',text:'「你怎麼不跑？」',next:'w1_c1c3'},
  w1_c1c3:{chapter:'EX',bg:'holi',char:'rf',exp:'smile',outfit:'casual',speaker:'林致遠',text:'「妳看起來很開心。」',next:'w1_c1c4'},
  w1_c1c4:{chapter:'EX',bg:'holi',char:'pm',exp:'smile',outfit:'casual',speaker:'周予晴',text:'她安靜半秒，下一秒把剩下的粉全部灑上去。「那就再開心一點。」',next:'w1_34'},
  w1_c1d:{chapter:'EX',bg:'holi',char:'rf',exp:'smile',outfit:'casual',speaker:'旁白',text:'藍色粉末從側面飛過去。她轉頭瞪他，臉上卻全是笑。「林、致、遠！」',next:'w1_34'},
  w1_34:{chapter:'EX',bg:'holi-cg',time:'NO SPEC · NO SCHEDULE',char:'rf',exp:'smile',outfit:'casual',speaker:'旁白',text:'幾天前，他們還在為 2.6 dB 爭取時間。今天，沒有任何數字需要被證明，沒有任何問題需要被關閉，也沒有人需要回答到底何時可以解決。',next:'w1_35',cg:'holi'},
  w1_35:{chapter:'EX',bg:'holi-cg',char:'pm',exp:'smile',outfit:'casual',speaker:'CG UNLOCKED',text:'《沒有 Pass / Fail 的星期六》——這一刻沒有 RF Engineer、PM、Customer、BU Head、Factory、TRP、OTA 或 Schedule。只有兩個在陽光下笑著的人。',next:'w1_36',unlockCG:'holi_saturday'},
  w1_36:{chapter:'EX',bg:'holi',char:'pm',exp:'smile',outfit:'casual',speaker:'周予晴',text:'「等一下，我要拍照。」',next:'w1_37'},
  w1_37:{chapter:'EX',bg:'holi',char:'rf',exp:'normal',outfit:'casual',speaker:'林致遠',text:'「拍啊。」',next:'w1_38'},
  w1_38:{chapter:'EX',bg:'holi',char:'pm',exp:'serious',outfit:'casual',speaker:'周予晴',text:'她看著第一張自拍皺眉。「你站那麼遠幹嘛？過來啦。」',next:'w1_39'},
  w1_39:{chapter:'EX',bg:'holi-cg',char:'rf',exp:'smile',outfit:'casual',speaker:'旁白',text:'致遠站到她旁邊。他們沒有擁抱，只是比平常靠得近一些。兩張沾滿彩粉的臉，同時留在她的私人相簿裡。',next:'w1_40'},
  w1_40:{chapter:'EX',bg:'holi-cg',char:'pm',exp:'smile',outfit:'casual',speaker:'小禾｜訊息',text:'照片送出幾秒後，孩子回覆了。',data:[['小禾','哈哈哈哈媽媽變彩虹！',''],['小禾','訊號叔叔也在！','pass']],next:'w1_41'},
  w1_41:{chapter:'EX',bg:'holi',char:'rf',exp:'surprised',outfit:'casual',speaker:'林致遠',text:'「……訊號叔叔？」',next:'w1_42'},
  w1_42:{chapter:'EX',bg:'holi',char:'pm',exp:'smile',outfit:'casual',speaker:'周予晴',text:'「你的新綽號。他喜歡你才會取綽號。」',next:'w1_43'},
  w1_43:{chapter:'EX',bg:'holi',char:'rf',exp:'normal',outfit:'casual',speaker:'林致遠',text:'「喔。收到。」',next:'w1_44',effects:{childTrust:2,pmAffection:1}},
  w1_44:{chapter:'EX',bg:'holi',char:'pm',exp:'smile',outfit:'casual',speaker:'周予晴',text:'「真的很難跟你聊天耶。」',next:'w1_45'},
  w1_45:{chapter:'EX',bg:'cafe',time:'LATE AFTERNOON',char:'pm',exp:'tired',outfit:'casual',speaker:'周予晴',text:'活動結束後，他們坐在附近咖啡店的戶外座位。身上的彩粉怎麼擦也擦不乾淨。「我好久沒有這樣玩了。」',next:'w1_46',bgm:'quiet_afternoon'},
  w1_46:{chapter:'EX',bg:'cafe',char:'rf',exp:'normal',outfit:'casual',speaker:'林致遠',text:'「多久？」',next:'w1_47'},
  w1_47:{chapter:'EX',bg:'cafe',char:'pm',exp:'normal',outfit:'casual',speaker:'周予晴',text:'「不知道。可能有小孩以後吧。不是小孩不好，只是當媽媽以後，做什麼都會先想他。」',next:'w1_48'},
  w1_48:{chapter:'EX',bg:'cafe',char:'rf',exp:'normal',outfit:'casual',speaker:'林致遠',text:'「今天可以先想自己。」',next:'w1_49'},
  w1_49:{chapter:'EX',bg:'cafe',char:'pm',exp:'surprised',outfit:'casual',speaker:'旁白',text:'她安靜下來。這不是安慰，也不是同情；只是一張她很久沒有替自己保留的許可證。',next:'w1_50'},
  w1_50:{chapter:'EX',bg:'cafe',char:'pm',exp:'normal',outfit:'casual',speaker:'周予晴',text:'「那你呢？你今天有想自己嗎？」',next:'w1_51'},
  w1_51:{chapter:'EX',bg:'cafe',char:'rf',exp:'normal',outfit:'casual',speaker:'林致遠',text:'他低頭看著自己身上的紅、黃、藍、綠。「我平常不會做這種事。」',next:'w1_52'},
  w1_52:{chapter:'EX',bg:'cafe',char:'pm',exp:'normal',outfit:'casual',speaker:'周予晴',text:'「後悔？」',next:'w1_53'},
  w1_53:{chapter:'EX',bg:'cafe',char:'rf',exp:'smile',outfit:'casual',speaker:'林致遠',text:'「沒有。」',next:'w1_54',effects:{pmAffection:1,lifeBalance:2}},
  w1_54:{chapter:'EX',bg:'malaysia-road',time:'RETURN TO SHAH ALAM · 20:18',char:'pm',exp:'tired',outfit:'casual',speaker:'周予晴',text:'回程車內安靜得只剩輪胎聲。她靠著窗，忽然說：「今天謝謝你。」',next:'w1_55'},
  w1_55:{chapter:'EX',bg:'malaysia-road',char:'rf',exp:'tired',outfit:'casual',speaker:'林致遠',text:'「我也沒做什麼。」',next:'w1_56'},
  w1_56:{chapter:'EX',bg:'malaysia-road',char:'pm',exp:'smile',outfit:'casual',speaker:'周予晴',text:'「就是因為沒做什麼。沒有解問題、處理 Schedule、擋客戶，就只是陪我玩。」',next:'w1_57'},
  w1_57:{chapter:'EX',bg:'malaysia-road',char:'rf',exp:'normal',outfit:'casual',speaker:'林致遠',text:'「嗯。」',next:'w1_58'},
  w1_58:{chapter:'EX',bg:'malaysia-road',char:'pm',exp:'smile',outfit:'casual',speaker:'周予晴',text:'「又是嗯。」',next:'w1_59'},
  w1_59:{chapter:'EX',bg:'malaysia-road',char:'rf',exp:'smile',outfit:'casual',speaker:'林致遠',text:'「那……不客氣？」她笑出聲來。',next:'w1_60'},
  w1_60:{chapter:'EX',bg:'elevator',time:'HOTEL · 21:06',char:'pm',exp:'smile',outfit:'casual',speaker:'周予晴',text:'「晚安，訊號叔叔。」',next:'w1_61'},
  w1_61:{chapter:'EX',bg:'elevator',char:'rf',exp:'serious',outfit:'casual',speaker:'林致遠',text:'「不要這樣叫。妳兒子叫就算了。」',next:'w1_62'},
  w1_62:{chapter:'EX',bg:'elevator',char:'pm',exp:'smile',outfit:'casual',speaker:'周予晴',text:'「我覺得很好。晚安。」',next:'w1_63'},
  w1_63:{chapter:'EX',bg:'hotel-room',char:'rf',exp:'normal',outfit:'casual',speaker:'旁白',text:'房門關上後，手機震動。她傳來今天的合照，沒有任何文字。致遠看了幾秒，將照片存下。',next:'w1_64',unlockCG:'first_private_photo'},
  w1_64:{chapter:'EX',bg:'holi-cg',time:'SIDE STORY · END',char:'rf',exp:'smile',outfit:'casual',speaker:'旁白',text:'有些日子沒有進度、沒有成果，甚至沒有任何可以寫進週報裡的事。但很多年以後，我們最容易記住的，往往就是這樣的一天。',next:'w1_end'},
  w1_end:{chapter:'EX',bg:'holi-cg',time:'COMPLETE',char:'pm',exp:'smile',outfit:'casual',speaker:'《沒有 Pass / Fail 的星期六》',text:'這不是告白，也沒有誰確認關係。只是兩個背負許多責任的大人，得到一天，可以單純地開心。',end:true}
};

let state = { scene:'start', stats:{...initialStats}, choices:[], backlog:[], applied:[], sideQuests:[], unlockedCG:[], unlocked:['chapter1'], auto:false, skip:false };
let settings = JSON.parse(localStorage.getItem('rfSettings') || '{"speed":55,"sound":true}');
let timer = null, typing = false, fullText = '';

const $ = s => document.querySelector(s);
const titleScreen = $('#titleScreen'), gameScreen = $('#gameScreen'), modal = $('#modal');
function showScreen(game){ titleScreen.classList.toggle('active',!game); gameScreen.classList.toggle('active',game); }
function toast(msg){ const el=$('#toast'); el.textContent=msg; el.classList.add('show'); setTimeout(()=>el.classList.remove('show'),1600); }
function playBGM(name){ if(settings.sound) console.info('[BGM]',name); }
function playSFX(name){ if(settings.sound) console.info('[SFX]',name); }

function newGame(){ state={scene:'start',stats:{...initialStats},choices:[],backlog:[],applied:[],sideQuests:[],unlockedCG:[],unlocked:['chapter1'],auto:false,skip:false}; showScreen(true); playBGM('office_evening'); render(); }
function startChapter2(){
  state.applied ||= [];
  state.unlocked ||= ['chapter1','chapter2'];
  if(!state.unlocked.includes('chapter2')) state.unlocked.push('chapter2');
  state.scene='d2_01'; state.auto=false; state.skip=false;
  closeModal(); showScreen(true); playBGM('morning_office'); render();
}
function startChapter3(){
  state.applied ||= []; state.unlocked ||= ['chapter1','chapter2','chapter3'];
  if(!state.unlocked.includes('chapter3')) state.unlocked.push('chapter3');
  state.scene='d3_01'; state.auto=false; state.skip=false;
  closeModal(); showScreen(true); playBGM('urgent_afternoon'); render();
}
function startChapter4(){
  state.applied ||= []; state.sideQuests ||= []; state.unlocked ||= ['chapter1','chapter2','chapter3','chapter4'];
  if(!state.unlocked.includes('chapter4')) state.unlocked.push('chapter4');
  state.scene='d4_01'; state.auto=false; state.skip=false;
  closeModal(); showScreen(true); playBGM('klia_night'); render();
}
function startChapter5(){
  state.applied ||= []; state.unlocked ||= ['chapter1','chapter5'];
  if(!state.unlocked.includes('chapter5')) state.unlocked.push('chapter5');
  state.scene='d5_01'; state.auto=false; state.skip=false;
  closeModal(); showScreen(true); playBGM('factory_morning'); render();
}
function startWeekend(){
  state.applied ||= []; state.sideQuests ||= []; state.unlockedCG ||= []; state.unlocked ||= ['chapter1','weekend'];
  if(!state.unlocked.includes('weekend')) state.unlocked.push('weekend');
  state.scene='w1_01'; state.auto=false; state.skip=false;
  closeModal(); showScreen(true); playBGM('hotel_evening'); render();
}
function render(){
  clearTimeout(timer); typing=false;
  const s=story[state.scene]; if(!s) return;
  state.applied ||= [];
  if(s.effects && !state.applied.includes(state.scene)){
    Object.entries(s.effects).forEach(([k,v])=>state.stats[k]=(state.stats[k]||0)+v);
    state.applied.push(state.scene);
  }
  const chapter=s.chapter||1;
  document.querySelector('.chapter-label small').textContent=`CHAPTER ${String(chapter).padStart(2,'0')}`;
  document.querySelector('.chapter-label strong').textContent=chapter==='EX'?'沒有 Pass / Fail 的星期六':chapter===5?'Root Cause 還沒有結束':chapter===4?'吉隆坡，凌晨零點':chapter===3?'今天傍晚，飛吉隆坡':chapter===2?'早上九點以前':'掉了 3 dB 的夜晚';
  const stage=$('#stage'); stage.className=`stage bg-${s.bg||'office'}`;
  if(s.time) $('#sceneCaption').textContent=s.time;
  const portrait=$('#portrait'); portrait.className=`portrait ${s.char||'rf'} ${s.exp||'normal'} ${s.outfit||''}`;
  $('.portrait-label').textContent=s.char==='pm'?'PROJECT MANAGER':'RF ENGINEER';
  $('#speaker').textContent=s.speaker;
  $('#choices').className='choices'; $('#choices').innerHTML=''; $('#nextBtn').style.display=s.choices?'none':'block';
  const dataPanel=$('#dataPanel'); dataPanel.className='data-panel'; dataPanel.innerHTML='';
  if(s.data){
    dataPanel.innerHTML=s.data.map(([key,value,cls=''])=>`<span class="${cls==='wide'?'wide':''}">${esc(key)}</span><b class="${cls}">${esc(value)}</b>`).join('');
    dataPanel.classList.add('active');
  }
  fullText=s.text; typeText(s.text);
  const last=state.backlog[state.backlog.length-1];
  if(!last || last.scene!==state.scene){ state.backlog.push({scene:state.scene,speaker:s.speaker,text:s.text}); state.backlog=state.backlog.slice(-50); }
  if(s.sfx) playSFX(s.sfx);
  if(s.bgm) playBGM(s.bgm);
  state.unlockedCG ||= [];
  if(s.unlockCG && !state.unlockedCG.includes(s.unlockCG)) state.unlockedCG.push(s.unlockCG);
  if(s.choices) setTimeout(()=>showChoices(s.choices), Math.min(s.text.length*settings.speed+250,2200));
  if(s.end){
    if(!state.unlocked.includes('chapter2')) state.unlocked.push('chapter2');
    if(s.chapter===2 && !state.unlocked.includes('chapter3')) state.unlocked.push('chapter3');
    if(s.chapter===3 && !state.unlocked.includes('chapter4')) state.unlocked.push('chapter4');
    if(s.chapter===4 && !state.unlocked.includes('chapter5')) state.unlocked.push('chapter5');
    if(s.chapter===4 && !state.unlocked.includes('weekend')) state.unlocked.push('weekend');
    if(s.chapter===5 && !state.unlocked.includes('chapter6')) state.unlocked.push('chapter6');
    save(true);
  }
}
function typeText(text){
  const el=$('#dialogue'); el.textContent=''; typing=true; let i=0;
  const tick=()=>{ if(i<text.length){ el.textContent+=text[i++]; timer=setTimeout(tick,state.skip?3:settings.speed); } else { typing=false; if(state.auto&&!story[state.scene].choices&&!story[state.scene].end) timer=setTimeout(next,1100); } };
  tick();
}
function completeTyping(){ clearTimeout(timer); $('#dialogue').textContent=fullText; typing=false; const s=story[state.scene]; if(s.choices) showChoices(s.choices); }
function showChoices(list){ if(state.scene!==state.backlog.at(-1)?.scene) return; const box=$('#choices'); box.innerHTML=''; list.forEach((c,i)=>{ const b=document.createElement('button'); b.className='choice'; b.textContent=c.text; b.onclick=()=>choose(c,i); box.appendChild(b); }); box.classList.add('active'); }
function choose(c,index){ state.choices.push({scene:state.scene,index,text:c.text}); Object.entries(c.effects||{}).forEach(([k,v])=>state.stats[k]=(state.stats[k]||0)+v); state.sideQuests ||= []; if(c.unlock&&!state.sideQuests.includes(c.unlock))state.sideQuests.push(c.unlock); state.scene=c.next; render(); }
function next(){ const s=story[state.scene]; if(typing){completeTyping();return} if(s.choices||s.end)return; state.scene=s.next; render(); }
function save(silent=false){ localStorage.setItem(STORAGE_KEY,JSON.stringify({...state,auto:false,skip:false})); updateSaveHint(); if(!silent)toast('進度已儲存'); }
function load(){ const data=localStorage.getItem(STORAGE_KEY); if(!data){toast('尚未建立存檔');return} state=JSON.parse(data); state.applied ||= []; state.sideQuests ||= []; state.unlockedCG ||= []; state.unlocked ||= ['chapter1']; showScreen(true); render(); toast('已讀取存檔'); }
function updateSaveHint(){ const data=localStorage.getItem(STORAGE_KEY); $('#saveHint').textContent=data?'已有存檔 · 可以繼續遊戲':'尚未建立存檔'; }

function openModal(type){
  const content=$('#modalContent');
  if(type==='characters') content.innerHTML=`<h2><small>CHARACTER FILE</small>角色介紹</h2><div class="cards"><article class="character-card"><div class="character-icon">⌁</div><strong>林致遠 · 36</strong><p>資深 RF 工程師。比起說漂亮話，更習慣直接把問題解決。對頻譜上的雜訊敏銳，對人心則不然。</p></article><article class="character-card"><div class="character-icon">▦</div><strong>周予晴 · 34</strong><p>專案 PM，也是七歲孩子的母親。每天管理兩套 Schedule，不願任何人因她的身分給予同情。</p></article><article class="character-card"><div class="character-icon">✦</div><strong>周小禾 · 7</strong><p>好奇、直率，擅長問出大人不敢問的事。目前尚未登場。</p></article></div>`;
  if(type==='chapters') content.innerHTML=`<h2><small>CHAPTER SELECT</small>章節選擇</h2><div class="cards">
    <article class="chapter-card"><strong>01 · 掉了 3 dB 的夜晚</strong><p>第一次真正合作，與一個沒被說出口的生活難題。</p><button onclick="closeModal();newGame()">從頭開始</button></article>
    <article class="chapter-card ${state.unlocked.includes('chapter2')?'':'locked'}"><strong>02 · 早上九點以前</strong><p>${state.unlocked.includes('chapter2')?'客戶壓力下，兩種專業開始站到同一邊。':'完成第一章後解鎖'}</p>${state.unlocked.includes('chapter2')?'<button onclick="startChapter2()">進入第二日</button>':''}</article>
    <article class="chapter-card ${state.unlocked.includes('chapter3')?'':'locked'}"><strong>03 · 今天傍晚，飛吉隆坡</strong><p>${state.unlocked.includes('chapter3')?'從工廠危機到第一次共同海外出差。':'完成第二日後解鎖'}</p>${state.unlocked.includes('chapter3')?'<button onclick="startChapter3()">進入第三章</button>':''}</article>
    <article class="chapter-card ${state.unlocked.includes('chapter4')?'':'locked'}"><strong>04 · 吉隆坡，凌晨零點</strong><p>${state.unlocked.includes('chapter4')?'異國深夜裡，第一次談起工作以外的生活。':'完成第三章後解鎖'}</p>${state.unlocked.includes('chapter4')?'<button onclick="startChapter4()">進入第四章</button>':''}</article>
    <article class="chapter-card ${state.unlocked.includes('weekend')?'side-story':'locked'}"><strong>EX · 沒有 Pass / Fail 的星期六</strong><p>${state.unlocked.includes('weekend')?'沒有 Spec、Schedule 或 Root Cause 的週末。':'完成馬來西亞工作週後解鎖'}</p>${state.unlocked.includes('weekend')?'<button onclick="startWeekend()">進入週末支線</button>':''}</article>
    <article class="chapter-card ${state.unlocked.includes('chapter5')?'':'locked'}"><strong>05 · Root Cause 還沒有結束</strong><p>${state.unlocked.includes('chapter5')?'白天各自在戰場撐著，晚上才終於能說累。':'完成第四章後解鎖'}</p>${state.unlocked.includes('chapter5')?'<button onclick="startChapter5()">進入第五章</button>':''}</article>
    <article class="chapter-card locked"><strong>06 · 謹慎的距離</strong><p>${state.unlocked.includes('chapter6')?'第五章已完成 · 故事待續':'完成第五章後解鎖'}</p></article>
  </div>`;
  if(type==='backlog') content.innerHTML=`<h2><small>BACKLOG · LAST 50</small>對話回顧</h2>${state.backlog.length?state.backlog.slice().reverse().map(x=>`<div class="log-entry"><b>${esc(x.speaker)}</b>${esc(x.text)}</div>`).join(''):'<p>還沒有對話紀錄。</p>'}`;
  if(type==='stats') content.innerHTML=`<h2><small>PLAYER STATUS</small>目前狀態</h2><div class="stats">${Object.entries(state.stats).map(([k,v])=>`<div class="stat-row"><span>${labels[k]}</span><span>${v>=0?'+':''}${v}</span></div>`).join('')}</div><p style="color:var(--muted);line-height:1.8">數值不會鎖死單一選項，而會在後續章節改變對話、支線與結局。</p>`;
  if(type==='settings') content.innerHTML=`<h2><small>SYSTEM</small>系統設定</h2><label class="setting-row"><span>文字速度</span><input id="speedRange" type="range" min="15" max="100" value="${115-settings.speed}"></label><label class="setting-row"><span>音效介面</span><input id="soundToggle" type="checkbox" ${settings.sound?'checked':''}></label><p style="color:var(--muted);font-size:13px">本作已建立 BGM / SFX 呼叫介面；目前以靜音模式遊玩，不載入外部音訊。</p>`;
  modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
  $('#speedRange')?.addEventListener('input',e=>{settings.speed=115-Number(e.target.value);persistSettings()});
  $('#soundToggle')?.addEventListener('change',e=>{settings.sound=e.target.checked;persistSettings()});
}
function persistSettings(){localStorage.setItem('rfSettings',JSON.stringify(settings))}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}
function esc(v){const d=document.createElement('div');d.textContent=v;return d.innerHTML}

document.addEventListener('click',e=>{
  const action=e.target.closest('[data-action]')?.dataset.action, m=e.target.closest('[data-modal]')?.dataset.modal;
  if(m) openModal(m);
  if(action==='new') newGame(); if(action==='continue') load(); if(action==='home'){save(true);showScreen(false)};
  if(action==='save') save(); if(action==='load') load();
  if(action==='auto'){state.auto=!state.auto;e.target.closest('button').classList.toggle('active',state.auto);toast(state.auto?'自動播放：開':'自動播放：關');if(state.auto&&!typing)next()}
  if(action==='skip'){state.skip=!state.skip;e.target.closest('button').classList.toggle('active',state.skip);toast(state.skip?'快轉：開':'快轉：關');if(state.skip&&typing)completeTyping()}
});
$('#nextBtn').addEventListener('click',next); $('.modal-close').onclick=closeModal; modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if((e.key===' '||e.key==='Enter')&&gameScreen.classList.contains('active')&&!modal.classList.contains('open')){e.preventDefault();next()}if(e.key==='Escape')closeModal()});
updateSaveHint();
