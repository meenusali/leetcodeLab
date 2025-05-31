import React, { useEffect } from 'react'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod"
import {
  Plus,
  Trash2,
  Code2,
  FileText,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { useState } from 'react';
import {axiosInstance} from "../lib/axios"
import toast from "react-hot-toast";
import {useNavigate, useParams} from "react-router-dom";
import { useProblemStore } from "../store/useProblemStore";

const problemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  companies: z.array(z.string()).optional(),
  constraints: z.string().min(1, "Constraints are required"),
  hints: z.string().optional(),
  editorial: z.string().optional(),
  testcases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
      })
    )
    .min(1, "At least one test case is required"),
  examples: z.object({
    JAVASCRIPT: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    PYTHON: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    JAVA: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
  }),
  codeSnippets: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript code snippet is required"),
    PYTHON: z.string().min(1, "Python code snippet is required"),
    JAVA: z.string().min(1, "Java solution is required"),
  }),
  referenceSolutions: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript solution is required"),
    PYTHON: z.string().min(1, "Python solution is required"),
    JAVA: z.string().min(1, "Java solution is required"),
  }),
});

const EditProblem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      testcases: [{ input: "", output: "" }],
      tags: [""],
      examples: {
        JAVASCRIPT: { input: "", output: "", explanation: "" },
        PYTHON: { input: "", output: "", explanation: "" },
        JAVA: { input: "", output: "", explanation: "" },
      },
      codeSnippets: {
        JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
        PYTHON: "def solution():\n    # Write your code here\n    pass",
        JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
      },
      referenceSolutions: {
        JAVASCRIPT: "// Add your reference solution here",
        PYTHON: "# Add your reference solution here",
        JAVA: "// Add your reference solution here",
      },
    }
  });

  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
  } = useFieldArray({
    control,
    name: "testcases",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const {
    fields: companyFields,
    append: appendCompany,
    remove: removeCompany,
  } = useFieldArray({
    control,
    name: "companies",
  });

  useEffect(() => {
    getProblemById(id);
  }, [id, getProblemById]);

  useEffect(() => {
    if (problem) {
      // Transform the problem data to match the form structure
      const formData = {
        ...problem,
        // Fix difficulty field - ensure it's using the correct case
        difficulty: problem.Difficulty || problem.difficulty,
        // Ensure all required fields are present
        examples: {
          JAVASCRIPT: problem.examples?.JAVASCRIPT || { input: "", output: "", explanation: "" },
          PYTHON: problem.examples?.PYTHON || { input: "", output: "", explanation: "" },
          JAVA: problem.examples?.JAVA || { input: "", output: "", explanation: "" },
        },
        codeSnippets: {
          JAVASCRIPT: problem.codeSnippets?.JAVASCRIPT || "",
          PYTHON: problem.codeSnippets?.PYTHON || "",
          JAVA: problem.codeSnippets?.JAVA || "",
        },
        referenceSolutions: {
          JAVASCRIPT: problem.referenceSolution?.JAVASCRIPT || "",
          PYTHON: problem.referenceSolution?.PYTHON || "",
          JAVA: problem.referenceSolution?.JAVA || "",
        },
        // Transform companies array to array of company names
        companies: Array.isArray(problem.companies) 
          ? problem.companies.map(company => company.name || company)
          : [],
      };
      reset(formData);
    }
  }, [problem, reset]);

  // Add debug log for form values
  useEffect(() => {
    const subscription = watch((value) => {
      // console.log('Current form values:', value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.put(`/problems/update-problem/${id}`, data);
      toast.success(response.data.message || "Problem updated successfully ⚡");
      navigate("/");
    } catch (error) {
      // console.error(error);
      toast.error(error.response?.data?.error || "Error updating problem");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = (value) => {
    // console.log('Current form values:', value);
  };

  if (isProblemLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-base-200">
        <div className="card bg-base-100 p-8 shadow-xl">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70">Loading problem...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-8 px-4 max-w-7xl'>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 pb-4 border-b">
            <div className="flex items-center gap-4">
              <button 
                type="button" 
                className="btn btn-ghost gap-2"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <h2 className="card-title text-2xl md:text-3xl flex items-center gap-3">
                <FileText className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                Edit Problem
              </h2>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text text-base md:text-lg font-semibold">
                    Title
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full text-base md:text-lg"
                  {...register("title")}
                  placeholder="Enter problem title"
                />
                {errors.title && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.title.message}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text text-base md:text-lg font-semibold">
                    Description
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered min-h-32 w-full text-base md:text-lg p-4 resize-y"
                  {...register("description")}
                  placeholder="Enter problem description"
                />
                {errors.description && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.description.message}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base md:text-lg font-semibold">
                    Difficulty
                  </span>
                </label>
                <select
                  className="select select-bordered w-full text-base md:text-lg"
                  {...register("difficulty")}
                  defaultValue={problem?.Difficulty || problem?.difficulty}
                >
                  <option value="">Select Difficulty</option>
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
                {errors.difficulty && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.difficulty.message}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base md:text-lg font-semibold">
                    Companies
                  </span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {companyFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered flex-1"
                        {...register(`companies.${index}`)}
                        placeholder="Enter company name"
                      />
                      <button
                        type="button"
                        onClick={() => removeCompany(index)}
                        className="btn btn-square btn-ghost text-error"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => appendCompany("")}
                    className="btn btn-ghost gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Company
                  </button>
                </div>
                {errors.companies && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.companies.message}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base md:text-lg font-semibold">
                    Tags
                  </span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {tagFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered flex-1"
                        {...register(`tags.${index}`)}
                        placeholder="Enter tag"
                      />
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="btn btn-square btn-ghost text-error"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => appendTag("")}
                    className="btn btn-ghost gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Tag
                  </button>
                </div>
                {errors.tags && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.tags.message}
                    </span>
                  </label>
                )}
              </div>
            </div>

            {/* Test Cases */}
            <div className="card bg-base-200 p-4 md:p-6 shadow-md">
              <h3 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                Test Cases
              </h3>
              <div className="space-y-4">
                {testCaseFields.map((field, index) => (
                  <div key={field.id} className="card bg-base-100 p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Test Case {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeTestCase(index)}
                        className="btn btn-sm btn-ghost text-error"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Input
                          </span>
                        </label>
                        <textarea
                          className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
                          {...register(`testcases.${index}.input`)}
                          placeholder="Enter test case input"
                        />
                        {errors.testcases?.[index]?.input && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {errors.testcases[index].input.message}
                            </span>
                          </label>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Expected Output
                          </span>
                        </label>
                        <textarea
                          className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
                          {...register(`testcases.${index}.output`)}
                          placeholder="Enter expected output"
                        />
                        {errors.testcases?.[index]?.output && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {errors.testcases[index].output.message}
                            </span>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendTestCase({ input: "", output: "" })}
                  className="btn btn-ghost gap-2 w-full"
                >
                  <Plus className="w-5 h-5" />
                  Add Test Case
                </button>
              </div>
              {errors.testcases && !Array.isArray(errors.testcases) && (
                <div className="mt-2">
                  <span className="text-error text-sm">
                    {errors.testcases.message}
                  </span>
                </div>
              )}
            </div>

            {/* Code Editor Sections */}
            <div className="space-y-8">
              {["JAVASCRIPT", "PYTHON", "JAVA"].map((language) => (
                <div
                  key={language}
                  className="card bg-base-200 p-4 md:p-6 shadow-md"
                >
                  <h3 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                    <Code2 className="w-5 h-5" />
                    {language}
                  </h3>

                  <div className="space-y-6">
                    {/* Starter Code */}
                    <div className="card bg-base-100 shadow-md">
                      <div className="card-body p-4 md:p-6">
                        <h4 className="font-semibold text-base md:text-lg mb-4">
                          Starter Code Template
                        </h4>
                        <div className="border rounded-md overflow-hidden">
                          <Controller
                            name={`codeSnippets.${language}`}
                            control={control}
                            render={({ field }) => (
                              <Editor
                                height="300px"
                                language={language.toLowerCase()}
                                theme="vs-dark"
                                value={field.value}
                                onChange={field.onChange}
                                options={{
                                  minimap: { enabled: false },
                                  fontSize: 14,
                                  lineNumbers: "on",
                                  roundedSelection: false,
                                  scrollBeyondLastLine: false,
                                  automaticLayout: true,
                                }}
                              />
                            )}
                          />
                        </div>
                        {errors.codeSnippets?.[language] && (
                          <div className="mt-2">
                            <span className="text-error text-sm">
                              {errors.codeSnippets[language].message}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Reference Solution */}
                    <div className="card bg-base-100 shadow-md">
                      <div className="card-body p-4 md:p-6">
                        <h4 className="font-semibold text-base md:text-lg mb-4 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-success" />
                          Reference Solution
                        </h4>
                        <div className="border rounded-md overflow-hidden">
                          <Controller
                            name={`referenceSolutions.${language}`}
                            control={control}
                            render={({ field }) => (
                              <Editor
                                height="300px"
                                language={language.toLowerCase()}
                                theme="vs-dark"
                                value={field.value}
                                onChange={field.onChange}
                                options={{
                                  minimap: { enabled: false },
                                  fontSize: 14,
                                  lineNumbers: "on",
                                  roundedSelection: false,
                                  scrollBeyondLastLine: false,
                                  automaticLayout: true,
                                }}
                              />
                            )}
                          />
                        </div>
                        {errors.referenceSolutions?.[language] && (
                          <div className="mt-2">
                            <span className="text-error text-sm">
                              {errors.referenceSolutions[language].message}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Examples */}
                    <div className="card bg-base-100 shadow-md">
                      <div className="card-body p-4 md:p-6">
                        <h4 className="font-semibold text-base md:text-lg mb-4">
                          Example
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text font-medium">
                                Input
                              </span>
                            </label>
                            <textarea
                              className="textarea textarea-bordered min-h-20 w-full p-3 resize-y"
                              {...register(`examples.${language}.input`)}
                              placeholder="Example input"
                            />
                            {errors.examples?.[language]?.input && (
                              <label className="label">
                                <span className="label-text-alt text-error">
                                  {errors.examples[language].input.message}
                                </span>
                              </label>
                            )}
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text font-medium">
                                Output
                              </span>
                            </label>
                            <textarea
                              className="textarea textarea-bordered min-h-20 w-full p-3 resize-y"
                              {...register(`examples.${language}.output`)}
                              placeholder="Example output"
                            />
                            {errors.examples?.[language]?.output && (
                              <label className="label">
                                <span className="label-text-alt text-error">
                                  {errors.examples[language].output.message}
                                </span>
                              </label>
                            )}
                          </div>
                          <div className="form-control md:col-span-2">
                            <label className="label">
                              <span className="label-text font-medium">
                                Explanation
                              </span>
                            </label>
                            <textarea
                              className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
                              {...register(`examples.${language}.explanation`)}
                              placeholder="Explain the example"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Information */}
            <div className="card bg-base-200 p-4 md:p-6 shadow-md">
              <h3 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-warning" />
                Additional Information
              </h3>
              <div className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Constraints</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
                    {...register("constraints")}
                    placeholder="Enter problem constraints"
                  />
                  {errors.constraints && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.constraints.message}
                      </span>
                    </label>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Hints (Optional)
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
                    {...register("hints")}
                    placeholder="Enter hints for solving the problem"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Editorial (Optional)
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered min-h-32 w-full p-3 resize-y"
                    {...register("editorial")}
                    placeholder="Enter problem editorial/solution explanation"
                  />
                </div>
              </div>
            </div>

            <div className="card-actions justify-end pt-4 border-t gap-4">
              <button 
                type="button" 
                className="btn btn-outline btn-lg gap-2"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary btn-lg gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Updating...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Update Problem
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProblem; 