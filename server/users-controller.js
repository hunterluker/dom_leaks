module.exports = {
  getAllUsers: (req, res) => {
    const db = req.app.get('db');

    db.get_users()
      .then(resp => {
        res.status(200).send(resp);
      })
      .catch(err => console.log(err));
  },

  getUser: (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;

    db.get_user_by_id([id])
      .then(resp => {
        res.status(200).send(resp);
      })
      .catch(err => console.log(err));
  }
};
