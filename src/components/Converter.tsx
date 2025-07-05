import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Download, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import toast from 'react-hot-toast';

interface ConversionJob {
  jobId: string;
  status: 'pending' | 'starting' | 'loading_photopea' | 'photopea_loaded' | 'pdf_loaded' | 'pdf_processed' | 'psd_exported' | 'completed' | 'error';
  progress: number;
  fileName?: string;
  downloadUrl?: string;
  error?: string;
}

const Converter: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentJob, setCurrentJob] = useState<ConversionJob | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('conversion-progress', (data: ConversionJob) => {
      setCurrentJob(data);
      
      if (data.status === 'completed') {
        setIsConverting(false);
        toast.success('Conversion completed! Your PSD file is ready for download.');
      } else if (data.status === 'error') {
        setIsConverting(false);
        toast.error(`Conversion failed: ${data.error}`);
      }
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      toast.error('File size must be less than 50MB');
      return;
    }

    try {
      setIsConverting(true);
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('pdf', file);

      // Upload file
      const uploadResponse = await axios.post('http://localhost:3001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { jobId } = uploadResponse.data;
      
      // Start conversion
      await axios.post('http://localhost:3001/api/convert', { jobId });
      
      toast.success('File uploaded successfully! Starting conversion...');
      
    } catch (error) {
      setIsConverting(false);
      console.error('Upload error:', error);
      toast.error('Failed to upload file. Please try again.');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'starting':
        return 'Initializing conversion...';
      case 'loading_photopea':
        return 'Loading Photopea...';
      case 'photopea_loaded':
        return 'Photopea loaded successfully';
      case 'pdf_loaded':
        return 'PDF file loaded';
      case 'pdf_processed':
        return 'Processing PDF layers...';
      case 'psd_exported':
        return 'Exporting to PSD...';
      case 'completed':
        return 'Conversion completed!';
      case 'error':
        return 'Conversion failed';
      default:
        return 'Ready to convert';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Loader className="w-5 h-5 text-blue-500 animate-spin" />;
    }
  };

  const handleDownload = () => {
    if (currentJob?.downloadUrl) {
      const link = document.createElement('a');
      link.href = `http://localhost:3001${currentJob.downloadUrl}`;
      link.download = currentJob.fileName || 'converted.psd';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Canva to PSD Converter
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Convert your Canva designs to Photoshop PSD files with preserved layers. 
            Export your Canva design as PDF, upload it here, and get a PSD file ready for editing in Photoshop.
          </p>
        </div>

        {/* Upload Area */}
        <div className="mb-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            } ${isConverting ? 'pointer-events-none opacity-50' : ''}`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              {isDragActive ? 'Drop your PDF here' : 'Drag & drop your PDF here'}
            </p>
            <p className="text-gray-500 mb-4">
              or click to browse files
            </p>
            <p className="text-sm text-gray-400">
              Only PDF files are supported (max 50MB)
            </p>
          </div>
        </div>

        {/* Conversion Progress */}
        {currentJob && (
          <div className="mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(currentJob.status)}
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {getStatusMessage(currentJob.status)}
                    </h3>
                    {currentJob.fileName && (
                      <p className="text-sm text-gray-500">
                        File: {currentJob.fileName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-blue-600">
                    {currentJob.progress}%
                  </span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${currentJob.progress}%` }}
                />
              </div>

              {/* Download Button */}
              {currentJob.status === 'completed' && currentJob.downloadUrl && (
                <div className="mt-4">
                  <button
                    onClick={handleDownload}
                    className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download PSD File</span>
                  </button>
                </div>
              )}

              {/* Error Message */}
              {currentJob.status === 'error' && currentJob.error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">
                    Error: {currentJob.error}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">
            How to use:
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Export your Canva design as a PDF file</li>
            <li>Upload the PDF file using the drop zone above</li>
            <li>Wait for the conversion to complete (usually takes 1-2 minutes)</li>
            <li>Download your PSD file ready for Photoshop</li>
          </ol>
          <div className="mt-4 p-4 bg-blue-100 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> The conversion preserves text layers, images, and basic shapes. 
              Some complex effects may need manual adjustment in Photoshop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter; 