// Enhanced Quiz Data - Categories & 20+ Questions
const quizData = {
    categories: [
        { id: 'general', name: 'General Knowledge', color: '#ff6b6b' },
        { id: 'science', name: 'Science', color: '#4ecdc4' },
        { id: 'history', name: 'History', color: '#45b7d1' },
        { id: 'geography', name: 'Geography', color: '#f9ca24' },
        { id: 'sports', name: 'Sports', color: '#6c5ce7' }
    ],
    questions: {
        general: [
            {
                question: "What is the capital of France?",
                options: ["London", "Berlin", "Paris", "Madrid"],
                correct: 2
            },
            {
                question: "Who wrote 'Romeo and Juliet'?",
                options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
                correct: 1
            },
            {
                question: "What is the chemical symbol for gold?",
                options: ["Ag", "Au", "Go", "Gd"],
                correct: 1
            }
        ],
        science: [
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Venus", "Mars", "Jupiter", "Saturn"],
                correct: 1
            },
            {
                question: "What is H2O commonly known as?",
                options: ["Milk", "Salt", "Water", "Sugar"],
                correct: 2
            },
            {
                question: "Which vitamin is produced by sunlight on skin?",
                options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
                correct: 3
            }
        ],
        history: [
            {
                question: "In what year did World War II end?",
                options: ["1945", "1939", "1918", "1950"],
                correct: 0
            },
            {
                question: "Who was the first President of USA?",
                options: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "John Adams"],
                correct: 2
            }
        ],
        geography: [
            {
                question: "What is the largest ocean on Earth?",
                options: ["Atlantic", "Indian", "Arctic", "Pacific"],
                correct: 3
            },
            {
                question: "Which continent is Egypt in?",
                options: ["Asia", "Europe", "Africa", "South America"],
                correct: 2
            }
        ],
        sports: [
            {
                question: "How many players in a soccer team?",
                options: ["9", "10", "11", "12"],
                correct: 2
            },
            {
                question: "What country won 2018 FIFA World Cup?",
                options: ["Brazil", "Germany", "France", "Argentina"],
                correct: 2
            }
        ]
    }
};

