let current = 0;

// 🔥 الأسئلة
const questions = [
  {
    img: "https://i.ibb.co/14xvYH5/48-20260702115901.png",
    question: "اجب عما داخل الصورة؟",
    options: ["فلندا", "سويد", "كندا", "النرويج"],
    answer: "فلندا"
  },
  {
    img: "https://i.ibb.co/PZ2JcmnY/48-20260702115956.png",
    question: "اجب عما داخل الصورة؟",
    options: ["القلب", "الجلد", "الكبد", "الرئتين"],
    answer: "الجلد"
  },
  {
    img: "https://i.ibb.co/hF5KFgPv/48-20260702120036.png",
    question: "اجب عما داخل الصورة",
    options: ["الهيدروجين", "الاكسجين", "الهيليوم", "الليثيوم"],
    answer: "الهيدروجين"
  },
    {
    img: "https://i.ibb.co/ZzPCHJvh/48-20260702120302.png",
    question: "اجب عما داخل الصورة؟",
    options: ["صحراء اتأكاما", "الصحراء القطبية الجنوبية", "الصحراء الكبرى", "صحراء غوبي"],
    answer: "الصحراء القطبية الجنوبية"
  },
    {
    img: "https://i.ibb.co/ZzJyC6vk/48-20260702120410.png",
    question: "اجب عما داخل الصورة؟",
    options: ["فرنسا", "روسيا","الولايات المتحدة","الصين"],
    answer: "فرنسا"
  },
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