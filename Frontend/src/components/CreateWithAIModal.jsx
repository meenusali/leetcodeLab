import React, { useState } from 'react';
import { X, Wand2, Sparkles, Brain } from 'lucide-react';

const CreateWithAIModal = ({ isOpen, onClose, onSubmit }) => {
  const [prompt, setPrompt] = useState('');
  const [difficulty, setDifficulty] = useState('EASY');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit({ prompt, difficulty });
      onClose();
    } catch (error) {
      console.error('Error generating problem:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-base-100 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="flex justify-between items-start sm:items-center p-4 sm:p-6 border-b border-base-300 sticky top-0 bg-base-100 z-10">
          <div className="flex items-start sm:items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg shrink-0">
              <Wand2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Create with AI</h2>
              <p className="text-base-content/60 text-xs sm:text-sm mt-0.5 sm:mt-1">
                Describe your problem and let AI generate it for you
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="btn btn-ghost btn-sm btn-circle"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Tips and Guidelines Section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <h3 className="text-base sm:text-lg font-semibold">Problem Description Guidelines</h3>
            </div>
            
            <div className="bg-base-200 rounded-lg p-3 sm:p-4">
              <div className="prose prose-sm max-w-none text-base-content/70">
                <p className="mb-2 sm:mb-3 text-sm sm:text-base">Include the following in your description:</p>
                <ul className="space-y-1.5 sm:space-y-2 list-disc list-inside marker:text-primary text-sm sm:text-base">
                  <li>Problem type (e.g., Array, String, DP)</li>
                  <li>Input/Output specifications</li>
                  <li>Constraints and limitations</li>
                  <li>Example test cases</li>
                  <li>Time/space complexity requirements</li>
                </ul>
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-3 sm:p-4 border border-primary/10">
              <p className="text-xs sm:text-sm text-base-content/70">
                Example: "Create a problem about finding the longest palindromic substring in a string. 
                The string length should be between 1 and 1000 characters, containing only alphanumeric characters. 
                Include test cases for empty string and single character inputs."
              </p>
            </div>
          </div>

          {/* Input Section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
              <div className="form-control w-full sm:w-40">
                <label className="label py-1 sm:py-2">
                  <span className="label-text font-medium flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-warning" />
                    Difficulty
                  </span>
                </label>
                <select
                  className="select select-bordered select-sm sm:select-md w-full"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
              </div>
              <div className="text-xs sm:text-sm text-base-content/60">
                {prompt.length > 0 && (
                  <span>{prompt.length} characters</span>
                )}
              </div>
            </div>

            <textarea
              className="textarea textarea-bordered w-full h-32 sm:h-48 text-sm sm:text-base leading-relaxed"
              placeholder="Describe your coding problem here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-base-300 p-4 sm:p-6 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 bg-base-100 sticky bottom-0">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost btn-sm sm:btn-md w-full sm:w-auto"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-primary btn-sm sm:btn-md w-full sm:w-auto sm:min-w-[140px]"
            disabled={!prompt.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-xs sm:loading-sm"></span>
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 sm:w-5 sm:h-5" />
                Generate
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateWithAIModal; 