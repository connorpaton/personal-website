export const walkPlaces = [
  {
    id: 'mountains',
    label: 'The mountains',
    shortLabel: 'Mountains',
    theme: 'Building something',
    description: 'For the climb, the doubt, and the reasons to keep going.',
    position: { left: '29%', top: '27%' },
    posts: ['startups/the-founders-paradox', 'startups/building-my-first-startup'],
  },
  {
    id: 'forest',
    label: 'The forest',
    shortLabel: 'Forest',
    theme: 'Finding your people',
    description: 'Unexpected connections. Different paths. People worth knowing.',
    position: { left: '18%', top: '62%' },
    posts: ['lifelearnings/why-the-best-networkers-are-actually-brokers', 'books/how-to-win-friends-and-influence-people'],
  },
  {
    id: 'shore',
    label: 'The shore',
    shortLabel: 'Shore',
    theme: 'A little perspective',
    description: 'Some things are easier to think about when you step back.',
    position: { left: '83%', top: '78%' },
    posts: ['lifelearnings/my-framework-to-life', 'lifelearnings/embracing-uncertainty'],
  },
  {
    id: 'cabin',
    label: 'The book cabin',
    shortLabel: 'Book cabin',
    theme: 'Other worlds, other lives',
    description: 'A light in the window. Something good to read. No hurry to leave.',
    position: { left: '73%', top: '52%' },
    posts: ['lifelearnings/returning-to-fiction', 'books/shoe-dog', 'books/tuesdays-with-morrie'],
  },
  {
    id: 'campfire',
    label: 'The campfire',
    shortLabel: 'Campfire',
    theme: 'Still figuring it out',
    description: 'Not everything needs a conclusion. Pull up a log.',
    position: { left: '49%', top: '88%' },
    posts: ['startups/the-founders-paradox'],
  },
] as const;

export type WalkPlaceId = typeof walkPlaces[number]['id'];

export type WalkPost = {
  path: string;
  title: string;
  description: string;
};

export const campfireNote = {
  text: "I care about what I'm building. I also care about what it costs. Both can be true.",
  source: "The Founder's Paradox",
  href: '/startups/the-founders-paradox',
};
