import {db} from "../libs/db.js"

export const getProfiledata = async (req, res)=>{
    try {
        // const userId = req.user.id;
        const userId = req.params.id;
const [user_info, allProblems, solvedCount,submission, usersolvedpro] = await Promise.all([
  db.user.findUnique({
    where: { id: userId },
    include: {
      _count: {
        select: {
          submission: true,
          problemSolved: true,
        },
      },
    },
  }),

 db.problem.groupBy({
  by: ['Difficulty'],
  _count: {
    _all: true,
  },
 }),

  db.problemSolved.count({
    where: {
      userId: req.user.id,
    },
  }),
  db.submission.findMany({
    where: {
      userId: req.user.id,
    },
    include: {
      problem:true
     }
  }),
   db.problemSolved.findMany({
    where: {
      userId: req.user.id,
    },
     include: {
      problem:true
     }
  }),
]);
const solvedByDifficulty = {
  Easy: usersolvedpro.filter(problem => problem.problem.Difficulty.toLowerCase() === 'easy').length,
  Medium: usersolvedpro.filter(problem => problem.problem.Difficulty.toLowerCase() === 'medium').length,
  Hard: usersolvedpro.filter(problem => problem.problem.Difficulty.toLowerCase() === 'hard').length
};

console.log("solvedByDifficulty ",solvedByDifficulty)
const problemcount = allProblems.reduce((acc, cur) => {
  acc[cur.Difficulty.toLowerCase()] = cur._count._all;
  return acc;
}, {});


// Return or use them together
res.json({
  message: "Profile data fetched successfully",
  user: {
    ...user_info,
    password: undefined, // mask if necessary
  },
  problemcount,
  solvedCount,
  submission,
  solvedByDifficulty
});
    } catch (error) {
        console.error("Fetch Submissions Error:", error);
        res.status(500).json({error: "Failed to fetch submissions"});
    }
}