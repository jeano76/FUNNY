#!/usr/bin/env node

/**
 * Add missing compatChart: section to all languages in translations.js
 */

const fs = require('fs');

// Read translations.js
let content = fs.readFileSync('./js/translations.js', 'utf-8');

// Define compatChart translations for all languages
const compatChartTranslations = {
  ko: {
    title: '성격 유형 16×16 궁합표 | 성격 유형 동물 테스트',
    metaDescription: '성격 유형 16가지 유형의 모든 궁합을 한눈에! 16×16 전체 궁합표를 확인하세요.',
    ogTitle: '성격 유형 16×16 궁합표',
    ogDescription: '성격 유형 모든 유형의 궁합을 한눈에 확인하는 16×16 궁합표!',
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
    title: 'Personality Type 16×16 Compatibility Chart | Personality Animal Test',
    metaDescription: 'See all compatibility combinations of 16 personality types at a glance! Check the 16×16 full compatibility chart.',
    ogTitle: 'Personality Type 16×16 Compatibility Chart',
    ogDescription: 'View all personality type combinations and their compatibility scores in a 16×16 chart!',
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
    title: '性格タイプ16×16相性表 | 性格動物テスト',
    metaDescription: '16つの性格タイプのすべての相性を一目で確認！16×16相性表をチェックしてください。',
    ogTitle: '性格タイプ16×16相性表',
    ogDescription: '16つの性格タイプすべての組み合わせの相性を一目で確認する16×16相性表！',
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
  zh: {
    title: '性格类型16×16兼容性表 | 性格动物测试',
    metaDescription: '一眼看清所有16种性格类型的相容性！查看16×16兼容性表。',
    ogTitle: '性格类型16×16兼容性表',
    ogDescription: '一目了然地查看所有16种性格类型组合的相容性！',
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
    title: 'Tabla de Compatibilidad 16×16 del Tipo de Personalidad | Prueba de Personalidad Animal',
    metaDescription: '¡Mira todas las compatibilidades de 16 tipos de personalidad de un vistazo! Verifica la tabla de compatibilidad completa 16×16.',
    ogTitle: 'Tabla de Compatibilidad 16×16 del Tipo de Personalidad',
    ogDescription: '¡Ve todas las combinaciones de tipos de personalidad y sus puntuaciones de compatibilidad en una tabla 16×16!',
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
    title: 'Persönlichkeitstyp 16×16 Kompatibilitätstabelle | Persönlichkeit Tiertest',
    metaDescription: 'Sehen Sie alle Kompatibilitäten von 16 Persönlichkeitstypen auf einen Blick! Überprüfen Sie die 16×16 Kompatibilitätstabelle.',
    ogTitle: 'Persönlichkeitstyp 16×16 Kompatibilitätstabelle',
    ogDescription: 'Sehen Sie alle Persönlichkeitstypkombinationen und ihre Kompatibilitätswerte in einer 16×16-Tabelle!',
    mainTitle: 'Persönlichkeitstyp 16×16 Vollständige Kompatibilitätstabelle',
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
    title: 'Tableau de Compatibilité 16×16 des Types de Personnalité | Test de Personnalité Animale',
    metaDescription: 'Voyez toutes les compatibilités de 16 types de personnalité d\'un coup d\'œil ! Vérifiez le tableau de compatibilité complet 16×16.',
    ogTitle: 'Tableau de Compatibilité 16×16 des Types de Personnalité',
    ogDescription: 'Consultez toutes les combinaisons de types de personnalité et leurs scores de compatibilité dans un tableau 16×16 !',
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
    title: 'Таблица совместимости типов личности 16×16 | Тест личности животного',
    metaDescription: 'Посмотрите все совместимости 16 типов личности с первого взгляда! Проверьте полную таблицу совместимости 16×16.',
    ogTitle: 'Таблица совместимости типов личности 16×16',
    ogDescription: 'Просмотрите все комбинации типов личности и их оценки совместимости в таблице 16×16!',
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
  pt: {
    title: 'Tabela de Compatibilidade 16×16 do Tipo de Personalidade | Teste de Personalidade Animal',
    metaDescription: 'Veja todas as compatibilidades de 16 tipos de personalidade de uma só vez! Verifique a tabela completa de compatibilidade 16×16.',
    ogTitle: 'Tabela de Compatibilidade 16×16 do Tipo de Personalidade',
    ogDescription: 'Veja todas as combinações de tipos de personalidade e suas pontuações de compatibilidade em uma tabela 16×16!',
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
  id: {
    title: 'Tabel Kompatibilitas Jenis Kepribadian 16×16 | Tes Kepribadian Hewan',
    metaDescription: 'Lihat semua kompatibilitas dari 16 jenis kepribadian sekaligus! Periksa tabel kompatibilitas lengkap 16×16.',
    ogTitle: 'Tabel Kompatibilitas Jenis Kepribadian 16×16',
    ogDescription: 'Lihat semua kombinasi jenis kepribadian dan skor kompatibilitas mereka dalam tabel 16×16!',
    mainTitle: 'Tabel Kompatibilitas Lengkap 16×16 Jenis Kepribadian',
    subtitle: 'Klik pada sel untuk melihat kompatibilitas terperinci!',
    highlightLabel: 'Sorot Jenis Saya:',
    noSelection: '-- Pilih --',
    scoreLabel: 'Skor Kompatibilitas:',
    legend90: '90+ Pasangan Sempurna',
    legend80: '80-89 Kompatibilitas Luar Biasa',
    legend70: '70-79 Koneksi Baik',
    legend60: '60-69 Rata-rata',
    legend50: '50-59 Memerlukan Usaha',
    legendBelow50: 'Di Bawah 50 Menantang',
    clickHint: '* Klik sel untuk melihat kompatibilitas terperinci.',
    compatButton: 'Lihat Kompatibilitas 1:1 💕',
    startButton: 'Mulai Tes'
  },
  hi: {
    title: 'व्यक्तित्व प्रकार 16×16 अनुकूलता चार्ट | व्यक्तित्व पशु परीक्षण',
    metaDescription: '16 व्यक्तित्व प्रकारों की सभी अनुकूलता को एक नज़र में देखें! संपूर्ण 16×16 अनुकूलता चार्ट देखें।',
    ogTitle: 'व्यक्तित्व प्रकार 16×16 अनुकूलता चार्ट',
    ogDescription: '16×16 चार्ट में सभी व्यक्तित्व प्रकार संयोजन और उनके अनुकूलता अंक देखें!',
    mainTitle: 'व्यक्तित्व प्रकार 16×16 पूर्ण अनुकूलता चार्ट',
    subtitle: 'विस्तृत अनुकूलता देखने के लिए किसी सेल पर क्लिक करें!',
    highlightLabel: 'मेरा प्रकार हाइलाइट करें:',
    noSelection: '-- चुनें --',
    scoreLabel: 'अनुकूलता स्कोर:',
    legend90: '90+ सही मेल',
    legend80: '80-89 उत्कृष्ट अनुकूलता',
    legend70: '70-79 अच्छा संबंध',
    legend60: '60-69 औसत',
    legend50: '50-59 प्रयास की आवश्यकता',
    legendBelow50: '50 से नीचे चुनौतीपूर्ण',
    clickHint: '* विस्तृत अनुकूलता देखने के लिए सेल पर क्लिक करें।',
    compatButton: '1:1 अनुकूलता देखें 💕',
    startButton: 'परीक्षण शुरू करें'
  },
  vi: {
    title: 'Bảng Tương Thích Loại Tính Cách 16×16 | Bài Kiểm Tra Tính Cách Động Vật',
    metaDescription: 'Xem tất cả khả năng tương thích của 16 loại tính cách trong một cái nhìn! Kiểm tra bảng tương thích đầy đủ 16×16.',
    ogTitle: 'Bảng Tương Thích Loại Tính Cách 16×16',
    ogDescription: 'Xem tất cả các kết hợp loại tính cách và điểm tương thích của chúng trong bảng 16×16!',
    mainTitle: 'Bảng Tương Thích Đầy Đủ 16×16 Loại Tính Cách',
    subtitle: 'Nhấp vào một ô để xem chi tiết tương thích!',
    highlightLabel: 'Nổi Bật Loại của Tôi:',
    noSelection: '-- Chọn --',
    scoreLabel: 'Điểm Tương Thích:',
    legend90: '90+ Kết Hợp Hoàn Hảo',
    legend80: '80-89 Tương Thích Tuyệt Vời',
    legend70: '70-79 Kết Nối Tốt',
    legend60: '60-69 Trung Bình',
    legend50: '50-59 Cần Cố Gắng',
    legendBelow50: 'Dưới 50 Thách Thức',
    clickHint: '* Nhấp vào một ô để xem chi tiết tương thích.',
    compatButton: 'Xem Tương Thích 1:1 💕',
    startButton: 'Bắt Đầu Bài Kiểm Tra'
  },
  th: {
    title: 'ตารางความเข้ากันได้ประเภทบุคลิกภาพ 16×16 | การทดสอบบุคลิกภาพสัตว์',
    metaDescription: 'ดูความเข้ากันได้ของประเภทบุคลิกภาพ 16 ประเภทได้ในครั้งเดียว! ตรวจสอบตารางความเข้ากันได้เต็ม 16×16',
    ogTitle: 'ตารางความเข้ากันได้ประเภทบุคลิกภาพ 16×16',
    ogDescription: 'ดูการรวมกันของประเภทบุคลิกภาพทั้งหมดและคะแนนความเข้ากันได้ในตาราง 16×16!',
    mainTitle: 'ตารางความเข้ากันได้เต็ม 16×16 ประเภทบุคลิกภาพ',
    subtitle: 'คลิกบนเซลล์เพื่อดูความเข้ากันได้โดยละเอียด!',
    highlightLabel: 'เน้นประเภทของฉัน:',
    noSelection: '-- เลือก --',
    scoreLabel: 'คะแนนความเข้ากันได้:',
    legend90: '90+ การจับคู่ที่สมบูรณ์แบบ',
    legend80: '80-89 ความเข้ากันได้ยอดเยี่ยม',
    legend70: '70-79 การเชื่อมต่อที่ดี',
    legend60: '60-69 เฉลี่ย',
    legend50: '50-59 ต้องมีความพยายาม',
    legendBelow50: 'ต่ำกว่า 50 ท้าทาย',
    clickHint: '* คลิกบนเซลล์เพื่อดูความเข้ากันได้โดยละเอียด',
    compatButton: 'ดูความเข้ากันได้ 1:1 💕',
    startButton: 'เริ่มการทดสอบ'
  },
  tr: {
    title: 'Kişilik Türü 16×16 Uyumluluk Tablosu | Kişilik Hayvan Testi',
    metaDescription: '16 kişilik türünün tüm uyumluluk kombinasyonlarını bir bakışta görün! Tam 16×16 uyumluluk tablosunu kontrol edin.',
    ogTitle: 'Kişilik Türü 16×16 Uyumluluk Tablosu',
    ogDescription: '16×16 tablosunda tüm kişilik türü kombinasyonları ve uyumluluk puanlarını görebilirsiniz!',
    mainTitle: 'Kişilik Türü Tam 16×16 Uyumluluk Tablosu',
    subtitle: 'Detaylı uyumluluğu görmek için bir hücreyi tıklayın!',
    highlightLabel: 'Türümü Vurgula:',
    noSelection: '-- Seç --',
    scoreLabel: 'Uyumluluk Puanı:',
    legend90: '90+ Mükemmel Eş',
    legend80: '80-89 Mükemmel Uyumluluk',
    legend70: '70-79 İyi Bağlantı',
    legend60: '60-69 Orta',
    legend50: '50-59 Çaba Gereklidir',
    legendBelow50: '50 Altında Zorlayıcı',
    clickHint: '* Detaylı uyumluluğu görmek için bir hücreyi tıklayın',
    compatButton: '1:1 Uyumluluğu Görüntüle 💕',
    startButton: 'Testi Başlat'
  },
  it: {
    title: 'Tabella Compatibilità Tipo Personalità 16×16 | Test Personalità Animale',
    metaDescription: 'Vedi tutte le compatibilità di 16 tipi di personalità in un colpo d\'occhio! Controlla la tabella completa di compatibilità 16×16.',
    ogTitle: 'Tabella Compatibilità Tipo Personalità 16×16',
    ogDescription: 'Visualizza tutte le combinazioni di tipi di personalità e i loro punteggi di compatibilità in una tabella 16×16!',
    mainTitle: 'Tabella Completa Compatibilità Tipo Personalità 16×16',
    subtitle: 'Fai clic su una cella per vedere i dettagli di compatibilità!',
    highlightLabel: 'Evidenzia Il Mio Tipo:',
    noSelection: '-- Seleziona --',
    scoreLabel: 'Punteggio Compatibilità:',
    legend90: '90+ Accoppiamento Perfetto',
    legend80: '80-89 Compatibilità Eccellente',
    legend70: '70-79 Buona Connessione',
    legend60: '60-69 Medio',
    legend50: '50-59 Richiede Sforzo',
    legendBelow50: 'Sotto 50 Sfidante',
    clickHint: '* Fai clic su una cella per vedere i dettagli di compatibilità.',
    compatButton: 'Visualizza Compatibilità 1:1 💕',
    startButton: 'Avvia Test'
  },
  nl: {
    title: 'Persoonlijkheidstype 16×16 Compatibiliteitstabel | Persoonlijkheid Diertest',
    metaDescription: 'Zie alle compatibiliteiten van 16 persoonlijkheidstypen in één oogopslag! Controleer de volledige 16×16 compatibiliteitstabel.',
    ogTitle: 'Persoonlijkheidstype 16×16 Compatibiliteitstabel',
    ogDescription: 'Bekijk alle combinaties van persoonlijkheidstypen en hun compatibiliteitscores in een 16×16-tabel!',
    mainTitle: 'Persoonlijkheidstype Volledige 16×16 Compatibiliteitstabel',
    subtitle: 'Klik op een cel om gedetailleerde compatibiliteit te zien!',
    highlightLabel: 'Mijn Type Markeren:',
    noSelection: '-- Selecteer --',
    scoreLabel: 'Compatibiliteitsscore:',
    legend90: '90+ Perfecte Match',
    legend80: '80-89 Uitstekende Compatibiliteit',
    legend70: '70-79 Goede Connectie',
    legend60: '60-69 Gemiddeld',
    legend50: '50-59 Vereist Inspanning',
    legendBelow50: 'Onder 50 Uitdagend',
    clickHint: '* Klik op een cel om gedetailleerde compatibiliteit te zien.',
    compatButton: '1:1 Compatibiliteit Bekijken 💕',
    startButton: 'Test Starten'
  },
  ar: {
    title: 'جدول توافق نوع الشخصية 16×16 | اختبار شخصية الحيوان',
    metaDescription: 'شاهد جميع توافقات 16 نوع شخصية في لمحة واحدة! تحقق من جدول التوافق الكامل 16×16.',
    ogTitle: 'جدول توافق نوع الشخصية 16×16',
    ogDescription: 'اعرض جميع مجموعات أنواع الشخصية وتصنيفات توافقها في جدول 16×16!',
    mainTitle: 'جدول توافق نوع الشخصية الكامل 16×16',
    subtitle: 'انقر على خلية لعرض التوافق التفصيلي!',
    highlightLabel: 'أبرز نوعي:',
    noSelection: '-- اختر --',
    scoreLabel: 'تصنيف التوافق:',
    legend90: '90+ توافق مثالي',
    legend80: '80-89 توافق ممتاز',
    legend70: '70-79 علاقة جيدة',
    legend60: '60-69 متوسط',
    legend50: '50-59 يتطلب جهد',
    legendBelow50: 'أقل من 50 صعب',
    clickHint: '* انقر على خلية لعرض التوافق التفصيلي.',
    compatButton: 'عرض التوافق 1:1 💕',
    startButton: 'ابدأ الاختبار'
  },
  mn: {
    title: 'Хүний төрлийн нийцтэй байдлын хүснэгт 16×16 | Хүний төрлийн амьтан туршилт',
    metaDescription: '16 төрлийн хүний төрлийн бүх нийцтэй байдлыг нэгэн харцаар үзнэ үү! 16×16 бүрэн нийцтэй байдлын хүснэгтийг шалгаж үзнэ үү.',
    ogTitle: 'Хүний төрлийн нийцтэй байдлын хүснэгт 16×16',
    ogDescription: '16×16 хүснэгтэд хүний төрлийн бүх хослол ба тэдгээрийн нийцтэй байдлын оноог үзнэ үү!',
    mainTitle: 'Хүний төрлийн нийцтэй байдлын бүрэн хүснэгт 16×16',
    subtitle: 'Нарийвчилсан нийцтэй байдлыг харахын тулд нүдэн дээр дарна уу!',
    highlightLabel: 'Миний төрлийг онцол:',
    noSelection: '-- Сонгох --',
    scoreLabel: 'Нийцтэй байдлын оноо:',
    legend90: '90+ Төгс ханддуулалт',
    legend80: '80-89 Маш сайн нийцтэй байдал',
    legend70: '70-79 Сайн харилцаа',
    legend60: '60-69 Дундаж',
    legend50: '50-59 Хүчин чармайлт шаардлагатай',
    legendBelow50: '50-ээс доош сорилттой',
    clickHint: '* Нарийвчилсан нийцтэй байдлыг харахын тулд нүдэн дээр дарна уу.',
    compatButton: '1:1 нийцтэй байдлыг харах 💕',
    startButton: 'Туршилт эхлүүлэх'
  },
  la: {
    title: 'Tabula Concordantiae Generis Personalitatis 16×16 | Experimentum Personalitatis Animalis',
    metaDescription: 'Videte omnes concordantiae sedecim generum personalitatis uno intuitu! Tabulam plenam concordantiae 16×16 inspicite.',
    ogTitle: 'Tabula Concordantiae Generis Personalitatis 16×16',
    ogDescription: 'Videte omnes coniunctiones generum personalitatis et earum puncta concordantiae in tabula 16×16!',
    mainTitle: 'Tabula Plena Concordantiae Generis Personalitatis 16×16',
    subtitle: 'Cellulam clicate ut concordantiam plene videat!',
    highlightLabel: 'Meum Genus Illustrate:',
    noSelection: '-- Elige --',
    scoreLabel: 'Puncta Concordantiae:',
    legend90: '90+ Coniunctio Perfecta',
    legend80: '80-89 Concordantia Egrega',
    legend70: '70-79 Connexio Bona',
    legend60: '60-69 Media',
    legend50: '50-59 Laboris Opus',
    legendBelow50: 'Minus quam 50 Difficilis',
    clickHint: '* Cellulam clicate ut concordantiam plene videat.',
    compatButton: 'Videte Concordantiam 1:1 💕',
    startButton: 'Experimentum Incipite'
  }
};

// Find the position to insert compatChart translations
// We'll insert it after the "index:" section and before "quiz:" section
const indexMatch = content.match(/(\s+index:\s*\{[^]*?\n\s+\},)\s+/);
if (!indexMatch) {
  console.error('Could not find index section in translations.js');
  process.exit(1);
}

// Get all languages
const languages = Object.keys(compatChartTranslations);

// For each language, find and add compatChart
languages.forEach(lang => {
  // Find this language section
  const langRegex = new RegExp(`("${lang}":\\s*\\{[^]*?)(\\s+)(index:\\s*\\{)`);
  const match = content.match(langRegex);
  
  if (match) {
    // Build the compatChart section for this language
    const translations = compatChartTranslations[lang];
    let compatChartStr = `\n    compatChart: {`;
    Object.entries(translations).forEach(([key, value], idx) => {
      const comma = idx < Object.entries(translations).length - 1 ? ',' : '';
      const escapedValue = value.replace(/"/g, '\\"').replace(/\n/g, '\\n');
      compatChartStr += `\n      ${key}: "${escapedValue}"${comma}`;
    });
    compatChartStr += `\n    },`;
    
    // Insert after index section
    const newContent = content.replace(
      langRegex,
      `$1$2${compatChartStr}$2$3`
    );
    
    content = newContent;
  } else {
    console.log(`⚠️ Could not find ${lang} language section`);
  }
});

// Write the updated content
fs.writeFileSync('./js/translations.js', content);
console.log('✅ Added compatChart translations to all languages in translations.js');
