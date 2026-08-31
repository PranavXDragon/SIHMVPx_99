// ── Mock Data ─────────────────────────────────────────────
// NMI Assistant — Universal Material Intelligence Platform

export const COMPANIES = [
  { id: 'IOCL', name: 'Indian Oil Corporation Ltd.', color: '#DC2626' },
  { id: 'BPCL', name: 'Bharat Petroleum Corporation Ltd.', color: '#2563EB' },
  { id: 'HPCL', name: 'Hindustan Petroleum Corporation Ltd.', color: '#16A34A' },
  { id: 'MRPL', name: 'Mangalore Refinery & Petrochemicals Ltd.', color: '#7C3AED' },
  { id: 'ONGC', name: 'Oil & Natural Gas Corporation', color: '#D97706' },
  { id: 'SAIL', name: 'Steel Authority of India Ltd.', color: '#0284C7' },
  { id: 'NTPC', name: 'National Thermal Power Corporation', color: '#0891B2' },
  { id: 'CPCL', name: 'Chennai Petroleum Corporation Ltd.', color: '#6D28D9' },
];

export const MATERIALS = [
  {
    umc: 'UMC-0007821',
    name: 'SS Hex Bolt M16x50',
    category: 'Fasteners',
    status: 'VERIFIED',
    matchType: 'EXACT',
    highestMatch: 97.8,
    demand: 4050,
    procurement: 'High',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Bolt_18-8.jpg/320px-Bolt_18-8.jpg',
    attributes: { 'Material': 'Stainless Steel', 'Type': 'Hex Bolt', 'Diameter': 'M16', 'Length': '50 mm', 'Standard': 'IS 1363', 'Grade': 'SS 304', 'Thread Pitch': '2.0 mm' },
    critical: ['Type', 'Material', 'Diameter', 'Length'],
    companies: [
      { id: 'IOCL', code: 'MAT-10234', desc: 'SS HEX BOLT M16 X 50', match: 97.8 },
      { id: 'BPCL', code: 'BP-7781', desc: 'STAINLESS HEX BOLT 16X50', match: 97.8 },
      { id: 'HPCL', code: 'H-45291', desc: 'HEX BOLT SS M16*50', match: 97.5 },
      { id: 'MRPL', code: 'MR-8122', desc: 'SS BOLT M16X50', match: 97.2 },
    ],
    keywords: ['hex bolt', 'bolt', 'm16', 'ss', 'stainless', 'fastener', 'mat-10234', 'bp-7781', 'h-45291', 'mr-8122'],
  },
  {
    umc: 'UMC-0000001',
    name: 'Ball Valve SS316 2" PN16 Flanged',
    category: 'Valves',
    status: 'VERIFIED',
    matchType: 'EXACT',
    highestMatch: 98.4,
    demand: 1280,
    procurement: 'High',
    image: null,
    attributes: { 'Product Type': 'Ball Valve', 'Material': 'SS316', 'Size': '2 IN', 'Pressure Rating': 'PN16', 'Connection': 'Flanged', 'Standard': 'API 6D' },
    critical: ['Product Type', 'Material', 'Size', 'Pressure Rating', 'Connection'],
    companies: [
      { id: 'CPCL', code: '133292613', desc: 'BALL VALVE SS316 2" FLANGED PN16', match: 98.4 },
      { id: 'ONGC', code: 'ONGC-VAL-7821', desc: 'SS316 BALL VALVE 2" FLANGED', match: 98.4 },
      { id: 'IOCL', code: 'IO-VAL-4492', desc: 'BALL VALVE SIZE 2IN SS316', match: 97.9 },
      { id: 'NTPC', code: 'NT-88741', desc: 'BALL VALVE SS316 2INCH', match: 97.6 },
      { id: 'SAIL', code: 'SAIL-M-92011', desc: 'BALL VALVE 2" SS316 PN16', match: 97.1 },
    ],
    keywords: ['ball valve', 'valve', 'ss316', 'pn16', 'flanged', '2 in', '2inch', 'ongc-val-7821', '133292613', 'io-val-4492'],
  },
  {
    umc: 'UMC-0000002',
    name: 'Deep Groove Ball Bearing 6205-ZZ',
    category: 'Mechanical',
    status: 'VERIFIED',
    matchType: 'EXACT',
    highestMatch: 99.1,
    demand: 3200,
    procurement: 'Medium',
    image: null,
    attributes: { 'Type': 'Deep Groove Ball Bearing', 'Bore (d)': '25 mm', 'OD (D)': '52 mm', 'Width (B)': '15 mm', 'Sealing': 'ZZ Metal Shield', 'Standard': 'DIN 625' },
    critical: ['Type', 'Bore (d)', 'OD (D)', 'Width (B)', 'Sealing'],
    companies: [
      { id: 'IOCL', code: 'BRG-001', desc: 'BEARING 6205 2Z 25X52X15', match: 99.1 },
      { id: 'BPCL', code: 'MECH-9845', desc: 'DG BALL BEARING 6205ZZ', match: 98.8 },
      { id: 'HPCL', code: 'HP-BRG-6205', desc: 'BEARING SKF 6205ZZ', match: 98.5 },
      { id: 'ONGC', code: 'OG-4422', desc: 'BALL BEARING 25X52X15 2Z', match: 97.9 },
    ],
    keywords: ['bearing', '6205', 'ball bearing', 'deep groove', 'zz', 'brg-001', 'mech-9845', 'hp-brg-6205', 'og-4422'],
  },
  {
    umc: 'UMC-0000003',
    name: 'Gate Valve CS 3" PN16 Flanged',
    category: 'Valves',
    status: 'VERIFIED',
    matchType: 'PROBABLE',
    highestMatch: 96.5,
    demand: 870,
    procurement: 'Medium',
    image: null,
    attributes: { 'Product Type': 'Gate Valve', 'Material': 'Carbon Steel', 'Size': '3 IN', 'Pressure Rating': 'PN16', 'Connection': 'Flanged', 'Standard': 'API 600' },
    critical: ['Product Type', 'Material', 'Size', 'Pressure Rating'],
    companies: [
      { id: 'CPCL', code: 'CPCL-GV-4421', desc: 'GATE VALVE CS 3IN PN16', match: 96.5 },
      { id: 'SAIL', code: 'SAIL-GV-8801', desc: 'GATE VALVE 3" FLANGED CS', match: 96.0 },
      { id: 'NTPC', code: 'NT-GV-2211', desc: 'CS GATE VALVE 3 INCH', match: 95.5 },
    ],
    keywords: ['gate valve', 'valve', 'carbon steel', 'cs', 'pn16', '3 in', 'cpcl-gv', 'sail-gv'],
  },
  {
    umc: 'UMC-0000004',
    name: 'XLPE Cable 3Cx16sqmm 1.1kV Armoured',
    category: 'Electrical',
    status: 'VERIFIED',
    matchType: 'EXACT',
    highestMatch: 98.0,
    demand: 12000,
    procurement: 'High',
    image: null,
    attributes: { 'Type': 'XLPE Power Cable', 'Cores': '3 Core', 'Cross-section': '16 sq mm', 'Voltage': '1.1 kV', 'Armoring': 'SWA', 'Standard': 'IS 7098' },
    critical: ['Cores', 'Cross-section', 'Voltage', 'Armoring'],
    companies: [
      { id: 'NTPC', code: 'ELEC-CAB-4411', desc: '3C x 16 SQMM XLPE CABLE 1.1KV ARMD', match: 98.0 },
      { id: 'SAIL', code: 'SAIL-E-7720', desc: 'XLPE CABLE 3CORE 16MM 1.1KV SWA', match: 97.7 },
      { id: 'IOCL', code: 'IO-CBL-8842', desc: '1.1KV 3Cx16 SQMM XLPE ARMOURED CABLE', match: 97.4 },
    ],
    keywords: ['xlpe', 'cable', 'power cable', '3 core', '16sqmm', '1.1kv', 'armoured', 'swa', 'elec-cab-4411', 'sail-e-7720'],
  },
  {
    umc: 'UMC-0000005',
    name: 'Centrifugal Pump 50mm 2HP 3Phase',
    category: 'Mechanical',
    status: 'VERIFIED',
    matchType: 'EXACT',
    highestMatch: 95.2,
    demand: 320,
    procurement: 'Low',
    image: null,
    attributes: { 'Type': 'Centrifugal Pump', 'Outlet Size': '50 mm', 'Power': '2 HP', 'Supply': '3 Phase 415V', 'Material': 'CI Body', 'Standard': 'IS 9137' },
    critical: ['Type', 'Outlet Size', 'Power', 'Supply'],
    companies: [
      { id: 'BPCL', code: 'PMP-0012', desc: 'CENTRIFUGAL PUMP 50MM 2HP 3PH', match: 95.2 },
      { id: 'MRPL', code: 'MR-PMP-881', desc: 'PUMP CENTRIFUGAL 2HP 3PHASE 50MM', match: 94.8 },
    ],
    keywords: ['pump', 'centrifugal', '2hp', '3phase', '50mm', 'pmp-0012', 'mr-pmp-881'],
  },
];

export const REVIEW_ITEMS = [
  {
    id: 'rev-001', company: 'ONGC', code: 'ONGC-XYZ-901',
    raw: 'BALL VLV SS 316 2 IN',
    extracted: { Type: 'Ball Valve', Material: 'SS316', Size: '2 IN', 'Pressure Rating': '—' },
    candidateUmc: 'UMC-0000001',
    candidateDesc: 'Ball Valve SS316 2" PN16 Flanged',
    missing: ['Pressure Rating', 'Connection Type'],
    confidence: 71.2,
  },
  {
    id: 'rev-002', company: 'SAIL', code: 'SAIL-B-5512',
    raw: 'BRG 6205 SEALED',
    extracted: { Type: 'Ball Bearing', Model: '6205', Sealing: '?' },
    candidateUmc: 'UMC-0000002',
    candidateDesc: 'Deep Groove Ball Bearing 6205-ZZ',
    missing: ['Sealing Type (ZZ or 2RS?)'],
    confidence: 82.4,
  },
  {
    id: 'rev-003', company: 'BPCL', code: 'BP-GV-0931',
    raw: 'GATE VLV 3IN FLANGED',
    extracted: { Type: 'Gate Valve', Size: '3 IN', Connection: 'Flanged', Material: '—' },
    candidateUmc: 'UMC-0000003',
    candidateDesc: 'Gate Valve CS 3" PN16 Flanged',
    missing: ['Material', 'Pressure Rating'],
    confidence: 68.9,
  },
];

export const STATS = {
  totalRecords: 30000,
  universalMaterials: 8240,
  companies: 8,
  exactMappings: 24150,
  reviewRequired: 342,
  newUMCs: 89,
};

export const RECENT = [
  { company: 'IOCL', code: 'MAT-10234', umc: 'UMC-0007821', type: 'EXACT', conf: 97.8, time: '10:30 AM' },
  { company: 'ONGC', code: 'ONGC-VAL-7821', umc: 'UMC-0000001', type: 'EXACT', conf: 98.4, time: '09:15 AM' },
  { company: 'SAIL', code: 'SAIL-GV-8801', umc: 'UMC-0000003', type: 'PROBABLE', conf: 82.1, time: 'Yesterday' },
  { company: 'CPCL', code: 'CPCL-XYZ-901', umc: null, type: 'REVIEW', conf: 71.2, time: 'Yesterday' },
  { company: 'NTPC', code: 'ELEC-CAB-4411', umc: 'UMC-0000004', type: 'EXACT', conf: 98.0, time: '2 days ago' },
];

export const SUGGESTIONS = [
  'Find equivalent for SS Hex Bolt M16x50',
  'ONGC-VAL-7821',
  'Ball Valve SS316 2 inch PN16',
  'BRG-001',
  'XLPE cable 1.1kV armoured',
  'UMC-0000003',
];

/** Smart search — normalizes unicode chars, does word-level AND scoring */
export function doSearch(query) {
  if (!query || !query.trim()) return [];

  // Normalize: × → x, remove extra spaces, lowercase
  const normalized = query
    .toLowerCase()
    .replace(/×/g, 'x')
    .replace(/[""]/g, '"')
    .trim();

  // Split into meaningful tokens (len ≥ 2)
  const tokens = normalized.split(/[\s\-_,/]+/).filter(t => t.length >= 2);

  const scored = MATERIALS.map(m => {
    const haystack = [
      m.umc,
      m.name,
      m.category,
      m.status,
      ...m.keywords,
      ...(m.companies.flatMap(c => [c.code, c.desc, c.id])),
      ...Object.values(m.attributes),
    ].join(' ').toLowerCase().replace(/×/g, 'x');

    // Direct substring of normalized query
    if (haystack.includes(normalized)) return { m, score: 100 };

    // Token hit count
    const hits = tokens.filter(t => haystack.includes(t)).length;
    const score = tokens.length ? (hits / tokens.length) * 100 : 0;
    return { m, score };
  });

  return scored
    .filter(s => s.score >= 40)
    .sort((a, b) => b.score - a.score)
    .map(s => s.m);
}
