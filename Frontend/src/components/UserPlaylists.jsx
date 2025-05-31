import React, { useEffect, useState } from 'react';
import { usePlaylistStore } from '../store/usePlaylistStore';
import { Plus, BookOpen, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import ViewPlaylistProblemsModal from './ViewPlaylistProblemsModal';

const UserPlaylists = ({ onAddToPlaylist }) => {
  const { playlists, getAllPlaylists, deletePlaylist, isLoading } = usePlaylistStore();
  const [expandedPlaylists, setExpandedPlaylists] = useState(new Set());
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false);

  useEffect(() => {
    getAllPlaylists();
  }, [getAllPlaylists]);

  const handleDeletePlaylist = async (playlistId) => {
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      await deletePlaylist(playlistId);
    }
  };

  const togglePlaylist = (playlistId) => {
    setExpandedPlaylists(prev => {
      const newSet = new Set(prev);
      if (newSet.has(playlistId)) {
        newSet.delete(playlistId);
      } else {
        newSet.add(playlistId);
      }
      return newSet;
    });
  };

  const handleViewAll = (playlist) => {
    setSelectedPlaylist(playlist);
    setIsViewAllModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!playlists?.length) {
    return (
      <div className="text-center p-8 bg-base-200 rounded-2xl border border-base-300">
        <BookOpen className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Playlists Yet</h3>
        <p className="text-gray-400 mb-4">Create your first playlist to organize your practice problems</p>
        <button
          onClick={() => onAddToPlaylist(null)}
          className="btn btn-primary gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Playlist
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">My Playlists</h2>
        <button
          onClick={() => onAddToPlaylist(null)}
          className="btn btn-primary btn-sm gap-2"
        >
          <Plus className="w-4 h-4" />
          New Playlist
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {playlists.map((playlist) => {
          const isExpanded = expandedPlaylists.has(playlist.id);
          const hasProblems = playlist.problems?.length > 0;
          const showExpandButton = playlist.problems?.length > 1;

          return (
            <div
              key={playlist.id}
              className="card bg-base-200 border border-base-300 hover:border-primary/40 transition-colors"
            >
              <div className="card-body p-3">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="card-title text-base font-medium">
                    {playlist.name}
                  </h3>
                  <button
                    onClick={() => handleDeletePlaylist(playlist.id)}
                    className="btn btn-ghost btn-xs text-error hover:bg-error/10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 line-clamp-1 mb-2">
                  {playlist.description || 'No description provided'}
                </p>

                {hasProblems ? (
                  <div className="space-y-1">
                    {playlist.problems.slice(0, isExpanded ? undefined : 1).map(({ problem }, index) => (
                      <div 
                        key={problem.id} 
                        className="flex items-center gap-1.5 text-xs bg-base-300/50 rounded px-2 py-1"
                      >
                        <span className="text-primary font-medium">#{index + 1}</span>
                        <Link 
                          to={`/problem/${problem.id}`}
                          className="hover:text-primary transition-colors flex-1 truncate"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {problem.title}
                        </Link>
                      </div>
                    ))}
                    
                    {showExpandButton && (
                      <button
                        onClick={() => togglePlaylist(playlist.id)}
                        className="w-full btn btn-ghost btn-xs text-primary hover:bg-primary/10 gap-1"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-3 h-3" />
                            Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3 h-3" />
                            Show {playlist.problems.length - 1} More
                          </>
                        )}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-xs text-gray-400 italic">
                    No problems added yet
                  </div>
                )}

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {playlist.problems?.length || 0} problems
                  </span>
                  <button
                    onClick={() => handleViewAll(playlist)}
                    className="btn btn-ghost btn-xs text-primary hover:bg-primary/10"
                  >
                    View All
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ViewPlaylistProblemsModal
        isOpen={isViewAllModalOpen}
        onClose={() => {
          setIsViewAllModalOpen(false);
          setSelectedPlaylist(null);
        }}
        playlist={selectedPlaylist}
      />
    </div>
  );
};

export default UserPlaylists; 