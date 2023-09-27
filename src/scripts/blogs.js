import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  _redacted_
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase authentication setup
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

// Function to handle Google login
function handleGoogleLogin() {
  signInWithPopup(auth, googleAuthProvider)
    .then((userCredential) => {
      // Handle successful sign-in here
      const user = userCredential.user;
      console.log("Logged in user:", user);
      showSuccessToast(`Login successful  ${userName}`);
    })
    .catch((error) => {
      // Handle sign-in error here
      console.error("Google Sign-In error:", error);
    });
}

function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Handle successful sign-out here
        console.log("User signed out");
        showSuccessToast("Logout successful");
      })
      .catch((error) => {
        // Handle sign-out error here
        console.error("Sign-Out error:", error);
      });
  }

function handleGoogleSignup() {
    signInWithPopup(auth, googleAuthProvider)
      .then((userCredential) => {
        // Handle successful sign-up here
        const user = userCredential.user;
        console.log("Signed up user:", user);
  
        // Optionally, you can save user data to your Firebase Firestore or perform other actions
        // For example, you can add the user to a "users" collection in Firestore.
        // const usersCollection = collection(db, 'users');
        // addDoc(usersCollection, {
        //   uid: user.uid,
        //   displayName: user.displayName,
        //   email: user.email,
        //   // Add other user data fields as needed
        // });
      })
      .catch((error) => {
        // Handle sign-up error here
        console.error("Google Sign-Up error:", error);
      });
  }


  auth.onAuthStateChanged((user) => {
    updateLoginButton(user);    
    updateWriteArticleButtonVisibility(user);
    updateGreetingText(user);
    if (user) {
      // User is signed in
      console.log("User is signed in:", user);
      // You can perform actions when the user is signed in here
    } else {
      // User is signed out
      console.log("User is signed out");
      // You can perform actions when the user is signed out here
    }
  });


  function updateLoginButton(user) {
    const loginButton = document.getElementById("loginButton");
    if (user) {
      // User is signed in
      loginButton.textContent = "Logout";
      loginButton.classList.add("red-button"); 
    } else {
      // User is signed out
      loginButton.textContent = "Login / SignUp";
      loginButton.classList.remove("red-button"); 
    }
  }

  function updateWriteArticleButtonVisibility(user) {
    const writeArticleButton = document.getElementById("writeArticleBtn");
    if (user) {
      // User is signed in, show the button
      writeArticleButton.style.display = "block";
    } else {
      // User is signed out, hide the button
      writeArticleButton.style.display = "none";
    }
  }

  function updateGreetingText(user) {
    const helpText = document.getElementById("helpText");
    if (user) {
      // User is signed in, display "Hello" with the user's display name
      const userName = user.displayName ? user.displayName : "User";
      helpText.textContent = `Hello, ${userName}!`;
    } else {
      // User is signed out, display "Login to Write Article"
      helpText.textContent = "Login to Write Article";
    }
  }

  function showSuccessToast(message) {
    toastr.success(message);
  }

  
  
  export { handleGoogleLogin, handleGoogleSignup , handleSignOut};


document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitArticle');

    submitButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const articleTitle = document.getElementById('articleTitle').value;
        const articleAuthor=document.getElementById('authorName').value;
        const articleDesc = document.getElementById('articleDesc').value;
        const articleContent = document.getElementById('articleContent').value;
        const curdate=(new Date()).toDateString();
        const articleData = {
            title: articleTitle,
            author:articleAuthor,
            description: articleDesc,
            content: articleContent,
            date:curdate.toString()
        };

        try {
            const response = await fetch('/submit-article', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(articleData),
            });

            if (response.ok) {
                
                alert('Article submitted successfully.');
            } else {
                alert('Error submitting article. Please try again later.');
            }
        } catch (error) {
            console.error('Error submitting article:', error);
        }
    });
});
async function displayFeaturedArticles() {
    const articlesContainer = document.querySelector('.home-articles');

    try {
        const response = await fetch('/featured-articles');
        const featuredArticles = await response.json();
        //console.log(featuredArticles);
        featuredArticles.forEach((articleData) => {
            const articleElement = createArticleElement(articleData);
            articlesContainer.appendChild(articleElement);
        });
    } catch (error) {
        console.error('Error fetching featured articles:', error);
    }
}
let articleID=0;
function createArticleElement(articleData) {
    const articleContainer = document.createElement('div');
    articleContainer.classList.add('home-article'); 

    const articleContent = document.createElement('div');
    articleContent.classList.add('home-article-content', 'font1');

    const articleLink = document.createElement('a');
    articleLink.href = `./articles/articles.html?articleID=${articleID}`; 
    articleLink.innerHTML = `<h3>${articleData.title}</h3>`;
    articleContent.appendChild(articleLink);

    const Desc = document.createElement('div');
    Desc.textContent = articleData.description;
    articleContent.appendChild(Desc); 

    const articleInfo = document.createElement('span');
    articleInfo.textContent = `${articleData.author} | ${articleData.date}`;
    articleContent.appendChild(articleInfo); 

    articleContainer.appendChild(articleContent);
    articleID=Number(articleID);
    ++articleID;
    return articleContainer;
}
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedArticles();
});


const modal = document.getElementById('myModal-auth');
const lButton = document.getElementById('loginButton');
const closeModal = document.getElementById('closeModal');

// When the loginButton is clicked, show the modal
lButton.addEventListener('click', () => {
   
    modal.style.display = 'block';
});

// When the user clicks the close button, close the modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// When the user clicks outside the modal, close it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


document.getElementById('loginWithGoogle').addEventListener('click', () => {
    // Redirect the user to Google sign-in
    // window.location.href = '/signin-google';
    handleGoogleLogin();
    modal.style.display = 'none';
    
});

document.getElementById('signupWithGoogle').addEventListener('click', () => {
    // Redirect the user to Google sign-in
    console.log("clicked on signUp");
    showSuccessToast("Successfull");
    // window.location.href = '/signup-google';
    handleGoogleSignup();
    modal.style.display = 'none';
});


document.getElementById("loginButton").addEventListener("click", () => {
    const loginButton = document.getElementById("loginButton");
    if (loginButton.classList.contains("red-button")) {
      // Button is red (user is logged in), perform sign out
      modal.style.display  = 'none';
      console.log("You are Logged Out");
      handleSignOut();
      modal.style.display = 'none';
    } 
  });

