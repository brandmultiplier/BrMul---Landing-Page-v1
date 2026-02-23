const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

// Read CSV file
const csvPath = path.join(__dirname, '..', 'Brandmultiplier.ai - Blog Posts.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV with papaparse
const result = Papa.parse(csvContent, {
  header: true,
  skipEmptyLines: true,
});

console.log('Total rows parsed:', result.data.length);

const posts = [];

// Valid slug pattern: lowercase letters, numbers, hyphens only
const validSlugPattern = /^[a-z0-9-]+$/;

for (const row of result.data) {
  const name = (row['Name'] || '').trim();
  const slug = (row['Slug'] || '').trim();
  const archived = row['Archived'] === 'TRUE';
  const draft = row['Draft'] === 'TRUE';
  
  // Skip if no name/slug
  if (!name || !slug) continue;
  
  // Skip if draft/archived
  if (draft || archived) continue;
  
  // Skip if the name looks like HTML content (parsing error)
  if (name.startsWith('<') || name.startsWith(' ')) continue;
  
  // Skip if slug is not a valid URL slug
  if (!validSlugPattern.test(slug)) continue;
  
  // Skip if slug is too short (likely invalid)
  if (slug.length < 5) continue;
  
  // Skip if name is too short (likely invalid)
  if (name.length < 10) continue;
  
  const post = {
    name: name,
    slug: slug,
    collectionId: row['Collection ID'] || '',
    localeId: row['Locale ID'] || '',
    itemId: row['Item ID'] || '',
    createdOn: row['Created On'] || '',
    updatedOn: row['Updated On'] || '',
    publishedOn: row['Published On'] || '',
    postBody: row['Post Body'] || '',
    postSummary: row['Post Summary'] || '',
    mainImage: row['Main Image'] || '',
    thumbnailImage: row['Thumbnail image'] || '',
    featured: row['Featured?'] === 'TRUE',
    color: row['Color'] || '',
    author: row['Author'] || '',
  };
  
  // Validate author - must not look like HTML
  if (post.author.includes('<') || post.author.includes('>') || post.author.length > 50) {
    post.author = '';
  }
  
  // Only add if we have valid post body (should contain HTML)
  if (post.postBody && post.postBody.includes('<')) {
    posts.push(post);
  }
}

// Remove duplicates by slug
const uniquePosts = [];
const seenSlugs = new Set();
for (const post of posts) {
  if (!seenSlugs.has(post.slug)) {
    seenSlugs.add(post.slug);
    uniquePosts.push(post);
  }
}

console.log(`\nValid unique posts found: ${uniquePosts.length}`);

// Sort by published date (newest first)
uniquePosts.sort((a, b) => {
  const dateA = new Date(a.publishedOn);
  const dateB = new Date(b.publishedOn);
  if (isNaN(dateA.getTime())) return 1;
  if (isNaN(dateB.getTime())) return -1;
  return dateB.getTime() - dateA.getTime();
});

console.log('\nAll post titles:');
uniquePosts.forEach((p, i) => console.log(`  ${i + 1}. ${p.name}`));

// Write to JSON file
const outputPath = path.join(__dirname, '..', 'src', 'data', 'blog-posts.json');
const outputDir = path.dirname(outputPath);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(uniquePosts, null, 2));

console.log(`\nJSON file written to: ${outputPath}`);
console.log(`Total posts exported: ${uniquePosts.length}`);

// List all unique authors
const authors = [...new Set(uniquePosts.map(p => p.author).filter(a => a))];
console.log(`\nUnique authors: ${authors.length}`);
authors.forEach(a => console.log(`  - ${a}`));

// Check for featured posts
const featuredPosts = uniquePosts.filter(p => p.featured);
console.log(`\nFeatured posts: ${featuredPosts.length}`);
featuredPosts.forEach(p => console.log(`  - ${p.name}`));
