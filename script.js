const app = document.getElementById("app");

// All 20 Questions
const allQuestions = [
  { q: "What animal is Union’s mascot?", a: "Capybara", b: "Whale Shark", correct: "b" },
  { q: "Union's primary tech focus is?", a: "Zero-Knowledge Proofs (ZKPs)", b: "AI Algorithms", correct: "a" },
  { q: "Which blockchain did Union recently integrate?", a: "BTC", b: "Cardano", correct: "a" },
  { q: "Union's native token symbol is:", a: "$U", b: "$UNI", correct: "a" },
  { q: "\"ZKGM\" stands for:", a: "Zero Knowledge General Messaging", b: "Zero Knowledge Good Morning", correct: "a" },
  { q: "Union’s Mad Yaps allocation Supply?", a: "1% of TS", b: "0.1% of TS", correct: "a" },
  { q: "Union recently partnered with which ZK protocol?", a: "Boundless", b: "zkSync", correct: "a" },
  { q: "Union Testnet 8 was known for what issue?", a: "Rigid UI", b: "Fast transactions", correct: "a" },
  { q: "The smallest unit of Union’s token ($U) is called:", a: "atto-U (au)", b: "mini-U (mu)", correct: "a" },
  { q: "Union’s recent BTC integration for liquid staking is named:", a: "auBTC", b: "BTCUnion", correct: "a" },
  { q: "Union's trusted ceremony was for:", a: "ZK Setup", b: "Token Launch", correct: "a" },
  { q: "What is Union’s latest messaging upgrade called?", a: "zkgm v2", b: "zkComm 3.0", correct: "a" },
  { q: "Union partnered with Escher for:", a: "Liquid staking & governance", b: "AI-driven analytics", correct: "a" },
  { q: "Union is built primarily for:", a: "Interoperability", b: "NFT marketplaces", correct: "a" },
  { q: "Union’s testing community is called:", a: "Testers", b: "Builders", correct: "a" },
  { q: "Union’s content-sharing community is called:", a: "Yappers", b: "Posters", correct: "a" },
  { q: "What chain abstraction concept did Union introduce?", a: "Chain-Abstracted Liquid Staking", b: "Abstract Chain Voting", correct: "a" },
  { q: "Union’s Founder and CTO is:", a: "Karel & Cor", b: "Vitalik & Cz", correct: "a" },
  { q: "Union uses which consensus verification engine?", a: "CometBLS", b: "Avalanche", correct: "a" },
  { q: "The \"Goblin Book\" on Union’s site is mainly for:", a: "Developers", b: "Traders", correct: "a" },
];

const easyIndices = [0, 1, 2, 3, 4, 5, 7, 14, 15, 17];
const hardIndices = [6, 8, 9, 10, 11, 12, 13, 16, 18, 19];

let username = "";
let mode = "";
let quizQuestions = [];
let answers = [];
let score = 0;

document.addEventListener("DOMContentLoaded", () => {
  renderWelcomeBox();
});

function renderWelcomeBox() {
  const box = document.createElement("div");
  box.className = "welcome-box";
  box.innerHTML = `
    <img src="quiz.png" alt="Quiz Image" />
    <h2>Are you ready to take Union Mega Quiz?</h2>
    <p>This quiz tests your true understanding and dedication to Union.<br/>
    Each answer reveals how deeply you've followed the journey.<br/>
    It’s not about speed — it’s about alignment.<br/>
    Earn your certificate and prove you're Union-core.</p>

    <div class="username-input">
      <input type="text" id="username" placeholder="Enter your username" />
    </div>

    <div class="mode-buttons">
      <button class="mode-btn green" onclick="selectMode('Easy', this)">Easy</button>
      <button class="mode-btn red" onclick="selectMode('Hard-core', this)">Hard-core</button>
    </div>

    <button class="start-btn" onclick="startQuiz()">Start The Mega Quiz</button>
  `;
  app.appendChild(box);
}

function selectMode(selected, btn) {
  mode = selected;
  document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function startQuiz() {
  const raw = document.getElementById("username").value.trim();
  if (!raw || !mode) return alert("Enter a username and select a mode!");
  username = raw.startsWith("@") ? raw.slice(1) : raw;

  const indices = mode === "Easy" ? easyIndices : hardIndices;
  quizQuestions = indices.map(i => allQuestions[i]);

  app.innerHTML = "";
  quizQuestions.forEach((q, idx) => renderQuestion(q, idx));
  renderFinalSubmit();
}

function renderQuestion(q, idx) {
  const box = document.createElement("div");
  box.className = "welcome-box";

  // Shuffle options
  const isOriginalOrder = Math.random() > 0.5;
  const optA = isOriginalOrder ? q.a : q.b;
  const optB = isOriginalOrder ? q.b : q.a;
  const correctAnswer = q.correct === "a" ? q.a : q.b;
  const correctKey = correctAnswer === optA ? "a" : "b";

  // Save correctKey for this question
  quizQuestions[idx] = { ...q, correct: correctKey };

  box.innerHTML = `
    <h3>${idx + 1}. ${q.q}</h3>
    <div style="margin: 20px 0;">
      <label><input type="radio" name="q${idx}" value="a" /> ${optA}</label><br/>
      <label><input type="radio" name="q${idx}" value="b" /> ${optB}</label>
    </div>
    <button class="start-btn" onclick="submitAnswer(${idx}, this)">Submit</button>
  `;
  app.appendChild(box);
}

function submitAnswer(idx, btn) {
  const selected = document.querySelector(`input[name="q${idx}"]:checked`);
  if (!selected) return alert("Select an option!");
  answers[idx] = selected.value;
  btn.remove();
}

function renderFinalSubmit() {
  const btn = document.createElement("button");
  btn.className = "start-btn";
  btn.innerText = "Final Submit";
  btn.style.marginTop = "40px";
  btn.onclick = finalizeQuiz;
  app.appendChild(btn);
}

function finalizeQuiz() {
  if (answers.length !== quizQuestions.length || answers.includes(undefined)) {
    return alert("Answer all questions before submitting.");
  }

  score = answers.reduce((acc, val, i) => val === quizQuestions[i].correct ? acc + 1 : acc, 0);
  app.innerHTML = "";
  renderCertificate();
}

function renderCertificate() {
  if (typeof confetti === 'function') {
    for (let i = 0; i < 5; i++) {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.2 }
      });
    }
  }

  const cert = document.createElement("div");
  cert.className = "certificate";

  const essay = `
You have chosen ${score}/10 correct choices.
This quiz reflects more than just answers — it reveals your understanding of Union’s mission.
Every choice you made echoes your alignment with the values of coordination and trustlessness.
You’ve stepped beyond hype and embraced the power of ZK with clarity.
Whether Easy or Hard-core, your path shows real initiative.
Union is more than tech — it’s a shared ethos, and you’ve proven you're part of it.
This certificate marks your participation in something bigger than just a test.
It’s a tribute to your curiosity, loyalty, and vision for a better web.
Thank you for showing up, learning, and pushing the space forward.
Now carry this moment with pride — you’ve earned it.

We. Are. Union.
zkgm.
  `;

  cert.innerHTML = `
    <img src="badge3.png" alt="Union Logo" class="logo" />
    <div class="cert-header">
      <span>@${username}</span>
      <span style="color: ${mode === 'Easy' ? '#00FF00' : '#FF5555'};">Mode: ${mode}</span>
    </div>
    <div class="cert-essay">${essay}</div>
    <br/>
    <button class="start-btn" style="background:#A9ECFD;color:#000;margin:20px;" onclick="shareResult()">Share Your Results on X!</button>
    <button class="start-btn" style="background:#888;color:#000;" onclick="downloadCertificate()">Download Your Result</button>
  `;

  app.appendChild(cert);
}

function shareResult() {
  const tweetText = encodeURIComponent(`I just completed the Union Mega Quiz in ${mode} mode with ${score}/10 correct! 🧠⚡\n\nJoin the challenge and earn your own certificate 👉 union-megaquiz.vercel.app\n\nhttps://x.com/Shinosuka_eth/status/1950978753720705272`);
  window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
}

function downloadCertificate() {
  html2canvas(document.querySelector('.certificate')).then(canvas => {
    const link = document.createElement('a');
    link.download = `${username}_Union_Certificate.png`;
    link.href = canvas.toDataURL();
    link.click();
  });
        }
