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
            where:{
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
        console.error("Fetch Submissions Error:", error);
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

export const getUserStatistics = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Get all user submissions
        const userSubmissions = await db.submission.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                problem: true
            }
        });

        // Calculate statistics
        const totalSubmissions = userSubmissions.length;
        const acceptedSubmissions = userSubmissions.filter(s => 
            s.status?.toUpperCase() === 'ACCEPTED'
        );
        
        const uniqueSolvedProblems = new Set(
            acceptedSubmissions.map(s => s.problemId)
        ).size;

        const successRate = totalSubmissions > 0 ? 
            Math.round((acceptedSubmissions.length / totalSubmissions) * 100) : 0;

        const statistics = {
            totalSubmissions,
            acceptedSubmissions: acceptedSubmissions.length,
            uniqueSolvedProblems,
            successRate,
            lastSubmission: userSubmissions[0] || null
        };

        res.status(200).json({
            success: true,
            message: "User statistics fetched successfully",
            statistics
        });
    } catch (error) {
        console.error("Error fetching user statistics:", error);
        res.status(500).json({ error: "Failed to fetch user statistics" });
    }
};

export const getAdminStatistics = async (req, res) => {
    try {
        // Verify admin role
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: "Unauthorized access" });
        }

        // Get all submissions and problems
        const submissions = await db.submission.findMany({
            include: {
                user: true,
                problem: true
            }
        });

        const problems = await db.problem.findMany();

        // Calculate statistics
        const totalSubmissions = submissions.length;
        const acceptedSubmissions = submissions.filter(s => 
            s.status?.toUpperCase() === 'ACCEPTED'
        );
        
        const uniqueUsers = new Set(submissions.map(s => s.userId)).size;

        const successRate = totalSubmissions > 0 ? 
            Math.round((acceptedSubmissions.length / totalSubmissions) * 100) : 0;

        const adminStatistics = {
            totalProblems: problems.length,
            totalSubmissions,
            acceptedSubmissions: acceptedSubmissions.length,
            uniqueUsers,
            successRate
        };

        res.status(200).json({
            success: true,
            message: "Admin statistics fetched successfully",
            statistics: adminStatistics
        });
    } catch (error) {
        console.error("Error fetching admin statistics:", error);
        res.status(500).json({ 
            success: false,
            error: "Failed to fetch admin statistics",
            details: error.message 
        });
    }
};

