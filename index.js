const ig = require("./instagram");
const username = "-----------";
const password = "-----------";
(async () => {
  await ig.initialize();

  await ig.login(username, password);

  await ig.likeTagsProcess(["fat", "jet"]);
})();
