const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')


// Fetch data from api
let apiQuotes=[];

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function removeLoadingSpinner(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// show new QUOTE
function newQuote(){
    showLoadingSpinner();
    //pick a random quote from apiquotes array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)]
    // Check if author field is blank and replace it with 'unknown'
    if(!quote.author){
        authorText.textContent = 'Unknown';

    }else{
        authorText.textContent = quote.author;
    }
    // check quote length to determin styling
    if(quote.text.length>50){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    // set quote,hider loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}
// Get Quotes from api
async function getQuotes(){
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch(error){
        // catch error here  
    }
}
// Tweet quote
function tweetQuote(){
    const twitterUrl= `https://twitter.com/intent/tweet?text=${quoteText.textContent} -${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}
//event listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);
// on load
getQuotes();

// loading();

// Use localQuote

// function newQuote(){
//     //pick a random quote from apiquotes array
//     const quote = localQuotes[Math.floor(Math.random()*localQuotes.length)]
//     console.log(quote);
// }
// newQuote()