import { check } from 'k6';
import http from 'k6/http';

export const options = {
    scenarios: {
        user_api: {
            executor: 'ramping-vus',
            startVUs: 1,
            stages: [
                { duration: '10s', target: 5 }, // 10 s subiendo de 1 a 5 VUs
                { duration: '5s', target: 1 },  //  5 s bajando de 5 a 1 VU
            ],
            exec: 'user_api',
            startTime: '0s',                // empieza inmediatamente
        },
        create_pet: {
            executor: 'ramping-vus',
            startVUs: 1,
            stages: [
                { duration: '10s', target: 5 }, // durará 15 s en total, igual que el primero
                { duration: '5s', target: 1 },
            ],
            exec: 'create_pet',
            startTime: '15s',               // arranca justo al terminar "user_api"
        },
    },
    thresholds: {
        'http_req_duration': ['p(95)<500'],
        'http_req_failed': ['rate<0.01'],
    },
};

export function user_api() {
    const url = 'https://petstore.swagger.io/v2/user/string';
    const params = { headers: { 'Content-Type': 'application/json' } };
    const res = http.get(url, params);
    check(res, { 'user_api: status 200': (r) => r.status === 200 });
}

export function create_pet() {
    const url = 'https://petstore.swagger.io/v2/pet';
    const payload = JSON.stringify({
        id: 1,
        category: { id: 1, name: 'string' },
        name: 'doggie',
        photoUrls: ['string'],
        tags: [{ id: 1, name: 'string' }],
        status: 'available',
    });
    const params = {
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    const res = http.post(url, payload, params);
    check(res, { 'create_pet: status 200': (r) => r.status === 200 });
}
