import express from 'express';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider , signInWithPopup } from "firebase/auth"
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fetch from 'node-fetch';
import * as checker from './checker.js';
import { collection, getDocs } from 'firebase/firestore';
import { getFirestore,addDoc } from "firebase/firestore";


config();
const firebaseConfig = {
    apiKey: process.env.Firebase_api,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
    };


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4000;
const pap = initializeApp(firebaseConfig);
// google authentication
const auth = getAuth(pap);
const googleAuthProvider = new GoogleAuthProvider();

const db = getFirestore(pap);
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../')));

const apiUrl = 'https://newsapi.org/v2/everything?q=';
let f_article;
app.post('/ip',async (req,res)=>{
    try{
        console.log("after");
        const ipadd=req.body.IP; 
        if(!ipadd){
            return res.status(400).json();
    }
    console.log("Searching about the IP");
    const record = await checker.IPchecker(ipadd);
    console.log(record);
    if(!record){
        res.status(500).json({ error: 'No data found for provided IP.' });
    }
    res.json(record);
    }
    catch(err){
        console.log(`Error in reporting ${err.message}`);
        res.status(500).json({ error: 'Invalid IP' });
    }
});
app.get('/featured-articles', async (req, res) => {
    try {
        const articlesCollection = collection(db, 'blogs');
        const querySnapshot = await getDocs(articlesCollection);
        const featuredArticles = [];

        querySnapshot.forEach((doc) => {
            featuredArticles.push(doc.data());
        });

        res.json(featuredArticles);
    } catch (error) {
        console.error('Error fetching featured articles:', error);
        res.status(500).json({ error: 'Failed to fetch featured articles' });
    }
});
app.get(`/articlepage`, async (req, res) => {
        try {
        const articleID = req.query.articleID;
        const articlesCollection = collection(db, 'blogs');
        const querySnapshot = await getDocs(articlesCollection);
        const featuredArticles = [];

        querySnapshot.forEach((doc) => {
            featuredArticles.push(doc.data());
        });
        res.json(featuredArticles);
    } catch (error) {
        console.error('Error fetching featured articles:', error);
        res.status(500).json({ error: 'Failed to fetch featured articles' });
    }
});


app.post('/domain',async (req,res)=>{
    try{
        const mainUrl=req.body.Domain; 
        if(!mainUrl){
            return res.status(400).json();
    }
    console.log("Searching about the domain");
    const record = await checker.domainReport(mainUrl);
    if(!record){
        res.status(500).json({ error: 'No data found for provided website.' });
    }
    res.json(record);
    }
    catch(err){
        console.log(`Error in reporting ${err.message}`);
        res.status(500).json({ error: 'Invalid URL, try adding https or check for typos' });
    }
});
app.get('/news/:query', async (req, res) => {
    const query = req.params.query;
    const apiKey=process.env.News_key;
    try {
        const response = await fetch(`${apiUrl}${query}&apiKey=${apiKey}`);

        if (!response.ok) {
            throw new Error(`Network response was not ok (status: ${response.status})`);
        }

        const data = await response.json();
        res.json(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ error: "An error occurred while fetching news. Please try again later." });
    }
});
app.post('/submit-article', async (req, res) => {
    const { title,author, description, content,date } = req.body;
    const articlesCollection = collection(db, 'blogs');

    try {
        const docRef = await addDoc(articlesCollection, {
            title,
            author,
            description,
            content,
            date,
        });

        console.log('Document ID:', docRef.id);
        res.status(200).json({ message: 'Article submitted successfully' });
    } catch (error) {
        console.error('Error submitting article:', error);
        res.status(500).json({ error: 'Failed to submit article' });
    }
});


app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
});

