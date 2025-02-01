

import redis from "./connect.js";




const deleteAll = async (req, res) => {
    try {
        await redis.flushall();  // Using the Redis instance to call flushall
        res.status(200).json({ msg: "Caches are deleted" });
    } catch (e) {
        console.log(`Caches deleting failed with Error: ${e}`);
        res.status(500).json({ msg: "Internal Server Down" });
    }
};

export default deleteAll;
