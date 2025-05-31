import React, { useState } from 'react';
import { Upload, Download, X } from 'lucide-react';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

const ImportExportModal = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
    } else {
      toast.error('Please select a valid CSV file');
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('csv', file);

      const response = await axiosInstance.post('/problems/import-problems', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success(response.data.message || 'Problems imported successfully');
      onClose();
    } catch (error) {
      console.error('Import error:', error);
      toast.error(error.response?.data?.error || 'Error importing problems');
    } finally {
      setIsLoading(false);
      setFile(null);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get('/problems/download-template', {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'problem_template.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success('Template downloaded successfully');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Error downloading template');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-base-100 rounded-lg shadow-xl w-full max-w-md p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Import/Export Problems</h3>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Download Template</label>
            <button
              onClick={handleDownloadTemplate}
              className="btn btn-primary w-full gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <Download className="w-4 h-4" />
              )}
              Download CSV Template
            </button>
          </div>

          <div className="divider">OR</div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Import Problems</label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
            />
            {file && (
              <p className="text-sm text-success">
                Selected file: {file.name}
              </p>
            )}
            <button
              onClick={handleImport}
              className="btn btn-secondary w-full gap-2"
              disabled={!file || isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <Upload className="w-4 h-4" />
              )}
              Import Problems
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportExportModal; 