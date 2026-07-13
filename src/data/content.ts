export type HubLink = {
  to: string
  label: string
  meta: string
  summary: string
}

export const hubLinks: HubLink[] = [
  {
    to: '/library',
    label: 'Library',
    meta: 'Knowledge',
    summary:
      'Australian architecture history, climate design, materials, construction systems, and theory for studio.',
  },
  {
    to: '/courses',
    label: 'Courses',
    meta: 'Curriculum',
    summary:
      'Guided pathways from foundation year through Masters, registration, and specialist skills.',
  },
  {
    to: '/software',
    label: 'Software',
    meta: 'Tools',
    summary:
      'Learn Revit, Rhino, AutoCAD, SketchUp, Grasshopper, Lumion, and the digital toolkit studios expect.',
  },
  {
    to: '/practice',
    label: 'Practice',
    meta: 'Profession',
    summary:
      'AACA pathways, state registration, ethics, documentation standards, and career routes.',
  },
  {
    to: '/business',
    label: 'Business',
    meta: 'Studio ops',
    summary:
      'Fees, contracts, procurement, practice management, and how architecture firms actually run.',
  },
  {
    to: '/studio',
    label: 'Studio Life',
    meta: 'You',
    summary:
      'Portfolio craft, mental load, networking, competitions, and building a sustainable creative life.',
  },
]

export const libraryTopics = [
  {
    id: 'au-canon',
    category: 'Australia',
    title: 'Australian architectural canon',
    summary:
      'From colonial masonry and Federation to the Sydney School, Glenn Murcutt, and contemporary Pacific practice.',
    points: [
      'Sydney Opera House as civic and technical watershed',
      'Bush architecture and the Australian vernacular',
      'Indigenous design protocols and Country-centred practice',
      'State-by-state planning cultures and heritage overlays',
    ],
  },
  {
    id: 'climate',
    category: 'Climate',
    title: 'Climate & comfort across regions',
    summary:
      'Design for tropical north, temperate south, arid interiors, and coastal humidity—not generic sustainability slogans.',
    points: [
      'NatHERS, BASIX, and NCC Section J essentials',
      'Passive solar, cross-ventilation, and thermal mass',
      'Bushfire (BAL), cyclone, and flood-responsive detailing',
      'Embodied carbon and material life-cycle literacy',
    ],
  },
  {
    id: 'materials',
    category: 'Making',
    title: 'Materials & construction',
    summary:
      'Timber framing, concrete, brick, steel, and emerging low-carbon assemblies used on Australian sites.',
    points: [
      'AS 1684 timber framing logic at a glance',
      'Concrete systems: slab-on-ground to post-tension',
      'Weatherproofing for harsh UV and salt air',
      'Spec writing: performance vs proprietary',
    ],
  },
  {
    id: 'theory',
    category: 'Thinking',
    title: 'Theory for studio',
    summary:
      'Critical tools for briefs, diagrams, and reviews—place, tectonics, programme, and representation.',
    points: [
      'Site reading and propositional drawing',
      'Programme: adjacency, sequence, ambiguity',
      'Public vs private thresholds in housing',
      'Writing a clear project narrative',
    ],
  },
  {
    id: 'urban',
    category: 'City',
    title: 'Urbanism & housing',
    summary:
      'Apartment typologies, missing-middle housing, precinct structure, and Australian planning instruments.',
    points: [
      'SEPP / planning scheme basics by state',
      'Corridor, courtyard, and tower morphologies',
      'Amenity, solar access, and natural surveillance',
      'Affordable and social housing design drivers',
    ],
  },
  {
    id: 'tech',
    category: 'Detail',
    title: 'Detailing & documentation',
    summary:
      'How drawings communicate intent from sketch design through tender and construction certificate stages.',
    points: [
      'Drawing sets: DA/CDC, BA/CC, IFC packages',
      'Wall, roof, and wet-area junctions that fail most often',
      'Coordination with structure, services, and fire',
      'Specification alignment with schedules',
    ],
  },
]

export const courses = [
  {
    id: 'foundations',
    level: 'Year 1–2',
    title: 'Design foundations',
    summary:
      'Seeing, drawing, and making. Spatial literacy, model craft, architectural history literacy, and studio culture.',
    duration: '8 modules',
    focus: 'Representation · site · critique',
  },
  {
    id: 'building',
    level: 'Year 2–3',
    title: 'Building systems fluency',
    summary:
      'Structure, construction, environmental systems, and how technical decisions appear in your drawings.',
    duration: '10 modules',
    focus: 'Tech · NCC intro · detailing',
  },
  {
    id: 'studio-advanced',
    level: 'Year 3–M.Arch',
    title: 'Advanced studio strategies',
    summary:
      'Complex briefs, housing and civic programmes, research-led projects, and portfolio-strengthening outcomes.',
    duration: '12 modules',
    focus: 'Typology · research · narrative',
  },
  {
    id: 'digital',
    level: 'All levels',
    title: 'Digital craft track',
    summary:
      'A software pathway paired with design method—BIM modelling, parametric thinking, and visualisation discipline.',
    duration: '14 modules',
    focus: 'Revit · Rhino · presentation',
  },
  {
    id: 'registration',
    level: 'Graduate',
    title: 'Path to registration',
    summary:
      'AACA NSCA competencies, logbook habits, exam readiness, and supervised practice milestones across states.',
    duration: '6 modules',
    focus: 'Practice · ethics · exams',
  },
  {
    id: 'practice-biz',
    level: 'Early career',
    title: 'Practice & business literacy',
    summary:
      'Contracts, fees, risk, consultant coordination, and client communication for emerging professionals.',
    duration: '7 modules',
    focus: 'AS4122 · fees · delivery',
  },
]

export const softwareTools = [
  {
    id: 'revit',
    name: 'Autodesk Revit',
    category: 'BIM',
    summary:
      'Industry default for documentation in Australian commercial and residential practices. Families, sheets, schedules, and coordination.',
    track: 'Start with walls/floors/roofs → sheets → schedules → worksharing.',
  },
  {
    id: 'autocad',
    name: 'AutoCAD',
    category: '2D drafting',
    summary:
      'Still essential for redlines, details, site overlays, and consultant exchange. Layer discipline and plotting standards matter.',
    track: 'Layers → blocks → xrefs → CTB/STB workflows.',
  },
  {
    id: 'rhino',
    name: 'Rhino 3D',
    category: 'Modelling',
    summary:
      'Precision freeform modelling for concept through fabrication. Pair with Illustrator/Photoshop for boards.',
    track: 'Curves → surfaces → solid tooling → layout.',
  },
  {
    id: 'grasshopper',
    name: 'Grasshopper',
    category: 'Parametric',
    summary:
      'Generative logic for facades, optimisation studies, and rapid optioneering without losing design authorship.',
    track: 'Data trees → attractors → panels → analysis links.',
  },
  {
    id: 'sketchup',
    name: 'SketchUp',
    category: 'Concept',
    summary:
      'Fast massing and client conversation models. Useful early, limited late—know when to graduate to BIM.',
    track: 'Groups → components → scenes → LayOut.',
  },
  {
    id: 'lumion',
    name: 'Lumion / Enscape',
    category: 'Visualisation',
    summary:
      'Realtime and cinematic visualisation for reviews and competitions. Focus on light, material honesty, and narrative views.',
    track: 'Material sets → cameras → weather → stills/video.',
  },
  {
    id: 'adobe',
    name: 'Adobe suite',
    category: 'Communication',
    summary:
      'Illustrator, InDesign, and Photoshop remain the portfolio and board standard across Australian schools.',
    track: 'Diagram language → board composition → export craft.',
  },
  {
    id: 'bluebeam',
    name: 'Bluebeam / PDF mark-up',
    category: 'Coordination',
    summary:
      'Daily tool for mark-ups, RFIs, and issue tracking once you are in practice.',
    track: 'Tool chest → layer status → measurement → punch lists.',
  },
]

export const practicePaths = [
  {
    num: '01',
    title: 'Understand NSCA competencies',
    summary:
      'Map your experience against the National Standard of Competency for Architects—design, documentation, practice management, and project delivery.',
    tag: 'AACA',
  },
  {
    num: '02',
    title: 'Log meaningful work',
    summary:
      'Capture evidence weekly. Quality of reflection beats volume. Tie each entry to competencies and outcomes.',
    tag: 'Logbook',
  },
  {
    num: '03',
    title: 'Know your state board',
    summary:
      'NSW Architects Registration Board, ARBV, QLD Board, and others each have procedural nuances—study your jurisdiction early.',
    tag: 'State',
  },
  {
    num: '04',
    title: 'Build exam stamina',
    summary:
      'Part of the pathway tests judgement under pressure: legislation awareness, ethics, and project scenarios.',
    tag: 'Exams',
  },
  {
    num: '05',
    title: 'Choose a supervisor / mentor',
    summary:
      'Find a registered architect who challenges your judgement, not just signs hours. Mentorship is career infrastructure.',
    tag: 'Mentorship',
  },
]

export const businessTopics = [
  {
    title: 'How practices make money',
    summary:
      'Fee types (percentage, lump sum, hourly), cashflow timing, and why scope creep destroys studios.',
    items: [
      'Typical fee stages from concept to contract admin',
      'Retainer vs phased agreements',
      'Overheads: software, PI insurance, rent, salaries',
    ],
  },
  {
    title: 'Contracts & risk',
    summary:
      'Client–architect agreements, consultant deeds, and professional indemnity essentials.',
    items: [
      'AS 4122 principles in plain language',
      'Variations and additional services',
      'Limitation of liability and copyright of drawings',
    ],
  },
  {
    title: 'Delivery & procurement',
    summary:
      'How projects leave the studio: traditional lump sum, design & construct, and novation realities.',
    items: [
      'Tender documentation checklists',
      'Role clarity under D&C novation',
      'Site instructions and RFI hygiene',
    ],
  },
  {
    title: 'Starting or joining a studio',
    summary:
      'Employment vs sole practice vs partnership—and the personal finance side of creative work.',
    items: [
      'Award rates and role expectations',
      'Business registration and GST basics',
      'Building a sustainable pipeline of work',
    ],
  },
]

export const studioGuides = [
  {
    title: 'Portfolio that gets interviews',
    summary:
      'Curate fewer projects, show process honestly, and write captions that reveal thinking—not just renders.',
  },
  {
    title: 'Critique without shrinking',
    summary:
      'Treat reviews as design information. Capture notes, revise tonight, protect sleep and relationships.',
  },
  {
    title: 'Competitions & volunteering',
    summary:
      'Use selected competitions and community projects to expand range without burning out mid-semester.',
  },
  {
    title: 'Networks that matter',
    summary:
      'Australian Institute of Architects events, SONA, EmAGN, alumni nights—show up with curiosity, not desperation.',
  },
  {
    title: 'Money while studying',
    summary:
      'Part-time drafting, café shifts, tutoring: plan summers for practice experience whenever you can.',
  },
  {
    title: 'A sustainable creative pace',
    summary:
      'Architecture rewards patience. Guard your health; long careers beat heroic all-nighters.',
  },
]

export const learningPath = [
  {
    num: '01',
    title: 'Learn to see place',
    summary: 'Read Australian light, land, and dwelling patterns before chasing forms.',
  },
  {
    num: '02',
    title: 'Build craft in studio',
    summary: 'Drawing, modelling, writing, and critique discipline compound every semester.',
  },
  {
    num: '03',
    title: 'Master your tools',
    summary: 'Software is leverage—pair digital fluency with design judgement.',
  },
  {
    num: '04',
    title: 'Enter practice with eyes open',
    summary: 'Understand documentation, clients, and competencies while you are still learning.',
  },
  {
    num: '05',
    title: 'Grow a life and a livelihood',
    summary: 'Business literacy and personal sustainability make long careers possible.',
  },
]
