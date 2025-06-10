//give our API an endpoint
const URL = '/api/quotes';

let quotes = [];

//get quotes from Salesforce
export const getQuotes = () => fetch(URL)
    .then(response => {
        if (!response.ok) {
            // If response was not OK, throw error
            console.log('response+error', response);
            throw new Error('No response from server');
        }
        return response.json();
    })
    .then(result => {
        // If successful, return the quotes
        quotes = result.data;
        return quotes;
    });