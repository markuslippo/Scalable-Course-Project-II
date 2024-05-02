import { browser } from 'k6/experimental/browser';
import { check } from 'k6';

export const options = {
    scenarios: {
        ui: {
            executor: 'shared-iterations',
            vus: 1,
            iterations: 5,
            options: {
                browser: {
                    type: 'chromium',
                },
            },
        },
    },
};

export default async function () {
    const page = browser.newPage();
    try {
        await page.goto('http://localhost:7800/courses/1/questions/4');
        await page.locator('textarea').waitFor({ state: 'visible' });
        await page.locator('textarea').click();
        await page.locator('textarea').type('Test answer', { delay: 20 }); 
        const submitButton = page.locator('button', { hasText: 'Submit Answer'});

    } finally {
        await page.close();
    }
}


