import React from 'react'
import {useForm} from "react-hook-form";
import {X} from "lucide-react";
const CreatePlaylistModal = ({isOpen , onClose , onSubmit}) => {
    const {register , handleSubmit , formState:{errors} , reset} = useForm();

    const handleFormSubmit = async (data)=>{
        await onSubmit(data);
        reset()
        onClose()
    }

    if(!isOpen) return null;

  return (
   <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-base-200 rounded-2xl shadow-xl w-full max-w-md border border-base-300">
        <div className="flex justify-between items-center p-6 border-b border-base-300">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-blue-400 to-primary/70 text-transparent bg-clip-text">Create New Playlist</h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle hover:bg-base-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Playlist Name</span>
            </label>
            <input
              type="text"
              className="input bg-base-300/50 border-base-300 w-full focus:border-primary"
              placeholder="Enter playlist name"
              {...register('name', { required: 'Playlist name is required' })}
            />
            {errors.name && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.name.message}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Description</span>
            </label>
            <textarea
              className="textarea bg-base-300/50 border-base-300 h-24 focus:border-primary"
              placeholder="Enter playlist description"
              {...register('description')}
            />
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
            >
              Create Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePlaylistModal