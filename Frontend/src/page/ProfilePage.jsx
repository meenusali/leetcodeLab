import React, { useEffect,useState } from "react";

import { Link, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  BookOpen,
  Terminal,
  Code2,
  Users,
  ThumbsUp,
  Home,
  Loader,
  Check, 
  X,     
  Code,
  Settings,
  Shield,
  Database   
} from "lucide-react";
import { profileStore } from "../store/profileStore";
import { useAuthStore } from "../store/useAuthStore";

const getBadgeInfo = (totalSolved) => {
  if (totalSolved >= 300) {
    return {
      level: 'Gold',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500',
      icon: '🏆',
      next: null,
      current: totalSolved,
      progress: 100
    };
  } else if (totalSolved >= 200) {
    return {
      level: 'Silver',
      color: 'text-gray-400',
      bgColor: 'bg-gray-400',
      icon: '🥈',
      next: {
        level: 'Gold',
        remaining: 300 - totalSolved
      },
      current: totalSolved,
      progress: ((totalSolved - 200) / 100) * 100
    };
  } else if (totalSolved >= 100) {
    return {
      level: 'Bronze',
      color: 'text-amber-700',
      bgColor: 'bg-amber-700',
      icon: '🥉',
      next: {
        level: 'Silver',
        remaining: 200 - totalSolved
      },
      current: totalSolved,
      progress: ((totalSolved - 100) / 100) * 100
    };
  } else {
    return {
      level: 'No Badge',
      color: 'text-gray-400',
      bgColor: 'bg-gray-400',
      icon: '🎯',
      next: {
        level: 'Bronze',
        remaining: 100 - totalSolved
      },
      current: totalSolved,
      progress: (totalSolved / 100) * 100
    };
  }
};

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const { userInfo, profileData, isLoading } = profileStore();
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (authUser?.id) {
      userInfo(authUser.id);
    }
  }, [authUser, userInfo]);

  // Calculate total solved problems
  const totalSolved = React.useMemo(() => {
    if (!profileData?.solvedByDifficulty) return 0;
    return Object.values(profileData.solvedByDifficulty).reduce((sum, count) => sum + count, 0);
  }, [profileData]);

  // Get badge information
  const badgeInfo = getBadgeInfo(totalSolved);

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

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-300 to-base-200 max-w-7xl w-full">
      {/* Main profile content */}
      <div className="p-6">
        {/* Profile Header Section */}
        <div className="flex items-start gap-6 mb-8">
          <div className="w-24 h-24 rounded-lg overflow-hidden">
            <img
              src={
                authUser?.image ||
                "https://avatar.iran.liara.run/public/boy"
              }
              alt="User Avatar"
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">{profileData?.user?.name}</h1>
            <p className="text-gray-600 mb-2">Email: {profileData?.user?.email}</p>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Shield className="w-4 h-4" />
              <span>Role: </span>
              <span className="text-primary font-semibold">{profileData?.user?.role}</span>
            </div>
            <p className="text-gray-600 mb-2">Joined: {new Date(profileData?.user?.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Admin Dashboard Section */}
        {authUser?.role === "ADMIN" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick Stats */}
            <div className="bg-base-100 rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Platform Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-base-200/50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-primary">
                    {profileData?.problemcount ? 
                      Object.values(profileData.problemcount).reduce((sum, val) => sum + val, 0) : 0}
                  </div>
                  <div className="text-sm text-gray-500">Total Problems</div>
                </div>
                <div className="bg-base-200/50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-primary">
                    {profileData?.submission?.length || 0}
                  </div>
                  <div className="text-sm text-gray-500">Total Submissions</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-base-100 rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Admin Actions
              </h3>
              <div className="space-y-3">
                <Link 
                  to="/add-problem" 
                  className="btn btn-primary w-full flex items-center gap-2"
                >
                  <Code className="w-4 h-4" />
                  Add New Problem
                </Link>
              
                {/* <button 
                  className="btn btn-outline btn-primary w-full flex items-center gap-2"
                  onClick={() => {}}
                ><Users className="w-4 h-4" />
                  Manage Users
                </button> */}
              
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-base-100 rounded-lg p-6 shadow-md md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Recent Platform Activity</h3>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="bg-base-200">
                      <th>Status</th>
                      <th>Problem</th>
                      <th>User</th>
                      <th>Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profileData?.submission?.slice(0, 5).map((sub) => (
                      <tr 
                        key={sub.id} 
                        className="hover:bg-base-200 cursor-pointer transition-colors"
                      >
                        <td className="flex items-center gap-2">
                          {getStatusIcon(sub.status)}
                          <span className={getStatusColor(sub.status)}>
                            {sub.status}
                          </span>
                        </td>
                        <td>{sub.problem?.title}</td>
                        <td>{sub.user?.name || "Anonymous"}</td>
                        <td>{formatDate(sub.createdAt)}</td>
                        <td>
                          <button
                            onClick={() => {
                              setSelectedSubmission(sub);
                              setIsModalOpen(true);
                            }}
                            className="btn btn-ghost btn-sm"
                          >
                            <Code className="w-4 h-4" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Problem Solving Stats */}
              <div className="bg-base-100/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-base-300/20">
                <div className="text-center space-y-6">
                  {/* Circular Progress Indicator */}
                  <div className="relative inline-flex">
                    <div className="relative w-36 h-36">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle
                          className="text-base-300/30"
                          strokeWidth="10"
                          stroke="currentColor"
                          fill="transparent"
                          r="42"
                          cx="50"
                          cy="50"
                        />
                        {/* Progress circle */}
                        <circle
                          className="text-primary transition-all duration-1000"
                          strokeWidth="10"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="42"
                          cx="50"
                          cy="50"
                          style={{
                            strokeDasharray: `${2 * Math.PI * 42}`,
                            strokeDashoffset: `${2 * Math.PI * 42 * (1 - (profileData?.solvedCount || 0) / (profileData?.problemcount ? Object.values(profileData?.problemcount).reduce((sum, val) => sum + val, 0) : 1))}`,
                            transform: 'rotate(-90deg)',
                            transformOrigin: '50% 50%'
                          }}
                        />
                      </svg>
                      {/* Center Text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {profileData?.solvedCount || 0}
                        </div>
                        <div className="text-sm text-gray-500 font-medium">solved</div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Details */}
                  <div className="space-y-3">
                    <div className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                      Problems Solved
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <span>out of</span>
                      <span className="font-semibold text-primary">
                        {profileData?.problemcount
                          ? Object.values(profileData?.problemcount).reduce((sum, val) => sum + val, 0)
                          : 0}
                      </span>
                      <span>total</span>
                    </div>

                    {/* Progress Percentage */}
                    <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {profileData?.problemcount
                        ? Math.round((profileData?.solvedCount || 0) / Object.values(profileData?.problemcount).reduce((sum, val) => sum + val, 0) * 100)
                        : 0}%
                    </div>

                    {/* Mini Stats */}
                    <div className="flex justify-center gap-6 pt-4">
                      <div className="flex flex-col items-center bg-base-200/50 px-4 py-2 rounded-lg">
                        <span className="text-lg font-bold text-green-500">
                          {profileData?.solvedByDifficulty?.easy || 0}
                        </span>
                        <span className="text-xs font-medium text-gray-500">Easy</span>
                      </div>
                      <div className="flex flex-col items-center bg-base-200/50 px-4 py-2 rounded-lg">
                        <span className="text-lg font-bold text-yellow-500">
                          {profileData?.solvedByDifficulty?.medium || 0}
                        </span>
                        <span className="text-xs font-medium text-gray-500">Medium</span>
                      </div>
                      <div className="flex flex-col items-center bg-base-200/50 px-4 py-2 rounded-lg">
                        <span className="text-lg font-bold text-red-500">
                          {profileData?.solvedByDifficulty?.hard || 0}
                        </span>
                        <span className="text-xs font-medium text-gray-500">Hard</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges Section */}
              <div className="bg-base-100/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-base-300/20">
                <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Achievement Badge</h3>
                <div className="text-center space-y-4">
                  <div className="text-7xl mb-3 transform hover:scale-110 transition-transform duration-300">{badgeInfo.icon}</div>
                  <div className={`text-3xl font-bold ${badgeInfo.color} mb-2`}>
                    {badgeInfo.level}
                  </div>
                  <div className="text-base text-gray-500 font-medium">
                    {totalSolved} Problems Solved
                  </div>
                  {badgeInfo.next && (
                    <div className="mt-4 bg-base-200/50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-500 mb-2">Next Badge</div>
                      <div className="text-lg font-semibold text-primary mb-2">
                        {badgeInfo.next.level}
                      </div>
                      <div className="text-sm text-gray-500 mb-3">
                        {badgeInfo.next.remaining} more to go
                      </div>
                      <div className="w-full bg-base-300/30 rounded-full h-2.5">
                        <div
                          className={`${badgeInfo.bgColor} h-2.5 rounded-full transition-all duration-500`}
                          style={{
                            width: `${badgeInfo.progress}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Activity / Submissions Section */}
              <div className="bg-base-100/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-base-300/20 sm:col-span-2 lg:col-span-1">
                <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Recent Activity</h3>
                <div className="space-y-3">
                  {profileData?.submission?.slice(0, 5).map((sub) => (
                    <div 
                      key={sub.id}
                      className="bg-base-200/50 rounded-lg p-3 hover:bg-base-200 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedSubmission(sub);
                        setIsModalOpen(true);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(sub.status)}
                          <span className={`font-medium ${getStatusColor(sub.status)}`}>
                            {sub.status}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">{formatDate(sub.createdAt)}</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        {sub.problem?.title}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {sub.language}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Code View Modal */}
        {isModalOpen && selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-base-100 rounded-lg w-[80vw] h-[80vh] p-4 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedSubmission.problem?.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Submitted: {formatDate(selectedSubmission.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-ghost btn-sm btn-circle"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-hidden rounded-lg border border-base-300">
                <Editor
                  height="100%"
                  defaultLanguage={selectedSubmission.language?.toLowerCase()}
                  defaultValue={selectedSubmission.sourceCode}
                  theme="vs-dark"
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                  }}
                />
              </div>

              <div className="mt-4 flex items-center gap-4">
                <div className={`flex items-center gap-2 ${getStatusColor(selectedSubmission.status)}`}>
                  {getStatusIcon(selectedSubmission.status)}
                  <span>{selectedSubmission.status}</span>
                </div>
                {selectedSubmission.runtime && (
                  <div className="text-sm text-gray-500">
                    Runtime: {selectedSubmission.runtime}ms
                  </div>
                )}
                {selectedSubmission.memory && (
                  <div className="text-sm text-gray-500">
                    Memory: {selectedSubmission.memory}MB
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage