import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class DetailLeak extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leak: {},
      docs: []
    };
  }

  componentDidMount() {
    axios.get(`/api/leaks/${this.props.match.params.id}`).then(resp => {
      this.setState({
        leak: resp.data[0]
      });
    });

    axios.get('/api/docs').then(resp => {
      this.setState({
        docs: resp.data
      });
    });
  }

  render() {
    let descStr = this.state.leak.description;
    let mappedDocs = this.state.docs.map((doc, i) => {
      return doc.leak_id === this.state.leak.leak_id ? (
        <div key={i}>
          <a href={doc.document} download>
            <img
              className="float-left mb-5 file"
              src="https://wikileaks.org/vault8/img/document.png"
              alt="file-download"
              width="45px"
            />
          </a>
        </div>
      ) : null;
    });

    return (
      <div className="container detail-leak-container">
        <Link to="/leaks" className="back-icon">
          <i className="fas fa-arrow-circle-left" /> Back
        </Link>
        <hr />

        <h2 className="leak-title pb-4">{this.state.leak.title}</h2>
        <div className="my-2">
          <p className="leak-desc">{descStr}</p>
        </div>

        <div className="documents my-5">
          <h4 className="text-left pb-2">Leaked Documents:</h4>

          {mappedDocs}
        </div>
      </div>
    );
  }
}

export default DetailLeak;
