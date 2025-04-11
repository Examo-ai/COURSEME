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

// Theme Management
const userPreferences = {
    theme: localStorage.getItem('theme') || 'light',
    viewMode: localStorage.getItem('viewMode') || 'grid'
};

// Initialize theme and interactions
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const courseCards = document.querySelectorAll('.course-card');
    const logoutBtn = document.querySelector('.logout-btn');

    // Apply saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // Theme toggle with persistence
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateCourseBackgrounds();
    });

    // Course card animations and interactions
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
        });

        card.addEventListener('click', () => {
            const courseUrl = card.getAttribute('data-course-url');
            if (courseUrl) {
                window.location.href = courseUrl;
            }
        });
    });

    // Logout functionality
    logoutBtn?.addEventListener('click', () => {
        const theme = localStorage.getItem('theme'); // Preserve theme
        localStorage.clear();
        localStorage.setItem('theme', theme);
        window.location.href = '/pages/login.html';
    });

    // Check authentication
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = '/pages/login.html';
    }

    // Initialize courses
    initializeDashboard();
});

// Course rendering and management
function initializeDashboard() {
    const coursesGrid = document.querySelector('.courses-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const viewButtons = document.querySelectorAll('.view-btn');
    const coursesCount = document.querySelector('.courses-count');
    
    // Apply saved view mode
    coursesGrid.classList.toggle('list-view', userPreferences.viewMode === 'list');
    document.querySelector(`[data-view="${userPreferences.viewMode}"]`).classList.add('active');

    // Render all courses initially
    renderCourses(courses);
    updateCoursesCount(courses.length);

    // Filter functionality
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tag = btn.dataset.tag;
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filteredCourses = tag === 'all' 
                ? courses 
                : courses.filter(course => course.tags.includes(tag));

            renderCourses(filteredCourses);
            updateCoursesCount(filteredCourses.length);
        });
    });

    // View toggle functionality
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            coursesGrid.classList.remove('grid-view', 'list-view');
            coursesGrid.classList.add(`${view}-view`);
            
            userPreferences.viewMode = view;
            localStorage.setItem('viewMode', view);
        });
    });
}

function renderCourses(coursesToRender) {
    const coursesGrid = document.querySelector('.courses-grid');
    coursesGrid.innerHTML = '';

    coursesToRender.forEach((course, index) => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.setAttribute('data-course-url', `courses/${course.url}`);

        const imageTheme = userPreferences.theme === 'dark' ? '-dark' : '-light';
        
        card.innerHTML = `
            <div class="course-image" style="background-image: url('../images/${course.background}${imageTheme}.png')">
                <div class="course-overlay">
                    <span class="course-duration">
                        <i class="fas fa-clock"></i>
                        ${course.duration}
                    </span>
                </div>
            </div>
            <div class="course-content">
                <div class="course-tags">
                    ${course.tags.map(tag => `
                        <span class="course-tag">${tag}</span>
                    `).join('')}
                </div>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-footer">
                    <div class="course-stats">
                        <span><i class="fas fa-users"></i> ${course.enrolled}</span>
                        <span><i class="fas fa-star"></i> ${course.rating}</span>
                    </div>
                    <button class="start-course-btn" onclick="startCourse('${course.id}')">
                        <span>Start Learning</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;

        coursesGrid.appendChild(card);
    });
}

function updateCourseBackgrounds() {
    const courseCards = document.querySelectorAll('.course-image');
    const imageTheme = userPreferences.theme === 'dark' ? '-dark' : '-light';
    
    courseCards.forEach(card => {
        const currentBg = card.style.backgroundImage;
        card.style.backgroundImage = currentBg.replace(/-(?:light|dark)\.png/, `${imageTheme}.png`);
    });
}

function updateCoursesCount(count) {
    const coursesCount = document.querySelector('.courses-count');
    coursesCount.textContent = `${count} course${count !== 1 ? 's' : ''} available`;
}

function startCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        window.location.href = `courses/${course.url}`;
    }
}

// User menu functionality
const userButton = document.querySelector('.user-button');
const dropdownMenu = document.querySelector('.dropdown-menu');

if (userButton && dropdownMenu) {
    userButton.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
}

// Handle progress stats
function updateProgressStats() {
    const activeCourses = courses.filter(course => 
        localStorage.getItem(`progress_${course.id}`)
    ).length;

    const totalHours = courses.reduce((acc, course) => {
        const progress = localStorage.getItem(`progress_${course.id}`);
        if (progress) {
            const hoursCompleted = (course.duration.split('h')[0] * (progress / 100));
            return acc + hoursCompleted;
        }
        return acc;
    }, 0);

    document.querySelector('.courses-count').textContent = activeCourses;
    document.querySelector('.learning-hours').textContent = totalHours.toFixed(1);
}

// Initialize progress stats
updateProgressStats();