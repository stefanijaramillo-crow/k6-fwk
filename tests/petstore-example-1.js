// Importa la función 'check' para validar respuestas y el módulo 'http' para realizar peticiones
import { check } from 'k6';
import http from 'k6/http';

export const options = {
    scenarios: {
        // Define un escenario llamado "user_api"
        user_api: {
            executor: 'constant-arrival-rate', // Usa un flujo constante de solicitudes por segundo
            rate: 1,                           // 1 petición por unidad de tiempo (cantidad de usuarios)
            timeUnit: '1s',                    // La unidad de tiempo es 1 segundo
            duration: '10s',                   // Ejecuta este ritmo durante 10 segundos
            preAllocatedVUs: 1,                // VUs (Virtual Users) preasignados para atender la carga
            maxVUs: 1,                         // Máximo de VUs que k6 podrá escalar si los preasignados no son suficientes
            exec: 'user_api',                  // Nombre de la función que se ejecuta en este escenario
        }
    },
    thresholds: {
        // Define umbrales para fallar el test si no se cumplen
        'http_req_duration': ['p(95)<500'],  // El 95% de las peticiones debe responder en < 500 ms
        'http_req_failed': ['rate<0.01'],    // La tasa de peticiones fallidas debe ser < 1%
    },
};

export function user_api() {
    // URL del endpoint a probar (en este caso, la API de usuario de Petstore)
    const url = 'https://petstore.swagger.io/v2/user/string';

    // Parámetros de la petición
    const params = {
        headers: { 'Content-Type': 'application/json' }
    };

    // Enviar una petición GET al endpoint con los parámetros
    const res = http.get(url, params);
    //console.log(res.body)

    // Validación: comprueba que el cuerpo ('body') contenga la palabra 'username'
    // Si falla, se cuenta como un chequeo fallido
    check(res, {
        'check_user': (r) => r.body.includes('username')
    });
}
