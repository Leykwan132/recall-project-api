const handleProfileGet = (req, res, db) => {
  const { userId } = req.params;
  let found = false;
  db.select("*")
    .from("users")
    .where({
      id: userId,
    })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((e) => {
      res.status(400).json("error getting user");
    });
};

module.exports = {
  handleProfileGet,
};
