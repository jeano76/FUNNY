/* ===========================
   quiz.js - 성격 유형 퀴즈 로직
   =========================== */

const quizData = [
  // ---- E / I 축 ----
  {
    id: 1, axis: "EI",
    emoji: "🎉",
    text: "Após muito tempo, você finalmente tem um fim de semana livre! Você geralmente...",
    options: [
      { text: "Entra em contato com amigos para agendar um encontro", score: "E" },
      { text: "Aprecia o tempo para descansar e recarregar em casa", score: "I" }
    ]
  },
  {
    id: 2, axis: "EI",
    emoji: "🎤",
    text: "Em uma reunião com pessoas novas, você...",
    options: [
      { text: "Inicia a conversa e faz amigos rapidamente", score: "E" },
      { text: "Observa o ambiente e participa gradualmente", score: "I" }
    ]
  },
  {
    id: 3, axis: "EI",
    emoji: "😪",
    text: "Após um longo dia, como você recarrega sua energia?",
    options: [
      { text: "Conversando com amigos e família para aliviar o estresse", score: "E" },
      { text: "Descansando em um espaço tranquilo e silencioso", score: "I" }
    ]
  },
  {
    id: 4, axis: "EI",
    emoji: "📞",
    text: "Você tem muitas mensagens acumuladas no WhatsApp. Sua reação é...",
    options: [
      { text: "Responder rapidamente mantendo a conversa fluindo", score: "E" },
      { text: "Verificar depois e responder de forma concisa", score: "I" }
    ]
  },
  {
    id: 5, axis: "EI",
    emoji: "🎓",
    text: "Ao aprender algo novo, qual é a forma mais eficiente para você?",
    options: [
      { text: "Discutindo com outros e aprendendo juntos", score: "E" },
      { text: "Estudando sozinho em um ambiente concentrado", score: "I" }
    ]
  },
  // ---- S / N 축 ----
  {
    id: 6, axis: "SN",
    emoji: "✈️",
    text: "Ao planejar uma viagem, você...",
    options: [
      { text: "Planeja detalhes como hotéis, transporte e restaurantes com cuidado", score: "S" },
      { text: "Define apenas a direção geral e decide no local", score: "N" }
    ]
  },
  {
    id: 7, axis: "SN",
    emoji: "📱",
    text: "Ao comprar um smartphone novo, o mais importante para você é...",
    options: [
      { text: "Especificações técnicas como bateria e câmera", score: "S" },
      { text: "Como você se sentirá usando o telefone no dia a dia", score: "N" }
    ]
  },
  {
    id: 8, axis: "SN",
    emoji: "💭",
    text: "Quando você está distraído, em que está pensando?",
    options: [
      { text: "Em coisas práticas do dia a dia que preciso fazer", score: "S" },
      { text: "Em ideias criativas e imaginações aleatórias", score: "N" }
    ]
  },
  {
    id: 9, axis: "SN",
    emoji: "📖",
    text: "Ao ler um romance, você...",
    options: [
      { text: "Se concentra na trama e no desenvolvimento dos eventos", score: "S" },
      { text: "Pensa sobre simbolismo, significados ocultos e intenção do autor", score: "N" }
    ]
  },
  {
    id: 10, axis: "SN",
    emoji: "🔧",
    text: "Você comprou um novo eletrodoméstico. Você...",
    options: [
      { text: "Lê o manual cuidadosamente e segue as instruções", score: "S" },
      { text: "Experimenta e aprende enquanto usa", score: "N" }
    ]
  },
  // ---- T / F 축 ----
  {
    id: 11, axis: "TF",
    emoji: "😢",
    text: "Um amigo desabafa seus problemas para você. Você...",
    options: [
      { text: "Identifica a causa e sugere soluções práticas", score: "T" },
      { text: "Primeiro oferece suporte emocional e compreensão", score: "F" }
    ]
  },
  {
    id: 12, axis: "TF",
    emoji: "⚖️",
    text: "Em um projeto em equipe, surge um conflito de opiniões. Você...",
    options: [
      { text: "Usa dados e lógica para determinar o que está certo", score: "T" },
      { text: "Procura uma solução que todos possam aceitar", score: "F" }
    ]
  },
  {
    id: 13, axis: "TF",
    emoji: "🎬",
    text: "Depois de assistir um filme com amigos, você...",
    options: [
      { text: "Aponta inconsistências ou erros lógicos", score: "T" },
      { text: "Discute sobre as emoções e impacto emocional do filme", score: "F" }
    ]
  },
  {
    id: 14, axis: "TF",
    emoji: "📝",
    text: "Ao dar feedback a um colega, você...",
    options: [
      { text: "Foca em fatos objetivos e melhorias necessárias", score: "T" },
      { text: "Menciona pontos positivos primeiro para não magoar", score: "F" }
    ]
  },
  {
    id: 15, axis: "TF",
    emoji: "🚗",
    text: "Você está dirigindo e o carro à frente está muito lento. Você...",
    options: [
      { text: "Pensa em razões lógicas como trânsito ou motorista novo", score: "T" },
      { text: "Sente frustração ou preocupação com o motorista", score: "F" }
    ]
  },
  // ---- J / P 축 ----
  {
    id: 16, axis: "JP",
    emoji: "🗓️",
    text: "Ao planejar uma viagem com amigos, você...",
    options: [
      { text: "Prefere reservar hotéis, transporte e restaurantes com antecedência", score: "J" },
      { text: "Gosta de deixar as decisões para fazer no local", score: "P" }
    ]
  },
  {
    id: 17, axis: "JP",
    emoji: "📚",
    text: "Você tem um trabalho ou projeto com prazo em 2 semanas. Você...",
    options: [
      { text: "Faz um plano agora e trabalha gradualmente", score: "J" },
      { text: "Trabalha melhor quando o prazo se aproxima", score: "P" }
    ]
  },
  {
    id: 18, axis: "JP",
    emoji: "🛒",
    text: "Ao fazer compras no supermercado, você...",
    options: [
      { text: "Compra apenas o que está na lista planejada", score: "J" },
      { text: "Vê promoções e compra impulsivamente", score: "P" }
    ]
  },
  {
    id: 19, axis: "JP",
    emoji: "🍽️",
    text: "Há um restaurante famoso com fila de mais de 1 hora. Você...",
    options: [
      { text: "Espera porque decidiu que quer comer lá", score: "J" },
      { text: "Procura outro lugar interessante próximo", score: "P" }
    ]
  },
  {
    id: 20, axis: "JP",
    emoji: "🗃️",
    text: "Como é seu quarto ou mesa de trabalho?",
    options: [
      { text: "Cada coisa tem seu lugar e está bem organizado", score: "J" },
      { text: "Parece bagunçado para outros, mas você sabe onde tudo está", score: "P" }
    ]
  }
];

// --- State ---
let currentIndex = 0;
const answers = {}; // { axis: [scores] }

// --- Init ---
function getLocalizedQuizData() {
  if (!window.i18n || !window.i18n.t) return quizData;
  return quizData.map(function(q) {
    var qi = window.i18n.t('quizQuestions.q' + q.id);
    if (!qi || qi === 'quizQuestions.q' + q.id) return q;
    return {
      id: q.id, axis: q.axis, emoji: q.emoji,
      text: qi.text || q.text,
      options: [
        { text: qi.a1 || q.options[0].text, score: q.options[0].score },
        { text: qi.a2 || q.options[1].text, score: q.options[1].score }
      ]
    };
  });
}

document.addEventListener('DOMContentLoaded', function () {
  renderQuestion(currentIndex);
});

function renderQuestion(index) {
  var localizedData = getLocalizedQuizData();
  const q = localizedData[index];
  const total = localizedData.length;

  // Progress
  const pct = Math.round(((index) / total) * 100) + 5;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent = `${index + 1} / ${total}`;
  document.getElementById('questionCount').textContent = `${index + 1} / ${total}`;

  // Card content
  document.getElementById('questionEmoji').textContent = q.emoji;
  document.getElementById('questionText').textContent = q.text;

  // Options
  const grid = document.getElementById('optionsGrid');
  grid.innerHTML = '';
  q.options.forEach(function (opt) {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt.text;
    btn.addEventListener('click', function () { selectOption(opt.score, btn); });
    grid.appendChild(btn);
  });

  // Prev button
  document.getElementById('prevBtn').style.visibility = index > 0 ? 'visible' : 'hidden';

  // Card animation
  const card = document.getElementById('questionCard');
  card.style.animation = 'none';
  card.offsetHeight; // reflow
  card.style.animation = 'slideIn .3s ease';
}

function selectOption(score, btn) {
  // Visual feedback
  document.querySelectorAll('.option-btn').forEach(function (b) { b.classList.remove('selected'); });
  btn.classList.add('selected');

  // Record answer
  const axis = quizData[currentIndex].axis;
  if (!answers[axis]) answers[axis] = [];
  answers[axis][currentIndex] = score;

  // Move to next after short delay
  setTimeout(function () {
    if (currentIndex < quizData.length - 1) {
      currentIndex++;
      renderQuestion(currentIndex);
    } else {
      finishQuiz();
    }
  }, 300);
}

function prevQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion(currentIndex);
  }
}

function finishQuiz() {
  // Calculate Personality Type
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  Object.values(answers).forEach(function (axisAnswers) {
    axisAnswers.forEach(function (s) { if (s) scores[s]++; });
  });

  // Also count from flat answer array
  quizData.forEach(function (q, i) {
    const axis = q.axis;
    // find selected from DOM... use answers object
  });

  const type =
    (scores.E >= scores.I ? 'E' : 'I') +
    (scores.S >= scores.N ? 'S' : 'N') +
    (scores.T >= scores.F ? 'T' : 'F') +
    (scores.J >= scores.P ? 'J' : 'P');

  // Save to localStorage
  saveMBTIResult(type, scores);

  // Redirect to result page
  window.location.href = 'result.html?type=' + type;
}
