import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Download, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import toast from 'react-hot-toast';
import { uploadFile, startConversion, getJobStatus } from '../services/api';

interface ConversionJob {
  jobId: string;
  status: 'pending' | 'starting' | 'loading_photopea' | 'photopea_loaded' | 'pdf_loaded' | 'pdf_processed' | 'psd_exported' | 'completed' | 'completed_with_photopea' | 'completed_with_fallback' | 'error';
  progress: number;
  fileName?: string;
  downloadUrl?: string;
  error?: string;
  warning?: string;
}

const Converter: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const [currentJob, setCurrentJob] = useState<ConversionJob | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [zeroConversionsError, setZeroConversionsError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('https://civchange-be-production.up.railway.app', {
      transports: ['websocket', 'polling'],
      timeout: 20000,
    });
    setSocket(newSocket);
    socketRef.current = newSocket;

    newSocket.on('connect', () => {
      console.log('WebSocket connected');
    });

    newSocket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      toast.error('Failed to connect to server');
    });

    newSocket.on('conversion-progress', (data: ConversionJob) => {
      console.log('Conversion progress:', data);
      setCurrentJob((prev: ConversionJob | null) => ({
        ...prev,
        ...data,
        status: data.status || prev?.status || 'pending',
      }));

      if (
        data.status === 'completed' ||
        data.status === 'completed_with_photopea' ||
        data.status === 'completed_with_fallback'
      ) {
        setIsConverting(false);
        toast.success('Conversion completed! Your PSD file is ready for download.');
      } else if (data.status === 'error') {
        setIsConverting(false);
        toast.error(`Conversion failed: ${data.error}`);
      }
    });

    // Add conversion-complete event listener
    newSocket.on('conversion-complete', (data: ConversionJob) => {
      console.log('Conversion complete:', data);
      setCurrentJob(data);
      setIsConverting(false);
      toast.success('Conversion completed! Your PSD file is ready for download.');
    });

    newSocket.on('disconnect', () => {
      console.log('WebSocket disconnected');
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
      setCurrentJob(null); // Reset previous job
      setZeroConversionsError(null); // Reset error
      
      console.log('Uploading file:', file.name, 'Size:', file.size);
      
      // Upload file using API service
      const uploadResponse = await uploadFile(file);
      console.log('Upload response:', uploadResponse);
      const { jobId } = uploadResponse;
      
      // Emit join-job event BEFORE starting conversion
      if (socketRef.current) {
        socketRef.current.emit('join-job', jobId);
      }

      // Start conversion using API service
      await startConversion(jobId);
      
      toast.success('File uploaded successfully! Starting conversion...');
      
    } catch (error: any) {
      setIsConverting(false);
      console.error('Upload error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        const msg = error.response.data?.message?.toLowerCase() || '';
        if (error.response.data?.error) {
          setZeroConversionsError(error.response.data.error);
          scrollToPricing();
        } else if (
          msg.includes('no conversions left') ||
          (msg.includes('conversions') && msg.includes('0')) ||
          msg.includes('out of conversions') ||
          msg.includes('only 1 conversion allowed') ||
          msg.includes('upgrade')
        ) {
          setZeroConversionsError('0 conversions left. Please upgrade.');
          scrollToPricing();
        } else {
          toast.error(`Upload failed: ${error.response.data?.message || error.response.statusText}`);
        }
      } else if (error.request) {
        toast.error('Network error: Unable to reach the server');
      } else {
        toast.error('Failed to upload file. Please try again.');
      }
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
      case 'initializing_photopea':
        return 'Initializing Photopea...';
      case 'photopea_initialized':
        return 'Photopea initialized successfully';
      case 'Preparing PDF for conversion...':
        return 'Preparing PDF for conversion...';
      case 'Converting PDF to PSD...':
        return 'Converting PDF to PSD...';
      case 'PSD generated, saving file...':
        return 'PSD generated, saving file...';
      case 'PSD file saved successfully':
        return 'PSD file saved successfully';
      case 'completed':
      case 'completed_with_photopea':
        return 'Conversion completed!';
      case 'completed_with_fallback':
        return 'Conversion completed (basic conversion)';
      case 'error':
        return 'Conversion failed';
      default:
        return status || 'Ready to convert';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'completed_with_photopea':
      case 'completed_with_fallback':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Loader className="w-5 h-5 text-blue-500 animate-spin" />;
    }
  };

  const handleDownload = () => {
    if (currentJob?.downloadUrl) {
      const safeUrl = currentJob.downloadUrl.startsWith('/')
        ? currentJob.downloadUrl
        : '/' + currentJob.downloadUrl;

      const link = document.createElement('a');
      link.href = `https://civchange-be-production.up.railway.app${safeUrl}`;
      link.download = currentJob.fileName || 'converted.psd';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setIsConverting(false);
    setCurrentJob(null);
    toast.success('Reset successful. You can now upload a new file.');
  };

  const scrollToPricing = () => {
    const section = document.getElementById('pricing');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to determine if download button should show
  const canShowDownloadButton = (job: ConversionJob | null) => {
    if (!job) return false;

    const safeStatus = job.status?.toLowerCase?.() || '';

    return (
      job.downloadUrl &&
      (
        safeStatus.includes('completed') ||
        safeStatus.includes('saved') ||
        safeStatus.includes('psd') ||
        safeStatus === 'pending'
      )
    );
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
          {zeroConversionsError && (
            <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded text-center text-lg font-semibold">
              {zeroConversionsError}
            </div>
          )}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            } ${isConverting ? 'pointer-events-none opacity-50' : ''}`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              {isDragActive ? 'Drop the PDF file here' : 'Drag & drop a PDF file here'}
            </p>
            <p className="text-gray-500">or click to browse</p>
            <p className="text-sm text-gray-400 mt-2">Maximum file size: 50MB</p>
          </div>
        </div>

        {/* Progress Section */}
        {currentJob && (
          <div className="mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(currentJob.status)}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {currentJob.fileName || 'Converting...'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {getStatusMessage(currentJob.status)}
                    </p>
                    {currentJob.warning && (
                      <p className="text-sm text-yellow-600 mt-1">
                        ⚠ {currentJob.warning}
                      </p>
                    )}
                  </div>
                </div>
                {currentJob.progress !== undefined && (
                  <span className="text-sm font-medium text-gray-500">
                    {currentJob.progress}%
                  </span>
                )}
              </div>
              
              {currentJob.progress !== undefined && (
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${currentJob.progress}%` }}
                  ></div>
                </div>
              )}

              {canShowDownloadButton(currentJob) && (
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PSD
                  </button>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Convert Another File
                  </button>
                </div>
              )}

              {currentJob.status === 'error' && (
                <div className="text-center">
                  <p className="text-red-600 mb-4">{currentJob.error}</p>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-3">How to use:</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Export your Canva design as a PDF file</li>
            <li>Drag and drop the PDF file above or click to browse</li>
            <li>Wait for the conversion to complete</li>
            <li>Download your PSD file with preserved layers</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Converter;