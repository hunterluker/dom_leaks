// import React, { Component } from 'react';
// import axios from 'axios';
// import { connect } from 'react-redux';
// import { updateUser } from '../../ducks/users';
// import { Link } from 'react-router-dom';
// import bitcoin from '../../images/bitcoin.png';

// class Profile extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       user: {},
//       level: ''
//     };
//   }

//   async componentDidMount() {
//     let userData = await axios.get('/api/user-data');

//     this.props.updateUser(userData.data);
//   }

//   deleteAccount(id) {
//     axios.delete(`/api/user-data/${id}`).then(resp => {
//       this.props.updateUser({});
//     });
//   }

//   render() {
//     let { user } = this.props;

//     return (
//       <div>
//         <div className="page-welcome">
//           {' '}
//           <span className="page-number">04</span> Profile
//         </div>

//         {user.user_name ? (
//           <div className="container text-white">
//             <a href="http://localhost:3005/auth/logout">
//               <button className="btn btn-danger logout-btn">Logout</button>
//             </a>

//             <Link to="/">
//               <button
//                 className="btn btn-danger deleteAcc-btn"
//                 onClick={() => this.deleteAccount(user.user_id)}
//               >
//                 Delete Account
//               </button>
//             </Link>

//             <div
//               className="modal fade"
//               id="bitcoinModal"
//               role="dialog"
//               aria-labelledby="bitcoinModal"
//               aria-hidden="true"
//             >
//               <div className="modal-dialog" role="document">
//                 <div className="modal-content">
//                   <div className="card-header">
//                     <button
//                       type="button"
//                       className="close ml-auto"
//                       data-dismiss="modal"
//                       aria-label="Close"
//                     >
//                       <span aria-hidden="true">&times;</span>
//                     </button>
//                   </div>

//                   <div className="modal-body">
//                     <img width="200px" src={bitcoin} alt="" />
//                   </div>
//                   <div className="modal-footer">
//                     <button
//                       type="button"
//                       className="btn btn-secondary"
//                       data-dismiss="modal"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="please-login">
//             <p>Please Login</p>
//             <a href="http://localhost:3005/auth/logout">
//               <button className="btn btn-danger">Login</button>
//             </a>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   const { user } = state.users;
//   return {
//     user
//   };
// }

// export default connect(
//   mapStateToProps,
//   { updateUser }
// )(Profile);
