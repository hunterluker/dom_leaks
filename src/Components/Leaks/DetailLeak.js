import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import file from '../../images/033-file.svg';

class DetailLeak extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leak: {}
    };
  }

  componentDidMount() {
    axios.get(`/api/leaks/${this.props.match.params.id}`).then(resp => {
      this.setState({
        leak: resp.data[0]
      });
    });
  }

  render() {
    return (
      <div className="container detail-leak-container">
        {/* <div className="page-welcome">
          {' '}
          <span className="page-number" />
        </div> */}
        <Link to="/leaks" className="back-icon">
          <i className="fas fa-arrow-circle-left" /> Back
        </Link>
        <hr />

        <h2 className="leak-title pb-4">{this.state.leak.title}</h2>
        <div className="my-2">
          <p className="leak-desc">{this.state.leak.description}</p>
        </div>

        <div className="documents my-5">
          <h4 className="text-left pb-2">Leaked Documents:</h4>
          <a href={this.state.leak} download>
            <img
              className="float-left mb-5"
              src={file}
              alt="file-download"
              width="45px"
            />
          </a>
        </div>
      </div>
    );
  }
}

export default DetailLeak;
