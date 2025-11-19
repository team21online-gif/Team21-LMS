import { Lesson, Coursework, UserRole, RegistrationStats } from "./types";

export const MOCK_LESSONS: Lesson[] = [
  // --- AI Unlocked Course (Week 1) ---
  {
    id: 'ai-w1-1',
    course: 'AI Unlocked',
    week: 1,
    title: 'Session 1: Foundations & Ethics',
    module: 'Week 1: Foundations, Prompt Engineering & Business Modeling',
    duration: '2 Hours',
    difficulty: 'Beginner',
    content: `
# Foundations: AI Ethics, Data, Bias, Limitations

**Objective:** Understand the core principles of AI, the "GIGO" rule, and the ethical landscape.

## Key Concepts
1.  **The GIGO Principle:** Garbage In, Garbage Out. Your output is only as good as your input.
2.  **Data & Bias:** How AI models inherit biases from their training data.
3.  **Hallucinations:** Understanding that AI can confidently state falsehoods.

## Tools Introduced
*   ChatGPT
*   Gemini
*   Claude
    `
  },
  {
    id: 'ai-w1-2',
    course: 'AI Unlocked',
    week: 1,
    title: 'Session 2: Prompt Mastery',
    module: 'Week 1: Foundations, Prompt Engineering & Business Modeling',
    duration: '2 Hours',
    difficulty: 'Intermediate',
    content: `
# Prompt Mastery: Unlock Your Unique Voice

**Objective:** Master the art of the prompt using the 5 Essential Factors.

## The 5 Factor Framework
1.  **Persona:** Who is the AI acting as?
2.  **Tone:** What is the style of voice?
3.  **Format:** Output structure (Table, List, Code, Prose).
4.  **Detail:** Context and specific constraints.
5.  **Audience:** Who is this for?

## Assignment: PlAiBox Focus
Experiment with **ChatGPT + Suno** for creative audio generation prompts.
    `
  },
  {
    id: 'ai-w1-3',
    course: 'AI Unlocked',
    week: 1,
    title: 'Session 3: Strategy I (BMC & SOSTAC)',
    module: 'Week 1: Foundations, Prompt Engineering & Business Modeling',
    duration: '2 Hours',
    difficulty: 'Advanced',
    content: `
# Strategy I: Business Frameworks

**Objective:** Apply AI to draft business strategies.

## Business Model Canvas (BMC)
Use AI to draft the 9 building blocks of a business.

## SOSTAC
*   **S**ituation
*   **O**bjectives
*   **S**trategy
*   **T**actics
*   **A**ction
*   **C**ontrol

## Mini-Project (Due Sept 11)
Build your first AI Agent + draft a BMC (1st version).
    `
  },
  // --- AI Unlocked Course (Week 2) ---
  {
    id: 'ai-w2-1',
    course: 'AI Unlocked',
    week: 2,
    title: 'Session 4: Content I (Authoring)',
    module: 'Week 2: Content Creation, Authoring & Strategy',
    duration: '2 Hours',
    difficulty: 'Intermediate',
    content: `
# Content I: Blogging, Podcasting & Books

**Objective:** Leverage AI for long-form content creation.

## Topics
*   Blogging workflows.
*   Podcasting scripts and planning.
*   Book Writing: Creating teasers and covers using AI.

## Tools
*   **Canva** & **Ideogram** for visuals.
*   **Jasper** for copy.
    `
  },
  {
    id: 'ai-w2-2',
    course: 'AI Unlocked',
    week: 2,
    title: 'Session 5: Content II (Applied AI)',
    module: 'Week 2: Content Creation, Authoring & Strategy',
    duration: '2 Hours',
    difficulty: 'Advanced',
    content: `
# Content II: Applied Content AI

**Objective:** Advanced content generation.

## Focus Areas
*   **Chatbots:** Designing conversational flows.
*   **Perplexity:** Deep research and citation.
*   **Runway:** Video generation basics.

## Mandatory PlAiBox
**Bilingual Book Project:** Write a bilingual book segment and create an audiobook version using **ElevenLabs.io**.
    `
  },
  // --- AI Unlocked Course (Week 3) ---
  {
    id: 'ai-w3-1',
    course: 'AI Unlocked',
    week: 3,
    title: 'Session 7: Strategy II (Scaling)',
    module: 'Week 3: Entrepreneurship, Scaling & Execution',
    duration: '2 Hours',
    difficulty: 'Advanced',
    content: `
# Strategy II: Building an AI-Powered Business

**Objective:** Deep dive into SOSTAC - Strategy & Tactics.

## Group Work
Prepare for presentations on scaling businesses using digital marketing automation.

## Tools
*   **Notion** for organization.
*   **GitHub** for version control/code.
*   **Websim** for simulation.
    `
  },
  {
    id: 'ai-w3-2',
    course: 'AI Unlocked',
    week: 3,
    title: 'Session 9: Execution & Mega Prompts',
    module: 'Week 3: Entrepreneurship, Scaling & Execution',
    duration: '2 Hours',
    difficulty: 'Advanced',
    content: `
# Execution: Branding & Funnels

**Objective:** Execute on the business plan.

## Key Activities
*   Branding Identity.
*   Customer Engagement Funnels.
*   **Mega Agentic Prompts:** Complex, multi-step prompts (e.g., for Construction Engineering planning).
    `
  },
  // --- AI Unlocked Course (Week 4) ---
  {
    id: 'ai-w4-1',
    course: 'AI Unlocked',
    week: 4,
    title: 'Session 10: Capstone Work Day',
    module: 'Week 4: Capstone Project & Graduation',
    duration: '4 Hours',
    difficulty: 'Advanced',
    content: `
# Capstone Work Day

**Objective:** Finalization of your Capstone Project.

## Requirements
1.  **Project Output:** The functional deliverable.
2.  **Presentation:** Created using **Gamma Slides**.
3.  **Submission:** Must include all prior PlAiBoxes and Group Work.

**Final Presentation:** Deliver a pitch demonstrating your AI-powered solution with real business potential (Target ROI > 10%).
    `
  },
  // --- The Leader's Heart Course ---
  {
    id: 'lh-1',
    course: "The Leader's Heart",
    week: 1,
    title: 'Chapter 1: The Leader in the Mirror',
    module: 'Part 1: Forging the Heart',
    duration: 'Week 1',
    difficulty: 'Beginner',
    content: `
# The Leader in the Mirror

**Premise:** Leadership is not about titles; it is a matter of character.

## Key Concepts
*   **Created for Influence:** Everyone has the capacity for influence.
*   **Servant First:** As Robert K. Greenleaf said, "The servant-leader is servant first."
*   **The Abraham Lincoln Example:** Leadership defined by integrity and purpose, not pedigree.

## The Leader's Forge
**Seek Out Wisdom:** Connect with three people you admire. Ask them about their journey. Do not ask for a job; ask for wisdom.
    `
  },
  {
    id: 'lh-2',
    course: "The Leader's Heart",
    week: 4,
    title: 'Chapter 4: Charting Your North Star',
    module: 'Part 1: Forging the Heart',
    duration: 'Week 4',
    difficulty: 'Intermediate',
    content: `
# Charting Your North Star

**Objective:** Define your personal mission statement.

## The D.R.A.F.T.E.D. Framework
*   **D**ream Again: Reconnect with passions.
*   **R**eady Yourself: Commit to change.
*   **A**im with Purpose: Define your "Why".
*   **F**ire with Goals: Set SMART goals.
*   **T**ime: Allocate resources.
*   **E**valuate: Track progress.
*   **D**iscipline: Manage distractions.

## Assignment
Draft your personal mission statement. Example: "To be a teacher. And to be known for inspiring my students to be more than they thought they could be." - Oprah Winfrey
    `
  },
  {
    id: 'lh-3',
    course: "The Leader's Heart",
    week: 11,
    title: 'Chapter 11: Stronger Together',
    module: 'Part 2: Hands at Work',
    duration: 'Week 11',
    difficulty: 'Intermediate',
    content: `
# Stronger Together

**Objective:** Build your "Inner Circle".

## The 5 Archetypes You Need
1.  **The Mentor:** Wisdom from experience.
2.  **The Peer:** In the trenches with you.
3.  **The Protégé:** Someone you develop.
4.  **The Truth-Teller:** Challenges your blind spots.
5.  **The Encourager:** Lifts you up.

## The Leader's Forge
Identify specific individuals in your life for each role and create a plan to cultivate those relationships.
    `
  }
];

export const MOCK_COURSEWORK: Coursework[] = [
  {
    id: 'cw1',
    course: 'AI Unlocked',
    title: 'Week 1 Mini-Project: AI Agent & BMC',
    description: 'Build your first AI Agent and draft a Business Model Canvas (1st Version).',
    dueDate: '2025-09-11',
    status: 'SUBMITTED',
    studentId: 's1',
    submissionContent: 'Here is the link to my custom GPT agent and the PDF of my BMC...',
    grade: 92,
    feedback: 'Excellent use of the CLEAR framework in your prompting. The BMC is comprehensive.'
  },
  {
    id: 'cw2',
    course: "The Leader's Heart",
    title: "The Leader's Forge: Seek Out Wisdom",
    description: 'Interview 3 leaders and document your key takeaways.',
    dueDate: '2025-10-20',
    status: 'PENDING',
    studentId: 's1',
  },
  {
    id: 'cw3',
    course: 'AI Unlocked',
    title: 'Week 2 PlAiBox: Bilingual Book',
    description: 'Write a bilingual book segment and generate an audiobook using ElevenLabs.',
    dueDate: '2025-09-13',
    status: 'SUBMITTED',
    studentId: 's2',
    submissionContent: 'Attached is the MP3 file from ElevenLabs and the text script.',
  },
  {
    id: 'cw4',
    course: 'AI Unlocked',
    title: 'Week 4: Capstone Final Submission',
    description: 'Submit Capstone Project, Gamma Presentation, and all prior PlAiBoxes.',
    dueDate: '2025-09-28',
    status: 'PENDING',
    studentId: 's1',
  }
];

export const MOCK_STATS: RegistrationStats[] = [
  { month: 'Aug', students: 12, mentors: 1 },
  { month: 'Sep', students: 25, mentors: 3 },
  { month: 'Oct', students: 45, mentors: 4 },
  { month: 'Nov', students: 80, mentors: 6 },
  { month: 'Dec', students: 110, mentors: 8 },
  { month: 'Jan', students: 150, mentors: 12 },
];

export const DEMO_USERS = [
  {
    id: 's1',
    name: 'Alice Student',
    email: 'student@team21.com',
    role: UserRole.STUDENT,
    avatarUrl: 'https://picsum.photos/100/100'
  },
  {
    id: 'm1',
    name: 'Bob Mentor',
    email: 'mentor@team21.com',
    role: UserRole.MENTOR,
    avatarUrl: 'https://picsum.photos/101/101'
  },
  {
    id: 'a1',
    name: 'Charlie Admin',
    email: 'admin@team21.com',
    role: UserRole.ADMIN,
    avatarUrl: 'https://picsum.photos/102/102'
  }
];