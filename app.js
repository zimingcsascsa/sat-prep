/* ===== SAT Practice App - Main Logic ===== */

const App = (() => {
  // ===== STATE =====
  let state = {
    currentPage: 'dashboard',
    targetScore: 1200,
    testHistory: [], // [{testId, date, moduleResults, totalScore, rwScore, mathScore, skills, answers}]
    currentTest: null,
    currentModule: null,
    currentQuestionIdx: 0,
    answers: {},    // {qId: answer}
    marked: new Set(),
    timer: null,
    timeLeft: 0,
    darkMode: false,
    savedTest: null,  // {testId, currentModule, currentQuestionIdx, answers, marked, timeLeft, timestamp}
    desmosCalc: null,
    desmosPracticeCalc: null,
    desmosOpen: false,
    isRegressionTest: false
  };

  // Module config
  const MODULE_CONFIG = {
    rw1: { label: 'R&W Module 1', time: 32 * 60, section: 'rw' },
    rw2: { label: 'R&W Module 2', time: 32 * 60, section: 'rw' },
    math1: { label: 'Math Module 1', time: 35 * 60, section: 'math' },
    math2: { label: 'Math Module 2', time: 35 * 60, section: 'math' }
  };

  const MODULE_ORDER = ['rw1', 'rw2', 'math1', 'math2'];

  // Score conversion tables (simplified digital SAT scale)
  function rawToScore(correct, total, section) {
    const pct = correct / total;
    // Digital SAT: 200-800 per section
    // Approximate conversion
    if (section === 'rw') {
      if (pct >= 0.97) return 800;
      if (pct >= 0.93) return 770;
      if (pct >= 0.90) return 740;
      if (pct >= 0.85) return 710;
      if (pct >= 0.80) return 680;
      if (pct >= 0.75) return 650;
      if (pct >= 0.70) return 620;
      if (pct >= 0.65) return 590;
      if (pct >= 0.60) return 560;
      if (pct >= 0.55) return 530;
      if (pct >= 0.50) return 500;
      if (pct >= 0.45) return 470;
      if (pct >= 0.40) return 440;
      if (pct >= 0.35) return 410;
      if (pct >= 0.30) return 380;
      if (pct >= 0.25) return 350;
      if (pct >= 0.20) return 320;
      if (pct >= 0.15) return 290;
      if (pct >= 0.10) return 260;
      return 200;
    } else {
      if (pct >= 0.97) return 800;
      if (pct >= 0.93) return 770;
      if (pct >= 0.89) return 740;
      if (pct >= 0.85) return 710;
      if (pct >= 0.80) return 680;
      if (pct >= 0.75) return 650;
      if (pct >= 0.70) return 620;
      if (pct >= 0.65) return 590;
      if (pct >= 0.60) return 560;
      if (pct >= 0.55) return 530;
      if (pct >= 0.50) return 500;
      if (pct >= 0.45) return 470;
      if (pct >= 0.40) return 440;
      if (pct >= 0.35) return 410;
      if (pct >= 0.30) return 380;
      if (pct >= 0.25) return 350;
      if (pct >= 0.20) return 320;
      if (pct >= 0.15) return 290;
      if (pct >= 0.10) return 260;
      return 200;
    }
  }

  // ===== INIT =====
  function init() {
    loadState();
    setupEventListeners();
    applyTheme();
    renderDashboard();
    renderTests();

    // Check URL hash for deep link
    const hash = window.location.hash.slice(1);
    if (hash && ['dashboard', 'tests', 'results', 'analytics', 'recommendations', 'regression'].includes(hash)) {
      navigate(hash);
    }
  }

  function loadState() {
    try {
      const saved = localStorage.getItem('sat-prep-state');
      if (saved) {
        const parsed = JSON.parse(saved);
        state.targetScore = parsed.targetScore || 1200;
        state.testHistory = parsed.testHistory || [];
        state.darkMode = parsed.darkMode || false;
      }
      // Load saved in-progress test
      const savedTest = localStorage.getItem('sat-prep-saved-test');
      if (savedTest) {
        state.savedTest = JSON.parse(savedTest);
      }
    } catch (e) { /* ignore */ }
  }

  function saveState() {
    try {
      localStorage.setItem('sat-prep-state', JSON.stringify({
        targetScore: state.targetScore,
        testHistory: state.testHistory,
        darkMode: state.darkMode
      }));
    } catch (e) { /* ignore */ }
  }

  function saveTestProgress() {
    if (!state.currentTest) return;
    try {
      const data = {
        testId: state.currentTest.id,
        currentModule: state.currentModule,
        currentQuestionIdx: state.currentQuestionIdx,
        answers: state.answers,
        marked: [...state.marked],
        timeLeft: state.timeLeft,
        timestamp: Date.now()
      };
      localStorage.setItem('sat-prep-saved-test', JSON.stringify(data));
    } catch (e) { /* ignore */ }
  }

  function clearSavedTest() {
    localStorage.removeItem('sat-prep-saved-test');
    state.savedTest = null;
  }

  // ===== NAVIGATION =====
  function navigate(page) {
    state.currentPage = page;
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + page)?.classList.add('active');
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.dataset.page === page);
    });
    window.location.hash = page;

    // Close mobile sidebar
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-overlay').classList.remove('visible');

    // Refresh page content
    if (page === 'dashboard') renderDashboard();
    if (page === 'analytics') renderAnalytics();
    if (page === 'recommendations') renderRecommendations();
    if (page === 'results') renderResults();
    if (page === 'regression') renderRegressionPage();
  }

  // ===== THEME =====
  function toggleTheme() {
    state.darkMode = !state.darkMode;
    applyTheme();
    saveState();
  }

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
    const icon = state.darkMode ? '☀️' : '🌙';
    document.querySelectorAll('.theme-icon').forEach(el => el.textContent = icon);
  }

  // ===== EVENT LISTENERS =====
  function setupEventListeners() {
    // Nav links
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', e => { e.preventDefault(); navigate(a.dataset.page); });
    });

    // Desmos toggle
    document.getElementById('btn-toggle-desmos')?.addEventListener('click', toggleDesmos);
    document.getElementById('btn-close-desmos')?.addEventListener('click', () => {
      document.getElementById('desmos-panel').style.display = 'none';
      state.desmosOpen = false;
      const btn = document.getElementById('btn-toggle-desmos');
      if (btn) { btn.textContent = '📊 Calculator'; btn.classList.remove('open'); }
    });

    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('mobile-theme').addEventListener('click', toggleTheme);

    // Mobile menu
    document.getElementById('menu-toggle').addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('open');
      document.getElementById('sidebar-overlay').classList.toggle('visible');
    });
    document.getElementById('sidebar-overlay').addEventListener('click', () => {
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('sidebar-overlay').classList.remove('visible');
    });

    // Target slider
    const slider = document.getElementById('target-slider');
    slider.addEventListener('input', () => {
      state.targetScore = parseInt(slider.value);
      document.getElementById('target-display').textContent = state.targetScore;
      updateTargetMarker();
      saveState();
    });

    // Test navigation
    document.getElementById('btn-next').addEventListener('click', nextQuestion);
    document.getElementById('btn-prev').addEventListener('click', prevQuestion);
    document.getElementById('btn-mark').addEventListener('click', toggleMark);
    document.getElementById('btn-exit-test').addEventListener('click', exitTest);
    document.getElementById('btn-continue-module').addEventListener('click', continueModule);
    document.getElementById('btn-confirm-submit').addEventListener('click', submitTest);

    // Save & Exit
    document.getElementById('btn-save-exit')?.addEventListener('click', saveAndExit);
    document.getElementById('btn-resume-test')?.addEventListener('click', resumeSavedTest);
    document.getElementById('btn-discard-saved')?.addEventListener('click', discardSavedTest);

    // Review filters
    ['review-section-filter', 'review-result-filter', 'review-difficulty-filter'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', renderReviewList);
    });

    // Desmos panel resize on window resize
    window.addEventListener('resize', () => {
      if (state.desmosCalc && state.desmosOpen) state.desmosCalc.resize();
    });
  }

  // ===== DASHBOARD =====
  function renderDashboard() {
    const history = state.testHistory;
    document.getElementById('dash-tests-taken').textContent = history.length;

    if (history.length > 0) {
      const latest = history[history.length - 1];
      document.getElementById('dash-predicted-score').textContent = predictScore();
      document.getElementById('dash-rw-score').textContent = latest.rwScore;
      document.getElementById('dash-math-score').textContent = latest.mathScore;
    }

    // Target
    document.getElementById('target-slider').value = state.targetScore;
    document.getElementById('target-display').textContent = state.targetScore;
    updateTargetMarker();

    // Recent activity
    const actEl = document.getElementById('recent-activity');
    if (history.length === 0) {
      actEl.innerHTML = '<div class="empty-state">No tests taken yet. Start your first practice test!</div>';
    } else {
      actEl.innerHTML = history.slice(-5).reverse().map(h => `
        <div class="activity-item">
          <div class="activity-icon">📝</div>
          <div class="activity-info">
            <div class="activity-title">${getTestName(h.testId)} — ${h.totalScore}</div>
            <div class="activity-meta">${new Date(h.date).toLocaleDateString()} · R&W: ${h.rwScore} · Math: ${h.mathScore}</div>
          </div>
          <button class="btn btn-sm btn-secondary" onclick="App.viewResults('${h.testId}')">Review</button>
        </div>
      `).join('');
    }
  }

  function getTestName(testId) {
    const tests = getAllTests();
    const t = tests.find(t => t.id === testId);
    return t ? t.name : testId;
  }

  function updateTargetMarker() {
    const pct = ((state.targetScore - 400) / 1200) * 100;
    document.getElementById('target-marker').style.left = pct + '%';
    const predicted = predictScore();
    if (predicted > 0) {
      const fillPct = ((predicted - 400) / 1200) * 100;
      document.getElementById('target-fill').style.width = fillPct + '%';
    }
  }

  // ===== TEST LIST =====
  function renderTests() {
    const tests = getAllTests();
    const container = document.getElementById('test-list');

    if (tests.length === 0) {
      container.innerHTML = '<div class="empty-state">Loading tests...</div>';
      return;
    }

    container.innerHTML = tests.map(test => {
      const history = state.testHistory.filter(h => h.testId === test.id);
      const lastAttempt = history.length > 0 ? history[history.length - 1] : null;
      const totalQ = test.modules.rw1.length + test.modules.rw2.length + test.modules.math1.length + test.modules.math2.length;
      const hasSaved = state.savedTest && state.savedTest.testId === test.id;

      return `
        <div class="test-card" onclick="App.startTest('${test.id}')">
          <div class="test-card-header">
            <div class="test-card-title">${test.name}</div>
            ${lastAttempt ? '<span class="test-card-badge">Retake</span>' : '<span class="test-card-badge">New</span>'}
          </div>
          <div class="test-card-desc">${test.description}</div>
          <div class="test-card-meta">
            <span>📝 ${totalQ} questions</span>
            <span>⏱ ~2h 24min</span>
          </div>
          ${lastAttempt ? `
            <div class="test-card-scores">
              <span class="test-score-mini rw">R&W: ${lastAttempt.rwScore}</span>
              <span class="test-score-mini math">Math: ${lastAttempt.mathScore}</span>
              <span class="test-score-mini total">Total: ${lastAttempt.totalScore}</span>
            </div>
          ` : ''}
          <button class="btn btn-primary btn-sm">${hasSaved ? '▶ Resume' : lastAttempt ? 'Retake Test' : 'Start Test'}</button>
        </div>
      `;
    }).join('');
  }

  // ===== TEST TAKING =====
  function startTest(testId) {
    const tests = getAllTests();
    const test = tests.find(t => t.id === testId);
    if (!test) return;

    state.currentTest = test;
    state.isRegressionTest = testId.startsWith('reg_');
    state.currentModule = MODULE_ORDER[0];
    state.currentQuestionIdx = 0;
    state.answers = {};
    state.marked = new Set();

    // For regression tests, skip to math1 directly
    if (state.isRegressionTest) {
      state.currentModule = 'math1';
    }

    showTestInterface();
  }

  function showTestInterface() {
    navigate('test');
    document.getElementById('page-test').classList.add('active');
    document.getElementById('module-transition').style.display = 'none';

    // Show Desmos toggle for math modules
    const desmosBtn = document.getElementById('btn-toggle-desmos');
    const config = MODULE_CONFIG[state.currentModule];
    if (desmosBtn) {
      desmosBtn.style.display = (config.section === 'math') ? 'block' : 'none';
    }

    document.getElementById('test-module-label').textContent = config.label;

    state.timeLeft = config.time;
    startTimer();
    renderQuestion();
    renderQuestionMap();
  }

  function startTimer() {
    clearInterval(state.timer);
    updateTimerDisplay();
    state.timer = setInterval(() => {
      state.timeLeft--;
      updateTimerDisplay();
      if (state.timeLeft % 30 === 0) saveTestProgress();
      if (state.timeLeft <= 0) {
        clearInterval(state.timer);
        autoAdvanceModule();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const m = Math.floor(state.timeLeft / 60);
    const s = state.timeLeft % 60;
    const el = document.getElementById('test-timer');
    el.textContent = `${m}:${s.toString().padStart(2, '0')}`;
    el.classList.toggle('warning', state.timeLeft < 300);
  }

  function getModuleQuestions() {
    return state.currentTest.modules[state.currentModule] || [];
  }

  function renderQuestion() {
    const questions = getModuleQuestions();
    const q = questions[state.currentQuestionIdx];
    if (!q) return;

    const container = document.getElementById('question-container');
    const saved = state.answers[q.id];
    const isMarked = state.marked.has(q.id);

    // Update UI
    document.getElementById('progress-text').textContent = `${state.currentQuestionIdx + 1} / ${questions.length}`;
    document.getElementById('test-progress-fill').style.width =
      ((state.currentQuestionIdx + 1) / questions.length * 100) + '%';

    document.getElementById('btn-mark').textContent = isMarked ? '⚑ Unmark' : '⚑ Mark for Review';
    document.getElementById('btn-prev').disabled = state.currentQuestionIdx === 0;
    document.getElementById('btn-next').textContent =
      state.currentQuestionIdx === questions.length - 1 ? 'Finish Module ▸' : 'Next →';

    let html = '';

    // Passage
    if (q.passage) {
      html += `<div class="q-passage">${q.passage.replace(/\n/g, '<br>')}</div>`;
    }

    // Stem
    html += `<div class="q-stem">${q.questionNumber}. ${q.stem}</div>`;

    // Choices or grid-in
    if (q.type === 'gridin' || !q.choices) {
      html += `
        <div class="gridin-input">
          <label>Answer:</label>
          <input type="text" id="gridin-answer" value="${saved || ''}"
            placeholder="Your answer" autocomplete="off"
            onchange="App.saveGridin('${q.id}', this.value)">
        </div>
      `;
    } else {
      html += '<div class="q-choices">';
      q.choices.forEach((choice, i) => {
        const letter = choice.charAt(0);
        const isSelected = saved === letter;
        html += `
          <div class="q-choice ${isSelected ? 'selected' : ''}"
            onclick="App.selectChoice('${q.id}', '${letter}', this)" tabindex="0"
            onkeydown="if(event.key==='Enter'||event.key===' ')App.selectChoice('${q.id}','${letter}',this)">
            <div class="choice-letter">${letter}</div>
            <div>${choice.substring(choice.indexOf(')') + 2)}</div>
          </div>
        `;
      });
      html += '</div>';
    }

    container.innerHTML = html;

    // Add feedback area and check button for regression questions
    const navExtra = document.getElementById('test-nav-extra');
    const existingBtn = navExtra?.querySelector('.btn-check-reg');
    if (q.desmosTutorial) {
      container.innerHTML += `<div id="regression-feedback" class="regression-tutorial" style="display:none"></div>`;
      if (navExtra && !existingBtn) {
        const checkBtn = document.createElement('button');
        checkBtn.className = 'btn btn-success btn-check-reg';
        checkBtn.textContent = '✓ Check Answer';
        checkBtn.onclick = checkRegressionAnswer;
        navExtra.appendChild(checkBtn);
      }
    } else if (existingBtn) {
      existingBtn.remove();
    }

    renderQuestionMap();
  }

  function selectChoice(qId, letter, el) {
    state.answers[qId] = letter;
    document.querySelectorAll('.q-choice').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    renderQuestionMap();
  }

  function saveGridin(qId, value) {
    state.answers[qId] = value.trim();
    renderQuestionMap();

    // Auto-check regression questions on change
    if (state.isRegressionTest) {
      checkRegressionAnswer();
    }
  }

  function checkRegressionAnswer() {
    const questions = getModuleQuestions();
    const q = questions[state.currentQuestionIdx];
    if (!q || !q.desmosTutorial) return;

    const userAns = state.answers[q.id];
    if (!userAns || userAns === '') return;

    const isCorrect = checkAnswer(q, userAns);
    const feedback = document.getElementById('regression-feedback');
    if (!feedback) return;

    if (isCorrect) {
      feedback.style.display = 'block';
      feedback.innerHTML = `
        <h4 style="color:var(--green)">✅ Correct!</h4>
        <p style="color:var(--text-secondary)">${q.explanation}</p>
      `;
    } else {
      const tut = q.desmosTutorial;
      feedback.style.display = 'block';
      feedback.innerHTML = `
        <h4>❌ Not quite — here's how to do it in Desmos:</h4>
        <p style="font-weight:600;margin-bottom:12px">${tut.title}</p>
        ${tut.steps.map((s, i) => `
          <div class="tutorial-step">
            <div class="step-num">${i + 1}</div>
            <div class="step-text">${s}</div>
          </div>
        `).join('')}
        <div style="margin-top:12px;padding:10px;background:var(--bg-card);border-radius:var(--radius-sm);border:1px solid var(--border)">
          <strong>Correct answer:</strong> ${q.answer}<br>
          <span style="color:var(--text-secondary)">${q.explanation}</span>
        </div>
      `;
    }
  }

  function nextQuestion() {
    const questions = getModuleQuestions();
    if (state.currentQuestionIdx < questions.length - 1) {
      state.currentQuestionIdx++;
      renderQuestion();
    } else {
      // End of module
      clearInterval(state.timer);
      if (state.isRegressionTest) {
        // Regression tests: just submit directly
        submitTest();
      } else {
        const moduleIdx = MODULE_ORDER.indexOf(state.currentModule);
        if (moduleIdx < MODULE_ORDER.length - 1) {
          showModuleTransition(moduleIdx + 1);
        } else {
          showSubmitModal();
        }
      }
    }
  }

  function prevQuestion() {
    if (state.currentQuestionIdx > 0) {
      state.currentQuestionIdx--;
      renderQuestion();
    }
  }

  function toggleMark() {
    const questions = getModuleQuestions();
    const qId = questions[state.currentQuestionIdx]?.id;
    if (!qId) return;
    if (state.marked.has(qId)) state.marked.delete(qId);
    else state.marked.add(qId);
    renderQuestion();
  }

  function renderQuestionMap() {
    const questions = getModuleQuestions();
    const map = document.getElementById('question-map');
    map.innerHTML = questions.map((q, i) => {
      let cls = '';
      if (i === state.currentQuestionIdx) cls = 'current';
      else if (state.marked.has(q.id)) cls = 'marked';
      else if (state.answers[q.id] !== undefined && state.answers[q.id] !== '') cls = 'answered';
      return `<button class="qmap-btn ${cls}" onclick="App.jumpToQuestion(${i})">${i + 1}</button>`;
    }).join('');
  }

  function jumpToQuestion(idx) {
    state.currentQuestionIdx = idx;
    renderQuestion();
  }

  function autoAdvanceModule() {
    const moduleIdx = MODULE_ORDER.indexOf(state.currentModule);
    if (moduleIdx < MODULE_ORDER.length - 1) {
      showModuleTransition(moduleIdx + 1);
    } else {
      showSubmitModal();
    }
  }

  function showModuleTransition(nextIdx) {
    const nextModule = MODULE_ORDER[nextIdx];
    const config = MODULE_CONFIG[nextModule];
    const isBreak = nextIdx === 2; // Break between RW and Math

    document.getElementById('transition-title').textContent = isBreak ? '☕ Break Time' : 'Module Complete';
    document.getElementById('transition-desc').textContent = isBreak
      ? 'Take a 10-minute break before starting the Math section.'
      : `Ready to begin ${config.label}?`;
    document.getElementById('module-transition').style.display = 'flex';
    state._nextModuleIdx = nextIdx;
  }

  function continueModule() {
    state.currentModule = MODULE_ORDER[state._nextModuleIdx];
    state.currentQuestionIdx = 0;
    document.getElementById('module-transition').style.display = 'none';
    showTestInterface();
  }

  function showSubmitModal() {
    const questions = getModuleQuestions();
    const answered = Object.keys(state.answers).length;
    const total = getAllQuestions().length;
    document.getElementById('submit-summary').textContent =
      `You have answered ${answered} of ${total} questions. Are you sure you want to submit?`;
    document.getElementById('submit-modal').style.display = 'flex';
  }

  function exitTest() {
    if (confirm('Are you sure you want to exit? Your progress will be lost. Use Save & Exit to keep your progress.')) {
      clearInterval(state.timer);
      clearSavedTest();
      state.currentTest = null;
      navigate('tests');
    }
  }

  function saveAndExit() {
    saveTestProgress();
    clearInterval(state.timer);
    state.currentTest = null;
    navigate('dashboard');
  }

  function resumeSavedTest() {
    if (!state.savedTest) return;
    const tests = getAllTests();
    const test = tests.find(t => t.id === state.savedTest.testId);
    if (!test) { clearSavedTest(); return; }

    state.currentTest = test;
    state.currentModule = state.savedTest.currentModule;
    state.currentQuestionIdx = state.savedTest.currentQuestionIdx;
    state.answers = state.savedTest.answers || {};
    state.marked = new Set(state.savedTest.marked || []);
    state.timeLeft = state.savedTest.timeLeft;

    clearSavedTest();
    showTestInterface();
  }

  function discardSavedTest() {
    clearSavedTest();
    renderDashboard();
    renderTests();
  }

  function getAllTests() {
    const base = window.SAT_TESTS || [];
    const extra = window.SAT_TESTS_EXTRA || [];
    const regression = window.REGRESSION_TESTS || [];
    return [...base, ...extra, ...regression];
  }

  function getAllQuestions() {
    if (!state.currentTest) return [];
    return MODULE_ORDER.flatMap(m => state.currentTest.modules[m] || []);
  }

  function submitTest() {
    document.getElementById('submit-modal').style.display = 'none';
    clearInterval(state.timer);

    const allQuestions = getAllQuestions();
    let rwCorrect = 0, rwTotal = 0, mathCorrect = 0, mathTotal = 0;
    const skillScores = {};

    allQuestions.forEach(q => {
      const section = MODULE_CONFIG[q.module]?.section || 'rw';
      const isCorrect = checkAnswer(q, state.answers[q.id]);

      if (section === 'rw') { rwTotal++; if (isCorrect) rwCorrect++; }
      else { mathTotal++; if (isCorrect) mathCorrect++; }

      if (q.skill) {
        if (!skillScores[q.skill]) skillScores[q.skill] = { correct: 0, total: 0 };
        skillScores[q.skill].total++;
        if (isCorrect) skillScores[q.skill].correct++;
      }
    });

    const rwScore = rawToScore(rwCorrect, rwTotal, 'rw');
    const mathScore = rawToScore(mathCorrect, mathTotal, 'math');
    const totalScore = rwScore + mathScore;

    const result = {
      testId: state.currentTest.id,
      date: new Date().toISOString(),
      answers: { ...state.answers },
      marked: [...state.marked],
      rwCorrect, rwTotal, mathCorrect, mathTotal,
      rwScore, mathScore, totalScore,
      skills: skillScores,
      moduleResults: {}
    };

    // Per-module results
    MODULE_ORDER.forEach(m => {
      const qs = state.currentTest.modules[m] || [];
      let correct = 0;
      qs.forEach(q => { if (checkAnswer(q, state.answers[q.id])) correct++; });
      result.moduleResults[m] = { correct, total: qs.length };
    });

    state.testHistory.push(result);
    saveState();

    // Show results
    state._lastResult = result;
    navigate('results');
  }

  function checkAnswer(q, userAnswer) {
    if (userAnswer === undefined || userAnswer === '' || userAnswer === null) return false;
    if (q.type === 'gridin') {
      // Normalize numeric answers
      const normalize = s => String(s).replace(/\s/g, '').replace(/^0+/, '') || '0';
      return normalize(userAnswer) === normalize(q.answer);
    }
    return String(userAnswer).toUpperCase().charAt(0) === String(q.answer).toUpperCase().charAt(0);
  }

  // ===== RESULTS =====
  function viewResults(testId) {
    const result = state.testHistory.find(h => h.testId === testId);
    if (result) {
      state._lastResult = result;
      // Need to load the test for question details
      const tests = getAllTests();
      state.currentTest = tests.find(t => t.id === testId);
      navigate('results');
    }
  }

  function renderResults() {
    const result = state._lastResult;
    if (!result) {
      document.getElementById('results-subtitle').textContent = 'No results to display.';
      return;
    }

    const tests = getAllTests();
    if (!state.currentTest) state.currentTest = tests.find(t => t.id === result.testId);

    document.getElementById('results-subtitle').textContent =
      `${getTestName(result.testId)} — ${new Date(result.date).toLocaleDateString()}`;

    // Score circles
    clearSavedTest();
    animateScore('total-score-value', 'total-score-ring', result.totalScore, 1600);
    animateScore('rw-score-value', 'rw-score-ring', result.rwScore, 800);
    animateScore('math-score-value', 'math-score-ring', result.mathScore, 800);

    // Skill breakdown
    renderSkillBreakdown(result.skills);

    // Strengths & weaknesses
    renderStrengthsWeaknesses(result.skills);

    // Review list
    renderReviewList();

    // Recommendations
    renderResultRecommendations(result);
  }

  function animateScore(valueId, ringId, score, max) {
    document.getElementById(valueId).textContent = score;
    const ring = document.getElementById(ringId);
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (score / max) * circumference;
    setTimeout(() => { ring.style.strokeDashoffset = offset; }, 100);
  }

  function renderSkillBreakdown(skills) {
    const container = document.getElementById('skill-breakdown');
    const colors = {
      'Words in Context': 'var(--blue)',
      'Command of Evidence': 'var(--accent)',
      'Expression of Ideas': 'var(--purple)',
      'Standard English Conventions': 'var(--orange)',
      'Algebra': 'var(--green)',
      'Advanced Math': 'var(--red)',
      'Problem Solving and Data Analysis': 'var(--yellow)',
      'Geometry and Trigonometry': 'var(--blue)'
    };

    container.innerHTML = Object.entries(skills).map(([skill, data]) => {
      const pct = Math.round((data.correct / data.total) * 100);
      const color = colors[skill] || 'var(--accent)';
      return `
        <div class="skill-bar-row">
          <div class="skill-bar-label">${skill}</div>
          <div class="skill-bar-track">
            <div class="skill-bar-fill" style="width:${pct}%;background:${color}"></div>
          </div>
          <div class="skill-bar-value">${pct}%</div>
        </div>
      `;
    }).join('');
  }

  function renderStrengthsWeaknesses(skills) {
    const entries = Object.entries(skills).map(([skill, data]) => ({
      skill,
      pct: data.correct / data.total
    })).sort((a, b) => b.pct - a.pct);

    const strong = entries.filter(e => e.pct >= 0.7);
    const weak = entries.filter(e => e.pct < 0.5);

    document.getElementById('strengths-list').innerHTML = strong.length > 0
      ? strong.map(e => `<span class="tag strength">${e.skill} (${Math.round(e.pct * 100)}%)</span>`).join('')
      : '<span class="tag weakness">Keep practicing to build strengths</span>';

    document.getElementById('weaknesses-list').innerHTML = weak.length > 0
      ? weak.map(e => `<span class="tag weakness">${e.skill} (${Math.round(e.pct * 100)}%)</span>`).join('')
      : '<span class="tag strength">Great job! No weak areas identified.</span>';
  }

  function renderReviewList() {
    const result = state._lastResult;
    if (!result || !state.currentTest) return;

    const allQuestions = getAllQuestions();
    const sectionFilter = document.getElementById('review-section-filter')?.value || 'all';
    const resultFilter = document.getElementById('review-result-filter')?.value || 'all';
    const diffFilter = document.getElementById('review-difficulty-filter')?.value || 'all';

    const filtered = allQuestions.filter(q => {
      const section = MODULE_CONFIG[q.module]?.section || 'rw';
      if (sectionFilter === 'rw' && section !== 'rw') return false;
      if (sectionFilter === 'math' && section !== 'math') return false;

      const isCorrect = checkAnswer(q, result.answers[q.id]);
      const isMarked = result.marked?.includes(q.id);
      const userAns = result.answers[q.id];
      const isSkipped = userAns === undefined || userAns === '';

      if (resultFilter === 'correct' && !isCorrect) return false;
      if (resultFilter === 'incorrect' && (isCorrect || isSkipped)) return false;
      if (resultFilter === 'marked' && !isMarked) return false;

      if (diffFilter !== 'all' && q.difficulty !== diffFilter) return false;

      return true;
    });

    const container = document.getElementById('review-list');
    container.innerHTML = filtered.map((q, i) => {
      const userAns = result.answers[q.id];
      const isCorrect = checkAnswer(q, userAns);
      const isSkipped = userAns === undefined || userAns === '';
      const status = isSkipped ? 'skipped' : (isCorrect ? 'correct' : 'incorrect');
      const statusIcon = isSkipped ? '⊘' : (isCorrect ? '✓' : '✗');

      return `
        <div class="review-item">
          <div class="review-item-header" onclick="this.nextElementSibling.classList.toggle('open')">
            <div class="review-qnum ${status}">${statusIcon}</div>
            <div class="review-item-info">
              <div>Q${q.questionNumber} · ${q.skill || q.type}</div>
              <div class="review-item-skill">${MODULE_CONFIG[q.module]?.label || q.module}</div>
            </div>
            <div class="review-item-expand">▼</div>
          </div>
          <div class="review-item-body">
            ${q.passage ? `<div class="q-passage" style="max-height:200px;margin-bottom:12px">${q.passage.replace(/\n/g, '<br>')}</div>` : ''}
            <div style="margin-bottom:12px"><strong>${q.stem}</strong></div>
            ${q.choices ? q.choices.map(c => {
              const letter = c.charAt(0);
              let style = '';
              if (letter === q.answer) style = 'color:var(--green);font-weight:700';
              else if (letter === userAns && !isCorrect) style = 'color:var(--red);text-decoration:line-through';
              return `<div style="${style};margin-bottom:4px">${c}</div>`;
            }).join('') : ''}
            <div class="review-your-answer" style="margin-top:12px">
              Your answer: <strong>${isSkipped ? 'Skipped' : userAns}</strong>
            </div>
            <div class="review-correct-answer">Correct answer: ${q.answer}</div>
            <div class="review-explanation">${q.explanation}</div>
            ${q.desmosTutorial && !isCorrect && !isSkipped ? `
              <div class="regression-tutorial" style="margin-top:12px">
                <h4>📐 How to do this in Desmos:</h4>
                <p style="font-weight:600;margin-bottom:8px">${q.desmosTutorial.title}</p>
                ${q.desmosTutorial.steps.map((s, i) => `
                  <div class="tutorial-step">
                    <div class="step-num">${i + 1}</div>
                    <div class="step-text">${s}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('') || '<div class="empty-state">No questions match the selected filters.</div>';
  }

  function renderResultRecommendations(result) {
    const container = document.getElementById('result-recommendations');
    const skills = result.skills;
    const weakSkills = Object.entries(skills)
      .filter(([_, d]) => d.correct / d.total < 0.6)
      .sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total));

    if (weakSkills.length === 0) {
      container.innerHTML = '<p style="color:var(--green)">🎉 Excellent work! Keep practicing to maintain your high scores.</p>';
      return;
    }

    const tips = {
      'Words in Context': 'Read widely and practice vocabulary in context. Focus on how words carry different meanings in different passages.',
      'Command of Evidence': 'Practice identifying the main purpose and function of sentences in passages. Look for how evidence supports claims.',
      'Expression of Ideas': 'Work on understanding transitions between ideas. Practice connecting sentences logically.',
      'Standard English Conventions': 'Review grammar rules: subject-verb agreement, punctuation, pronoun usage, and verb tenses.',
      'Algebra': 'Practice solving linear equations, systems of equations, and inequalities. Focus on translating word problems to equations.',
      'Advanced Math': 'Work on quadratics, polynomials, exponential functions, and factoring.',
      'Problem Solving and Data Analysis': 'Practice interpreting graphs, tables, and statistics. Focus on mean, median, and proportional reasoning.',
      'Geometry and Trigonometry': 'Review circle equations, triangle properties, area/volume formulas, and basic trig ratios.'
    };

    container.innerHTML = weakSkills.map(([skill, data]) => {
      const pct = Math.round((data.correct / data.total) * 100);
      return `
        <div class="rec-card">
          <span class="rec-priority high">Priority</span>
          <h4>${skill} — ${pct}% correct</h4>
          <p>${tips[skill] || 'Focus extra practice time on this skill area.'}</p>
        </div>
      `;
    }).join('');
  }

  // ===== ANALYTICS =====
  function predictScore() {
    const history = state.testHistory;
    if (history.length === 0) return 0;

    // Weighted average favoring recent tests
    let totalWeight = 0;
    let weightedRW = 0;
    let weightedMath = 0;

    history.forEach((h, i) => {
      const weight = i + 1; // More recent = higher weight
      weightedRW += h.rwScore * weight;
      weightedMath += h.mathScore * weight;
      totalWeight += weight;
    });

    return Math.round((weightedRW + weightedMath) / totalWeight);
  }

  function renderAnalytics() {
    const history = state.testHistory;
    const predicted = predictScore();

    document.getElementById('pred-main-score').textContent = predicted || '—';
    if (history.length > 0) {
      const rwPred = Math.round(history.reduce((s, h, i) => s + h.rwScore * (i + 1), 0) /
        history.reduce((s, _, i) => s + i + 1, 0));
      const mathPred = Math.round(history.reduce((s, h, i) => s + h.mathScore * (i + 1), 0) /
        history.reduce((s, _, i) => s + i + 1, 0));
      const margin = Math.max(30, 100 - history.length * 15);
      document.getElementById('pred-range').textContent =
        `Estimated range: ${predicted - margin} – ${predicted + margin} · R&W: ~${rwPred} · Math: ~${mathPred}`;
    } else {
      document.getElementById('pred-range').textContent = 'Take tests to get a prediction';
    }

    // Target tracking
    const targetEl = document.getElementById('target-tracking');
    if (history.length > 0) {
      const onTrack = predicted >= state.targetScore;
      targetEl.innerHTML = `
        <div style="font-size:18px;margin-bottom:12px">
          ${onTrack ? '✅' : '⚠️'} You're ${onTrack ? 'on track' : 'below'} your target of <strong>${state.targetScore}</strong>
        </div>
        <div style="color:var(--text-secondary)">
          ${onTrack
            ? `Your predicted score of ${predicted} exceeds your target. Keep up the great work!`
            : `You need to improve by about ${state.targetScore - predicted} points. Focus on your weak areas in the Study Plan.`}
        </div>
      `;
    }

    // Charts (simple canvas charts)
    if (history.length > 0) {
      drawLineChart('chart-total', history.map(h => h.totalScore), 'Total Score', 'var(--accent)');
      drawLineChart('chart-rw', history.map(h => h.rwScore), 'R&W Score', 'var(--blue)');
      drawLineChart('chart-math', history.map(h => h.mathScore), 'Math Score', 'var(--green)');
    }
  }

  function drawLineChart(canvasId, data, label, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const padding = { top: 30, right: 20, bottom: 30, left: 50 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    ctx.clearRect(0, 0, w, h);

    if (data.length < 2) {
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-muted');
      ctx.font = '14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Take more tests to see trends', w / 2, h / 2);
      return;
    }

    const minVal = Math.min(...data) - 50;
    const maxVal = Math.max(...data) + 50;

    // Grid lines
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border');
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();

      const val = Math.round(maxVal - ((maxVal - minVal) / 4) * i);
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-muted');
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(val, padding.left - 8, y + 4);
    }

    // X labels
    ctx.textAlign = 'center';
    data.forEach((_, i) => {
      const x = padding.left + (chartW / (data.length - 1)) * i;
      ctx.fillText(`Test ${i + 1}`, x, h - 8);
    });

    // Line
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    data.forEach((val, i) => {
      const x = padding.left + (chartW / (data.length - 1)) * i;
      const y = padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Dots
    data.forEach((val, i) => {
      const x = padding.left + (chartW / (data.length - 1)) * i;
      const y = padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text');
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(val, x, y - 12);
    });
  }

  // ===== RECOMMENDATIONS =====
  function renderRecommendations() {
    const container = document.getElementById('study-recommendations');
    const history = state.testHistory;

    if (history.length === 0) {
      container.innerHTML = `
        <div class="card">
          <h3>📝 Take Your First Test</h3>
          <p>Complete a practice test to get personalized study recommendations.</p>
          <button class="btn btn-primary" onclick="App.navigate('tests')">Start a Test</button>
        </div>
      `;
      return;
    }

    // Aggregate skills
    const allSkills = {};
    history.forEach(h => {
      Object.entries(h.skills).forEach(([skill, data]) => {
        if (!allSkills[skill]) allSkills[skill] = { correct: 0, total: 0 };
        allSkills[skill].correct += data.correct;
        allSkills[skill].total += data.total;
      });
    });

    const tips = {
      'Words in Context': { priority: 'high', tip: 'Build vocabulary through extensive reading. Practice identifying how word choice affects meaning and tone in passages.' },
      'Command of Evidence': { priority: 'high', tip: 'Practice finding textual evidence that supports claims. Focus on understanding what makes evidence strong or weak.' },
      'Expression of Ideas': { priority: 'medium', tip: 'Work on paragraph organization and transitions. Practice combining sentences effectively.' },
      'Standard English Conventions': { priority: 'medium', tip: 'Review comma rules, semicolons, subject-verb agreement, pronoun clarity, and parallel structure.' },
      'Algebra': { priority: 'high', tip: 'Master linear equations, inequalities, and systems of equations. Practice translating word problems.' },
      'Advanced Math': { priority: 'high', tip: 'Focus on quadratics (vertex form, factoring), polynomial operations, and exponential growth/decay.' },
      'Problem Solving and Data Analysis': { priority: 'medium', tip: 'Practice interpreting scatterplots, two-way tables, and calculating percentages, ratios, and rates.' },
      'Geometry and Trigonometry': { priority: 'medium', tip: 'Review circle equations, triangle congruence/similarity, volume formulas, and SOH-CAH-TOA.' }
    };

    let html = '';

    // Predicted score card
    const predicted = predictScore();
    html += `
      <div class="card">
        <h3>📊 Your Predicted Score</h3>
        <div style="font-size:36px;font-weight:800;color:var(--accent);margin-bottom:8px">${predicted}</div>
        <p>Based on ${history.length} completed test${history.length > 1 ? 's' : ''}.</p>
      </div>
    `;

    // Skill recommendations
    const sorted = Object.entries(allSkills)
      .map(([skill, data]) => ({ skill, pct: data.correct / data.total }))
      .sort((a, b) => a.pct - b.pct);

    sorted.forEach(({ skill, pct }) => {
      const info = tips[skill] || { priority: 'medium', tip: 'Keep practicing.' };
      const pctDisplay = Math.round(pct * 100);
      html += `
        <div class="rec-card">
          <span class="rec-priority ${pct < 0.5 ? 'high' : pct < 0.7 ? 'medium' : 'low'}">
            ${pct < 0.5 ? 'Needs Focus' : pct < 0.7 ? 'Practice More' : 'On Track'}
          </span>
          <h4>${skill} — ${pctDisplay}%</h4>
          <p>${info.tip}</p>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // ===== DESMOS =====
  function initDesmos() {
    if (state.desmosCalc || typeof Desmos === 'undefined') return;
    try {
      const el = document.getElementById('desmos-calculator');
      if (el) {
        state.desmosCalc = Desmos.calculator(el, { keypad: true, expressions: true, settingsMenu: true });
      }
    } catch (e) { console.warn('Desmos init failed:', e); }
  }

  function initDesmosPractice() {
    if (state.desmosPracticeCalc || typeof Desmos === 'undefined') return;
    try {
      const el = document.getElementById('desmos-practice-calc');
      if (el) {
        state.desmosPracticeCalc = Desmos.calculator(el, { keypad: true, expressions: true, settingsMenu: true });
      }
    } catch (e) { console.warn('Desmos practice init failed:', e); }
  }

  function toggleDesmos() {
    const panel = document.getElementById('desmos-panel');
    const btn = document.getElementById('btn-toggle-desmos');
    if (!panel) return;

    if (state.desmosOpen) {
      panel.style.display = 'none';
      state.desmosOpen = false;
      btn.textContent = '📊 Calculator';
      btn.classList.remove('open');
    } else {
      panel.style.display = 'flex';
      state.desmosOpen = true;
      btn.textContent = '✕ Close';
      btn.classList.add('open');
      initDesmos();
      if (state.desmosCalc) state.desmosCalc.resize();
    }
  }

  // ===== REGRESSION PAGE =====
  function renderRegressionPage() {
    const tests = window.REGRESSION_TESTS || [];
    const container = document.getElementById('regression-test-list');
    if (!container) return;

    initDesmosPractice();
    if (state.desmosPracticeCalc) state.desmosPracticeCalc.resize();

    container.innerHTML = tests.map(test => {
      const history = state.testHistory.filter(h => h.testId === test.id);
      const lastAttempt = history.length > 0 ? history[history.length - 1] : null;
      const totalQ = test.modules.rw1.length + test.modules.rw2.length + test.modules.math1.length + test.modules.math2.length;

      return `\n        <div class="test-card" onclick="App.startTest('${test.id}')">
          <div class="test-card-header">
            <div class="test-card-title">${test.name}</div>
            <span class="test-card-badge">${test.badge || 'New'}</span>
          </div>
          <div class="test-card-desc">${test.description}</div>
          <div class="test-card-meta">
            <span>📝 ${totalQ} questions</span>
            <span>⏱ ~15 min</span>
            <span>💡 Desmos help included</span>
          </div>
          ${lastAttempt ? `
            <div class="test-card-scores">
              <span class="test-score-mini math">Score: ${lastAttempt.mathCorrect}/${lastAttempt.mathTotal}</span>
            </div>
          ` : ''}
          <button class="btn btn-primary btn-sm">${lastAttempt ? 'Retake' : 'Start Practice'}</button>
        </div>
      `;
    }).join('');
  }

  // ===== PUBLIC API =====
  return {
    init,
    navigate,
    startTest,
    selectChoice,
    saveGridin,
    jumpToQuestion,
    viewResults,
    checkRegressionAnswer
  };
})();

// Boot
document.addEventListener('DOMContentLoaded', App.init);
