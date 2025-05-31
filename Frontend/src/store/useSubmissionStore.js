import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useSubmissionStore = create((set, get) => ({
  isLoading: false,
  submissions: [],
  submission: null,
  submissionCount: null,
  userStatistics: null,
  adminStatistics: null,

  getAllSubmissions: async () => {
    try {
      const res = await axiosInstance.get("/submission/get-all-submissions");
      set({ submissions: res.data.submissions });
      return res.data.submissions;
    } catch (error) {
      throw error;
    }
  },

  getSubmissionForProblem: async (problemId) => {
    try {
      const res = await axiosInstance.get(
        `/submission/get-submission/${problemId}`
      );

      set({ submission: res.data.Submissions });

      

    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionCountForProblem: async (problemId) => {
    try {
      const res = await axiosInstance.get(
        `/submission/get-submissions-count/${problemId}`
      );                

      set({ submissionCount: res.data.count });
      return res.data.count;
    } catch (error) {
      throw error;
    }
  },


  problemsStats: async () => {
    try {
      const response = await axiosInstance.get('/submissions/get-all-problems-stats');
      set({ problemsStats: response });
    } catch (error) {
      throw error;
    }
  },

  getUserStatistics: async () => {
    try {
      const res = await axiosInstance.get("/submission/user-statistics");
      
      if (!res.data.success) {
        throw new Error(res.data.error || "Failed to fetch user statistics");
      }

      const statistics = res.data.statistics;
      
      set({ userStatistics: statistics });
      return statistics;
    } catch (error) {
      throw error;
    }
  },

  getAdminStatistics: async () => {
    try {
      const res = await axiosInstance.get("/submission/admin-statistics");
      
      if (!res.data.success) {
        throw new Error(res.data.error || "Failed to fetch admin statistics");
      }

      const statistics = res.data.statistics;
      
      set({ adminStatistics: statistics });
      return statistics;
    } catch (error) {
      throw error;
    }
  }
}));