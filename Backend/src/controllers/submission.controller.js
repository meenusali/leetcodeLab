import {db} from "../libs/db.js"
export  const getAllSubmission = async(req , res)=>{
    try {
        const userId = req.user.id;
        const Submissions = await db.submission.findMany({
            where:{
                userId:userId
            }
        })

        res.status(200).json({
            success:true,
            message:"Submissions fetched successfully",
            Submissions
        })
    } catch (error) {
        console.error("Fetch Submissions Error:, error");
        res.status(500).json({error: "Failed to fetch submissions"});
    }
}

export const getSubmissionsForProblem = async (req, res)=>{
    try {
        const userId = req.user.id;
        const problemId = req.params.problemId;
        const Submissions = await db.submission.findMany({
            wher:{
                userId:userId,
                problemId:problemId
            }
        })
        res.status(200).json({
            success:true,
            message:"Submission fetched successfully",
            Submissions
        })
    } catch (error) {
        console.error("Fetch Submissions Error:, error");
        res.status(500).json({error: "Failed to fetch submissions"});
    }
}


export const getAllTheSubmissionsForProblem = async (req, res)=>{
    try {
        const problemId = req.params.problemId;
        const submission = await db.submission.count({
            where:{
                problemId:problemId
            }
        })
        res.status(200).json({
            success:true,
            message:"Submissions fetched successfully",
            count:submission
        })
    } catch (error) {
        console.error("Fetch Submissions Error:, error");
        res.status(500).json({error: "Failed to fetch submissions"});
    }
}