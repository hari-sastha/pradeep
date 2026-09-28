// Seed Demo Data for Elite XI Football Academy
import { ACADEMY_CONFIG } from '../config/academyConfig';

export const INITIAL_DEMO_USER = {
  id: "user-demo-001",
  fullName: "Marcus Vance",
  email: "demo@elitexi.com",
  password: "demo123", // For prototype auth checking
  phone: "+44 7700 900123",
  dateOfBirth: "2004-06-18",
  position: "Attacking Midfielder",
  experienceLevel: "Advanced",
  emergencyContact: "Sarah Vance (+44 7700 900456)",
  joinedDate: "2024-01-15",
  assignedPlanId: "plan-development",
  assignedMentorId: "coach-001",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
  bio: "Passionate playmaker focused on spatial awareness, key passes, and elite match fitness.",
};

export const INITIAL_MENTORS = [
  {
    id: "coach-001",
    name: "Arjun Kumar",
    title: "Head of Attacking & Finishing",
    specialization: "Attacking & Finishing",
    experience: "8 Years",
    license: "UEFA A License",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    email: "arjun.kumar@elitexi.com",
    phone: "+44 7700 900881",
    philosophy: "Offensive football requires instinctive movement, rapid decision making under pressure, and ruthless composure in front of goal.",
    achievements: ["Former Premier League Academy Scout", "Coached 15+ Players to Professional Contracts", "Tactical Columnist for Football Quarterly"],
    assignedPlayersCount: 14
  },
  {
    id: "coach-002",
    name: "David Miller",
    title: "Tactical & Defensive Mastermind",
    specialization: "Defensive Tactics & Shape",
    experience: "12 Years",
    license: "UEFA Pro License",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    email: "david.miller@elitexi.com",
    phone: "+44 7700 900882",
    philosophy: "Defending is an art of geometry and discipline. Master positioning, and you dictate the tempo of every game.",
    achievements: ["Lead Defensive Strategist 2021-2024", "National Youth Championship Winner"],
    assignedPlayersCount: 18
  },
  {
    id: "coach-003",
    name: "Elena Rostova",
    title: "High Performance Athletic Coach",
    specialization: "Strength, Speed & Recovery",
    experience: "7 Years",
    license: "MSc Sports Performance",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    email: "elena.rostova@elitexi.com",
    phone: "+44 7700 900883",
    philosophy: "Your body is your primary instrument. Optimized recovery, biomechanics, and explosive energy separate good players from legends.",
    achievements: ["Olympic Track & Field Consultant", "Designed Elite XI Biomechanical Recovery Lab"],
    assignedPlayersCount: 22
  },
  {
    id: "coach-004",
    name: "Carlos Silva",
    title: "Goalkeeping & Reaction Specialist",
    specialization: "Goalkeeping Mastery",
    experience: "10 Years",
    license: "UEFA Goalkeeping A",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    email: "carlos.silva@elitexi.com",
    phone: "+44 7700 900884",
    philosophy: "The goalkeeper is the first attacker and the ultimate line of defense. Courage and distribution define the modern keeper.",
    achievements: ["Trained 3 International U-21 Goalkeepers", "Golden Glove Mentor 2023"],
    assignedPlayersCount: 8
  }
];

export const INITIAL_TASKS = [
  {
    id: "task-101",
    title: "Wall Pass & First-Touch Mastery",
    description: "Execute 100 alternating one-touch wall passes with non-dominant foot followed by 50 directional first-touch turns.",
    category: "Technical",
    difficulty: "Medium",
    duration: "45 mins",
    assignedDate: "2026-09-27",
    dueDate: "2026-09-28",
    status: "Completed",
    videoTutorial: "https://www.youtube.com/watch?v=demo",
    coachNote: "Focus on keeping your ankles locked and body open to the pitch."
  },
  {
    id: "task-102",
    title: "High-Intensity Interval Sprint Drills",
    description: "6x 100m shuttle sprints with 30s recovery. Measure acceleration time and heart rate recovery rate.",
    category: "Fitness",
    difficulty: "Hard",
    duration: "30 mins",
    assignedDate: "2026-09-27",
    dueDate: "2026-09-28",
    status: "Completed",
    coachNote: "Maintain explosive drive off the starting block."
  },
  {
    id: "task-103",
    title: "Positioning & Half-Space Scanning Video Review",
    description: "Watch 20-minute academy match clip. Note down 5 instances where head-scanning created passing lanes.",
    category: "Tactical",
    difficulty: "Easy",
    duration: "25 mins",
    assignedDate: "2026-09-28",
    dueDate: "2026-09-29",
    status: "In Progress",
    coachNote: "Pay close attention to body orientation before receiving."
  },
  {
    id: "task-104",
    title: "Weak Foot Curve & Crossing Precision",
    description: "Deliver 30 whipped crosses into the penalty box target zones using left foot from wide areas.",
    category: "Technical",
    difficulty: "Medium",
    duration: "40 mins",
    assignedDate: "2026-09-28",
    dueDate: "2026-09-29",
    status: "Pending",
    coachNote: "Plant non-kicking foot firmly next to the ball."
  },
  {
    id: "task-105",
    title: "Core Stability & Hamstring Resilience",
    description: "Perform Nordic hamstring curls, side planks, and resistance band hip flexor strengtheners.",
    category: "Recovery",
    difficulty: "Easy",
    duration: "20 mins",
    assignedDate: "2026-09-26",
    dueDate: "2026-09-27",
    status: "Completed",
    coachNote: "Patience and controlled eccentric motion are key."
  },
  {
    id: "task-106",
    title: "Pressure Decision Making under 1v1 Traps",
    description: "Simulate tight press scenarios in 5m squares. Practice shielded turns and quick vertical release.",
    category: "Mental",
    difficulty: "Hard",
    duration: "35 mins",
    assignedDate: "2026-09-28",
    dueDate: "2026-10-02",
    status: "In Progress",
    coachNote: "Stay calm under pressure. Anticipate the defender's movement."
  },
  {
    id: "task-107",
    title: "Free-Kick Placement & Technique",
    description: "Execute 25 dead-ball shots aiming for top corners over a wall barrier at 22 yards distance.",
    category: "Technical",
    difficulty: "Medium",
    duration: "30 mins",
    assignedDate: "2026-09-28",
    dueDate: "2026-10-03",
    status: "Pending",
    coachNote: "Consistent run-up angle builds accuracy."
  },
  {
    id: "task-108",
    title: "Zonal Marking & Set-Piece Defensive Drill",
    description: "Analyze corner kick defensive setups and complete the interactive tactical positioning quiz.",
    category: "Tactical",
    difficulty: "Hard",
    duration: "50 mins",
    assignedDate: "2026-09-28",
    dueDate: "2026-10-04",
    status: "Pending",
    coachNote: "Communication is essential during second ball clears."
  },
  {
    id: "task-109",
    title: "Post-Match Hydrotherapy & Muscle Recovery",
    description: "15 minutes contrast water therapy (hot/cold plunge) + 15 minutes foam rolling lower body.",
    category: "Recovery",
    difficulty: "Easy",
    duration: "30 mins",
    assignedDate: "2026-09-26",
    dueDate: "2026-09-27",
    status: "Completed",
    coachNote: "Rehydrate with electrolytes immediately afterwards."
  },
  {
    id: "task-110",
    title: "Pre-Match Visualization & Breathing Exercises",
    description: "Guided 15-minute mental rehearsal of key tactical duties and controlled diaphragmatic breathing.",
    category: "Mental",
    difficulty: "Easy",
    duration: "15 mins",
    assignedDate: "2026-09-25",
    dueDate: "2026-09-26",
    status: "Completed",
    coachNote: "Visualize overcoming match adversity with confidence."
  }
];

export const INITIAL_PROGRESS = {
  streakDays: 12,
  fitnessScore: 87,
  technicalScore: 85,
  overallRating: 86,
  attributes: {
    technical: {
      ballControl: 88,
      passing: 84,
      dribbling: 86,
      finishing: 82
    },
    physical: {
      speed: 85,
      stamina: 90,
      strength: 78,
      agility: 88
    },
    mental: {
      decisionMaking: 86,
      discipline: 92,
      tacticalAwareness: 84,
      composure: 87
    }
  },
  journeyMilestones: [
    { title: "Academy Joined", date: "Jan 15, 2024", completed: true, icon: "Award" },
    { title: "First Technical Mastery Passed", date: "Feb 20, 2024", completed: true, icon: "CheckCircle" },
    { title: "10 Training Tasks Completed", date: "Mar 18, 2024", completed: true, icon: "Zap" },
    { title: "Mid-Season Tactical Assessment", date: "May 10, 2024", completed: true, icon: "FileText" },
    { title: "75% Development Benchmark", date: "Aug 02, 2024", completed: true, icon: "TrendingUp" },
    { title: "Elite Squad Selection Trial", date: "Oct 15, 2026", completed: false, icon: "Star" }
  ]
};

export const INITIAL_SESSIONS = [
  {
    id: "session-201",
    title: "Technical Ball Control & Tight Space Dribbling",
    day: "Monday",
    date: "2026-09-28",
    time: "05:30 PM - 07:00 PM",
    location: "Main Pitch A - Grass",
    coach: "Arjun Kumar",
    category: "Technical",
    intensity: "High",
    description: "Focus on 1v1 evasive dribbling, tight space body shielding, and quick transition passing.",
    equipmentRequired: ["Boots (FG)", "Shin Guards", "Water Bottle"],
    attended: true
  },
  {
    id: "session-202",
    title: "Explosive Conditioning & High-Velocity Plyometrics",
    day: "Wednesday",
    date: "2026-09-30",
    time: "06:00 PM - 07:30 PM",
    location: "High Performance Fitness Centre",
    coach: "Elena Rostova",
    category: "Fitness",
    intensity: "Very High",
    description: "Targeted jump squats, acceleration sled pulls, agility ladder patterns, and VO2 max intervals.",
    equipmentRequired: ["Training Shoes", "Academy Fitness Kit"],
    attended: false
  },
  {
    id: "session-203",
    title: "Tactical Shape & Counter-Pressing Drills",
    day: "Thursday",
    date: "2026-10-01",
    time: "04:30 PM - 06:00 PM",
    location: "Tactical Studio & Pitch B",
    coach: "David Miller",
    category: "Tactical",
    intensity: "Medium",
    description: "Positional play in 4-3-3 structure, rapid defensive mid-block triggers, and counter-attack speed.",
    equipmentRequired: ["Boots (FG)", "Tactical Notebook"],
    attended: false
  },
  {
    id: "session-204",
    title: "Full Match Simulation (11 v 11)",
    day: "Saturday",
    date: "2026-10-03",
    time: "10:00 AM - 12:00 PM",
    location: "Academy Stadium Main Field",
    coach: "All Academy Coaches",
    category: "Match",
    intensity: "Match Speed",
    description: "Official internal match simulation featuring GPS performance tracking, referee, and video recording.",
    equipmentRequired: ["Full Match Uniform", "Boots", "Shin Guards"],
    attended: false
  },
  {
    id: "session-205",
    title: "Recovery Mobility, Foam Rolling & Cold Plunge",
    day: "Sunday",
    date: "2026-10-04",
    time: "11:00 AM - 12:15 PM",
    location: "Elite XI Recovery Hub & Pool",
    coach: "Elena Rostova",
    category: "Recovery",
    intensity: "Low",
    description: "Guided active recovery, deep tissue mobility routines, and contrast water bath therapy.",
    equipmentRequired: ["Swimwear", "Towel", "Slides"],
    attended: false
  }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: "ann-301",
    title: "Weekend Friendly Match vs City Youth Academy",
    date: "2026-09-27",
    category: "Match Notice",
    read: false,
    priority: "High",
    author: "Academy Director",
    summary: "The U-21 Elite XI squad will host City Youth Academy this Saturday at 10:00 AM. Squad selections will be posted by Thursday evening.",
    content: "All selected players are required to report to the dressing room by 08:45 AM sharp. Ensure your academy match kit and GPS vests are packed. Parents and scouts will be in attendance."
  },
  {
    id: "ann-302",
    title: "Monthly Performance & Video Review Sessions Scheduled",
    date: "2026-09-25",
    category: "Evaluation",
    read: true,
    priority: "Normal",
    author: "Coach David Miller",
    summary: "1-on-1 performance analysis appointments with your mentor are open for booking via the portal.",
    content: "During these 30-minute sessions, we will review your match metrics, tactical heatmaps, and discuss your progress towards the next plan level."
  },
  {
    id: "ann-303",
    title: "New High-Tech GPS Tracking Vests Issued",
    date: "2026-09-20",
    category: "Equipment",
    read: false,
    priority: "Normal",
    author: "Sports Science Dept",
    summary: "Next-gen GPS tracking pods have arrived. Please collect your assigned unit from Coach Elena.",
    content: "The new tracking pods measure top sprint speed, total distance covered, player load, and heart rate variability with 99.4% accuracy."
  },
  {
    id: "ann-304",
    title: "Academy Mid-Term Holiday & Schedule Adjustments",
    date: "2026-09-15",
    category: "Notice",
    read: true,
    priority: "Normal",
    author: "Academy Administration",
    summary: "Training schedules will adjust slightly during the upcoming mid-term break.",
    content: "Morning sessions will start at 09:30 AM during the holiday week. Evening technical workshops remain unchanged."
  }
];

/**
 * Seed initial data into localStorage if empty
 */
export const seedDemoDataIfEmpty = () => {
  const users = localStorage.getItem('footballAcademyUsers');
  if (!users) {
    localStorage.setItem('footballAcademyUsers', JSON.stringify([INITIAL_DEMO_USER]));
  }

  const currentUser = localStorage.getItem('footballAcademyCurrentUser');
  if (!currentUser) {
    localStorage.setItem('footballAcademyCurrentUser', JSON.stringify(INITIAL_DEMO_USER));
  }

  const tasks = localStorage.getItem('footballAcademyTasks');
  if (!tasks) {
    localStorage.setItem('footballAcademyTasks', JSON.stringify(INITIAL_TASKS));
  }

  const progress = localStorage.getItem('footballAcademyProgress');
  if (!progress) {
    localStorage.setItem('footballAcademyProgress', JSON.stringify(INITIAL_PROGRESS));
  }

  const mentors = localStorage.getItem('footballAcademyMentors');
  if (!mentors) {
    localStorage.setItem('footballAcademyMentors', JSON.stringify(INITIAL_MENTORS));
  }

  const sessions = localStorage.getItem('footballAcademySessions');
  if (!sessions) {
    localStorage.setItem('footballAcademySessions', JSON.stringify(INITIAL_SESSIONS));
  }

  const announcements = localStorage.getItem('footballAcademyAnnouncements');
  if (!announcements) {
    localStorage.setItem('footballAcademyAnnouncements', JSON.stringify(INITIAL_ANNOUNCEMENTS));
  }

  const plans = localStorage.getItem('footballAcademyPlans');
  if (!plans) {
    localStorage.setItem('footballAcademyPlans', JSON.stringify(ACADEMY_CONFIG.plans));
  }
};
