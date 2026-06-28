// see conversation version
import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com/repos/YOUR_GITHUB_USERNAME/cine-flux-content/contents';

export interface RecapContent {
  title: string;
  script: string;
  tags: string[];
}

export const fetchRecapData = async (filePath: string): Promise<RecapContent | null> => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE}/${filePath}`, {
      headers: {
        // Uncomment and use VITE_GITHUB_TOKEN in .env if the repo is private
        // Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3.raw',
      },
    });
    
    // Assuming the file is a JSON metadata file
    return response.data as RecapContent;
  } catch (error) {
    console.error('Failed to fetch from GitHub:', error);
    return null;
  }
};

