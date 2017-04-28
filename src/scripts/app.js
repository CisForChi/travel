import React from 'react';
import ReactDOM from 'react-dom';


var dbRef = firebase.database().ref();
dbRef.on('value', (data) => {
  console.log(data.val(), 'heyy');
});

class App extends React.Component {
    render() {
      return (
        <div class="header">
         <h1>
         Travel Stories
         </h1>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
