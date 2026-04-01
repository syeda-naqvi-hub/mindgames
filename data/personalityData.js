// Comprehensive Personality Data - 16 MBTI Types
const personalityData = {
    questions: [
        // Extraversion vs Introversion (E/I) - Questions 0-5
        {id: 'E', text: "I feel energized when I'm around other people."},
        {id: 'I', text: "I find it easy to be alone for extended periods."},
        {id: 'E', text: "I prefer to hang out with others instead of doing things alone."},
        {id: 'I', text: "I like having time to think before responding in conversations."},
        {id: 'E', text: "I enjoy being the center of attention occasionally."},
        {id: 'I', text: "I prefer listening over speaking in group settings."},
        
        // Sensing vs Intuition (S/N) - Questions 6-11
        {id: 'S', text: "I focus on the facts and details in situations."},
        {id: 'N', text: "I see patterns and possibilities beyond the present."},
        {id: 'S', text: "I trust information I can see and touch."},
        {id: 'N', text: "I enjoy thinking about how things could be improved."},
        {id: 'S', text: "I prefer practical, step-by-step approaches."},
        {id: 'N', text: "I like exploring abstract concepts and theories."},
        
        // Thinking vs Feeling (T/F) - Questions 12-17
        {id: 'T', text: "I make decisions based on logic and objective criteria."},
        {id: 'F', text: "I consider people's feelings when making decisions."},
        {id: 'T', text: "I prefer to be fair even if it hurts someone's feelings."},
        {id: 'F', text: "I strive for harmony in relationships."},
        {id: 'T', text: "I analyze problems systematically."},
        {id: 'F', text: "I empathize easily with others' emotions."},
        
        // Judging vs Perceiving (J/P) - Questions 18-23
        {id: 'J', text: "I like to have definite plans for my activities."},
        {id: 'P', text: "I prefer to keep my options open."},
        {id: 'J', text: "I feel better when things are organized and settled."},
        {id: 'P', text: "I enjoy adapting to new situations spontaneously."},
        {id: 'J', text: "I like to complete tasks well in advance."},
        {id: 'P', text: "I work best under pressure with deadlines."}
    ],

    personalities: [
        {
            code: 'INTJ',
            name: 'Architect',
            description: 'Imaginative and strategic thinkers with a plan for everything.',
            strengths: ['Rational', 'Independent', 'Determined'],
            careers: ['Strategic Planner', 'Software Architect', 'Research Scientist'],
            color: '#667eea'
        },
        {
            code: 'INTP',
            name: 'Logician',
            description: 'Innovative inventors with an unquenchable thirst for knowledge.',
            strengths: ['Analytical', 'Original', 'Curious'],
            careers: ['Researcher', 'Software Developer', 'Professor'],
            color: '#764ba2'
        },
        {
            code: 'ENTJ',
            name: 'Commander',
            description: 'Bold, imaginative and strong-willed leaders.',
            strengths: ['Charismatic', 'Strategic', 'Efficient'],
            careers: ['CEO', 'Entrepreneur', 'Consultant'],
            color: '#f0932b'
        },
        {
            code: 'ENTP',
            name: 'Debater',
            description: 'Quick-witted and fiercely independent thinkers.',
            strengths: ['Inventive', 'Versatile', 'Energetic'],
            careers: ['Lawyer', 'Marketer', 'Entrepreneur'],
            color: '#f6d365'
        },
        {
            code: 'INFJ',
            name: 'Advocate',
            description: 'Quiet but insightful visionaries.',
            strengths: ['Insightful', 'Principled', 'Passionate'],
            careers: ['Counselor', 'Writer', 'Teacher'],
            color: '#a8edea'
        },
        {
            code: 'INFP',
            name: 'Mediator',
            description: 'Poetic, kind and altruistic souls.',
            strengths: ['Empathetic', 'Creative', 'Idealistic'],
            careers: ['Writer', 'Counselor', 'Artist'],
            color: '#fed6e3'
        },
        {
            code: 'ENFJ',
            name: 'Protagonist',
            description: 'Charismatic and inspiring leaders.',
            strengths: ['Empathetic', 'Charismatic', 'Organized'],
            careers: ['Teacher', 'HR Manager', 'Event Planner'],
            color: '#ff9a9e'
        },
        {
            code: 'ENFP',
            name: 'Campaigner',
            description: 'Enthusiastic, creative and sociable free spirits.',
            strengths: ['Sociable', 'Creative', 'Spontaneous'],
            careers: ['Journalist', 'Actor', 'Sales'],
            color: '#fecfef'
        },
        {
            code: 'ISTJ',
            name: 'Logistician',
            description: 'Practical and fact-minded individuals.',
            strengths: ['Reliable', 'Patient', 'Practical'],
            careers: ['Accountant', 'Judge', 'Inspector'],
            color: '#48bb78'
        },
        {
            code: 'ISFJ',
            name: 'Defender',
            description: 'Very dedicated and warm protectors.',
            strengths: ['Loyal', 'Patient', 'Supportive'],
            careers: ['Nurse', 'Teacher', 'Administrator'],
            color: '#38a169'
        },
        {
            code: 'ESTJ',
            name: 'Executive',
            description: 'Excellent organizers and leaders.',
            strengths: ['Efficient', 'Organized', 'Traditional'],
            careers: ['Manager', 'Lawyer', 'Police Officer'],
            color: '#2f855a'
        },
        {
            code: 'ESFJ',
            name: 'Consul',
            description: 'Caring and sociable people pleasers.',
            strengths: ['Sociable', 'Supportive', 'Harmonious'],
            careers: ['Nurse', 'Teacher', 'Administrator'],
            color: '#38a169'
        },
        {
            code: 'ISTP',
            name: 'Virtuoso',
            description: 'Bold and practical experimenters.',
            strengths: ['Practical', 'Observant', 'Adventurous'],
            careers: ['Engineer', 'Pilot', 'Mechanic'],
            color: '#ed8936'
        },
        {
            code: 'ISFP',
            name: 'Adventurer',
            description: 'Easy-going and flexible artists.',
            strengths: ['Artistic', 'Flexible', 'Empathetic'],
            careers: ['Artist', 'Chef', 'Mechanic'],
            color: '#f6ad55'
        },
        {
            code: 'ESTP',
            name: 'Entrepreneur',
            description: 'Smart, energetic and perceptive.',
            strengths: ['Bold', 'Rational', 'Perceptive'],
            careers: ['Sales Manager', 'Entrepreneur', 'Detective'],
            color: '#dd6b20'
        },
        {
            code: 'ESFP',
            name: 'Entertainer',
            description: 'Spontaneous and sociable entertainers.',
            strengths: ['Sociable', 'Spontaneous', 'Artistic'],
            careers: ['Actor', 'Salesperson', 'Tour Guide'],
            color: '#f56565'
        }
    ]
};

