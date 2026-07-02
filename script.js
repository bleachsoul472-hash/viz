let current = 0;

// 🔥 الأسئلة
const questions = [
  {
    img: "https://i.ibb.co/yFdxVfPX/48-20260702023107.png",
    question: "ما هذه الصورة؟",
    options: ["سيارة", "بيت", "قطة", "طائرة"],
    answer: "سيارة"
  },
  {
    img: "https://i.ibb.co/yFdxVfPX/48-20260702023107.png",
    question: "ما هذا الشيء؟",
    options: ["جبل", "بحر", "صحراء", "غابة"],
    answer: "جبل"
  },
  {
    img: "https://picsum.photos/500/300?3",
    question: "ما هذا الشكل؟",
    options: ["دائرة", "مربع", "مثلث", "نجمة"],
    answer: "دائرة"
  }
];

// 🚀 بدء الفعالية
function startQuiz() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("quizScreen").style.display = "block";
  loadQuestion();
}

// 📌 تحميل السؤال
function loadQuestion() {
  let q = questions[current];

  document.getElementById("questionImg").src = q.img;
  document.getElementById("questionText").innerText = q.question;

  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(opt => {
    let btn = document.createElement("button");
    btn.innerText = opt;

    btn.onclick = () => {
      document.getElementById("result").innerText =
        opt === q.answer ? "✅ صح" : "❌ خطأ";
    };

    optionsDiv.appendChild(btn);
  });

  document.getElementById("result").innerText = "";
}

// ➜ السؤال التالي
function nextQuestion() {
  current++;

  if (current >= questions.length) {
    alert("🔥 خلصت الفعالية!");
    current = 0;
  }

  loadQuestion();
}