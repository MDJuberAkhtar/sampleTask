const axios = require('axios');
// const https = require('https');
const url = 'http://norvig.com/big.txt';

//Function to fetch document
const fetchDocument = async(url) => {
    try {
        const response = await axios.get(url);
        return response.data;
        
    } catch (error) {
        console.log('fetch::document::error::', error)
    }
  
}


// Function to check document and Find occurrences count of word in document
const  analyzeDocument = async(url)=> {
    try {

        const document = await fetchDocument(url);

        const words = JSON.stringify(document);

        const newwords = words.toLowerCase().match(/\w+/g);
       
        const counts = newwords.reduce((counts, word) => {
        counts[word] = (counts[word] || 0) + 1;
        return counts;
        }, {});

        return counts;
        
    } catch (error) {
        console.log('analyze::document::error::', error)
    }
}

// Function to Collect details for top 10 words (order by word Occurrences)
const topWords =(counts)=> {
    try {
        const entries = Object.entries(counts);
        entries.sort((a, b) => b[1] - a[1]);
        return entries.slice(0, 10).map(([word, count]) => ({ word, count }));
        
    } catch (error) {
        console.log('top::words::error::', error)
    }
}

// Function to Show words list in JSON format for top 10 words.
const showWords = async(url)=> {

    const counts = await analyzeDocument(url);
    const topWordsData = topWords(counts);
    console.log(JSON.stringify(topWordsData, null, 2));
    
}
showWords(url)
