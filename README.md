# 🔍 API Testing with Cypress - DummyJSON

This project contains automated API tests for all available endpoints listed in the [DummyJSON API Documentation](https://dummyjson.com/docs), using [Cypress](https://www.cypress.io/).

All tests are organized in a single test file located at: **cypress/e2e/dummyjson.cy.js**


## 📌 Repository

GitHub: [https://github.com/natashacallula/API-test-cypress-dummyJson](https://github.com/natashacallula/API-test-cypress-dummyJson)

## 🚀 Tech Stack

- **Cypress** – JavaScript End-to-End Testing Framework
- **Mocha** – Default test runner in Cypress
- **Chai** – Built-in assertion library

## ✅ What’s Tested?

This test suite covers **all available endpoints** from DummyJSON, including:

- `GET`: products, carts, posts, recipes, users, comments, quotes, etc.
- `POST`: create new products and other resources
- `PUT`: update resources
- `DELETE`: remove data
- Query Parameters: `limit`, `skip`, `select`
- Search functionality: `search?q=...`
- Authentication (where available)
- Response validation: status codes, body structure, specific fields

## 🧪 How to Run the Tests

### 1. Clone the repository
git clone https://github.com/natashacallula/API-test-cypress-dummyJson.git
cd API-test-cypress-dummyJson

### 2. Install dependencies
npm install

### 3. Run Cypress
npx cypress open

## 📁 Folder Structure
cypress/
└── e2e/
    └── dummyjson.cy.js   # All tests are written in this single file

## 📌 Notes
1. All tests use the public [DummyJSON API](https://dummyjson.com/).
2. The data used for POST, PUT, and DELETE is not persistent.
3. This project is intended for learning and demonstration purposes.
4. The test logic is written clearly and modularly for easy extension in the future.
