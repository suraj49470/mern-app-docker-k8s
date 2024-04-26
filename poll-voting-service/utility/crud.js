const vote = require("../models/vote");
module.exports = {
    CREATE_POLL: async  (payload) => {
        try{
            return await new vote(payload).save();
        }catch(e){
            throw e;
        }
    },
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
    },
    UPDATE_POLL_BY_ID: async (payload) => {
        try {
            const query = {
                _id: payload._id,
                options: {
                    $elemMatch : {
                            id: payload.id
                        }
                }
            };
            const update = {
                    $inc: {
                        'total_votes': 1,
                        'options.$.number_of_votes': 1
                    }
            }
            return await vote.updateOne(query,update);
        } catch (e) {
            throw e;
        }
    }
}