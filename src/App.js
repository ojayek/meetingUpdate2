
// eslint-disable-line no-eval
/* eslint-disable */

import logo from './logo.svg';
import './css/App.css';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import NotFound from './Component/NotFound';
import CreateForm from './Component/CreateSummaryOfMeeting';

import Loader from './Component/Common/Loader';
import Home from './Component/Home';
import MeetingState from './Context/meetingState';
import MeetingList from './Component/MeetingList';

function App() {
  return (
    <div className='App'>
      <MeetingState>
        <BrowserRouter basename='/'>
          <Switch>
            <Route exact path='/' component={MeetingList} />
            <Route exact path='/MeetingList' component={MeetingList} />
            <Route exact path='/CreateForm' component={CreateForm} />

            <Route exact path='/loader' component={Loader} />

            <Route path='/' component={NotFound} />
          </Switch>
        </BrowserRouter>
      </MeetingState>
    </div>
  );
}

export default App;
