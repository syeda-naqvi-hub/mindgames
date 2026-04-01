// Professional Quiz Engine
class QuizApp {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.timer = 30;
        this.timerInterval = null;
        this.highScore = localStorage.getItem('quizHighScore') || 0;
        this.questions = [];
        this.maxQuestions = 10;
        this.category = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.showScreen('welcome');
        this.updateHighScore();
        document.getElementById('highscore').textContent = this.highScore;
    }

    bindEvents() {
        document.getElementById('quick-play-btn')?.addEventListener('click', () => this.startQuickPlay());
        document.body.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-card')) {
                this.selectCategory(e.target.dataset.category);
            }
        });
        document.getElementById('restart-btn')?.addEventListener('click', () => this.restartQuiz());
        document.getElementById('share-btn')?.addEventListener('click', () => this.shareScore());
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
        document.getElementById(screenId + '-screen')?.classList.add('active');
    }

    startQuickPlay() {
        this.category = 'mixed';
        this.loadQuestions();
        this.showScreen('quiz');
        this.startQuestion();
    }

    selectCategory(categoryId) {
        this.category = categoryId;
        this.loadQuestions();
        this.showScreen('quiz');
        this.startQuestion();
    }

    loadQuestions() {
        if (this.category === 'mixed') {
            const allQuestions = [];
            Object.values(quizData.questions).forEach(cat => allQuestions.push(...cat));
            this.questions = this.shuffle(allQuestions).slice(0, this.maxQuestions);
        } else {
            this.questions = this.shuffle(quizData.questions[this.category]).slice(0, this.maxQuestions);
        }
        this.currentQuestion = 0;
        this.score = 0;
    }

    startQuestion() {
        this.updateScoreDisplay();
        this.updateQuestionCounter();
        this.showQuestion();
        this.startTimer();
    }

    showQuestion() {
        const q = this.questions[this.currentQuestion];
        document.getElementById('question-container').innerHTML = `
            <div class="question-text">${q.question}</div>
            <div class="options-grid">
                ${q.options.map((opt, i) => 
                    `<button class="option-btn" data-answer="${i}">${opt}</button>`
                ).join('')}
            </div>
        `;
        
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.onclick = () => this.selectAnswer(parseInt(btn.dataset.answer));
        });
    }

    selectAnswer(selected) {
        this.stopTimer();
        const correct = this.questions[this.currentQuestion].correct;
        const buttons = document.querySelectorAll('.option-btn');
        
        buttons.forEach((btn, i) => {
            btn.style.pointerEvents = 'none';
            if (i === correct) {
                btn.classList.add('correct');
            } else if (i === selected) {
                btn.classList.add('wrong');
            }
        });

        setTimeout(() => {
            if (selected === correct) {
                this.score++;
            }
            this.nextQuestion();
        }, 1500);
    }

    nextQuestion() {
        this.currentQuestion++;
        if (this.currentQuestion < this.questions.length) {
            this.startQuestion();
        } else {
            this.showResults();
        }
    }

    startTimer() {
        this.timer = 30;
        this.updateTimerDisplay();
        this.timerInterval = setInterval(() => {
            this.timer--;
            this.updateTimerDisplay();
            if (this.timer <= 0) {
                this.selectAnswer(-1); // Time up
            }
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
    }

    updateTimerDisplay() {
        document.getElementById('timer-text').textContent = this.timer;
        const percent = ((30 - this.timer) / 30) * 100;
        document.getElementById('timer-circle').style.setProperty('--timer-percent', `${percent}%`);
    }

    updateScoreDisplay() {
        document.getElementById('score-display').textContent = `Score: ${this.score}`;
    }

    updateQuestionCounter() {
        document.getElementById('question-counter').textContent = `Q${this.currentQuestion + 1}/${this.questions.length}`;
    }

    updateHighScore() {
        document.getElementById('highscore').textContent = this.highScore;
    }

    showResults() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        this.checkHighScore(percentage);
        
        let message = '';
        let title = '';
        if (percentage >= 90) {
            title = '🏆 Quiz Master!';
            message = "Perfect! You're a genius! 🔥";
        } else if (percentage >= 70) {
            title = '⭐ Excellent!';
            message = "Great job! Well above average! 👏";
        } else if (percentage >= 50) {
            title = '✅ Good Work!';
            message = "Nice effort! Keep learning! 📚";
        } else {
            title = '💪 Keep Practicing!';
            message = "Every master was once a beginner! Try again!";
        }

        document.getElementById('results-title').textContent = title;
        document.getElementById('final-score-text').textContent = `${this.score}/${this.questions.length}`;
        document.getElementById('results-message').textContent = message;
        
        const scorePercent = (this.score / this.questions.length) * 100;
        document.getElementById('score-fill').style.width = scorePercent + '%';
        
        this.showScreen('results');
        this.playConfetti();
    }

    checkHighScore(percentage) {
        if (percentage > this.highScore) {
            this.highScore = percentage;
            localStorage.setItem('quizHighScore', this.highScore);
            this.updateHighScore();
        }
    }

    restartQuiz() {
        this.showScreen('welcome');
    }

    shareScore() {
        const text = `I scored ${this.score}/${this.questions.length} on MindPlay Quiz! 🧠 ${window.location.origin + '/pages/quiz.html'}`;
        if (navigator.share) {
            navigator.share({ title: 'MindPlay Quiz', text, url: window.location.href });
        } else {
            navigator.clipboard.writeText(text).then(() => {
                alert('Score copied to clipboard! 📋');
            });
        }
    }

    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    playConfetti() {
        // Simple canvas confetti
        const canvas = document.querySelector('.confetti');
        canvas.innerHTML = '';
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Confetti particles animation (simplified)
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                ctx.fillStyle = `hsl(${Math.random()*360}, 70%, 60%)`;
                ctx.fillRect(Math.random()*canvas.width, 0, 4, 8);
            }, i * 20);
        }
        setTimeout(() => canvas.classList.add('fade-out'), 3000);
    }
}

// Initialize when DOM loaded
let quiz;
document.addEventListener('DOMContentLoaded', () => {
    quiz = new QuizApp();
    
    // Load category buttons
    const grid = document.getElementById('category-grid');
    quizData.categories.forEach(cat => {
        grid.innerHTML += `
            <div class="category-card" data-category="${cat.id}" style="border-top: 5px solid ${cat.color}">

                <div class="category-icon" style="color: ${cat.color}">📚</div>

                <h3>${cat.name}</h3>
                <p>${Object.keys(quizData.questions[cat.id] || []).length}+ Questions</p>
            </div>
        `;
    });
});

