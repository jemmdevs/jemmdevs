// View counter utility using localStorage

export const VIEW_COUNTER_KEY = 'blog-post-views';

// Get post views from localStorage
export const getPostViews = (slug: string): number => {
  if (typeof localStorage === 'undefined') return 0;
  
  try {
    const viewsData = localStorage.getItem(VIEW_COUNTER_KEY);
    if (!viewsData) return 0;
    
    const views = JSON.parse(viewsData);
    return views[slug] || 0;
  } catch (error) {
    console.error('Error getting post views:', error);
    return 0;
  }
};

// Increment post views
export const incrementPostViews = (slug: string): number => {
  if (typeof localStorage === 'undefined') return 0;
  
  try {
    const viewsData = localStorage.getItem(VIEW_COUNTER_KEY);
    const views = viewsData ? JSON.parse(viewsData) : {};
    
    const newCount = (views[slug] || 0) + 1;
    views[slug] = newCount;
    
    localStorage.setItem(VIEW_COUNTER_KEY, JSON.stringify(views));
    return newCount;
  } catch (error) {
    console.error('Error incrementing post views:', error);
    return 0;
  }
}; 