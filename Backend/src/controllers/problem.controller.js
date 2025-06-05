import { PrismaClientUnknownRequestError } from "../generated/prisma/runtime/library.js";
import { db } from "../libs/db.js";
import {
  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";
import csv from 'csv-parser';
import { Readable } from 'stream';
import { stringify } from 'csv-stringify';

export const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
    companies, // Optional field
  } = req.body;

  // going to check the user role once again

  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        return res
          .status(400)
          .json({ error: `Language ${language} is not supported` });
      }

      //
      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res) => res.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log("result",result)
        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }
    }
    
    
    // Prepare the data object
    const problemData = {
      title,
      description,
      Difficulty: difficulty,
      tags,
      examples,
      constraints,
      testcases,
      codeSnippets,
      referenceSolution: referenceSolutions,
      userId: req.user.id,
    };

    // Handle companies - create if they don't exist or use existing ones
    if (companies && companies.length > 0) {
      // Normalize company names to title case
      const normalizedCompanies = companies.map(name => 
        name.trim().toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
      );

      // First check which companies exist (case-insensitive)
      const existingCompanies = await db.company.findMany({
        where: {
          name: {
            in: normalizedCompanies,
            mode: 'insensitive' // Make the search case-insensitive
          }
        }
      });

      const existingCompanyNames = existingCompanies.map(c => c.name.toLowerCase());
      const missingCompanyNames = normalizedCompanies.filter(
        name => !existingCompanyNames.includes(name.toLowerCase())
      );

      // Create any missing companies with normalized names
      if (missingCompanyNames.length > 0) {
        await db.company.createMany({
          data: missingCompanyNames.map(name => ({
            name: name // Use normalized name
          })),
          skipDuplicates: true
        });

        // Fetch the newly created companies to get their IDs
        const newCompanies = await db.company.findMany({
          where: {
            name: {
              in: missingCompanyNames,
              mode: 'insensitive'
            }
          }
        });
        
        existingCompanies.push(...newCompanies);
      }

      // Now connect all companies using their IDs
      problemData.companies = {
        connect: existingCompanies.map(company => ({ id: company.id }))
      };
    }

    const newProblem = await db.problem.create({
      data: problemData,
      include: {
        companies: true
      }
    });

    return res.status(201).json({
      success: true,
      message: "Problem Created Successfully",
      problem: newProblem,
    });
  } catch (error) {
    throw error;
  }
};
export const getAllProblems = async (req, res)=>{
  try {
    const problems = await db.problem.findMany({
      include:{
        solvedBy:{
          where:{
            userId:req.user.id
          }
        },
        companies: true // Include companies in the response
      }
    });
    if (!problems){
      return res.status(404).json({
        error:"no problems found"
      })
    }
    res.status(200).json({
      success:true,
      message:"Problem fetched successfully",
      problems
    })

  } catch (error) {
    return res.status(500).json({
      error:"Error while creating problem",
    });
    
  }
};


export const getProblemById = async (req, res)=>{
  const {id} = req.params;

  try {
    const problem = await db.problem.findUnique(
    { where:{
      id
    }

    })
    if(!problem){
      return res.status(404).json({error:"problem not found."})
    }
    return res.status(200).json({
      success:true,
      message:"Problem fetched successfully",
      problem
    });

  } catch (error) {
    return res.status(500).json({
      error:"Error while fetching pronlem by id",
    });
  }
};


export const updateProblem = async (req, res)=>{
  const {id} = req.params;
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  try {
    const problem = await db.problem.findUnique(
      { where:{
        id
      }
  
      })
      if(!problem){
        return res.status(404).json({error:"problem not found."})
      }

    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        return res
          .status(400)
          .json({ error: `Language ${language} is not supported` });
      }

      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res) => res.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];

        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }
    }
    
    
    const updateProblem = await db.problem.update({
      where:{
        id
      },
      data: {
        title,
        description,
        Difficulty:difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolution:referenceSolutions,
      },
    });

    return res.status(201).json({
      sucess: true,
      message: "Problem updated successfully.",
      problem: updateProblem,
    });
  } catch (error) {
    throw error;
  }
} 


export const deleteProblem = async (req, res)=>{
  const {id} = req.params;
try {const problem = await db.problem.findUnique({
  where:
  {id}
});
if(!problem){
  return res.status(404).json({
    error:"Problem not found"
  })
}
await db.problem.delete({where:{id}});

res.status(200).json({
  success:true,
  message:"problem deleted successfully"
})
} catch (error) {
  return res.status(500).json({
    error:"error while deleting the problem",
  });
}
 

 
}


export const getAllProblemsSolvedByUser = async (req, res)=>{
  try {
    const problems = await db.problem.findMany({
      where:{
        solvedBy:{
          some:{
            userId:req.user.id
          }
        }
      },
      include:{
        solvedBy:{
          where:{
            userId:req.user.id
          }
        }
      }
    })

    res.status(200).json({
      success:true,
      message:"Problems fetched successfully",
      problems
    })
  } catch (error) {
    res.status(500).json({error:"Failed to fetch problems"})
  }
};

export const importProblemsFromCSV = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ 
        error: "No files were uploaded.",
        requestFiles: req.files 
      });
    }

    const csvFile = req.files.csv;
    if (!csvFile) {
      return res.status(400).json({ 
        error: "Please upload a file with the field name 'csv'",
        receivedFields: Object.keys(req.files)
      });
    }

    // Check file type
    if (!csvFile.name.endsWith('.csv')) {
      return res.status(400).json({ 
        error: "Please upload a CSV file",
        receivedFileType: csvFile.name 
      });
    }

    const csvData = csvFile.data.toString();
    
    // Parse CSV data
    const records = await new Promise((resolve, reject) => {
      const results = [];
      Readable.from(csvData)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
    
    // Process each problem
    const problems = [];
    for (let i = 0; i < records.length; i++) {
      const record = records[i];

      // Access fields as object properties instead of array destructuring
      const {
        title,
        description,
        difficulty,
        companies: companiesStr,
        tags: tagsStr,
        examples: examplesStr,
        constraints: constraintsStr,
        testcases: testcasesStr,
        codeSnippets: codeSnippetsStr,
        referenceSolutions: referenceSolutionsStr
      } = record;

      // Verify all required fields are present
      if (!title || !description || !difficulty || !tagsStr || !examplesStr || 
          !constraintsStr || !testcasesStr || !codeSnippetsStr || !referenceSolutionsStr) {
        return res.status(400).json({
          error: `Missing required fields in row ${i + 1}`,
          receivedData: record
        });
      }

      try {
        // Parse JSON strings from CSV
        const tags = JSON.parse(tagsStr);
        const examples = JSON.parse(examplesStr);
        const constraints = JSON.parse(constraintsStr);
        const testcases = JSON.parse(testcasesStr);
        const codeSnippets = JSON.parse(codeSnippetsStr);
        const referenceSolutions = JSON.parse(referenceSolutionsStr);
        const companies = companiesStr ? JSON.parse(companiesStr) : [];

        // Fix Python indentation in reference solutions
        if (referenceSolutions.python) {
          referenceSolutions.python = referenceSolutions.python
            .split('\\n')
            .map(line => line.trim())
            .join('\n');
        }

        // Validate reference solutions
        for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
          const languageId = getJudge0LanguageId(language);

          if (!languageId) {
            return res
              .status(400)
              .json({ error: `Language ${language} is not supported in row ${i}` });
          }

          // Handle Python indentation for submission
          let processedCode = solutionCode;
          if (language === 'python') {
            // Ensure consistent 4-space indentation for Python
            processedCode = solutionCode
              .split('\n')
              .map(line => {
                // Count leading spaces to determine indentation level
                const indent = line.search(/\S/);
                if (indent === -1) return '';
                // Convert any indentation to multiples of 4 spaces
                const indentLevel = Math.ceil(indent / 4);
                return '    '.repeat(indentLevel) + line.trim();
              })
              .join('\n');
          }

          const submissions = testcases.map(({ input, output }) => ({
            source_code: processedCode,
            language_id: languageId,
            stdin: input,
            expected_output: output,
          }));

          const submissionResults = await submitBatch(submissions);
          
          const tokens = submissionResults.map((res) => res.token);
          const results = await pollBatchResults(tokens);

          for (let j = 0; j < results.length; j++) {
            const result = results[j];
            if (result.status.id !== 3) {
              return res.status(400).json({
                error: `Testcase ${j + 1} failed for language ${language} in row ${i}`,
              });
            }
          }
        }

        // Create or find companies with case-insensitive handling
        const companyConnections = [];
        if (companies && companies.length > 0) {
          // Normalize company names to title case
          const normalizedCompanies = companies.map(name => 
            name.trim().toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
          );

          for (const companyName of normalizedCompanies) {
            // Case-insensitive search for existing company
            let company = await db.company.findFirst({
              where: {
                name: {
                  equals: companyName,
                  mode: 'insensitive'
                }
              }
            });

            if (!company) {
              // Create with normalized name
              company = await db.company.create({
                data: { name: companyName }
              });
            }

            companyConnections.push({ id: company.id });
          }
        }

        // Create problem in database
        const problem = await db.problem.create({
          data: {
            title,
            description,
            Difficulty: difficulty,
            tags,
            examples,
            constraints,
            testcases,
            codeSnippets,
            referenceSolution: referenceSolutions,
            userId: req.user.id,
            companies: {
              connect: companyConnections
            }
          },
        });

        problems.push(problem);
      } catch (error) {
        return res.status(400).json({
          error: `Error parsing JSON data in row ${i + 1}`,
          details: error.message,
          receivedData: record
        });
      }
    }

    return res.status(201).json({
      success: true,
      message: `Successfully imported ${problems.length} problems`,
      problems,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error while importing problems from CSV",
      details: error.message
    });
  }
};

export const downloadProblemTemplate = async (req, res) => {
  try {
    // Sample data that demonstrates the expected format
    const sampleData = [
      {
        title: "Add Two Numbers",
        description: "Given two numbers a and b add them up and return the outout",
        difficulty: "EASY",
        companies: JSON.stringify([
          "Google",
          "Microsoft",
          "Amazon"
        ]),
        tags: JSON.stringify([
          "math",
          "operators",
          "addition"
        ]),
        examples: JSON.stringify({
          PYTHON: {
            input: "3 7",
            output: "10",
            explanation: "Adding 3 and 7 gives 10."
          },
          JAVASCRIPT: {
            input: "-5 12",
            output: "7",
            explanation: "Adding -5 and 12 gives 7."
          }
        }),
        constraints: JSON.stringify("-10^9 ≤ a, b ≤ 10^9"),
        testcases: JSON.stringify([
          {
            input: "100 200",
            output: "300"
          },
          {
            input: "-500 -600",
            output: "-1100"
          },
          {
            input: "0 0",
            output: "0"
          }
        ]),
        codeSnippets: JSON.stringify({
          JAVASCRIPT: `const fs = require('fs');

function addTwoNumbers(a, b) {
    // Write your code here
    // Return the sum of a and b
    return a + b;
}

// Reading input from stdin (using fs to read all input)
const input = fs.readFileSync(0, 'utf-8').trim();
const [a, b] = input.split(' ').map(Number);

console.log(addTwoNumbers(a, b));`,
          PYTHON: `def add_two_numbers(a, b):
    # Write your code here
    # Return the sum of a and b
    return a + b

import sys
input_line = sys.stdin.read()
a, b = map(int, input_line.split())
print(add_two_numbers(a, b))`,
          JAVA: `import java.util.Scanner;

public class Main {
    public static int addTwoNumbers(int a, int b) {
        // Write your code here
        // Return the sum of a and b
        return a + b;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println(addTwoNumbers(a, b));
    }
}`
        }),
        referenceSolutions: JSON.stringify({
          JAVASCRIPT: `const fs = require('fs');

// Reading input from stdin (using fs to read all input)
const input = fs.readFileSync(0, 'utf-8').trim();
const [a, b] = input.split(' ').map(Number);

console.log(a + b);`,
          PYTHON: `import sys
input_line = sys.stdin.read()
a, b = map(int, input_line.split())
print(a + b)`,
          JAVA: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println(a + b);
    }
}`
        })
      }
    ];

    // Create CSV header
    const header = [
      'title',
      'description',
      'difficulty',
      'companies',
      'tags',
      'examples',
      'constraints',
      'testcases',
      'codeSnippets',
      'referenceSolutions'
    ];

    // Format data for CSV
    const rows = sampleData.map(item => [
      item.title,
      item.description,
      item.difficulty,
      item.companies,
      item.tags,
      item.examples,
      item.constraints,
      item.testcases,
      item.codeSnippets,
      item.referenceSolutions
    ]);

    // Add header to rows
    rows.unshift(header);

    // Convert to CSV string
    const csvString = await new Promise((resolve, reject) => {
      stringify(rows, {
        quoted: true,
        quoted_empty: true
      }, (err, output) => {
        if (err) reject(err);
        else resolve(output);
      });
    });

    // Set response headers for file download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=problem_template.csv');

    // Send the CSV file
    return res.send(csvString);

  } catch (error) {
    return res.status(500).json({
      error: "Error while generating template"
    });
  }
};