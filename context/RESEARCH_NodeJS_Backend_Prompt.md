# RESEARCH — Node.js Backend + Python AI Service Prompt

You are helping me build the backend for a project called "RESEARCH", an AI-assisted Legal Research and Precedent Discovery Tool.

IMPORTANT TECHNOLOGY REQUIREMENT:

The MAIN BACKEND MUST BE BUILT USING NODE.JS.

Do NOT use Python/FastAPI for the main backend.

Use:

MAIN BACKEND:
- Node.js
- Express.js
- JavaScript
- SQL database
- Sequelize ORM or Prisma ORM
- REST APIs

AI / MACHINE LEARNING:
- Python ONLY
- Python will be used as a separate AI service in the future.
- The Node.js backend will communicate with the Python AI service through REST APIs.

IMPORTANT:
Do NOT build the AI service yet unless specifically requested.
For now, build only the Node.js backend and database layer.

==================================================
PROJECT PURPOSE
==================================================

RESEARCH is a legal research and precedent discovery tool.

Lawyers often need to search previous court judgments to find precedents that may be relevant to their current case.

The lawyer enters the details of a current case.

The backend should:

1. Store the current case.
2. Store legal issues related to the case.
3. Store relevant legal Acts and sections.
4. Store previous judgments.
5. Store case-jugdment matches.
6. Store similarity scores and ranking.
7. Store judgment source information.
8. Return original judgment source URLs.
9. Allow the lawyer to open the original judgment.
10. Prepare the system for future AI-based semantic search.

The system is an AI-assisted research tool.

It must NOT provide a final legal decision.

==================================================
IMPORTANT ARCHITECTURE
==================================================

Use a two-part architecture:

                    FRONTEND
                        |
                        ↓
                 NODE.JS BACKEND
                        |
          ┌─────────────┴─────────────┐
          ↓                           ↓
      DATABASE                 PYTHON AI SERVICE
                                      |
                              AI / ML / Embeddings
                              Semantic Search
                              Ranking
                              Explanation

The Node.js backend is the main backend.

Python is ONLY for the future AI/ML service.

The frontend should communicate with the Node.js backend.

The Node.js backend should communicate with the Python AI service when AI functionality is added later.

Do NOT put Python code inside the Node.js backend.

==================================================
DATABASE SCHEMA
==================================================

Use these exact core tables.

1. CASE

Columns:
- case_id (Primary Key)
- case_title
- case_type
- jurisdiction
- case_facts
- created_at

Purpose:
Stores the current case entered by the lawyer.

--------------------------------------------------

2. LEGAL_ISSUE

Columns:
- issue_id (Primary Key)
- case_id (Foreign Key -> CASE.case_id)
- issue_text

Purpose:
Stores the legal issues associated with a case.

Relationship:
One CASE can have multiple LEGAL_ISSUE records.

--------------------------------------------------

3. LEGAL_SECTION

Columns:
- section_id (Primary Key)
- act_name
- section_number
- section_title

Purpose:
Stores legal Acts and their sections.

--------------------------------------------------

4. CASE_SECTION

This is a junction/association table.

Columns:
- case_id (Foreign Key -> CASE.case_id)
- section_id (Foreign Key -> LEGAL_SECTION.section_id)

Purpose:
Connects a case with the legal sections relevant to that case.

--------------------------------------------------

5. JUDGMENT

Columns:
- judgment_id (Primary Key)
- case_name
- court
- date
- citation
- outcome

Purpose:
Stores previous court judgments that can be used as precedents.

--------------------------------------------------

6. CASE_JUDGMENT_MATCH

Columns:
- match_id (Primary Key)
- case_id (Foreign Key -> CASE.case_id)
- judgment_id (Foreign Key -> JUDGMENT.judgment_id)
- similarity_score
- rank_position

Purpose:
Stores the relationship between the current case and potentially relevant previous judgments.

The initial Node.js backend only stores the similarity score and rank.

The actual AI similarity calculation will be implemented later in Python.

--------------------------------------------------

7. JUDGMENT_SOURCE

Columns:
- source_id (Primary Key)
- judgment_id (Foreign Key -> JUDGMENT.judgment_id)
- source_name
- source_url
- source_type

Purpose:
Stores the official/permitted source information for the original judgment.

The frontend should use source_url for the "View Original Judgment" button.

==================================================
DATABASE RELATIONSHIPS
==================================================

Use these relationships:

CASE
  |
  |-- LEGAL_ISSUE
  |
  |-- CASE_SECTION --> LEGAL_SECTION
  |
  |-- CASE_JUDGMENT_MATCH --> JUDGMENT
                                      |
                                      --> JUDGMENT_SOURCE

Foreign keys:

CASE.case_id
    -> LEGAL_ISSUE.case_id

CASE.case_id
    -> CASE_SECTION.case_id

LEGAL_SECTION.section_id
    -> CASE_SECTION.section_id

CASE.case_id
    -> CASE_JUDGMENT_MATCH.case_id

JUDGMENT.judgment_id
    -> CASE_JUDGMENT_MATCH.judgment_id

JUDGMENT.judgment_id
    -> JUDGMENT_SOURCE.judgment_id

Do not create unnecessary tables.

==================================================
BACKEND WORKFLOW
==================================================

The Node.js backend should follow:

LAWYER
  ↓
ENTER CURRENT CASE
  ↓
NODE.JS BACKEND
  ↓
CASE
  ↓
LEGAL ISSUE
  ↓
LEGAL SECTION
  ↓
PRECEDENT SEARCH
  ↓
CASE-JUDGMENT MATCH
  ↓
JUDGMENT
  ↓
JUDGMENT SOURCE
  ↓
VIEW ORIGINAL JUDGMENT
  ↓
LAWYER VERIFICATION

==================================================
FUTURE AI WORKFLOW
==================================================

The future AI workflow will be handled by a separate Python service.

Current Case
    ↓
Node.js Backend
    ↓
Python AI Service
    ↓
AI Case Analysis
    ↓
Extract:
- Facts
- Legal Issues
- Keywords
- Legal Sections
    ↓
Embeddings
    ↓
Vector Database
    ↓
Semantic Search
    ↓
Relevant Judgments
    ↓
Similarity Ranking
    ↓
AI Explanation
    ↓
Node.js Backend
    ↓
Frontend
    ↓
Original Judgment Source
    ↓
Lawyer Verification

IMPORTANT:

Python is ONLY responsible for AI/ML functionality.

Node.js remains responsible for:

- API handling
- Authentication if added later
- Database operations
- CRUD operations
- Case management
- Legal issue management
- Legal section management
- Judgment management
- Judgment source management
- Case/judgment match management
- Communication with the Python AI service

==================================================
CURRENT AI SCOPE
==================================================

DO NOT implement these AI features yet:

- Embeddings
- Vector database
- Semantic search
- LLM
- AI-generated explanations
- AI prediction
- Automatic legal analysis

These will be implemented later using Python.

For the current version, create the Node.js backend foundation only.

==================================================
TECHNOLOGY STACK
==================================================

MAIN BACKEND:

- Node.js
- Express.js
- JavaScript
- REST API
- Sequelize ORM OR Prisma ORM

DATABASE:

Use SQLite for the initial local prototype unless the existing project already uses another database.

The database structure should be designed so it can later migrate to PostgreSQL.

AI SERVICE:

- Python
- FastAPI

IMPORTANT:

Python/FastAPI is ONLY for the future AI service.

Do NOT use FastAPI for the main backend.

==================================================
NODE.JS PROJECT STRUCTURE
==================================================

Use a clean modular structure such as:

backend/
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── models/
│   │   ├── Case.js
│   │   ├── LegalIssue.js
│   │   ├── LegalSection.js
│   │   ├── CaseSection.js
│   │   ├── Judgment.js
│   │   ├── CaseJudgmentMatch.js
│   │   └── JudgmentSource.js
│   │
│   ├── controllers/
│   │   ├── caseController.js
│   │   ├── legalIssueController.js
│   │   ├── legalSectionController.js
│   │   ├── judgmentController.js
│   │   ├── matchController.js
│   │   └── judgmentSourceController.js
│   │
│   ├── routes/
│   │   ├── caseRoutes.js
│   │   ├── legalIssueRoutes.js
│   │   ├── legalSectionRoutes.js
│   │   ├── judgmentRoutes.js
│   │   ├── matchRoutes.js
│   │   └── judgmentSourceRoutes.js
│   │
│   ├── services/
│   │
│   ├── middleware/
│   │
│   ├── app.js
│   └── server.js
│
├── seed/
│   └── seed.js
│
├── package.json
├── .env
├── .gitignore
└── README.md

If the existing project already has a sensible structure, do not unnecessarily restructure it.

==================================================
API REQUIREMENTS
==================================================

Create REST APIs for:

CASE:

POST /api/cases
GET /api/cases
GET /api/cases/:caseId
PUT /api/cases/:caseId
DELETE /api/cases/:caseId

LEGAL ISSUES:

POST /api/cases/:caseId/issues
GET /api/cases/:caseId/issues

LEGAL SECTIONS:

POST /api/legal-sections
GET /api/legal-sections
GET /api/legal-sections/:sectionId

CASE SECTIONS:

POST /api/cases/:caseId/sections
GET /api/cases/:caseId/sections

JUDGMENTS:

POST /api/judgments
GET /api/judgments
GET /api/judgments/:judgmentId

CASE-JUDGMENT MATCH:

POST /api/cases/:caseId/matches
GET /api/cases/:caseId/matches

JUDGMENT SOURCE:

POST /api/judgments/:judgmentId/source
GET /api/judgments/:judgmentId/source

HEALTH CHECK:

GET /api/health

==================================================
VALIDATION
==================================================

Implement validation for:

- Required case fields
- Valid case IDs
- Valid section IDs
- Valid judgment IDs
- Valid foreign-key relationships
- Similarity score
- Rank position
- Judgment source information
- Source URL format where possible

Return clear HTTP error responses.

Use appropriate status codes such as:

200
201
400
404
500

==================================================
DATABASE CONNECTION
==================================================

Use Sequelize or Prisma to connect Node.js to SQLite.

Keep database configuration separate from controllers and routes.

Use environment variables where appropriate.

Example:

DATABASE_URL=...

Do not hard-code sensitive configuration.

==================================================
SAMPLE DATA
==================================================

Create sample/mock data only for development testing.

CASE:

case_id = 101
case_title = Property Dispute
case_type = Civil
jurisdiction = Madras High Court
case_facts = Daughter claims rights in ancestral property.

LEGAL_ISSUE:

issue_id = 1
case_id = 101
issue_text = Daughter's Property Rights

LEGAL_SECTION:

section_id = 1
act_name = Hindu Succession Act
section_number = Section 6
section_title = Sample Section

CASE_SECTION:

case_id = 101
section_id = 1

JUDGMENT:

judgment_id = 501
case_name = ABC vs XYZ
court = Madras High Court
date = 2024
citation = SAMPLE-CITATION-2024
outcome = Sample outcome for development testing

CASE_JUDGMENT_MATCH:

match_id = 1
case_id = 101
judgment_id = 501
similarity_score = 94
rank_position = 1

JUDGMENT_SOURCE:

source_id = 1
judgment_id = 501
source_name = Sample Official Source
source_url = https://example.com/sample-judgment
source_type = Sample

IMPORTANT:

Clearly label all of this as SAMPLE/MOCK DATA.

Do not claim that the sample judgment is a real legal precedent.

==================================================
FUTURE PYTHON AI SERVICE
==================================================

Do NOT implement this now.

The future Python service may have a structure such as:

ai-service/
│
├── app/
│   ├── main.py
│   ├── routes/
│   ├── services/
│   ├── models/
│   └── schemas/
│
├── requirements.txt
└── README.md

Its responsibilities will eventually include:

- Legal text processing
- Case analysis
- Keyword extraction
- Legal issue extraction
- Embeddings
- Vector database operations
- Semantic search
- Similarity calculation
- Re-ranking
- AI explanation

The Node.js backend will call the Python AI service through HTTP APIs.

Example future communication:

Node.js Backend
      |
      | HTTP Request
      ↓
Python AI Service
      |
      ↓
AI Processing
      |
      ↓
Python AI Service
      |
      | HTTP Response
      ↓
Node.js Backend
      |
      ↓
Frontend

Again: DO NOT implement the Python AI service now.

==================================================
LEGAL SOURCE REQUIREMENT
==================================================

Judgment data should eventually come from official, government, or legally permitted legal sources.

Do not invent legal judgments.

Do not invent citations.

Do not invent court decisions.

Preserve the original judgment source URL whenever available.

The lawyer must be able to verify the original judgment.

==================================================
LEGAL SAFETY
==================================================

The system is a legal research assistance tool.

It must not:

- Give a final legal decision.
- Claim that a precedent definitely applies.
- Invent judgments.
- Invent citations.
- Hide the original source.
- Present mock data as real legal information.

The lawyer must verify the original judgment before relying on it.

==================================================
DEVELOPMENT APPROACH
==================================================

Before writing code:

1. Inspect the existing project.
2. Identify the existing backend structure.
3. Confirm whether Node.js is already configured.
4. Do not replace working code unnecessarily.
5. Do not create a Python/FastAPI main backend.
6. Show the proposed Node.js backend folder structure.
7. Show the database models and relationships.
8. List the files that will be created or modified.
9. Wait for confirmation before making major changes.

After confirmation:

10. Configure the Node.js backend.
11. Configure the database.
12. Create the seven database models.
13. Create model relationships.
14. Create validation schemas.
15. Create controllers.
16. Create routes.
17. Create sample seed data.
18. Test all APIs.
19. Document how to run the backend.

==================================================
FINAL REQUIREMENT
==================================================

The MAIN BACKEND MUST BE NODE.JS.

Python MUST ONLY be used for the AI/ML SERVICE.

Do not use Python/FastAPI for:
- Main REST API
- Main database layer
- CRUD operations
- Case management
- Judgment management
- Frontend API

Use Python only later for:
- AI analysis
- Embeddings
- Vector search
- Semantic search
- Similarity
- LLM-based explanation

First complete and verify the Node.js backend and database.

Only after the Node.js backend is working correctly should the Python AI service be integrated.