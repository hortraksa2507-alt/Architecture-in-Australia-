export type BookChapter = {
  id: string
  title: string
  minutes: number
  pages: { heading: string; body: string[]; callout?: string }[]
  exercise?: { title: string; steps: string[] }
}

export type LearningBook = {
  id: string
  title: string
  subtitle: string
  category: 'Software' | 'Visualisation' | 'Practice'
  coverAccent: string
  blurb: string
  audience: string
  chapters: BookChapter[]
}

export const learningBooks: LearningBook[] = [
  {
    id: 'revit-field-guide',
    title: 'Revit Field Guide for Australian Studios',
    subtitle: 'From blank model to issued sheets',
    category: 'Software',
    coverAccent: '#a84b38',
    blurb:
      'A practical book for students entering real offices—levels, views, sheets, schedules, revisions, and coordination habits that seniors expect.',
    audience: 'Year 2 → graduates',
    chapters: [
      {
        id: 'revit-ch1',
        title: 'Studio-ready setup',
        minutes: 12,
        pages: [
          {
            heading: 'Why setup is the first deliverable',
            body: [
              'In practice, a messy model burns coordination time. Before walls, set levels, grids, true north vs project north, and a clean browser organisation.',
              'Create a WIP view folder and an Issued view folder. Never issue views from a sandbox sheet.',
            ],
            callout: 'Rule: if a teammate cannot find a sheet in 20 seconds, the model fails.',
          },
          {
            heading: 'Levels and grids that survive design change',
            body: [
              'Name levels after storeys (GF, L1) not arbitrary heights. Lock grids early and dimension from structural logic.',
              'For alterations projects, host existing and new categories carefully—or separate phases with clear filters.',
            ],
          },
        ],
        exercise: {
          title: 'Build a 4-level template shell',
          steps: [
            'Create GF, L1, L2, Roof levels with realistic Australian storey heights',
            'Add primary and secondary grids',
            'Create a cover sheet + plan sheet with titleblock placeholders',
          ],
        },
      },
      {
        id: 'revit-ch2',
        title: 'Modelling for documentation',
        minutes: 18,
        pages: [
          {
            heading: 'Model the drawing, not a video game',
            body: [
              'Match model depth to documentation stage. DA sets do not need every skirt tile.',
              'Prefer system families for walls/floors/roofs. Use loaded families for doors/windows with type marks your office understands.',
            ],
          },
          {
            heading: 'Assemblies that read in section',
            body: [
              'Build wall types with core + finish layers. Wrong core location creates false dimensions.',
              'Check joins at corners before printing. Clean joins signal care.',
            ],
            callout: 'If the section lies, the builder will invent the truth—and send a variation.',
          },
        ],
        exercise: {
          title: 'Document a cabinette house wing',
          steps: [
            'Model exterior walls, slab, roof, and two openings',
            'Cut a building section through the wet area',
            'Export a single PDF sheet for review',
          ],
        },
      },
      {
        id: 'revit-ch3',
        title: 'Sheets, schedules, revisions',
        minutes: 15,
        pages: [
          {
            heading: 'Issuing like a professional',
            body: [
              'Sheet naming, revision clouds, and issue dates are part of design service—not admin trivia.',
              'Build a door schedule that mirrors tagged marks. Broken schedules destroy trust in documentation.',
            ],
          },
          {
            heading: 'Australian practice notes',
            body: [
              'Expect consultant IFC / DWG exchange. Protect your model from uncontrolled imports.',
              'Learn your office PDF naming convention on day one. Consistency is culture.',
            ],
          },
        ],
        exercise: {
          title: 'Issue simulation',
          steps: [
            'Add a revision and cloud a changed window',
            'Update sheet index',
            'Write a three-line issue email describing the change',
          ],
        },
      },
    ],
  },
  {
    id: 'rhino-viz-craft',
    title: 'Rhino to Visualisation Craft',
    subtitle: 'Clean geometry → persuasive images',
    category: 'Visualisation',
    coverAccent: '#243d32',
    blurb:
      'Learn the pipeline studios use: precise Rhino massing, Make2D discipline, material honesty, and review-ready boards.',
    audience: 'Studio years + portfolio builders',
    chapters: [
      {
        id: 'rhino-ch1',
        title: 'Geometry hygiene',
        minutes: 14,
        pages: [
          {
            heading: 'Layers before beauty',
            body: [
              'Separate site, massing, structure, glazing, and entourage. Future-you will thank present-you.',
              'Set units to millimetres or metres at the start—never mid-project.',
            ],
          },
          {
            heading: 'Naked edges and bad booleans',
            body: [
              'Closed solids export cleaner to Enscape/Lumion/Twinmotion. Check naked edges constantly.',
              'Prefer controlled surface builds over random boolean piles.',
            ],
            callout: 'Unclean geometry is the number-one reason student viz looks “off”.',
          },
        ],
        exercise: {
          title: 'Courtyard house massing',
          steps: [
            'Model a simple Australian courtyard house with 3 massing volumes',
            'Keep each material category on its own layer',
            'Export a clean OBJ/FBX for visualisation',
          ],
        },
      },
      {
        id: 'rhino-ch2',
        title: 'Drawing extraction',
        minutes: 12,
        pages: [
          {
            heading: 'Make2D with intention',
            body: [
              'Generate plan and axon linework for Illustrator boards. Remove noise, keep structure.',
              'Lineweight hierarchy sells spatial ideas more than textures.',
            ],
          },
        ],
        exercise: {
          title: 'Board-ready axon',
          steps: [
            'Create one isometric Make2D',
            'Import to Illustrator and assign three lineweights',
            'Add a one-sentence argument caption',
          ],
        },
      },
      {
        id: 'rhino-ch3',
        title: 'Light, material, narrative cameras',
        minutes: 16,
        pages: [
          {
            heading: 'Australian light is a material',
            body: [
              'Harsh midday sun, long winter shadows, coastal haze—choose a climate-true lighting story.',
              'Place cameras at human eye height first. Aerial vanity is dessert, not dinner.',
            ],
            callout: 'One honest overcast render often beats three golden-hour fantasies.',
          },
          {
            heading: 'Material honesty',
            body: [
              'Concrete, timber, brick, and corrugated steel should feel local. Avoid plastic grey everywhere.',
              'Scale textures correctly—wrong brick size kills immersion.',
            ],
          },
        ],
        exercise: {
          title: 'Three-shot narrative',
          steps: [
            'Approach · threshold · interior shot sequence',
            'Match materials to an Australian reference project',
            'Export stills and caption the spatial idea',
          ],
        },
      },
    ],
  },
  {
    id: 'portfolio-visual-book',
    title: 'Portfolio & Project Visual Book',
    subtitle: 'Make studio work read as professional',
    category: 'Practice',
    coverAccent: '#9a7b4f',
    blurb:
      'A field manual for packaging projects: process drawings, decision captions, boards, and a competition-ready visual narrative.',
    audience: 'Internship & graduate applications',
    chapters: [
      {
        id: 'port-ch1',
        title: 'Curate ruthlessly',
        minutes: 10,
        pages: [
          {
            heading: 'Fewer projects, clearer thinking',
            body: [
              'Three strong projects beat eight decorative ones. Show site response, organisation, and a key detail.',
              'Credit collaborators. Honesty is professional.',
            ],
          },
        ],
        exercise: {
          title: 'Kill list',
          steps: [
            'List all projects',
            'Cut to three with the strongest decisions',
            'Write one thesis sentence per project',
          ],
        },
      },
      {
        id: 'port-ch2',
        title: 'Visual storytelling boards',
        minutes: 14,
        pages: [
          {
            heading: 'Hierarchy is kindness',
            body: [
              'One hero image, supporting drawings, short text. White space is structure.',
              'Captions explain decisions: climate move, structure move, public/private move.',
            ],
            callout: 'If removing text changes nothing, the drawing was never arguing.',
          },
        ],
        exercise: {
          title: 'One A1 narrative board',
          steps: [
            'Compose hero + plan + section + detail',
            'Limit to two type sizes',
            'Export PDF and review at 50% zoom',
          ],
        },
      },
    ],
  },
  {
    id: 'aus-house-docs',
    title: 'Documenting an Australian House',
    subtitle: 'DA to builder-ready thinking',
    category: 'Practice',
    coverAccent: '#3a5c4a',
    blurb:
      'Walk a typical residential pathway: planning constraints, climate response diagrams, wall assemblies, and drawing set logic used in Australian practice.',
    audience: 'Students in housing studios',
    chapters: [
      {
        id: 'house-ch1',
        title: 'Brief and constraints',
        minutes: 11,
        pages: [
          {
            heading: 'Start with controls, not furniture',
            body: [
              'Setbacks, height, overshadowing, heritage overlays, BAL, and flood risk shape the plan before your favourite window does.',
              'Draw the planning envelope first. Design inventively inside reality.',
            ],
          },
        ],
        exercise: {
          title: 'Envelope sketch',
          steps: [
            'Pick a real suburb and research key controls',
            'Draw a plan envelope',
            'Note three non-negotiable constraints',
          ],
        },
      },
      {
        id: 'house-ch2',
        title: 'Climate diagrams that work',
        minutes: 12,
        pages: [
          {
            heading: 'Diagrams as proof',
            body: [
              'Show summer sun cut-off, winter penetration, cross-ventilation path, and rain management.',
              'Pair diagrams with a roof and eave strategy.',
            ],
          },
        ],
        exercise: {
          title: 'Four climate diagrams',
          steps: [
            'Summer sun',
            'Winter sun',
            'Breeze path',
            'Water path / drainage concept',
          ],
        },
      },
      {
        id: 'house-ch3',
        title: 'Assembly & set thinking',
        minutes: 13,
        pages: [
          {
            heading: 'Drawings instruct builders',
            body: [
              'Wall assemblies, roof edges, and wet-area junctions belong early in development—not after pretty perspectives.',
              'List the sheets a modest alterations package actually needs.',
            ],
          },
        ],
        exercise: {
          title: 'Mini drawing index',
          steps: [
            'Write a sheet list for a two-storey addition',
            'Mark which sheets appear at DA vs construction',
            'Identify one detail most likely to leak',
          ],
        },
      },
    ],
  },
]

export function getBook(id: string) {
  return learningBooks.find((b) => b.id === id)
}

export const realWorldProjects = [
  {
    id: 'dual-occ',
    title: 'Dual occupancy on a suburban lot',
    level: 'Year 2–3',
    duration: '3 weeks',
    outcome: 'Planning envelope · unit planning · neighbour amenity set',
    brief:
      'Design a dual occupancy that maintains street character, protects neighbour solar access, and creates private outdoor rooms for both dwellings.',
    deliverables: [
      'Site analysis with controls summary',
      'Two planning options scored against amenity',
      'Final plans/sections 1:100',
      'One climate response board',
    ],
    software: ['SketchUp or Rhino massing', 'Revit or AutoCAD docs', 'Illustrator board'],
    tips: [
      'Start with driveways and services trenches—they kill plans late.',
      'Demonstrate overshadowing and overlooking mitigation.',
    ],
  },
  {
    id: 'shop-top',
    title: 'Shop-top housing on a high street',
    level: 'Year 3–M.Arch',
    duration: '4 weeks',
    outcome: 'Mixed-use section · street interface · apartment typology',
    brief:
      'Propose a fine-grain mixed-use building with active ground floor and dwellings above that can actually be ventilated and furnished.',
    deliverables: [
      'Street elevation study',
      'Typical dwelling plan with furniture',
      'Long section through shop + unit',
      'Material and construction scrapbook',
    ],
    software: ['Rhino or Revit', 'Enscape/Lumion stills', 'InDesign package'],
    tips: [
      'Show bin stores, bike parking, and fire egress early.',
      'Avoid pure corridor cemeteries—add light and social space.',
    ],
  },
  {
    id: 'studio-fitout',
    title: 'Graduate role sprint: documentation tidy-up',
    level: 'Graduate',
    duration: '1 week',
    outcome: 'Office-ready drawing set hygiene',
    brief:
      'Take a messy student DA set and convert it into a coordinated, annotated package with schedule, sheet index, and revision note.',
    deliverables: [
      'Cleaned titleblock package',
      'Door/window schedule',
      'Redline response register',
      'PDF issue pack',
    ],
    software: ['Revit or AutoCAD', 'Bluebeam/PDF mark-up'],
    tips: [
      'Work as if a builder will price from your drawings tomorrow.',
      'Write an issue email a senior would send.',
    ],
  },
  {
    id: 'viz-competition',
    title: 'Competition visualisation sprint',
    level: 'All levels',
    duration: '10 days',
    outcome: 'Narrative image sequence + diagram board',
    brief:
      'Produce a competition-style visual story for an Australian climate house: approach, threshold, living, and garden as a continuous argument.',
    deliverables: [
      'Four hero stills with consistent language',
      'One axon or exploded diagram',
      'Material key',
      '200-word design statement',
    ],
    software: ['Rhino', 'Lumion/Enscape/Twinmotion', 'Photoshop/Illustrator'],
    tips: [
      'Pick one weather and stick to it.',
      'Use people and furniture at believable Australian residential scale.',
    ],
  },
]
