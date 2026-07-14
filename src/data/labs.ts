export type QuizQuestion = {
  id: string
  prompt: string
  choices: string[]
  answer: number
  explain: string
}

export type CurriculumWeek = {
  week: number
  title: string
  focus: string
  outcomes: string[]
  practice: string[]
  quizId?: string
}

export type SimulatorStep = {
  id: string
  title: string
  instruction: string
  target: string
  success: string
  tip: string
}

export const quizzes: Record<string, QuizQuestion[]> = {
  'revit-basics': [
    {
      id: 'q1',
      prompt: 'Before modelling walls in a shared Australian office model, what should you set first?',
      choices: [
        'Entourage families and RPC people',
        'Levels, grids, project north, and browser organisation',
        'Photo-real materials for every wall type',
        'A rendered axon sheet',
      ],
      answer: 1,
      explain: 'Setup prevents wasted coordination. Levels/grids/north come before modelling.',
    },
    {
      id: 'q2',
      prompt: 'Which statement about documentation depth is most professional?',
      choices: [
        'Model every chair for DA',
        'Match model detail to the documentation gate',
        'Always use in-place geometry for speed',
        'Explode families before issue',
      ],
      answer: 1,
      explain: 'Over-modelling early slows teams and produces false certainty.',
    },
    {
      id: 'q3',
      prompt: 'A door schedule does not match tagged marks. What should you do?',
      choices: [
        'Hide the schedule until print day',
        'Manually type numbers on the PDF',
        'Fix family marks/types so schedule and tags align',
        'Delete tags and write text notes',
      ],
      answer: 2,
      explain: 'Schedules must be live and trustworthy—manual PDF edits create liability.',
    },
  ],
  'climate-design': [
    {
      id: 'c1',
      prompt: 'For much of temperate southern Australia, deep northern eaves primarily help with…',
      choices: [
        'Blocking winter sun completely',
        'Cutting high summer sun while allowing lower winter sun',
        'Stopping all cross-ventilation',
        'Reducing BAL rating automatically',
      ],
      answer: 1,
      explain: 'Eave geometry is a climate instrument—summer rejection, winter acceptance.',
    },
    {
      id: 'c2',
      prompt: 'Which pair is most correct for a tropical north Australian house?',
      choices: [
        'Heavy thermal mass + sealed winter envelope',
        'Shade, airflow, moisture management, cyclone fixings',
        'Basement parking + no overhangs',
        'Only Section J glazing ratios matter',
      ],
      answer: 1,
      explain: 'Humidity, shade, and hazard loads dominate tropical residential strategy.',
    },
    {
      id: 'c3',
      prompt: 'A useful climate diagram set for a housing studio should usually include…',
      choices: [
        'Only a logo and hero render',
        'Summer sun, winter sun, breeze path, and water/drainage logic',
        'Furniture brands only',
        'A single isometric with no notes',
      ],
      answer: 1,
      explain: 'Diagrams prove climatic thinking; renders alone do not.',
    },
  ],
  'viz-craft': [
    {
      id: 'v1',
      prompt: 'What camera height usually communicates space most honestly?',
      choices: [
        'Drone at 80m on every shot',
        'Human eye-level approach and threshold views',
        'Worm’s-eye under the slab only',
        'Orthographic only with no perspective',
      ],
      answer: 1,
      explain: 'Eye-level narrative builds empathy and spatial clarity.',
    },
    {
      id: 'v2',
      prompt: '“Material honesty” in Australian visualisations means…',
      choices: [
        'Plastic grey everywhere for consistency',
        'Locally plausible timber, brick, concrete with correct texture scale',
        'Maximum bloom and lens flare',
        'Hiding structure always',
      ],
      answer: 1,
      explain: 'Believable local materials beat generic CGI gloss.',
    },
  ],
  'practice-docs': [
    {
      id: 'p1',
      prompt: 'Construction sets differ from town-planning sets because they…',
      choices: [
        'Use fewer drawings',
        'Instruct builders with coordinated technical information',
        'Never show dimensions',
        'Avoid wall assemblies',
      ],
      answer: 1,
      explain: 'Planning argues for approval; construction instructs delivery.',
    },
    {
      id: 'p2',
      prompt: 'Where do Australian houses commonly fail first?',
      choices: [
        'Logo placement on sheets',
        'Roof edges, balcony upstands, window heads, wet-area junctions',
        'Font choice in titleblocks',
        'Too many north points',
      ],
      answer: 1,
      explain: 'Water and junction detailing decide durability.',
    },
  ],
}

export const softwareCurricula: Record<
  string,
  { toolId: string; title: string; weeks: CurriculumWeek[] }
> = {
  revit: {
    toolId: 'revit',
    title: '8-week Revit practice path',
    weeks: [
      {
        week: 1,
        title: 'Template discipline',
        focus: 'Levels, grids, browser, naming',
        outcomes: ['Open a clean starter model', 'Create sheet stubs'],
        practice: ['Rebuild levels for a 2-storey house', 'Make a cover + plan sheet'],
        quizId: 'revit-basics',
      },
      {
        week: 2,
        title: 'Walls that document',
        focus: 'Types, joins, cores',
        outcomes: ['Create cavity and lightweight wall types'],
        practice: ['Cut a wall section and label layers'],
      },
      {
        week: 3,
        title: 'Openings & schedules',
        focus: 'Doors/windows/tags',
        outcomes: ['Tag consistently', 'Generate a live door schedule'],
        practice: ['Fix a broken schedule/tag mismatch'],
        quizId: 'revit-basics',
      },
      {
        week: 4,
        title: 'Roofs & floors',
        focus: 'Slopes, edges, join logic',
        outcomes: ['Build a roof with overhang'],
        practice: ['Detail an eave in section'],
      },
      {
        week: 5,
        title: 'Views that argue',
        focus: 'Crop, annotation, presentation views',
        outcomes: ['Compose a reviewable plan/section pair'],
        practice: ['Export a 2-sheet PDF pack'],
      },
      {
        week: 6,
        title: 'Coordination habit',
        focus: 'Links, visibility, clash awareness',
        outcomes: ['Link a consultant DWG/IFC safely'],
        practice: ['Write a 5-item clash checklist'],
      },
      {
        week: 7,
        title: 'Revision literacy',
        focus: 'Clouds, issue notes, indices',
        outcomes: ['Issue a revised window change'],
        practice: ['Draft an issue email'],
      },
      {
        week: 8,
        title: 'Office simulation',
        focus: 'Speed + clarity under review',
        outcomes: ['Produce a mini DA-flavoured package'],
        practice: ['Peer-review another student’s set'],
        quizId: 'practice-docs',
      },
    ],
  },
  rhino: {
    toolId: 'rhino',
    title: '6-week Rhino → viz path',
    weeks: [
      {
        week: 1,
        title: 'Units & layers',
        focus: 'Hygiene before form',
        outcomes: ['Set units and layer taxonomy'],
        practice: ['Rebuild a campus massing with labelled layers'],
      },
      {
        week: 2,
        title: 'Solid modelling',
        focus: 'Booleans without chaos',
        outcomes: ['Closed solids with checked naked edges'],
        practice: ['Courtyard house massing'],
        quizId: 'viz-craft',
      },
      {
        week: 3,
        title: 'Make2D craft',
        focus: 'Line drawings for boards',
        outcomes: ['Clean axon + plan extracts'],
        practice: ['Illustrator lineweight pass'],
      },
      {
        week: 4,
        title: 'Export pipeline',
        focus: 'To Enscape/Lumion/Twinmotion',
        outcomes: ['Export organised FBX/OBJ'],
        practice: ['Material stub list for AU house'],
      },
      {
        week: 5,
        title: 'Camera narrative',
        focus: 'Approach → threshold → room',
        outcomes: ['Three-shot sequence'],
        practice: ['Eye-level only draft renders'],
        quizId: 'viz-craft',
      },
      {
        week: 6,
        title: 'Competition pack',
        focus: 'Boards that argue',
        outcomes: ['One A1 narrative board'],
        practice: ['Caption decisions, not adjectives'],
      },
    ],
  },
}

export const simulatorTracks: Record<
  string,
  { title: string; software: string; steps: SimulatorStep[] }
> = {
  revit: {
    title: 'Revit viewport trainer',
    software: 'Revit-style',
    steps: [
      {
        id: 'sim-r1',
        title: 'Set active level',
        instruction: 'Click the Level datum “GF” to make Ground Floor active before modelling.',
        target: 'level-gf',
        success: 'Ground Floor is active. Modelling will host correctly.',
        tip: 'Wrong active level is a classic beginner disaster.',
      },
      {
        id: 'sim-r2',
        title: 'Place an exterior wall',
        instruction: 'Select Wall tool, then click the canvas grid to place a perimeter wall run.',
        target: 'tool-wall',
        success: 'Wall tool armed—now click the plan to place.',
        tip: 'In offices, wall types carry fire and acoustic data. Names matter.',
      },
      {
        id: 'sim-r3',
        title: 'Open a section',
        instruction: 'Create a section marker across the plan to reveal assembly depth.',
        target: 'tool-section',
        success: 'Section view ready—assemblies become visible and reviewable.',
        tip: 'If it looks wrong in section, it is wrong.',
      },
      {
        id: 'sim-r4',
        title: 'Place on sheet',
        instruction: 'Drag the plan view onto Sheet A201 to practice issue layout.',
        target: 'sheet-drop',
        success: 'View placed on sheet. Titleblock discipline starts here.',
        tip: 'Sheets are contractual instruments, not scrapbooks.',
      },
      {
        id: 'sim-r5',
        title: 'Tag a door',
        instruction: 'Use Tag tool on the door opening so schedules can stay live.',
        target: 'tool-tag',
        success: 'Door tagged. Schedule integrity depends on this habit.',
        tip: 'Untagged = untrusted.',
      },
    ],
  },
  rhino: {
    title: 'Rhino modelling trainer',
    software: 'Rhino-style',
    steps: [
      {
        id: 'sim-h1',
        title: 'Set layer: Massing',
        instruction: 'Activate the Massing layer before drawing volume.',
        target: 'layer-massing',
        success: 'Massing layer active—geometry will stay organised.',
        tip: 'Layers are future coordination.',
      },
      {
        id: 'sim-h2',
        title: 'Draw base rectangle',
        instruction: 'Create a closed plan rectangle for the primary volume.',
        target: 'tool-rect',
        success: 'Plan curve set. Extrude next.',
        tip: 'Closed curves prevent naked-edge nightmares.',
      },
      {
        id: 'sim-h3',
        title: 'Extrude solid',
        instruction: 'Extrude the plan to a 3m storey solid.',
        target: 'tool-extrude',
        success: 'Solid mass created.',
        tip: 'Check Cap=Yes mentally every time.',
      },
      {
        id: 'sim-h4',
        title: 'Boolean courtyard',
        instruction: 'Subtract an inner court volume from the mass.',
        target: 'tool-boolean',
        success: 'Courtyard cut. Inspect edges.',
        tip: 'Bad booleans ship as broken viz.',
      },
      {
        id: 'sim-h5',
        title: 'Make2D axon',
        instruction: 'Generate a Make2D-style axon preview for boardwork.',
        target: 'tool-make2d',
        success: 'Linework preview created for Illustrator polish.',
        tip: 'Hierarchy > hatching fireworks.',
      },
    ],
  },
}

export const wallAssemblies = [
  {
    id: 'cavity-brick',
    name: 'Cavity brick veneer',
    climate: 'Temperate / coastal',
    layers: [
      { id: 'l1', name: 'Paint / lining', thickness: 10, role: 'Finish' },
      { id: 'l2', name: 'Plasterboard', thickness: 10, role: 'Lining' },
      { id: 'l3', name: 'Timber stud + batts', thickness: 90, role: 'Structure / thermal' },
      { id: 'l4', name: 'Rigid air barrier', thickness: 3, role: 'Air / weather' },
      { id: 'l5', name: 'Cavity', thickness: 40, role: 'Drainage' },
      { id: 'l6', name: 'Brick veneer', thickness: 110, role: 'Cladding' },
    ],
    notes: 'Classic Australian housing envelope. Mind weep holes, flashings, and cavity ties.',
  },
  {
    id: 'lightweight',
    name: 'Lightweight framed + cladding',
    climate: 'Varied — confirm BAL',
    layers: [
      { id: 'l1', name: 'Internal lining', thickness: 10, role: 'Finish' },
      { id: 'l2', name: 'Vapour control (as required)', thickness: 1, role: 'Moisture' },
      { id: 'l3', name: 'Stud + insulation', thickness: 90, role: 'Structure / thermal' },
      { id: 'l4', name: 'Rigid sheathing', thickness: 6, role: 'Rack / barrier' },
      { id: 'l5', name: 'Rainscreen cavity', thickness: 20, role: 'Drainage' },
      { id: 'l6', name: 'Metal / timber cladding', thickness: 12, role: 'Cladding' },
    ],
    notes: 'Fast and light—detail junctions meticulously against driving rain and bushfire ember attack.',
  },
  {
    id: 'reverse-brick',
    name: 'Reverse brick veneer / mass inside',
    climate: 'Hot diurnal swing',
    layers: [
      { id: 'l1', name: 'Exterior cladding / render', thickness: 12, role: 'Weather' },
      { id: 'l2', name: 'Insulation + frame', thickness: 90, role: 'Thermal' },
      { id: 'l3', name: 'Brick internal leaf', thickness: 110, role: 'Mass / finish' },
    ],
    notes: 'Puts mass inside the insulation line for temperate/inland comfort strategies.',
  },
]

export const climatePresets = [
  {
    id: 'melbourne',
    name: 'Melbourne',
    altitude: 28,
    azimuth: 20,
    eaves: 0.6,
    summary: 'Cool winters + heatwaves. Favour winter northern sun and summer cut-off.',
  },
  {
    id: 'sydney',
    name: 'Sydney coastal',
    altitude: 40,
    azimuth: 25,
    eaves: 0.45,
    summary: 'Mild but humid episodes and salt air. Balance shade, breeze, and durability.',
  },
  {
    id: 'darwin',
    name: 'Darwin tropical',
    altitude: 62,
    azimuth: 10,
    eaves: 1.1,
    summary: 'High sun, humidity, cyclone loads. Deep shade and airflow dominate.',
  },
  {
    id: 'alice',
    name: 'Alice Springs arid',
    altitude: 55,
    azimuth: -15,
    eaves: 0.9,
    summary: 'Huge diurnal swings. Shade + mass + sealing against dust.',
  },
]

export const typologies = [
  { id: 'courtyard', name: 'Courtyard house', wings: 1 },
  { id: 'skinny', name: 'Skinny terrace', wings: 0 },
  { id: 'pavilion', name: 'Pavilion + roof plane', wings: 2 },
]
