export type SectionId =
  | 'about'
  | 'experience'
  | 'education'
  | 'skills'
  | 'contact'

export type TimelineItem = {
  period: string
  title: string
  organization: string
  description: string
}

export type SkillGroup = {
  title: string
  items: string[]
}

export type ContactLink = {
  label: string
  value: string
  href: string
}

export type CvSection = {
  id: SectionId
  label: string
  kicker: string
  title: string
  intro: string
  timeline?: TimelineItem[]
  skillGroups?: SkillGroup[]
  highlights?: string[]
  links?: ContactLink[]
}

// Replace every bracketed value with your own details. This is the only file
// you need to edit to personalize the portfolio's written content.
export const profile = {
  name: 'Jordi Sanchez Marin',
  role: 'Frontend Engineer',
  location: 'Barcelona',
  availability: 'Employed / Open to work',
  shortBio:
    'An organized and thoughtful Frontend Engineer who values continuous learning and enjoys contributing to R&D initiatives, exploring new technologies, and solving meaningful challenges.',
}

export const sections: CvSection[] = [
  {
    id: 'about',
    label: 'About',
    kicker: 'Meet the explorer',
    title: 'A little about me',
    intro:
      'Drawn to new technologies and the digital world from an early age, I began my career at 23 building e-commerce websites and have since grown into a Frontend Engineer through collaborative teams where shared goals and open communication are essential. I enjoy learning something new every day, following sound engineering practices, and working with teammates to build reliable and maintainable solutions. I am particularly interested in testing, automation, and AI, exploring how they can improve development workflows and help people work more effectively. I thrive in positive, supportive environments where everyone contributes to both the product and a healthy team culture.',
    highlights: [
      '10 years of experience contributing to large-scale projects',
      'Experience across the healthcare and banking industries',
      'High standards and a strong commitment to continuous self-improvement',
      'Volunteer companion for older adults at Fundació Privada AVISMON-CATALUNYA since January 2023',
    ],
  },
  {
    id: 'experience',
    label: 'Experience',
    kicker: 'Built in the city',
    title: 'Work that made an impact',
    intro:
      'Over the past 10 years, I have contributed to large-scale digital products across banking and healthcare, progressing from web development and design to full-stack and frontend engineering roles.',
    timeline: [
      {
        period: 'Aug 2023 – Present',
        title: 'JavaScript Frontend Developer',
        organization: 'ING via Huxley · Remote',
        description:
          'Frontend development for large-scale banking products, working with JavaScript, Lit, and HTML in a collaborative remote environment.',
      },
      {
        period: 'Aug 2017 – Aug 2023',
        title: 'JavaScript Full-Stack Developer',
        organization: 'UXLand · Barcelona',
        description:
          'Developed web applications using clean architecture and sound engineering practices, built JavaScript frameworks and libraries, and created APIs with Node.js. Worked with Lit, TypeScript, Redux, Vanilla JS, Web Components, HTML, CSS, Sass, React, and Git.',
      },
      {
        period: 'Sep 2014 – Jul 2017',
        title: 'Web Developer and Designer',
        organization: 'Güell Consulting Technologies · Mataró',
        description:
          'Worked across web development and design, building the practical and technical foundation for my career in frontend engineering.',
      },
    ],
  },
  {
    id: 'education',
    label: 'Education',
    kicker: 'The observatory',
    title: 'Always looking further',
    intro:
      'My education combines a Computer Science degree with advanced vocational training in web development, network systems administration, and multimedia application development. I am also continuing to improve my English through formal study.',
    timeline: [
      {
        period: 'Currently studying',
        title: 'English B2.1 Course',
        organization: 'English language school',
        description:
          'Developing intermediate English communication skills for professional and collaborative environments.',
      },
      {
        period: 'Sep 2016 – Jul 2022',
        title: 'Bachelor’s Degree in Computer Science',
        organization: 'Universitat Oberta de Catalunya',
        description:
          'University studies in software engineering, computer systems, and the foundations of computer science.',
      },
      {
        period: '2013 – 2014',
        title: 'Higher Vocational Diploma in Web Application Development',
        organization: "Centre d'Estudis Politècnics",
        description:
          'Advanced training focused on designing, developing, and maintaining web applications.',
      },
      {
        period: '2012 – 2013',
        title: 'Higher Vocational Diploma in Network Systems Administration',
        organization: "Centre d'Estudis Politècnics",
        description:
          'Advanced training in computer systems, network infrastructure, services, and administration.',
      },
      {
        period: '2011 – 2012',
        title: 'Higher Vocational Diploma in Multimedia Application Development',
        organization: "Centre d'Estudis Politècnics",
        description:
          'Advanced training in software development and interactive multimedia applications.',
      },
    ],
  },
  {
    id: 'skills',
    label: 'Skills',
    kicker: 'The high ground',
    title: 'Tools for the journey',
    intro:
      'My toolkit combines modern JavaScript engineering with maintainable architecture, testing, accessibility, and a strong interest in using AI and automation to improve how people work.',
    skillGroups: [
      {
        title: 'Frontend engineering',
        items: [
          'JavaScript',
          'TypeScript',
          'React',
          'Lit',
          'Web Components',
          'Redux',
          'Vanilla JS',
          'HTML',
          'CSS',
          'Sass',
        ],
      },
      {
        title: 'Engineering and quality',
        items: [
          'Node.js',
          'API Development',
          'Git',
          'Clean Architecture',
          'Testing',
          'Accessibility',
        ],
      },
      {
        title: 'Ways of working',
        items: [
          'Team Collaboration',
          'Active Listening',
          'Clear Communication',
          'Constructive Feedback',
          'Problem Solving',
          'Continuous Learning',
          'Supportive Team Culture',
        ],
      },
      {
        title: 'Innovation',
        items: [
          'AI-Assisted Development',
          'Workflow Automation',
          'R&D',
          'Developer Productivity',
        ],
      },
      {
        title: 'Languages',
        items: [
          'Catalan - Bilingual / Native',
          'Spanish - Bilingual / Native',
          'English - B2.1 in progress',
        ],
      },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    kicker: 'Send a signal',
    title: 'Let us make something meaningful',
    intro:
      'I’m always open to meaningful conversations, collaborative projects, and new professional opportunities. If you think we could build something valuable together, I’d be happy to hear from you.',
    links: [
      {
        label: 'Email',
        value: 'jordi.sanchez.marin00@gmail.com',
        href: 'mailto:jordi.sanchez.marin00@gmail.com',
      },
      {
        label: 'LinkedIn',
        value: 'linkedin.com/in/jordi-sanchez-marin',
        href: 'https://www.linkedin.com/in/jordi-sanchez-marin',
      },
      {
        label: 'GitHub',
        value: 'github.com/JordiSanchezMarin',
        href: 'https://github.com/JordiSanchezMarin',
      },
    ],
  },
]
