const ig = require("./instagram");
const username = "sagarsharma4244";
const password = "purnima9236727082";
(async () => {
  await ig.initialize();

  await ig.login(username, password);

  await ig.likeTagsProcess(["fat", "jet"]);
})();
