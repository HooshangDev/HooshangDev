export interface Project {
  title: string
  engine: string
  description: string
  image?: string
  screenshots: string[]
  video?: string
  highlights?: string[]
  cover?: {
    eyebrow: string
    title: string
    detail: string
    accent: string
  }
}

export const projects: Project[] = [
  {
    title: 'Farhangian VR Science Lab',
    engine: 'Unity / XR Interaction Toolkit',
    description: 'A guided VR laboratory experience built around authored, repeatable science tasks. I developed the chemistry workflows for TLC, caffeine, and permanganate experiments, then connected the scene interactions to reusable task data, feedback, animation, and completion logic.',
    screenshots: [],
    highlights: [
      'Chemistry workflows for TLC, caffeine, and permanganate experiments',
      'Reusable task and sub-task authoring with ScriptableObjects',
      'Custom socket interactions, placement hints, and completion callbacks',
      'Failure-aware interactions for spills, breakage, and wrong grabs',
      'Animated lab equipment and guided feedback states',
    ],
    cover: {
      eyebrow: 'VR TRAINING SYSTEMS',
      title: 'Science Lab / Guided Tasks',
      detail: 'Chemistry workflows · XR interactions · feedback systems',
      accent: '#22d3ee',
    },
  },
  {
    title: 'Interactive Physics Experiments',
    engine: 'Unity / C#',
    description: 'A collection of interactive physics modules for the Farhangian lab, including F=ma carts, spring-impact experiments, and pendulum measurement. I implemented the experiment logic, tunable mass and motion systems, measurement checkpoints, and VR controls for changing pendulum length and release conditions.',
    screenshots: [],
    highlights: [
      'F=ma cart and spring-impact experiment controllers',
      'Runtime mass changes with calculated velocity, momentum, and energy results',
      'Pendulum simulation with damping and configurable gravity',
      'VR length dragging with constrained snapping and completion events',
      'Checkpoint timing, velocity sampling, and before/after impact capture',
    ],
    cover: {
      eyebrow: 'PHYSICS / MEASUREMENT',
      title: 'Motion Lab / Measured Systems',
      detail: 'F=ma · pendulum · velocity and impact analysis',
      accent: '#f59e0b',
    },
  },
  {
    title: 'XR Task & Assessment Framework',
    engine: 'Unity / C#',
    description: 'Reusable gameplay infrastructure for turning VR interactions into assessable training flows. I expanded the task manager with timer and measurement actions, per-action configuration, custom done-signal bindings, automatic scene task generation, and inspector-configurable interaction events.',
    screenshots: [],
    highlights: [
      'Auto-generated task and sub-task wiring for complex scenes',
      'Timer, time-check, and value-measure action types',
      'Inspector-configurable per-action tracking and completion behavior',
      'Custom UnityEvent and callback bindings for scene systems',
      'Reusable shake detection and socket activation lifecycle events',
    ],
    cover: {
      eyebrow: 'GAMEPLAY INFRASTRUCTURE',
      title: 'Task Manager / Assessment Layer',
      detail: 'Authoring tools · runtime callbacks · measurable progress',
      accent: '#a78bfa',
    },
  },
  {
    title: 'RogueRider(Developed Solo)',
    engine: 'Unreal Engine',
    description: 'RogueLike Multiplayer racing game with random Road generation system,players have abilities like teleport,speed,rotation and the main goal is to reach the finish point before other players. shop system and cosmetic items are also available. race-pass system and leader board is also implemented. the database used is SQLite Locally on the dedicated server machine. custom physics replication was developed to keep all players updated.',
    image: '/images/projects/rr_garage.jpg',
    screenshots: [
      '/images/projects/rr_screenshot1.jpg',
      '/images/projects/rr_screenshot2.jpg',
      '/images/projects/rr_screenshot3.jpg',
      '/images/projects/main-menu-rr-s.jpg',
      '/images/projects/map۲-rr-s.jpg'
    ],
    video: '/videos/projects/rr_video.mp4'
  },
  {
    title: 'EverRide(Developed Solo)',
    engine: 'Unreal Engine',
    description: 'Multiplayer racing game with spline movement and custom perfect replication systems.\
    Custom physics for cars movement and drifting along the road,\
    3 different abilities to challenge other players, one that switch places, one that slows players on hit, one that boosts the player under some conditions,and we had a shield ability\
    Database used for this game was also Mysql on the dedicated server machine,and the server itself was Unreal engines dedicated server\
    shop,leaderboard,cosmetics,customization,custom IAP plugin for a localized market(Bazaar),On-Demand Asset Download & Data Management : unreal engine .pac files\
    ',
    image: '/images/projects/everride2.jpg',
    screenshots: [
      '/images/projects/everride.jpg',
      '/images/projects/everride2.jpg',
      '/images/projects/everride3.jpg'
    ],
    video: '/videos/projects/everride_vid.mp4'
  },
  {
    title: 'Kinetic FPS',
    engine: 'Unreal Engine',
    description: 'Competitive multiplayer FPS with objective gameplay systems.',
    image: '/images/projects/kinetic.jpg',
    screenshots: [
      '/images/projects/kinetic.jpg',
      '/images/projects/kinetic.jpg',
      '/images/projects/kinetic.jpg'
    ],
    video: '/videos/projects/kinetic.mp4'
  },
  {
    title: 'Detective Mehrdad',
    engine: 'Unity',
    description: 'Live ops hidden-object adventure game with backend architecture.\
    developed a custom modular Hidden Object game that is used for future events that i developed ,and later will replace the main Hidden Object system(that was not well written and needs replacement)\
    developed a remote configable daily reward system with a slot machine for rewards\
    avatar and character customization system were fully developed and migrated server logics and database with the new systems\
    created a modular sound manager system that used Addressable On-Demand Assed Download and handling sound loops anywhere in the game',
    image: '/images/projects/detective-mehrdad.jpg',
    screenshots: [
      '/images/projects/detective-mehrdad.jpg',
      '/images/projects/detective0.png',
      '/images/projects/detective1.png',
      '/images/projects/detective2.png',
      '/images/projects/detective3.png',
      '/images/projects/detective4.png',
      '/images/projects/detective5.png'
    ],
    video: '/videos/projects/detective.mp4'
  },
  
  {
    title: 'Kalleh Halloumi Cheese ,AdverGame',
    engine: 'Unity',
    description: 'A virtual reality marketing game developed for Kalleh Foods to promote their Halloumi Cheese product through an interactive cooking experience. Players enter a fully immersive VR kitchen where they prepare and cook Halloumi Cheese using realistic interactions, including grabbing, cutting, grilling, and serving ingredients.The project focused on delivering intuitive VR gameplay, realistic object interactions, and an engaging user experience that highlights the products features in a memorable way. I was responsible for implementing the gameplay systems, VR interactions, object physics, user interface integration, and overall technical development of the experience.',
    image: '/images/projects/kalleh0.png',
    screenshots: [
      '/images/projects/kalleh0.png',
      '/images/projects/kalleh1.png',
      '/images/projects/kalleh2.png'
    ],
    video: '/videos/projects/vr_kalleh.mp4'
  },
  {
    title: 'VR Demo Game(one week project)',
    engine: 'Unity',
    description: 'VR Spaceship Prototype (2026)\
Built within one week.\
• Modular tutorial framework\
• Tutorial step completion/failure system\
• Interactive VR object manipulation\
• Floating instruction panels\
• Head-tracked UI system\
• Draggable tutorial widgets\
• Bezier-guided object indicators\
• Sound manager singleton architecture\
• Physics-based interaction systems\
• Gameplay: Install spaceship battery\
• Gameplay: Tighten mechanical components using air wrench\
• Gameplay: Launch spaceship sequence\
• Planned Features: Spaceship piloting\
• Planned Features: Battery management systems\
• Planned Features: Recharge mechanics\
',
    image: '/images/projects/rick0.png',
    screenshots: [
      '/images/projects/rick0.png',
      '/images/projects/rick1.png',
      '/images/projects/rick3.png',
      '/images/projects/rick4.png',
      '/images/projects/rick5.png',
    ],
    video: '/videos/projects/VR_test.mp4'
  }
  ,
  {
    title: 'Multiplayer Snake & Ladder',
    engine: 'Unity',
    description: 'An online multiplayer board game featuring matchmaking, real-time chat, multiple game sessions, and in-app purchases. Developed a server-authoritative dice system where dice outcomes are generated securely on the server and reproduced through realistic client-side physics simulation, ensuring both fair gameplay and visually authentic dice rolls. Implemented pawn movement systems, networking integration, and core gameplay mechanics using Unity and C#.',
    image: '/images/projects/dice_cool.jpg',
    screenshots: [
      
    ],
    video: '/videos/projects/snakeladder.mp4'
  }

]
