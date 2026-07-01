import { test, expect } from '@playwright/test';

const BASE_URL = 'https://api.restful-api.dev/objects';
test.describe('API Tests - restful-api.dev', () => {
  test('GET - Fetch all objects', async ({ request }) => {
    const response = await request.get(BASE_URL);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test('GET - Fetch single object by ID', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/7`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('id', '7');
    expect(body).toHaveProperty('name');
  });
  
  test('POST - Create a new object', async ({ request }) => {
    const payload = {
      name: 'Apple MacBook Pro 16',
      data: {
        year: 2024,
        price: 2499.99,
        'CPU model': 'Apple M3 Pro',
        'Hard disk size': '512 GB',
      },
    };
    const response = await request.post(BASE_URL, { data: payload });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.name).toBe(payload.name);
    expect(body.data.price).toBe(2499.99);
  });

  test('PUT - Fully update an object', async ({ request }) => {
    const created = await request.post(BASE_URL, {
      data: {
        name: 'Object for PUT',
        data: { year: 2023, price: 1999.99 },
      },
    });
    const createdBody = await created.json();
    const id = createdBody.id;
    const payload = {
      name: 'Apple MacBook Pro 16 - Updated',
      data: {
        year: 2024,
        price: 2699.99,
        'CPU model': 'Apple M3 Max',
        'Hard disk size': '1 TB',
      },
    };
    const response = await request.put(`${BASE_URL}/${id}`, { data: payload });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe(payload.name);
    expect(body.data['Hard disk size']).toBe('1 TB');
  });

  test('PATCH - Partially update an object', async ({ request }) => {
    const created = await request.post(BASE_URL, {
      data: {
        name: 'Object for PATCH',
        data: { year: 2023, price: 1999.99 },
      },
    });
    const createdBody = await created.json();
    const id = createdBody.id;
    const payload = {
      name: 'Apple MacBook Pro 16 - Patched',
    };
    const response = await request.patch(`${BASE_URL}/${id}`, { data: payload });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe(payload.name);
  });

  test('DELETE - Delete an object', async ({ request }) => {
    const created = await request.post(BASE_URL, {
      data: { name: 'Object to Delete', data: { temp: true } },
    });
    const createdBody = await created.json();
    const idToDelete = createdBody.id;
    const response = await request.delete(`${BASE_URL}/${idToDelete}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.message).toContain(idToDelete);
    const getResponse = await request.get(`${BASE_URL}/${idToDelete}`);
    expect(getResponse.status()).toBe(404);
  });

});