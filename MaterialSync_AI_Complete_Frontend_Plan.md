# MATERIALSYNC AI — COMPLETE FRONTEND PLAN
### SIH 2026 | Problem Statement 26099

## Tagline

> **One Material. Many Names. Many Codes. One Standard Identity.**

---

# 1. Project Concept

MaterialSync AI is an AI-powered material intelligence and standardization platform.

Different companies may store the same material using different:

- Material names
- Material codes
- Abbreviations
- Units
- Categories
- Technical descriptions

MaterialSync AI understands the meaning and technical attributes of a material and maps it to **our own common MaterialSync Standard**.

The platform does **not require companies to replace their existing SAP or ERP systems**. Instead, it creates an intelligent standardized identity layer.

### Core Concept

```text
Company A                    Company B                    Company C
BRG-001                      MECH-9845                    MAT-5521
BRG SKF 6205 ZZ              Deep Groove Brg 6205 2Z      Ball Bearing 6205

        \                        |                        /
         \                       |                       /
          ─────── MaterialSync AI ───────
                         |
                         ↓
              COMMON MATERIAL IDENTITY
                  MSI-BRG-000123
                         |
                         ↓
         Deep Groove Ball Bearing 6205 ZZ
```

---

# 2. Main Objective

The user should be able to search using:

- Material name
- Material code
- Model number
- Part number
- Abbreviation
- Technical specifications
- Alternative material name

Examples:

```text
BRG SKF 6205 ZZ
MECH-9845
25 x 52 x 15 Bearing
```

MaterialSync AI should identify the material and show:

1. Material image
2. Standardized material name
3. MaterialSync Common ID
4. Category and subcategory
5. Technical specifications
6. Alternative names
7. Other companies' material codes
8. Other companies' material names
9. Relationship between records
10. AI confidence
11. Evidence explaining the AI result
12. Validation/correction option

---

# 3. Complete User Flow

```text
HOME
  ↓
SEARCH MATERIAL
  ↓
AI UNDERSTANDS INPUT
  ↓
EXTRACTS TECHNICAL ATTRIBUTES
  ↓
CHECKS MATERIAL KNOWLEDGE BASE
  ↓
IDENTIFIES MATERIAL
  ↓
CONVERTS TO MATERIALSYNC STANDARD
  ↓
SHOWS IMAGE + MATERIAL PROFILE
  ↓
SHOWS OTHER COMPANY NAMES + CODES
  ↓
SHOWS AI EVIDENCE + RELATIONSHIP
  ↓
USER VALIDATES / CORRECTS
  ↓
KNOWLEDGE BASE UPDATES
  ↓
FUTURE RESULTS IMPROVE
```

---

# 4. PAGE 1 — HOME / SMART SEARCH

The homepage should be simple, modern, and search-focused.

```text
┌──────────────────────────────────────────────────┐
│                 MATERIALSYNC AI                  │
│                                                  │
│   One Material. Many Names. Many Codes.          │
│               One Standard Identity.             │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │ 🔍 Search any material, code or spec...    │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│             [ Identify & Standardize ]           │
│                                                  │
│ Examples:                                        │
│ Bearing 6205 ZZ                                  │
│ BRG-001                                          │
│ 25 x 52 x 15 Bearing                             │
│ Gate Valve SS 2 Inch                             │
└──────────────────────────────────────────────────┘
```

### Navigation

```text
Home | Search | Categories | About
```

---

# 5. PAGE 2 — AI IDENTIFICATION

After searching, show what the AI is doing.

Example search:

> BRG SKF 6205 ZZ

```text
AI IDENTIFYING MATERIAL

Input:
BRG SKF 6205 ZZ

✓ Understanding material description
✓ Identifying material type
✓ Detecting manufacturer
✓ Extracting model number
✓ Extracting technical attributes
✓ Recognizing abbreviations
✓ Checking equivalent terminology
✓ Searching MaterialSync Knowledge Base

MATERIAL IDENTIFIED
```

This page makes the AI process understandable to judges and users.

---

# 6. PAGE 3 — MATERIAL PROFILE

This is the most important page.

```text
┌─────────────────────────────────────────────────────┐
│ ← Back                               ✓ Identified  │
├─────────────────────┬───────────────────────────────┤
│                     │ Deep Groove Ball Bearing      │
│                     │ 6205 ZZ                       │
│                     │                               │
│   MATERIAL IMAGE    │ MaterialSync ID               │
│                     │ MSI-BRG-000123                │
│                     │                               │
│                     │ Category                      │
│                     │ Mechanical → Bearings         │
│                     │                               │
│                     │ Confidence: 96%               │
├─────────────────────┴───────────────────────────────┤
│                                                     │
│ STANDARDIZED INFORMATION                            │
│                                                     │
│ Manufacturer: SKF                                   │
│ Model: 6205                                         │
│ Shield: ZZ / 2Z                                     │
│ Standard Unit: Each                                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 7. MATERIAL IMAGE FEATURE

Every identified material should have a representative image.

The image helps the user perform a quick visual check:

> “Yes, this is the type of material I was searching for.”

For the MVP, use images from your curated/training knowledge base linked to standardized material identities.

### Future Expansion

```text
TEXT SEARCH
     +
MATERIAL IMAGE
     +
VISIBLE MARKINGS
     ↓
AI MATERIAL IDENTIFICATION
```

Future users could search materials using an image.

---

# 8. TECHNICAL SPECIFICATIONS

Show standardized technical information.

```text
TECHNICAL SPECIFICATIONS

Material Type:        Deep Groove Ball Bearing
Manufacturer:         SKF
Model:                6205
Bore Diameter:        25 mm
Outer Diameter:       52 mm
Width:                15 mm
Shield Type:          ZZ / 2Z
Standard Unit:        Each
```

Important: different categories should have different attribute templates.

### Bearing

```text
Bore
Outer Diameter
Width
Load Rating
Shield Type
```

### Valve

```text
Valve Type
Size
Pressure Rating
Material
End Connection
```

### Bolt

```text
Diameter
Length
Thread Pitch
Material Grade
Head Type
```

This makes the standardization **category-aware**, rather than forcing every material into the same fields.

---

# 9. MATERIALSYNC STANDARD

Every material is converted into our common structure.

```text
MATERIALSYNC STANDARD

1. MaterialSync ID
2. Standard Material Name
3. Main Category
4. Subcategory
5. Material Type
6. Manufacturer
7. Model / Part Number
8. Category-Specific Technical Attributes
9. Dimensions
10. Standard Unit of Measure
11. Alternative Names
12. Company Material Codes
13. Company Material Names
14. Relationship Type
15. AI Confidence
16. Validation Status
```

### Core Transformation

```text
ANY COMPANY FORMAT
       ↓
MaterialSync AI
       ↓
AI understands meaning
       ↓
Extracts attributes
       ↓
Standardizes terminology
       ↓
MATERIALSYNC STANDARD
       ↓
ONE COMMON MATERIAL IDENTITY
```

---

# 10. PAGE 4 — SAME MATERIAL IN OTHER COMPANIES

This is one of the main features.

```text
SAME MATERIAL ACROSS ORGANIZATIONS

--------------------------------------------------------------
Organization        Material Code       Material Name
--------------------------------------------------------------

Company A           BRG-001             BRG SKF 6205 ZZ

Company B           MECH-9845           Deep Groove Brg 6205 2Z

Company C           MAT-5521            Ball Bearing 6205 Metal
--------------------------------------------------------------
```

All these records map to:

```text
MSI-BRG-000123
```

### Visual Identity Graph

```text
                   MSI-BRG-000123
          Deep Groove Ball Bearing 6205
                         |
          ───────────────┼───────────────
               |         |          |
               ↓         ↓          ↓

           Company A  Company B  Company C

           BRG-001    MECH-9845 MAT-5521

           Different Names + Different Codes
                         ↓
                    SAME IDENTITY
```

---

# 11. PAGE 5 — AI RELATIONSHIP & MATCH EVIDENCE

Do not say every record is exactly the same.

Use relationship types:

## 🟢 EXACT IDENTITY

Same material and matching technical specifications.

## 🔵 STANDARD EQUIVALENT

Different terminology or approved equivalent notation.

Example:

```text
ZZ ↔ 2Z
```

## 🟡 POSSIBLE EQUIVALENT

AI suspects equivalence, but human approval is required.

## ⚪ RELATED VARIANT

Same material family but different specifications.

### Example Evidence

```text
AI MATCH RESULT

Company B:
MECH-9845

Mapped To:
MSI-BRG-000123

Relationship:
EXACT IDENTITY

Confidence:
96%

Why?

✓ Same material type
✓ Same model: 6205
✓ Same dimensions
✓ 2Z recognized as equivalent notation to ZZ
✓ Same standardized technical fingerprint
```

### Key USP

> **AI decisions are explainable, not black-box decisions.**

---

# 12. MATERIAL TECHNICAL FINGERPRINT

This is one of the strongest technical USPs.

The system should not only compare names.

It creates a standardized technical fingerprint.

```text
INPUT:
Bearing SKF 6205 ZZ

AI FINGERPRINT:

Category: Bearing
Type: Deep Groove Ball Bearing
Manufacturer: SKF
Model: 6205
Bore: 25 mm
Outer Diameter: 52 mm
Width: 15 mm
Shield: ZZ
```

Another description:

```text
Deep Groove Brg 6205 2Z
```

Can produce a similar fingerprint.

Then AI compares:

> **Technical meaning, not only text similarity.**

---

# 13. PAGE 6 — CATEGORY EXPLORER

Show our own evolving MaterialSync taxonomy.

```text
MATERIALSYNC CATEGORIES

Mechanical
│
├── Bearings
│   ├── Deep Groove Ball Bearings
│   ├── Roller Bearings
│   └── Thrust Bearings
│
├── Valves
│   ├── Gate Valves
│   ├── Globe Valves
│   └── Ball Valves
│
Electrical
│
├── Cables
│   ├── Power Cables
│   ├── Control Cables
│   └── Instrumentation Cables
```

Each category can define:

```text
Category
      ↓
Subcategory
      ↓
Required Attributes
      ↓
Standard Naming Rules
      ↓
Unit Rules
      ↓
Known Synonyms
```

---

# 14. SELF-EVOLVING KNOWLEDGE BASE

Instead of claiming that the AI model retrains after every search, implement a more realistic approach.

### Flow

```text
AI Prediction
      ↓
Expert / User Validation
      ↓
Approved Correction
      ↓
Knowledge Base Updated
      ↓
Future Similar Searches Use New Knowledge
```

Example:

```text
AI identified:

ZZ = 2Z

Expert validates it.

System stores:

Approved Synonym / Equivalent Notation:
ZZ ↔ 2Z
```

Future materials can benefit from this knowledge.

### USP

> **Approve Once, Improve Future Matches.**

---

# 15. PAGE 7 — TEACH MATERIALSYNC

If the AI gives an incorrect result:

```text
AI Classification:

Mechanical
→ Valves
→ Gate Valves

Is this correct?

[ ✓ Confirm ]

[ ✎ Correct AI ]
```

If corrected:

```text
Correct Classification:

Mechanical
→ Valves
→ Ball Valves

[ Submit ]
```

After approval:

```text
✓ VALIDATED KNOWLEDGE ADDED

The MaterialSync Knowledge Base has been updated.
Future similar materials can benefit from this correction.
```

---

# 16. MATERIAL DETECTIVE — MISSING INFORMATION DETECTOR

This is a strong out-of-the-box feature.

If the user searches:

```text
VALVE SS 2 INCH
```

AI should not blindly guess.

Instead:

```text
AI CANNOT UNIQUELY IDENTIFY THIS MATERIAL

Missing critical information:

? Valve Type
? Pressure Rating
? End Connection
```

Then AI asks the most useful question:

```text
What type of valve is this?

○ Gate Valve
○ Globe Valve
○ Ball Valve
○ Unknown
```

### Flow

```text
Incomplete Material
       ↓
AI Detects Ambiguity
       ↓
Identifies Missing Critical Attributes
       ↓
Asks Minimum Necessary Question
       ↓
Confidence Improves
       ↓
Material Identified
```

### USP

> **The AI knows when it does not have enough information instead of confidently guessing.**

---

# 17. CONFIDENCE-BASED SAFETY

Use confidence levels:

```text
90–100% → High Confidence
          Suggested Identity

70–89%  → Medium Confidence
          Review Recommended

Below 70% → Low Confidence
            More Information Required
```

These thresholds should be configurable and validated with real data.

For critical materials, even a high-confidence match can require human approval.

This gives the platform a **risk-aware approach**.

---

# 18. SEARCH BY ANYTHING

The search engine should support:

```text
Material Name
Material Code
Company Material Code
Model Number
Part Number
Abbreviation
Alternative Name
Technical Dimensions
Technical Description
```

Examples:

```text
BRG-001
6205
Bearing 6205
25 x 52 x 15
SKF 6205 ZZ
MECH-9845
```

All should lead to the same standardized identity where sufficient evidence exists.

### USP

> **One search language across organizations.**

---

# 19. COMPARE TWO MATERIALS

Add a simple comparison feature.

```text
BRG-001
      VS
MECH-9845
```

Result:

| Attribute | BRG-001 | MECH-9845 | Result |
|---|---|---|---|
| Material Type | Bearing | Bearing | ✓ |
| Model | 6205 | 6205 | ✓ |
| Bore | 25 mm | 25 mm | ✓ |
| Width | 15 mm | 15 mm | ✓ |
| Shield | ZZ | 2Z | Equivalent |

Final:

```text
MATCH RESULT: 96%

LIKELY EXACT IDENTITY
```

This is an excellent live demonstration feature.

---

# 20. UNKNOWN MATERIAL FLOW

If a completely new material appears:

```text
SEARCHED MATERIAL
       ↓
No Exact Identity Found
       ↓
AI Extracts Meaning and Attributes
       ↓
Searches Existing Categories
       ↓
No Exact Category Found
       ↓
AI Suggests:
Parent Category
Subcategory
Attributes
Standard Name
       ↓
Expert Validates
       ↓
NEW KNOWLEDGE ADDED
       ↓
NEW MATERIALSYNC ID CREATED
```

Example:

```text
NEW MATERIAL DETECTED

Input:
XYZ-450 High Temperature Ceramic Seal

AI Suggested Category:

Industrial Components
→ Sealing Components
→ High Temperature Ceramic Seals

Suggested Standard Name:
High Temperature Ceramic Seal

[ Approve ]
[ Edit ]
```

---

# 21. FINAL FRONTEND NAVIGATION

Keep it simple.

```text
MATERIALSYNC AI

├── Home / Search
│
├── Material Profile
│
├── Compare Materials
│
├── Categories
│
└── Teach MaterialSync
```

Avoid a traditional dashboard for the MVP.

The **search and material profile should be the main experience**.

---

# 22. RECOMMENDED FRONTEND TECH STACK

```text
React
+
TypeScript
+
Tailwind CSS
+
shadcn/ui
```

Additional libraries:

```text
React Router
Lucide React
Framer Motion
```

Backend communication:

```text
React Frontend
       ↓
REST / API
       ↓
FastAPI
       ↓
AI + NLP Engine
       ↓
Material Knowledge Base
       ↓
PostgreSQL / Vector Database
```

---

# 23. MVP DEVELOPMENT PRIORITY

## Phase 1 — Core Search

Build:

```text
Home
↓
Search Bar
↓
AI Processing
↓
Material Result
```

## Phase 2 — Standardization

Build:

```text
Raw Input
↓
AI Attribute Extraction
↓
MaterialSync Standard
↓
Common Material ID
```

## Phase 3 — Cross-Organization Mapping

Build:

```text
Material Profile
↓
Other Companies
↓
Their Codes
↓
Their Names
↓
Relationship
```

## Phase 4 — Trust Features

Build:

```text
Confidence
+
Evidence
+
Compare
+
Human Validation
```

## Phase 5 — Innovation Features

Build:

```text
Self-Evolving Knowledge Base
+
Material Detective
+
Unknown Material Category Proposal
```

---

# 24. BEST SIH MVP DEMO FLOW

```text
1. Open MaterialSync AI

2. Search:
   "BRG SKF 6205 ZZ"

3. AI analyzes the input

4. AI extracts:
   Bearing
   SKF
   6205
   ZZ

5. AI identifies the standardized material

6. Show material image

7. Show:

   MSI-BRG-000123

   Deep Groove Ball Bearing 6205 ZZ

8. Show technical specifications

9. Click:
   "Used in Other Organizations"

10. Show:

    Company A → BRG-001
    Company B → MECH-9845
    Company C → MAT-5521

11. Show different names

12. Show why they map to the same identity

13. Search an incomplete material:

    "VALVE SS 2 INCH"

14. AI says information is insufficient

15. AI asks:

    "What type of valve?"

16. User selects:

    Ball Valve

17. AI identifies the material

18. Demonstrate human correction

19. Show:

    Knowledge Base Updated

20. Final message:

    ONE MATERIAL
    MANY NAMES
    MANY CODES
    ONE STANDARD IDENTITY
```

---

# 25. ADDITIONAL IMPORTANT SUGGESTIONS

## Suggestion A — Add a Source & Validation Badge

Every piece of information should show its status:

```text
✓ AI Extracted
✓ Expert Validated
✓ Knowledge Base Confirmed
⚠ Needs Verification
```

This makes the system more trustworthy.

---

## Suggestion B — Don't Give a Fake Exact Image

If the AI identifies only a material **type**, show a representative category image and label it clearly:

> **Representative image — exact manufacturer/model may vary**

Only show an exact product image when the identity is sufficiently verified.

This avoids a major trust problem.

---

## Suggestion C — Create a Material Card

Every search result should have a reusable visual card:

```text
┌──────────────────────────────┐
│ 🖼️ Material Image            │
│                              │
│ Deep Groove Ball Bearing     │
│                              │
│ MSI-BRG-000123               │
│                              │
│ Mechanical → Bearings        │
│                              │
│ ✓ Verified Identity          │
└──────────────────────────────┘
```

This can be used everywhere.

---

## Suggestion D — Standard Name Generation

AI should propose a consistent standard name.

Example:

```text
Raw:
BRG SKF 6205 ZZ

Standard:
Deep Groove Ball Bearing,
6205, Shielded ZZ
```

Use a naming template based on the category.

This makes your standardization more visible.

---

## Suggestion E — Build the Demo Dataset Carefully

For the hackathon, create a realistic dataset containing:

- Same material, different names
- Same material, different codes
- Abbreviations
- Unit variations
- Typing mistakes
- Near duplicates
- Similar but different variants
- Incomplete descriptions
- Unknown/new categories

Example:

```text
BRG SKF 6205 ZZ
Deep Groove Brg 6205 2Z
BALL BRG-6205-ZZ
6205 Bearing

6205 2RS
```

The first four could potentially map to the same identity after validation, while **6205 2RS should be handled carefully as a different variant**, not blindly merged.

This demonstrates that the AI understands technical meaning instead of simply matching keywords.

---

# FINAL PROJECT USP

> **MaterialSync AI creates an intelligent common identity for industrial materials. Users can search using any name, code, abbreviation, or technical description, and AI understands the material, standardizes it into a common MaterialSync format, displays its technical and visual identity, and reveals what the same material is called and coded across different organizations. Through explainable, confidence-aware decisions and validated feedback, the MaterialSync Knowledge Base continuously expands and improves.**

# Final Pitch Line

> ## **We don't force organizations to change their material codes. We give every material a common identity.**

# Shortest Version

> # **Search Once. Understand Everywhere.**
