# Aashir-Mailer-Lite-Test-Assignment

# Cypress Automation Framework

## 1. Why I Chose This Tech Stack and Design Pattern

I chose **Cypress** with the **Page Object Model (POM)** and Javascript because Cypress provides **seamless integration for email testing**, is **fast, reliable**, supports **automatic retries**, and has **dynamic timeouts** to handle flaky tests effectively.

The **Page Object Model (POM)** ensures **code reusability, maintainability**, and a well-structured framework that enhances scalability and efficiency. This approach allows for a **robust and efficient test automation suite**.

---

## 2. Running in Multiple Environments

To ensure this framework runs smoothly across multiple environments, I have made it **fully dynamic**.

- All environment-specific configurations, including **credentials, database details, URLs, tokens, and domains**, are stored in the `.env` file.
- This eliminates any environment dependencies—simply updating the `.env` file allows the framework to be executed on any environment without modifications.
- By following **best practices**, the framework is **scalable, flexible, and easy to maintain**.

---

## 3. Test Classification and Execution in Separate Suites

To efficiently organize and execute test cases across different suites:

- I have used **Cypress grep tags** (`@smoke`, `@regression`, etc.), allowing tests to be classified into different groups.
- Test cases are stored in **separate test files**, ensuring **independent execution** without any test dependency.
- Example of running specific test suites:
  - **Smoke Tests** → `npm run e2e:smoke:tests`
  - **Regression Tests** → `npm run e2e:regression:tests`

This setup makes test execution **modular, efficient, and highly scalable**.

---

## 4. CI/CD Integration

For CI/CD integration, I plan to use **GitHub Actions or Jenkins** for automation.

- **Dockerized Cypress images** will ensure smooth and isolated test execution.
- **Cypress Dashboard** or **Github Actions** will enable **parallel test execution** across multiple machines.
- **Kubernetes Pods** will provide **scalability**, ensuring efficient resource utilization.
- **Test Reporting**:
  - **AIO Test Reporter / Mochawesome or any other reporting tool ** will be used to **log test results and generate reports**.
  - This will allow real-time monitoring of test execution in CI/CD pipelines.
- **Dynamic execution in CI/CD**:
  - The framework will run on **any environment** without manual intervention.
  - It will be integrated into **pre-release and post-release workflows**, allowing any sorts of tests like Smoke, Regression, Sanity to run automatically before or after deployment.
- **Shift-Left Testing**:
  - By implementing **early-stage automation**, bugs will be detected **sooner in the development cycle**, leading to **faster and higher-quality releases**.

---

## 5. Additional Notes on Implementation

- **API-Driven Approach**:
  - The framework leverages APIs for **setup, assertions, and validations**, making it **efficient and reliable**.
- **Selectors Optimization**:
  - Using **data-test-id selectors** ensures tests remain **stable and non-flaky**.
- **Best Practices & Code Quality**:
  - The framework follows **industry-standard best practices**, including:
    - **ESLint** for code formatting and consistency.
    - **Cypress plugins** such as:
      - `mochawesome` → **For detailed HTML test reports**.
      - `cypress-plugin-api` → **For API testing**.
      - `cypress-grep` → **For filtering tests using tags**.
      - `mailosaur` → **For email testing and validation**.
- **Challenges & Workarounds**:
  - Due to **restrictions in the production environment**, I couldn't log in via Cypress and run my test cases locally.
  - However, the framework is designed to work seamlessly across environments with minor adjustments. There can be more improvements to this repo such as utilising web hooks for event triggers to make test cases run faster. Besides this the execution time can be increased in many other ways by utilising cy.intercept() functionality as well.

---

### 🚀 **Final Thoughts**

This Cypress automation framework follows **modern best practices**, ensuring **speed, scalability, and reliability**.  
It supports **multi-environment execution**, integrates smoothly into **CI/CD**, and enhances **test execution efficiency** with **parallelization and reporting mechanisms**.  
By leveraging **API-first testing, shift-left methodologies, and a dynamic configuration setup**, this framework ensures **high-quality releases with minimal effort**. ✅

---

### 🚀 **Installation & Execution Guide**

- 1- Install Node
- 2- Run the following command in your terminal to clone the repo:
- git clone https://github.com/aashir1998/Aashir-Mailer-Lite-Test-Assignment.git
- cd Aashir-Mailer-Lite-Test-Assignment
- 3- npm install
- 4- Create a .env file in the project root and add the necessary environment variables.

- **MAILER_LITE_API_URL=** This refers to the API endpoint mentioned in the documentation
- **MAILER_LITE_EMAIL=** This refers to the verified user email
- **MAILER_LITE_PASSWORD=** This refers to the verified user password
- **CYPRESS_MAILOSAUR_API_KEY=** The API can be retrieved from the mailosaur's platform
- **CYPRESS_MAILOSAUR_SERVER_ID =** The server id can be retrieved from the mailosaur's platform
- **MAILER_LITE_BASE_URL=** This refers to the url of the environment under test
- **MAILER_LITE_AUTH_TOKEN=** The auth token can be retrieved from the integration section in mailer lite's platform
- **MAILER_LITE_EMAIL_DOMAIN=** This refers to the domain being used for emails

- 5- **npx cypress open** to run in UI or **npx cypress run** to run all the tests
- 6- To run tests with tags :

- **Smoke Tests** → `npm run e2e:smoke:tests`
- **Regression Tests** → `npm run e2e:regression:tests`

- 7- If origin changes after login, use cy.origin

---
