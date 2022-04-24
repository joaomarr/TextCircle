Meteor.methods({
  addComment: function (comment) {
    if (this.userId) {
      comment.owner = this.userId;
      return Comments.insert(comment);
    } else {
      return console.log("not adding new comment");
    }
  },

  addDoc: function () {
    var doc;
    if (!this.userId) {
      return;
    } else {
      doc = { owner: this.userId, createdOn: new Date(), title: "my new doc" };
      var id = Documents.insert(doc);
      return id;
    }
  },
  updateDocPrivacy: function (doc) {
    var realDoc = Documents.findOne({ _id: doc._id, owner: this.userId });
    if (realDoc) {
      realDoc.isPrivate = doc.isPrivate;
      Documents.update({ _id: doc._id }, realDoc);
    }
  },
  addEditingUser: function (docid) {
    var doc, user, eusers;
    doc = Documents.findOne({ _id: docid });
    if (!doc) {
      return;
    }
    if (!this.userId) {
      return;
    }
    user = Meteor.user();
    eusers = EditingUsers.findOne({ docid: doc._id });
    if (!eusers) {
      eusers = {
        docid: doc._id,
        users: {},
      };
    }
    user.lastEdit = new Date();
    eusers.users[this.userId] = user;

    EditingUsers.upsert({ _id: eusers._id }, eusers);
  },
});
