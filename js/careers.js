/* ===========================
   careers.js - 성격 유형별 직업 추천 및 분석
   =========================== */

const careersData = {
  INTJ: {
    tagline: '전략적 사고로 미래를 이끄는 리더',
    strengths: ['전략적 사고', '목표 설정', '분석력', '의사결정'],
    advice: 'INTJ는 독립적이고 전략적인 사고를 통해 복잡한 문제를 해결하는 능력이 뛰어납니다. 개인의 능력과 책임이 인정되는 환경에서 최고의 성과를 낼 수 있습니다.',
    jobs: [
      { name: '전략 컨설턴트', salary: '5,000만~1억', growth: 9, fit: 95, desc: '기업의 장기 전략 수립 및 비즈니스 최적화' },
      { name: '데이터 과학자', salary: '4,500만~9,000만', growth: 10, fit: 93, desc: '빅데이터 분석으로 인사이트 도출' },
      { name: '소프트웨어 아키텍트', salary: '5,000만~1억', growth: 9, fit: 92, desc: '대규모 시스템 설계 및 구조화' },
      { name: '경영 분석가', salary: '4,000만~8,000만', growth: 8, fit: 90, desc: '비즈니스 프로세스 개선 및 최적화' },
      { name: '제품 전략가', salary: '5,000만~1억', growth: 9, fit: 91, desc: '제품 로드맵 및 시장 전략 수립' },
      { name: '인공지능 엔지니어', salary: '6,000만~1억5,000만', growth: 10, fit: 94, desc: 'AI/ML 모델 개발 및 최적화' }
    ]
  },

  INTP: {
    tagline: '논리적 분석으로 세상의 원리를 탐구하는 사람',
    strengths: ['논리적 사고', '문제 해결', '창의적 아이디어', '기술 이해'],
    advice: 'INTP는 호기심이 많고 복잡한 개념을 깊이 있게 분석하는 능력이 탁월합니다. 지적 도전과 자율성이 있는 업무에서 최고의 성능을 발휘합니다.',
    jobs: [
      { name: '연구원', salary: '3,500만~7,000만', growth: 8, fit: 95, desc: '과학적 이론과 현상 연구' },
      { name: '소프트웨어 개발자', salary: '4,000만~8,500만', growth: 9, fit: 94, desc: '복잡한 알고리즘 개발 및 시스템 구축' },
      { name: '데이터 엔지니어', salary: '4,500만~9,000만', growth: 9, fit: 92, desc: '대규모 데이터 처리 시스템 개발' },
      { name: '사이버보안 전문가', salary: '4,500만~8,500만', growth: 10, fit: 93, desc: '시스템 취약점 분석 및 보안 강화' },
      { name: '기술 리더', salary: '5,000만~1억', growth: 8, fit: 89, desc: '기술팀 리더십 및 아키텍처 결정' },
      { name: '수학자/통계학자', salary: '3,500만~7,000만', growth: 8, fit: 92, desc: '수학적 모델링 및 통계 분석' }
    ]
  },

  ENTJ: {
    tagline: '목표 달성을 위해 모든 것을 조직하는 리더',
    strengths: ['리더십', '전략 수립', '실행력', '의사결정'],
    advice: 'ENTJ는 카리스마 있는 리더십과 장기적 비전으로 조직을 이끕니다. 권한과 책임이 명확한 위치에서 뛰어난 성과를 낼 수 있습니다.',
    jobs: [
      { name: '최고경영자 (CEO)', salary: '1억~5억+', growth: 9, fit: 98, desc: '기업의 전략 수립 및 경영' },
      { name: '사업부장', salary: '8,000만~2억', growth: 9, fit: 97, desc: '사업부 목표 달성 및 팀 이끌기' },
      { name: '프로젝트 매니저', salary: '5,000만~1억', growth: 8, fit: 95, desc: '대규모 프로젝트 계획 및 실행' },
      { name: '벤처 창업가', salary: '변동적 (높음)', growth: 10, fit: 96, desc: '새로운 비즈니스 창출 및 성장' },
      { name: '전략 이사', salary: '7,000만~1억5,000만', growth: 9, fit: 94, desc: '장기 전략 수립 및 실행' },
      { name: '금융 임원', salary: '8,000만~2억', growth: 9, fit: 92, desc: '금융 기관의 운영 및 전략' }
    ]
  },

  ENTP: {
    tagline: '새로운 가능성을 끊임없이 탐구하는 혁신가',
    strengths: ['창의성', '문제 해결', '적응력', '설득력'],
    advice: 'ENTP는 다양한 아이디어와 새로운 가능성에 흥미를 느낍니다. 변화와 도전이 있는 환경에서 최고의 성능을 보입니다.',
    jobs: [
      { name: '스타트업 창업가', salary: '변동적 (높음)', growth: 10, fit: 97, desc: '혁신적인 비즈니스 모델 개발' },
      { name: '전략 컨설턴트', salary: '5,000만~1억', growth: 9, fit: 94, desc: '새로운 시장 기회 발굴 및 전략 수립' },
      { name: '마케팅 이사', salary: '5,000만~1억', growth: 9, fit: 93, desc: '창의적 캠페인 기획 및 집행' },
      { name: '기술 혁신 담당자', salary: '4,500만~8,500만', growth: 10, fit: 95, desc: '신기술 도입 및 프로세스 혁신' },
      { name: '사업개발 담당자', salary: '4,000만~8,000만', growth: 9, fit: 92, desc: '새로운 사업 기회 발굴 및 협력' },
      { name: '프로덕트 매니저', salary: '5,000만~9,000만', growth: 9, fit: 91, desc: '혁신적 제품 기획 및 출시' }
    ]
  },

  INFJ: {
    tagline: '통찰력으로 타인과 사회를 돕는 사람',
    strengths: ['공감 능력', '통찰력', '강한 신념', '소통 능력'],
    advice: 'INFJ는 깊은 통찰력과 타인에 대한 이해로 의미 있는 영향을 미칩니다. 가치 있는 목표와 진정성 있는 관계가 있는 업무에서 최고의 성과를 냅니다.',
    jobs: [
      { name: '심리 상담사', salary: '2,500만~5,000만', growth: 7, fit: 98, desc: '개인의 심리적 성장 및 치유 지원' },
      { name: '인사담당자', salary: '3,500만~7,000만', growth: 8, fit: 96, desc: '조직 문화 발전 및 인재 육성' },
      { name: '교육자', salary: '3,500만~6,500만', growth: 8, fit: 95, desc: '학생의 성장과 발전 지원' },
      { name: '사회복지사', salary: '2,500만~4,500만', growth: 7, fit: 97, desc: '취약 계층 지원 및 사회 변화' },
      { name: '코치/멘토', salary: '3,000만~6,000만', growth: 8, fit: 96, desc: '개인의 성장과 목표 달성 지원' },
      { name: '윤리 담당자', salary: '3,500만~6,500만', growth: 8, fit: 94, desc: '조직의 윤리 기준 수립 및 준수' }
    ]
  },

  INFP: {
    tagline: '열정으로 세상을 더 아름답게 만드는 창작가',
    strengths: ['창의성', '공감', '진정성', '이상주의'],
    advice: 'INFP는 깊은 가치관과 창의성으로 의미 있는 작업을 추구합니다. 자신의 신념을 표현할 수 있는 환경에서 최고의 성능을 발휘합니다.',
    jobs: [
      { name: '작가/소설가', salary: '2,000만~5,000만', growth: 7, fit: 97, desc: '창의적 글쓰기 및 세상의 이야기 표현' },
      { name: '그래픽 디자이너', salary: '3,000만~5,500만', growth: 8, fit: 96, desc: '시각적 표현으로 감정과 메시지 전달' },
      { name: '영화/영상 감독', salary: '3,000만~6,000만', growth: 9, fit: 95, desc: '이야기를 통한 감정 표현' },
      { name: '사회 운동가', salary: '2,500만~4,500만', growth: 8, fit: 98, desc: '사회 정의 실현 및 변화 추구' },
      { name: '콘텐츠 크리에이터', salary: '2,000만~5,000만+', growth: 10, fit: 94, desc: '창의적 콘텐츠 기획 및 제작' },
      { name: '브랜드 스토리텔러', salary: '3,500만~6,000만', growth: 8, fit: 93, desc: '브랜드 이야기와 가치 전달' }
    ]
  },

  ENFJ: {
    tagline: '따뜻한 리더십으로 사람들을 인도하는 사람',
    strengths: ['리더십', '공감', '소통', '조직화'],
    advice: 'ENFJ는 사람을 중심으로 생각하는 카리스마 있는 리더입니다. 팀을 이끌고 사람들의 성장을 도울 수 있는 위치에서 뛰어난 능력을 발휘합니다.',
    jobs: [
      { name: '경영진', salary: '6,000만~1억5,000만', growth: 9, fit: 96, desc: '조직 리더십 및 인재 육성' },
      { name: '교육 관리자', salary: '4,000만~7,000만', growth: 8, fit: 97, desc: '교육 기관 운영 및 교사 지원' },
      { name: '조직개발 컨설턴트', salary: '4,500만~8,000만', growth: 9, fit: 95, desc: '조직 문화 및 역량 개발' },
      { name: '세일스 리더', salary: '4,500만~8,500만', growth: 9, fit: 94, desc: '영업팀 이끌기 및 목표 달성' },
      { name: '공공 관리자', salary: '4,000만~7,000만', growth: 8, fit: 93, desc: '공공 기관 운영 및 정책 집행' },
      { name: '갭 이어 프로그램 디렉터', salary: '3,500만~6,500만', growth: 8, fit: 96, desc: '청년 교육 및 성장 프로그램 운영' }
    ]
  },

  ENFP: {
    tagline: '열정과 즐거움으로 모든 것을 매력적으로 만드는 사람',
    strengths: ['창의성', '열정', '소통', '적응력'],
    advice: 'ENFP는 긍정적인 에너지와 창의성으로 사람들을 영감으로 가득하게 합니다. 변화와 다양한 사람들과의 상호작용이 있는 환경에서 최고의 성과를 냅니다.',
    jobs: [
      { name: '이벤트 플래너', salary: '3,000만~5,500만', growth: 8, fit: 97, desc: '행사 기획 및 진행으로 즐거움 창출' },
      { name: '캠페인 크리에이티브', salary: '4,000만~7,000만', growth: 9, fit: 96, desc: '광고 캠페인 아이디어 개발' },
      { name: '로비스트/홍보담당자', salary: '3,500만~6,500만', growth: 8, fit: 95, desc: '브랜드/기관 이미지 관리' },
      { name: '채용담당자', salary: '3,000만~6,000만', growth: 8, fit: 94, desc: '인재 발굴 및 조직 성장 지원' },
      { name: '엔터테인먼트 프로듀서', salary: '3,500만~7,000만', growth: 9, fit: 96, desc: '엔터테인먼트 콘텐츠 기획 및 제작' },
      { name: '라이프 코치', salary: '3,000만~6,000만', growth: 8, fit: 95, desc: '개인의 꿈과 목표 실현 지원' }
    ]
  },

  ISTJ: {
    tagline: '책임감 있게 일을 정확하게 처리하는 신뢰의 사람',
    strengths: ['책임감', '성실함', '체계성', '신뢰성'],
    advice: 'ISTJ는 책임감 있고 체계적이며 신뢰할 수 있는 업무 처리로 조직의 기초를 다집니다. 명확한 역할과 기준이 있는 환경에서 최고의 성과를 냅니다.',
    jobs: [
      { name: '회계사', salary: '4,000만~7,500만', growth: 8, fit: 97, desc: '재무 관리 및 감시' },
      { name: '감사담당자', salary: '3,500만~7,000만', growth: 8, fit: 96, desc: '조직의 재정 및 운영 감시' },
      { name: '프로젝트 관리자', salary: '4,500만~8,000만', growth: 8, fit: 95, desc: '프로젝트 계획 및 체계적 실행' },
      { name: '행정 관리자', salary: '3,500만~6,500만', growth: 7, fit: 94, desc: '조직 운영 및 업무 효율화' },
      { name: '공무원', salary: '3,500만~6,500만', growth: 7, fit: 93, desc: '공공 서비스 제공 및 정책 집행' },
      { name: '공급망 관리자', salary: '4,000만~7,500만', growth: 8, fit: 96, desc: '물류 및 공급망 최적화' }
    ]
  },

  ISFJ: {
    tagline: '따뜻한 마음으로 주변을 돌보는 배려의 사람',
    strengths: ['배려', '헌신', '체계성', '신뢰성'],
    advice: 'ISFJ는 따뜻한 감정과 헌신으로 타인을 돕는 일에 뛰어납니다. 감사 받을 수 있는 업무와 안정적인 환경에서 최고의 성과를 냅니다.',
    jobs: [
      { name: '간호사', salary: '3,500만~6,000만', growth: 8, fit: 98, desc: '환자 돌봄 및 건강 관리' },
      { name: '초등학교 교사', salary: '3,500만~5,500만', growth: 7, fit: 97, desc: '아이들의 성장과 발전 지원' },
      { name: '상담사', salary: '2,500만~5,000만', growth: 8, fit: 96, desc: '개인의 정서적 지원' },
      { name: '행정보조', salary: '2,500만~4,500만', growth: 6, fit: 95, desc: '조직 운영 지원 및 효율화' },
      { name: '고객 서비스 매니저', salary: '3,000만~5,500만', growth: 7, fit: 94, desc: '고객 만족도 향상' },
      { name: '의료 사회복지사', salary: '3,000만~5,500만', growth: 8, fit: 97, desc: '환자 및 가족 지원' }
    ]
  },

  ESTJ: {
    tagline: '질서를 잡고 효율을 추구하는 리더',
    strengths: ['리더십', '조직력', '결단력', '책임감'],
    advice: 'ESTJ는 강한 조직력과 리더십으로 팀을 효율적으로 이끕니다. 명확한 목표와 체계화된 환경에서 최고의 성능을 발휘합니다.',
    jobs: [
      { name: '부장/임원', salary: '6,000만~1억5,000만', growth: 9, fit: 97, desc: '조직 리더십 및 운영' },
      { name: '품질 보증 매니저', salary: '4,500만~8,000만', growth: 8, fit: 96, desc: '제품 품질 관리 및 표준화' },
      { name: '제조 공장장', salary: '5,000만~9,000만', growth: 8, fit: 95, desc: '생산 운영 최적화' },
      { name: '경찰/군인', salary: '3,500만~6,500만', growth: 8, fit: 96, desc: '질서 유지 및 안전 관리' },
      { name: '은행 지점장', salary: '5,000만~1억', growth: 8, fit: 94, desc: '금융 기관 운영 및 성과 관리' },
      { name: '계약 관리자', salary: '4,000만~7,500만', growth: 8, fit: 93, desc: '계약 체결 및 관리' }
    ]
  },

  ESFJ: {
    tagline: '따뜻함으로 사람들을 하나로 모으는 리더',
    strengths: ['사교성', '배려', '협력', '조직력'],
    advice: 'ESFJ는 따뜻한 태도와 사교성으로 팀의 화합을 이끕니다. 사람과의 관계가 중요한 환경에서 최고의 성과를 냅니다.',
    jobs: [
      { name: 'HR 담당자', salary: '3,500만~6,500만', growth: 8, fit: 97, desc: '인력 관리 및 조직문화 조성' },
      { name: '이벤트 코디네이터', salary: '3,000만~5,500만', growth: 8, fit: 96, desc: '행사 기획 및 진행' },
      { name: '교무주임', salary: '4,000만~6,500만', growth: 8, fit: 95, desc: '학교 운영 및 학생 지원' },
      { name: '고객 관계 담당자', salary: '3,000만~5,500만', growth: 7, fit: 96, desc: '고객 만족도 관리' },
      { name: '리셉셔니스트/관리자', salary: '2,500만~4,500만', growth: 6, fit: 95, desc: '응접 및 기관 이미지 관리' },
      { name: '청소년 프로그램 담당자', salary: '3,000만~5,500만', growth: 8, fit: 97, desc: '청소년 활동 기획 및 지도' }
    ]
  },

  ISTP: {
    tagline: '효율적으로 현실적 문제를 해결하는 장인',
    strengths: ['문제 해결', '기술력', '효율성', '신뢰성'],
    advice: 'ISTP는 실용적 기술과 논리로 문제를 해결합니다. 손으로 만드는 작업과 현실적 결과가 있는 업무에서 최고의 성과를 냅니다.',
    jobs: [
      { name: '전자 엔지니어', salary: '4,000만~8,000만', growth: 9, fit: 96, desc: '전자 시스템 설계 및 개발' },
      { name: '자동차 정비사', salary: '3,000만~5,500만', growth: 8, fit: 95, desc: '차량 정비 및 유지보수' },
      { name: 'IT 지원 담당자', salary: '3,000만~5,500만', growth: 8, fit: 94, desc: '시스템 문제 해결 및 지원' },
      { name: '기계 엔지니어', salary: '4,500만~8,500만', growth: 9, fit: 95, desc: '기계 시스템 설계' },
      { name: '건설 감리관', salary: '4,000만~7,500만', growth: 8, fit: 93, desc: '건설 현장 감독' },
      { name: '네트워크 관리자', salary: '4,000만~7,500만', growth: 9, fit: 95, desc: '네트워크 운영 및 보안' }
    ]
  },

  ISFP: {
    tagline: '아름다움과 조화를 추구하는 예술가',
    strengths: ['감수성', '유연성', '예술적 감각', '현재 집중'],
    advice: 'ISFP는 아름다움과 자신의 가치관에 충실한 업무를 선호합니다. 창의적 표현과 자유도가 있는 환경에서 최고의 성과를 냅니다.',
    jobs: [
      { name: '미술가/작가', salary: '2,000만~5,000만', growth: 8, fit: 98, desc: '예술작품 창작' },
      { name: '그래픽 디자이너', salary: '3,000만~5,500만', growth: 8, fit: 97, desc: '시각 디자인 및 표현' },
      { name: '패션 디자이너', salary: '3,000만~6,000만', growth: 9, fit: 98, desc: '의류 디자인 및 제작' },
      { name: '인테리어 디자이너', salary: '3,000만~6,000만', growth: 8, fit: 97, desc: '공간 디자인 및 구성' },
      { name: '음악 치료사', salary: '2,500만~4,500만', growth: 8, fit: 96, desc: '음악으로 사람 치유' },
      { name: '플로리스트', salary: '2,000만~4,000만', growth: 7, fit: 97, desc: '꽃 장식 및 배치' }
    ]
  },

  ESTP: {
    tagline: '행동으로 현실을 주도하는 실용가',
    strengths: ['행동력', '문제 해결', '대담함', '적응력'],
    advice: 'ESTP는 즉각적인 행동과 현실적 결과를 추구합니다. 빠르게 움직이는 환경과 도전적인 상황에서 최고의 성과를 냅니다.',
    jobs: [
      { name: '영업 담당자', salary: '3,000만~6,500만', growth: 9, fit: 96, desc: '제품/서비스 판매' },
      { name: '기업 인수합병 전문가', salary: '5,000만~1억', growth: 10, fit: 95, desc: 'M&A 거래 중개 및 실행' },
      { name: '긴급 대응 팀', salary: '3,500만~6,000만', growth: 8, fit: 97, desc: '응급 상황 대처' },
      { name: '마케팅 실행 담당자', salary: '3,500만~6,500만', growth: 8, fit: 94, desc: '실제 캠페인 집행' },
      { name: '스포츠 코치', salary: '3,000만~6,000만', growth: 8, fit: 96, desc: '운동선수 훈련 및 지도' },
      { name: '건설 현장소장', salary: '4,000만~7,500만', growth: 8, fit: 95, desc: '공사 진행 및 관리' }
    ]
  },

  ESFP: {
    tagline: '즐거움을 만들고 사람을 연결하는 분위기 메이커',
    strengths: ['사교성', '긍정성', '현장감', '유연성'],
    advice: 'ESFP는 사람들과의 상호작용과 즉각적인 경험을 즐깁니다. 활기찬 환경과 타인과의 협력이 중요한 업무에서 최고의 성과를 냅니다.',
    jobs: [
      { name: '공연자/배우', salary: '2,000만~5,000만+', growth: 9, fit: 98, desc: '무대에서 감정 표현' },
      { name: '이벤트 호스트', salary: '2,500만~5,000만', growth: 8, fit: 97, desc: '행사 진행 및 사회' },
      { name: '판매 담당자', salary: '3,000만~6,500만', growth: 9, fit: 96, desc: '대면 판매 및 고객 관리' },
      { name: '헬스 클럽 트레이너', salary: '2,500만~5,000만', growth: 8, fit: 97, desc: '운동 지도 및 동기부여' },
      { name: '투어 가이드', salary: '2,000만~4,000만', growth: 7, fit: 98, desc: '여행 상품 안내 및 진행' },
      { name: '음식점 매니저', salary: '3,000만~5,500만', growth: 8, fit: 96, desc: '고객 서비스 및 운영' }
    ]
  }
};

function loadCareersData() {
  const params = new URLSearchParams(location.search);
  const type = params.get('type');

  if (type && resultData && resultData[type]) {
    displayCareersForType(type);
  } else {
    const data = getMBTIData();
    if (data.currentResult && resultData[data.currentResult.type]) {
      displayCareersForType(data.currentResult.type);
    } else {
      showTypeSelector();
    }
  }
}

function displayCareersForType(type) {
  const info = careersData[type];
  const animal = resultData[type];

  if (!info) {
    alert('직업 데이터가 없습니다');
    return;
  }

  // 타입 배지
  document.getElementById('careersTypeBadge').textContent = type;
  document.getElementById('careersAnimal').textContent = animal.emoji;
  document.getElementById('careersTagline').textContent = info.tagline;

  // 직업 목록
  const jobsList = document.getElementById('careersJobsList');
  jobsList.innerHTML = info.jobs.map((job, idx) => `
    <div class="careers-job-card" style="animation: slideUp 0.5s ease backwards; animation-delay: ${idx * 0.1}s">
      <div class="job-rank">TOP ${idx + 1}</div>
      <h4 class="job-title">${job.name}</h4>
      <p class="job-desc">${job.desc}</p>

      <div class="job-stats">
        <div class="stat">
          <span class="stat-label">예상 연봉</span>
          <span class="stat-value">${job.salary}</span>
        </div>
        <div class="stat">
          <span class="stat-label">성장성</span>
          <span class="stat-value">${'⭐'.repeat(job.growth)}</span>
        </div>
        <div class="stat">
          <span class="stat-label">직업 적합도</span>
          <span class="stat-value" style="color: #10b981;">${job.fit}%</span>
        </div>
      </div>
    </div>
  `).join('');

  // 강점
  document.getElementById('careersStrengths').innerHTML = info.strengths.map(s =>
    '<span class="tag">' + s + '</span>'
  ).join('');

  // 조언
  document.getElementById('careersAdvice').textContent = info.advice;

  document.getElementById('careersResult').style.display = 'block';
}

function showTypeSelector() {
  const tabsContainer = document.getElementById('careersTypeTabs');
  tabsContainer.innerHTML = Object.keys(resultData).map(type =>
    '<button class="type-tab" onclick="displayCareersForType(\'' + type + '\')">' +
    type + ' ' + resultData[type].emoji +
    '</button>'
  ).join('');
}

// CSS 추가
if (!document.querySelector('#careersStyles')) {
  const style = document.createElement('style');
  style.id = 'careersStyles';
  style.textContent = `
    .type-tab {
      background: var(--bg);
      border: 2px solid var(--border);
      border-radius: 8px;
      padding: 0.6rem 1rem;
      margin: 0.3rem;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 700;
    }

    .type-tab:hover {
      background: var(--primary);
      color: white;
      border-color: var(--primary);
    }

    .careers-job-card {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1rem;
      border-left: 4px solid var(--primary);
    }

    .job-rank {
      display: inline-block;
      background: var(--primary);
      color: white;
      font-size: 0.8rem;
      font-weight: 700;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      margin-bottom: 0.8rem;
    }

    .job-title {
      font-size: 1.2rem;
      font-weight: 900;
      margin-bottom: 0.5rem;
      color: var(--text);
    }

    .job-desc {
      font-size: 0.95rem;
      color: var(--text-mute);
      margin-bottom: 1rem;
    }

    .job-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }

    .stat {
      background: white;
      padding: 0.8rem;
      border-radius: 8px;
      text-align: center;
    }

    .stat-label {
      display: block;
      font-size: 0.8rem;
      color: var(--text-mute);
      margin-bottom: 0.3rem;
    }

    .stat-value {
      display: block;
      font-weight: 700;
      color: var(--primary);
    }

    .careers-advice-box {
      background: linear-gradient(135deg, #f0f0ff, #ffeef5);
      border-radius: 12px;
      padding: 1.5rem;
      margin-top: 1.5rem;
      border-left: 4px solid var(--primary);
    }

    @media (max-width: 600px) {
      .job-stats {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(style);
}

// 페이지 로드
document.addEventListener('DOMContentLoaded', function () {
  loadCareersData();
});
