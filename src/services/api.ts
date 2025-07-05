import axios from 'axios';

const API_BASE_URL = 'https://civchange-be-production.up.railway.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

export interface UploadResponse {
  jobId: string;
  message: string;
  fileName: string;
}

export interface ConversionJob {
  jobId: string;
  status: string;
  progress: number;
  fileName?: string;
  downloadUrl?: string;
  error?: string;
}

export const uploadFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('pdf', file);

  const response = await api.post<UploadResponse>('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const startConversion = async (jobId: string): Promise<void> => {
  await api.post('/api/convert', { jobId });
};

export const getJobStatus = async (jobId: string): Promise<ConversionJob> => {
  const response = await api.get<ConversionJob>(`/api/job/${jobId}`);
  return response.data;
};

export default api; 