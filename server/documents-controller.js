module.exports = {
  getAllDocs: (req, res) => {
    const db = req.app.get('db');

    db.get_all_docs()
      .then(resp => {
        res.status(200).send(resp);
      })
      .catch(err => console.log(err));
  },

  getDocsAndLeaks: (req, res) => {
    const db = req.app.get('db');

    db.get_all_docs_leaks()
      .then(resp => {
        res.status(200).send(resp);
      })
      .catch(err => console.log(err));
  },

  deleteDoc: (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;

    db.delete_doc([id])
      .then(resp => {
        res.status(200).send(resp);
      })
      .catch(err => console.log(err));
  }
};
