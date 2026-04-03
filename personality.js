// Professional MBTI Personality Test Engine
class PersonalityTest {
    constructor() {
        this.currentQuestion = 0;
        this.answers = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        this.personalityType = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.showScreen('welcome');
    }

    bindEvents() {
        document.getElementById('start-test-btn')?.addEventListener('click', () => this.startTest());
        document.getElementById('retake-btn')?.addEventListener('click', () => this.restartTest());
        document.getElementById('share-result-btn')?.addEventListener('click', () => this.shareResults());
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
        document.getElementById(screenId + '-screen')?.classList.add('active');
    }

    startTest() {
        this.currentQuestion = 0;
        this.answers = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        this.showScreen('questions');
        this.showCurrentQuestion();
    }

    showCurrentQuestion() {
        const question = personalityData.questions[this.currentQuestion];
        const dimensionIndex = Math.floor(this.currentQuestion / 6); // 0=EI, 1=SN, 2=TF, 3=JP
        const dimensions = ['E/I', 'S/N', 'T/F', 'J/P'];
        
        document.getElementById('question-counter').textContent = `Q${this.currentQuestion + 1}/24`;
        document.getElementById('dimension-display').textContent = dimensions[dimensionIndex];

        document.getElementById('question-container').innerHTML = `
            <div class="question-text">${question.text}</div>
            <div class="scale-container">
                <span class="scale-label">Strongly Disagree</span>
                ${[1,2,3,4,5].map(n => 
                    `<button class="scale-btn" data-value="${n}">${n}</button>`
                ).join('')}
                <span class="scale-label">Strongly Agree</span>
            </div>
        `;

        document.querySelectorAll('.scale-btn').forEach(btn => {
            btn.onclick = () => this.selectAnswer(parseInt(btn.dataset.value), question.id);
        });
    }

    selectAnswer(value, dimension) {
        // 1-3 = opposite of dimension, 4-5 = dimension preference
        if (value >= 4) {
            this.answers[dimension]++;
        } else {
            const opposite = dimension === 'E' ? 'I' : 
                           dimension === 'I' ? 'E' :
                           dimension === 'S' ? 'N' :
                           dimension === 'N' ? 'S' :
                           dimension === 'T' ? 'F' :
                           dimension === 'F' ? 'T' :
                           dimension === 'J' ? 'P' : 'P';
            this.answers[opposite]++;
        }

        this.currentQuestion++;
        if (this.currentQuestion < personalityData.questions.length) {
            this.showCurrentQuestion();
        } else {
            this.calculatePersonality();
        }
    }

    calculatePersonality() {
        const dimensions = [
            this.answers.E > this.answers.I ? 'E' : 'I',
            this.answers.S > this.answers.N ? 'S' : 'N',
            this.answers.T > this.answers.F ? 'T' : 'F',
            this.answers.J > this.answers.P ? 'J' : 'P'
        ];
        
        this.personalityType = dimensions.join('');
        const personality = personalityData.personalities.find(p => p.code === this.personalityType);
        this.showResults(personality);
    }

    showResults(personality) {
        const ePercent = Math.round((this.answers.E / 12) * 100);
        const iPercent = 100 - ePercent;
        const sPercent = Math.round((this.answers.S / 12) * 100);
        const nPercent = 100 - sPercent;
        const tPercent = Math.round((this.answers.T / 12) * 100);
        const fPercent = 100 - tPercent;
        const jPercent = Math.round((this.answers.J / 12) * 100);
        const pPercent = 100 - jPercent;

        document.getElementById('personality-card').innerHTML = `
            <div class="personality-code">${personality.code}</div>
            <div class="personality-name">${personality.name}</div>
            <div class="personality-description">${personality.description}</div>
            
            <div class="score-breakdown">
                <div class="dimension-score">
                    <div class="dimension-label">Extraverted</div>
                    <div class="dimension-bar">
                        <div class="dimension-fill" style="width: ${ePercent}%"></div>
                    </div>
                    <div class="dimension-value">${ePercent}%</div>
                </div>
                <div class="dimension-score">
                    <div class="dimension-label">Introverted</div>
                    <div class="dimension-bar">
                        <div class="dimension-fill" style="width: ${iPercent}%"></div>
                    </div>
                    <div class="dimension-value">${iPercent}%</div>
                </div>
                <div class="dimension-score">
                    <div class="dimension-label">Sensing</div>
                    <div class="dimension-bar">
                        <div class="dimension-fill" style="width: ${sPercent}%"></div>
                    </div>
                    <div class="dimension-value">${sPercent}%</div>
                </div>
                <div class="dimension-score">
                    <div class="dimension-label">Intuitive</div>
                    <div class="dimension-bar">
                        <div class="dimension-fill" style="width: ${nPercent}%"></div>
                    </div>
                    <div class="dimension-value">${nPercent}%</div>
                </div>
                <div class="dimension-score">
                    <div class="dimension-label">Thinking</div>
                    <div class="dimension-bar">
                        <div class="dimension-fill" style="width: ${tPercent}%"></div>
                    </div>
                    <div class="dimension-value">${tPercent}%</div>
                </div>
                <div class="dimension-score">
                    <div class="dimension-label">Feeling</div>
                    <div class="dimension-bar">
                        <div class="dimension-fill" style="width: ${fPercent}%"></div>
                    </div>
                    <div class="dimension-value">${fPercent}%</div>
                </div>
                <div class="dimension-score">
                    <div class="dimension-label">Judging</div>
                    <div class="dimension-bar">
                        <div class="dimension-fill" style="width: ${jPercent}%"></div>
                    </div>
                    <div class="dimension-value">${jPercent}%</div>
                </div>
                <div class="dimension-score">
                    <div class="dimension-label">Perceiving</div>
                    <div class="dimension-bar">
                        <div class="dimension-fill" style="width: ${pPercent}%"></div>
                    </div>
                    <div class="dimension-value">${pPercent}%</div>
                </div>
            </div>
            
            <div class="traits-grid">
                ${personality.strengths.map(trait => 
                    `<div class="trait-badge"><strong>${trait}</strong></div>`
                ).join('')}
            </div>

            <div class="career-list">
                <h4>Recommended Careers</h4>
                <ul>
                    ${personality.careers.map(career => `<li>${career}</li>`).join('')}
                </ul>
            </div>
        `;

        document.body.style.background = `linear-gradient(135deg, ${personality.color}20, #1a202c)`;
        this.showScreen('results');
    }

    restartTest() {
        this.showScreen('welcome');
        document.body.style.background = '';
    }

    shareResults() {
        const text = `I discovered I'm a ${this.personalityType} ${personalityData.personalities.find(p => p.code === this.personalityType).name}! Take the test: ${window.location.href}`;
        if (navigator.share) {
            navigator.share({ 
                title: `I'm a ${this.personalityType}!`, 
                text, 
                url: window.location.href 
            });
        } else {
            navigator.clipboard.writeText(text).then(() => {
                alert('Results copied to clipboard! 📋');
            });
        }
    }
}

// Initialize test
let personalityTest;
document.addEventListener('DOMContentLoaded', () => {
    personalityTest = new PersonalityTest();
});

