import React, { useState, useMemo, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { 
  Bookmark, 
  PencilIcon, 
  TrashIcon, 
  Plus, 
  Search, 
  Filter, 
  Tag,
  ChevronLeft, 
  ChevronRight,
  CheckCircle2,
  XCircle,
  Code2,
  Building,
  List
} from "lucide-react";
import { useActions } from "../store/useAction";
import AddToPlaylistModal from "./AddToPlaylist";
import CreatePlaylistModal from "./CreatePlaylistModal";
import UserPlaylists from "./UserPlaylists";
import { usePlaylistStore } from "../store/usePlaylistStore";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import ViewAllProblemsModal from "./ViewAllProblemsModal";

const ProblemTable = ({ problems }) => {
  const { authUser, token } = useAuthStore();
  const { isDeletingProblem, onDeleteProblem } = useActions();
  const { createPlaylist } = usePlaylistStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [selectedCompany, setSelectedCompany] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [problemStats, setProblemStats] = useState({});
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false);

  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];

    const tagsSet = new Set();

    problems.forEach((p) => p.tags?.forEach((t) => tagsSet.add(t)));

    return Array.from(tagsSet);
  }, [problems]);

  const allCompanies = useMemo(() => {
    if (!Array.isArray(problems)) return [];

    const companiesSet = new Set();

    problems.forEach((p) => p.companies?.forEach((c) => companiesSet.add(c.name)));

    return Array.from(companiesSet);
  }, [problems]);

  const difficulties = ["EASY", "MEDIUM", "HARD"];

  const filteredProblems = useMemo(() => {
    return (problems || [])
    .filter((problem)=> problem.title.toLowerCase().includes(search.toLowerCase()))
    .filter((problem)=>difficulty === "ALL" ? true: problem.Difficulty === difficulty)
    .filter((problem) =>
        selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag)
    )
    .filter((problem) =>
        selectedCompany === "ALL" ? true : problem.companies?.some(c => c.name === selectedCompany)
    );
  },[problems, search, difficulty, selectedTag, selectedCompany])

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(
      (currentPage - 1) * itemsPerPage, 
      currentPage * itemsPerPage
    );
  }, [filteredProblems, currentPage]);

  const handleDelete = (id)=>{ onDeleteProblem(id);}

  const handleAddToPlaylist = (problemId)=>{
     setSelectedProblemId(problemId);
     setIsAddToPlaylistModalOpen(true);
  }

  const handleCreatePlaylist = async (data) => {
      await createPlaylist(data);
    };

    const handleEdit = (problemId) => {
      navigate(`/problem/edit/${problemId}`);
    };

  const handleRowClick = (problemId) => {
    if (authUser?.role !== "ADMIN") {
      navigate(`/problem/${problemId}`);
    }
  };


  return (
    <div className="w-full">
      {/* Main Content */}
      <div className="space-y-12">
        {/* Header Section */}
        <div className="flex flex-col space-y-6 mb-8">
          {authUser?.role === "ADMIN" ? (
            <div className="flex justify-end items-center gap-4">
              <Link 
                to="/add-problem"
                className="btn btn-primary gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Problem
              </Link>
            </div>
          ) : (
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col space-y-2">
              <h1 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-primary via-blue-400 to-primary/70 text-transparent bg-clip-text">
                  Practice Problems
                </span>
              </h1>
              <p className="text-gray-400">Enhance your coding skills with our curated challenges</p>
                </div>
              </div>
              <UserPlaylists onAddToPlaylist={() => setIsCreateModalOpen(true)} />
            </div>
          )}
        </div>

        {/* Filters Bar */}
        <div className="bg-base-200 backdrop-blur-xl border border-base-300 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search problems..."
                className="input w-full pl-10 bg-base-100/50 border-gray-800/10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="md:col-span-2 relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              <select
                className="select w-full pl-10 bg-base-100/50 border-gray-800/10 appearance-none cursor-pointer hover:border-primary/40 transition-colors [&>option]:bg-base-300 [&>option]:text-white [&>option]:py-2 [&>option:hover]:bg-primary/20"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="ALL" className="py-2">All Difficulties</option>
                {difficulties.map((diff) => (
                  <option key={diff} value={diff} className="py-2">{diff}</option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 rotate-90 pointer-events-none" />
            </div>
            <div className="md:col-span-3 relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              <select
                className="select w-full pl-10 bg-base-100/50 border-gray-800/10 appearance-none cursor-pointer hover:border-primary/40 transition-colors [&>option]:bg-base-300 [&>option]:text-white [&>option]:py-2 [&>option:hover]:bg-primary/20"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
              >
                <option value="ALL" className="py-2">All Tags</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag} className="py-2">{tag}</option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 rotate-90 pointer-events-none" />
            </div>
            <div className="md:col-span-3 relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              <select
                className="select w-full pl-10 bg-base-100/50 border-gray-800/10 appearance-none cursor-pointer hover:border-primary/40 transition-colors [&>option]:bg-base-300 [&>option]:text-white [&>option]:py-2 [&>option:hover]:bg-primary/20"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
              >
                <option value="ALL" className="py-2">All Companies</option>
                {allCompanies.map((company) => (
                  <option key={company} value={company} className="py-2">{company}</option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 rotate-90 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Problems List */}
        <div className="bg-base-200 backdrop-blur-xl border border-base-300 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="border-b border-gray-800/10">
                  <th className="bg-transparent font-medium text-gray-400 uppercase tracking-wider text-xs">Status</th>
                  <th className="bg-transparent font-medium text-gray-400 uppercase tracking-wider text-xs">Problem</th>
                  <th className="bg-transparent font-medium text-gray-400 uppercase tracking-wider text-xs">Category</th>
                  <th className="bg-transparent font-medium text-gray-400 uppercase tracking-wider text-xs">Companies</th>
                  <th className="bg-transparent font-medium text-gray-400 uppercase tracking-wider text-xs">Difficulty</th>
                  {/* <th className="bg-transparent font-medium text-gray-400 uppercase tracking-wider text-xs">Success Rate</th>
                  <th className="bg-transparent font-medium text-gray-400 uppercase tracking-wider text-xs">Last Submission</th> */}
                  <th className="bg-transparent font-medium text-gray-400 uppercase tracking-wider text-xs">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/10">
                {paginatedProblems.length > 0 ? (
                  paginatedProblems.map((problem) => {
                    if (!problem?.id) {
                      console.error('Problem without ID:', problem);
                      return null;
                    }

                    const isSolved = problem.solvedBy?.some(
                      (user) => user.userId === authUser?.id
                    ) || false;
                    
                    const stats = problemStats[problem.id] || {
                      successRate: 0,
                      lastSubmission: null
                    };
                    
                    return (
                      <tr 
                        key={problem.id} 
                        className={`hover:bg-base-300/20 transition-all ${authUser?.role !== "ADMIN" ? "cursor-pointer" : ""}`}
                        onClick={() => handleRowClick(problem.id)}
                      >
                        <td className="w-16">
                          {isSolved ? (
                            <div className="flex items-center gap-2 text-green-500">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-gray-500">
                              <Code2 className="w-5 h-5" />
                            </div>
                          )}
                        </td>
                        <td>
                          {authUser?.role !== "ADMIN" ? (
                            <Link 
                              to={`/problem/${problem.id}`}
                              className="font-medium hover:text-primary transition-colors flex items-center gap-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {problem.title}
                            </Link>
                          ) : (
                            <span className="font-medium text-base-content/70">
                              {problem.title}
                            </span>
                          )}
                        </td>
                        <td>
                          <div className="flex flex-wrap gap-2">
                            {(problem.tags || []).map((tag, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-wrap gap-2">
                            {(problem.companies || []).map((company, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500"
                              >
                                <Building className="w-3 h-3 mr-1" />
                                {company.name}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>
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
                        </td>
                        {/* <td>
                          {isLoadingStats ? (
                            <div className="animate-pulse flex items-center gap-2">
                              <div className="w-16 bg-base-300 rounded-full h-2" />
                              <div className="w-12 h-4 bg-base-300 rounded" />
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-base-300 rounded-full h-2">
                                <div 
                                  className="h-2 rounded-full bg-primary" 
                                  style={{ width: `${stats.successRate || 0}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-400">
                                {stats.successRate || 0}%
                              </span>
                            </div>
                          )}
                        </td> */}
                        {/* <td>
                          {isLoadingStats ? (
                            <div className="animate-pulse flex flex-col gap-1">
                              <div className="w-24 h-4 bg-base-300 rounded" />
                              <div className="w-32 h-3 bg-base-300 rounded" />
                            </div>
                          ) : stats.lastSubmission ? (
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                  stats.lastSubmission.status === "Accepted" 
                                    ? "bg-green-500/10 text-green-500"
                                    : "bg-red-500/10 text-red-500"
                                }`}>
                                  {stats.lastSubmission.status}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {new Date(stats.lastSubmission.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <span className="text-xs text-gray-400">
                                {stats.lastSubmission.user?.name || stats.lastSubmission.user?.email || 'Unknown User'}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">No submissions</span>
                          )}
                        </td> */}
                        <td>
                          <div className="flex items-center gap-2">
                            {authUser?.role === "ADMIN" ? (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(problem.id);
                                  }}
                                  className="btn btn-sm btn-ghost text-primary hover:bg-primary/10"
                                >
                                  <PencilIcon className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(problem.id);
                                  }}
                                  className="btn btn-sm btn-ghost text-red-500 hover:bg-red-500/10"
                                >
                                  <TrashIcon className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <>
                              <Link
                                to={`/problem/${problem.id}`}
                                className="btn btn-sm bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary hover:border-primary/40"
                                  onClick={(e) => e.stopPropagation()}
                              >
                                <Code2 className="w-4 h-4" />
                                Solve
                              </Link>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToPlaylist(problem.id);
                                  }}
                                  className="btn btn-sm btn-ghost text-primary hover:bg-primary/10"
                                >
                                  <Bookmark className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-12">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="w-8 h-8 text-gray-500" />
                        <p className="text-gray-500">No problems found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 px-2">
          <button
            className="btn btn-sm btn-ghost gap-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <span className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-sm btn-ghost gap-2"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modals */}
      {authUser?.role !== "ADMIN" && (
        <>
          <CreatePlaylistModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleCreatePlaylist}
          />
          <AddToPlaylistModal
            isOpen={isAddToPlaylistModalOpen}
            onClose={() => setIsAddToPlaylistModalOpen(false)}
            problemId={selectedProblemId}
          />
        </>
      )}
    </div>
  );
};

export default ProblemTable;