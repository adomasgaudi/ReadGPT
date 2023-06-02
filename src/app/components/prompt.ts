export const convertJPToENGPrompt = `Task: convert japanese into english
    Prompt: 悪魔
    Response: Devil
    Prompt: 悪魔の弟子
    Response: Devil's Disciple
    Prompt: 浜尾四郎
    Response: Shiro Hamao
    Prompt: 目次
    Response: Table of Contents
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