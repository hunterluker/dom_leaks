import React, { Component } from 'react';
import axios from 'axios';
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone';
import Loader from '../Loader/Loader';

export default class Submit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      email: '',
      isUploading: false,
      images: [],
      url: '',
      value: ''
    };
  }

  getSignedRequest = ([file]) => {
    this.setState({ isUploading: true });

    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;

    axios
      .get('/sign-s3', {
        params: {
          'file-name': fileName,
          'file-type': file.type
        }
      })
      .then(response => {
        const { signedRequest, url } = response.data;
        this.uploadFile(file, signedRequest, url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  uploadFile = (file, signedRequest, url) => {
    var options = {
      headers: {
        'Content-Type': file.type
      }
    };

    axios
      .put(signedRequest, file, options)
      .then(response => {
        this.setState({ isUploading: false, url: url });
        // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
      })
      .catch(err => {
        this.setState({
          isUploading: false
        });
        if (err.response.status === 403) {
          alert(
            'Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n' +
              err.stack
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    var componentConfig = {
      uploadMultiple: true,
      parallelUploads: 100,
      maxFiles: 100
    };
    return (
      <div className="container">
        <div className="page-welcome submit-welcome">
          {' '}
          <span className="page-number">03</span> Submit
        </div>

        <div className="submit-title">
          <span>DOM LEAKS / Q0CE33U06 / SUBMISSION</span>
        </div>
        <p className="submit-p">
          DOM Leaks publishes documents of political or historical importance
          that are censored or otherwise suppressed. We specialise in strategic
          global publishing and large archives.
        </p>

        <form
          id="submit-form"
          className="submit-form"
          method="POST"
          action="/send-email"
        >
          <label htmlFor="title" className="pt-2">
            Title:
          </label>
          <input
            name="title"
            id="title"
            value={this.state.title}
            type="text"
            className="form-control"
            placeholder="Give your leak a title"
            onChange={this.onChange}
          />
          <label htmlFor="description" className="pt-2">
            Description:
          </label>
          <input
            id="description"
            name="description"
            value={this.state.description}
            type="text"
            className="form-control w-100"
            placeholder="Write a description of your leak"
            onChange={this.onChange}
          />

          <label htmlFor="email" className="pt-2">
            Email:
          </label>
          <input
            id="email"
            name="email"
            value={this.state.email}
            type="text"
            className="form-control w-100"
            placeholder="Place your email here"
            onChange={this.onChange}
            required
          />

          <Dropzone
            onDropAccepted={this.getSignedRequest}
            style={{
              width: 100,
              height: 100,
              borderWidth: 7,
              autoProcessQueue: true,
              marginTop: '20px',
              borderColor: 'rgba(255, 255, 255, 0.9)',
              borderStyle: 'dashed',
              borderRadius: 5,
              alignItems: 'center',
              textAlign: 'center',
              paddingTop: '13px',
              fontSize: 14
            }}
            accept="image/*,.xlsx,.xls,.pdf,.doc,.docx,.txt,.rtf"
            multiple={true}
            config={componentConfig}
          >
            {this.state.isUploading ? (
              <Loader />
            ) : (
              <p>
                Drop Files or <br /> Click Here
              </p>
            )}
          </Dropzone>

          <button type="submit" className="submit-btn">
            Submit Leak
          </button>
        </form>
      </div>
    );
  }
}
