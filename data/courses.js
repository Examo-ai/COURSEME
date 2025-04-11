const courseBackgrounds = {
    'python-bg': 'linear-gradient(135deg, #4B79A1, #283E51)',
    'js-bg': 'linear-gradient(135deg, #F7971E, #FFD200)',
    'html-css-bg': 'linear-gradient(135deg, #834D9B, #D04ED6)',
    'java-bg': 'linear-gradient(135deg, #1D976C, #93F9B9)',
    'webdev-bg': 'linear-gradient(135deg, #2193b0, #6dd5ed)',
    'python-data-bg': 'linear-gradient(135deg, #CC2B5E, #753A88)',
    'js-frameworks-bg': 'linear-gradient(135deg, #904e95, #e96443)',
    'spanish-bg': 'linear-gradient(135deg, #11998e, #38ef7d)',
    'french-bg': 'linear-gradient(135deg, #2E3192, #1BFFFF)',
    'java-enterprise-bg': 'linear-gradient(135deg, #0F2027, #2C5364)',
    'css-animation-bg': 'linear-gradient(135deg, #FF0099, #493240)',
    'python-web-bg': 'linear-gradient(135deg, #4776E6, #8E54E9)',
    'german-bg': 'linear-gradient(135deg, #FF512F, #DD2476)',
    'responsive-bg': 'linear-gradient(135deg, #16BFFD, #CB3066)'
};

const featuredCourses = [
    {
        "id": "js-advanced",
        "title": "Advanced JavaScript",
        "description": "Master modern JavaScript features and frameworks",
        "featured": true,
        "icon": "fab fa-js",
        "tags": ["Programming", "Web Dev"],
        "duration": "8 weeks",
        "level": "Advanced",
        "rating": 4.9,
        "students": 1250
    },
    {
        "id": "german-course",
        "title": "German Language",
        "description": "Learn German from basics to fluency",
        "featured": true,
        "icon": "fas fa-globe-europe",
        "tags": ["Language", "Beginner"],
        "duration": "12 weeks",
        "level": "Beginner",
        "rating": 4.8,
        "students": 980
    },
    {
        "id": "python-data",
        "title": "Python Data Science",
        "description": "Analyze data and build ML models",
        "featured": true,
        "icon": "fab fa-python",
        "tags": ["Data Science", "Python"],
        "duration": "10 weeks",
        "level": "Intermediate",
        "rating": 4.9,
        "students": 1500
    },
    {
        "id": "web-dev",
        "title": "Web Development Bootcamp",
        "description": "Complete web development from scratch",
        "featured": true,
        "icon": "fas fa-code",
        "tags": ["Web Dev", "Full Stack"],
        "duration": "16 weeks",
        "level": "Beginner",
        "rating": 4.7,
        "students": 2100
    },
    {
        "id": "spanish-course",
        "title": "Spanish for Beginners",
        "description": "Start your Spanish learning journey",
        "featured": false,
        "icon": "fas fa-language",
        "tags": ["Language", "Beginner"],
        "duration": "8 weeks",
        "level": "Beginner",
        "rating": 4.6,
        "students": 750
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { courseBackgrounds, featuredCourses };
}