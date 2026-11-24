import { StudentProfile, Subject, StudyMaterial, MCQQuestion, Flashcard, StudyTask, ExamSchedule, UserReport } from '../types';

export const INITIAL_PROFILE: StudentProfile = {
  id: 'usr-student-001',
  fullName: 'Priya Sharma',
  email: 'priya.sharma@edunexus.edu',
  role: 'student',
  category: 'btech',
  boardOrUniversity: 'Jawaharlal Nehru Technological University (JNTU)',
  courseOrClass: 'B.Tech 3rd Year',
  branchOrStream: 'Computer Science & Engineering (CSE)',
  semester: 5,
  selectedSubjects: ['sub-btech-cse-dsa', 'sub-btech-cse-os', 'sub-btech-cse-dbms', 'sub-btech-cse-cn'],
  preferredLanguage: 'en',
  dailyGoalMinutes: 60,
  streakDays: 5,
  minutesStudiedToday: 42,
  isPremium: false,
  isOnboarded: true,
  createdAt: '2026-09-01T08:00:00Z',
};

export const MOCK_SUBJECTS: Subject[] = [
  // B.Tech CSE
  {
    id: 'sub-btech-cse-dsa',
    code: 'CS501PC',
    name: 'Data Structures & Algorithms',
    category: 'btech',
    branchOrStream: 'CSE',
    semesterOrClass: 'Semester 3 / 5',
    description: 'Trees, Graphs, Dynamic Programming, Greedy Algorithms, and Complexity Analysis.',
    iconName: 'Binary',
    colorScheme: 'from-blue-600 to-indigo-600',
    totalChapters: 5,
    totalMaterials: 14,
    progressPercent: 78,
  },
  {
    id: 'sub-btech-cse-os',
    code: 'CS502PC',
    name: 'Operating Systems',
    category: 'btech',
    branchOrStream: 'CSE',
    semesterOrClass: 'Semester 4 / 5',
    description: 'Process Synchronization, Semaphores, Deadlock Handling, Virtual Memory, and File Systems.',
    iconName: 'Cpu',
    colorScheme: 'from-indigo-600 to-violet-600',
    totalChapters: 5,
    totalMaterials: 12,
    progressPercent: 62,
  },
  {
    id: 'sub-btech-cse-dbms',
    code: 'CS503PC',
    name: 'Database Management Systems',
    category: 'btech',
    branchOrStream: 'CSE',
    semesterOrClass: 'Semester 4 / 5',
    description: 'Relational Algebra, SQL queries, Normalization (1NF to BCNF), Indexing, and ACID Transactions.',
    iconName: 'Database',
    colorScheme: 'from-violet-600 to-purple-600',
    totalChapters: 5,
    totalMaterials: 11,
    progressPercent: 85,
  },
  {
    id: 'sub-btech-cse-cn',
    code: 'CS504PC',
    name: 'Computer Networks',
    category: 'btech',
    branchOrStream: 'CSE',
    semesterOrClass: 'Semester 5',
    description: 'OSI & TCP/IP stack, Routing Protocols, TCP Congestion Control, and Network Security.',
    iconName: 'Network',
    colorScheme: 'from-cyan-600 to-blue-600',
    totalChapters: 5,
    totalMaterials: 9,
    progressPercent: 45,
  },
  {
    id: 'sub-btech-ai-ml',
    code: 'AI501PC',
    name: 'Machine Learning & Deep Learning',
    category: 'btech',
    branchOrStream: 'AI & Data Science',
    semesterOrClass: 'Semester 6',
    description: 'Supervised Learning, Neural Networks, Backpropagation, CNNs, Transformers, and PyTorch.',
    iconName: 'BrainCircuit',
    colorScheme: 'from-purple-600 to-pink-600',
    totalChapters: 6,
    totalMaterials: 15,
    progressPercent: 30,
  },
  {
    id: 'sub-btech-ece-signals',
    code: 'EC401PC',
    name: 'Signals and Systems',
    category: 'btech',
    branchOrStream: 'ECE',
    semesterOrClass: 'Semester 4',
    description: 'Continuous & Discrete Signals, Fourier Series, Laplace Transform, Z-Transform, and Filter Design.',
    iconName: 'Activity',
    colorScheme: 'from-amber-600 to-orange-600',
    totalChapters: 5,
    totalMaterials: 10,
    progressPercent: 50,
  },

  // Nursing
  {
    id: 'sub-nurs-anat-phys',
    code: 'NUR101',
    name: 'Anatomy and Physiology',
    category: 'nursing',
    branchOrStream: 'B.Sc Nursing',
    semesterOrClass: '1st Year / Sem 1',
    description: 'Human skeletal system, Cardiovascular, Respiratory, Endocrine, and Renal physiological mechanisms.',
    iconName: 'HeartPulse',
    colorScheme: 'from-rose-600 to-red-600',
    totalChapters: 8,
    totalMaterials: 18,
    progressPercent: 70,
  },
  {
    id: 'sub-nurs-fundamentals',
    code: 'NUR102',
    name: 'Fundamentals of Nursing',
    category: 'nursing',
    branchOrStream: 'B.Sc / GNM',
    semesterOrClass: '1st Year',
    description: 'Nursing process, Asepsis, Vital Signs, Medication administration, Bedmaking, and Patient safety.',
    iconName: 'Stethoscope',
    colorScheme: 'from-emerald-600 to-teal-600',
    totalChapters: 7,
    totalMaterials: 16,
    progressPercent: 88,
  },
  {
    id: 'sub-nurs-pharm',
    code: 'NUR201',
    name: 'Pharmacology in Nursing',
    category: 'nursing',
    branchOrStream: 'B.Sc Nursing',
    semesterOrClass: '2nd Year',
    description: 'Pharmacokinetics, Pharmacodynamics, Antibiotics, Cardiac drugs, Analgesics, and Nursing responsibilities.',
    iconName: 'Pill',
    colorScheme: 'from-amber-600 to-emerald-600',
    totalChapters: 6,
    totalMaterials: 15,
    progressPercent: 55,
  },
  {
    id: 'sub-nurs-medsurg',
    code: 'NUR202',
    name: 'Medical-Surgical Nursing (Adult Health)',
    category: 'nursing',
    branchOrStream: 'B.Sc / GNM',
    semesterOrClass: '2nd & 3rd Year',
    description: 'Disorders of Cardiovascular, Respiratory, Neurological systems, Pre & Post-operative Nursing Care.',
    iconName: 'Cross',
    colorScheme: 'from-blue-600 to-cyan-600',
    totalChapters: 9,
    totalMaterials: 22,
    progressPercent: 40,
  },
  {
    id: 'sub-nurs-community',
    code: 'NUR301',
    name: 'Community Health Nursing',
    category: 'nursing',
    branchOrStream: 'ANM / GNM / B.Sc',
    semesterOrClass: '3rd Year',
    description: 'Epidemiology, Primary Health Care, National Health Programs, Maternal & Child Health, Immunization.',
    iconName: 'Users',
    colorScheme: 'from-teal-600 to-green-600',
    totalChapters: 6,
    totalMaterials: 13,
    progressPercent: 65,
  },

  // Intermediate (11th & 12th)
  {
    id: 'sub-inter-physics',
    code: 'IPH201',
    name: 'Intermediate Physics (Senior Inter)',
    category: 'intermediate',
    branchOrStream: 'MPC / BiPC',
    semesterOrClass: '2nd Year (Class 12)',
    description: 'Ray & Wave Optics, Electrostatics, Current Electricity, Moving Charges & Magnetism, Semiconductors.',
    iconName: 'Zap',
    colorScheme: 'from-amber-500 to-yellow-600',
    totalChapters: 12,
    totalMaterials: 20,
    progressPercent: 68,
  },
  {
    id: 'sub-inter-chemistry',
    code: 'ICH202',
    name: 'Intermediate Chemistry (Senior Inter)',
    category: 'intermediate',
    branchOrStream: 'MPC / BiPC',
    semesterOrClass: '2nd Year (Class 12)',
    description: 'Solid State, Solutions, Electrochemistry, Organic Chemistry (Aldehydes, Ketones, Amines), Biomolecules.',
    iconName: 'FlaskConical',
    colorScheme: 'from-purple-600 to-indigo-600',
    totalChapters: 13,
    totalMaterials: 18,
    progressPercent: 54,
  },
  {
    id: 'sub-inter-maths',
    code: 'IMA201',
    name: 'Mathematics 2A & 2B',
    category: 'intermediate',
    branchOrStream: 'MPC',
    semesterOrClass: '2nd Year (Class 12)',
    description: 'Complex Numbers, Theory of Equations, Probability, Circles, System of Circles, Integration, Definite Integrals.',
    iconName: 'Calculator',
    colorScheme: 'from-blue-600 to-violet-600',
    totalChapters: 10,
    totalMaterials: 24,
    progressPercent: 82,
  },
  {
    id: 'sub-inter-botany',
    code: 'IBO201',
    name: 'Botany & Zoology (Senior Inter)',
    category: 'intermediate',
    branchOrStream: 'BiPC',
    semesterOrClass: '2nd Year (Class 12)',
    description: 'Plant Physiology, Genetics, Biotechnology, Human Anatomy, Digestion, Excretion, Reproduction.',
    iconName: 'Dna',
    colorScheme: 'from-emerald-600 to-green-600',
    totalChapters: 11,
    totalMaterials: 16,
    progressPercent: 48,
  },

  // School (Classes 1 - 10)
  {
    id: 'sub-school-math-10',
    code: 'SCH-M10',
    name: 'Class 10 Mathematics',
    category: 'school',
    branchOrStream: 'CBSE / State Board',
    semesterOrClass: 'Class 10',
    description: 'Real Numbers, Polynomials, Linear Equations, Quadratic Equations, Arithmetic Progressions, Trigonometry.',
    iconName: 'Sparkles',
    colorScheme: 'from-blue-500 to-indigo-600',
    totalChapters: 14,
    totalMaterials: 25,
    progressPercent: 80,
  },
  {
    id: 'sub-school-sci-10',
    code: 'SCH-S10',
    name: 'Class 10 Science (Physics, Chem, Bio)',
    category: 'school',
    branchOrStream: 'CBSE / State Board',
    semesterOrClass: 'Class 10',
    description: 'Chemical Reactions, Acids & Bases, Light Reflection & Refraction, Electricity, Life Processes, Heredity.',
    iconName: 'Atom',
    colorScheme: 'from-emerald-500 to-teal-600',
    totalChapters: 13,
    totalMaterials: 22,
    progressPercent: 75,
  },
  {
    id: 'sub-school-social-10',
    code: 'SCH-SS10',
    name: 'Class 10 Social Science',
    category: 'school',
    branchOrStream: 'CBSE / State Board',
    semesterOrClass: 'Class 10',
    description: 'Rise of Nationalism in Europe, Resources & Development, Democratic Politics, Understanding Economic Development.',
    iconName: 'Globe',
    colorScheme: 'from-amber-500 to-orange-600',
    totalChapters: 12,
    totalMaterials: 18,
    progressPercent: 60,
  },
  {
    id: 'sub-school-eng-10',
    code: 'SCH-E10',
    name: 'Class 10 English Language & Literature',
    category: 'school',
    branchOrStream: 'CBSE / ICSE / State',
    semesterOrClass: 'Class 10',
    description: 'First Flight prose & poetry, Footprints Without Feet, Reading Comprehension, Formal Letters, Grammar.',
    iconName: 'BookMarked',
    colorScheme: 'from-violet-500 to-purple-600',
    totalChapters: 10,
    totalMaterials: 15,
    progressPercent: 90,
  }
];

export const MOCK_MATERIALS: StudyMaterial[] = [
  // B.Tech Materials
  {
    id: 'mat-btech-dsa-01',
    title: 'Unit 1 & 2: Trees, AVL Trees & Graph Traversal (BFS & DFS)',
    description: 'Complete verified lecture notes covering binary search trees, rotations in AVL trees, BFS, DFS algorithms with pseudocode and time complexity breakdown.',
    category: 'btech',
    boardOrUniversity: 'JNTU / Autonomous Engineering Colleges',
    course: 'B.Tech',
    branchOrStream: 'CSE',
    semester: 5,
    subjectId: 'sub-btech-cse-dsa',
    subjectName: 'Data Structures & Algorithms',
    chapterTitle: 'Non-Linear Data Structures & Graphs',
    materialType: 'pdf_notes',
    language: 'en',
    readTimeMinutes: 25,
    pageCount: 38,
    uploadDate: '2026-10-12',
    tags: ['DSA', 'Trees', 'Graphs', 'Unit-1', 'JNTUH', 'ExamPrep'],
    authorOrSource: 'Prof. R. Narayana (Dept. of CSE)',
    verificationStatus: 'verified',
    isPremiumOnly: false,
    viewsCount: 3420,
    downloadsCount: 1240,
    bookmarksCount: 680,
    contentBody: `# Data Structures & Algorithms — Comprehensive Unit Notes

## 1. Binary Search Trees (BST)
A Binary Search Tree is a node-based binary tree data structure with the following properties:
- The left subtree of a node contains only nodes with keys lesser than the node’s key.
- The right subtree of a node contains only nodes with keys greater than the node’s key.
- Both the left and right subtrees must also be binary search trees.

### Search Time Complexity
- Average Case: O(log n)
- Worst Case (Skewed Tree): O(n)

\`\`\`cpp
// Standard BST Insertion
Node* insert(Node* root, int key) {
    if (root == nullptr) return new Node(key);
    if (key < root->data)
        root->left = insert(root->left, key);
    else if (key > root->data)
        root->right = insert(root->right, key);
    return root;
}
\`\`\`

## 2. AVL Trees (Self-Balancing Binary Search Trees)
In an AVL tree, the heights of the two child subtrees of any node differ by at most one:
$$\\text{Balance Factor } BF = \\text{height}(left) - \\text{height}(right) \\in \\{-1, 0, +1\\}$$

### Rotations:
1. **Left-Left (LL) Case**: Single Right Rotation
2. **Right-Right (RR) Case**: Single Left Rotation
3. **Left-Right (LR) Case**: Left rotation on child, then Right rotation on root
4. **Right-Left (RL) Case**: Right rotation on child, then Left rotation on root

## 3. Graph Traversals
### Breadth-First Search (BFS)
- Traverses level by level using a **Queue (FIFO)**.
- Time Complexity: $O(V + E)$ where $V$ is vertices and $E$ is edges.
- Space Complexity: $O(V)$ for queue and visited array.

### Depth-First Search (DFS)
- Traverses as deep as possible along each branch before backtracking using a **Stack (LIFO)** or recursion.
- Time Complexity: $O(V + E)$.
`
  },
  {
    id: 'mat-btech-dsa-pyq-01',
    title: 'DSA End-Semester Previous Year Question Paper (2025-2026)',
    description: 'Original solved question paper with 5-mark and 10-mark step-by-step model answers and scheme of valuation.',
    category: 'btech',
    boardOrUniversity: 'State Technical University',
    course: 'B.Tech',
    branchOrStream: 'CSE',
    semester: 5,
    subjectId: 'sub-btech-cse-dsa',
    subjectName: 'Data Structures & Algorithms',
    chapterTitle: 'End-Semester Exam Set-A',
    materialType: 'pyq',
    language: 'en',
    readTimeMinutes: 30,
    pageCount: 16,
    uploadDate: '2026-08-20',
    tags: ['PYQ', 'EndSem', 'Solved', 'CSE'],
    authorOrSource: 'Academic Examination Cell',
    verificationStatus: 'official',
    isPremiumOnly: false,
    viewsCount: 5120,
    downloadsCount: 2890,
    bookmarksCount: 1350,
    contentBody: `# Solved End-Semester Question Paper — CS501PC

## PART - A (Compulsory 2 Marks Each)
1. **What is an in-place sorting algorithm? Give two examples.**
   *Answer:* An algorithm is in-place if it requires $O(1)$ auxiliary memory beyond the input array. Examples: Quicksort, Heapsort, Bubble Sort.
2. **State Master Theorem for divide and conquer recurrence relations.**
   *Answer:* For $T(n) = aT(n/b) + f(n)$ where $a \\ge 1, b > 1$:
   - Case 1: If $f(n) = O(n^{\\log_b a - \\epsilon})$, then $T(n) = \\Theta(n^{\\log_b a})$.
   - Case 2: If $f(n) = \\Theta(n^{\\log_b a} \\log^k n)$, then $T(n) = \\Theta(n^{\\log_b a} \\log^{k+1} n)$.
   - Case 3: If $f(n) = \\Omega(n^{\\log_b a + \\epsilon})$, then $T(n) = \\Theta(f(n))$.

## PART - B (10 Marks Long Questions)
**Q3. Explain Dijkstra's Single Source Shortest Path algorithm with an illustrative example and discuss its time complexity using an adjacency list and min-heap.**
[Complete step-by-step trace included with priority queue diagrams]
`
  },
  {
    id: 'mat-btech-os-01',
    title: 'Operating Systems: Deadlock Prevention, Avoidance & Banker’s Algorithm',
    description: 'Clear visual notes on Coffman conditions, Resource Allocation Graphs, and detailed Banker’s Algorithm calculations with solved numericals.',
    category: 'btech',
    boardOrUniversity: 'All Engineering Universities',
    course: 'B.Tech',
    branchOrStream: 'CSE',
    semester: 4,
    subjectId: 'sub-btech-cse-os',
    subjectName: 'Operating Systems',
    chapterTitle: 'Unit 3: Deadlocks & Memory Management',
    materialType: 'pdf_notes',
    language: 'en',
    readTimeMinutes: 18,
    pageCount: 22,
    uploadDate: '2026-10-05',
    tags: ['OS', 'Deadlocks', 'BankersAlgorithm', 'Processes'],
    authorOrSource: 'EduNexus Verified Faculty',
    verificationStatus: 'verified',
    isPremiumOnly: false,
    viewsCount: 2780,
    downloadsCount: 940,
    bookmarksCount: 420,
    contentBody: `# Operating Systems: Deadlock Management & Banker's Algorithm

## The Four Coffman Conditions for Deadlock
Deadlock can arise if and only if the following four conditions hold simultaneously:
1. **Mutual Exclusion**: At least one resource must be held in a non-shareable mode.
2. **Hold and Wait**: A process must currently hold at least one resource and be waiting to acquire additional resources.
3. **No Preemption**: Resources cannot be preempted; a resource can be released only voluntarily by the process holding it.
4. **Circular Wait**: A closed chain of processes exists such that each process holds at least one resource that is needed by the next process in the chain.

## Banker’s Algorithm (Dijkstra)
Safety algorithm state calculation:
$$\\text{Need}[i][j] = \\text{Max}[i][j] - \\text{Allocation}[i][j]$$
`
  },
  {
    id: 'mat-btech-coding-01',
    title: 'Top 50 SDE Placement Coding Problems: Java & C++ with Clean Patterns',
    description: 'High-frequency coding problems for technical interview rounds: Two Pointers, Sliding Window, Fast & Slow Pointers, Monotonic Stack, and Tree Traversals.',
    category: 'btech',
    boardOrUniversity: 'Product & Service IT Companies',
    course: 'B.Tech',
    branchOrStream: 'CSE / IT / ECE',
    semester: 6,
    subjectId: 'sub-btech-cse-dsa',
    subjectName: 'Data Structures & Algorithms',
    chapterTitle: 'Interview Prep & Placement Practice',
    materialType: 'formula_sheet',
    language: 'en',
    readTimeMinutes: 35,
    pageCount: 45,
    uploadDate: '2026-11-01',
    tags: ['Placement', 'Coding', 'Java', 'LeetCode', 'Interview'],
    authorOrSource: 'EduNexus Campus Placement Cell',
    verificationStatus: 'official',
    isPremiumOnly: true,
    viewsCount: 7890,
    downloadsCount: 4200,
    bookmarksCount: 2950,
    contentBody: `# Top SDE Placement Interview Code Patterns

### 1. Two-Pointer Technique (e.g., Container With Most Water)
\`\`\`java
public int maxArea(int[] height) {
    int left = 0, right = height.length - 1;
    int maxWater = 0;
    while (left < right) {
        int w = right - left;
        int h = Math.min(height[left], height[right]);
        maxWater = Math.max(maxWater, w * h);
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxWater;
}
\`\`\`
`
  },

  // Nursing Materials
  {
    id: 'mat-nurs-cardio-01',
    title: 'Anatomy & Physiology: Cardiovascular System, Cardiac Cycle & Conduction',
    description: 'Detailed educational guide on heart chambers, coronary circulation, SA/AV node cardiac conduction sequence, and normal ECG waveforms with clinical correlations.',
    category: 'nursing',
    boardOrUniversity: 'Indian Nursing Council (INC) / Health Universities',
    course: 'B.Sc Nursing',
    branchOrStream: 'B.Sc / GNM',
    semester: 1,
    subjectId: 'sub-nurs-anat-phys',
    subjectName: 'Anatomy and Physiology',
    chapterTitle: 'Cardiovascular System',
    materialType: 'pdf_notes',
    language: 'en',
    readTimeMinutes: 22,
    pageCount: 30,
    uploadDate: '2026-09-18',
    tags: ['Nursing', 'Cardiovascular', 'Heart', 'ECG', 'INC'],
    authorOrSource: 'Dr. Sarah Mathews, M.Sc (Nursing)',
    verificationStatus: 'verified',
    isPremiumOnly: false,
    viewsCount: 4120,
    downloadsCount: 1650,
    bookmarksCount: 890,
    contentBody: `# Cardiovascular System — Anatomy & Physiology for Nurses

> [!NOTE] Clinical & Educational Disclaimer
> This content is intended for nursing educational preparation. Always adhere to your hospital's clinical protocols, physician directives, and local nursing regulatory boards.

## 1. Anatomy of the Human Heart
The heart is a hollow muscular organ located in the mediastinum between the lungs. It is enclosed by the **pericardium** consisting of:
- Fibrous pericardium (outer tough protective layer)
- Serous pericardium (parietal and visceral/epicardium layers with pericardial fluid)

### Heart Chambers & Valves
- **Right Atrium & Ventricle**: Receives deoxygenated blood from Superior & Inferior Vena Cava and pumps to pulmonary trunk via **Tricuspid** and **Pulmonary semilunar** valves.
- **Left Atrium & Ventricle**: Receives oxygenated blood from pulmonary veins and pumps systemically via **Bicuspid (Mitral)** and **Aortic semilunar** valves.

## 2. Cardiac Electrical Conduction Sequence
1. **Sinoatrial (SA) Node** (Primary Pacemaker): Fires at intrinsic rate of 60–100 bpm in right atrium.
2. **Atrioventricular (AV) Node**: Introduces a 0.1-second delay allowing ventricles to fill.
3. **Bundle of His** (Atrioventricular bundle).
4. **Right and Left Bundle Branches**.
5. **Purkinje Fibers**: Rapidly distribute impulse across ventricular myocardium resulting in synchronized ventricular systole.

## 3. ECG Waveform Interpretation
- **P Wave**: Atrial depolarization (normal duration < 0.11s).
- **QRS Complex**: Ventricular depolarization (normal duration 0.08–0.12s).
- **T Wave**: Ventricular repolarization.
`
  },
  {
    id: 'mat-nurs-careplan-01',
    title: 'Standard Nursing Care Plan: Acute Coronary Syndrome & Myocardial Infarction',
    description: 'Comprehensive NANDA-I based nursing care plan covering Assessment, Nursing Diagnoses, Expected Outcomes, Nursing Interventions with scientific rationale, and Evaluation.',
    category: 'nursing',
    boardOrUniversity: 'INC / Hospital Nursing Practice',
    course: 'B.Sc Nursing',
    branchOrStream: 'B.Sc / GNM',
    semester: 3,
    subjectId: 'sub-nurs-medsurg',
    subjectName: 'Medical-Surgical Nursing (Adult Health)',
    chapterTitle: 'Clinical Case Studies & Care Plans',
    materialType: 'care_plan',
    language: 'en',
    readTimeMinutes: 20,
    pageCount: 12,
    uploadDate: '2026-10-22',
    tags: ['CarePlan', 'NANDA', 'MyocardialInfarction', 'Clinical'],
    authorOrSource: 'Senior Clinical Nursing Preceptor',
    verificationStatus: 'verified',
    isPremiumOnly: false,
    viewsCount: 3890,
    downloadsCount: 1820,
    bookmarksCount: 970,
    contentBody: `# Nursing Care Plan (NANDA-I): Acute Myocardial Infarction (AMI)

### Patient Profile (Case Study Scenario)
A 58-year-old male presents to the Emergency Department with crushing substernal chest pain radiating to left jaw and arm, diaphoresis, and dyspnea lasting > 40 minutes unrelieved by rest.

---

### Diagnosis 1: Acute Pain related to myocardial ischemia as evidenced by patient grimacing, rating pain 9/10, and diaphoresis.

#### Desired Outcomes / Goals:
- Patient will report pain level reduced to $\\le 2/10$ within 30 minutes of medical/nursing interventions.
- Vital signs will stabilize (BP within $110-130/70-85\\text{ mmHg}$, HR $60-90\\text{ bpm}$).

#### Nursing Interventions & Rationales:
1. **Administer Supplemental Oxygen via Nasal Cannula (2-4 L/min)**
   - *Rationale:* Increases myocardial oxygen delivery and helps reduce ischemic injury.
2. **Administer Sublingual Nitroglycerin / IV Morphine as ordered**
   - *Rationale:* Nitrates dilate coronary arteries; morphine relieves pain and decreases preload and sympathetic tone.
3. **Maintain Patient in Semi-Fowler’s Position**
   - *Rationale:* Reduces venous return (preload) to the heart and eases breathing mechanics.
4. **Monitor Continuous 12-Lead ECG and Cardiac Enzymes (Troponin I/T, CK-MB)**
   - *Rationale:* Detects ST-segment elevation or evolution of lethal dysrhythmias (e.g., VT, VF).

#### Evaluation:
- Patient stated pain decreased to 1/10 post-nitrate and morphine administration; ECG ST segment stabilized.
`
  },
  {
    id: 'mat-nurs-drug-01',
    title: 'Essential Emergency Drug Study: Indications, Dosage & Nursing Responsibilities',
    description: 'High-yield pharmacology guide for nurses: Atropine, Adrenaline (Epinephrine), Amiodarone, Dopamine, Furosemide, Heparin, and Nitroglycerin.',
    category: 'nursing',
    boardOrUniversity: 'INC Curricula',
    course: 'B.Sc Nursing',
    branchOrStream: 'Pharmacology',
    semester: 2,
    subjectId: 'sub-nurs-pharm',
    subjectName: 'Pharmacology in Nursing',
    chapterTitle: 'Emergency Cardiac & ICU Drugs',
    materialType: 'drug_study',
    language: 'en',
    readTimeMinutes: 25,
    pageCount: 20,
    uploadDate: '2026-10-28',
    tags: ['DrugStudy', 'Pharmacology', 'EmergencyDrugs', 'ICU', 'NursingAlert'],
    authorOrSource: 'EduNexus Clinical Pharmacy Board',
    verificationStatus: 'official',
    isPremiumOnly: true,
    viewsCount: 6310,
    downloadsCount: 3100,
    bookmarksCount: 2150,
    contentBody: `# High-Yield Clinical Drug Study for Nurses

## 1. Adrenaline (Epinephrine)
- **Classification:** Non-selective adrenergic agonist ($\\alpha_1, \\beta_1, \\beta_2$).
- **Indications:** Anaphylaxis, Cardiac Arrest (VF/pVT, Asystole, PEA), Severe Bronchospasm.
- **Dose & Route:**
  - Cardiac Arrest: $1\\text{ mg IV/IO } (1:10,000)$ every 3–5 minutes.
  - Anaphylaxis: $0.3 - 0.5\\text{ mg IM } (1:1,000)$ in anterolateral thigh.
- **Nursing Responsibilities:**
  - Continuously monitor heart rate, rhythm, and blood pressure.
  - Double check concentration ($1:1,000$ vs $1:10,000$) to prevent fatal dosing errors.
  - Assess IV site for extravasation (can cause ischemic tissue necrosis).

## 2. Atropine Sulfate
- **Classification:** Anticholinergic / Muscarinic receptor antagonist.
- **Indications:** Symptomatic Sinus Bradycardia.
- **Dose:** $0.5 - 1.0\\text{ mg IV push}$ every 3–5 min (Maximum total $3\\text{ mg}$).
- **Nursing Responsibilities:**
  - Doses $< 0.5\\text{ mg}$ can paradoxically worsen bradycardia.
  - Monitor for urinary retention, blurred vision, and dry mouth.
`
  },

  // Intermediate Materials
  {
    id: 'mat-inter-phy-formula',
    title: 'Senior Intermediate Physics: Master Formula & Derivation Booklet',
    description: 'Comprehensive formula sheet for 2nd Year Intermediate (MPC & BiPC) with key derivations for Ray Optics, Electric Charges & Fields, and Moving Charges.',
    category: 'intermediate',
    boardOrUniversity: 'Board of Intermediate Education (BIE / CBSE 12th)',
    course: 'Intermediate 2nd Year',
    branchOrStream: 'MPC / BiPC',
    semester: 2,
    subjectId: 'sub-inter-physics',
    subjectName: 'Intermediate Physics (Senior Inter)',
    chapterTitle: 'Formulae & Derivations',
    materialType: 'formula_sheet',
    language: 'en',
    readTimeMinutes: 15,
    pageCount: 18,
    uploadDate: '2026-10-01',
    tags: ['Physics', 'Formulas', 'Intermediate', 'BIEAP', 'TSBIE', 'CBSE12'],
    authorOrSource: 'Srikanth Rao, M.Sc (Senior Physics Lecturer)',
    verificationStatus: 'verified',
    isPremiumOnly: false,
    viewsCount: 6540,
    downloadsCount: 3200,
    bookmarksCount: 1820,
    contentBody: `# Senior Intermediate Physics Master Formula Sheet

## 1. Ray Optics & Optical Instruments
- **Mirror Formula:**
  $$\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}$$
- **Lens Maker’s Formula:**
  $$\\frac{1}{f} = (\\mu - 1) \\left( \\frac{1}{R_1} - \\frac{1}{R_2} \\right)$$
- **Prism Refractive Index:**
  $$\\mu = \\frac{\\sin\\left(\\frac{A + D_m}{2}\\right)}{\\sin\\left(\\frac{A}{2}\\right)}$$

## 2. Electrostatics & Current Electricity
- **Coulomb’s Law:**
  $$F = \\frac{1}{4\\pi \\epsilon_0} \\frac{|q_1 q_2|}{r^2}$$
- **Electric Potential due to Point Charge:**
  $$V = \\frac{1}{4\\pi \\epsilon_0} \\frac{q}{r}$$
- **Drift Velocity & Current Relation:**
  $$I = n e A v_d$$
`
  },
  {
    id: 'mat-inter-chem-org',
    title: 'Organic Chemistry Reactions & Named Mechanisms for Board & EAMCET',
    description: 'All 28 named reactions with conditions, reagents, and mechanisms: Aldol Condensation, Cannizzaro, Reimer-Tiemann, Kolbe’s reaction, and Sandmeyer reaction.',
    category: 'intermediate',
    boardOrUniversity: 'BIE / CBSE / State Boards',
    course: 'Intermediate 2nd Year',
    branchOrStream: 'MPC / BiPC',
    semester: 2,
    subjectId: 'sub-inter-chemistry',
    subjectName: 'Intermediate Chemistry (Senior Inter)',
    chapterTitle: 'Organic Compounds containing Oxygen & Nitrogen',
    materialType: 'pdf_notes',
    language: 'en',
    readTimeMinutes: 20,
    pageCount: 24,
    uploadDate: '2026-10-15',
    tags: ['Chemistry', 'NamedReactions', 'Organic', 'Aldol', 'IPE'],
    authorOrSource: 'Dr. V. Padmavathi (Head of Chemistry)',
    verificationStatus: 'verified',
    isPremiumOnly: false,
    viewsCount: 4890,
    downloadsCount: 2100,
    bookmarksCount: 1400,
    contentBody: `# High-Yield Organic Named Reactions

### 1. Reimer-Tiemann Reaction
Phenol reacts with chloroform in the presence of sodium hydroxide at $340\\text{ K}$ to yield **Salicylaldehyde** (o-hydroxybenzaldehyde).
$$\\text{C}_6\\text{H}_5\\text{OH} + \\text{CHCl}_3 + 3\\text{NaOH} \\xrightarrow{340\\text{ K}} \\text{C}_6\\text{H}_4(\\text{OH})(\\text{CHO}) + 3\\text{NaCl} + 2\\text{H}_2\\text{O}$$
*Electrophile:* Dichlorocarbene ($:\\text{CCl}_2$).

### 2. Aldol Condensation
Aldehydes and ketones having at least one $\\alpha$-hydrogen undergo condensation in presence of dilute alkali ($\\text{dil. NaOH}$) to form $\\beta$-hydroxy aldehydes (aldols) which on heating lose water to form $\\alpha,\\beta$-unsaturated carbonyl compounds.
`
  },

  // School Materials (Classes 1 - 10)
  {
    id: 'mat-school-math10-real',
    title: 'Class 10 Maths: Real Numbers & Polynomials — Step-by-Step Solutions',
    description: 'Fundamental concepts, Euclid’s Division Lemma, Fundamental Theorem of Arithmetic, proving irrationality of √2 and √5, and relationship between zeroes and coefficients.',
    category: 'school',
    boardOrUniversity: 'CBSE / ICSE / State Board',
    course: 'Class 10',
    branchOrStream: 'General',
    semester: 1,
    subjectId: 'sub-school-math-10',
    subjectName: 'Class 10 Mathematics',
    chapterTitle: 'Chapter 1 & 2: Real Numbers & Polynomials',
    materialType: 'pdf_notes',
    language: 'en',
    readTimeMinutes: 15,
    pageCount: 14,
    uploadDate: '2026-09-10',
    tags: ['Class10', 'Maths', 'RealNumbers', 'CBSE', 'BoardExams'],
    authorOrSource: 'NCERT Master Teacher Team',
    verificationStatus: 'official',
    isPremiumOnly: false,
    viewsCount: 8900,
    downloadsCount: 4100,
    bookmarksCount: 2300,
    contentBody: `# Class 10 Mathematics: Real Numbers Made Easy

## 1. Fundamental Theorem of Arithmetic
Every composite number can be expressed (factorised) as a product of primes, and this factorisation is unique, apart from the order in which the prime factors occur.

$$\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b$$

### Example:
Find HCF and LCM of 96 and 404:
- $96 = 2^5 \\times 3$
- $404 = 2^2 \\times 101$
- $\\text{HCF} = 2^2 = 4$
- $\\text{LCM} = \\frac{96 \\times 404}{4} = 9696$

## 2. Proving $\\sqrt{5}$ is Irrational (Proof by Contradiction)
1. Assume to the contrary that $\\sqrt{5}$ is rational.
2. Therefore, $\\sqrt{5} = \\frac{a}{b}$ where $a$ and $b$ are co-prime integers and $b \\neq 0$.
3. Squaring both sides: $5 = \\frac{a^2}{b^2} \\implies a^2 = 5b^2$.
4. This means 5 divides $a^2$, and since 5 is prime, 5 divides $a$.
5. Let $a = 5c$. Then $(5c)^2 = 5b^2 \\implies 25c^2 = 5b^2 \\implies b^2 = 5c^2$.
6. This means 5 divides $b^2$, so 5 divides $b$.
7. Thus $a$ and $b$ share at least 5 as a common factor, contradicting that $a$ and $b$ are co-prime.
8. Hence, our assumption was false; $\\sqrt{5}$ is irrational.
`
  },
  {
    id: 'mat-school-sci10-light',
    title: 'Class 10 Science: Light Reflection, Refraction & Ray Diagrams',
    description: 'Visual ray diagrams for concave and convex mirrors, lens formula, sign convention rules, and solved numerical problems for Class 10 Board Examinations.',
    category: 'school',
    boardOrUniversity: 'CBSE / State Board',
    course: 'Class 10',
    branchOrStream: 'General',
    semester: 1,
    subjectId: 'sub-school-sci-10',
    subjectName: 'Class 10 Science (Physics, Chem, Bio)',
    chapterTitle: 'Chapter 10: Light Reflection & Refraction',
    materialType: 'study_guide',
    language: 'en',
    readTimeMinutes: 18,
    pageCount: 20,
    uploadDate: '2026-09-25',
    tags: ['Class10', 'Science', 'Optics', 'RayDiagrams', 'CBSE'],
    authorOrSource: 'EduNexus School Academy',
    verificationStatus: 'verified',
    isPremiumOnly: false,
    viewsCount: 6720,
    downloadsCount: 3120,
    bookmarksCount: 1640,
    contentBody: `# Class 10 Science: Light Reflection and Refraction

## 1. Laws of Reflection of Light
1. The incident ray, the reflected ray and the normal to the mirror at the point of incidence, all lie in the same plane.
2. The angle of incidence is equal to the angle of reflection: $\\angle i = \\angle r$.

## 2. New Cartesian Sign Convention
- All distances are measured from the pole of the mirror as origin.
- Distances measured in the direction of incident light are taken as **positive**.
- Distances measured against the direction of incident light are taken as **negative**.
- Distances measured upwards perpendicular to principal axis are **positive**.
- Distances measured downwards perpendicular to principal axis are **negative**.
`
  }
];

export const MOCK_MCQS: MCQQuestion[] = [
  // B.Tech MCQs
  {
    id: 'mcq-btech-dsa-1',
    subjectId: 'sub-btech-cse-dsa',
    subjectName: 'Data Structures & Algorithms',
    topic: 'Trees & Complexity',
    category: 'btech',
    question: 'What is the worst-case time complexity of searching for an element in an un-balanced Binary Search Tree (BST)?',
    options: ['O(log n)', 'O(1)', 'O(n)', 'O(n log n)'],
    correctAnswerIndex: 2,
    explanation: 'In the worst case (when keys are inserted in sorted order), the BST degenerates into a linear chain (skewed tree), causing search complexity to become O(n).',
    difficulty: 'easy'
  },
  {
    id: 'mcq-btech-dsa-2',
    subjectId: 'sub-btech-cse-dsa',
    subjectName: 'Data Structures & Algorithms',
    topic: 'Graphs & Algorithms',
    category: 'btech',
    question: 'Which algorithm is specifically designed to find the shortest path in a graph with negative edge weights without getting trapped in cycles?',
    options: ['Dijkstra’s Algorithm', 'Bellman-Ford Algorithm', 'Kruskal’s Algorithm', 'Prim’s Algorithm'],
    correctAnswerIndex: 1,
    explanation: 'The Bellman-Ford algorithm computes single-source shortest paths in weighted directed graphs, even with negative edge weights, and can detect negative cycles.',
    difficulty: 'medium'
  },
  {
    id: 'mcq-btech-os-1',
    subjectId: 'sub-btech-cse-os',
    subjectName: 'Operating Systems',
    topic: 'Deadlocks',
    category: 'btech',
    question: 'Which of the following is NOT one of the necessary Coffman conditions for a deadlock to occur?',
    options: ['Mutual Exclusion', 'Preemption', 'Hold and Wait', 'Circular Wait'],
    correctAnswerIndex: 1,
    explanation: 'The condition is NO PREEMPTION. If resources can be preempted, a deadlock will not occur.',
    difficulty: 'easy'
  },

  // Nursing MCQs
  {
    id: 'mcq-nurs-cardio-1',
    subjectId: 'sub-nurs-anat-phys',
    subjectName: 'Anatomy and Physiology',
    topic: 'Cardiovascular Conduction',
    category: 'nursing',
    question: 'Which anatomical structure is known as the natural primary pacemaker of the human heart?',
    options: ['Atrioventricular (AV) Node', 'Sinoatrial (SA) Node', 'Bundle of His', 'Purkinje Fibers'],
    correctAnswerIndex: 1,
    explanation: 'The SA node (located in the superior posterolateral wall of the right atrium) fires at the highest intrinsic rate (60-100 bpm) and initiates the cardiac depolarization wave.',
    difficulty: 'easy'
  },
  {
    id: 'mcq-nurs-fund-1',
    subjectId: 'sub-nurs-fundamentals',
    subjectName: 'Fundamentals of Nursing',
    topic: 'Vital Signs & Nursing Process',
    category: 'nursing',
    question: 'When administering Sublingual Nitroglycerin to an adult client reporting chest pain, what priority assessment must the nurse perform before each repeat dose?',
    options: ['Pupillary light reflex', 'Blood pressure measurement', 'Deep tendon reflexes', 'Serum potassium level'],
    correctAnswerIndex: 1,
    explanation: 'Nitroglycerin is a potent systemic vasodilator that can induce severe hypotension. Blood pressure must be monitored prior to every dose (holding if systolic BP < 90-100 mmHg).',
    difficulty: 'medium'
  },
  {
    id: 'mcq-nurs-pharm-1',
    subjectId: 'sub-nurs-pharm',
    subjectName: 'Pharmacology in Nursing',
    topic: 'Emergency Drugs',
    category: 'nursing',
    question: 'What is the therapeutic reversal agent (antidote) for Heparin-induced anticoagulation overdose?',
    options: ['Vitamin K (Phytonadione)', 'Protamine Sulfate', 'Naloxone', 'Flumazenil'],
    correctAnswerIndex: 1,
    explanation: 'Protamine sulfate is a positively charged protein that binds negatively charged heparin molecules to form a stable, inactive salt complex, reversing anticoagulation.',
    difficulty: 'medium'
  },

  // Intermediate MCQs
  {
    id: 'mcq-inter-phy-1',
    subjectId: 'sub-inter-physics',
    subjectName: 'Intermediate Physics (Senior Inter)',
    topic: 'Ray Optics',
    category: 'intermediate',
    question: 'A convex lens of focal length 20 cm is placed in contact with a concave lens of focal length 25 cm. What is the power of the combination?',
    options: ['+1.0 Dioptre', '-1.0 Dioptre', '+5.0 Dioptre', '-5.0 Dioptre'],
    correctAnswerIndex: 0,
    explanation: 'P1 = 100/20 = +5 D; P2 = 100/(-25) = -4 D. Combined Power P = P1 + P2 = +5 - 4 = +1.0 D.',
    difficulty: 'medium'
  },
  {
    id: 'mcq-inter-chem-1',
    subjectId: 'sub-inter-chemistry',
    subjectName: 'Intermediate Chemistry (Senior Inter)',
    topic: 'Organic Named Reactions',
    category: 'intermediate',
    question: 'Which reactive intermediate is formed during the Reimer-Tiemann reaction of phenol with chloroform and sodium hydroxide?',
    options: ['Carbocation', 'Free radical', 'Dichlorocarbene (:CCl2)', 'Nitrene'],
    correctAnswerIndex: 2,
    explanation: 'Chloroform loses a proton to base, generating trichloromethyl anion which undergoes alpha-elimination of chloride to yield singlet dichlorocarbene (:CCl2).',
    difficulty: 'medium'
  },

  // School MCQs
  {
    id: 'mcq-school-math-1',
    subjectId: 'sub-school-math-10',
    subjectName: 'Class 10 Mathematics',
    topic: 'Real Numbers',
    category: 'school',
    question: 'If two positive integers a and b are written as a = x^3 y^2 and b = x y^3 where x and y are prime numbers, then HCF(a, b) is:',
    options: ['xy', 'x y^2', 'x^3 y^3', 'x^2 y^2'],
    correctAnswerIndex: 1,
    explanation: 'HCF takes the lowest power of each common prime factor: lowest power of x is x^1, and lowest power of y is y^2. Hence HCF = x y^2.',
    difficulty: 'easy'
  },
  {
    id: 'mcq-school-sci-1',
    subjectId: 'sub-school-sci-10',
    subjectName: 'Class 10 Science (Physics, Chem, Bio)',
    topic: 'Life Processes',
    category: 'school',
    question: 'Which enzyme present in human saliva initiates the chemical digestion of carbohydrates in the mouth?',
    options: ['Pepsin', 'Salivary Amylase (Ptyalin)', 'Lipase', 'Trypsin'],
    correctAnswerIndex: 1,
    explanation: 'Salivary amylase (ptyalin) breaks down complex dietary starch into maltose and dextrin at a near-neutral pH (6.8).',
    difficulty: 'easy'
  }
];

export const MOCK_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    subjectId: 'sub-btech-cse-dsa',
    subjectName: 'Data Structures & Algorithms',
    topic: 'Tree Balancing',
    front: 'What is the balance factor condition for a valid AVL Tree?',
    back: 'Balance Factor (BF) = Height(Left) - Height(Right). BF must be -1, 0, or +1 for every node.',
    mastered: true
  },
  {
    id: 'fc-2',
    subjectId: 'sub-btech-cse-os',
    subjectName: 'Operating Systems',
    topic: 'Memory',
    front: 'What is the purpose of the Translation Lookaside Buffer (TLB)?',
    back: 'The TLB is a high-speed associative hardware cache that stores recent virtual-to-physical page table mappings, reducing memory access latency.',
    mastered: false
  },
  {
    id: 'fc-3',
    subjectId: 'sub-nurs-anat-phys',
    subjectName: 'Anatomy and Physiology',
    topic: 'Cardiac Conduction',
    front: 'What is the intrinsic pacemaker firing rate of the SA Node?',
    back: '60 to 100 action potentials per minute (beats per minute) under normal resting conditions.',
    mastered: true
  },
  {
    id: 'fc-4',
    subjectId: 'sub-nurs-pharm',
    subjectName: 'Pharmacology in Nursing',
    topic: 'Antidotes',
    front: 'What is the specific antidote for acetaminophen (paracetamol) hepatotoxicity?',
    back: 'N-Acetylcysteine (NAC / Mucomyst), which replenishes glutathione stores.',
    mastered: false
  },
  {
    id: 'fc-5',
    subjectId: 'sub-inter-physics',
    subjectName: 'Intermediate Physics (Senior Inter)',
    topic: 'Optics',
    front: 'State the condition for Total Internal Reflection (TIR).',
    back: '1. Light must travel from a denser medium to a rarer medium.\n2. The angle of incidence must be greater than the critical angle (i > c).',
    mastered: true
  },
  {
    id: 'fc-6',
    subjectId: 'sub-school-math-10',
    subjectName: 'Class 10 Mathematics',
    topic: 'Arithmetic Progression',
    front: 'Formula for the sum of first n terms of an Arithmetic Progression (AP)?',
    back: 'S_n = (n/2) * [2a + (n - 1)d]  or  S_n = (n/2) * (a + l)',
    mastered: true
  }
];

export const MOCK_STUDY_TASKS: StudyTask[] = [
  {
    id: 'task-1',
    title: 'Revise AVL Tree Rotations & Implement Left-Right Rotation',
    subjectName: 'Data Structures & Algorithms',
    estimatedMinutes: 45,
    deadline: 'Today',
    isCompleted: true,
    priority: 'high'
  },
  {
    id: 'task-2',
    title: 'Review Banker’s Algorithm numericals & Safe State checks',
    subjectName: 'Operating Systems',
    estimatedMinutes: 40,
    deadline: 'Today',
    isCompleted: false,
    priority: 'high'
  },
  {
    id: 'task-3',
    title: 'Solve 15 MCQs on Graph Shortest Path (Dijkstra vs Bellman-Ford)',
    subjectName: 'Data Structures & Algorithms',
    estimatedMinutes: 30,
    deadline: 'Tomorrow',
    isCompleted: false,
    priority: 'medium'
  },
  {
    id: 'task-4',
    title: 'Practice SQL Window Functions & Index Optimization queries',
    subjectName: 'Database Management Systems',
    estimatedMinutes: 50,
    deadline: 'In 3 days',
    isCompleted: false,
    priority: 'medium'
  }
];

export const MOCK_EXAM_SCHEDULES: ExamSchedule[] = [
  {
    id: 'exam-1',
    title: 'Mid-Semester Examinations 2026',
    subjectName: 'Data Structures & Algorithms',
    examDate: '2026-12-15',
    totalMarks: 75,
    syllabusCoveredPercent: 78
  },
  {
    id: 'exam-2',
    title: 'Operating Systems Theory Exam',
    subjectName: 'Operating Systems',
    examDate: '2026-12-18',
    totalMarks: 75,
    syllabusCoveredPercent: 62
  },
  {
    id: 'exam-3',
    title: 'DBMS & SQL Practical Lab Examination',
    subjectName: 'Database Management Systems',
    examDate: '2026-12-22',
    totalMarks: 50,
    syllabusCoveredPercent: 85
  }
];

export const MOCK_USER_REPORTS: UserReport[] = [
  {
    id: 'rep-001',
    materialId: 'mat-btech-dsa-01',
    materialTitle: 'Unit 1 & 2: Trees, AVL Trees & Graph Traversal',
    reason: 'incorrect_information',
    details: 'Slide 14 has a slight typographical error in the formula for balance factor notation.',
    reportedBy: 'Kiran K.',
    reportedAt: '2026-11-20T10:14:00Z',
    status: 'pending'
  }
];
