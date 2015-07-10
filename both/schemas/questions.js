var voteSchema = new SimpleSchema({
  userId: {
    type: String
  },
  value: {
    type: Number
  }
});

Questions.attachSchema(new SimpleSchema({

  title:{
    type: String,
  },

  question:{
    type: String
  },

  userId: {
    type: String,
    index: true
  },

  username: {
    type: String,
    index: true
  },

  votes: {
    type: Number
  },

  votedBy: {
    type: [voteSchema],
    optional: true
  },

  // Force value to be current date (on server) upon insert
  // and prevent updates thereafter.
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    }
  },
  // Force value to be current date (on server) upon update
  // and don't allow it to be set upon insert.
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  }
}));
