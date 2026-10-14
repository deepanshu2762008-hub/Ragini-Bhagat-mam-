/**
 * ==========================================================================
 *  PLACEHOLDER CONTENT — every name, date, quote and image below is
 *  invented sample content so the design reads as a real teacher's story.
 *  Edit this file to make the portfolio yours. Nothing else needs changing:
 *  every section reads from here.
 *
 *  Images point at generated SVG compositions in /public/images (paper
 *  textures, botanical line art, abstract classroom scenes). Replace a path
 *  with your own file (or a remote URL) and the layout adapts.
 *  See README → "How to edit your content and replace images".
 * ==========================================================================
 */

import type {
  Achievement,
  Certificate,
  ContactInformation,
  EducationEntry,
  ExperienceEntry,
  FutureVision,
  GalleryItem,
  Interest,
  JourneyMilestone,
  Project,
  SeoMeta,
  Skill,
  SocialLink,
  Stat,
  Subject,
  Testimonial,
} from '../types';

/* ------------------------------- identity ------------------------------- */

export const teacherName = 'Ragini Bhagat';
export const designation = 'Secondary Educator — Language & Humanities';
export const tagline = 'Educator • Mentor • Lifelong Learner';
export const intro =
  'Dedicated to creating meaningful learning experiences and helping students discover their potential.';

export const bio: string[] = [
  'For more than a decade I have worked in classrooms where curiosity is treated as seriously as curriculum. I began teaching because a single teacher once changed what I believed I was capable of — I have spent my career trying to pass that feeling on.',
  'My days are split between lesson design, long conversations with teenagers, and the quiet work of marking papers with a pencil in hand. I hold a Master’s degree in Language Education and have taught across both urban and rural schools, which shaped a flexible, student-first approach to pedagogy.',
  'I believe a classroom should feel like a workshop rather than a waiting room: messy, purposeful, and full of questions that do not have tidy answers. My practice leans on project-based learning, formative assessment, and the slow work of building trust with every student who walks in.',
  'Outside the lesson plan I mentor new teachers, chair curriculum committees, and keep a battered sketchbook of ideas that did not work yet. I am, and expect to remain, a student of teaching itself.',
];

export const portraitImage = '/images/portrait.jpg';

/* ------------------------------ education ------------------------------- */

export const education: EducationEntry[] = [
  {
    year: '2011',
    title: 'M.A., Language Education',
    organization: 'University of Northfield',
    description:
      'Thesis on inquiry-led reading circles in mixed-ability classrooms.',
  },
  {
    year: '2009',
    title: 'B.Ed., English & Drama',
    organization: 'Rivermouth College of Education',
    description:
      'Graduated with distinction; student-teaching placement at two secondary schools.',
  },
];

/* ------------------------------ experience ------------------------------ */

export const experience: ExperienceEntry[] = [
  {
    year: '2019 — now',
    title: 'Lead Teacher, Humanities',
    organization: 'Northfield Secondary School',
    description:
      'Leading a team of six, redesigning the Grade 9–10 humanities curriculum.',
  },
  {
    year: '2014 — 2019',
    title: 'English & Literature Teacher',
    organization: 'Harbourview High School',
    description:
      'Built the school’s first project-based literature programme and literary journal.',
  },
  {
    year: '2011 — 2014',
    title: 'Junior Classroom Teacher',
    organization: 'Elm Street Primary',
    description:
      'Generalist teaching across Grades 4–6 with a focus on reading confidence.',
  },
];

/* -------------------------------- journey ------------------------------- */

export const journey: JourneyMilestone[] = [
  {
    year: '2007 — 2011',
    label: 'Education',
    description:
      'University years spent in libraries, practicum classrooms and a growing conviction that teaching was the work for me.',
  },
  {
    year: '2011',
    label: 'First Teaching Experience',
    description:
      'Twenty-three nine-year-olds, one jammed pencil sharpener, and the day I first saw a hesitant reader finish a whole book.',
  },
  {
    year: '2014',
    label: 'Professional Growth',
    description:
      'Moved to secondary teaching, retrained in inquiry-based methods, and began presenting at regional teaching conferences.',
  },
  {
    year: '2017',
    label: 'Leadership & Responsibilities',
    description:
      'Appointed year-level coordinator and mentor teacher, guiding new staff through their first years in the classroom.',
  },
  {
    year: '2019 — now',
    label: 'Current Role',
    description:
      'Lead Teacher for Humanities: curriculum design, staff mentoring and a classroom I still look forward to every morning.',
  },
  {
    year: 'Next',
    label: 'Future Vision',
    description:
      'To build a teacher-development studio where educators trade craft, experiments and honest notes about what works.',
  },
];

/* ------------------------------- subjects ------------------------------- */

export const subjects: Subject[] = [
  {
    name: 'Teaching',
    shortDescription:
      'Lessons built around questions first, answers second — taught with patience and a healthy amount of chalk dust.',
    illustration: 'chalkboard',
  },
  {
    name: 'Curriculum Planning',
    shortDescription:
      'Mapping a year of learning into units that build on each other, with room for the detours students actually need.',
    illustration: 'pages',
  },
  {
    name: 'Student Mentoring',
    shortDescription:
      'One-to-one guidance through doubt, deadlines and direction — the quiet conversations that outlast any exam.',
    illustration: 'figures',
  },
  {
    name: 'Classroom Management',
    shortDescription:
      'Routines and respect instead of rules and raised voices; a room that runs on shared agreement.',
    illustration: 'clock',
  },
  {
    name: 'Activity-Based Learning',
    shortDescription:
      'Stations, role-play, field notes and hands-on tasks that let students discover the idea before I name it.',
    illustration: 'hands',
  },
  {
    name: 'Technology in Education',
    shortDescription:
      'Digital tools used with intent — when they open a door the paper version cannot, and not one tab more.',
    illustration: 'laptop',
  },
  {
    name: 'Project-Based Learning',
    shortDescription:
      'Long-form projects with real audiences: magazines, podcasts, museum nights built entirely by students.',
    illustration: 'blocks',
  },
];

/* -------------------------------- skills -------------------------------- */

export const skills: Skill[] = [
  { name: 'Teaching & Mentoring', level: 96, note: 'Twelve years, all ages' },
  { name: 'Curriculum Development', level: 92, note: 'Whole-school scope maps' },
  { name: 'Communication', level: 90, note: 'Students, parents, staff' },
  { name: 'Leadership', level: 84, note: 'Team lead of six teachers' },
  { name: 'Technology Integration', level: 78, note: 'Blended, never busy' },
  { name: 'Event Coordination', level: 82, note: 'Literary nights & fairs' },
  { name: 'Creative Learning', level: 94, note: 'The heart of it all' },
];

/* --------------------------------- stats -------------------------------- */

export const stats: Stat[] = [
  { value: 12, suffix: '+', label: 'Years of Experience' },
  { value: 25, suffix: '+', label: 'Workshops & Activities' },
  { value: 1000, suffix: '+', label: 'Students Guided' },
  { value: 30, suffix: '+', label: 'Teaching Resources Created' },
];

/* ------------------------------ achievements ---------------------------- */

export const achievements: Achievement[] = [
  {
    category: 'Award',
    title: 'Regional Teacher of the Year — Finalist',
    year: '2023',
    description: 'Recognised for the inquiry-led reading programme.',
  },
  {
    category: 'Award',
    title: 'Headteacher’s Award for Classroom Innovation',
    year: '2020',
    description: 'For the student-run literary magazine project.',
  },
  {
    category: 'Certification',
    title: 'Certified Secondary Educator',
    year: '2011',
    description: 'National teaching licence, Language & Drama specialism.',
  },
  {
    category: 'Professional Development',
    title: 'Inquiry-Based Learning Institute',
    year: '2022',
    description: 'A year-long practitioner cohort with monthly studios.',
  },
  {
    category: 'Professional Development',
    title: 'Trauma-Informed Practice Certificate',
    year: '2021',
    description: 'Sixty hours of coursework and supervised practice.',
  },
  {
    category: 'Workshop',
    title: '“Feedback That Lands” — Staff Workshop',
    year: '2023',
    description: 'Designed and led a half-day workshop for forty teachers.',
  },
  {
    category: 'Workshop',
    title: 'Reading Circles Facilitator',
    year: '2018',
    description: 'Weekly student workshops across three year groups.',
  },
  {
    category: 'Responsibility',
    title: 'Lead Teacher, Humanities Department',
    year: '2019 — now',
    description: 'Curriculum direction and mentoring for a team of six.',
  },
  {
    category: 'Responsibility',
    title: 'Year-Level Coordinator',
    year: '2017 — 2019',
    description: 'Welfare, scheduling and parent communication for 180 students.',
  },
  {
    category: 'Student Achievement',
    title: 'Students Published in the State Youth Anthology',
    year: '2022',
    description: 'Four writers selected from my project-based writing unit.',
  },
  {
    category: 'Student Achievement',
    title: 'Debate Team — Regional Champions',
    year: '2021',
    description: 'Coached the squad through an undefeated season.',
  },
  {
    category: 'School Contribution',
    title: 'Founded the Annual Literary Evening',
    year: '2016',
    description: 'A student-run night of readings, now in its ninth year.',
  },
  {
    category: 'School Contribution',
    title: 'Library Renewal Committee',
    year: '2018',
    description: 'Rebuilt the collection around student choice and voice.',
  },
];

/* -------------------------------- projects ------------------------------ */

export const projects: Project[] = [
  {
    name: 'The Paper Lantern Journal',
    year: '2022 — 2023',
    role: 'Founder & Faculty Editor',
    description:
      'A student-run literary magazine that turned a reluctant writing class into a newsroom with deadlines, editors and a print run.',
    images: ['/images/classroom-01.svg', '/images/classroom-04.svg'],
    details: [
      'Students pitched, edited, illustrated and typeset every issue over two terms, working to a real publication calendar.',
      'The first issue sold out in a week; the second was funded by the school’s parent association.',
      'Six pieces from the journal were later selected for a state youth anthology.',
    ],
  },
  {
    name: 'Reading Circles Programme',
    year: '2018 — present',
    role: 'Programme Designer & Facilitator',
    description:
      'A weekly reading-circle structure that gives hesitant readers a low-stakes way back into books, built around choice rather than set texts.',
    images: ['/images/classroom-02.svg', '/images/botanical-01.svg'],
    details: [
      'Nine voluntary circles across three year groups, each choosing its own book every four weeks.',
      'Trained twelve student facilitators to run their own circles without adult direction.',
      'Reading-confidence survey scores rose across every participating cohort.',
    ],
  },
  {
    name: 'Classroom Without Walls',
    year: '2021',
    role: 'Project Lead',
    description:
      'A term-long project where the school grounds became the curriculum: field notes, mapping, interviews and a public exhibition night.',
    images: ['/images/classroom-03.svg', '/images/botanical-02.svg'],
    details: [
      'Four subject areas collaborated on one shared question: how has this place changed?',
      'Students collected oral histories from long-serving staff and neighbours.',
      'The exhibition ran for one evening and was attended by more than two hundred families.',
    ],
  },
  {
    name: 'New Teacher Mentorship Circle',
    year: '2020 — present',
    role: 'Mentor & Coordinator',
    description:
      'A peer-mentoring structure for first-year teachers: observation, honest feedback and a shared notebook of what actually works.',
    images: ['/images/classroom-05.svg', '/images/botanical-03.svg'],
    details: [
      'Monthly observation pairs with a no-evaluation feedback protocol.',
      'Twenty-two early-career teachers have moved through the circle so far.',
      'The model was adopted school-wide as part of the staff development plan.',
    ],
  },
];

/* -------------------------------- gallery ------------------------------- */

export const gallery: GalleryItem[] = [
  {
    image: '/images/photo-01.jpg',
    caption: 'A holiday afternoon in the hills',
    rotation: -1.6,
    size: 'lg',
    alt: `Photograph of ${teacherName} in a red embroidered suit with mountains and a sunset behind her`,
  },
  {
    image: '/images/photo-02.jpg',
    caption: 'Flash on at the evening function',
    rotation: 1.2,
    size: 'md',
    alt: `Flash-lit candid of ${teacherName} in sunglasses and a cream saree at an evening event`,
  },
  {
    image: '/images/photo-03.jpg',
    caption: 'OCT 13 1985 — pulled from the old album',
    rotation: -0.8,
    size: 'md',
    alt: `Vintage 1985 photograph of ${teacherName} in a pink silk saree`,
  },
  {
    image: '/images/photo-04.jpg',
    caption: 'Retro shades, film grain and all',
    rotation: 1.8,
    size: 'sm',
    alt: `Retro-filtered candid of ${teacherName} in sunglasses and a printed cream saree`,
  },
  {
    image: '/images/classroom-05.svg',
    caption: 'Planning the term one index card at a time',
    rotation: -1.4,
    size: 'sm',
    alt: 'Abstract illustration of index cards and a pencil on a desk',
  },
  {
    image: '/images/classroom-06.svg',
    caption: 'The literary evening, an hour before doors',
    rotation: 1.1,
    size: 'lg',
    alt: 'Abstract illustration of a stage with a lectern and string lights',
  },
  {
    image: '/images/botanical-01.svg',
    caption: 'Pressed leaf from the grounds project',
    rotation: -2,
    size: 'sm',
    alt: 'Botanical line drawing of a pressed leaf',
  },
  {
    image: '/images/botanical-03.svg',
    caption: 'Marginalia — ideas that did not work yet',
    rotation: 0.9,
    size: 'md',
    alt: 'Botanical line drawing of a small wildflower sprig',
  },
];

/* ------------------------------ certificates ---------------------------- */

export const certificates: Certificate[] = [
  {
    title: 'M.A., Language Education',
    issuer: 'University of Northfield',
    year: '2011',
    thumbnail: '/images/certificate-01.svg',
    fullImage: '/images/certificate-01.svg',
    downloadable: true,
  },
  {
    title: 'Inquiry-Based Learning Institute',
    issuer: 'Northfield Teaching Collective',
    year: '2022',
    thumbnail: '/images/certificate-02.svg',
    fullImage: '/images/certificate-02.svg',
    downloadable: true,
  },
  {
    title: 'Trauma-Informed Practice Certificate',
    issuer: 'Centre for Student Wellbeing',
    year: '2021',
    thumbnail: '/images/certificate-03.svg',
    fullImage: '/images/certificate-03.svg',
    // Offer a real PDF by adding: pdf: '/documents/your-file.pdf'
    downloadable: false,
  },
];

/* ------------------------------ testimonials ---------------------------- */

export const testimonials: Testimonial[] = [
  {
    quote:
      'She was the first teacher who made me feel like my questions were allowed. I still hear her voice when I am stuck on something hard.',
    name: 'Priya N.',
    relation: 'student',
    year: '2023',
  },
  {
    quote:
      'Mrs Bhagat noticed when our son went quiet, and she did something about it quietly. That meant everything to our family.',
    name: 'Daniel O.',
    relation: 'parent',
    year: '2022',
  },
  {
    quote:
      'I have never seen a colleague prepare more carefully or share more generously. Our whole department teaches differently because of her.',
    name: 'Helen R.',
    relation: 'colleague',
    year: '2021',
  },
  {
    quote:
      'I came into teaching certain I would not last a year. Two years later I am still here, and her mentorship circle is the reason.',
    name: 'Tomás V.',
    relation: 'student teacher',
    year: '2023',
  },
  {
    quote:
      'Reading was a battle at home. Then her reading circles started, and our daughter now asks for twenty more minutes before lights out.',
    name: 'Aisha K.',
    relation: 'parent',
    year: '2024',
  },
];

/* -------------------------- classroom memories -------------------------- */

export const classroomMemories: { label: string; text: string }[] = [
  { label: 'a memory', text: 'The day the whole class applauded a student who had never read aloud before.' },
  { label: 'mentoring', text: 'Two hours after the final bell, one sheet of paper, and the sentence “I think I know what I want to do now.”' },
  { label: 'from the classroom', text: 'Thirty students arguing about the ending of a novel — nobody noticed the bell.' },
];

/* -------------------------------- interests ----------------------------- */

export const interests: Interest[] = [
  { name: 'Reading', illustration: 'reading' },
  { name: 'Art', illustration: 'art' },
  { name: 'Travel', illustration: 'travel' },
  { name: 'Nature', illustration: 'nature' },
  { name: 'Learning', illustration: 'learning' },
  { name: 'Creativity', illustration: 'creativity' },
];

/* ------------------------------ future vision --------------------------- */

export const futureVision: FutureVision = {
  statement: 'Learning never stops.',
  paragraph:
    'My next chapter is a teacher-development studio: a place where educators exchange lesson experiments, honest post-mortems and the small wins that never make it into a report. I want to keep teaching, keep mentoring, and keep being the kind of teacher who still gets nervous before the first day.',
};

/* ------------------------------- philosophy ----------------------------- */

export const philosophy = {
  /** Rendered as two lines so they can reveal one by one */
  quote: [
    'Education is not just about teaching lessons.',
    'It is about inspiring curiosity.',
  ],
  paragraph:
    'Curiosity is the one appetite that grows the more you feed it. My job is not to hand students a finished map but to hand them a compass — and then to be brave enough to let them walk somewhere I have never been. Lessons end; the willingness to keep asking does not.',
};

/* --------------------------------- contact ------------------------------ */

export const contactInformation: ContactInformation = {
  email: 'ragini.bhagat@example.com',
  phone: '+1 (555) 013-4821',
  institution: 'Northfield Secondary School',
  location: 'Northfield, Rivermouth',
};

export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/example' },
  { label: 'Teachers Pay Teachers', url: 'https://www.teacherspayteachers.com/Example' },
  { label: 'Medium', url: 'https://medium.com/@example' },
];

/* ----------------------------------- SEO -------------------------------- */

export const seoMeta: SeoMeta = {
  title: 'Ragini Bhagat — Educator • Mentor • Lifelong Learner',
  description:
    'A digital sketchbook documenting the professional journey of Ragini Bhagat: teaching philosophy, classroom work, achievements and the road ahead.',
  ogImage: '/images/portrait.jpg',
};
