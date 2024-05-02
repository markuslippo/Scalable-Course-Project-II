const { test, expect } = require("@playwright/test");

test("The main page renders and shows 'Courses' title ", async ({ page }) => {
  await page.goto("/");
  const header = page.locator('h1', { hasText: 'Courses:' })
  await expect(header).toBeVisible();
});


test("Clicking on a course containing 'Basics' navigates to the question list page and displays the course title", async ({ page }) => {
    await page.goto("/");

    const courseLink = page.locator('a:has-text("Basics")');
    await expect(courseLink).toBeVisible();
    await courseLink.click();

    const courseTitle = page.locator('div.flex.items-center.m-4.mb-4 span', { hasText: 'Basics' });
    await expect(courseTitle).toBeVisible();
});


test("The Back button on the question list page redirects to the main page", async ({ page }) => {
    await page.goto("/courses/1");

    const backButton = page.locator('a:has(svg[stroke="currentColor"])');
    await expect(backButton).toBeVisible();
    await backButton.click();

    const header = page.locator('h1', { hasText: 'Courses:' });
    await expect(header).toBeVisible();
});


test("The question and answers page fetches and displays Test user's answer", async ({ page }) => {
    await page.goto("/courses/1/questions/1");

    const answer = page.locator('p.text-s.text-gray-500', { hasText: 'Test user' }).first();
    
    await expect(answer).toBeVisible();
});

test("Submitting a question works and generated answers by the Large Language Model", async ({ page }) => {
    await page.goto("/courses/3");

    const titleInput = page.locator('textarea[placeholder="Type your title here..."]');
    await titleInput.fill("Test question title");
    const bodyInput = page.locator('textarea[placeholder="Type your question here..."]');
    await bodyInput.fill("Test question body");

    const askQuestionButton = page.locator('button:has-text("Ask a question")');
    await askQuestionButton.click();

    await page.waitForTimeout(4000);

    const titleLink = page.locator('p:has-text("Test question title")').first();
    await titleLink.click();

    const generatedAnswer = page.locator('p.text-s.text-gray-500', { hasText: 'Large Language Model' }).first();
    await expect(generatedAnswer).toBeVisible();
});
