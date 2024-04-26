const vote = require("../models/vote");
module.exports = {
    GET_ALL_POLLS: async () => {
        try {
            return await vote.find({}).sort({
                "createdAt": -1
            });
            
        } catch (e) {
            throw e;
        }
    },
    GET_POLL_BY_ID: async (_id) => {
        try {
            return await vote.find({_id});
        } catch (e) {
            throw e;
        }
    }
}