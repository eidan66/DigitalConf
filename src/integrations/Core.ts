// Types
interface GenerateImageParams {
  prompt: string;
}

interface GenerateImageResponse {
  url: string;
}

interface UploadFileParams {
  file: File;
}

interface UploadFileResponse {
  file_url: string;
}

interface ExtractDataParams {
  file_url: string;
}

interface ExtractDataResponse {
  status: 'success' | 'error';
  output: Record<string, unknown>;
}

// Constants
const DEFAULT_IMAGE_URL = 'https://placehold.co/600x400?text=Image+Placeholder';

export const SPEAKER_IMAGES: Record<string, string> = {
  'sarah johnson': 'https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tYW58ZW58MHx8MHx8fDA%3D',
  'emily rodriguez': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdvbWFufGVufDB8fDB8fHww',
  'lisa thompson': 'https://plus.unsplash.com/premium_photo-1694557636097-5969bae91ba8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHdvbWFufGVufDB8fDB8fHww',
  'michael chen': 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fHww',
  'david kim': 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww',
  'james wilson': 'https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1hbnxlbnwwfHwwfHx8MA%3D%3D'
};

const SCENE_IMAGES: Record<string, string> = {
  'conference stage': 'https://images.unsplash.com/photo-1596522354195-e84ae3c98731?q=80&w=3574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'marketing workspace': 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'confirmation': 'https://plus.unsplash.com/premium_vector-1727953896380-3cfb75a48623?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBwcm92ZXxlbnwwfHwwfHx8MA%3D%3D'
};

// Helper functions
const extractSpeakerName = (prompt: string): string | null => {
  const nameMatch = prompt.toLowerCase().match(/of (\w+\s\w+)/);
  return nameMatch?.[1] || null;
};

const getSpeakerImage = (speakerName: string | null): string => {
  if (!speakerName) return `https://picsum.photos/seed/random/160/160`;
  return SPEAKER_IMAGES[speakerName] || `https://picsum.photos/seed/${speakerName}/160/160`;
};

// Main functions
export const GenerateImage = async ({ prompt }: GenerateImageParams): Promise<GenerateImageResponse> => {
  try {
    const lowerPrompt = prompt.toLowerCase();
    
    // Check for scene images first
    for (const [key, url] of Object.entries(SCENE_IMAGES)) {
      if (lowerPrompt.includes(key)) {
        return { url };
      }
    }

    // Handle headshot/professional images
    if (lowerPrompt.includes('headshot') || lowerPrompt.includes('professional')) {
      const speakerName = extractSpeakerName(lowerPrompt);
      return { url: getSpeakerImage(speakerName) };
    }

    return { url: DEFAULT_IMAGE_URL };
  } catch (error) {
    console.error('Error generating image:', error);
    return { url: DEFAULT_IMAGE_URL };
  }
};

export const UploadFile = async ({ file }: UploadFileParams): Promise<UploadFileResponse> => {
  try {
    console.log(`Mock UploadFile called with file: ${file.name}`);
    return { 
      file_url: `https://picsum.photos/800/400?random=${Math.random()}` 
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }
};

export const ExtractDataFromUploadedFile = async ({ 
  file_url 
}: ExtractDataParams): Promise<ExtractDataResponse> => {
  try {
    console.log(`Mock ExtractData called with file: ${file_url}`);
    return { 
      status: 'success', 
      output: {} 
    };
  } catch (error) {
    console.error('Error extracting data:', error);
    return {
      status: 'error',
      output: { error: 'Failed to extract data from file' }
    };
  }
}; 