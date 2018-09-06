module.exports = {
  getLeaks: (req, res) => {
    const db = req.app.get('db');

    db.get_leaks()
      .then(resp => {
        res.status(200).send(resp);
      })
      .catch(err => res.status(500).send(err));
  },

  getLeak: (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;

    db.get_leak([id])
      .then(resp => {
        res.status(200).send(resp);
      })
      .catch(err => res.status(500).send(err));
  },

  addLeak: (req, res) => {
    const db = req.app.get('db');
    const { date, image, title, description } = req.body;

    db.create_leak([date, image, title, description])
      .then(resp => {
        res.status(200).send(resp);
      })
      .catch(err => res.status(500).send(err));
  },

  deleteLeak: (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;

    db.delete_leak([id])
      .then(resp => {
        res.status(200).send(resp);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  updateLeak: (req, res) => {
    const db = req.app.get('db');
    const { date, image, title, description } = req.body;
    const { id } = req.params;

    db.update_leak([id, date, image, title, description])
      .then(resp => {
        res.status(200).send(resp);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  }
};
