// Dummy course data
const lessons = [
    { id: 1, title: "1. Introduction to the Course", description: "Welcome! In this module, we will cover the basics and outline what you will achieve by the end of this program.", completed: false },
    { id: 2, title: "2. Setting Up Your Environment", description: "Learn how to install the necessary tools and configure your workspace for the upcoming exercises.", completed: false },
    { id: 3, title: "3. Core Fundamentals", description: "Diving deep into the core concepts. We will cover variables, structures, and basic syntax.", completed: false },
    { id: 4, title: "4. Advanced Techniques", description: "Taking it to the next level. Let's look at complex architectures and best practices.", completed: false },
    { id: 5, title: "5. Final Project", description: "Apply everything you've learned to build a complete, real-world project from scratch.", completed: false }
];

let currentLessonId = null;

// DOM Elements
const lessonList = document.getElementById('lesson-list');
const lessonTitle = document.getElementById('lesson-title');
const lessonSubtitle = document.getElementById('lesson-subtitle');
const lessonDescription = document.getElementById('lesson-description');
const completeBtn = document.getElementById('complete-btn');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

// Initialize the App
function init() {
    renderLessonList();
    updateProgress();
}

// Render the sidebar list
function renderLessonList() {
    lessonList.innerHTML = '';
    
    lessons.forEach(lesson => {
        const li = document.createElement('li');
        li.className = `lesson-item ${lesson.id === currentLessonId ? 'active' : ''} ${lesson.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <span>${lesson.title}</span>
            <span>${lesson.completed ? '✓' : ''}</span>
        `;
        
        li.onclick = () => loadLesson(lesson.id);
        lessonList.appendChild(li);
    });
}

// Load a specific lesson into the main view
function loadLesson(id) {
    currentLessonId = id;
    const lesson = lessons.find(l => l.id === id);
    
    // Update Content
    lessonTitle.textContent = lesson.title;
    lessonSubtitle.textContent = `About this lesson`;
    lessonDescription.textContent = lesson.description;
    
    // Update Button State
    completeBtn.disabled = false;
    completeBtn.textContent = lesson.completed ? "Completed" : "Mark as Complete";
    completeBtn.style.backgroundColor = lesson.completed ? "#27ae60" : "#3498db";
    
    // Re-render list to update active state
    renderLessonList();
}

// Mark lesson as complete
completeBtn.addEventListener('click', () => {
    if (!currentLessonId) return;
    
    const lessonIndex = lessons.findIndex(l => l.id === currentLessonId);
    
    if (!lessons[lessonIndex].completed) {
        lessons[lessonIndex].completed = true;
        completeBtn.textContent = "Completed";
        completeBtn.style.backgroundColor = "#27ae60";
        
        renderLessonList();
        updateProgress();
        
        // Auto-advance to next lesson if available
        if (lessonIndex < lessons.length - 1) {
            setTimeout(() => {
                loadLesson(lessons[lessonIndex + 1].id);
            }, 800);
        }
    }
});

// Calculate and update progress bar
function updateProgress() {
    const completedCount = lessons.filter(l => l.completed).length;
    const percentage = Math.round((completedCount / lessons.length) * 100);
    
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}% Completed`;
}

// Run initialization
init();