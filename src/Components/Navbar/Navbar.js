import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import { Link } from 'react-router-dom';
import leaks from '../../images/037-drop.svg';
import house from '../../images/011-house.svg';
import submit from '../../images/033-file.svg';
import user from '../../images/024-hacker.svg';
import comment from '../../images/020-comment.svg';
import news from '../../images/028-newspaper.svg';
import $ from 'jquery';

class Navbar extends Component {
  render() {
    $(document).ready(function() {
      var active1 = false;
      var active2 = false;
      var active3 = false;
      var active4 = false;
      var active5 = false;
      var active6 = false;

      $('.radial-menu').bind('mouseenter touchstart', function() {
        if (!active1)
          $(this)
            .find('.menu-item1')
            .css({
              'background-color': 'white',
              transform: 'translate(-100px, 0px)'
            });
        else
          $(this)
            .find('.menu-item1')
            .css({ 'background-color': 'white', transform: 'none' });
        if (!active2)
          $(this)
            .find('.menu-item2')
            .css({
              'background-color': 'white',
              transform: 'translate(-80px, 45px)'
            });
        else
          $(this)
            .find('.menu-item2')
            .css({ 'background-color': 'white', transform: 'none' });
        if (!active3)
          $(this)
            .find('.menu-item3')
            .css({
              'background-color': 'white',
              transform: 'translate(-45px, 80px)'
            });
        else
          $(this)
            .find('.menu-item3')
            .css({ 'background-color': 'white', transform: 'none' });
        if (!active4)
          $(this)
            .find('.menu-item4')
            .css({
              'background-color': 'white',
              transform: 'translate(0px, 100px)'
            });
        else
          $(this)
            .find('.menu-item4')
            .css({ 'background-color': 'white', transform: 'none' });
        if (!active5)
          $(this)
            .find('.menu-item5')
            .css({
              'background-color': 'white',
              transform: 'translate(-53px, 0px)'
            });
        else
          $(this)
            .find('.menu-item5')
            .css({ 'background-color': 'white', transform: 'none' });
        if (!active6)
          $(this)
            .find('.menu-item6')
            .css({
              'background-color': 'white',
              transform: 'translate(0px, 50px)'
            });
        else
          $(this)
            .find('.menu-item6')
            .css({ 'background-color': 'white', transform: 'none' });
        active1 = !active1;
        active2 = !active2;
        active3 = !active3;
        active4 = !active4;
        active5 = !active5;
        active6 = !active6;
      });
    });
    return (
      <div className="fluid-container header">
        <nav className="navbar navbar-light justify-content-between">
          <a className="navbar-brand text-white" href="http://localhost:3000/">
            <Spinner name="triangle-skew-spin" color="white" />
            DOM LEAKS
          </a>

          <div className="radial-menu">
            <Link to="/">
              <div className="menu-item1">
                <img width="26px" src={house} alt="" />
                {/* <i className="fas fa-home" /> */}
              </div>
            </Link>

            <Link to="/leaks">
              <div className="menu-item2">
                <img width="26px" src={leaks} alt="" />
                {/* <i className="fas fa-sitemap" /> */}
              </div>
            </Link>

            <Link to="/submit">
              <div className="menu-item3">
                <img width="26px" src={submit} alt="" />
                {/* <i className="fas fa-terminal" /> */}
              </div>
            </Link>

            <Link to="/donate">
              <div className="menu-item4">
                <img width="26px" src={user} alt="" />
                {/* <i className="fas fa-user-secret" /> */}
              </div>
            </Link>

            <Link to="/chatroom">
              <div className="menu-item5">
                <img width="26px" src={comment} alt="" />
              </div>
            </Link>

            <Link to="/news">
              <div className="menu-item6">
                <img width="26px" src={news} alt="" />
              </div>
            </Link>

            <div className="navbar-icon bg-light p-2 mask">
              <span className="navbar-toggler-icon" />
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
