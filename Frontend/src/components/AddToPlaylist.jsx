import React, { useEffect, useState } from 'react';
import { X, Plus, Loader } from 'lucide-react';
import { usePlaylistStore } from '../store/usePlaylistStore';

const AddToPlaylistModal = ({ isOpen, onClose, problemId }) => {
  const { playlists, getAllPlaylists, addProblemToPlaylist, isLoading } = usePlaylistStore();
  const [selectedPlaylist, setSelectedPlaylist] = useState('');

  useEffect(() => {
    if (isOpen) {
      getAllPlaylists();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlaylist) return;

    await addProblemToPlaylist(selectedPlaylist, [problemId]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-base-200 rounded-2xl shadow-xl w-full max-w-md border border-base-300">
        <div className="flex justify-between items-center p-6 border-b border-base-300">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-blue-400 to-primary/70 text-transparent bg-clip-text">Add to Playlist</h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle hover:bg-base-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Select Playlist</span>
            </label>
            <select
              className="select bg-base-300/50 border-base-300 w-full focus:border-primary"
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
              disabled={isLoading}
            >
              <option value="">Select a playlist</option>
              {playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="btn btn-ghost hover:bg-base-300"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary hover:border-primary/40"
              disabled={!selectedPlaylist || isLoading}
            >
              {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Add to Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToPlaylistModal;