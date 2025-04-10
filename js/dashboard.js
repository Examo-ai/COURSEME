// Check authentication
checkAuth();

const courses = [
    {
        id: 1,
        title: "Python Fundamentals",
        description: "Learn Python basics from scratch with AI-guided lessons",
        tags: ["python"],
        image: "../images/python-bg.jpg",
        duration: "6 hours",
        lessons: 12,
        url: "courses/python-fundamentals.html"
    },
    {
        id: 2,
        title: "Advanced JavaScript",
        description: "Master modern JavaScript features and best practices",
        tags: ["js", "webdev"],
        image: "../images/js-bg.jpg",
        duration: "8 hours",
        lessons: 15,
        url: "courses/advanced-javascript.html"
    },
    {
        id: 3,
        title: "HTML5 & CSS3 Mastery",
        description: "Create modern and responsive websites",
        tags: ["html", "css", "webdev"],
        image: "../images/html-css-bg.jpg",
        duration: "10 hours",
        lessons: 20,
        url: "courses/html-css-mastery.html"
    },
    {
        id: 4,
        title: "Java Programming",
        description: "Learn Java programming from ground up",
        tags: ["java"],
        image: "../images/java-bg.jpg",
        duration: "12 hours",
        lessons: 24,
        url: "courses/java-programming.html"
    },
    {
        id: 5,
        title: "Web Development Bootcamp",
        description: "Full-stack web development course",
        tags: ["webdev", "html", "css", "js"],
        image: "../images/webdev-bg.jpg",
        duration: "20 hours",
        lessons: 40,
        url: "courses/webdev-bootcamp.html"
    },
    {
        id: 6,
        title: "Python Data Science",
        description: "Data analysis and visualization with Python",
        tags: ["python"],
        image: "../images/python-data-bg.jpg",
        duration: "15 hours",
        lessons: 30,
        url: "courses/python-data-science.html"
    },
    {
        id: 7,
        title: "JavaScript Frameworks",
        description: "Learn popular JavaScript frameworks",
        tags: ["js", "webdev"],
        image: "../images/js-frameworks-bg.jpg",
        duration: "16 hours",
        lessons: 32,
        url: "courses/js-frameworks.html"
    },
    {
        id: 8,
        title: "Spanish for Beginners",
        description: "Learn Spanish from scratch",
        tags: ["language"],
        image: "../images/spanish-bg.jpg",
        duration: "10 hours",
        lessons: 20,
        url: "courses/spanish-beginners.html"
    },
    {
        id: 9,
        title: "French Language Course",
        description: "Master French language basics",
        tags: ["language"],
        image: "../images/french-bg.jpg",
        duration: "12 hours",
        lessons: 24,
        url: "courses/french-course.html"
    },
    {
        id: 10,
        title: "Java Enterprise Development",
        description: "Enterprise Java applications development",
        tags: ["java"],
        image: "../images/java-enterprise-bg.jpg",
        duration: "18 hours",
        lessons: 36,
        url: "courses/java-enterprise.html"
    },
    {
        id: 11,
        title: "CSS Animation Workshop",
        description: "Create stunning web animations with CSS",
        tags: ["css", "webdev"],
        image: "../images/css-animation-bg.jpg",
        duration: "8 hours",
        lessons: 16,
        url: "courses/css-animation.html"
    },
    {
        id: 12,
        title: "Python Web Development",
        description: "Build web applications with Python",
        tags: ["python", "webdev"],
        image: "../images/python-web-bg.jpg",
        duration: "14 hours",
        lessons: 28,
        url: "courses/python-web.html"
    },
    {
        id: 13,
        title: "German Language Course",
        description: "Learn German from the basics",
        tags: ["language"],
        image: "../images/german-bg.jpg",
        duration: "12 hours",
        lessons: 24,
        url: "courses/german-course.html"
    },
    {
        id: 14,
        title: "Responsive Web Design",
        description: "Master modern responsive design techniques",
        tags: ["html", "css", "webdev"],
        image: "../images/responsive-bg.jpg",
        duration: "10 hours",
        lessons: 20,
        url: "courses/responsive-design.html"
    }
];

const courseBackgrounds = {
    "python-bg": "linear-gradient(to right, #ff7e5f, #feb47b)",
    "js-bg": "linear-gradient(to right, #4facfe, #00f2fe)",
    "html-css-bg": "linear-gradient(to right, #ff9a9e, #fad0c4)",
    "java-bg": "linear-gradient(to right, #a1c4fd, #c2e9fb)",
    "webdev-bg": "linear-gradient(to right, #667eea, #764ba2)",
    "python-data-bg": "linear-gradient(to right, #43cea2, #185a9d)",
    "js-frameworks-bg": "linear-gradient(to right, #ff9966, #ff5e62)",
    "spanish-bg": "linear-gradient(to right, #fbc2eb, #a6c1ee)",
    "french-bg": "linear-gradient(to right, #ff7e5f, #feb47b)",
    "java-enterprise-bg": "linear-gradient(to right, #4facfe, #00f2fe)",
    "css-animation-bg": "linear-gradient(to right, #ff9a9e, #fad0c4)",
    "python-web-bg": "linear-gradient(to right, #a1c4fd, #c2e9fb)",
    "german-bg": "linear-gradient(to right, #667eea, #764ba2)",
    "responsive-bg": "linear-gradient(to right, #43cea2, #185a9d)"
};

function updateCourseBackgrounds() {
    document.querySelectorAll('.course-image').forEach(image => {
        const courseId = image.dataset.courseId;
        const background = courseBackgrounds[courseId];
        if (background) {
            image.style.background = background;
        }
    });
}

// Function to create course card with CSS gradient background
function createCourseCard(course) {
    const courseImageClass = course.image.replace('../images/', '').replace('.jpg', '');
    return `
        <div class="course-card">
            <div class="course-image" data-course-id="${courseImageClass}" style="background: ${courseBackgrounds[courseImageClass]}"></div>
            <div class="course-content">
                <div class="course-tags">
                    ${course.tags.map(tag => `<span class="course-tag">${tag}</span>`).join('')}
                </div>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-footer">
                    <div class="course-stats">
                        <span><i class="far fa-clock"></i> ${course.duration}</span>
                        <span><i class="far fa-list-alt"></i> ${course.lessons} lessons</span>
                    </div>
                    <a href="${course.url}" class="start-course-btn">Start Course</a>
                </div>
            </div>
        </div>
    `;
}

// Function to filter courses
function filterCourses(tag) {
    const coursesGrid = document.getElementById('courses-grid');
    coursesGrid.innerHTML = '';
    
    const filteredCourses = tag === 'all' 
        ? courses 
        : courses.filter(course => course.tags.includes(tag));
    
    filteredCourses.forEach(course => {
        coursesGrid.innerHTML += createCourseCard(course);
    });
    updateCourseBackgrounds();
}

// Initialize courses
filterCourses('all');

// Add event listeners to tag buttons
document.querySelectorAll('.tag-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Update active state
        document.querySelector('.tag-btn.active').classList.remove('active');
        button.classList.add('active');
        
        // Filter courses
        filterCourses(button.dataset.tag);
    });
});

// Enhanced search functionality with debouncing
const searchInput = document.querySelector('.nav-search input');
let searchTimeout;

searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const searchTerm = e.target.value.toLowerCase();
        const coursesGrid = document.getElementById('courses-grid');
        coursesGrid.innerHTML = '';
        
        const filteredCourses = courses.filter(course => 
            course.title.toLowerCase().includes(searchTerm) || 
            course.description.toLowerCase().includes(searchTerm) ||
            course.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        
        if (filteredCourses.length === 0) {
            coursesGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No courses found</h3>
                    <p>Try different keywords or browse all courses</p>
                </div>
            `;
        } else {
            filteredCourses.forEach(course => {
                coursesGrid.innerHTML += createCourseCard(course);
            });
            updateCourseBackgrounds();
        }
    }, 300); // Debounce time: 300ms
});