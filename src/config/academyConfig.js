// Academy Configuration
// Easily customizable single point of truth for Academy branding and details

export const ACADEMY_CONFIG = {
  name: "ELITE XI FOOTBALL ACADEMY",
  shortName: "ELITE XI",
  tagline: "Train Hard. Play Smart. Become Elite.",
  subTagline: "Developing world-class football talent through elite technical coaching, tactical mastery, physical conditioning, and mental resilience.",
  establishedYear: 2018,
  location: "Elite Sports Complex, Stadium Way, London, UK",
  contactEmail: "admissions@elitexi.com",
  contactPhone: "+44 (0) 20 7946 0912",
  socials: {
    instagram: "@elitexi_academy",
    twitter: "@EliteXIFootball",
    youtube: "EliteXIFootballAcademy",
  },
  plans: [
    {
      id: "plan-foundation",
      name: "FOUNDATION PLAN",
      level: "Beginner",
      tagline: "Core technical fundamentals & ball mastery",
      description: "Designed for grass-roots players focusing on ball control, passing accuracy, spatial awareness, and basic physical endurance.",
      duration: "3 Months",
      frequency: "3 Sessions / Week",
      color: "from-emerald-600 to-teal-700",
      modules: [
        { name: "First Touch & Ball Control", progress: 85, totalHours: 12 },
        { name: "Short & Long Range Passing", progress: 70, totalHours: 10 },
        { name: "Dribbling in Tight Spaces", progress: 90, totalHours: 14 },
        { name: "Basic Aerobic Fitness", progress: 75, totalHours: 8 }
      ]
    },
    {
      id: "plan-development",
      name: "DEVELOPMENT PLAN",
      level: "Intermediate",
      tagline: "Tactical intelligence, speed & high-intensity play",
      description: "Comprehensive development program targeting positional understanding, rapid transition play, speed, agility, and match scenario problem-solving.",
      duration: "6 Months",
      frequency: "4 Sessions / Week",
      color: "from-blue-600 to-indigo-700",
      modules: [
        { name: "Advanced Ball Mastery & Feints", progress: 80, totalHours: 20 },
        { name: "Tactical Awareness & Pressing", progress: 75, totalHours: 18 },
        { name: "Explosive Speed & Agility", progress: 88, totalHours: 16 },
        { name: "Finishing & Shooting Dynamics", progress: 72, totalHours: 15 }
      ]
    },
    {
      id: "plan-elite",
      name: "ELITE PLAN",
      level: "Advanced",
      tagline: "Professional pathway, performance analysis & match mastery",
      description: "High-performance academy track simulating professional club environments. Includes video analysis, tailored gym conditioning, and high-intensity match simulation.",
      duration: "12 Months",
      frequency: "5 Sessions / Week",
      color: "from-amber-500 to-orange-600",
      modules: [
        { name: "Match Intelligence & Game Management", progress: 85, totalHours: 30 },
        { name: "Advanced Tactical Systems & Formations", progress: 92, totalHours: 28 },
        { name: "Strength, Power & Recovery Protocol", progress: 80, totalHours: 25 },
        { name: "Performance Video Analysis", progress: 88, totalHours: 20 }
      ]
    }
  ]
};
