// Search utility for the blog
export type SearchResult = {
  slug: string;
  title: string;
  description: string;
  matchScore: number;
};

export type PostMetadata = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  content?: string;
};

// Search function that matches posts by title, description, and tags
export const searchPosts = (
  query: string,
  posts: PostMetadata[]
): SearchResult[] => {
  if (!query.trim()) return [];

  const searchTerms = query.toLowerCase().split(' ').filter(Boolean);
  
  return posts
    .map((post) => {
      const titleMatches = searchTerms.filter(term => 
        post.title.toLowerCase().includes(term)
      ).length;
      
      const descriptionMatches = searchTerms.filter(term => 
        post.description.toLowerCase().includes(term)
      ).length;
      
      const tagMatches = post.tags
        ? searchTerms.filter(term => 
            post.tags.some(tag => tag.toLowerCase().includes(term))
          ).length
        : 0;
      
      const contentMatches = post.content
        ? searchTerms.filter(term => 
            post.content!.toLowerCase().includes(term)
          ).length
        : 0;
      
      // Calculate match score - gives higher weight to title and tag matches
      const matchScore = 
        titleMatches * 3 + 
        tagMatches * 2 + 
        descriptionMatches * 1 +
        contentMatches * 0.5;
      
      return {
        slug: post.slug,
        title: post.title,
        description: post.description,
        matchScore
      };
    })
    .filter(result => result.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);
}; 