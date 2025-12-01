import { Article, Category, NavItem, Comment } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'World', slug: 'world' },
  { id: '2', name: 'Politics', slug: 'politics' },
  { id: '3', name: 'Business', slug: 'business' },
  { id: '4', name: 'Tech', slug: 'tech' },
  { id: '5', name: 'Science', slug: 'science' },
  { id: '6', name: 'Health', slug: 'health' },
  { id: '7', name: 'Sports', slug: 'sports' },
  { id: '8', name: 'Entertainment', slug: 'entertainment' },
];

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/', isCategory: false },
  { label: 'Latest', path: '/latest-news', isCategory: false },
  { label: 'World', path: '/category/world', isCategory: true },
  { label: 'Business', path: '/category/business', isCategory: true },
  { label: 'Tech', path: '/category/tech', isCategory: true },
  { label: 'Health', path: '/category/health', isCategory: true },
  { label: 'Sport', path: '/category/sports', isCategory: true },
  { label: 'Travel', path: '/category/travel', isCategory: true },
];

const LOREM_IPSUM = `
  <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  <p class="mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <h3 class="text-2xl font-serif font-bold mb-3 mt-6">A New Perspective</h3>
  <p class="mb-4">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
  <p class="mb-4">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
  <blockquote class="border-l-4 border-omega-red pl-4 italic my-6 text-xl text-gray-700 bg-gray-50 p-4">
    "The future belongs to those who believe in the beauty of their dreams."
  </blockquote>
  <p class="mb-4">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
`;

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Global Summit Reaches Historic Agreement on Climate Action Targets',
    excerpt: 'World leaders have unanimously agreed to ambitious new goals for carbon reduction by 2030.',
    content: LOREM_IPSUM,
    category: 'World',
    author: { id: 'author1', name: 'Sarah Jenkins', avatar: 'https://picsum.photos/seed/author1/100/100' },
    date: '2023-10-24',
    imageUrl: 'https://picsum.photos/seed/news1/800/600',
    tags: ['Climate', 'Politics', 'Global'],
    views: 12500
  },
  {
    id: '2',
    title: 'The Future of AI: How Machine Learning is Transforming Healthcare',
    excerpt: 'New diagnostic tools powered by artificial intelligence are detecting diseases earlier than ever before.',
    content: LOREM_IPSUM,
    category: 'Tech',
    author: { id: 'author2', name: 'David Chen', avatar: 'https://picsum.photos/seed/author2/100/100' },
    date: '2023-10-23',
    imageUrl: 'https://picsum.photos/seed/tech1/800/600',
    tags: ['AI', 'Health', 'Future'],
    views: 8400
  },
  {
    id: '3',
    title: 'Market Rally Continues as Tech Stocks Hit Record Highs',
    excerpt: 'Wall Street sees another day of gains driven by semiconductor sector performance.',
    content: LOREM_IPSUM,
    category: 'Business',
    author: { id: 'author3', name: 'Amanda Lewis', avatar: 'https://picsum.photos/seed/author3/100/100' },
    date: '2023-10-22',
    imageUrl: 'https://picsum.photos/seed/business1/800/600',
    tags: ['Stocks', 'Economy', 'Finance'],
    views: 5600
  },
  {
    id: '4',
    title: 'Hidden Gems: European Destinations You Need to Visit This Summer',
    excerpt: 'Escape the crowds with these breathtaking but lesser-known vacation spots.',
    content: LOREM_IPSUM,
    category: 'Travel',
    author: { id: 'author4', name: 'Marcus Johnson', avatar: 'https://picsum.photos/seed/author4/100/100' },
    date: '2023-10-21',
    imageUrl: 'https://picsum.photos/seed/travel1/800/600',
    tags: ['Travel', 'Europe', 'Guide'],
    views: 15000
  },
  {
    id: '5',
    title: 'Championship Finals: Underdog Team Shocks the World',
    excerpt: 'In a stunning upset, the city favorites were defeated in overtime last night.',
    content: LOREM_IPSUM,
    category: 'Sports',
    author: { id: 'author5', name: 'Tom Brady', avatar: 'https://picsum.photos/seed/author5/100/100' },
    date: '2023-10-20',
    imageUrl: 'https://picsum.photos/seed/sports1/800/600',
    tags: ['Sports', 'Football', 'Finals'],
    views: 22000
  },
  {
    id: '6',
    title: 'Minimalist Interior Design: Creating Calm in a Chaotic World',
    excerpt: 'Tips and tricks for decluttering your space and your mind through design.',
    content: LOREM_IPSUM,
    category: 'Lifestyle',
    author: { id: 'author6', name: 'Elena Rodriguez', avatar: 'https://picsum.photos/seed/author6/100/100' },
    date: '2023-10-19',
    imageUrl: 'https://picsum.photos/seed/interior1/800/600',
    tags: ['Design', 'Home', 'Minimalism'],
    views: 7800
  },
  {
    id: '7',
    title: 'Revolutionary Battery Tech Promises Week-Long Phone Charge',
    excerpt: 'Scientists have discovered a new material that could multiply battery density by 10x.',
    content: LOREM_IPSUM,
    category: 'Science',
    author: { id: 'author7', name: 'Dr. Alan Grant', avatar: 'https://picsum.photos/seed/author7/100/100' },
    date: '2023-10-18',
    imageUrl: 'https://picsum.photos/seed/science1/800/600',
    tags: ['Tech', 'Energy', 'Innovation'],
    views: 9200
  },
  {
    id: '8',
    title: 'The Art of Street Photography: Capturing Urban Life',
    excerpt: 'A guide to finding beauty in the mundane corners of the city.',
    content: LOREM_IPSUM,
    category: 'Arts',
    author: { id: 'author8', name: 'Sophia Lee', avatar: 'https://picsum.photos/seed/author8/100/100' },
    date: '2023-10-17',
    imageUrl: 'https://picsum.photos/seed/arts1/800/600',
    tags: ['Photography', 'Art', 'City'],
    views: 4500
  },
  {
    id: '9',
    title: 'Healthy Eating on a Budget: Meal Prep 101',
    excerpt: 'Nutritious meals don\'t have to break the bank. Here is how to plan ahead.',
    content: LOREM_IPSUM,
    category: 'Health',
    author: { id: 'author9', name: 'Mike Ross', avatar: 'https://picsum.photos/seed/author9/100/100' },
    date: '2023-10-16',
    imageUrl: 'https://picsum.photos/seed/food1/800/600',
    tags: ['Food', 'Health', 'Budget'],
    views: 11000
  },
  {
    id: '10',
    title: 'Space Tourism: When Will It Be Affordable?',
    excerpt: 'Commercial space flights are here, but ticket prices remain astronomical.',
    content: LOREM_IPSUM,
    category: 'Science',
    author: { id: 'author10', name: 'Neil A.', avatar: 'https://picsum.photos/seed/author10/100/100' },
    date: '2023-10-15',
    imageUrl: 'https://picsum.photos/seed/space1/800/600',
    tags: ['Space', 'Future', 'Travel'],
    views: 30000
  },
    {
    id: '11',
    title: 'Classic French Recipes Every Home Cook Should Know',
    excerpt: 'Mastering the basics of French cuisine is easier than you think.',
    content: LOREM_IPSUM,
    category: 'Health',
    author: { id: 'author11', name: 'Julia C.', avatar: 'https://picsum.photos/seed/author11/100/100' },
    date: '2023-10-14',
    imageUrl: 'https://picsum.photos/seed/food2/800/600',
    tags: ['Food', 'Cooking', 'French'],
    views: 6700
  },
  {
    id: '12',
    title: 'Election Updates: Key Swing States to Watch',
    excerpt: 'Polling numbers shift as the campaign enters its final crucial weeks.',
    content: LOREM_IPSUM,
    category: 'Politics',
    author: { id: 'author12', name: 'Wolf B.', avatar: 'https://picsum.photos/seed/author12/100/100' },
    date: '2023-10-13',
    imageUrl: 'https://picsum.photos/seed/pol1/800/600',
    tags: ['Politics', 'Election', 'USA'],
    views: 41000
  }
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    author: 'James Wilson',
    date: '2023-10-25T10:30:00',
    content: 'This is a fantastic article! Really appreciate the depth of analysis provided here. The points about sustainable energy are particularly relevant.',
    avatar: 'https://picsum.photos/seed/user1/50/50'
  },
  {
    id: '2',
    author: 'Emily Chen',
    date: '2023-10-25T11:15:00',
    content: 'I have to disagree with the second point. While I understand the perspective, recent data suggests a different trend in the market.',
    avatar: 'https://picsum.photos/seed/user2/50/50'
  },
  {
    id: '3',
    author: 'Robert Taylor',
    date: '2023-10-25T12:45:00',
    content: 'Great read! I have shared this with my colleagues. Looking forward to the follow-up piece.',
    avatar: 'https://picsum.photos/seed/user3/50/50'
  }
];