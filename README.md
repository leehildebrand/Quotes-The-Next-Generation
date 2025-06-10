# Quotes App

This is a LWC OSS app. It connects to a Salesforce database and shows quotes in the forms of text and pictures. 

The app can run locally or on a PASS such as Heroku.

[Demonstration](https://lee-favorite-quotes-production.herokuapp.com/?page=home)

## Run this app yourself

### Set up the Salesforce end
This app relies on the availability of a Salesforce database. In order to create one and add your own quotes, please:
1. Login to a Salesforce instance ([Sign Up for a Developer Edition org if needed](https://developer.salesforce.com/signup))
2. Paste the following at the end of your Salesforce instance URL: `/packagingSetupUI/ipLanding.app?apvId=04t6S000000YP58QAG` (this will install the Quotes custom object in the namespace the app expects)
3. Use installation key `2ddPaXrxUNE6rJ`
4. Assign your user the `Quotes` [custom permission set](https://help.salesforce.com/s/articleView?id=sf.perm_sets_assigning.htm&type=5)
5. Navigate to the `Quotes` application using the Salesforce App Launcher waffle
6. Enter your own quotes or [use these to get you started](https://quotes3-dev-ed.my.salesforce.com/sfc/p/8c0000016N3q/a/8c000000HeHA/aK4pXrpLD3Ybv7h6ceuMaN7LRkfIlaUSNCQPWlfRoQQ) <- Works with [Dataloader.io](https://dataloader.io/)

### Set up the local side

1. Clone this repo to your local VS code
2. From your terminal, run `npm install` ([learn more](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/))
3. Create a `.env` file with the following key value pairs
```
SF_LOGIN_URL=https://login.salesforce.com
SF_PASSWORD=YOUR_PASSWORD
SF_TOKEN=YOUR_TOKEN
SF_USERNAME=YOUR_USERNAME
```
If you fork this repo, the `.gitignore` will ignore the `.env` file on check in. Please be careful not to make changes that will commit your credentials to your repository. Use [Config Vars](https://devcenter.heroku.com/articles/config-vars) to check your instance into a PASS.

4. Run `npm watch` to start the app locally

## Handling pictures

- This app can show plain text or an image.
- The app knows to automatically show the image if a value is present in the Picture__c field.
- The Text__c field on a quote record will be used as the image alternate text if a value is present in Picture__c.
- Picture names and extensions should be all lower case.
- The picture must be present in the [resources directory of your LWC application](https://github.com/leehildebrand/Quotes/tree/main/src/client/resources).
- Put the name (all lower case) as it appears in your LWC app local resources directory in the Picture__c field of a Quote__c record. Ex: `wiseoldowl.jpeg`
- When the application reaches that quote, the picture will load instead of text.
