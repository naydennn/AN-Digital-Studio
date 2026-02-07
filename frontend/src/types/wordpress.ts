export interface WPPost {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails: {
        width: number;
        height: number;
      };
    };
  } | null;
  author: {
    node: {
      name: string;
      avatar: {
        url: string;
      };
    };
  };
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  tags: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
}

export interface WPPortfolio {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails: {
        width: number;
        height: number;
      };
    };
  } | null;
  portfolioFields: {
    clientName: string;
    projectUrl: string;
    technologies: string[];
    category: string;
  };
}

export interface WPPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

export interface WPSiteSettings {
  title: string;
  description: string;
  url: string;
}

export interface WPGraphQLResponse<T> {
  data: T;
  errors?: { message: string }[];
}
