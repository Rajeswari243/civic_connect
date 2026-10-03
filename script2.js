/* =========================================================
   CIVICRESOLVE AI
   Standalone Hackathon Prototype
========================================================= */


/* =========================================================
   STORAGE
========================================================= */

const STORAGE_KEY = "civicresolve_v3";


/* =========================================================
   DEPARTMENTS
========================================================= */

const departments = {

    "Road": "Roads Department",

    "Streetlight": "Electrical Department",

    "Garbage": "Sanitation Department",

    "Water": "Water Supply Department",

    "Drainage": "Drainage Department",

    "Traffic Signal": "Traffic Department",

    "Public Safety": "Public Safety Department",

    "Other": "Municipal Services"

};


/* =========================================================
   DEMO OFFICERS
   Officer assignment depends on:
   CATEGORY + WARD
========================================================= */

const officers = [

    {
        id: "OFF-R1",
        name: "Raj Kumar",
        department: "Roads Department",
        ward: "Ward 1",
        designation: "Roads Officer"
    },

    {
        id: "OFF-R2",
        name: "Suresh Rao",
        department: "Roads Department",
        ward: "Ward 2",
        designation: "Roads Officer"
    },

    {
        id: "OFF-R3",
        name: "Vikram Singh",
        department: "Roads Department",
        ward: "Ward 3",
        designation: "Roads Officer"
    },

    {
        id: "OFF-R4",
        name: "Anil Kumar",
        department: "Roads Department",
        ward: "Ward 4",
        designation: "Roads Officer"
    },


    {
        id: "OFF-E1",
        name: "Arun Rao",
        department: "Electrical Department",
        ward: "Ward 1",
        designation: "Electrical Officer"
    },

    {
        id: "OFF-E2",
        name: "Ravi Teja",
        department: "Electrical Department",
        ward: "Ward 2",
        designation: "Electrical Officer"
    },


    {
        id: "OFF-S1",
        name: "Priya Sharma",
        department: "Sanitation Department",
        ward: "Ward 2",
        designation: "Sanitation Supervisor"
    },

    {
        id: "OFF-S2",
        name: "Lakshmi Devi",
        department: "Sanitation Department",
        ward: "Ward 1",
        designation: "Sanitation Supervisor"
    },


    {
        id: "OFF-W1",
        name: "Meena Devi",
        department: "Water Supply Department",
        ward: "Ward 1",
        designation: "Water Supply Officer"
    },

    {
        id: "OFF-W2",
        name: "Kiran Kumar",
        department: "Water Supply Department",
        ward: "Ward 2",
        designation: "Water Supply Officer"
    },


    {
        id: "OFF-D3",
        name: "Anjali Sharma",
        department: "Drainage Department",
        ward: "Ward 3",
        designation: "Drainage Engineer"
    },


    {
        id: "OFF-T1",
        name: "Ramesh Babu",
        department: "Traffic Department",
        ward: "Ward 1",
        designation: "Traffic Officer"
    },


    {
        id: "OFF-P1",
        name: "Kavya Nair",
        department: "Public Safety Department",
        ward: "Ward 2",
        designation: "Public Safety Officer"
    },


    {
        id: "OFF-M1",
        name: "Suresh Kumar",
        department: "Municipal Services",
        ward: "Ward 1",
        designation: "Municipal Officer"
    }
   
];


/* =========================================================
   DEMO USERS
========================================================= */

const users = [

    {
        id: "CIT-001",
        name: "Demo Citizen",
        email: "citizen@demo.com",
        password: "1234",
        role: "CITIZEN"
    },


    {
        id: "AUTH-001",
        name: "Admin Officer",
        email: "admin@demo.com",
        password: "admin123",
        role: "AUTHORITY",
        department: "Municipal Administration"
    },


    {
        id: "AUTH-002",
        name: "Suresh Rao",
        email: "suresh@demo.com",
        password: "admin123",
        role: "AUTHORITY",
        department: "Roads Department",
        ward: "Ward 2",
        officerId: "OFF-R2"
    },


    {
        id: "AUTH-003",
        name: "Raj Kumar",
        email: "raj@demo.com",
        password: "admin123",
        role: "AUTHORITY",
        department: "Roads Department",
        ward: "Ward 1",
        officerId: "OFF-R1"
    }

];


/* =========================================================
   STATUS LABELS
========================================================= */

const statusLabels = {

    SUBMITTED: "Submitted",

    UNDER_VERIFICATION: "Under Verification",

    VERIFIED: "Verified",

    ASSIGNED: "Assigned",

    WORK_SCHEDULED: "Work Scheduled",

    IN_PROGRESS: "In Progress",

    ON_HOLD: "On Hold",

    RESOLVED: "Resolved",

    CITIZEN_CONFIRMED: "Citizen Confirmed",

    REJECTED: "Rejected",

    REOPEN_REQUESTED: "Reopen Requested",

    REOPENED: "Reopened"

};


/* =========================================================
   APPLICATION STATE
========================================================= */

let state = loadData();

let session = null;

let loginRole = "CITIZEN";

let authorityFilter = "ALL";


/* =========================================================
   LOAD DATA
========================================================= */

function loadData() {

    const saved =
        localStorage.getItem(STORAGE_KEY);

    if (saved) {

        return JSON.parse(saved);

    }


    return {

        nextId: 1004,

        issues: [

            createDemoIssue(
                "CR-1001",
                "Large pothole near school",
                "Road",
                "Ward 2",
                "Main Road near Government School",
                "High",
                85,
                3,
                "IN_PROGRESS",
                60,
                "Suresh Rao",
                "OFF-R2",
                "Roads Department",
                5
            ),


            createDemoIssue(
                "CR-1002",
                "Broken streetlight",
                "Streetlight",
                "Ward 1",
                "Market Road",
                "Medium",
                40,
                1,
                "ASSIGNED",
                10,
                "Arun Rao",
                "OFF-E1",
                "Electrical Department",
                8
            ),


            createDemoIssue(
                "CR-1003",
                "Garbage accumulation",
                "Garbage",
                "Ward 2",
                "Bus Stand Road",
                "High",
                120,
                2,
                "RESOLVED",
                100,
                "Priya Sharma",
                "OFF-S1",
                "Sanitation Department",
                -2
            )

        ]

    };

}


/* =========================================================
   DEMO ISSUE CREATOR
========================================================= */

function createDemoIssue(
    id,
    title,
    category,
    ward,
    location,
    severity,
    affected,
    risk,
    status,
    progress,
    officerName,
    officerId,
    department,
    etaDays
) {

    const created =
        new Date(
            Date.now() - 86400000 * 3
        ).toISOString();


    const priority =
        calculatePriority(
            severity,
            affected,
            risk
        );


    const eta =
        new Date(
            Date.now() +
            86400000 * etaDays
        )
        .toISOString()
        .split("T")[0];


    return {

        id,

        title,

        category,

        ward,

        location,

        severity,

        affected,

        risk,

        description:
            "Demo issue created for hackathon presentation.",

        citizenId:
            "CIT-001",

        priorityScore:
            priority.score,

        priorityLevel:
            getPriorityLevel(priority.score),

        status,

        verificationStatus:
            status === "ASSIGNED" ||
            status === "IN_PROGRESS" ||
            status === "RESOLVED"
                ? "VERIFIED"
                : "SUBMITTED",

        department,

        officerId,

        officerName,

        assignedAt:
            officerName
                ? created
                : "",

        expectedStart:
            officerName
                ? new Date(
                    Date.now() -
                    86400000
                )
                .toISOString()
                .split("T")[0]
                : "",

        eta,

        progress,

        citizenConfirmation:
            status === "RESOLVED"
                ? "PENDING"
                : "",

        reopeningRequested: false,

        rejectionReason: "",

        delayReason: "",

        createdAt: created,

        resolvedAt:
            status === "RESOLVED"
                ? new Date().toISOString()
                : "",

        timeline: [

            {
                event: "Issue Submitted",

                description:
                    "Citizen submitted the civic issue.",

                by: "Demo Citizen",

                role: "CITIZEN",

                at: created
            }

        ]

    };

}


/* =========================================================
   SAVE
========================================================= */

function saveData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
    );

}


/* =========================================================
   UTILITIES
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(
            /[&<>"']/g,

            function (character) {

                const map = {

                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"

                };

                return map[character];

            }
        );

}


function formatDate(date) {

    if (!date) {

        return "Not set";

    }


    return new Date(
        date + "T00:00:00"
    )
    .toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function formatDateTime(date) {

    if (!date) {

        return "Not available";

    }


    return new Date(date)
        .toLocaleString(
            "en-IN",
            {
                dateStyle: "medium",
                timeStyle: "short"
            }
        );

}


function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(
        () => toast.classList.remove("show"),
        2500
    );

}


/* =========================================================
   PRIORITY ENGINE
========================================================= */

function calculatePriority(
    severity,
    affected,
    risk
) {

    const severityPoints = {

        Low: 8,

        Medium: 16,

        High: 24,

        Critical: 30

    };


    const severityScore =
        severityPoints[severity] || 8;


    const peopleScore =
        Math.min(
            20,

            Math.round(
                Math.log10(
                    Number(affected || 1) + 1
                ) * 10
            )
        );


    const safetyScore =
        Math.min(
            20,
            Number(risk || 0) * 5
        );


    const baseScore = 10;


    const score =
        Math.min(
            100,

            baseScore +
            severityScore +
            peopleScore +
            safetyScore
        );


    return {

        score,

        explanation: {

            Base: baseScore,

            Severity: severityScore,

            "Affected People": peopleScore,

            "Safety Risk": safetyScore

        }

    };

}


function getPriorityLevel(score) {

    if (score >= 80) {

        return "CRITICAL";

    }

    if (score >= 60) {

        return "HIGH";

    }

    if (score >= 40) {

        return "MEDIUM";

    }

    return "LOW";

}


/* =========================================================
   OFFICER MATCHING
========================================================= */

function findOfficer(
    category,
    ward
) {

    const department =
        departments[category] ||
        departments.Other;


    return officers.find(
        officer =>
            officer.department === department &&
            officer.ward === ward
    );

}


/* =========================================================
   CURRENT USER
========================================================= */

function currentUser() {

    if (!session) {

        return null;

    }


    return users.find(
        user =>
            user.id === session.id
    );

}


function isAuthority() {

    return (
        session &&
        session.role === "AUTHORITY"
    );

}


function isCitizen() {

    return (
        session &&
        session.role === "CITIZEN"
    );

}


/* =========================================================
   LOGIN
========================================================= */

function selectLoginRole(role) {

    loginRole = role;


    document
        .getElementById("citizenTab")
        .classList.toggle(
            "active",
            role === "CITIZEN"
        );


    document
        .getElementById("authorityTab")
        .classList.toggle(
            "active",
            role === "AUTHORITY"
        );


    updateDemoCredentials();

}


function updateDemoCredentials() {

    const box =
        document.getElementById(
            "demoCredentials"
        );


    if (loginRole === "CITIZEN") {

        box.innerHTML = `
            <strong>Demo Citizen</strong><br>
            Email: citizen@demo.com<br>
            Password: 1234
        `;

    } else {

        box.innerHTML = `
            <strong>Demo Authority</strong><br>
            Email: admin@demo.com<br>
            Password: admin123
            <br><br>
            <strong>Ward Officer</strong><br>
            Email: suresh@demo.com<br>
            Password: admin123
        `;

    }

}


function login(event) {

    event.preventDefault();


    const email =
        document
        .getElementById("loginEmail")
        .value
        .trim()
        .toLowerCase();


    const password =
        document
        .getElementById("loginPassword")
        .value;


    const user =
        users.find(
            item =>
                item.email === email &&
                item.password === password &&
                item.role === loginRole
        );


    if (!user) {

        document
            .getElementById("loginMessage")
            .textContent =
            "Invalid credentials or wrong role selected.";

        return;

    }


    session = {

        id: user.id,

        role: user.role

    };


    document
        .getElementById("loginMessage")
        .textContent = "";


    updateNavigation();


    if (user.role === "AUTHORITY") {

        showPage("authority");

    } else {

        showPage("citizen");

    }


    showToast(
        `Logged in as ${user.role}`
    );

}


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    session = null;

    updateNavigation();

    showPage("login");

    document
        .getElementById("loginEmail")
        .value = "";

    document
        .getElementById("loginPassword")
        .value = "";

}


/* =========================================================
   NAVIGATION
========================================================= */

function updateNavigation() {

    const nav =
        document.getElementById(
            "navbar"
        );


    if (!session) {

        nav.classList.add("hidden");

        return;

    }


    nav.classList.remove("hidden");


    document
        .getElementById("authorityNav")
        .classList.toggle(
            "hidden",
            !isAuthority()
        );


    document
        .getElementById("analyticsNav")
        .classList.toggle(
            "hidden",
            !isAuthority()
        );

}


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function showPage(page) {

    /* Security */

    if (
        (
            page === "authority" ||
            page === "analytics"
        ) &&
        !isAuthority()
    ) {

        showToast(
            "Access denied. Authority login required."
        );

        return;

    }


    if (
        page === "citizen" &&
        !isCitizen()
    ) {

        showToast(
            "Citizen login required."
        );

        return;

    }


    if (
        page === "report" &&
        !isCitizen()
    ) {

        showToast(
            "Only citizens can report issues."
        );

        return;

    }


    document
        .querySelectorAll(".page")
        .forEach(
            element =>
                element.classList.remove("active")
        );


    const target =
        document.getElementById(
            page + "Page"
        );


    if (!target) {

        return;

    }


    target.classList.add("active");


    if (page === "home") {

        renderHome();

    }


    if (page === "citizen") {

        renderCitizen();

    }


    if (page === "authority") {

        renderAuthority();

    }


    if (page === "analytics") {

        renderAnalytics();

    }


    if (page === "report") {

        document
            .getElementById("reportForm")
            .reset();

    }

}


/* =========================================================
   HOME
========================================================= */

function renderHome() {

    const open =
        state.issues.filter(
            issue =>
                ![
                    "RESOLVED",
                    "CITIZEN_CONFIRMED"
                ].includes(issue.status)
        ).length;


    const resolved =
        state.issues.filter(
            issue =>
                [
                    "RESOLVED",
                    "CITIZEN_CONFIRMED"
                ].includes(issue.status)
        ).length;


    let totalProgress = 0;


    state.issues.forEach(
        issue =>
            totalProgress += issue.progress
    );


    const average =
        state.issues.length
            ? Math.round(
                totalProgress /
                state.issues.length
            )
            : 0;


    document
        .getElementById("homeOpen")
        .textContent = open;


    document
        .getElementById("homeResolved")
        .textContent = resolved;


    document
        .getElementById("homeProgress")
        .textContent =
        average + "%";

}


/* =========================================================
   CITIZEN DASHBOARD
========================================================= */

function renderCitizen() {

    if (!isCitizen()) {

        return;

    }


    const myIssues =
        state.issues.filter(
            issue =>
                issue.citizenId === session.id
        );


    const stats = [

        [
            "My Reports",
            myIssues.length
        ],

        [
            "Open",
            myIssues.filter(
                issue =>
                    ![
                        "RESOLVED",
                        "CITIZEN_CONFIRMED"
                    ].includes(issue.status)
            ).length
        ],

        [
            "In Progress",
            myIssues.filter(
                issue =>
                    issue.status === "IN_PROGRESS"
            ).length
        ],

        [
            "Resolved",
            myIssues.filter(
                issue =>
                    [
                        "RESOLVED",
                        "CITIZEN_CONFIRMED"
                    ].includes(issue.status)
            ).length
        ]

    ];


    document
        .getElementById("citizenStats")
        .innerHTML =
        stats.map(
            stat => `
                <div class="stat-card">

                    <div class="stat-label">
                        ${stat[0]}
                    </div>

                    <div class="stat-value">
                        ${stat[1]}
                    </div>

                </div>
            `
        ).join("");


    const search =
        document
        .getElementById("citizenSearch")
        .value
        .toLowerCase();


    const filter =
        document
        .getElementById(
            "citizenStatusFilter"
        )
        .value;


    const filtered =
        myIssues.filter(
            issue => {

                const matchesSearch =
                    `${issue.id}
                    ${issue.title}
                    ${issue.category}
                    ${issue.ward}`
                    .toLowerCase()
                    .includes(search);


                const matchesStatus =
                    filter === "ALL" ||
                    issue.status === filter;


                return (
                    matchesSearch &&
                    matchesStatus
                );

            }
        );


    const container =
        document.getElementById(
            "citizenIssues"
        );


    if (!filtered.length) {

        container.innerHTML =
            `<div class="empty">
                No issues found.
            </div>`;

        return;

    }


    container.innerHTML =
        filtered
        .map(
            issue =>
                createIssueCard(
                    issue,
                    false
                )
        )
        .join("");

}


/* =========================================================
   ISSUE CARD
========================================================= */

function createIssueCard(
    issue,
    authorityView
) {

    const overdue =
        isOverdue(issue);


    let statusClass =
        "orange";


    if (
        issue.status === "RESOLVED" ||
        issue.status ===
            "CITIZEN_CONFIRMED"
    ) {

        statusClass = "green";

    } else if (
        issue.status ===
        "IN_PROGRESS"
    ) {

        statusClass = "blue";

    } else if (overdue) {

        statusClass = "red";

    }


    return `

        <article class="issue-card">

            <div class="issue-top">

                <div>

                    <div class="issue-id">
                        ${escapeHTML(issue.id)}
                    </div>

                    <div class="issue-title">
                        ${escapeHTML(issue.title)}
                    </div>

                </div>


                <span class="pill ${statusClass}">
                    ${statusLabels[issue.status]}
                </span>

            </div>


            <div class="issue-meta">

                <span class="pill">
                    ${escapeHTML(issue.category)}
                </span>

                <span class="pill">
                    ${escapeHTML(issue.ward)}
                </span>

                <span class="pill">
                    Priority ${issue.priorityScore}
                </span>

                ${
                    overdue
                    ? `
                        <span class="pill red">
                            OVERDUE
                        </span>
                    `
                    : ""
                }

            </div>


            <p class="muted">
                ${escapeHTML(issue.location)}
            </p>


            <p>

                <strong>
                    Department:
                </strong>

                ${escapeHTML(
                    issue.department ||
                    "Not assigned"
                )}

                <br>


                <strong>
                    Responsible Officer:
                </strong>

                ${escapeHTML(
                    issue.officerName ||
                    "Not assigned"
                )}

            </p>


            <div class="progress">

                <div
                    class="progress-bar"
                    style="width:${issue.progress}%">
                </div>

            </div>


            <div class="issue-footer">

                <small>
                    ${issue.progress}% progress
                </small>


                <button
                    class="link-btn"
                    onclick="openDetails('${issue.id}')">

                    View Details →

                </button>

            </div>

        </article>

    `;

}


/* =========================================================
   SUBMIT ISSUE
========================================================= */

function submitIssue(event) {

    event.preventDefault();


    if (!isCitizen()) {

        showToast(
            "Citizen login required."
        );

        return;

    }


    const title =
        document
        .getElementById("issueTitle")
        .value
        .trim();


    const category =
        document
        .getElementById("issueCategory")
        .value;


    const ward =
        document
        .getElementById("issueWard")
        .value;


    const location =
        document
        .getElementById("issueLocation")
        .value
        .trim();


    const severity =
        document
        .getElementById("issueSeverity")
        .value;


    const affected =
        Number(
            document
            .getElementById("affectedPeople")
            .value
        );


    const risk =
        Number(
            document
            .getElementById("safetyRisk")
            .value
        );


    const description =
        document
        .getElementById("issueDescription")
        .value
        .trim();


    const priority =
        calculatePriority(
            severity,
            affected,
            risk
        );


    const issueId =
        "CR-" +
        state.nextId++;


    const issue = {

        id: issueId,

        title,

        category,

        ward,

        location,

        severity,

        affected,

        risk,

        description,

        citizenId:
            session.id,

        priorityScore:
            priority.score,

        priorityLevel:
            getPriorityLevel(
                priority.score
            ),

        status:
            "SUBMITTED",

        verificationStatus:
            "SUBMITTED",

        department: "",

        officerId: "",

        officerName: "",

        assignedAt: "",

        expectedStart: "",

        eta: "",

        progress: 0,

        citizenConfirmation: "",

        reopeningRequested: false,

        rejectionReason: "",

        delayReason: "",

        createdAt:
            new Date().toISOString(),

        resolvedAt: "",

        timeline: [

            {

                event:
                    "Issue Submitted",

                description:
                    "Citizen submitted the civic issue. Waiting for authority verification.",

                by:
                    currentUser().name,

                role:
                    "CITIZEN",

                at:
                    new Date().toISOString()

            }

        ]

    };


    state.issues.unshift(issue);


    saveData();


    showToast(
        `${issueId} submitted successfully.`
    );


    showPage("citizen");


    setTimeout(
        () => openDetails(issueId),
        200
    );

}


/* =========================================================
   AUTHORITY DASHBOARD
========================================================= */

function renderAuthority() {

    if (!isAuthority()) {

        return;

    }


    const issues =
        state.issues;


    const stats = [

        [
            "Pending Verification",
            issues.filter(
                issue =>
                    [
                        "SUBMITTED",
                        "UNDER_VERIFICATION"
                    ].includes(
                        issue.status
                    )
            ).length
        ],

        [
            "Unassigned",
            issues.filter(
                issue =>
                    issue.verificationStatus ===
                        "VERIFIED" &&
                    !issue.officerId
            ).length
        ],

        [
            "In Progress",
            issues.filter(
                issue =>
                    issue.status ===
                    "IN_PROGRESS"
            ).length
        ],

        [
            "Overdue",
            issues.filter(
                issue =>
                    isOverdue(issue)
            ).length
        ],

        [
            "Resolved",
            issues.filter(
                issue =>
                    [
                        "RESOLVED",
                        "CITIZEN_CONFIRMED"
                    ].includes(
                        issue.status
                    )
            ).length
        ],

        [
            "Reopen Requests",
            issues.filter(
                issue =>
                    issue.status ===
                    "REOPEN_REQUESTED"
            ).length
        ]

    ];


    document
        .getElementById("authorityStats")
        .innerHTML =
        stats.map(
            stat => `

                <div class="stat-card">

                    <div class="stat-label">
                        ${stat[0]}
                    </div>

                    <div class="stat-value">
                        ${stat[1]}
                    </div>

                </div>

            `
        ).join("");


    const search =
        document
        .getElementById("authoritySearch")
        .value
        .toLowerCase();


    const ward =
        document
        .getElementById(
            "authorityWardFilter"
        )
        .value;


    let filtered =
        issues.filter(
            issue => {

                const matchesSearch =
                    `${issue.id}
                    ${issue.title}
                    ${issue.category}
                    ${issue.ward}
                    ${issue.officerName}`
                    .toLowerCase()
                    .includes(search);


                const matchesWard =
                    ward === "ALL" ||
                    issue.ward === ward;


                return (
                    matchesSearch &&
                    matchesWard
                );

            }
        );


    if (
        authorityFilter ===
        "PENDING"
    ) {

        filtered =
            filtered.filter(
                issue =>
                    [
                        "SUBMITTED",
                        "UNDER_VERIFICATION"
                    ].includes(
                        issue.status
                    )
            );

    }


    if (
        authorityFilter ===
        "UNASSIGNED"
    ) {

        filtered =
            filtered.filter(
                issue =>
                    issue.verificationStatus ===
                        "VERIFIED" &&
                    !issue.officerId
            );

    }


    if (
        authorityFilter ===
        "WORK"
    ) {

        filtered =
            filtered.filter(
                issue =>
                    [
                        "WORK_SCHEDULED",
                        "IN_PROGRESS",
                        "ON_HOLD",
                        "REOPENED"
                    ].includes(
                        issue.status
                    )
            );

    }


    if (
        authorityFilter ===
        "OVERDUE"
    ) {

        filtered =
            filtered.filter(
                issue =>
                    isOverdue(issue)
            );

    }


    if (
        authorityFilter ===
        "REOPEN"
    ) {

        filtered =
            filtered.filter(
                issue =>
                    issue.status ===
                    "REOPEN_REQUESTED"
            );

    }


    const container =
        document.getElementById(
            "authorityIssues"
        );


    if (!filtered.length) {

        container.innerHTML =
            `<div class="empty">
                No issues in this queue.
            </div>`;

        return;

    }


    container.innerHTML =
        filtered
        .map(
            issue =>
                createAuthorityCard(
                    issue
                )
        )
        .join("");

}


/* =========================================================
   AUTHORITY CARD
========================================================= */

function createAuthorityCard(issue) {

    return `

        <article class="issue-card">

            <div class="issue-top">

                <div>

                    <div class="issue-id">
                        ${escapeHTML(issue.id)}
                    </div>

                    <div class="issue-title">
                        ${escapeHTML(issue.title)}
                    </div>

                </div>


                <span class="pill blue">
                    ${statusLabels[issue.status]}
                </span>

            </div>


            <div class="issue-meta">

                <span class="pill">
                    ${escapeHTML(issue.category)}
                </span>

                <span class="pill">
                    ${escapeHTML(issue.ward)}
                </span>

                <span class="pill">
                    Priority
                    ${issue.priorityScore}
                    -
                    ${issue.priorityLevel}
                </span>


                ${
                    isOverdue(issue)
                    ? `
                        <span class="pill red">
                            OVERDUE
                        </span>
                    `
                    : ""
                }

            </div>


            <p>

                <strong>
                    Department:
                </strong>

                ${escapeHTML(
                    issue.department ||
                    "Not assigned"
                )}

                <br>


                <strong>
                    Officer:
                </strong>

                ${escapeHTML(
                    issue.officerName ||
                    "Not assigned"
                )}

                <br>


                <strong>
                    Progress:
                </strong>

                ${issue.progress}%

            </p>


            ${
                issue.status ===
                "REOPEN_REQUESTED"
                ?
                `
                    <div class="reopen-box">

                        <strong>
                            Citizen Reopen Request
                        </strong>

                        <p>
                            Citizen says the issue
                            still exists.
                        </p>

                    </div>
                `
                :
                ""
            }


            <div class="progress">

                <div
                    class="progress-bar"
                    style="width:${issue.progress}%">
                </div>

            </div>


            <div class="issue-footer">

                <small>
                    ${formatDateTime(
                        issue.createdAt
                    )}
                </small>


                <button
                    class="primary"
                    onclick="openManage('${issue.id}')">

                    Manage Officially

                </button>

            </div>

        </article>

    `;

}


/* =========================================================
   AUTHORITY FILTER
========================================================= */

function setAuthorityFilter(
    filter,
    button
) {

    authorityFilter = filter;


    document
        .querySelectorAll(
            ".filter-tab"
        )
        .forEach(
            item =>
                item.classList.remove(
                    "active"
                )
        );


    button.classList.add(
        "active"
    );


    renderAuthority();

}


/* =========================================================
   OVERDUE
========================================================= */

function isOverdue(issue) {

    if (!issue.eta) {

        return false;

    }


    if (
        [
            "RESOLVED",
            "CITIZEN_CONFIRMED"
        ].includes(
            issue.status
        )
    ) {

        return false;

    }


    return (
        new Date(
            issue.eta +
            "T23:59:59"
        ) < new Date()
    );

}


/* =========================================================
   OPEN AUTHORITY MANAGEMENT
========================================================= */

function openManage(issueId) {

    if (!isAuthority()) {

        showToast(
            "Authority access required."
        );

        return;

    }


    const issue =
        state.issues.find(
            item =>
                item.id === issueId
        );


    if (!issue) {

        return;

    }


    document
        .getElementById(
            "manageIssueId"
        )
        .value = issue.id;


    document
        .getElementById(
            "manageVerification"
        )
        .value =
        issue.verificationStatus ||
        "UNDER_VERIFICATION";


    document
        .getElementById(
            "manageStatus"
        )
        .value =
        issue.status;


    populateDepartments(
        issue.department
    );


    populateOfficers(
        issue.category,
        issue.ward,
        issue.officerId
    );


    document
        .getElementById(
            "manageProgress"
        )
        .value =
        issue.progress;


    document
        .getElementById(
            "manageStart"
        )
        .value =
        issue.expectedStart ||
        "";


    document
        .getElementById(
            "manageETA"
        )
        .value =
        issue.eta ||
        "";


    document
        .getElementById(
            "manageDelay"
        )
        .value =
        issue.delayReason ||
        "";


    document
        .getElementById(
            "manageNote"
        )
        .value = "";


    document
        .getElementById(
            "rejectReason"
        )
        .value =
        issue.rejectionReason ||
        "";


    document
        .getElementById(
            "manageSummary"
        )
        .innerHTML = `

            <strong>
                ${escapeHTML(issue.id)}
            </strong>

            -

            ${escapeHTML(issue.title)}

            <br>

            ${escapeHTML(issue.category)}
            •
            ${escapeHTML(issue.ward)}
            •
            Priority
            ${issue.priorityScore}
            (${issue.priorityLevel})

        `;


    document
        .getElementById(
            "manageModal"
        )
        .classList.remove(
            "hidden"
        );

}


/* =========================================================
   DEPARTMENT DROPDOWN
========================================================= */

function populateDepartments(
    selected
) {

    const select =
        document.getElementById(
            "manageDepartment"
        );


    select.innerHTML =
        Object
        .values(departments)
        .map(
            department => `

                <option
                    value="${escapeHTML(department)}"
                    ${
                        department === selected
                        ? "selected"
                        : ""
                    }>

                    ${escapeHTML(
                        department
                    )}

                </option>

            `
        )
        .join("");

}


/* =========================================================
   OFFICER DROPDOWN
========================================================= */

function populateOfficers(
    category,
    ward,
    selectedId
) {

    const department =
        departments[category] ||
        "Municipal Services";


    const matching =
        officers.filter(
            officer =>
                officer.department ===
                    department &&
                officer.ward === ward
        );


    const select =
        document.getElementById(
            "manageOfficer"
        );


    select.innerHTML = `

        <option value="">
            Unassigned
        </option>

        ${
            matching
            .map(
                officer => `

                    <option
                        value="${officer.id}"
                        ${
                            officer.id ===
                            selectedId
                            ? "selected"
                            : ""
                        }>

                        ${escapeHTML(
                            officer.name
                        )}

                        -
                        ${escapeHTML(
                            officer.designation
                        )}

                    </option>

                `
            )
            .join("")
        }

    `;

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeManage() {

    document
        .getElementById(
            "manageModal"
        )
        .classList.add(
            "hidden"
        );

}


/* =========================================================
   AUTHORITY UPDATE
========================================================= */

function saveAuthorityUpdate(event) {

    event.preventDefault();


    if (!isAuthority()) {

        showToast(
            "Access denied."
        );

        return;

    }


    const issueId =
        document
        .getElementById(
            "manageIssueId"
        )
        .value;


    const issue =
        state.issues.find(
            item =>
                item.id === issueId
        );


    if (!issue) {

        return;

    }


    const authority =
        currentUser();


    const oldStatus =
        issue.status;


    const oldVerification =
        issue.verificationStatus;


    const oldOfficer =
        issue.officerName;


    const verification =
        document
        .getElementById(
            "manageVerification"
        )
        .value;


    let status =
        document
        .getElementById(
            "manageStatus"
        )
        .value;


    const department =
        document
        .getElementById(
            "manageDepartment"
        )
        .value;


    const officerId =
        document
        .getElementById(
            "manageOfficer"
        )
        .value;


    const officer =
        officers.find(
            item =>
                item.id === officerId
        );


    const progress =
        Math.max(
            0,
            Math.min(
                100,
                Number(
                    document
                    .getElementById(
                        "manageProgress"
                    )
                    .value ||
                    0
                )
            )
        );


    const expectedStart =
        document
        .getElementById(
            "manageStart"
        )
        .value;


    const eta =
        document
        .getElementById(
            "manageETA"
        )
        .value;


    const delay =
        document
        .getElementById(
            "manageDelay"
        )
        .value
        .trim();


    const note =
        document
        .getElementById(
            "manageNote"
        )
        .value
        .trim();


    const rejectReason =
        document
        .getElementById(
            "rejectReason"
        )
        .value
        .trim();


    /* =========================
       VALIDATION
    ========================= */


    if (
        verification ===
        "REJECTED" &&
        !rejectReason
    ) {

        alert(
            "Rejection reason is required."
        );

        return;

    }


    if (
        verification ===
        "REJECTED"
    ) {

        status = "REJECTED";

    }


    if (
        [
            "ASSIGNED",
            "WORK_SCHEDULED",
            "IN_PROGRESS",
            "ON_HOLD",
            "RESOLVED",
            "REOPENED"
        ].includes(status) &&
        verification !== "VERIFIED"
    ) {

        alert(
            "The issue must be verified before official work actions."
        );

        return;

    }


    if (
        status === "ASSIGNED" &&
        !officer
    ) {

        alert(
            "Please assign a responsible ward officer."
        );

        return;

    }


    if (
        status === "IN_PROGRESS" &&
        !officer
    ) {

        alert(
            "An officer must be assigned before work starts."
        );

        return;

    }


    if (
        status === "RESOLVED"
    ) {

        if (!officer) {

            alert(
                "A responsible officer is required."
            );

            return;

        }

    }


    /* =========================
       UPDATE RECORD
    ========================= */

    issue.verificationStatus =
        verification;


    issue.status =
        status;


    issue.department =
        department;


    issue.officerId =
        officer
            ? officer.id
            : "";


    issue.officerName =
        officer
            ? officer.name
            : "";


    issue.progress =
        status === "RESOLVED"
            ? 100
            : progress;


    issue.expectedStart =
        expectedStart;


    issue.eta =
        eta;


    issue.delayReason =
        delay;


    issue.rejectionReason =
        rejectReason;


    if (
        officer &&
        !issue.assignedAt
    ) {

        issue.assignedAt =
            new Date().toISOString();

    }


    /* =========================
       RESOLUTION
    ========================= */

    if (
        status === "RESOLVED"
    ) {

        issue.resolvedAt =
            new Date().toISOString();

        issue.citizenConfirmation =
            "PENDING";

    }


    /* =========================
       REOPEN APPROVAL
    ========================= */

    if (
        status === "REOPENED"
    ) {

        issue.reopeningRequested =
            false;

        issue.citizenConfirmation =
            "";

    }


    /* =========================
       TIMELINE
    ========================= */

    if (
        oldVerification !==
        verification
    ) {

        issue.timeline.push({

            event:
                verification ===
                "VERIFIED"
                    ? "Issue Verified"
                    : verification ===
                      "REJECTED"
                        ? "Issue Rejected"
                        : "Verification Updated",

            description:
                verification ===
                "REJECTED"
                    ? `Authority rejected the issue. Reason: ${rejectReason}`
                    : "Authority updated the verification decision.",

            by:
                authority.name,

            role:
                "AUTHORITY",

            at:
                new Date().toISOString()

        });

    }


    if (
        oldStatus !== status
    ) {

        issue.timeline.push({

            event:
                "Status Changed",

            description:
                `${statusLabels[oldStatus]}
                 → 
                 ${statusLabels[status]}`,

            by:
                authority.name,

            role:
                "AUTHORITY",

            at:
                new Date().toISOString()

        });

    }


    if (
        oldOfficer !==
        issue.officerName &&
        officer
    ) {

        issue.timeline.push({

            event:
                "Officer Assigned",

            description:
                `Assigned to ${officer.name}
                 (${department},
                 ${issue.ward}).`,

            by:
                authority.name,

            role:
                "AUTHORITY",

            at:
                new Date().toISOString()

        });

    }


    if (note) {

        issue.timeline.push({

            event:
                "Official Work Update",

            description:
                note,

            by:
                authority.name,

            role:
                "AUTHORITY",

            at:
                new Date().toISOString()

        });

    }


    if (
        oldStatus ===
            "REOPEN_REQUESTED" &&
        status === "REOPENED"
    ) {

        issue.timeline.push({

            event:
                "Reopen Approved",

            description:
                "Authority approved the citizen's reopen request.",

            by:
                authority.name,

            role:
                "AUTHORITY",

            at:
                new Date().toISOString()

        });

    }


    saveData();


    closeManage();


    renderAuthority();


    showToast(
        "Official issue record updated."
    );

}


/* =========================================================
   ISSUE DETAILS
========================================================= */

function openDetails(issueId) {

    const issue =
        state.issues.find(
            item =>
                item.id === issueId
        );


    if (!issue) {

        return;

    }


    /* Citizens can only see their own issues */

    if (
        isCitizen() &&
        issue.citizenId !==
            session.id
    ) {

        showToast(
            "You can only view your own reports."
        );

        return;

    }


    const canCitizenRespond =
        isCitizen() &&
        issue.citizenId ===
            session.id;


    let citizenAction = "";


    if (
        canCitizenRespond &&
        issue.status === "RESOLVED" &&
        issue.citizenConfirmation ===
            "PENDING"
    ) {

        citizenAction = `

            <div class="info-box">

                <strong>
                    Authority marked this issue as resolved.
                </strong>

                <p>
                    Please verify whether the problem
                    is actually fixed.
                </p>


                <div class="hero-buttons">

                    <button
                        class="primary"
                        onclick="
                            confirmResolution(
                                '${issue.id}'
                            )
                        ">

                        Confirm Resolution

                    </button>


                    <button
                        class="secondary"
                        onclick="
                            requestReopen(
                                '${issue.id}'
                            )
                        ">

                        Issue Still Exists

                    </button>

                </div>

            </div>

        `;

    }


    const authorityButton =
        isAuthority()
            ? `

                <button
                    class="primary"
                    onclick="
                        openManage(
                            '${issue.id}'
                        )
                    ">

                    Manage Officially

                </button>

            `
            : "";


    const backPage =
        isAuthority()
            ? "authority"
            : "citizen";


    document
        .getElementById(
            "detailsContent"
        )
        .innerHTML = `

        <div class="details-card">


            <div class="page-heading">

                <div>

                    <span class="badge">

                        ${
                            isAuthority()
                                ? "AUTHORITY VIEW"
                                : "CITIZEN VIEW"
                        }

                    </span>


                    <h2>
                        ${escapeHTML(
                            issue.title
                        )}
                    </h2>


                    <p class="muted">

                        ${escapeHTML(
                            issue.id
                        )}

                        •

                        ${escapeHTML(
                            issue.category
                        )}

                        •

                        ${escapeHTML(
                            issue.ward
                        )}

                    </p>

                </div>


                <div>

                    ${authorityButton}


                    <button
                        class="secondary"
                        onclick="
                            showPage(
                                '${backPage}'
                            )
                        ">

                        ← Back

                    </button>

                </div>

            </div>


            <div class="detail-grid">


                <div class="detail-item">

                    <small>
                        Current Status
                    </small>

                    <strong>
                        ${
                            statusLabels[
                                issue.status
                            ]
                        }
                    </strong>

                </div>


                <div class="detail-item">

                    <small>
                        Verification
                    </small>

                    <strong>
                        ${
                            statusLabels[
                                issue.verificationStatus
                            ] ||
                            issue.verificationStatus
                        }
                    </strong>

                </div>


                <div class="detail-item">

                    <small>
                        Priority
                    </small>

                    <strong>

                        ${issue.priorityScore}
                        /100

                        -

                        ${issue.priorityLevel}

                    </strong>

                </div>


                <div class="detail-item">

                    <small>
                        Ward
                    </small>

                    <strong>
                        ${escapeHTML(
                            issue.ward
                        )}
                    </strong>

                </div>


                <div class="detail-item">

                    <small>
                        Department
                    </small>

                    <strong>

                        ${escapeHTML(
                            issue.department ||
                            "Not assigned"
                        )}

                    </strong>

                </div>


                <div class="detail-item">

                    <small>
                        Responsible Officer
                    </small>

                    <strong>

                        ${escapeHTML(
                            issue.officerName ||
                            "Not assigned"
                        )}

                    </strong>

                </div>


                <div class="detail-item">

                    <small>
                        Expected Resolution
                    </small>

                    <strong>

                        ${formatDate(
                            issue.eta
                        )}

                    </strong>

                </div>


                <div class="detail-item">

                    <small>
                        Progress
                    </small>

                    <strong>

                        ${issue.progress}%

                    </strong>

                </div>


                <div class="detail-item">

                    <small>
                        Submitted
                    </small>

                    <strong>

                        ${formatDateTime(
                            issue.createdAt
                        )}

                    </strong>

                </div>

            </div>


            <h3>
                Description
            </h3>

            <p>
                ${escapeHTML(
                    issue.description
                )}
            </p>


            <p>

                <strong>
                    Location:
                </strong>

                ${escapeHTML(
                    issue.location
                )}

            </p>


            ${
                issue.rejectionReason
                ?
                `
                    <div class="reopen-box">

                        <strong>
                            Rejection Reason
                        </strong>

                        <p>
                            ${escapeHTML(
                                issue.rejectionReason
                            )}
                        </p>

                    </div>
                `
                :
                ""
            }


            ${
                issue.delayReason
                ?
                `
                    <div class="reopen-box">

                        <strong>
                            Delay Reason
                        </strong>

                        <p>
                            ${escapeHTML(
                                issue.delayReason
                            )}
                        </p>

                    </div>
                `
                :
                ""
            }


            ${citizenAction}


            <h3>
                Official Issue Timeline
            </h3>


            <div class="timeline">

                ${
                    issue.timeline
                    .slice()
                    .reverse()
                    .map(
                        item => `

                            <div class="timeline-item">

                                <div class="timeline-time">

                                    ${formatDateTime(
                                        item.at
                                    )}

                                </div>


                                <div class="timeline-event">

                                    ${escapeHTML(
                                        item.event
                                    )}

                                </div>


                                <div>

                                    ${escapeHTML(
                                        item.description
                                    )}

                                </div>


                                <small>

                                    ${escapeHTML(
                                        item.by
                                    )}

                                    •

                                    ${escapeHTML(
                                        item.role
                                    )}

                                </small>

                            </div>

                        `
                    )
                    .join("")
                }

            </div>

        </div>

    `;


    showPage("details");

}


/* =========================================================
   CITIZEN CONFIRMS RESOLUTION
========================================================= */

function confirmResolution(
    issueId
) {

    if (!isCitizen()) {

        showToast(
            "Citizen login required."
        );

        return;

    }


    const issue =
        state.issues.find(
            item =>
                item.id === issueId
        );


    if (!issue) {

        return;

    }


    if (
        issue.citizenId !==
        session.id
    ) {

        showToast(
            "You are not authorized."
        );

        return;

    }


    if (
        issue.status !==
        "RESOLVED"
    ) {

        return;

    }


    issue.status =
        "CITIZEN_CONFIRMED";


    issue.citizenConfirmation =
        "CONFIRMED";


    issue.timeline.push({

        event:
            "Citizen Confirmed Resolution",

        description:
            "Citizen confirmed that the issue has been resolved.",

        by:
            currentUser().name,

        role:
            "CITIZEN",

        at:
            new Date().toISOString()

    });


    saveData();


    showToast(
        "Resolution confirmed."
    );


    openDetails(issueId);

}


/* =========================================================
   CITIZEN REQUESTS REOPEN
========================================================= */

function requestReopen(
    issueId
) {

    if (!isCitizen()) {

        return;

    }


    const issue =
        state.issues.find(
            item =>
                item.id === issueId
        );


    if (!issue) {

        return;

    }


    if (
        issue.citizenId !==
        session.id
    ) {

        return;

    }


    if (
        issue.status !==
        "RESOLVED"
    ) {

        return;

    }


    issue.status =
        "REOPEN_REQUESTED";


    issue.reopeningRequested =
        true;


    issue.citizenConfirmation =
        "REOPEN_REQUESTED";


    issue.timeline.push({

        event:
            "Reopen Requested",

        description:
            "Citizen reported that the issue still exists. Authority review is required.",

        by:
            currentUser().name,

        role:
            "CITIZEN",

        at:
            new Date().toISOString()

    });


    saveData();


    showToast(
        "Reopen request sent to authority."
    );


    openDetails(issueId);

}


/* =========================================================
   ANALYTICS
========================================================= */

function renderAnalytics() {

    if (!isAuthority()) {

        return;

    }


    const byWard = {};

    const byCategory = {};

    const byStatus = {};


    state.issues.forEach(
        issue => {

            byWard[issue.ward] =
                (byWard[issue.ward] || 0) + 1;


            byCategory[issue.category] =
                (byCategory[issue.category] || 0) + 1;


            byStatus[issue.status] =
                (byStatus[issue.status] || 0) + 1;

        }
    );


    const createBars =
        (
            data,
            labels = data
        ) => {

            const values =
                Object.values(data);


            const maximum =
                Math.max(
                    1,
                    ...values
                );


            return Object
                .entries(data)
                .map(
                    ([key,value]) => `

                        <div class="bar">

                            <div class="bar-head">

                                <span>
                                    ${
                                        statusLabels[key] ||
                                        escapeHTML(key)
                                    }
                                </span>

                                <strong>
                                    ${value}
                                </strong>

                            </div>


                            <div class="bar-track">

                                <div
                                    class="bar-fill"
                                    style="
                                        width:
                                        ${
                                            value /
                                            maximum *
                                            100
                                        }%
                                    ">
                                </div>

                            </div>

                        </div>

                    `
                )
                .join("");

        };


    document
        .getElementById(
            "analyticsContent"
        )
        .innerHTML = `

            <div class="analytics-card">

                <h3>
                    Issues by Ward
                </h3>

                ${createBars(
                    byWard
                )}

            </div>


            <div class="analytics-card">

                <h3>
                    Issues by Category
                </h3>

                ${createBars(
                    byCategory
                )}

            </div>


            <div class="analytics-card">

                <h3>
                    Status Distribution
                </h3>

                ${createBars(
                    byStatus
                )}

            </div>


            <div class="analytics-card">

                <h3>
                    Active Officer Workload
                </h3>

                ${createOfficerWorkload()}

            </div>

        `;

}


/* =========================================================
   OFFICER WORKLOAD
========================================================= */

function createOfficerWorkload() {

    const workload =
        officers
        .map(
            officer => {

                const count =
                    state.issues.filter(
                        issue =>
                            issue.officerId ===
                                officer.id &&
                            ![
                                "RESOLVED",
                                "CITIZEN_CONFIRMED"
                            ].includes(
                                issue.status
                            )
                    ).length;


                return {

                    name:
                        officer.name,

                    count

                };

            }
        )
        .filter(
            officer =>
                officer.count > 0
        );


    if (!workload.length) {

        return `
            <p class="muted">
                No active assignments.
            </p>
        `;

    }


    const maximum =
        Math.max(
            1,
            ...workload.map(
                item =>
                    item.count
            )
        );


    return workload
        .map(
            officer => `

                <div class="bar">

                    <div class="bar-head">

                        <span>
                            ${escapeHTML(
                                officer.name
                            )}
                        </span>

                        <strong>
                            ${officer.count}
                        </strong>

                    </div>


                    <div class="bar-track">

                        <div
                            class="bar-fill"
                            style="
                                width:
                                ${
                                    officer.count /
                                    maximum *
                                    100
                                }%
                            ">
                        </div>

                    </div>

                </div>

            `
        )
        .join("");

}


/* =========================================================
   DEPARTMENT CHANGE
========================================================= */

document
    .getElementById(
        "manageDepartment"
    )
    .addEventListener(
        "change",
        function () {

            const issue =
                state.issues.find(
                    item =>
                        item.id ===
                        document
                        .getElementById(
                            "manageIssueId"
                        )
                        .value
                );


            if (!issue) {

                return;

            }


            populateOfficers(
                issue.category,
                issue.ward,
                ""
            );

        }
    );


/* =========================================================
   INITIALIZATION
========================================================= */

updateDemoCredentials();

renderHome();

