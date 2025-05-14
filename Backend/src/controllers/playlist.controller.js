export const createPlaylist = async (req , res)=>{
    try {
        const {name, description} = req.body;
        const userId = req.user.id;

        const playlist = await db.playlist.create({
            data:{
                name, 
                description,
                userId
            }
        });

        res.status(200).json({
            success:true,
            message:"Playlist created successfully",
            playlist
        })
    } catch (error) {
        console.error('Error creating playlist:', error);
        res.status(500).json({ error: 'Failed to create playlist'});
    }
}

export const getAllListDetails = async (req , res)=>{

    try {
        const playlists = await db.playlist.findMany({
            where:{
                userId:req.user.id
            },
            include:{
                problems:{
                    include:{
                        problem:true
                    }
                }
            }
        });
        res.status(200).json({
            success:true,
            message:"Playlist fetched successfully",
            playlists
        })
        
    } catch (error) {
        console.error('Error creating playlist:', error);
        res.status(500).json({ error: 'Failed to create playlist'});
    }
}

export const getPlayListDetails = async (req , res)=>{
    const {playlistId} = req.params;
    try {
        const playlist = await db.playlist.findUnique({
            wherre:{
                id:playlistId,
                userId:req.user.id
            },
            include:{
                problems:{
                    include:{
                        problem:true
                    }
                }
            }
        });
         if(!playlist){
            return res.status(404).json({error:"Playlist not found"});
         }
         res.status(200).json({
            success: true,
            message: 'Playlist fetched successfully',
            playlist,
         });
    } catch (error) {
        console.error('Error creating playlist:', error);
        res.status(500).json({ error: 'Failed to create playlist'});
    }
}

export const addProblemToPlaylist = async (req , res)=>{
    const {playlistId} = req.params;
    const {problemIds} = req.body;

    try {
        if(!Array.isArray(problemIds) || problemIds.length === 0){
            return res.status(400).json({error:"Invalid or missing problemsId"})
        }
            const problemsInPlaylist =  await db.problemInPlaylist.createMany({
                data:problemIds.map((problemId)=>({
                    playlistId,
                    problemId
                }))
            })
        res.status(201).json({
            success: true,
            message: 'Problems added to playlist successfully',
            problemsInPlaylist,
        })
        
    } catch (error) {
         console.error('Error adding problem in playlist:', error);
        res.status(500).json({ error: 'Failed to adding problem in playlist'});
    }
}

export const deletePlaylist = async (req , res)=>{}

export const removeProblemFromPlaylist = async (req , res)=>{}