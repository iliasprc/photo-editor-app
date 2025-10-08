
import React, { useState, useCallback } from 'react';
import { PROMPT_TEMPLATES } from './constants';
import { PromptTemplate } from './types';
import { editImage } from './services/geminiService';
import ImageDisplay from './components/ImageDisplay';
import { UploadIcon } from './components/icons/UploadIcon';
import { MagicWandIcon } from './components/icons/MagicWandIcon';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modelResponseText, setModelResponseText] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setEditedImage(null);
      setModelResponseText(null);
      setError(null);
    }
  };

  const handlePromptTemplateClick = (template: PromptTemplate) => {
    setPrompt(template.prompt);
  };
  
  const base64ToBinary = (base64: string): string => {
    const base64WithoutPrefix = base64.split(',')[1] || base64;
    return base64WithoutPrefix;
  }

  const handleGenerate = useCallback(async () => {
    if (!originalImage || !prompt) {
      setError("Please upload an image and enter a prompt.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setEditedImage(null);
    setModelResponseText(null);

    try {
      const base64Data = base64ToBinary(originalImage);
      const mimeType = originalImageFile?.type || 'image/png';
      
      const result = await editImage(base64Data, mimeType, prompt);
      
      setEditedImage(result.editedImage);
      setModelResponseText(result.modelText);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, originalImageFile, prompt]);
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            AI Photo Studio
          </h1>
          <p className="mt-2 text-lg text-gray-400">Edit your photos with the power of Gemini.</p>
        </header>

        <main className="flex flex-col lg:flex-row gap-8">
          {/* Controls Panel */}
          <div className="w-full lg:w-1/3 lg:max-w-md flex flex-col gap-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-200">1. Upload Image</h2>
                <label htmlFor="image-upload" className="w-full cursor-pointer bg-gray-700 hover:bg-gray-600 border-2 border-dashed border-gray-500 rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors">
                    <UploadIcon className="w-10 h-10 text-gray-400 mb-2"/>
                    <span className="text-gray-300 font-medium">
                        {originalImageFile ? originalImageFile.name : 'Click to upload'}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 10MB</span>
                </label>
                <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-200">2. Describe Your Edit</h2>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., Make the sky look like a galaxy."
                    className="w-full h-28 p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-gray-200 placeholder-gray-400"
                />
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Or try a template:</h3>
                    <div className="flex flex-wrap gap-2">
                        {PROMPT_TEMPLATES.map(template => (
                            <button
                                key={template.id}
                                onClick={() => handlePromptTemplateClick(template)}
                                className="px-3 py-1.5 bg-gray-700 hover:bg-indigo-600 text-gray-300 hover:text-white rounded-full text-sm transition-colors"
                            >
                                {template.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!originalImage || !prompt || isLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              <MagicWandIcon className="w-6 h-6" />
              {isLoading ? 'Generating...' : 'Generate Edit'}
            </button>
            {error && <div className="mt-2 text-center text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</div>}
          </div>

          {/* Image Display Panel */}
          <div className="flex-1">
             <ImageDisplay
                originalImage={originalImage}
                editedImage={editedImage}
                isLoading={isLoading}
                modelResponseText={modelResponseText}
             />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
