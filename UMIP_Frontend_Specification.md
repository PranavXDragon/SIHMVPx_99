# Universal Material Intelligence Platform (UMIP)

## Frontend Specification

## 1. Purpose

Build a frontend for a **Universal Material Intelligence Platform** where multiple companies retain their own material codes but map equivalent materials to one platform-owned universal identity.

### Core concepts

- **UMS (Universal Material Standard):** The platform's standardization framework.
- **UMC (Universal Material Code):** A unique code assigned to one universal material record.
- **Company Material Code:** The original material code used by a company. It is never replaced.
- **Cross-Company Mapping:** Multiple company material records can connect to the same UMC when their critical specifications match.

---

## 2. Frontend Goal

The frontend must allow users to:

1. Search by any company's material code.
2. Search by UMC.
3. Search by material description.
4. View the platform's standardized material record.
5. View the original material records connected to the same UMC across companies.
6. Upload company material data.
7. View AI standardization results.
8. Explore duplicate/equivalent material groups.
9. Review uncertain mappings.

The frontend displays and interacts with the system. Permanent UMC creation, matching decisions, and database storage are handled by the backend.

---

## 3. Recommended Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Icons:** Lucide
- **Charts:** Recharts
- **Data fetching:** TanStack Query
- **API:** REST backend

---

## 4. Main Pages

### 4.1 Dashboard

Route: `/`

Show:

- Total company records
- Total universal materials
- Connected companies
- Exact mappings
- Review-required mappings
- New materials created
- Recent standardization activity
- Top duplicate groups
- Universal search bar

Suggested layout:

```text
+-------------------------------------------------------------+
| UMIP                              Search | Notifications     |
+-------------------+-----------------------------------------+
| Dashboard         |  30,000       8,240         5            |
| Universal Search  |  Company      Universal     Companies    |
| Upload Data       |  Records      Materials                   |
| Duplicate Explorer|                                         |
| Review Queue      |  [ Search material code / UMC / text ]   |
| Companies         |                                         |
| Settings          |  Recent Activity                         |
+-------------------+-----------------------------------------+
```

---

### 4.2 Universal Search

Route: `/search`

Search input placeholder:

`Search Company Code, UMC, Description, Model or Part Number`

Filters:

- Company
- Category
- Match type
- Status

Search result card:

```text
OUR UNIVERSAL STANDARD
UMC-000000001

BALL VALVE | SS316 | 2 IN | PN16 | FLANGED

Category: VALVES
Status: VERIFIED

[ View Universal Record ]
```

Below it show:

```text
CONNECTED COMPANY MATERIALS

Company     Material Code      Original Description       Relation
CPCL        133292613          BALL VALVE SS316...        EXACT
ONGC        ONGC-VAL-7821      SS316 BALL VALVE...        EXACT
IOCL        IO-VAL-4492        BALL VALVE SIZE...         EXACT
NTPC        NT-88741           BALL VALVE SS316...        EXACT
SAIL        SAIL-M-92011       BALL VALVE 2"...            EXACT
```

---

### 4.3 Universal Material Detail

Route: `/materials/[umc]`

Sections:

#### Header

- UMC code
- Standard description
- Category
- Status badge
- Version

#### Material DNA

Display structured attributes dynamically.

Example:

```text
PRODUCT TYPE:       BALL VALVE
MATERIAL:           SS316
SIZE:               2 IN
PRESSURE RATING:    PN16
CONNECTION TYPE:    FLANGED
```

#### Critical Attributes

Show fields used to protect against false duplicate mapping.

Example:

```text
CRITICAL ATTRIBUTES
[x] Product Type
[x] Material
[x] Size
[x] Pressure Rating
[x] Connection Type
```

#### Connected Company Records

Table:

- Company
- Company Material Code
- Original Description
- Match Type
- Confidence
- Mapping Status
- View action

#### Related Materials

Show:

- Exact same
- Probable match
- Possible duplicate
- Specification conflict

---

### 4.4 Company Material Detail

Route: `/company-materials/[id]`

Show:

```text
ORIGINAL COMPANY RECORD

Company: ONGC
Company Material Code: ONGC-VAL-7821
Original Description:
SS316 BALL VALVE,2" FLANGED,PN16
```

Then show:

```text
MAPPED TO UNIVERSAL STANDARD

UMC-000000001
BALL VALVE | SS316 | 2 IN | PN16 | FLANGED

Relationship: EXACT
Confidence: 98%
```

Add navigation:

`View all companies connected to this UMC`

---

### 4.5 Upload Data

Route: `/upload`

Flow:

1. Select company.
2. Upload CSV/XLSX.
3. Preview detected columns.
4. Map columns:
   - Material Code
   - Item Description
   - Quantity
   - Unit
5. Validate.
6. Start standardization.
7. Show progress.

UI:

```text
UPLOAD COMPANY MATERIAL DATA

Company
[ ONGC v ]

[ Drop XLSX or CSV here ]

Detected columns
Company Material Code -> Material_Code
Description           -> Item_Description
Quantity              -> Quantity
Unit                  -> Units

[ Validate Data ]  [ Start Standardization ]
```

Progress states:

- Uploaded
- Validating
- AI processing
- Standardizing
- Matching with UMC
- Creating mappings
- Completed

---

### 4.6 Standardization Results

Route: `/standardization/[jobId]`

Show original vs standardized data.

```text
RAW MATERIAL
SS316 BALL VALVE,2" FLANGED,PN16

          ↓ AI STANDARDIZED

BALL VALVE | SS316 | 2 IN | PN16 | FLANGED

          ↓

UMC-000000001

MATCH: EXACT
```

For batch jobs show:

- Processed
- Exact mapped
- Probable
- Review
- Conflict
- New UMC candidates

Include drill-down into individual records.

---

### 4.7 Duplicate Explorer

Route: `/duplicates`

Purpose: explore material groups connected through the same UMC.

Group visualization:

```text
                 UMC-000000001
                         |
        +----------------+----------------+
        |                |                |
      CPCL             ONGC             IOCL
   133292613       ONGC-VAL-7821      IO-VAL-4492
```

List view filters:

- Category
- Number of companies
- Exact/probable/review
- Minimum confidence

Each group shows:

- UMC
- Standard description
- Number of connected companies
- Number of records
- Relationship summary

---

### 4.8 Review Queue

Route: `/review`

For uncertain records.

Example:

```text
REVIEW REQUIRED

Company: ONGC
Code: ONGC-XYZ-901

Raw:
BALL VLV SS 316 2 IN

Possible UMC:
UMC-000000001

Missing critical attribute:
Pressure Rating

[ Approve Mapping ] [ Reject ] [ Create New UMC ]
```

The UI must clearly show:

- Raw value
- Extracted attributes
- Existing candidate UMC
- Differences
- Missing critical fields
- AI confidence

---

### 4.9 Companies

Route: `/companies`

Show participating companies.

For each company:

- Name
- Number of material records
- Mapped records
- Unique company codes
- Number of UMCs connected
- Pending review count

Clicking a company opens:

Route: `/companies/[id]`

with its material catalog and UMC mappings.

---

## 5. Navigation

Desktop sidebar:

```text
UMIP

Dashboard
Universal Search
Upload Data
Standardization Jobs
Duplicate Explorer
Review Queue
Companies
Universal Materials
Settings
```

Top bar:

- Global search
- User profile
- Notifications

Mobile:

- Collapsible navigation
- Persistent global search access

---

## 6. Match Status UI

Use consistent badges:

- `EXACT` — all critical attributes match.
- `PROBABLE` — strong match with non-critical differences or missing optional data.
- `REVIEW` — insufficient information for safe automatic mapping.
- `CONFLICT` — critical specifications differ.
- `NEW` — no existing UMC found.

Do not present `PROBABLE` or `REVIEW` as confirmed duplicates.

---

## 7. Key User Flow

### Search flow

```text
User enters Company Material Code
        ↓
Frontend calls Search API
        ↓
Receive Company Record + UMC Mapping
        ↓
Show Original Company Record
        ↓
Show OUR Universal Standard
        ↓
Show Same / Related Records in Other Companies
```

### New upload flow

```text
Upload File
    ↓
Select Company
    ↓
Column Mapping
    ↓
Validate
    ↓
Start Processing
    ↓
Show Live Job Progress
    ↓
View Results
    ↓
Review uncertain mappings
```

### Universal material flow

```text
Search any description/code
    ↓
Find UMC
    ↓
Open Universal Material Detail
    ↓
View Material DNA
    ↓
View all connected company codes
```

---

## 8. API Contract Expected by Frontend

### Search

`GET /api/search?q={query}`

Expected response:

```json
{
  "query": "ONGC-VAL-7821",
  "result": {
    "company_material": {
      "id": "cm_101",
      "company": "ONGC",
      "material_code": "ONGC-VAL-7821",
      "original_description": "SS316 BALL VALVE,2\" FLANGED,PN16"
    },
    "universal_material": {
      "umc_id": "UMC-000000001",
      "standard_description": "BALL VALVE | SS316 | 2 IN | PN16 | FLANGED",
      "category": "VALVES",
      "status": "VERIFIED"
    },
    "related_records": []
  }
}
```

### Universal material

`GET /api/materials/{umc}`

### Company material

`GET /api/company-materials/{id}`

### Companies

`GET /api/companies`

### Upload

`POST /api/uploads`

### Start standardization

`POST /api/standardization/jobs`

### Job status

`GET /api/standardization/jobs/{jobId}`

### Review action

`POST /api/review/{mappingId}`

---

## 9. Frontend Data Types

```ts
type MatchType =
  | "EXACT"
  | "PROBABLE"
  | "REVIEW"
  | "CONFLICT"
  | "NEW";

interface UniversalMaterial {
  umcId: string;
  category: string;
  productType: string;
  standardDescription: string;
  attributes: Record<string, string | number | null>;
  criticalAttributes: string[];
  status: "VERIFIED" | "PENDING" | "DRAFT";
  version: string;
}

interface CompanyMaterial {
  id: string;
  companyId: string;
  companyName: string;
  materialCode: string;
  originalDescription: string;
  quantity?: number;
  unit?: string;
}

interface MaterialMapping {
  id: string;
  companyMaterialId: string;
  umcId: string;
  matchType: MatchType;
  confidence: number;
  mappingStatus: "APPROVED" | "PENDING_REVIEW" | "REJECTED";
}
```

---

## 10. Component Structure

```text
components/
├── layout/
│   ├── Sidebar
│   ├── Header
│   └── PageContainer
├── search/
│   ├── GlobalSearch
│   ├── SearchFilters
│   └── SearchResults
├── materials/
│   ├── UniversalMaterialCard
│   ├── MaterialDNA
│   ├── CriticalAttributes
│   ├── ConnectedCompaniesTable
│   └── RelatedMaterials
├── upload/
│   ├── FileUploader
│   ├── CompanySelector
│   ├── ColumnMapper
│   └── UploadProgress
├── duplicates/
│   ├── DuplicateGroupCard
│   └── MaterialConnectionGraph
├── review/
│   ├── ReviewCard
│   ├── AttributeComparison
│   └── ReviewActions
└── ui/
```

---

## 11. MVP Priority

### Must build first

1. Dashboard
2. Universal Search
3. Universal Material Detail
4. Connected Company Records
5. Upload Data
6. Standardization Results
7. Review Queue

### Build if time permits

8. Duplicate Explorer graph
9. Advanced analytics
10. Notifications
11. Settings

---

## 12. Frontend Success Criteria

A judge should be able to perform this demo in under two minutes:

1. Open dashboard.
2. Search a company material code.
3. See the original company record.
4. See the platform's UMC and standardized description.
5. See matching material codes from other companies.
6. Open the UMC.
7. See the complete Material DNA and critical attributes.
8. Upload a new dataset and see records standardized and mapped.

### Final frontend message

**One search → Original company material → Our Universal Material Standard → Same/related material codes across every connected company.**
