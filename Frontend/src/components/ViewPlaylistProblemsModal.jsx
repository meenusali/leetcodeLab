import React from 'react';
import { Link } from 'react-router-dom';
import { X, Code2, CheckCircle2, Building } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const ViewPlaylistProblemsModal = ({ isOpen, onClose, playlist }) => {
  const { authUser } = useAuthStore();

  if (!isOpen || !playlist) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-base-200 rounded-2xl w-full max-w-4xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-base-300">
          <div>
            <h2 className="text-xl font-semibold">{playlist.name}</h2>
            {playlist.description && (
              <p className="text-sm text-gray-400 mt-1">{playlist.description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {playlist.problems?.map(({ problem }) => {
              if (!problem) return null;
              
              const isSolved = problem.solvedBy?.some(
                (user) => user.userId === authUser?.id
              ) || false;

              return (
                <Link
                  key={problem.id}
                  to={`/problem/${problem.id}`}
                  className="block p-4 bg-base-100 rounded-xl hover:bg-base-300/20 transition-colors"
                  onClick={onClose}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {isSolved ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <Code2 className="w-5 h-5 text-gray-500" />
                      )}
                      <div>
                        <h3 className="font-medium hover:text-primary transition-colors">
                          {problem.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              problem.Difficulty === "EASY"
                                ? "bg-green-500/10 text-green-500"
                                : problem.Difficulty === "MEDIUM"
                                ? "bg-yellow-500/10 text-yellow-500"
                                : "bg-red-500/10 text-red-500"
                            }`}
                          >
                            {problem.Difficulty}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {(problem.tags || []).slice(0, 2).map((tag, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                              >
                                {tag}
                              </span>
                            ))}
                            {problem.tags?.length > 2 && (
                              <span className="text-xs text-gray-500">
                                +{problem.tags.length - 2} more
                              </span>
                            )}
                          </div>
                          {problem.companies && problem.companies.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {(problem.companies || []).slice(0, 1).map((company, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500"
                                >
                                  <Building className="w-3 h-3 mr-1" />
                                  {company.name}
                                </span>
                              ))}
                              {problem.companies.length > 1 && (
                                <span className="text-xs text-gray-500">
                                  +{problem.companies.length - 1} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPlaylistProblemsModal; 