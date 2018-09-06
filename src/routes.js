import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Components/Home/Home';
import Leaks from './Components/Leaks/Leaks';
import Leak from './Components/Leaks/DetailLeak';
import Submit from './Components/Submit/Submit';
import Success from './Components/Success/Success';
import Donate from './Components/Profile/Donate';
import News from './Components/Hacker-News/News';
import ChatRoom from './Components/ChatRoom/ChatRoom';
import Admin from './Components/Admin/Admin';
import Four from './Components/404/Four';

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/leaks" component={Leaks} />
    <Route path="/leaks/:id" component={Leak} />
    <Route path="/submit" component={Submit} />
    <Route path="/success" component={Success} />
    <Route path="/donate" component={Donate} />
    <Route path="/news" component={News} />
    <Route path="/chatroom" component={ChatRoom} />
    <Route path="/admin" component={Admin} />
    <Route component={Four} />
  </Switch>
);
