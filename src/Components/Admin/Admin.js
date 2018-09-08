import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../ducks/users';
import axios from 'axios';
import {
  Icon,
  Menu,
  Sidebar,
  Grid,
  Header,
  Segment,
  Portal
} from 'semantic-ui-react';

import Chart from './Chart';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      leaks: [],
      leak_id: 7,
      docs: [],
      user: {},
      visible: false,
      open: false,
      image: '',
      description: '',
      date: '',
      title: '',
      add: false
    };
  }

  deleteDoc(id) {
    axios.delete(`/api/docs/${id}`).then(resp => {
      this.setState({
        docs: resp.data
      });
    });
  }

  login() {
    const { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;

    let url = `${encodeURIComponent(window.location.origin)}/auth/callback`;

    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`;
  }

  addLeak() {
    const { date, image, title, description } = this.state;
    axios.post(`/api/leaks`, { date, image, title, description }).then(resp => {
      this.setState({
        leaks: resp.data,
        open: false,
        add: false
      });
    });
  }

  updateLeak(id) {
    const { date, image, title, description } = this.state;

    axios
      .put(`/api/leaks/${id}`, { date, image, title, description })
      .then(resp => {
        this.setState({
          leaks: resp.data,
          open: false
        });
      });
  }

  deleteLeak(id) {
    axios.delete(`/api/leaks/${id}`).then(resp => {
      this.setState({
        leaks: resp.data,
        open: false
      });
    });
  }

  async componentDidMount() {
    let userData = await axios.get('/api/user-data');

    this.props.updateUser(userData.data);

    axios.get('/api/leaks').then(resp => {
      this.setState({
        leaks: resp.data
      });
    });

    axios.get('/api/docs').then(resp => {
      this.setState({
        docs: resp.data
      });
    });

    // if (this.props.user.user[0]) {
    //   return (window.location.href = 'http://localhost:3000/#/admin');
    // } else {
    //   return (window.location.href = 'http://localhost:3000/#/');
    // }
  }

  handleClick = id => this.setState({ open: !this.state.open, leak_id: id });

  handleClose = () => this.setState({ open: false, add: false });

  handleButtonClick = () => this.setState({ visible: !this.state.visible });

  handleSidebarHide = () => this.setState({ visible: false });

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    let { user } = this.props;
    const { open } = this.state;

    let currentLeak = this.state.leaks.find(
      leak => leak.leak_id === this.state.leak_id
    ) || { leak_id: 1000 };

    let mappedDocs = this.state.docs.map((doc, i) => {
      return (
        <tbody key={i}>
          <tr>
            <th scope="row">{doc.leak_id}</th>
            <td>{doc.document.substring(0, 20)}</td>
            <td>
              <i
                className="fas fa-trash-alt"
                onClick={() => this.deleteDoc(doc.docs_id)}
              />
            </td>
          </tr>
        </tbody>
      );
    });

    let mappedLeaks = this.state.leaks.map((leak, i) => {
      return (
        <tbody key={i}>
          <tr>
            <th scope="row">{leak.leak_id}</th>
            <td>{leak.title}</td>
            <td>
              <i
                className="fas fa-edit"
                content={open ? 'Close Portal' : 'Open Portal'}
                negative={open}
                positive={!open}
                onClick={() => this.handleClick(leak.leak_id)}
              />{' '}
            </td>
          </tr>
        </tbody>
      );
    });
    const { visible } = this.state;

    return (
      <div>
        {user.email === 'hunterluker33@gmail.com' ? (
          <div className="admin-panel">
            <div className="container">
              <h4 className="admin-title my-2">ADMIN</h4>
            </div>
            <button onClick={this.handleButtonClick} className="sidebar-btn">
              Controls
            </button>

            <Sidebar.Pushable as={Segment}>
              <Sidebar
                as={Menu}
                animation="overlay"
                icon="labeled"
                inverted
                onHide={this.handleSidebarHide}
                vertical
                visible={visible}
                width="thin"
                height="short"
              >
                <Menu.Item as="a">
                  <Icon name="database" />
                  Database
                </Menu.Item>

                <Menu.Item as="a">
                  <Icon name="cogs" />
                  Settings
                </Menu.Item>

                <Menu.Item as="a">
                  <Icon name="users" />
                  Users
                </Menu.Item>

                <Menu.Item as="a">
                  <Icon name="chart line" />
                  Stats
                </Menu.Item>
              </Sidebar>

              <Sidebar.Pusher dimmed={visible}>
                <Segment basic className="sidebar-nav">
                  <br />
                  <br />
                  <Chart
                    docsCount={this.state.docs.length}
                    leaksCount={this.state.leaks.length}
                  />
                  <br />
                  <br />
                  <h5 className="user-title">Documents</h5>
                  <table className="table table-striped table-dark user-table">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Documents</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    {mappedDocs}
                  </table>

                  <h5 className="table-leaks mt-5 float-left">Leaks</h5>
                  <button className="post-btn">
                    <i
                      className="fas fa-plus"
                      content={open ? 'Close Portal' : 'Open Portal'}
                      negative={open}
                      positive={!open}
                      onClick={() => {
                        this.handleClick();
                        this.setState({
                          add: true
                        });
                      }}
                    />
                  </button>
                  <table className="table table-striped table-dark admin-table">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Leaks</th>
                        <th scope="col">Edit</th>
                      </tr>
                    </thead>
                    {mappedLeaks}
                  </table>

                  <a href="http://localhost:3005/auth/logout">
                    <button className="btn btn-danger btn-block mt-5 logout-btn">
                      Logout
                    </button>
                  </a>
                </Segment>
              </Sidebar.Pusher>
            </Sidebar.Pushable>

            <Grid columns={2}>
              <Grid.Column>
                <Portal onClose={this.handleClose} open={open}>
                  <Segment
                    style={{
                      width: '100%',
                      left: '0%',
                      position: 'fixed',
                      top: '-2.1%',
                      height: '100%',
                      zIndex: 1000,
                      background: '#170935'
                    }}
                  >
                    {this.state.add ? (
                      <Header className="text-light portal-head">
                        Add Leak
                      </Header>
                    ) : (
                      <Header className="text-light portal-head">
                        Edit Leak
                      </Header>
                    )}

                    <i
                      className="fas fa-window-close close-portal"
                      onClick={this.handleClose}
                    />
                    <div
                      className="text-light portal-form"
                      // onSubmit={e => e.preventDefault()}
                    >
                      <label htmlFor="">Date</label>
                      <input
                        name="date"
                        defaultValue={currentLeak.date}
                        type="text"
                        className="form-control"
                        onChange={this.onChange}
                      />
                      <label htmlFor="">Image</label>
                      <input
                        name="image"
                        defaultValue={currentLeak.image}
                        type="text"
                        className="form-control"
                        onChange={this.onChange}
                      />
                      <label htmlFor="">Title</label>
                      <input
                        name="title"
                        defaultValue={currentLeak.title}
                        type="text"
                        className="form-control"
                        onChange={this.onChange}
                      />
                      <label htmlFor="">Description</label>
                      <textarea
                        name="description"
                        rows="7"
                        defaultValue={currentLeak.description}
                        type="text"
                        className="form-control"
                        onChange={this.onChange}
                      />
                      {this.state.add ? (
                        <button
                          className="update-btn"
                          onClick={() => this.addLeak()}
                        >
                          Add
                        </button>
                      ) : (
                        <div>
                          <button
                            className="update-btn"
                            onClick={() => this.updateLeak(currentLeak.leak_id)}
                          >
                            Update
                          </button>
                          <button
                            className="update-delete-btn"
                            onClick={() => this.deleteLeak(currentLeak.leak_id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </Segment>
                </Portal>
              </Grid.Column>
            </Grid>
          </div>
        ) : (
          <div className="please-login">
            <p className="h1">Login</p>
            <button
              className="btn btn-sm btn-danger login-btn"
              onClick={this.login}
            >
              LOGIN
            </button>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.users;
  return {
    user
  };
}

export default connect(
  mapStateToProps,
  { updateUser }
)(Admin);
