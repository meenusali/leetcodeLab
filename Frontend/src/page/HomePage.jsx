import React, { useEffect } from "react";
import { useProblemStore } from "../store/useProblemStore";
import { useAuthStore } from "../store/useAuthStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import { 
  Loader, 
  Database, 
  Code2, 
  Settings, 
  Shield, 
  Users,
  Check,
  X,
  Clock,
  TrendingUp,
  Target
} from "lucide-react";
import ProblemTable from "../components/ProblemTable";

const HomePage = () => {
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();
  const { authUser } = useAuthStore();
  const { 
    getAllSubmissions, 
    submissions, 
    getUserStatistics, 
    getAdminStatistics,
    userStatistics,
    adminStatistics,
    isLoading: isStatsLoading 
  } = useSubmissionStore();

  useEffect(() => {
    getAllProblems();
    getAllSubmissions();
    // Fetch appropriate statistics based on user role
    if (authUser) {
      if (authUser.role === "ADMIN") {
        getAdminStatistics();
      } else {
        getUserStatistics();
      }
    }
  }, [getAllProblems, getAllSubmissions, getUserStatistics, getAdminStatistics, authUser]);

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'ACCEPTED':
        return 'text-green-500';
      case 'WRONG_ANSWER':
        return 'text-red-500';
      case 'PROCESSING':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toUpperCase()) {
      case 'ACCEPTED':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'WRONG_ANSWER':
        return <X className="w-5 h-5 text-red-500" />;
      case 'PROCESSING':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };
  
  if(isProblemsLoading || isStatsLoading){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center mt-14 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-base-100 to-secondary/20"></div>
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-secondary/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      {/* Statistics Section */}
      <div className="w-full max-w-7xl mb-8 px-4 sm:px-6">
        {authUser?.role === "ADMIN" ? (
          // Admin Statistics
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Total Problems Card */}
            <div className="bg-base-100/40 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-base-300/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hover:bg-base-100/60">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Database className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold">Total Problems</h3>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                {adminStatistics?.totalProblems || 0}
              </div>
              <p className="text-xs sm:text-sm text-base-content/70">Available problems in the platform</p>
            </div>

            {/* Active Users Card */}
            <div className="bg-base-100/40 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-base-300/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hover:bg-base-100/60">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold">Active Users</h3>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                {adminStatistics?.uniqueUsers || 0}
              </div>
              <p className="text-xs sm:text-sm text-base-content/70">Users who have submitted solutions</p>
            </div>

            {/* Total Submissions Card */}
            <div className="bg-base-100/40 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-base-300/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hover:bg-base-100/60">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold">Total Submissions</h3>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                {adminStatistics?.totalSubmissions || 0}
              </div>
              <p className="text-xs sm:text-sm text-base-content/70">Total code submissions received</p>
            </div>

            {/* Success Rate Card */}
            <div className="bg-base-100/40 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-base-300/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hover:bg-base-100/60">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold">Success Rate</h3>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                {adminStatistics?.successRate || 0}%
              </div>
              <p className="text-xs sm:text-sm text-base-content/70">Accepted solutions percentage</p>
            </div>
          </div>
        ) : (
          // User Statistics
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Problems Solved Card */}
            <div className="bg-base-100/40 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-base-300/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hover:bg-base-100/60">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold">Problems Solved</h3>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                {userStatistics?.uniqueSolvedProblems || 0}
              </div>
              <p className="text-xs sm:text-sm text-base-content/70">
                out of {problems.length || 0} total problems
              </p>
            </div>

            {/* Total Submissions Card */}
            <div className="bg-base-100/40 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-base-300/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hover:bg-base-100/60">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold">Your Submissions</h3>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                {userStatistics?.totalSubmissions || 0}
              </div>
              <p className="text-xs sm:text-sm text-base-content/70">
                {userStatistics?.acceptedSubmissions || 0} accepted solutions
              </p>
            </div>

            {/* Success Rate Card */}
            <div className="bg-base-100/40 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-base-300/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hover:bg-base-100/60">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold">Success Rate</h3>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                {userStatistics?.successRate || 0}%
              </div>
              <p className="text-xs sm:text-sm text-base-content/70">Percentage of accepted solutions</p>
            </div>

            {/* Last Submission Card */}
            <div className="bg-base-100/40 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-base-300/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hover:bg-base-100/60">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold">Last Submission</h3>
              </div>
              {userStatistics?.lastSubmission ? (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    {getStatusIcon(userStatistics.lastSubmission.status)}
                    <span className={`text-base sm:text-lg font-semibold ${getStatusColor(userStatistics.lastSubmission.status)}`}>
                      {userStatistics.lastSubmission.status}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-base-content/70">
                    {new Date(userStatistics.lastSubmission.createdAt).toLocaleDateString()}
                  </p>
                </>
              ) : (
                <p className="text-xs sm:text-sm text-base-content/70">No submissions yet</p>
              )}
            </div>
          </div>
        )}
      </div>

      {problems.length > 0 ? (
        <ProblemTable problems={problems}/>
      ) : (
        <p className="mt-10 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10 border border-primary px-4 py-2 rounded-md border-dashed">
          No problems found
        </p>
      )}
    </div>
  );
};

export default HomePage;