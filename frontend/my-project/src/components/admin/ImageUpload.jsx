import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const ImageUpload = ({ images = [], onChange, multiple = false, maxFiles = 5, allowVideo = false }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      type: file.type
    }));

    if (multiple) {
      onChange([...images, ...newImages].slice(0, maxFiles));
    } else {
      onChange(newImages);
    }
  }, [images, onChange, multiple, maxFiles]);

  const accept = allowVideo 
    ? {
        'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
        'video/*': ['.mp4', '.webm', '.ogg']
      }
    : {
        'image/*': ['.jpeg', '.jpg', '.png', '.gif']
      };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
    maxFiles: multiple ? maxFiles : 1,
  });

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const isVideo = (file) => {
    return file.type?.startsWith('video/') || file.name?.match(/\.(mp4|webm|ogg)$/i);
  };

  return (
    <div>
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto mb-4 text-gray-400" size={48} />
        {isDragActive ? (
          <p className="text-blue-600 font-medium">Drop the files here...</p>
        ) : (
          <div>
            <p className="text-gray-600 mb-2">
              Drag & drop {multiple ? 'files' : 'a file'} here, or click to select
            </p>
            <p className="text-sm text-gray-400">
              {multiple ? `Max ${maxFiles} files` : 'Single file'} • {allowVideo ? 'JPG, PNG, GIF, MP4' : 'JPG, PNG, GIF'}
            </p>
          </div>
        )}
      </div>

      {/* Image/Video Previews */}
      {images.length > 0 && (
        <div className={`mt-4 grid ${multiple ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'} gap-4`}>
          {images.map((image, index) => (
            <div key={index} className="relative group">
              {isVideo(image.file || image) ? (
                <video
                  src={image.preview || image}
                  className="w-full h-40 object-cover rounded-lg border border-gray-200 bg-gray-100"
                  controls
                  playsInline
                  muted
                />
              ) : (
                <img
                  src={image.preview || image}
                  alt={image.name}
                  className="w-full h-40 object-cover rounded-lg border border-gray-200"
                />
              )}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 rounded-b-lg truncate">
                {image.name || 'Uploaded File'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
