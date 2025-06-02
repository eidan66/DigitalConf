interface GenerateImageParams {
  prompt: string;
}

interface GenerateImageResponse {
  url: string;
}

// Add a mapping for specific speaker images
const speakerImageMap: { [key: string]: string } = {
  // Add speaker names and their image URLs here
  'sarah johnson': 'https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tYW58ZW58MHx8MHx8fDA%3D',
  'emily rodriguez':'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdvbWFufGVufDB8fDB8fHww',
  'lisa thompson':'https://plus.unsplash.com/premium_photo-1694557636097-5969bae91ba8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHdvbWFufGVufDB8fDB8fHww',
  'michael chen': 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fHww',
  'david kim':'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww',
  'james wilson':'https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1hbnxlbnwwfHwwfHx8MA%3D%3D'
};

export const GenerateImage = async ({ prompt }: GenerateImageParams): Promise<GenerateImageResponse> => {
  console.log(`Mock GenerateImage called with prompt: "${prompt}"`);
  
  let imageUrl = 'https://placehold.co/600x400?text=Image+Placeholder'; // Default fallback

  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes('conference stage')) {
    imageUrl = 'https://images.unsplash.com/photo-1596522354195-e84ae3c98731?q=80&w=3574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  } else if (lowerPrompt.includes('marketing workspace')) {
    imageUrl = 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  } else if (lowerPrompt.includes('headshot') || lowerPrompt.includes('professional')) {
    // Attempt to extract a name from the prompt
    const nameMatch = lowerPrompt.match(/of (\w+\s\w+)/);
    const speakerName = nameMatch && nameMatch[1] ? nameMatch[1] : null;

    if (speakerName && speakerImageMap[speakerName]) {
      // Use the specific image from the map if found
      imageUrl = speakerImageMap[speakerName];
    } else {
      // Otherwise, use Lorem Picsum for a seeded random headshot
      const seed = speakerName || 'random'; // Use name as seed if available, fallback to 'random'
      imageUrl = `https://picsum.photos/seed/${seed}/160/160`;
    }
  } else if (lowerPrompt.includes('confirmation')) {
      // Placeholder for confirmation image
      imageUrl = 'https://plus.unsplash.com/premium_vector-1727953896380-3cfb75a48623?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBwcm92ZXxlbnwwfHwwfHx8MA%3D%3D';
  }

  return Promise.resolve({ 
    url: imageUrl 
  });
};

interface UploadFileParams {
  file: File;
}

interface UploadFileResponse {
  file_url: string;
}

export const UploadFile = async ({ file }: UploadFileParams): Promise<UploadFileResponse> => {
  console.log(`Mock UploadFile called with file: ${file.name}`);
  return Promise.resolve({ 
    file_url: `https://picsum.photos/800/400?random=${Math.random()}` 
  });
};

interface ExtractDataParams {
  file_url: string;
}

interface ExtractDataResponse {
  status: 'success' | 'error';
  output: Record<string, unknown>;
}

export const ExtractDataFromUploadedFile = async ({ 
  file_url, 
}: ExtractDataParams): Promise<ExtractDataResponse> => {
  console.log(`Mock ExtractData called with file: ${file_url}`);
  return Promise.resolve({ 
    status: 'success', 
    output: {} 
  });
}; 