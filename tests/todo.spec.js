// @ts-check
const { test, expect } = require('@playwright/test');

test('adds a single todo', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  // Add a new todo that says "Todo1"
  await page.type('#inputText', 'Todo1');
  await page.keyboard.press('Enter');

  // expect a todo that has the title "Todo1"
  let todoTitle = await page.locator('#todoTitle1').textContent();
  await expect(todoTitle).toEqual('Todo1');
});

test('check "items left" functionality', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  // Add a new todo that says "Todo1"
  await page.type('#inputText', 'Todo1');
  await page.keyboard.press('Enter');

  // expect "items left" to display 1
  let itemsLeft = await page.locator('#itemsLeft').textContent();
  await expect(itemsLeft).toEqual('1 item left');

  // Tick the checkbox of the todo
  await page.locator('#todoCompleted1').click();

  // Expect "items left" to display 0
  itemsLeft = await page.locator('#itemsLeft').textContent();
  await expect(itemsLeft).toEqual('0 items left');
});

test('check "items left" displays 2', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  // Add a new todo that says "Todo1"
  await page.type('#inputText', 'Todo1');
  await page.keyboard.press('Enter');

  // Add a new todo that says "Todo2"
  await page.type('#inputText', 'Todo2');
  await page.keyboard.press('Enter');

  // Add a new todo that says "Todo3"
  await page.type('#inputText', 'Todo3');
  await page.keyboard.press('Enter');

  // Tick the checkbox of the second todo
  await page.locator('#todoCompleted2').click();

  // expect "items left" to display 2
  let itemsLeft = await page.locator('#itemsLeft').textContent();
  await expect(itemsLeft).toEqual('2 items left');
});