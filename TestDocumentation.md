# Test Documentation

## Overview

This document provides basic test documentation for the project.

## Test Tools , Why Playwright

- [Playwright](https://playwright.dev/)
  - Playwright is a powerful end-to-end testing framework that allows you to test web applications across multiple browsers.
  - It provides a simple and intuitive API for writing tests.
  - Playwright supports multiple programming languages, including JavaScript, TypeScript, Python, and Java.
  - Playwright can be used for both unit tests and integration tests.

## Test Cases

### Login UI Test Case

1. Navigate to the login page.
2. Enter a valid username and password.
3. Click the login button.
4. Verify that the user is redirected to the dashboard page.

### Create Task UI Test Case

1. Navigate to the dashboard page.
2. Click the "Create Task" button.
3. Enter a task name and description.
4. Click the "Save" button.
5. Verify that the task is added to the task list.
6. Verify that the task name and description are displayed correctly.

### Edit Task UI Test Case

1. Navigate to the dashboard page.
2. Click the "Edit" button for the task you want to edit.
3. Update the task name and description.
4. Click the "Save" button.
5. Verify that the task name and description are updated correctly.

### Delete Task UI Test Case

1. Navigate to the dashboard page.
2. Click the "Delete" button for the task you want to delete.
3. Verify that the task is removed from the task list.

## Test Execution

1. Run unit tests: `npx playwright test`
2. Run unit test on each: `npx playwright test tests/login-ui.spec.ts`
3. Run unit test on each with debug: `npx playwright test tests/login-ui.spec.ts --debug`
