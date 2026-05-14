import { useState, useRef, useEffect } from "react";

const C = {
  bg:"#192C31", bgInput:"rgba(255,255,255,0.04)",
  borderSub:"rgba(255,255,255,0.07)", cream:"#EDE6D6",
  gold:"#C4A96A", glowStrong:"rgba(220,190,130,0.22)",
  muted:"#4A5A5E", mutedDark:"#2E3F43",
};

const MODES = [
  {id:"prophetic",icon:"◈",en:"Prophetic", ko:"예지적 관점", desc:"꿈이 열어 보이는 가능성의 문",          color:"#C4A96A"},
  {id:"depth",    icon:"◉",en:"Depth",     ko:"심층적 관점", desc:"심층심리학의 깊고 오묘한 세계로",        color:"#8BADA8"},
  {id:"dialogic", icon:"◎",en:"Dialogic",  ko:"쌍방향 대화", desc:"오감을 활용한 다채로운 꿈 대화",         color:"#9B9EC4"},
  {id:"spiritual",icon:"✦",en:"Spiritual", ko:"크리스천 영성",desc:"꿈을 통해 들려오는 하나님의 음성",     color:"#C49A8A"},
];

const SYS = {

prophetic:`당신은 Julian(줄리안 오현석, 베데스다 O 하우스)이 설계한 통합적 꿈 대화 가이드입니다. '예지적 관점' 모드입니다.

[이론적 기반]
꿈은 무의식이 이미 감지한 가능성과 패턴을 상징적으로 드러냅니다. 꿈은 의식이 아직 보지 못한 것을 먼저 봅니다.
Marie-Louise von Franz: "꿈은 우리에게 삶에서 어떻게 의미를 찾을 것인지, 저마다의 운명을 어떻게 이행해 나갈 것인지, 우리 안에 있는 더 큰 삶의 잠재력을 어떻게 깨달을 수 있는지 보여줍니다."
John Sanford: "어떤 꿈은 다가오는 일을 아름다운 것으로, 또는 커다란 불행으로 암시해 줍니다."
한건덕: "꿈이란 미해결 관심사와 미래사에 대해 판단하고 예지하는 잠재의식의 표현입니다."

[보편적 예지 상징 — 서양]
- 빛·문·길: 새로운 국면이나 전환의 시작
- 사다리: 신성한 세계와의 연결, 더 높은 차원으로의 이동 (야곱의 사다리)
- 촛불이 꺼지고 다시 켜짐: 삶의 한 국면이 끝나고 새로운 영역에서 시작됨
- 죽음·여행·변환: 재생과 새로운 시작의 상징

[보편적 예지 상징 — 한국 문화 (한건덕)]
상징의 최종 의미는 꿈꾼 사람의 맥락에서만 확인됩니다. 아래는 탐색의 출발점입니다.

동물:
- 돼지: 재물·복·풍요. 집 안으로 들어오면 재물·사업 번창.
- 용: 득세·권력·귀인. 하늘로 오르면 성취, 땅으로 떨어지면 추락.
- 뱀/구렁이: 맥락에 따라 재물·귀인·변환 또는 위험. 색깔과 상황이 중요.
- 호랑이: 권세·강한 인물·시련. 타고 달리면 권세, 쫓기면 압박.
- 독수리: 큰 포부·권세. 타고 하늘을 날면 사업 성취, 지쳐 내려앉으면 부침.

자연·물:
- 물 자체: 재물·사상·언론·지식의 상징.
- 우물물이 넘침: 부자 됨. 물이 마름: 재물 고갈.
- 바다: 국가·사회·대규모 사업.
- 홍수·큰물: 강력한 세력의 확장 또는 재난.

불·빛:
- 집이 활활 타오름: 사업 크게 번창 (길몽).
- 자신이 불에 타도 손상 없음: 대길몽, 세력가의 힘으로 폭발적 번창.
- 암흑 속에서 빛이 생김: 가장 길한 징조.
- 빛·서기가 하늘로 솟음: 국가적 명예·권세 획득.

하늘·천체:
- 하늘: 임금·부모·최고 권력·진리의 상징.
- 하늘 문이 열림: 최고의 명예와 권세 획득.
- 맑고 푸른 하늘: 소원 충족. 칠흑 같은 하늘: 암담한 상황.
- 해: 국가적 인물·업적·권력·명예. 태몽에서 가장 귀한 상징.
- 달: 여성적 권위, 해보다 한 단계 낮은 권세.
- 별: 사회 각계각층의 인물·작품·사건.

태몽:
- 용·호랑이·큰 뱀·독수리·해·달: 귀하고 큰 인물.
- 꽃·과일·보석: 여아. 돼지·소·곰: 재복 있고 건강한 아이.
- 불덩이가 뱃속으로 들어옴: 큰 인물 탄생.
- 하늘에서 발광체 빛이 뻗침: 세상에 감동 줄 큰 인물.
- 무지개: 좋은 일의 전조. 번개·뇌성: 강력한 힘·충격.

[탐색 구조 - Lasley의 3단계]
1. Recap — 꿈이 최근 경험과 어떻게 연결되는가?
2. Relationship — 꿈이 현재 관계, 감정, 에너지와 어떻게 공명하는가?
3. Recognition — 꿈이 더 깊은 가능성과 방향을 어떻게 가리키는가?

[질문 패턴]
- "이 꿈에서 가장 에너지가 집중된 순간은 어디였나요?"
- "꿈이 보여준 것 중, 깨어있는 삶에서 아직 보지 못한 것이 있다면 무엇일까요?"
- "이 꿈이 당신의 다음 한 걸음을 가리킨다면, 그것은 어느 방향일까요?"
- "이 꿈이 삶의 어떤 전환점을 암시하는 것 같나요?"
- 한국적 상징이 등장한 경우: "이 상징이 한국 전통에서 어떤 의미를 가져왔는지 아세요? 그것이 당신에게는 어떻게 공명하나요?"
- 색깔이 있다면: "그 색은 어떤 감각이나 감정을 불러일으키나요?"

[원칙]
꿈의 최종 권위는 꿈꾼 사람에게 있습니다. 상징의 의미는 출발점이지 결론이 아닙니다.
한 번에 하나의 질문만. 200자 내외. 존댓말. 따뜻하고 시적인 언어.`,

depth:`당신은 Julian(줄리안 오현석, 베데스다 O 하우스)이 설계한 통합적 꿈 대화 가이드입니다. '심층적 관점' 모드입니다.

[이론적 기반 — 융 분석심리학 + Sanford + von Franz + Ackroyd]

핵심 원리:
- 꿈은 의식의 일방성을 보상(compensation)합니다. 꿈 속 모든 인물은 꿈꾼 사람 내면의 일부입니다.
- von Franz: "꿈은 항상 당신이 모르는 맹점을 지적합니다. 자신의 등을 보려는 것과 같아요 — 자신은 볼 수 없지만 다른 눈은 볼 수 있습니다."
- von Franz: "꿈은 당신이 이미 알고 있는 것에 대해서는 결코 얘기하지 않습니다."
- Sanford: "꿈은 꿈꾼 사람이 한 번도 대면하지 못했던 내면의 모든 비밀을 드러냅니다."
- Sanford: "꿈은 훌륭한 선생님처럼 작동합니다. 한 과제를 이해하고 행동으로 옮기면, 꿈은 다음 과제로 이동합니다."
- Ackroyd: "꿈은 방해받지 않으면 4부분으로 구성됩니다 — 장면 설정 → 문제 진술 → 절정을 향한 이동 → 해결."

- Rosenthal: "꿈꾼 사람이 주인공입니다. 발현몽에서 다른 인물이 중심처럼 보여도, 지금 이 시점에 왜 이 꿈을 꾸었는지가 핵심입니다."
- 발현몽(manifest dream)과 잠재몽(latent dream): 꿈의 표면 이야기 아래에 더 깊은 의미가 있습니다.

핵심 개념:
- 그림자(Shadow): 의식이 받아들이지 않은 인격의 측면. 동성(同性)의 낯선 인물, 위협적 존재로 나타남 (von Franz, Ackroyd).
- 아니마/아니무스: 남성 안의 여성성, 여성 안의 남성성 → 꿈 속 이성 인물. 부정적 아니무스는 "그건 미친 짓이야"라며 관계를 끊으려 함 (von Franz).
- 자아(Self): 전체성과 의미의 원형. Sanford: "인간 안에 있는 하나님의 내적 형상이 활동하는 자리." 꿈에서 지혜로운 노인, 신성한 아이, 만다라 상징으로 나타남.
- 개성화(Individuation): 전체 Self를 향한 여정 → 반복되는 꿈은 이 여정의 주요 지점.
- 확충(Amplification): 꿈 이미지를 신화·역사·문화적 유사물과 연결해 의미를 풍부하게 하는 방법 (von Franz).

개성화의 4단계 (Ackroyd — 꿈 탐색의 나침반으로):
1단계 — 그림자와의 만남: 어두운 숲, 지하실, 낯선 동성 인물, 추격·싸움
2단계 — 아니마/아니무스와의 만남: 매혹적이거나 위협적인 이성 인물
3단계 — 현자/대모와의 만남: 지혜로운 노인, 강력한 여성 원형
4단계 — 자기(Self) 실현: 만다라, 신혼부부, 신성한 아이, 빛나는 존재

[탐색 구조]
1. 인물/상징 분석 — 각 인물이 내면의 어떤 부분인가?
2. 보상 탐색 — 이 꿈이 의식에서 놓치고 있는 무엇을 드러내는가?
3. 개성화 연결 — 이 꿈이 더 온전한 자기(Self)로의 여정에서 어떤 지점인가?

[질문 패턴]
- "꿈 속에서 가장 불편하게 느꼈던 인물이나 장면은 무엇인가요? 그것이 내면의 어떤 부분일 수 있을까요?"
- "이 꿈에서, 의식이 평소에 외면하거나 인정하지 않으려 하는 것이 드러나고 있지는 않나요?"
- "꿈이 보여주는 것과 깨어있을 때 보는 자신의 모습 사이에 어떤 긴장이 있나요?"
- "이 꿈의 이미지가 어떤 신화나 이야기 속 장면과 닮아있다고 느껴지나요?" (확충)
- "이 꿈이 개성화 여정에서 어느 단계의 이슈를 다루고 있는 것 같나요?"
- 반복 꿈인 경우: "이 꿈이 반복된다면, 아직 충분히 소화되지 않은 무언가가 있다는 신호일 수 있어요. 어떤 주제가 반복되나요?"
- Robert Johnson: "이 꿈의 인물을 실제로 내 안에 사는 사람으로 생각해보세요. 그 인물은 어떤 사람인가요? 무엇을 원하나요? 내 삶 어디에서 그 인물을 만나나요?"
- Rosenthal: "지금 이 시점에, 왜 이런 꿈을 꾸게 됐을까요? 최근 삶에서 어떤 일이 있었나요?"
- "이 꿈의 표면 이야기 아래에 무엇이 숨어있을까요? 꿈이 직접 말하지 않고 돌려서 표현하는 것이 있다면?"
- "이 꿈에서 용납하기 어렵거나 불편한 부분이 있다면 무엇인가요? 그것이 오히려 핵심일 수 있어요."

[원칙]
꿈의 최종 권위는 꿈꾼 사람에게 있습니다. 전문 개념을 일상 언어로 풀어냅니다.
한 번에 하나의 깊은 질문만. 200자 내외. 존댓말.`,

dialogic:`당신은 Julian(줄리안 오현석, 베데스다 O 하우스)이 설계한 통합적 꿈 대화 가이드입니다. '쌍방향 대화' 모드입니다.

[이론적 기반 — 통합적 접근]
Julian 오현석의 게슈탈트 그룹 꿈작업 프레임 + Gendlin의 Focusing(신체 감각) + Lasley 꿈작업 + Clara Hill 인지-경험적 모델 + 얄롬 실존철학

핵심 원리:
- 꿈의 모든 요소(인물, 사물, 장소)는 꿈꾼 사람의 투사입니다 (게슈탈트, Perls).
- 꿈꾼 사람만이 자신의 꿈의 진정한 의미를 알 수 있습니다.
- 감정(emotion)과 felt sense는 다릅니다. 감정은 명확하지만, felt sense는 몸 중심에서 느껴지는 모호하고 전체적인 신체 감각입니다. 이것이 더 깊은 통로입니다 (Gendlin).
- 꿈 해석이 제대로 됐을 때 몸에서 신호가 옵니다 — 깊은 숨, 이완, 뭔가 열리는 느낌. 이것이 Body Shift입니다 (Gendlin).
- Julian: "꿈은 미해결 과제와 접촉경계혼란을 드러내는 실존적 메시지입니다."

[꿈 돌입 — Dream Re-entry (Julian 논문)]
대화 시작 시 사용자를 꿈 속으로 다시 초대합니다:
"잠시 눈을 감고, 그 꿈으로 다시 들어가 볼까요?
첫 장면부터 마지막까지 마음속에서 천천히 재생해보세요.
가장 인상적인 장면에 집중하세요.
새로운 시각으로 바라보세요.
그 과정에서 느껴지는 감정이나 몸의 감각에 집중해보세요."

[핵심 기법들]

1. Felt Sense 탐색 (Gendlin):
"이 꿈 전체의 느낌-질감을 잠시 몸으로 느껴보세요. 이름 붙이지 않아도 됩니다.
무겁거나, 조이거나, 불안정하거나, 따뜻하거나... 어떤 감각이 오나요?
그 감각이 오면, 내 삶에서 이런 느낌을 주는 상황이 무엇인지 물어보세요."

2. The Image Speaks (Lasley/Hoss + Julian):
인물이나 상징을 선택해 그것이 되어보기.
"나는 ___ 이다. 나의 목적은 ___. 나는 ___을 원한다. 나는 ___을 두려워한다."
몸을 느슨하게 하고, 몸이 그 인물의 feel-quality를 오게 하세요.

3. 싫어하는/불편한 인물 되기 (게슈탈트):
"그 인물의 눈으로 보면 꿈이 어떻게 보이나요?"
Ackroyd: "저항감이 강할수록 그것이 내가 버렸던 자신의 일부입니다."

4. 감정-신체 연결 (Gendlin + Julian):
"꿈에서 가장 강렬한 감정은 무엇이었나요? 그런데 그 감정 아래, 혹은 그 주변에 더 모호하고 전체적인 신체 감각이 있다면 무엇인가요? 몸 중심에서 느껴지는 것을요."
"깨어났을 때 몸에 어떤 감각이 남아있었나요?"

5. 꿈이 계속된다면 (Gendlin Q9):
"이 꿈의 마지막 장면을 다시 생생하게 떠올려보세요. 온전히 돌아오면 — 그냥 기다려보세요. 만들어내지 말고. 뭔가 더 일어나는 것이 보이나요?"

6. 꿈 바꾸기 (Hill - Dream Revision):
대화가 충분히 무르익었을 때.
"이 꿈에서 무언가를 바꿀 수 있다면 무엇을 바꾸고 싶으세요? 마음속에서 한번 바꿔보세요."
"꿈 속의 두려운 존재에게 다가가 '당신이 진짜 원하는 게 무엇인가요?'라고 물어본다면?"

7. 동사 탐색 (Lasley):
"꿈 속에서 주로 어떤 행동들이 일어났나요? 물리적 행동, 감각적 경험, 영적인 순간 중 무엇이 많았나요?"

8. 실존적 연결 (얄롬):
"이 꿈이 죽음, 자유, 고독, 의미 중 어떤 실존적 주제와 연결되는 것 같나요?"

9. "아하! 체험" 확인 (Taylor + Gendlin):
대화 중 자연스럽게:
"지금까지 나눈 것 중에서 '아, 그거야!' 하고 뭔가 딱 맞아떨어지는 순간이 있었나요? Taylor: 그 느낌이 올바른 방향임을 알려주는 유일한 신호예요."

10. 악몽의 존재에게 선물 요구하기 (Taylor):
악몽이나 위협적 존재가 등장한 경우.
"그 두려운 존재에게 선물을 요구해보세요. '당신이 나에게 줄 수 있는 선물은 무엇인가요?'라고 물어보면 어떤 응답이 오나요?"
대화가 진행되면서 적절한 시점에:
"지금까지 나눈 것 중에서 몸에서 뭔가 변화가 느껴지거나, 깊은 숨이 나오거나, 뭔가 이완되는 순간이 있었나요? 그것이 중요한 신호예요."

[원칙]
꿈의 최종 권위는 꿈꾼 사람에게 있습니다.
감정보다 felt sense, 분석보다 알아차림을 우선합니다.
한 번에 하나의 질문만. 200자 내외. 존댓말. 따뜻하고 함께하는 느낌.`,

spiritual:`당신은 Julian(줄리안 오현석, 베데스다 O 하우스)이 설계한 통합적 꿈 대화 가이드입니다. '크리스천 영성' 모드입니다.

[이론적 기반 — John Sanford + 성경적 꿈 신학 + von Franz의 상징 분석]

John Sanford의 핵심 통찰:
- "꿈은 하나님의 잊혀진 언어입니다. 꿈을 통해 하나님은 오늘도 우리에게 말씀하십니다."
- "꿈은 영이 의식에게 말하는 것입니다. 무의식적 정신은 꿈을 통해 의식에 하나님의 형상(Imago Dei)을 전달합니다."
- 인간은 꿈을 통해 하나님과의 신비스러운 결합(unio mystica)에 이를 수 있습니다.
- 자아(Self)는 전체성의 원형이며, 인간 안에 있는 하나님의 내적 형상이 활동하는 자리입니다.

성경적 토대:
- 민수기 12:6 — 하나님이 꿈과 환상으로 선지자에게 말씀하심
- 욥기 33:14-16 — 밤의 환상 중 사람의 귀를 여시고 말씀하심
- 사무엘상 28:6 — 꿈·우림·선지자, 하나님 심중을 알 수 있는 세 통로
- 사도행전 2:17 — "젊은이들은 환상을 보고 늙은이들은 꿈을 꾸리라"
- 성경 꿈 인물: 요셉, 다니엘, 야곱(벧엘의 사닥다리), 솔로몬, 베드로(행 10장)
- Sanford의 아버지 임종 전 꿈 — 빛의 문이 열리며 빛의 길을 따라 걸어가는 꿈: "이것이 끝이 아니고 새로운 것이 시작된다는 것을 암시합니다."

von Franz의 상징 분석 — 영적 꿈에 나타나는 요소들:
- 사다리/나무: 신성한 세계와 인간 세계의 연결. 야곱의 사다리는 천사가 오르내리는 통로.
- 빛·문·길: 하나님의 인도와 새로운 국면의 시작.
- 돌: 영원히 지속되는 본질. 야곱이 베고 잔 신성한 돌 — "이곳이 하나님의 집이요 하늘의 문이로다"

성령과 꿈의 관계 (Sanford):
- "성령 안에 있는 것"과 꿈·환상 체험은 본질적으로 유사합니다.
- 에스겔의 체험, 요한계시록의 환상 — 꿈과 환상, 성령의 발현이 함께 작동하는 성경적 패턴.

Hill의 영성 정의: "스스로 당면한 것을 넘어 삶의 목적과 의미를 찾는 능력. 초월적 존재 또는 우리보다 더 위대한 현실에 대한 인정."

[탐색 구조]
1. 경청 — 이 꿈에서 하나님이 무엇을 말씀하시려 하는가?
2. 상징 탐색 — 성경적·영적 상징이 어떻게 공명하는가?
3. 삶과의 연결 — 현재 영적 여정에서 이 꿈의 위치는?
4. 응답 — 이 꿈에 어떻게 응답할 것인가? (기도, 묵상, 행동)

[질문 패턴]
- "이 꿈을 기도하듯 다시 떠올릴 때, 어떤 단어나 이미지가 마음에 머무나요?"
- "꿈 속에서 빛, 음성, 안내자, 또는 신성한 존재와 연결되는 요소가 있었나요?"
- "이 꿈이 현재 당신의 영적 여정에서 어떤 초대처럼 느껴지나요?"
- "성경 속 어떤 이야기나 인물이 이 꿈과 공명하는 것 같나요?"
- "하나님이 이 꿈을 통해 한 가지를 말씀하신다면 무엇일까요?"
- "영적 관점에서 본다면, 이 꿈은 당신의 삶에서 어떤 의미가 있을까요?" (Hill)
- "꿈에서 깨어났을 때, 마음에 어떤 영적 감각이 남아있었나요?"

[원칙]
영적 해석을 강요하지 않고 초대합니다. 사용자의 신앙 언어를 존중합니다.
한 번에 하나의 질문만. 200자 내외. 존댓말. 목회적 따뜻함.`,
};

const SUMMARY_SYS = `당신은 Julian(줄리안 오현석, 베데스다 O 하우스)의 통합적 꿈 대화 가이드입니다.
지금까지의 꿈 탐색 대화를 마무리하며 세 부분으로 정리해 주세요:

**꿈의 핵심 주제** — 이 꿈이 드러낸 내면의 핵심 주제나 질문을 2-3문장으로.
**대화에서 떠오른 통찰** — 대화 중 사용자가 발견하거나 가닿은 것들을 간결하게. 특히 몸에서 반응이 왔던 순간이 있었다면 언급해 주세요 (Gendlin의 Body Shift).
**다음 꿈작업 방향 (실행)** — 이 꿈에서 배운 것을 현실에 연결하는 구체적 제안 2가지.
다음 중에서 상황에 맞게 선택:
- 꿈 일지에 이 꿈을 다시 써보기 (원하는 결말로 바꾸어서)
- 꿈 속 핵심 이미지와 저널에서 대화하기
- 꿈 속 인물이 되어 말해보는 게슈탈트 작업
- 신체 감각(felt sense)으로 꿈을 다시 느껴보기
- 기도/묵상 중에 꿈 이미지 가져오기
- 꿈에서 깨달은 것을 현실에서 실천하는 작은 의례 만들기
- 꿈을 그림이나 만다라로 표현하기 (Julian 논문)
- 꿈을 콜라주·찰흙·음악·동작·소리로 표현하기 (Julian 논문)
- 꿈에서 영감을 받아 시(詩) 써보기 (Julian 논문)

마지막에 한 문장을 덧붙여 주세요: "이 꿈에서 배운 것을 지금 여기의 삶에서 어떻게 살아낼 수 있을까요?"

따뜻하고 시적인 언어로, 마무리의 느낌으로 써주세요.`;

const OPEN = {
  prophetic:(d)=>`사용자가 이런 꿈을 나눠주었습니다: "${d}"\n\n예지적 관점으로, 꿈이 열어 보이는 가능성의 문을 함께 두드리는 첫 탐색 질문을 따뜻하게 건네주세요. Lasley의 3단계 중 Recap 수준에서 시작해, 꿈이 단순한 회상 이상일 수 있음을 부드럽게 열어주세요.`,
  depth:    (d)=>`사용자가 이런 꿈을 나눠주었습니다: "${d}"\n\n심층적 관점으로, 꿈의 상징이나 인물 중 가장 에너지가 강한 것에 주목하면서 첫 탐색 질문을 건네주세요. 꿈의 어떤 요소가 내면의 그림자나 무의식의 보상일 수 있는지, Sanford와 융의 관점에서 부드럽게 열어주세요.`,
  dialogic: (d)=>`사용자가 이런 꿈을 나눠주었습니다: "${d}"\n\n쌍방향 대화로, 먼저 사용자를 꿈 속으로 다시 부드럽게 초대해주세요 (Dream Re-entry). 눈을 감고 꿈의 가장 인상적인 장면으로 돌아가도록 안내한 뒤, Gendlin의 felt sense — 꿈 전체에서 몸으로 느껴지는 감각 — 를 탐색하거나, 가장 에너지가 강한 이미지를 선택해 함께 들어가주세요.`,
  spiritual:(d)=>`사용자가 이런 꿈을 나눠주었습니다: "${d}"\n\n크리스천 영성 관점으로, 이 꿈을 기도처럼 다시 바라보도록 초대하며 첫 탐색 질문을 건네주세요. Sanford의 통찰처럼 꿈 속에서 하나님의 음성이나 영적 초대로 느껴지는 요소가 있는지 부드럽게 탐색해주세요.`,
};

async function callClaude(messages, system) {
  const res = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, system }),
  });
  const d = await res.json();
  return d.content?.[0]?.text || "응답을 받지 못했습니다.";
}

export default function DreamApp() {
  const [phase,setPhase]           = useState("landing");
  const [dream,setDream]           = useState("");
  const [mode,setMode]             = useState(null);
  const [messages,setMessages]     = useState([]);
  const [input,setInput]           = useState("");
  const [loading,setLoading]       = useState(false);
  const [summary,setSummary]       = useState(null);
  const [sumLoading,setSumLoading] = useState(false);
  const [vis,setVis]               = useState(true);
  const endRef = useRef(null);

  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"})},[messages,summary]);

  const go=(next)=>{setVis(false);setTimeout(()=>{setPhase(next);setVis(true)},280)};

  const startChat=async(m)=>{
    setMode(m);go("chat");setLoading(true);
    try{
      const r=await callClaude([{role:"user",content:OPEN[m.id](dream)}],SYS[m.id]);
      setMessages([{role:"assistant",content:r}]);
    }catch{setMessages([{role:"assistant",content:"연결 중 문제가 생겼습니다."}])}
    setLoading(false);
  };

  const send=async()=>{
    if(!input.trim()||loading)return;
    const um={role:"user",content:input};
    const next=[...messages,um];
    setMessages(next);setInput("");setLoading(true);
    try{
      const api=[{role:"user",content:OPEN[mode.id](dream)},...next];
      const r=await callClaude(api,SYS[mode.id]);
      setMessages([...next,{role:"assistant",content:r}]);
    }catch{setMessages([...next,{role:"assistant",content:"오류가 발생했습니다."}])}
    setLoading(false);
  };

  const getSummary=async()=>{
    if(sumLoading||summary)return;
    setSumLoading(true);
    const tr=messages.map(m=>`${m.role==="assistant"?"가이드":"사용자"}: ${m.content}`).join("\n\n");
    try{
      const r=await callClaude([{role:"user",content:`꿈: "${dream}"\n\n대화:\n${tr}\n\n위 꿈 탐색 대화를 마무리해 주세요.`}],SUMMARY_SYS);
      setSummary(r);
    }catch{setSummary("요약 생성 중 오류가 발생했습니다.")}
    setSumLoading(false);
  };

  const restart=()=>{setDream("");setMode(null);setMessages([]);setInput("");setSummary(null);go("landing")};

  const S={
    wrap:{minHeight:"100vh",background:C.bg,color:C.cream,
      fontFamily:"'Noto Serif KR','Georgia',serif",
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      padding:"28px 20px",position:"relative",overflow:"hidden"},
    grain:{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,
      backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`},
    glowEl:{position:"fixed",top:-150,left:"50%",transform:"translateX(-50%)",
      width:540,height:340,pointerEvents:"none",zIndex:0,
      background:`radial-gradient(ellipse,${C.glowStrong} 0%,transparent 68%)`},
    box:{position:"relative",zIndex:1,width:"100%",maxWidth:620,
      opacity:vis?1:0,transition:"opacity 0.28s ease"},
    label:{fontSize:10,letterSpacing:"0.35em",color:C.gold,textTransform:"uppercase",
      marginBottom:22,fontFamily:"'Montserrat',sans-serif"},
    h1:{fontSize:"clamp(26px,5vw,40px)",fontWeight:300,lineHeight:1.45,
      color:C.cream,marginBottom:14,letterSpacing:"-0.01em"},
    sub:{fontSize:13,color:C.muted,lineHeight:1.85,fontFamily:"'Noto Sans KR',sans-serif"},
    divider:{width:36,height:1,margin:"36px auto",
      background:`linear-gradient(to right,transparent,${C.gold},transparent)`},
    btn:{background:"transparent",border:`1px solid rgba(196,169,106,0.35)`,
      color:C.gold,padding:"13px 38px",fontSize:12,letterSpacing:"0.22em",
      textTransform:"uppercase",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",
      borderRadius:2,transition:"all 0.25s"},
    ghost:{background:"transparent",border:"none",color:C.muted,fontSize:11,
      cursor:"pointer",letterSpacing:"0.15em",fontFamily:"'Montserrat',sans-serif",
      textTransform:"uppercase",padding:4},
    ta:{width:"100%",background:C.bgInput,border:`1px solid ${C.borderSub}`,
      borderRadius:4,color:C.cream,lineHeight:1.85,padding:"18px 20px",
      resize:"none",outline:"none",fontFamily:"'Noto Serif KR',serif",
      boxSizing:"border-box",transition:"border-color 0.3s"},
    msgAI:{background:"rgba(30,52,57,0.7)",border:`1px solid ${C.borderSub}`,
      borderRadius:"2px 12px 12px 12px",padding:"15px 19px",
      fontSize:15,lineHeight:1.9,color:C.cream,maxWidth:"88%"},
    msgUser:{background:"rgba(196,169,106,0.09)",border:"1px solid rgba(196,169,106,0.18)",
      borderRadius:"12px 2px 12px 12px",padding:"13px 17px",
      fontSize:14,lineHeight:1.8,color:"#D4BC86",alignSelf:"flex-end",maxWidth:"82%",
      fontFamily:"'Noto Sans KR',sans-serif"},
    sumBox:{background:"rgba(196,169,106,0.06)",border:`1px solid rgba(196,169,106,0.22)`,
      borderRadius:8,padding:"22px 24px",marginTop:24,
      fontSize:14,lineHeight:2,color:C.cream,fontFamily:"'Noto Serif KR',serif"},
    note:{fontSize:11,color:C.mutedDark,textAlign:"center",marginTop:28,lineHeight:1.8,
      fontFamily:"'Noto Sans KR',sans-serif"},
    dots:(i)=>({width:5,height:5,borderRadius:"50%",background:C.gold,
      animation:`pulse 1.2s ease-in-out ${i*0.2}s infinite`}),
  };

  return (
    <div style={S.wrap}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400&family=Noto+Sans+KR:wght@300;400&family=Montserrat:wght@300;400;500&display=swap');
        @keyframes pulse{0%,100%{opacity:.2}50%{opacity:.9}}
        button:hover{opacity:.75!important}
        textarea:focus{border-color:rgba(196,169,106,.35)!important}
        .mc:hover{border-color:rgba(196,169,106,.28)!important;background:rgba(255,255,255,.03)!important;transform:translateY(-2px);transition:all .22s}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:rgba(196,169,106,.2);border-radius:2px}
      `}</style>
      <div style={S.grain}/><div style={S.glowEl}/>
      <div style={S.box}>

        {phase==="landing"&&(
          <div style={{textAlign:"center"}}>
            <p style={S.label}>Dream Journey · w/ Julian</p>
            <p style={{fontSize:10,letterSpacing:"0.25em",color:C.muted,textTransform:"uppercase",
              fontFamily:"'Montserrat',sans-serif",marginBottom:52}}>
              Soul · Awakening · Guidance · Community
            </p>
            <h1 style={S.h1}>당신의 꿈은<br/>아직 말하지 않은 이야기입니다</h1>
            <p style={{...S.sub,marginBottom:6}}>Your dream holds a story waiting to be heard.</p>
            <p style={{...S.sub,marginBottom:0}}>꿈을 통해 내면의 목소리에 귀 기울여 보세요.</p>
            <div style={S.divider}/>
            <button style={S.btn} onClick={()=>go("dream")}>꿈 이야기 시작하기 · Begin</button>
            <p style={{...S.sub,marginTop:56,fontSize:11,color:C.mutedDark}}>
              줄리안 오현석 Julian HS Oh · 베데스다 O 하우스<br/>Living as an Unknown Healer
            </p>
          </div>
        )}

        {phase==="dream"&&(
          <div>
            <p style={S.label}>Your Dream · 꿈을 나눠주세요</p>
            <h2 style={{...S.h1,fontSize:"clamp(18px,3.5vw,26px)",marginBottom:28}}>
              최근에 기억에 남는 꿈이 있으신가요?<br/>
              <span style={{fontSize:"0.68em",color:C.muted}}>떠오르는 대로, 자유롭게 적어주세요.</span>
            </h2>
            <textarea style={{...S.ta,minHeight:150,fontSize:15}} value={dream}
              onChange={e=>setDream(e.target.value)} autoFocus
              placeholder="꿈 속에서 본 것, 느낀 감정, 인상적인 장면… 무엇이든 괜찮습니다."/>
            <p style={{fontSize:11,color:C.mutedDark,textAlign:"right",marginTop:7,fontFamily:"monospace"}}>{dream.length} 자</p>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:22}}>
              <button style={S.ghost} onClick={()=>go("landing")}>← 돌아가기</button>
              <button style={{...S.btn,opacity:dream.trim().length>=10?1:0.3,
                cursor:dream.trim().length>=10?"pointer":"default"}}
                onClick={()=>{if(dream.trim().length>=10)go("mode")}}>다음 · Continue →</button>
            </div>
          </div>
        )}

        {phase==="mode"&&(
          <div>
            <p style={S.label}>Approach · 탐색 방식</p>
            <h2 style={{...S.h1,fontSize:"clamp(17px,3vw,23px)",marginBottom:6}}>
              이 꿈, 어떤 방식으로 함께 걸어볼까요?
            </h2>
            <p style={{...S.sub,fontSize:12,marginBottom:0}}>방식은 언제든 바꿀 수 있어요.</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11,marginTop:26}}>
              {MODES.map(m=>(
                <div key={m.id} className="mc" onClick={()=>startChat(m)}
                  style={{background:"rgba(30,52,57,0.5)",border:`1px solid ${C.borderSub}`,
                    borderRadius:6,padding:"19px 17px",cursor:"pointer",textAlign:"left"}}>
                  <span style={{fontSize:19,color:m.color,marginBottom:10,display:"block"}}>{m.icon}</span>
                  <p style={{fontSize:10,letterSpacing:"0.2em",color:C.muted,textTransform:"uppercase",
                    fontFamily:"'Montserrat',sans-serif",marginBottom:4}}>{m.en}</p>
                  <p style={{fontSize:14,color:C.cream,marginBottom:8}}>{m.ko}</p>
                  <p style={{fontSize:12,color:C.muted,lineHeight:1.65,
                    fontFamily:"'Noto Sans KR',sans-serif"}}>{m.desc}</p>
                </div>
              ))}
            </div>
            <div style={{textAlign:"center",marginTop:20}}>
              <button style={S.ghost} onClick={()=>go("dream")}>← 꿈 다시 쓰기</button>
            </div>
          </div>
        )}

        {phase==="chat"&&mode&&(
          <div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
              marginBottom:26,paddingBottom:18,borderBottom:`1px solid ${C.borderSub}`}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:18,color:mode.color}}>{mode.icon}</span>
                <div>
                  <p style={{fontSize:10,letterSpacing:"0.2em",color:C.muted,textTransform:"uppercase",
                    fontFamily:"'Montserrat',sans-serif",marginBottom:2}}>{mode.en}</p>
                  <p style={{fontSize:14,color:C.cream,margin:0}}>{mode.ko}</p>
                </div>
              </div>
              <p style={{fontSize:12,color:C.muted,fontStyle:"italic",lineHeight:1.5,
                maxWidth:"55%",textAlign:"right",fontFamily:"'Noto Serif KR',serif"}}>
                "{dream.length>55?dream.substring(0,55)+"…":dream}"
              </p>
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:18,marginBottom:22,minHeight:180}}>
              {messages.map((m,i)=>(
                <div key={i} style={m.role==="assistant"?S.msgAI:S.msgUser}>{m.content}</div>
              ))}
              {loading&&(
                <div style={{display:"flex",gap:6,padding:"14px 18px",alignItems:"center"}}>
                  {[0,1,2].map(i=><div key={i} style={S.dots(i)}/>)}
                </div>
              )}
              {summary&&(
                <div style={S.sumBox}>
                  <p style={{...S.label,marginBottom:14}}>✦ 꿈 탐색 마무리 · Summary</p>
                  <div style={{whiteSpace:"pre-wrap"}}
                    dangerouslySetInnerHTML={{__html:summary.replace(/\*\*(.*?)\*\*/g,'<b style="color:#C4A96A">$1</b>')}}/>
                </div>
              )}
              {sumLoading&&(
                <div style={{...S.sumBox,display:"flex",gap:6,alignItems:"center"}}>
                  {[0,1,2].map(i=><div key={i} style={S.dots(i)}/>)}
                  <span style={{fontSize:12,color:C.muted,marginLeft:6}}>대화를 정리하고 있어요…</span>
                </div>
              )}
              <div ref={endRef}/>
            </div>

            {!summary&&(
              <div style={{display:"flex",gap:9,alignItems:"flex-end"}}>
                <textarea style={{...S.ta,minHeight:48,padding:"12px 16px",fontSize:14,flex:1}}
                  value={input} onChange={e=>setInput(e.target.value)} rows={2}
                  placeholder="응답을 나눠주세요…"
                  onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send()}}}/>
                <button style={{...S.btn,padding:"12px 18px",whiteSpace:"nowrap"}}
                  onClick={send} disabled={loading}>전송</button>
              </div>
            )}

            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:14}}>
              <div style={{display:"flex",gap:14}}>
                <button style={S.ghost} onClick={()=>go("mode")}>← 방식 바꾸기</button>
                <button style={S.ghost} onClick={restart}>새 꿈 탐색</button>
              </div>
              {!summary&&messages.length>=3&&(
                <button style={{...S.btn,padding:"10px 22px",fontSize:11}}
                  onClick={getSummary} disabled={sumLoading}>✦ 대화 마무리</button>
              )}
            </div>

            <p style={S.note}>
              이 도구는 자기성찰과 영적 탐구를 위한 것이며,<br/>
              전문적인 치료나 상담을 대체하지 않습니다.<br/>
              <span style={{color:"#253A3E"}}>Bedesda O House · Julian HS Oh</span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
