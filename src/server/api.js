const compression = require('compression');
const helmet = require('helmet');
const express = require('express');

//use jsforce
const jsforce = require('jsforce');

//load in env
require('dotenv').config();

//extract creds from env
const { SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_LOGIN_URL } = process.env;

//check login readiness
if (!(SF_USERNAME && SF_PASSWORD && SF_TOKEN && SF_LOGIN_URL)) {
    console.error(
        'Cannot start app: missing mandatory configuration. Check your .env file.'
    );
    process.exit(-1);
}

//connect to Salesforce
const conn = new jsforce.Connection({
    loginUrl: SF_LOGIN_URL
});

//handle login errors
conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, err => {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
});

//use what we loaded
const app = express();
app.use(helmet());
app.use(compression());

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3002;
const DIST_DIR = './dist';

app.use(express.static(DIST_DIR));

app.use(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.get('/api/v1/endpoint', (req, res) => {
    res.json({ success: true });
});

app.get('/api/quotes', (req, res) => {
    const soql = `SELECT Id,Quotes__Text__c,Quotes__Picture__c FROM Quotes__Quote__c ORDER BY Quotes__Order__c`;
    conn.query(soql, (err, result) => {
        if (err) {
            res.sendStatus(500);
        } else if (result.records.length === 0) {
            res.status(404).send('Session not found.');
        } else {
            const formattedData = result.records.map(quoteRecord => {
                return {
                    Id: quoteRecord.Id,
                    Text: quoteRecord.Quotes__Text__c,
                    Picture: quoteRecord.Quotes__Picture__c,
                    PicSrc: `/resources/${quoteRecord.Quotes__Picture__c}`
                };
            });
            res.send({ data: formattedData });
        }
    });
});

app.listen(PORT, () =>
    console.log(
        `✅  API Server started: http://${HOST}:${PORT}/api/v1/endpoint`
    )
);