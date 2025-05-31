import React, { useState, useEffect } from "react";
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
  Terminal,
  Code2,
  Users,
  ThumbsUp,
  Home,
  ArrowLeft,
  PencilIcon,
  ChevronDown,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useProblemStore } from "../store/useProblemStore";
import { getLanguageId } from "../lib/lang";
import { useExecutionStore } from "../store/useExecutionStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import { useAuthStore } from "../store/useAuthStore";
import Submission from "../components/Submission";
import SubmissionsList from "../components/SubmissionList";

const ProblemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();

  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("JAVASCRIPT");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testcases, setTestCases] = useState([]);
  const [originalCode, setOriginalCode] = useState("");

  const { executeCode, submission, isExecuting } = useExecutionStore();

  useEffect(() => {
    getProblemById(id);
    getSubmissionCountForProblem(id);
  }, [id, getProblemById, getSubmissionCountForProblem]);

  useEffect(() => {
    if (problem?.codeSnippets) {
      if (!problem.codeSnippets[selectedLanguage]) {
        const availableLanguages = Object.keys(problem.codeSnippets);
        if (availableLanguages.length > 0) {
          setSelectedLanguage(availableLanguages[0]);
        }
      }
      
      const initialCode = problem.codeSnippets[selectedLanguage] || "";
      setCode(initialCode);
      setOriginalCode(initialCode);
      
      setTestCases(problem.testcases?.map(tc => ({
        input: tc.input,
        output: tc.output
      })) || []);
    }
  }, [problem, selectedLanguage]);

  useEffect(() => {
    if (activeTab === "submissions" && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, id, getSubmissionForProblem]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode(problem.codeSnippets?.[lang] || "");
  };

  const handleRunCode = async (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map(tc => tc.input);
      const expected_outputs = problem.testcases.map(tc => tc.output);
      await executeCode(code, language_id, stdin, expected_outputs, id);
    } catch (error) {
      console.error("Error executing code:", error);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your code to the initial template?")) {
      setCode(originalCode);
    }
  };

  const handleEdit = () => {
    navigate(`/problem/edit/${id}`);
  };

  if (isProblemLoading || !problem) {
    return (
      <div className="flex items-center justify-center h-screen bg-base-200">
        <div className="card bg-base-100 p-8 shadow-xl">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70">Loading problem...</p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose max-w-none">
            <p className="text-lg mb-6">{problem.description}</p>

            {problem.examples && (
              <>
                <h3 className="text-xl font-bold mb-4">Examples:</h3>
                {Object.entries(problem.examples).map(([lang, example], idx) => (
                  <div key={lang} className="bg-base-200 p-4 rounded-xl mb-4 font-mono">
                    <div className="mb-2">
                      <div className="text-indigo-300 mb-1">Input:</div>
                      <span className="bg-black/90 px-2 py-1 rounded-lg text-white">
                        {example.input}
                      </span>
                    </div>
                    <div className="mb-2">
                      <div className="text-indigo-300 mb-1">Output:</div>
                      <span className="bg-black/90 px-2 py-1 rounded-lg text-white">
                        {example.output}
                      </span>
                    </div>
                    {example.explanation && (
                      <div>
                        <div className="text-emerald-300 mb-1">Explanation:</div>
                        <p className="text-base-content/70">
                          {example.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {problem.constraints && (
              <>
                <h3 className="text-xl font-bold mb-2">Constraints:</h3>
                <div className="bg-base-200 p-4 rounded-xl mb-4">
                  <span className="bg-black/90 px-2 py-1 rounded-lg text-white">
                    {problem.constraints}
                  </span>
                </div>
              </>
            )}
          </div>
        );
      case "submissions":
        return (
          <SubmissionsList
            submissions={submissions}
            isLoading={isSubmissionsLoading}
          />
        );
      // case "discussion":
      //   return (
      //     <div className="p-4 text-center text-base-content/70">
      //       No discussions yet
      //     </div>
      //   );
      case "hints":
        return (
          <div className="p-4">
            {problem?.hints ? (
              <div className="bg-base-200 p-4 rounded-xl">
                <span className="bg-black/90 px-2 py-1 rounded-lg text-white">
                  {problem.hints}
                </span>
              </div>
            ) : (
              <div className="text-center text-base-content/70">
                No hints available
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-300 to-base-200">
      <nav className="navbar bg-base-100 shadow-lg px-4">
        <div className="flex-1 gap-2">
          <div>
            <h1 className="text-xl font-bold">{problem.title}</h1>
            <div className="flex items-center gap-2 text-sm text-base-content/70 mt-2">
              <Clock className="w-4 h-4" />
              <span>
                Updated {new Date(problem.createdAt).toLocaleDateString()}
              </span>
              <span className="text-base-content/30">•</span>
              <Users className="w-4 h-4" />
              <span>{submissionCount} Submissions</span>
              {/* <span className="text-base-content/30">•</span>
              <ThumbsUp className="w-4 h-4" />
              <span>95% Success</span> */}
            </div>
          </div>
        </div>
        <div className="flex-none gap-4">
          {authUser?.role === "ADMIN" && (
            <button
              onClick={handleEdit}
              className="btn btn-primary btn-sm gap-2"
            >
              <PencilIcon className="w-4 h-4" />
              Edit Problem
            </button>
          )}
          {/* <button
            className={`btn btn-ghost btn-circle ${isBookmarked ? "text-primary" : ""}`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="btn btn-ghost btn-circle">
            <Share2 className="w-5 h-5" />
          </button> */}
          <select
            className="select select-bordered select-primary w-24 sm:w-40 text-sm"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            {problem?.codeSnippets ? (
              Object.keys(problem.codeSnippets).map((lang) => (
                <option key={lang} value={lang} className="text-sm">
                  {lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase()}
                </option>
              ))
            ) : (
              <option value="JAVASCRIPT" className="text-sm">JavaScript</option>
            )}
          </select>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-0">
              <div className="tabs tabs-bordered">
                <button
                  className={`tab gap-2 ${activeTab === "description" ? "tab-active" : ""}`}
                  onClick={() => setActiveTab("description")}
                >
                  <FileText className="w-4 h-4" />
                  Description
                </button>
                <button
                  className={`tab gap-2 ${activeTab === "submissions" ? "tab-active" : ""}`}
                  onClick={() => setActiveTab("submissions")}
                >
                  <Code2 className="w-4 h-4" />
                  Submissions
                </button>
                {/* <button
                  className={`tab gap-2 ${activeTab === "discussion" ? "tab-active" : ""}`}
                  onClick={() => setActiveTab("discussion")}
                >
                  <MessageSquare className="w-4 h-4" />
                  Discussion
                </button> */}
                <button
                  className={`tab gap-2 ${activeTab === "hints" ? "tab-active" : ""}`}
                  onClick={() => setActiveTab("hints")}
                >
                  <Lightbulb className="w-4 h-4" />
                 Codexium Ai
                </button>
              </div>

              <div className="p-4 overflow-y-auto max-h-[calc(100vh-20rem)]">
                {renderTabContent()}
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-0">
              <div className="tabs tabs-bordered">
                <button className="tab tab-active gap-2">
                  <Terminal className="w-4 h-4" />
                  Code Editor
                </button>
              </div>

              <div className="h-[calc(100vh-25rem)]">
                <Editor
                  height="100%"
                  language={selectedLanguage.toLowerCase()}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 16,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                  }}
                />
              </div>

              <div className="p-3 border-t border-base-300 bg-base-200">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {authUser?.role !== "ADMIN" ? (
                      <button
                        className={`btn btn-primary btn-sm gap-2 ${isExecuting ? "loading" : ""}`}
                        onClick={handleRunCode}
                        disabled={isExecuting}
                      >
                        {!isExecuting && <Play className="w-4 h-4" />}
                        Run & Submit Code
                      </button>
                    ) : (
                      <div className="text-sm text-base-content/70">
                        Admins cannot submit solutions
                      </div>
                    )}
                    <button
                      className="btn btn-secondary btn-sm gap-2"
                      onClick={handleReset}
                      disabled={isExecuting || code === originalCode}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl mt-4">
          <div className="card-body p-4">
            {submission ? (
              <Submission submission={submission} />
            ) : (
              <>
                <h3 className="text-lg font-bold mb-2">Test Cases</h3>
                <div className="overflow-x-auto">
                  <table className="table table-compact w-full">
                    <thead>
                      <tr>
                        <th>Input</th>
                        <th>Expected Output</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testcases.map((testCase, index) => (
                        <tr key={index}>
                          <td className="font-mono">{testCase.input}</td>
                          <td className="font-mono">{testCase.output}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;