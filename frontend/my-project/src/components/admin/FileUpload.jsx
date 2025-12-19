import React, { useCallback } from 'react';
import { getFileUrl } from '../../utils/apiUtils';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';

const FileUpload = ({ file, onChange, accept = { 'image/*': [], 'application/pdf': [] }, maxSize = 5242880 }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      onChange({
        file: selectedFile,
        preview: URL.createObjectURL(selectedFile),
        name: selectedFile.name,
        type: selectedFile.type
      });
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false
  });

  const removeFile = () => {
    onChange(null);
  };

  return (
    <div>
      {!file ? (
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
            <p className="text-blue-600 font-medium">Drop the file here...</p>
          ) : (
            <div>
              <p className="text-gray-600 mb-2">
                Drag & drop a file here, or click to select
              </p>
              <p className="text-sm text-gray-400">
                PDF or Images (Max 5MB)
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4 relative group border border-gray-200 rounded-lg p-4 flex items-center">
          <div className="mr-4">
            {file.type?.startsWith('image/') || file.name?.match(/\.(jpg|jpeg|png|gif)$/i) ? (
              <img
                src={file.preview || getFileUrl(file.name)}
                alt={file.name}
                className="w-16 h-16 object-cover rounded-lg"
                onError={(e) => { 
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgMTUwIDE1MCI+PHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOWNhM2FmIj5GaWxlPC90ZXh0Pjwvc3ZnPg=="; 
                }}
              />
            ) : (
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                <FileText size={32} />
              </div>
            )}
          </div>
          <div className="flex-grow overflow-hidden">
            <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
            <p className="text-xs text-gray-500 uppercase">{file.type?.split('/')[1] || 'FILE'}</p>
          </div>
          <button
            type="button"
            onClick={removeFile}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
