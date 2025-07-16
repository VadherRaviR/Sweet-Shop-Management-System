# Sweet-Shop-Management-System
 A fully test-driven backend system for managing sweets inventory, written in JavaScript (Node.js) using Jest for TDD. Includes a simple frontend UI (HTML + JavaScript).

#   Features 
 Add new sweets
 View available sweets
 Delete sweets
 Search sweets by name/category/price
 Sort sweets by name/category/price (asc/desc)
 Purchase sweets (with stock validation)
 Restock inventory
 Low-stock alerts
 Revenue tracking
 Frontend UI for demo purposes


# Test-Driven Development (TDD)
This project strictly follows the principles of Test-Driven Development:
Wrote tests before writing implementation
Used Jest for unit testing
Maintained high test coverage across all features
Followed red-green-refactor cycle

# Tech Stack:
Layer	 | Tools Used
Language - JavaScript (ES6)
Testing	 - Jest
Frontend - HTML + JS 


# PROJECT STRUCTURE
sweet-shop-management-system/
├── src/                    # SweetShop class implementation
│   └── SweetShop.js
├── tests/                  # Jest test cases
│   └── SweetShop.test.js
├── public/                 # Frontend
│   ├── index.html
│   └── app.js
├── package.json
├── README.md


# Personal Learning Note
I want to be transparent about my learning journey.Before this project, I had not written a full system using TDD.
I understood TDD in theory, but applied it practically here for the first time.
I used ChatGPT to help guide my TDD process, generate test structure, and identify edge cases.
All code is written by me. AI was used as a learning assistant — not for copying.

Through this project, I’ve gained real confidence in:
Writing unit tests first
Building clean business logic
Applying object-oriented practices in JavaScript

## Test-Report Screenshots

![test-report](images/test-report.png)


# Project Setup

```bash
step 1:
git clone https://github.com/VadherRaviR/Sweet-Shop-Management-System.git
cd Sweet-Shop-Management-System

step 2:
npm install

step 3:
npm test ```






