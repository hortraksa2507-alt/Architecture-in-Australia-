export type HubLink = {
  to: string
  label: string
  meta: string
  summary: string
}

export type LibraryTopic = {
  id: string
  category: string
  title: string
  summary: string
  points: string[]
  readMins: number
  sections: { heading: string; body: string }[]
  resources: { label: string; note: string }[]
}

export type Lesson = {
  id: string
  title: string
  duration: string
  summary: string
  body: string[]
  checklist: string[]
}

export type Course = {
  id: string
  level: string
  title: string
  summary: string
  duration: string
  focus: string
  outcomes: string[]
  lessons: Lesson[]
}

export type SoftwareTool = {
  id: string
  name: string
  category: string
  summary: string
  track: string
  why: string
  steps: { id: string; title: string; detail: string }[]
  tips: string[]
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

export const libraryTopics: LibraryTopic[] = [
  {
    id: 'au-canon',
    category: 'Australia',
    title: 'Australian architectural canon',
    summary:
      'From colonial masonry and Federation to the Sydney School, Glenn Murcutt, and contemporary Pacific practice.',
    readMins: 12,
    points: [
      'Sydney Opera House as civic and technical watershed',
      'Bush architecture and the Australian vernacular',
      'Indigenous design protocols and Country-centred practice',
      'State-by-state planning cultures and heritage overlays',
    ],
    sections: [
      {
        heading: 'How to use this topic in studio',
        body: 'Treat Australian precedent as a working toolkit, not a nostalgia list. When you cite Murcutt, the Opera House, or a Federation verandah, name the climate, construction, and social idea you are borrowing—not just the silhouette.',
      },
      {
        heading: 'Key lineages',
        body: 'Colonial masonry and Georgian planning logics gave way to Federation hybrids, then to modern Australian house cultures: courtyard planning, thin lightweight frames, deep eaves, and indoor–outdoor thresholds. The Sydney School emphasised timber, topography, and informal plan. Later coastal and bush houses refined climate response as identity.',
      },
      {
        heading: 'Country-centred practice',
        body: 'Working with Country requires more than a welcome statement. Study local Indigenous design protocols, engage Traditional Custodians early where projects intersect cultural landscapes, and design for continuity of ecological and cultural relationships—shade, water, story, and gathering—rather than extraction aesthetics.',
      },
      {
        heading: 'Civic markers',
        body: 'The Sydney Opera House is both icon and cautionary project: radical geometry, unfinished coordination drama, and public meaning that outlived procurement pain. Use it to discuss how politics, engineering, and cultural ambition collide on large works.',
      },
    ],
    resources: [
      { label: 'AIA chapter events', note: 'Talks and tours for regional practice context.' },
      { label: 'State heritage registers', note: 'Read listing criteria before proposing alterations.' },
    ],
  },
  {
    id: 'climate',
    category: 'Climate',
    title: 'Climate & comfort across regions',
    summary:
      'Design for tropical north, temperate south, arid interiors, and coastal humidity—not generic sustainability slogans.',
    readMins: 14,
    points: [
      'NatHERS, BASIX, and NCC Section J essentials',
      'Passive solar, cross-ventilation, and thermal mass',
      'Bushfire (BAL), cyclone, and flood-responsive detailing',
      'Embodied carbon and material life-cycle literacy',
    ],
    sections: [
      {
        heading: 'Start with climate logic',
        body: 'Australia is not one climate. Darwin needs shade, humidity management, and cyclone strength. Melbourne mixes cold snaps with heatwaves. Alice Springs demands mass, shading, and sealed dusty envelopes. Sydney coastal zones trade salt air against mild winters. Always open with orientation, breeze, rain, and hazard overlays.',
      },
      {
        heading: 'Performance frameworks',
        body: 'NatHERS star ratings estimate thermal performance; BASIX (NSW) bundles water and energy targets; NCC Section J sets energy efficiency for many building classes. Learn what your project triggers early so form decisions are not reversed after DA lodgement.',
      },
      {
        heading: 'Hazard-aware detailing',
        body: 'BAL ratings change materials and ember sealing. Cyclone regions change fixings and openings. Flood plains change floors, services, and evacuation paths. Draw hazards as design generators—not late consultant stamps.',
      },
    ],
    resources: [
      { label: 'NCC online', note: 'Check the edition cited by your authority.' },
      { label: 'BOM climate data', note: 'Use local normals, not national averages.' },
    ],
  },
  {
    id: 'materials',
    category: 'Making',
    title: 'Materials & construction',
    summary:
      'Timber framing, concrete, brick, steel, and emerging low-carbon assemblies used on Australian sites.',
    readMins: 11,
    points: [
      'AS 1684 timber framing logic at a glance',
      'Concrete systems: slab-on-ground to post-tension',
      'Weatherproofing for harsh UV and salt air',
      'Spec writing: performance vs proprietary',
    ],
    sections: [
      {
        heading: 'Buildability first',
        body: 'Beautiful details fail if trades cannot sequence them. Sketch structure, services, waterproofing, and tolerances before refining appearance. Ask: who installs this, in what order, and how is it maintained?',
      },
      {
        heading: 'Timber and concrete literacy',
        body: 'AS 1684 gives spanning rules for conventional timber housing. Concrete slabs need edge beams, moisture management, and control joints. Lightweight roofs need bracing and condensation control. Learn failure modes: rot, corrosion, thermal bridging, and water ingress.',
      },
      {
        heading: 'Specification craft',
        body: 'Write performance requirements when open competition is needed; name proprietary systems when warranties and tested assemblies matter. Align drawings, schedules, and specs—contradiction is how claims start.',
      },
    ],
    resources: [
      { label: 'NCC Volumes One & Two', note: 'Class-based construction requirements.' },
      { label: 'Manufacturer details', note: 'Verify warranties against local BAL / coastal conditions.' },
    ],
  },
  {
    id: 'theory',
    category: 'Thinking',
    title: 'Theory for studio',
    summary:
      'Critical tools for briefs, diagrams, and reviews—place, tectonics, programme, and representation.',
    readMins: 10,
    points: [
      'Site reading and propositional drawing',
      'Programme: adjacency, sequence, ambiguity',
      'Public vs private thresholds in housing',
      'Writing a clear project narrative',
    ],
    sections: [
      {
        heading: 'Site before form',
        body: 'Map slope, light, noise, access, neighbours, and social pattern. Draw what the site wants before inventing mass. Strong studios can explain a project from three site drawings alone.',
      },
      {
        heading: 'Programme as design material',
        body: 'Adjacencies, sequences, and deliberate ambiguities create architectural life. Housing thresholds between street, garden, and room are where Australian domestic culture becomes spatial.',
      },
      {
        heading: 'Narrative in review',
        body: 'Critiques reward clarity. State problem, strategy, and consequence. Show options rejected. Representation should argue, not decorate.',
      },
    ],
    resources: [
      { label: 'Studio precedents folder', note: 'Annotate why each precedent is relevant.' },
    ],
  },
  {
    id: 'urban',
    category: 'City',
    title: 'Urbanism & housing',
    summary:
      'Apartment typologies, missing-middle housing, precinct structure, and Australian planning instruments.',
    readMins: 13,
    points: [
      'SEPP / planning scheme basics by state',
      'Corridor, courtyard, and tower morphologies',
      'Amenity, solar access, and natural surveillance',
      'Affordable and social housing design drivers',
    ],
    sections: [
      {
        heading: 'Planning as design constraint',
        body: 'Height, FSR/plot ratio, setbacks, heritage overlays, and parking rates reshape mid-rise housing more than moodboards. Learn to diagram planning envelopes early.',
      },
      {
        heading: 'Typology toolkit',
        body: 'Corridor apartments, courtyard blocks, podium-towers, townhouses, and dual occs each trade amenity, privacy, and economics differently. Test cross-ventilation and daylight before refining facades.',
      },
      {
        heading: 'Housing equity',
        body: 'Affordable and social housing demand robust detailing, dignified entries, management access, and community safety—not residual left-over spaces.',
      },
    ],
    resources: [
      { label: 'Local DCP / planning scheme', note: 'Always verify current controls for your site LGA.' },
    ],
  },
  {
    id: 'tech',
    category: 'Detail',
    title: 'Detailing & documentation',
    summary:
      'How drawings communicate intent from sketch design through tender and construction certificate stages.',
    readMins: 12,
    points: [
      'Drawing sets: DA/CDC, BA/CC, IFC packages',
      'Wall, roof, and wet-area junctions that fail most often',
      'Coordination with structure, services, and fire',
      'Specification alignment with schedules',
    ],
    sections: [
      {
        heading: 'Stage the set',
        body: 'Town-planning packages argue for approval. Construction packages instruct builders. Issuing for construction with unresolved coordination creates RFIs and variations. Match drawing depth to gate.',
      },
      {
        heading: 'Where water wins',
        body: 'Roof edges, balcony upstands, window heads, wet-area junctions, and ground edges are where Australian buildings often fail. Detail with maintenance access, falls, and material movement in mind.',
      },
      {
        heading: 'Coordination rhythm',
        body: 'Structure, fire, hydraulics, mechanical, and electrical fight for the same ceiling void and riser. Hold coordination workshops with clash lists, not hope.',
      },
    ],
    resources: [
      { label: 'Office CAD standards', note: 'Layers, naming, and sheet index save entire teams.' },
    ],
  },
]

export const courses: Course[] = [
  {
    id: 'foundations',
    level: 'Year 1–2',
    title: 'Design foundations',
    summary:
      'Seeing, drawing, and making. Spatial literacy, model craft, architectural history literacy, and studio culture.',
    duration: '8 modules',
    focus: 'Representation · site · critique',
    outcomes: [
      'Produce a clear site analysis set',
      'Draw plans/sections that communicate proportion',
      'Defend a design idea in verbal critique',
    ],
    lessons: [
      {
        id: 'foundations-1',
        title: 'Seeing: site observation drill',
        duration: '45 min',
        summary: 'Learn to extract climatic, social, and topographic intelligence from a real place.',
        body: [
          'Spend 40 minutes on a chosen site without headphones. Record sun path, noise, smell, slope, and people movement.',
          'Sketch plan notes and three sectional greedys of landform.',
          'Translate observations into three design constraints and one opportunity.',
        ],
        checklist: [
          'Annotated site photo set (min 6)',
          'Hand plan sketch with north',
          'Three written constraints',
        ],
      },
      {
        id: 'foundations-2',
        title: 'Drawing with purpose',
        duration: '60 min',
        summary: 'Plan, section, and axon as argument—not decoration.',
        body: [
          'Redraw a simple room at 1:50 with furniture and door swings.',
          'Cut a long section showing ground, wall thickness, and roof.',
          'Add one axon that explains entry sequence.',
        ],
        checklist: [
          '1:50 plan with scale bar',
          'Section with groundline',
          'Sequence axon',
        ],
      },
      {
        id: 'foundations-3',
        title: 'Model craft & critique habits',
        duration: '50 min',
        summary: 'Build a working model and harvest critique notes.',
        body: [
          'Make a quick cardboard massing of your site proposal.',
          'Photograph under consistent light for portfolio use.',
          'After critique, rewrite three action items before sleeping on them.',
        ],
        checklist: [
          'Physical massing model',
          'Three model photos',
          'Critique action list',
        ],
      },
      {
        id: 'foundations-4',
        title: 'Precedent with discipline',
        duration: '40 min',
        summary: 'Borrow strategy, not aesthetics alone.',
        body: [
          'Choose two Australian projects and one international project.',
          'Diagram climate response, structure, and public/private organisation for each.',
          'State what you will borrow and what you will reject.',
        ],
        checklist: [
          'Three precedent diagrams',
          'Borrow/reject note',
        ],
      },
    ],
  },
  {
    id: 'building',
    level: 'Year 2–3',
    title: 'Building systems fluency',
    summary:
      'Structure, construction, environmental systems, and how technical decisions appear in your drawings.',
    duration: '10 modules',
    focus: 'Tech · NCC intro · detailing',
    outcomes: [
      'Explain a wall assembly layers',
      'Coordinate a simple structure idea with a plan',
      'Identify NCC triggers for a house addition',
    ],
    lessons: [
      {
        id: 'building-1',
        title: 'Wall assemblies that breathe (and shed water)',
        duration: '55 min',
        summary: 'Layer order for rain, vapour, insulation, and structure.',
        body: [
          'Draw a cavity brick and a lightweight framed wall side by side.',
          'Label weather barrier, insulation, linings, and fixings.',
          'Note coastal or BAL changes that would alter the assembly.',
        ],
        checklist: [
          'Two annotated wall sections',
          'Hazard note added',
        ],
      },
      {
        id: 'building-2',
        title: 'Structure for designers',
        duration: '50 min',
        summary: 'Load paths in houses and small multi-res.',
        body: [
          'Trace gravity loads from roof to ground on a sketch plan.',
          'Identify possible lateral bracing locations.',
          'Coordinate a beam over a large opening with ceiling services space.',
        ],
        checklist: [
          'Load path sketch',
          'Bracing note',
        ],
      },
      {
        id: 'building-3',
        title: 'NCC orientation',
        duration: '45 min',
        summary: 'Find the clauses that affect your project class.',
        body: [
          'Identify building class for a detached house and a Class 2 apartment.',
          'List fire, egress, and energy topics relevant to each.',
          'Write three questions to ask a senior before DA documentation.',
        ],
        checklist: [
          'Class identification note',
          'Three mentor questions',
        ],
      },
    ],
  },
  {
    id: 'studio-advanced',
    level: 'Year 3–M.Arch',
    title: 'Advanced studio strategies',
    summary:
      'Complex briefs, housing and civic programmes, research-led projects, and portfolio-strengthening outcomes.',
    duration: '12 modules',
    focus: 'Typology · research · narrative',
    outcomes: [
      'Frame a research question that drives design',
      'Resolve a multi-unit housing typology option set',
      'Produce a portfolio-ready project narrative',
    ],
    lessons: [
      {
        id: 'studio-advanced-1',
        title: 'Brief into research question',
        duration: '40 min',
        summary: 'Turn soft project hopes into a testable design question.',
        body: [
          'Rewrite the brief as a single sentence problem.',
          'List evidence you will gather (site, demographics, precedent, climate).',
          'Define success criteria for mid-semester review.',
        ],
        checklist: [
          'Research question sentence',
          'Evidence plan',
        ],
      },
      {
        id: 'studio-advanced-2',
        title: 'Typology optioneering',
        duration: '70 min',
        summary: 'Run three housing organisation options against amenity metrics.',
        body: [
          'Draw corridor, courtyard, and hybrid organisations at the same FSR.',
          'Score each for daylight, privacy, circulation efficiency, and street interface.',
          'Pick a winner with a one-page rationale.',
        ],
        checklist: [
          'Three option plans',
          'Score sheet',
          'Rationale page',
        ],
      },
      {
        id: 'studio-advanced-3',
        title: 'Portfolio narrative pass',
        duration: '55 min',
        summary: 'Edit a project down to process + decision + image.',
        body: [
          'Select six images maximum for one project.',
          'Write captions that reveal decisions, not adjectives.',
          'Remove any image that does not progress the argument.',
        ],
        checklist: [
          'Six-image final set',
          'Captions reviewed',
        ],
      },
    ],
  },
  {
    id: 'digital',
    level: 'All levels',
    title: 'Digital craft track',
    summary:
      'A software pathway paired with design method—BIM modelling, parametric thinking, and visualisation discipline.',
    duration: '14 modules',
    focus: 'Revit · Rhino · presentation',
    outcomes: [
      'Produce a basic Revit sheet set',
      'Model clean Rhino geometry for export',
      'Compose a review board with hierarchy',
    ],
    lessons: [
      {
        id: 'digital-1',
        title: 'File hygiene & naming',
        duration: '25 min',
        summary: 'Become someone others can open files after.',
        body: [
          'Adopt a project naming convention: Project_Discipline_Description_Rev.',
          'Separate WIP and Issued folders.',
          'Write a one-page README for your personal standards.',
        ],
        checklist: [
          'Naming convention written',
          'Folder scaffold created',
        ],
      },
      {
        id: 'digital-2',
        title: 'Revit: walls to sheets',
        duration: '90 min',
        summary: 'Create a tiny house model and place views on sheets.',
        body: [
          'Model walls, floors, roof, doors, windows.',
          'Create plan, section, and elevation views.',
          'Place on sheets with title block and a basic door schedule.',
        ],
        checklist: [
          'Model created',
          'Two sheets issued PDF',
        ],
      },
      {
        id: 'digital-3',
        title: 'Presentation hierarchy',
        duration: '50 min',
        summary: 'Boards that lead the eye.',
        body: [
          'Design one board with a hero image, supporting drawings, and a short text block.',
          'Limit typefaces and sizes.',
          'Export PDF and review at 50% zoom for hierarchy.',
        ],
        checklist: [
          'One A1/A0 composition',
          'Hierarchy check notes',
        ],
      },
    ],
  },
  {
    id: 'registration',
    level: 'Graduate',
    title: 'Path to registration',
    summary:
      'AACA NSCA competencies, logbook habits, exam readiness, and supervised practice milestones across states.',
    duration: '6 modules',
    focus: 'Practice · ethics · exams',
    outcomes: [
      'Map experience to NSCA units',
      'Keep a weekly logbook habit',
      'Draft an exam study plan',
    ],
    lessons: [
      {
        id: 'registration-1',
        title: 'NSCA map of your week',
        duration: '35 min',
        summary: 'Tag daily tasks to competency language.',
        body: [
          'List your last five workdays of tasks.',
          'Map each to Design, Documentation, Project Delivery, or Practice Management.',
          'Identify gaps to seek deliberately next month.',
        ],
        checklist: [
          'Task map',
          'Gap list',
        ],
      },
      {
        id: 'registration-2',
        title: 'Logbook that reads like evidence',
        duration: '40 min',
        summary: 'Reflection quality beats hours alone.',
        body: [
          'Write one strong entry: context, your role, decision, outcome, learning.',
          'Avoid diary narration; make judgement visible.',
          'Add Archiva logbook entry from Practice → Logbook.',
        ],
        checklist: [
          'One high-quality entry written',
          'Saved in Archiva logbook',
        ],
      },
      {
        id: 'registration-3',
        title: 'Ethics scenarios drill',
        duration: '45 min',
        summary: 'Practice professional judgement under tension.',
        body: [
          'Work through conflicts of interest, documentation pressure, and safety issues.',
          'State the ethical principle, stakeholders, and action.',
          'Discuss one scenario with a mentor.',
        ],
        checklist: [
          'Three scenarios answered',
          'Mentor discussion booked',
        ],
      },
    ],
  },
  {
    id: 'practice-biz',
    level: 'Early career',
    title: 'Practice & business literacy',
    summary:
      'Contracts, fees, risk, consultant coordination, and client communication for emerging professionals.',
    duration: '7 modules',
    focus: 'AS4122 · fees · delivery',
    outcomes: [
      'Explain staged fee structures',
      'Spot scope creep early',
      'Use the fee estimator tool confidently',
    ],
    lessons: [
      {
        id: 'practice-biz-1',
        title: 'Fee stages in plain English',
        duration: '40 min',
        summary: 'Concept to contract admin as commercial reality.',
        body: [
          'List deliverables for concept, design development, documentation, and CA.',
          'Estimate hours for a small alteration project.',
          'Run the Business fee estimator and compare.',
        ],
        checklist: [
          'Deliverables list',
          'Fee estimator saved screenshot or notes',
        ],
      },
      {
        id: 'practice-biz-2',
        title: 'Scope creep defence',
        duration: '35 min',
        summary: 'Variations without awkwardness.',
        body: [
          'Write a polite variation email template.',
          'Define what is included vs optional in a sample brief.',
          'Identify three common unpaid extras in student jobs / early practice.',
        ],
        checklist: [
          'Variation template',
          'Inclusion/exclusion list',
        ],
      },
    ],
  },
]

export const softwareTools: SoftwareTool[] = [
  {
    id: 'revit',
    name: 'Autodesk Revit',
    category: 'BIM',
    summary:
      'Industry default for documentation in Australian commercial and residential practices. Families, sheets, schedules, and coordination.',
    track: 'Start with walls/floors/roofs → sheets → schedules → worksharing.',
    why: 'Most graduate roles expect basic Revit fluency for plans, sheets, and revisions.',
    steps: [
      {
        id: 'revit-1',
        title: 'Template & levels',
        detail: 'Set project north, levels, and grids. Learn visibility/graphics.',
      },
      {
        id: 'revit-2',
        title: 'Model core building elements',
        detail: 'Walls, floors, roofs, doors, windows with correct type properties.',
      },
      {
        id: 'revit-3',
        title: 'Views to sheets',
        detail: 'Create plan/section/elevation views, place on titleblock sheets, export PDF.',
      },
      {
        id: 'revit-4',
        title: 'Schedules & annotations',
        detail: 'Door schedule, dimensions, tags, sheet index discipline.',
      },
      {
        id: 'revit-5',
        title: 'Revision and coordination basics',
        detail: 'Revision clouds, worksets concept, and consultant link awareness.',
      },
    ],
    tips: [
      'Model thinner than you think early; over-detail kills progress.',
      'Never explode important elements for “quick graphics”.',
    ],
  },
  {
    id: 'autocad',
    name: 'AutoCAD',
    category: '2D drafting',
    summary:
      'Still essential for redlines, details, site overlays, and consultant exchange. Layer discipline and plotting standards matter.',
    track: 'Layers → blocks → xrefs → CTB/STB workflows.',
    why: 'Detailing, site surveys, and consultant sketches still circulate as DWG.',
    steps: [
      {
        id: 'autocad-1',
        title: 'Layer standards',
        detail: 'Create a personal layer set for architecture annotation vs construction.',
      },
      {
        id: 'autocad-2',
        title: 'Blocks and attributes',
        detail: 'Make reusable north points, tags, and elevation markers.',
      },
      {
        id: 'autocad-3',
        title: 'Xrefs',
        detail: 'Attach a base and annotate without destroying source geometry.',
      },
      {
        id: 'autocad-4',
        title: 'Plot styles',
        detail: 'Practice CTB lineweights and PDF batch plotting.',
      },
    ],
    tips: ['Draw at 1:1 model space.', 'Paper space viewports with locked scales.'],
  },
  {
    id: 'rhino',
    name: 'Rhino 3D',
    category: 'Modelling',
    summary:
      'Precision freeform modelling for concept through fabrication. Pair with Illustrator/Photoshop for boards.',
    track: 'Curves → surfaces → solid tooling → layout.',
    why: 'Excellent for complex form, diagrams, and clean exports to visualisation.',
    steps: [
      {
        id: 'rhino-1',
        title: 'Curve discipline',
        detail: 'Build plans with accurate curves and layers before surfaces.',
      },
      {
        id: 'rhino-2',
        title: 'Surfaces and solids',
        detail: 'Loft, extrude, boolean solids cleanly; check naked edges.',
      },
      {
        id: 'rhino-3',
        title: 'Make2D and layouts',
        detail: 'Generate line drawings and compose on layouts for boards.',
      },
      {
        id: 'rhino-4',
        title: 'Export pipeline',
        detail: 'Export to Illustrator / rendering with correct units and layers.',
      },
    ],
    tips: ['Keep construction geometry on separate layers.', 'Name units at project start.'],
  },
  {
    id: 'grasshopper',
    name: 'Grasshopper',
    category: 'Parametric',
    summary:
      'Generative logic for facades, optimisation studies, and rapid optioneering without losing design authorship.',
    track: 'Data trees → attractors → panels → analysis links.',
    why: 'Useful when options multiply—facades, seating arrays, sun studies.',
    steps: [
      {
        id: 'grasshopper-1',
        title: 'Params and data trees',
        detail: 'Understand lists vs trees; use panel and param viewer constantly.',
      },
      {
        id: 'grasshopper-2',
        title: 'Attractor logic',
        detail: 'Build a simple facade opening pattern driven by a point attractor.',
      },
      {
        id: 'grasshopper-3',
        title: 'Bake with intention',
        detail: 'Bake organised layers; never dump unsorted geometry.',
      },
    ],
    tips: ['Parametric ≠ automatic good design.', 'Document definitions for teammates.'],
  },
  {
    id: 'sketchup',
    name: 'SketchUp',
    category: 'Concept',
    summary:
      'Fast massing and client conversation models. Useful early, limited late—know when to graduate to BIM.',
    track: 'Groups → components → scenes → LayOut.',
    why: 'Rapid spatial conversations and early volume studies.',
    steps: [
      {
        id: 'sketchup-1',
        title: 'Groups vs components',
        detail: 'Never raw-stick geometry; componentise repeating elements.',
      },
      {
        id: 'sketchup-2',
        title: 'Scenes and styles',
        detail: 'Create client views with consistent camera heights.',
      },
      {
        id: 'sketchup-3',
        title: 'LayOut sheets',
        detail: 'Place scenes on sheets with dimensions for early reviews.',
      },
    ],
    tips: ['Keep polygon count intentional.', 'Export to Revit/Rhino when documentation starts.'],
  },
  {
    id: 'lumion',
    name: 'Lumion / Enscape',
    category: 'Visualisation',
    summary:
      'Realtime and cinematic visualisation for reviews and competitions. Focus on light, material honesty, and narrative views.',
    track: 'Material sets → cameras → weather → stills/video.',
    why: 'Studios and reviews expect persuasive, truthful images—not plastic gloss.',
    steps: [
      {
        id: 'lumion-1',
        title: 'Material honesty',
        detail: 'Build a base material library matching Australian timber, brick, concrete.',
      },
      {
        id: 'lumion-2',
        title: 'Camera narrative',
        detail: 'Eye-level approach sequence before aerial vanity shots.',
      },
      {
        id: 'lumion-3',
        title: 'Light and weather',
        detail: 'Test morning and overcast states; avoid perpetual golden-hour cheating.',
      },
    ],
    tips: ['Show one imperfect weather state.', 'Prioritise spatial clarity over effects.'],
  },
  {
    id: 'adobe',
    name: 'Adobe suite',
    category: 'Communication',
    summary:
      'Illustrator, InDesign, and Photoshop remain the portfolio and board standard across Australian schools.',
    track: 'Diagram language → board composition → export craft.',
    why: 'Your portfolio is judged as communication craft as much as design.',
    steps: [
      {
        id: 'adobe-1',
        title: 'Diagram language',
        detail: 'Create a consistent line weight and colour system in Illustrator.',
      },
      {
        id: 'adobe-2',
        title: 'InDesign board systems',
        detail: 'Master pages, columns, and paragraph styles for multi-page portfolios.',
      },
      {
        id: 'adobe-3',
        title: 'Photoshop finishing',
        detail: 'Composite section cut textures and people at believable scale.',
      },
    ],
    tips: ['Fewer fonts.', 'Export PDF/X for print submissions.'],
  },
  {
    id: 'bluebeam',
    name: 'Bluebeam / PDF mark-up',
    category: 'Coordination',
    summary:
      'Daily tool for mark-ups, RFIs, and issue tracking once you are in practice.',
    track: 'Tool chest → layer status → measurement → punch lists.',
    why: 'Document conversations happen in PDF long after modelling ends.',
    steps: [
      {
        id: 'bluebeam-1',
        title: 'Tool chest setup',
        detail: 'Custom mark-up tools for dimensions, clouds, and status symbols.',
      },
      {
        id: 'bluebeam-2',
        title: 'Measured take-offs',
        detail: 'Calibrate scale and measure areas for simple checks.',
      },
      {
        id: 'bluebeam-3',
        title: 'Issue tracking',
        detail: 'Export mark-up summaries for meeting actions.',
      },
    ],
    tips: ['Name mark-up authors.', 'Close out clouds intentionally.'],
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

export const competencies = [
  'Design: Project Briefing',
  'Design: Pre-Design',
  'Design: Conceptual Design',
  'Design: Schematic Design',
  'Documentation: Detailed Design',
  'Documentation: Documentation',
  'Project Delivery: Procurement',
  'Project Delivery: Construction Stage',
  'Practice Management: Practice Management',
  'Practice Management: Project Management',
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

export const contractChecklist = [
  { id: 'cc-1', label: 'Scope of services listed by stage' },
  { id: 'cc-2', label: 'Exclusions explicitly named' },
  { id: 'cc-3', label: 'Fee type and payment milestones clear' },
  { id: 'cc-4', label: 'Variation / additional services clause' },
  { id: 'cc-5', label: 'Client decision timeframes stated' },
  { id: 'cc-6', label: 'Copyright and licence of documents defined' },
  { id: 'cc-7', label: 'Liability / PI insurance references checked' },
  { id: 'cc-8', label: 'Termination and suspension terms present' },
  { id: 'cc-9', label: 'Consultant coordination responsibilities clear' },
  { id: 'cc-10', label: 'Governing law / jurisdiction noted' },
]

export const studioGuides = [
  {
    id: 'portfolio',
    title: 'Portfolio that gets interviews',
    summary:
      'Curate fewer projects, show process honestly, and write captions that reveal thinking—not just renders.',
    checks: [
      { id: 'pf-1', label: '3–5 projects max for early applications' },
      { id: 'pf-2', label: 'Process drawings included for each' },
      { id: 'pf-3', label: 'Captions explain decisions' },
      { id: 'pf-4', label: 'Role credited clearly on team projects' },
      { id: 'pf-5', label: 'PDF under reasonable file size' },
    ],
  },
  {
    id: 'critique',
    title: 'Critique without shrinking',
    summary:
      'Treat reviews as design information. Capture notes, revise tonight, protect sleep and relationships.',
    checks: [
      { id: 'cr-1', label: 'Write critique notes same day' },
      { id: 'cr-2', label: 'Translate notes into 3 actions' },
      { id: 'cr-3', label: 'Ask one clarifying question in reviews' },
      { id: 'cr-4', label: 'Protect sleep before major submissions' },
    ],
  },
  {
    id: 'networks',
    title: 'Networks that matter',
    summary:
      'Australian Institute of Architects events, SONA, EmAGN, alumni nights—show up with curiosity, not desperation.',
    checks: [
      { id: 'nw-1', label: 'Attend one event this month' },
      { id: 'nw-2', label: 'Follow up with one new contact' },
      { id: 'nw-3', label: 'Join SONA / EmAGN / student society channel' },
    ],
  },
  {
    id: 'pace',
    title: 'A sustainable creative pace',
    summary:
      'Architecture rewards patience. Guard your health; long careers beat heroic all-nighters.',
    checks: [
      { id: 'pc-1', label: 'Weekly plan with non-studio blocks' },
      { id: 'pc-2', label: 'One full rest half-day reserved' },
      { id: 'pc-3', label: 'Submission buffer of 12+ hours' },
    ],
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

export function getCourse(id: string) {
  return courses.find((c) => c.id === id)
}

export function getLibraryTopic(id: string) {
  return libraryTopics.find((t) => t.id === id)
}

export function getSoftware(id: string) {
  return softwareTools.find((t) => t.id === id)
}

export function allLessons() {
  return courses.flatMap((c) => c.lessons.map((l) => ({ ...l, courseId: c.id, courseTitle: c.title })))
}

export function allSoftwareSteps() {
  return softwareTools.flatMap((t) =>
    t.steps.map((s) => ({ ...s, toolId: t.id, toolName: t.name })),
  )
}

export type SearchHit = {
  type: 'library' | 'course' | 'software' | 'lesson' | 'book' | 'project'
  id: string
  title: string
  blurb: string
  to: string
}

export function searchAll(query: string): SearchHit[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const hits: SearchHit[] = []

  for (const t of libraryTopics) {
    const hay = `${t.title} ${t.summary} ${t.points.join(' ')} ${t.sections.map((s) => s.body).join(' ')}`.toLowerCase()
    if (hay.includes(q)) {
      hits.push({
        type: 'library',
        id: t.id,
        title: t.title,
        blurb: t.summary,
        to: `/library/${t.id}`,
      })
    }
  }

  for (const c of courses) {
    const hay = `${c.title} ${c.summary} ${c.focus}`.toLowerCase()
    if (hay.includes(q)) {
      hits.push({
        type: 'course',
        id: c.id,
        title: c.title,
        blurb: c.summary,
        to: `/courses/${c.id}`,
      })
    }
    for (const l of c.lessons) {
      const lh = `${l.title} ${l.summary} ${l.body.join(' ')}`.toLowerCase()
      if (lh.includes(q)) {
        hits.push({
          type: 'lesson',
          id: l.id,
          title: `${c.title}: ${l.title}`,
          blurb: l.summary,
          to: `/courses/${c.id}/${l.id}`,
        })
      }
    }
  }

  for (const s of softwareTools) {
    const hay = `${s.name} ${s.summary} ${s.category} ${s.why}`.toLowerCase()
    if (hay.includes(q)) {
      hits.push({
        type: 'software',
        id: s.id,
        title: s.name,
        blurb: s.summary,
        to: `/software/${s.id}`,
      })
    }
  }

  // books & projects imported lazily via dynamic strings to avoid circular deps —
  // search extended in searchIndex.ts
  return hits.slice(0, 40)
}

