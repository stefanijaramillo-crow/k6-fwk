# K6-ACADEMY

## 1. Instalación

### Linux (Debian/Ubuntu)
```bash
sudo apt update
sudo apt install -y gnupg software-properties-common
wget -q -O - https://dl.k6.io/key.gpg | sudo apt-key add -
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt update && sudo apt install -y k6
```

### Windows (Chocolatey)
```powershell
choco install k6
```
_Opcional: Descarga binarios desde https://k6.io/docs/getting-started/installation/_

## 2. k6 Cloud Login
```bash
# Obtener API Token desde app.k6.io → Settings → API Tokens
k6 login cloud <YOUR_API_TOKEN>
```

## 3. Ejecutar Tests

### Local
```bash
k6 run path/to/test.js
```

### Con k6 Cloud
```bash
k6 cloud path/to/test.js
```
- `k6 cloud` sube resultados a la plataforma y genera reportes interactivos.

## 4. Principales Executors

- **`constant-vus`**  
  Ejecuta con un número fijo de VUs (Users) durante X segundos.

- **`ramping-vus`**  
  Escala VUs de un valor inicial a uno final en un período (ideal para ramp-up/ramp-down).

- **`shared-iterations`**  
  Ejecuta un total de iteraciones compartidas entre VUs; se detiene cuando se completan todas.

- **`per-vu-iterations`**  
  Cada VU ejecuta N iteraciones y luego se detiene.

- **`constant-arrival-rate`**  
  Genera un número fijo de requests/segundo durante X segundos, escalando VUs según necesidad.

- **`ramping-arrival-rate`**  
  Ajusta la tasa de requests/segundo de un valor inicial a uno final en un período.

- **`externally-controlled`**  
  k6 no controla nada: espera señales externas para iniciar/parar iteraciones (para integración con orquestadores).

---

> Para más detalles de cada executor:  
> https://k6.io/docs/using-k6/scenarios/executors/
