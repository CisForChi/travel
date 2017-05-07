import React from 'react';
import ReactDOM from 'react-dom';



 var config = {
    apiKey: "AIzaSyDG0LMRfhxERJZdfJGSal4KkAMPY62tF0w",
    authDomain: "traveldiaries-8e21d.firebaseapp.com",
    databaseURL: "https://traveldiaries-8e21d.firebaseio.com",
    projectId: "traveldiaries-8e21d",
    storageBucket: "traveldiaries-8e21d.appspot.com",
    messagingSenderId: "718347196893"
  };
  firebase.initializeApp(config);



class App extends React.Component {
	constructor(){

		super();

		this.state = {
			photos:[]
		};
	}
	componentDidMount(){
		  firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				firebase.database().ref(`users/${user.uid}/photos`)
					.on('value', (res) => {
						let userData = res.val();
						let dataArray = [];
						for(let key in userData) {
							userData[key].key = key;
							dataArray.push(userData[key])
						}
						this.setState({
							photos: dataArray
						});
					});
			}
		});
			this.uploadPhoto = this.uploadPhoto.bind(this);
			// this.createEmail = this.createEmail.bind(this);
			// this.createPassword = this.createPassword.bind(this);
			// this.confirmPassword = this.confirmPassword.bind(this);
			// this.userPassword = this.userPassword.bind(this);
			// this.userEmail = this.userEmail.bind(this);
			// this.createUserModal = this.createUserModal.bind(this);
			this.loginUser = this.loginUser.bind(this);
	}

componentDidMount() {
				}
		showLoginModal(e) {
		e.preventDefault();
		this.loginModal.classList.add('show');
		this.toggleOverlay.call(this);
	}
	loginUser(e) {
		e.preventDefault();
		const user = {
			email: this.userEmail.value,
			password: this.userPassword.value
		}
		firebase.auth()
			.signInWithEmailAndPassword(user.email,user.password)
			.then((res) => {
				this.loginModal.classList.remove('show');
				this.toggleOverlay.call(this);
			})
			.catch((err) => {
				alert(err.message);
			});
	}
	createModal(e) {
		e.preventDefault();
		this.createUserModal.classList.add('show');
		this.toggleOverlay.call(this);
	}
	createUser(e) {
		e.preventDefault();

		const user = {
			email: this.createEmail.value,
			password: this.createPassword.value,
			confirm: this.confirmPassword.value
		};
		if(user.confirm !== user.password) {
			alert('Please make sure you passwords match.');
			return;
		}
		firebase.auth()
			.createUserWithEmailAndPassword(user.email,user.password)
			.then((res) => {
				this.createUserModal.classList.remove('show');
				this.toggleOverlay.call(this);
			})
			.catch((err) => {
				alert(err.message)
			});

	}

	uploadPhoto(e) {
        console.log('upload photo')
        let file = e.target.files[0];
        const storageRef = firebase.storage().ref('photos/' + file.name);
        const task = storageRef.put(file).then(() => {
            const urlObject = storageRef.getDownloadURL().then((data) => {
                console.log("picture", data);
                this.setState ({
                    photo: data
                })
            })
        });

    }

    render() {
     	return (
      		<div class="container">
        	<div className="header">
         		<h1>
      			 Where Do You Go?
        		 </h1>
        		   <div className="form">
         
        
       

     
       

         	<div className="overlay" ref={ref => this.overlay = ref}>

       
         
				<div className="loginModal modal" ref={ref => this.loginModal = ref}>
					<form action="" onSubmit={e => this.loginUser.call(this,e)}>
						<div>
						 
							<label className="email" htmlFor="email">Email:</label>
							<input type="text" name="email" ref={ref => this.userEmail = ref}/>
						</div>
						<div>
							<label htmlFor="password">Password:</label>
							<input type="password" name="password" ref={ref => this.userPassword = ref}/>
						</div>
						<div>
							<input className="submit" type="submit" value="login"/>
						</div>
					</form>
				</div>
				
				<div className="createUserModal modal" ref={ref => this.createUserModal = ref}>
					<form action="" onSubmit={e => this.createUser.call(this,e)}>
						<div>
							<label htmlFor="createEmail">Email:</label>
							<input type="text" name="createEmail" ref={ref => this.createEmail = ref}/>
						</div>
						<div>
							<label htmlFor="createPassword">Password:</label>
							<input type="password" name="createPassword" ref={ref => this.createPassword = ref}/>
						</div>
						<div>
							<label htmlFor="confirmPassword">Confirm Password:</label>
							<input type="password" name="confirmPassword" ref={ref => this.confirmPassword = ref}/>
						</div>
						<div>
							<input type="submit"/>
						</div>
					</form>
				</div>
        </div>
        </div>
        <div> 
        	<input type="file" accept="image/*" onChange={this.uploadPhoto}/>
			<img src={this.state.photo}/>
		</div>
		<div>
        <img src={this.state.Uploadphoto}/>
        </div>
        	<div class="submitBtn">
        	<input className="uploadPhoto" type="submit" value="Add Photo"/>
           </div>
		  
     
     
   
    
   
     </div>
     </div>
      )

    }
	}

ReactDOM.render(<App />, document.getElementById('app'));
