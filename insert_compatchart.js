#!/usr/bin/env node
const fs = require('fs');

// Simple compatChart data for all languages
const compatChartData = {
  ko: {
    mainTitle: '성격 유형 16×16 전체 궁합표',
    subtitle: '셀을 클릭하면 상세 궁합을 확인할 수 있어요!',
    highlightLabel: '내 유형 하이라이트:',
    noSelection: '-- 선택 없음 --',
    scoreLabel: '궁합 점수:',
    legend90: '90+ 천생연분',
    legend80: '80-89 환상 궁합',
    legend70: '70-79 좋은 인연',
    legend60: '60-69 보통',
    legend50: '50-59 노력 필요',
    legendBelow50: '50 미만 도전적',
    clickHint: '* 셀 클릭 시 상세 궁합 페이지로 이동합니다.',
    compatButton: '1:1 궁합 보기 💕',
    startButton: '테스트 시작하기'
  },
  en: {
    mainTitle: 'Personality Type 16×16 Full Compatibility Chart',
    subtitle: 'Click on a cell to see detailed compatibility!',
    highlightLabel: 'Highlight My Type:',
    noSelection: '-- Select --',
    scoreLabel: 'Compatibility Score:',
    legend90: '90+ Perfect Match',
    legend80: '80-89 Excellent Match',
    legend70: '70-79 Good Connection',
    legend60: '60-69 Average',
    legend50: '50-59 Needs Effort',
    legendBelow50: 'Below 50 Challenging',
    clickHint: '* Click a cell to see detailed compatibility.',
    compatButton: 'See 1:1 Compatibility 💕',
    startButton: 'Start Test'
  },
  ja: {
    mainTitle: '性格タイプ16×16相性表',
    subtitle: 'セルをクリックすると詳細な相性が確認できます！',
    highlightLabel: 'あなたのタイプをハイライト:',
    noSelection: '-- 選択なし --',
    scoreLabel: '相性スコア:',
    legend90: '90+ 完璧な相性',
    legend80: '80-89 素晴らしい相性',
    legend70: '70-79 良好な関係',
    legend60: '60-69 普通',
    legend50: '50-59 努力が必要',
    legendBelow50: '50未満 困難',
    clickHint: '* セルをクリックすると詳細な相性ページに移動します。',
    compatButton: '1:1相性を見る 💕',
    startButton: 'テストを開始'
  },
  pt: {
    mainTitle: 'Tabela Completa de Compatibilidade 16×16 do Tipo de Personalidade',
    subtitle: 'Clique em uma célula para ver a compatibilidade detalhada!',
    highlightLabel: 'Destacar Meu Tipo:',
    noSelection: '-- Selecionar --',
    scoreLabel: 'Pontuação de Compatibilidade:',
    legend90: '90+ Combinação Perfeita',
    legend80: '80-89 Compatibilidade Excelente',
    legend70: '70-79 Boa Conexão',
    legend60: '60-69 Médio',
    legend50: '50-59 Requer Esforço',
    legendBelow50: 'Abaixo de 50 Desafiador',
    clickHint: '* Clique em uma célula para ver a compatibilidade detalhada.',
    compatButton: 'Ver Compatibilidade 1:1 💕',
    startButton: 'Iniciar Teste'
  },
  zh: {
    mainTitle: '性格类型16×16完整兼容性表',
    subtitle: '点击单元格查看详细相容性！',
    highlightLabel: '突出显示我的类型:',
    noSelection: '-- 选择 --',
    scoreLabel: '兼容性分数:',
    legend90: '90+ 完美匹配',
    legend80: '80-89 优秀匹配',
    legend70: '70-79 良好关系',
    legend60: '60-69 平均',
    legend50: '50-59 需要努力',
    legendBelow50: '50以下 具有挑战性',
    clickHint: '* 点击单元格查看详细兼容性。',
    compatButton: '查看1:1兼容性 💕',
    startButton: '开始测试'
  },
  es: {
    mainTitle: 'Tabla Completa de Compatibilidad 16×16 del Tipo de Personalidad',
    subtitle: '¡Haz clic en una celda para ver la compatibilidad detallada!',
    highlightLabel: 'Resaltar Mi Tipo:',
    noSelection: '-- Seleccionar --',
    scoreLabel: 'Puntuación de Compatibilidad:',
    legend90: '90+ Pareja Perfecta',
    legend80: '80-89 Excelente Compatibilidad',
    legend70: '70-79 Buena Conexión',
    legend60: '60-69 Promedio',
    legend50: '50-59 Requiere Esfuerzo',
    legendBelow50: 'Menos de 50 Desafiante',
    clickHint: '* Haz clic en una celda para ver la compatibilidad detallada.',
    compatButton: 'Ver Compatibilidad 1:1 💕',
    startButton: 'Comenzar Prueba'
  },
  de: {
    mainTitle: 'Persönlichkeitstyp Vollständige Kompatibilitätstabelle 16×16',
    subtitle: 'Klicken Sie auf eine Zelle, um detaillierte Kompatibilität zu sehen!',
    highlightLabel: 'Meinen Typ Hervorheben:',
    noSelection: '-- Auswählen --',
    scoreLabel: 'Kompatibilitätswert:',
    legend90: '90+ Perfekte Übereinstimmung',
    legend80: '80-89 Hervorragende Übereinstimmung',
    legend70: '70-79 Gute Beziehung',
    legend60: '60-69 Durchschnitt',
    legend50: '50-59 Bedarf Anstrengung',
    legendBelow50: 'Unter 50 Herausfordernd',
    clickHint: '* Klicken Sie auf eine Zelle, um detaillierte Kompatibilität zu sehen.',
    compatButton: '1:1 Kompatibilität Anzeigen 💕',
    startButton: 'Test Starten'
  },
  fr: {
    mainTitle: 'Tableau Complet de Compatibilité 16×16 des Types de Personnalité',
    subtitle: 'Cliquez sur une cellule pour voir la compatibilité détaillée !',
    highlightLabel: 'Mettre en Évidence Mon Type:',
    noSelection: '-- Sélectionner --',
    scoreLabel: 'Score de Compatibilité:',
    legend90: '90+ Couple Parfait',
    legend80: '80-89 Excellente Compatibilité',
    legend70: '70-79 Bonne Connexion',
    legend60: '60-69 Moyen',
    legend50: '50-59 Requiert de l\'Effort',
    legendBelow50: 'Moins de 50 Difficile',
    clickHint: '* Cliquez sur une cellule pour voir la compatibilité détaillée.',
    compatButton: 'Voir Compatibilité 1:1 💕',
    startButton: 'Démarrer le Test'
  },
  ru: {
    mainTitle: 'Полная таблица совместимости типов личности 16×16',
    subtitle: 'Нажмите на ячейку, чтобы увидеть детальную совместимость!',
    highlightLabel: 'Выделить Мой Тип:',
    noSelection: '-- Выбрать --',
    scoreLabel: 'Оценка Совместимости:',
    legend90: '90+ Идеальная пара',
    legend80: '80-89 Отличная совместимость',
    legend70: '70-79 Хорошие отношения',
    legend60: '60-69 Среднее',
    legend50: '50-59 Требуется усилие',
    legendBelow50: 'Ниже 50 Вызывающий',
    clickHint: '* Нажмите на ячейку, чтобы увидеть детальную совместимость.',
    compatButton: 'Посмотреть совместимость 1:1 💕',
    startButton: 'Начать Тест'
  },
  id: {mainTitle: 'Tabel Kompatibilitas Lengkap Jenis Kepribadian 16×16', subtitle: 'Klik pada sel untuk melihat kompatibilitas terperinci!', highlightLabel: 'Sorot Jenis Saya:', noSelection: '-- Pilih --', scoreLabel: 'Skor Kompatibilitas:', legend90: '90+ Pasangan Sempurna', legend80: '80-89 Kompatibilitas Luar Biasa', legend70: '70-79 Koneksi Baik', legend60: '60-69 Rata-rata', legend50: '50-59 Memerlukan Usaha', legendBelow50: 'Di Bawah 50 Menantang', clickHint: '* Klik sel untuk melihat kompatibilitas terperinci.', compatButton: 'Lihat Kompatibilitas 1:1 💕', startButton: 'Mulai Tes'},
  hi: {mainTitle: 'व्यक्तित्व प्रकार पूर्ण अनुकूलता चार्ट 16×16', subtitle: 'विस्तृत अनुकूलता देखने के लिए किसी सेल पर क्लिक करें!', highlightLabel: 'मेरा प्रकार हाइलाइट करें:', noSelection: '-- चुनें --', scoreLabel: 'अनुकूलता स्कोर:', legend90: '90+ सही मेल', legend80: '80-89 उत्कृष्ट अनुकूलता', legend70: '70-79 अच्छा संबंध', legend60: '60-69 औसत', legend50: '50-59 प्रयास की आवश्यकता', legendBelow50: '50 से नीचे चुनौतीपूर्ण', clickHint: '* विस्तृत अनुकूलता देखने के लिए सेल पर क्लिक करें।', compatButton: '1:1 अनुकूलता देखें 💕', startButton: 'परीक्षण शुरू करें'},
  vi: {mainTitle: 'Bảng Tương Thích Đầy Đủ Loại Tính Cách 16×16', subtitle: 'Nhấp vào một ô để xem chi tiết tương thích!', highlightLabel: 'Nổi Bật Loại của Tôi:', noSelection: '-- Chọn --', scoreLabel: 'Điểm Tương Thích:', legend90: '90+ Kết Hợp Hoàn Hảo', legend80: '80-89 Tương Thích Tuyệt Vời', legend70: '70-79 Kết Nối Tốt', legend60: '60-69 Trung Bình', legend50: '50-59 Cần Cố Gắng', legendBelow50: 'Dưới 50 Thách Thức', clickHint: '* Nhấp vào một ô để xem chi tiết tương thích.', compatButton: 'Xem Tương Thích 1:1 💕', startButton: 'Bắt Đầu Bài Kiểm Tra'},
  th: {mainTitle: 'ตารางความเข้ากันได้เต็ม 16×16 ประเภทบุคลิกภาพ', subtitle: 'คลิกบนเซลล์เพื่อดูความเข้ากันได้โดยละเอียด!', highlightLabel: 'เน้นประเภทของฉัน:', noSelection: '-- เลือก --', scoreLabel: 'คะแนนความเข้ากันได้:', legend90: '90+ การจับคู่ที่สมบูรณ์แบบ', legend80: '80-89 ความเข้ากันได้ยอดเยี่ยม', legend70: '70-79 การเชื่อมต่อที่ดี', legend60: '60-69 เฉลี่ย', legend50: '50-59 ต้องมีความพยายาม', legendBelow50: 'ต่ำกว่า 50 ท้าทาย', clickHint: '* คลิกบนเซลล์เพื่อดูความเข้ากันได้โดยละเอียด', compatButton: 'ดูความเข้ากันได้ 1:1 💕', startButton: 'เริ่มการทดสอบ'},
  tr: {mainTitle: 'Kişilik Türü Tam Uyumluluk Tablosu 16×16', subtitle: 'Detaylı uyumluluğu görmek için bir hücreyi tıklayın!', highlightLabel: 'Türümü Vurgula:', noSelection: '-- Seç --', scoreLabel: 'Uyumluluk Puanı:', legend90: '90+ Mükemmel Eş', legend80: '80-89 Mükemmel Uyumluluk', legend70: '70-79 İyi Bağlantı', legend60: '60-69 Orta', legend50: '50-59 Çaba Gereklidir', legendBelow50: '50 Altında Zorlayıcı', clickHint: '* Detaylı uyumluluğu görmek için bir hücreyi tıklayın', compatButton: '1:1 Uyumluluğu Görüntüle 💕', startButton: 'Testi Başlat'},
  it: {mainTitle: 'Tabella Compatibilità Tipo Personalità Completa 16×16', subtitle: 'Fai clic su una cella per vedere i dettagli di compatibilità!', highlightLabel: 'Evidenzia Il Mio Tipo:', noSelection: '-- Seleziona --', scoreLabel: 'Punteggio Compatibilità:', legend90: '90+ Accoppiamento Perfetto', legend80: '80-89 Compatibilità Eccellente', legend70: '70-79 Buona Connessione', legend60: '60-69 Medio', legend50: '50-59 Richiede Sforzo', legendBelow50: 'Sotto 50 Sfidante', clickHint: '* Fai clic su una cella per vedere i dettagli di compatibilità.', compatButton: 'Visualizza Compatibilità 1:1 💕', startButton: 'Avvia Test'},
  nl: {mainTitle: 'Persoonlijkheidstype Volledige Compatibiliteitstabel 16×16', subtitle: 'Klik op een cel om gedetailleerde compatibiliteit te zien!', highlightLabel: 'Mijn Type Markeren:', noSelection: '-- Selecteer --', scoreLabel: 'Compatibiliteitsscore:', legend90: '90+ Perfecte Match', legend80: '80-89 Uitstekende Compatibiliteit', legend70: '70-79 Goede Connectie', legend60: '60-69 Gemiddeld', legend50: '50-59 Vereist Inspanning', legendBelow50: 'Onder 50 Uitdagend', clickHint: '* Klik op een cel om gedetailleerde compatibiliteit te zien.', compatButton: '1:1 Compatibiliteit Bekijken 💕', startButton: 'Test Starten'},
  ar: {mainTitle: 'جدول توافق نوع الشخصية الكامل 16×16', subtitle: 'انقر على خلية لعرض التوافق التفصيلي!', highlightLabel: 'أبرز نوعي:', noSelection: '-- اختر --', scoreLabel: 'تصنيف التوافق:', legend90: '90+ توافق مثالي', legend80: '80-89 توافق ممتاز', legend70: '70-79 علاقة جيدة', legend60: '60-69 متوسط', legend50: '50-59 يتطلب جهد', legendBelow50: 'أقل من 50 صعب', clickHint: '* انقر على خلية لعرض التوافق التفصيلي.', compatButton: 'عرض التوافق 1:1 💕', startButton: 'ابدأ الاختبار'},
  mn: {mainTitle: 'Хүний төрлийн нийцтэй байдлын бүрэн хүснэгт 16×16', subtitle: 'Нарийвчилсан нийцтэй байдлыг харахын тулд нүдэн дээр дарна уу!', highlightLabel: 'Миний төрлийг онцол:', noSelection: '-- Сонгох --', scoreLabel: 'Нийцтэй байдлын оноо:', legend90: '90+ Төгс ханддуулалт', legend80: '80-89 Маш сайн нийцтэй байдал', legend70: '70-79 Сайн харилцаа', legend60: '60-69 Дундаж', legend50: '50-59 Хүчин чармайлт шаардлагатай', legendBelow50: '50-ээс доош сорилттой', clickHint: '* Нарийвчилсан нийцтэй байдлыг харахын тулд нүдэн дээр дарна уу.', compatButton: '1:1 нийцтэй байдлыг харах 💕', startButton: 'Туршилт эхлүүлэх'},
  la: {mainTitle: 'Tabula Plena Concordantiae Generis Personalitatis 16×16', subtitle: 'Cellulam clicate ut concordantiam plene videat!', highlightLabel: 'Meum Genus Illustrate:', noSelection: '-- Elige --', scoreLabel: 'Puncta Concordantiae:', legend90: '90+ Coniunctio Perfecta', legend80: '80-89 Concordantia Egrega', legend70: '70-79 Connexio Bona', legend60: '60-69 Media', legend50: '50-59 Laboris Opus', legendBelow50: 'Minus quam 50 Difficilis', clickHint: '* Cellulam clicate ut concordantiam plene videat.', compatButton: 'Videte Concordantiam 1:1 💕', startButton: 'Experimentum Incipite'}
};

// Read translations file
let content = fs.readFileSync('./js/translations.js', 'utf-8');

// For each language, find where to insert compatChart (after index section, before quiz section)
for (const lang in compatChartData) {
  // Find the insertion point: after "index: {" section closing brace and comma
  // Look for pattern: "    }," following index section, then insert before "quiz:"
  
  const langStart = content.indexOf(`"${lang}": {`);
  const langEnd = content.indexOf(`"${lang === 'la' ? 'ko' : Object.keys(compatChartData)[Object.keys(compatChartData).indexOf(lang) + 1]}": {`);
  const langSection = content.substring(langStart, langEnd > 0 ? langEnd : content.length - 100);
  
  // Find "index: {" and its matching closing "    },"
  const indexStart = langSection.indexOf('index: {');
  if (indexStart === -1) continue;
  
  let braceCount = 0;
  let indexEnd = indexStart + 8; // length of "index: {"
  
  // Find the matching closing brace
  for (let i = indexStart + 8; i < langSection.length; i++) {
    if (langSection[i] === '{') braceCount++;
    if (langSection[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        indexEnd = i;
        break;
      }
    }
  }
  
  // Build compatChart string
  let compatStr = ',\n    compatChart: {\n';
  const trans = compatChartData[lang];
  const keys = Object.keys(trans);
  keys.forEach((key, idx) => {
    const escaped = trans[key].replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
    const comma = idx < keys.length - 1 ? ',' : '';
    compatStr += `      ${key}: "${escaped}"${comma}\n`;
  });
  compatStr += '    }';
  
  // Insert into content at the right position
  const fullIndexEnd = langStart + indexEnd + 1; // +1 to include the closing brace
  content = content.substring(0, fullIndexEnd) + compatStr + content.substring(fullIndexEnd);
}

// Write back
fs.writeFileSync('./js/translations.js', content);
console.log('✅ Added compatChart translations to translations.js');
