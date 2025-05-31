import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";



export const profileStore = create((set) => ({
    isLoading: false,
    profileData: null,
  
    userInfo: async (id) => {
      try {
        set({ isLoading: true });
        const res = await axiosInstance.get(`/profile/${id}`);
        set({ profileData: res.data }); // Store the profile data
        toast.success(res.data.message);
      } catch (error) {
        console.log("Error getting user data", error);
        toast.error("Error getting user data");
      } finally {
        set({ isLoading: false });
      }
    },

    getUserProfile: async () => {
      try {
        const res = await axiosInstance.get(`/profile`);
        set({ profileData: res.data.profile });
        return res.data.profile;
      } catch (error) {
        throw error;
      }
    }
  }));