
import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { DownloadIcon } from './icons/DownloadIcon';

interface ImageDisplayProps {
  originalImage: string | null;
  editedImage: string | null;
  isLoading: boolean;
  modelResponseText: string | null;
}

const ImagePanel: React.FC<{ title: string; imageUrl: string | null; children?: React.ReactNode; onDownload?: () => void }> = ({ title, imageUrl, children, onDownload }) => (
  <div className="w-full flex flex-col">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
      {onDownload && (
        <button onClick={onDownload} className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200 text-sm">
            <DownloadIcon className="w-4 h-4" />
            Download
        </button>
      )}
    </div>
    <div className="aspect-square w-full rounded-lg bg-gray-800 border-2 border-dashed border-gray-600 flex items-center justify-center overflow-hidden">
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="w-full h-full object-contain" />
      ) : (
        children
      )}
    </div>
  </div>
);


const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImage, editedImage, isLoading, modelResponseText }) => {
    
    const handleDownload = () => {
        if (editedImage) {
            const link = document.createElement('a');
            link.href = editedImage;
            link.download = 'edited-image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    
    return (
    <div className="flex flex-col flex-1 p-6 bg-gray-900/50 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImagePanel title="Original" imageUrl={originalImage}>
          <div className="text-center text-gray-500">
            <p>Upload an image to start</p>
          </div>
        </ImagePanel>
        <ImagePanel title="Edited" imageUrl={editedImage} onDownload={editedImage ? handleDownload : undefined}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="text-center text-gray-500">
              <p>Your AI-edited image will appear here</p>
            </div>
          )}
        </ImagePanel>
      </div>
      {modelResponseText && !isLoading && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <h4 className="font-semibold text-gray-300 mb-2">AI Message:</h4>
            <p className="text-gray-400 text-sm">{modelResponseText}</p>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
