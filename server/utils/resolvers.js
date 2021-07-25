const {AuthenticationError} = require('apollo-server-express');
const { Book, User, } = require('../models')

const resolvers = {
    Query:{
        me: async (parent,args,context) => {
            if (context.user) {
                const user = await User.findById({_id: context.user._id})
                .populate('savedBooks')
                .select('-__v-password');
                return user;
              }
        
              throw new AuthenticationError('Not logged in');
        },
        // book: async () => {
        //     return await Book.find();
        // }
    }
}
module.exports=resolvers