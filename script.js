// --- 1. DATA: SEMESTER 2 CURRICULUM ---
const semester2Data = {
    "Anatomy": {
        "Osteology": ["Coxal bone and femur", "Tibia and fibula", "The bones of the foot"],
        "Arthrology": ["Hip joint", "Knee joint", "Talo-crural (ankle) joint"],
        "Myology": ["Muscles of the hip", "Muscles of the thigh", "Muscles of the leg", "Muscles of the foot"],
        "Angiology": ["Femoral artery", "Popliteal artery", "Tibio-fibular trunk", "Dorsal arteries of leg/foot", "Venous & lymphatic drainage"],
        "Neurology": ["Lumbar plexus", "Femoral nerve", "Modified obturator nerve", "Sacral plexus & sciatic nerve", "Terminal branches of sciatic"]
    },
    "Biochemistry": {
        "Amino Acids": ["Amino acids, peptides, proteins", "Structure & properties of A.A.", "Amino acid metabolism", "Protein sequencing"],
        "Enzymes": ["Enzymology", "Single-substrate enzyme kinetics", "Modulation of enzymatic activity", "Allosteric enzymes", "Vitamins and coenzymes"],
        "Nucleic Acids": ["Nucleic acids"],
        "Bioenergetics": ["Bioenergetics"]
    },
    "Cytology": {
        "Cell Biology": ["Endoplasmic reticulum", "Golgi apparatus", "Ribosome", "Peroxisomes", "Lysosomes", "Mitochondria", "Interphase nucleus", "Cell cycle"]
    },
    "Chemistry": {
        "General Chemistry": ["Oxidation-Reduction (Ox/Red)", "Acid-Base reactions", "Solubility"],
        "Organic Chemistry": ["Reaction mechanisms", "Electrophilic addition (HX, X2)", "Nucleophilic substitution (SN1, SN2)", "Elimination (E1, E2)", "Competition (SN, E)"]
    },
    "Biophysics": {
        "Optics & Imaging": ["Optics", "Spherical diopters", "Thin lenses", "The eye", "Vision (anomalies of the eye)", "Non-ionizing imaging"]
    },
    "Biostatistics": {
        "Stats & Informatics": ["Hypothesis testing", "Comparison of two percentages", "Chi-square (X2) test of homogeneity", "Chi-square (X2) test of conformity", "Analysis of Variance (ANOVA)", "Epidemiological measures", "Health indicators"]
    },
    "Embryology": {
        "Development": ["Gametogenesis", "Spermatogenesis", "Oogenesis", "Ovulation", "First week of development", "Second week of development", "Third week of development", "Fourth week of development", "Annexes and placenta", "Twin pregnancies", "Stem cells"]
    },
    "SSH": {
        "Social Sciences": ["History of medicine", "History of anatomy", "Medical ethics", "Bioethics", "Medical deontology", "Medical responsibility", "Health, society, and culture", "The caregiver-patient relationship", "Introduction to public health", "Health indicators (SSH)", "Need and supply of care", "Organization of the health system", "Quality and safety of care", "Health economics"]
    }
};

const subjectsS1 = ["Anatomy", "Biochemistry", "Cytology", "Biophysics", "Chemistry", "Biostatistics", "Histology", "Physiology"];
const subjectsS2 = Object.keys(semester2Data);

// --- ICON MAPPING ---
// Specific icons for each subject
const subjectIcons = {
    "Anatomy": "fa-bone",               // Skeleton
    "Biochemistry": "fa-dna",           // DNA/Molecules
    "Cytology": "fa-microscope",        // Microscope for cells
    "Biophysics": "fa-eye",             // Eye (Optics) or fa-wave-square
    "Chemistry": "fa-flask",            // Flask
    "Biostatistics": "fa-chart-bar",    // Charts
    "Histology": "fa-layer-group",      // Layers (Tissues)
    "Physiology": "fa-heartbeat",       // Heartbeat
    "Embryology": "fa-baby",            // Baby/Fetus
    "SSH": "fa-balance-scale"           // Scale (Ethics/Law)
};

// --- 2. STATE MANAGEMENT ---
let navHistory = [];
const app = document.getElementById('app-container');
const breadcrumbs = document.getElementById('breadcrumbs');

// --- 3. HELPER FUNCTIONS ---
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
}

function clearView() {
    app.innerHTML = '';
}

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

function updateBreadcrumbs() {
    breadcrumbs.innerHTML = '';
    
    const homeLink = document.createElement('span');
    homeLink.className = 'breadcrumb-item';
    homeLink.textContent = 'Home';
    homeLink.onclick = renderHome;
    breadcrumbs.appendChild(homeLink);

    navHistory.forEach((step) => {
        const separator = document.createElement('span');
        separator.className = 'breadcrumb-separator';
        separator.innerHTML = '<i class="fas fa-chevron-right"></i>';
        breadcrumbs.appendChild(separator);

        const item = document.createElement('span');
        item.className = 'breadcrumb-item';
        item.textContent = step.name;
        item.onclick = step.action;
        breadcrumbs.appendChild(item);
    });
}

// --- 4. RENDER FUNCTIONS ---

// A. HOME
function renderHome() {
    navHistory = [];
    updateBreadcrumbs();
    clearView();
    const greeting = getGreeting();
    
    app.innerHTML = `
        <div class="hero">
            <h1>${greeting} Doctor, welcome to <span>KnowMed Space</span></h1>
            <p>Where Future Doctors Build Strong Foundations</p>
            <div class="hero-buttons">
                <button class="btn btn-primary" onclick="renderYear('First Year')">First Year</button>
                <button class="btn btn-secondary disabled">Second Year (Soon)</button>
                <button class="btn btn-secondary disabled">Third Year (Soon)</button>
            </div>
        </div>
    `;
}

// B. YEAR VIEW (Semesters Centered)
function renderYear(year) {
    navHistory = [{ name: year, action: () => renderYear(year) }];
    updateBreadcrumbs();
    clearView();

    // Using "centered-view" class to position buttons in middle
    app.innerHTML = `
        <div class="centered-view">
            <div class="card semester-card" onclick="renderSemesterMenu('Semester 1')">
                <i class="fas fa-book-medical"></i>
                <h3>Semester 1</h3>
            </div>
            <div class="card semester-card" onclick="renderSemesterMenu('Semester 2')">
                <i class="fas fa-dna"></i>
                <h3>Semester 2</h3>
            </div>
        </div>
    `;
}

// C. SEMESTER MENU
function renderSemesterMenu(semester) {
    navHistory = [
        { name: 'First Year', action: () => renderYear('First Year') },
        { name: semester, action: () => renderSemesterMenu(semester) }
    ];
    updateBreadcrumbs();
    clearView();

    app.innerHTML = `
        <h2 style="margin-bottom:1.5rem;">${semester} Dashboard</h2>
        <div class="grid-container">
            <div class="card" onclick="renderSubjects('${semester}', 'PDF')">
                <i class="fas fa-file-pdf"></i>
                <h3>Lessons PDF</h3>
                <p>Download Course Materials</p>
            </div>
            <div class="card" onclick="renderSubjects('${semester}', 'Explaining')">
                <i class="fas fa-chalkboard-teacher"></i>
                <h3>Lessons Explaining</h3>
                <p>Video & Text Guides</p>
            </div>
            <div class="card" onclick="renderSubjects('${semester}', 'Summaries')">
                <i class="fas fa-highlighter"></i>
                <h3>Summaries</h3>
                <p>Quick Review Notes</p>
            </div>
             <div class="card" onclick="renderPastExams('${semester}')">
                <i class="fas fa-history"></i>
                <h3>Past Exams</h3>
                <p>Previous Years' Questions</p>
            </div>
            <div class="card" onclick="renderOnlineTests('${semester}')">
                <i class="fas fa-laptop-medical"></i>
                <h3>Online Tests</h3>
                <p>Practice Quizzes</p>
            </div>
            <div class="card" onclick="renderTodoList('${semester}')">
                <i class="fas fa-tasks"></i>
                <h3>To-Do List</h3>
                <p>Track Your Progress</p>
            </div>
        </div>
    `;
}

// D. SUBJECTS SELECTION (Handles PDF, Explaining, and Summaries)
function renderSubjects(semester, mode) {
    navHistory.push({ name: `${mode}`, action: () => renderSubjects(semester, mode) });
    updateBreadcrumbs();
    clearView();

    const subjects = semester === 'Semester 1' ? subjectsS1 : subjectsS2;
    
    let html = `<h2 style="margin-bottom:1.5rem;">${mode}: Select Subject</h2><div class="grid-container">`;
    
    subjects.forEach(sub => {
        // Look up icon from map, default to 'fa-book' if missing
        const iconClass = subjectIcons[sub] || "fa-book";
        
        // Define click action based on Semester
        let clickAction = "";
        if (semester === 'Semester 2') {
            // Pass the mode to renderChapters so it knows what to display next
            clickAction = `onclick="renderChapters('${sub}', '${mode}')"`;
        } else {
            clickAction = `onclick="alert('Semester 1 Content is being updated.')"`;
        }
        
        html += `
            <div class="card" ${clickAction}>
                <i class="fas ${iconClass}"></i>
                <h3>${sub}</h3>
            </div>
        `;
    });

    html += `</div>`;
    app.innerHTML = html;
}

// E. CHAPTERS (Dynamic based on Mode)
function renderChapters(subject, mode) {
    navHistory.push({ name: subject, action: () => renderChapters(subject, mode) });
    updateBreadcrumbs();
    clearView();

    const chapters = semester2Data[subject];
    
    let html = `<h2 style="margin-bottom:1.5rem;">${subject} (${mode}): Select Chapter</h2><div class="grid-container">`;

    for (const [chapterName, lessons] of Object.entries(chapters)) {
        html += `
            <div class="card" onclick="renderFinalContent('${subject}', '${chapterName}', '${mode}')">
                <i class="fas fa-folder-open"></i>
                <h3>${chapterName}</h3>
                <p>${lessons.length} Lessons</p>
            </div>
        `;
    }

    html += `</div>`;
    app.innerHTML = html;
}

// F. FINAL CONTENT (Lessons / Explaining / Summaries)
function renderFinalContent(subject, chapter, mode) {
    navHistory.push({ name: chapter, action: () => renderFinalContent(subject, chapter, mode) });
    updateBreadcrumbs();
    clearView();

    const lessons = semester2Data[subject][chapter];
    let icon = "fa-download"; // Default for PDF
    if (mode === "Explaining") icon = "fa-play-circle";
    if (mode === "Summaries") icon = "fa-file-alt";

    let html = `
        <h2 style="margin-bottom:1.5rem;">${subject} > ${chapter} (${mode})</h2>
        <div class="lesson-list">
    `;

    lessons.forEach(lesson => {
        // Different click actions based on mode
        let action = "";
        if (mode === 'PDF') {
            action = `onclick="alert('Downloading PDF: ${lesson}')"`;
        } else if (mode === 'Explaining') {
            action = `onclick="alert('Opening Explanation Video for: ${lesson}')"`;
        } else if (mode === 'Summaries') {
            action = `onclick="alert('Opening Summary for: ${lesson}')"`;
        }

        html += `
            <a href="#" class="lesson-btn" ${action}>
                <span>${lesson}</span>
                <i class="fas ${icon} download-icon"></i>
            </a>
        `;
    });

    html += `</div>`;
    app.innerHTML = html;
}

// G. PAST EXAMS & TESTS (Unchanged logic, just ensure icons are correct)
function renderPastExams(semester) {
    navHistory.push({ name: 'Past Exams', action: () => renderPastExams(semester) });
    updateBreadcrumbs();
    clearView();

    const subjects = semester === 'Semester 1' ? subjectsS1 : subjectsS2;
    
    let html = `<h2 style="margin-bottom:1.5rem;">Past Exams - Select Subject</h2><div class="grid-container">`;
    subjects.forEach(sub => {
        const iconClass = subjectIcons[sub] || "fa-book";
        html += `
            <div class="card" onclick="renderExamYears('${sub}')">
                <i class="fas ${iconClass}"></i>
                <h3>${sub}</h3>
            </div>
        `;
    });
    html += `</div>`;
    app.innerHTML = html;
}

function renderExamYears(subject) {
    navHistory.push({ name: subject, action: () => renderExamYears(subject) });
    updateBreadcrumbs();
    clearView();
    const promos = [2025, 2024, 2023];
    let html = `<h2 style="margin-bottom:1.5rem;">${subject} Exams</h2><div class="grid-container">`;
    promos.forEach(year => {
        html += `
            <div class="card" onclick="alert('Downloading Exam ${year}...')">
                <i class="fas fa-university"></i>
                <h3>Oran Promo ${year}</h3>
                <p>Download PDF</p>
            </div>
        `;
    });
    html += `</div>`;
    app.innerHTML = html;
}

function renderOnlineTests(semester) {
    navHistory.push({ name: 'Online Tests', action: () => renderOnlineTests(semester) });
    updateBreadcrumbs();
    clearView();
    
    if (semester === 'Semester 1') {
        app.innerHTML = '<h2>Coming Soon</h2>';
        return;
    }

    let html = `<h2 style="margin-bottom:1.5rem;">Online Tests - Select Subject</h2><div class="grid-container">`;
    subjectsS2.forEach(sub => {
        const iconClass = subjectIcons[sub] || "fa-vial";
        let action = `onclick="alert('Coming soon for ${sub}')"`;
        if (sub === 'Anatomy') action = `onclick="renderAnatomyTests()"`;
        
        html += `
            <div class="card" ${action}>
                <i class="fas ${iconClass}"></i>
                <h3>${sub}</h3>
            </div>
        `;
    });
    html += `</div>`;
    app.innerHTML = html;
}

function renderAnatomyTests() {
    navHistory.push({ name: 'Anatomy Tests', action: renderAnatomyTests });
    updateBreadcrumbs();
    clearView();
    const tests = ["Osteology", "Arthrology", "Myology", "Angiology", "Neurology"];
    let html = `<h2 style="margin-bottom:1.5rem;">Anatomy Quizzes</h2><div class="grid-container">`;
    tests.forEach(test => {
        html += `
            <div class="card" onclick="alert('Starting Quiz: ${test}...')">
                <i class="fas fa-question-circle"></i>
                <h3>${test} Test</h3>
            </div>
        `;
    });
    html += `</div>`;
    app.innerHTML = html;
}

// H. TO-DO LIST (Unchanged)
function renderTodoList(semester) {
    navHistory.push({ name: 'To-Do List', action: () => renderTodoList(semester) });
    updateBreadcrumbs();
    clearView();

    if (semester !== 'Semester 2') {
        app.innerHTML = '<h2>To-Do List is currently optimized for Semester 2</h2>';
        return;
    }

    let allLessons = [];
    for (const [subject, chapters] of Object.entries(semester2Data)) {
        for (const [chapter, lessons] of Object.entries(chapters)) {
            lessons.forEach(l => allLessons.push({ id: `${subject}-${l}`, text: `${subject}: ${l}` }));
        }
    }

    let html = `
        <h2 style="margin-bottom:1.5rem;">Semester 2 Study Tracker</h2>
        <div class="todo-container">
    `;

    allLessons.forEach(item => {
        const isChecked = localStorage.getItem(item.id) === 'true' ? 'checked' : '';
        const isCompletedClass = isChecked ? 'completed' : '';

        html += `
            <div class="todo-item ${isCompletedClass}" id="row-${item.id}">
                <input type="checkbox" id="${item.id}" ${isChecked} onchange="toggleTodo('${item.id}')">
                <label for="${item.id}">${item.text}</label>
            </div>
        `;
    });
    html += `</div>`;
    app.innerHTML = html;
}

function toggleTodo(id) {
    const checkbox = document.getElementById(id);
    const row = document.getElementById(`row-${id}`);
    if (checkbox.checked) {
        localStorage.setItem(id, 'true');
        row.classList.add('completed');
    } else {
        localStorage.removeItem(id);
        row.classList.remove('completed');
    }
}

// --- INITIALIZE ---
renderHome();