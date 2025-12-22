import { test, expect, request } from '@playwright/test';
import Ajv from 'ajv';

test('GET /products/1 returns valid product', async ({}) => {
  const apiUrl = 'https://fakestoreapi.com/products/1';
  const reqContext = await request.newContext();
  const response = await reqContext.get(apiUrl);

  // 3. Verify the response status is 200
  expect(response.status()).toBe(200);

  // 4. Validate the response contains required keys
  const body = await response.json();
  expect(body).toHaveProperty('id');
  expect(body).toHaveProperty('title');
  expect(body).toHaveProperty('price');
  expect(body).toHaveProperty('category');
  expect(body).toHaveProperty('description');

  // 5. Optionally validate the data types using a JSON Schema (Ajv)
  const schema = {
    type: 'object',
    properties: {
      id: { type: 'number' },
      title: { type: 'string' },
      price: { type: 'number' },
      category: { type: 'string' },
      description: { type: 'string' },
    },
    required: ['id', 'title', 'price', 'category', 'description'],
  };
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(body);
  expect(valid).toBe(true);

  // 6. Log the product title and price
  // eslint-disable-next-line no-console
  console.log(`Product: ${body.title}, Price: $${body.price}`);

  await reqContext.dispose();
});
