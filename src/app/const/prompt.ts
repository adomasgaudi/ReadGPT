export const convertJPToENGPrompt = `Task: convert japanese into english and write the pronunciation in hiragana
    Prompt: 悪魔
    Response: (あくま)Devil
    Prompt: 悪魔の弟子
    Response: (あくまのでし)Devil's Disciple
    Prompt: `

export const convertFREoENGPrompt = `Task: convert french into english
    Prompt: paragraphe
    Response: pragraph
    Prompt: `

export const convertTextToJSONArrayPrompt = `Task: convert text to json
    Prompt: 未決, 囚徒, たる, 私,、, 即ち, 島浦, 英三, は,、, 其の, 旧友, に, して, 嘗かつて, は, 兄弟, より, 親しかりし, 土田, 検事, 殿, に,、, 此の, 手紙, を, 送ります
    Response: [
      {"word": "未決", "level": "N1"},
      {"word": "囚徒", "level": "N1"},
      {"word": "たる", "level": "N1"},
      {"word": "私", "level": "N5"},
      {"word": "即ち", "level": "N1"},
      {"word": "島浦", "level": "N1"},
      {"word": "英三", "level": "N1"},
      {"word": "は", "level": "N5"},
      {"word": "其の", "level": "N1"},
      {"word": "旧友", "level": "N1"},
      {"word": "にして", "level": "N1"},
      {"word": "嘗", "level": "N1"},
      {"word": "かつて", "level": "N2"},
      {"word": "は", "level": "N5"},
      {"word": "兄弟", "level": "N3"},
      {"word": "より", "level": "N4"},
      {"word": "親しかりし", "level": "N1"},
      {"word": "土田", "level": "N1"},
      {"word": "検事", "level": "N1"},
      {"word": "殿に", "level": "N1"},
      {"word": "此の", "level": "N1"},
      {"word": "手紙", "level": "N3"},
      {"word": "を", "level": "N5"},
      {"word": "送ります", "level": "N3"}
    ]
    Prompt: 悪魔の弟子
    Response: [
      {"word": "悪魔", "level": "N2"},
      {"word": "の", "level": "N5"},
      {"word": "弟子", "level": "N2"}
    ]
    Prompt: `

export const separateByCommaPrompt = `Task: separate these japanese words by comma, also separating the punctuation
    Prompt: 悪魔の弟子 浜尾四郎 +目次 一 
    Response: 悪魔,の,弟子, 浜尾,四郎, +,目次, 一"
    Prompt: 未決囚徒たる私、即ち島浦英三は、其の旧友にして嘗かつては兄弟より親しかりし土田検事殿に、此の手紙を送ります
    Response: 未決, 囚徒, たる, 私,、, 即ち, 島浦, 英三, は,、, 其の, 旧友, に, して, 嘗かつて, は, 兄弟, より, 親しかりし, 土田, 検事, 殿, に,、, 此の, 手紙, を, 送ります
    Prompt: `
export const simplifySentencePrompt = `Task: simplify this japanese sentence into an easier one, n5 level, for beginners
    Prompt: 検事殿、あなたは私を無論思い出して居おらるる事でしょうね
    Response: 検事さん、あなたは私を覚えていますね
    Prompt: `

export const contextForText = (currentVers: any) => `この段落を説明してください
××地方裁判所検事土田八郎殿。 　一未決囚徒たる私、即ち島浦英三は、其の旧友にして嘗かつては兄弟より親しかりし土田検事殿に、此の手紙を送ります。 　検事殿、あなたは私を無論思い出して居おらるる事でしょうね。仮令たとい他の検事によって取り調べられ、次で予審判事の手に移されてしまった私であっても、あの、世間を騒がした美人殺しの犯人として伝えられ、新聞紙上に其の名を謳うたわれたに違いない以上、同じ裁判所に居るあなたが、今度の事件に就て私の名を見ない筈はなく、又聞かない筈もありません。

この段落で何が起こっているのかを5歳児に説明してください

5歳児には理解できないでしょう、もっと簡単に説明してください


この手紙では、囚人の島浦さんが友達の検事さんに手紙を送っています。島浦さんは以前に悪いことをしたとされて、新聞にも載ったんだよ。今度の事件でも、同じ裁判所にいる検事さんは島浦さんの名前を知っているはずだから、手紙を送って彼を思い出させようとしているんだ。

この段落を説明してください
${currentVers}

`

const gsdf = `


××Prosecutor Hachiro Tsuchida of the XX District Court。 　一未決囚徒たる私、即ち島浦英三は、其の旧友にして嘗かつては兄弟より親しかりし土田検事殿に、此の手紙を送ります。 　検事殿、あなたは私を無論思い出して居おらるる事でしょうね。仮令たとい他の検事によって取り調べられ、次で予審判事の手に移されてしまった私であっても、あの、世間を騒がした美人殺しの犯人として伝えられ、新聞紙上に其の名を謳うたわれたに違いない以上、同じ裁判所に居るあなたが、今度の事件に就て私の名を見ない筈はなく、又聞かない筈もありません。

To Prosecutor Hachiro Tsuchida of the XX District Court. I, Eizo Shimaura, an undecided prisoner, am sending this letter to you, who were once my close friend and even closer than a brother. Prosecutor, you must surely remember me. I was interrogated by other prosecutors and then handed over to the pretrial judge, I, who was undoubtedly portrayed as the perpetrator of the notorious beauty murder that caused a sensation in society and had my name sung in the newspapers, cannot be unseen by you, who are in the same court.`
