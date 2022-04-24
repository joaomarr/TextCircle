Meteor.startup(function () {
  if (!Documents.findOne()) {
    Documents.insert({ title: "my new document" });
  }
});

Meteor.publish("documents", function () {
  return Documents.find({
    $or: [{ isPrivate: { $ne: true } }, { owner: this.userId }],
  });
});

Meteor.publish("editingUsers", function () {
  return EditingUsers.find();
});

Meteor.publish("comments", function () {
  return Comments.find();
});
