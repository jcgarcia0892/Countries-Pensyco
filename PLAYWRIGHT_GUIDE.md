# 🎭 Guía de Implementación de Playwright E2E en Countries-Pensyco

Esta guía documenta paso a paso cómo se implementó y configuró la suite de pruebas **End-to-End (E2E)** con **Playwright** en el proyecto Angular **Countries-Pensyco**, aplicando el patrón de arquitectura **Page Object Model (POM)** con **TypeScript**.

---

## 📋 Índice
1. [Contexto y Motivación](#1-contexto-y-motivación)
2. [Paso 1: Instalación de Dependencias y Navegadores](#paso-1-instalación-de-dependencias-y-navegadores)
3. [Paso 2: Limpieza de la Configuración Antigua (Protractor)](#paso-2-limpieza-de-la-configuración-antigua-protractor)
4. [Paso 3: Configuración de Playwright (`playwright.config.ts`)](#paso-3-configuración-de-playwright-playwrightconfigts)
5. [Paso 4: Actualización de Scripts en `package.json`](#paso-4-actualización-de-scripts-en-packagejson)
6. [Paso 5: Arquitectura Page Object Model (POM)](#paso-5-arquitectura-page-object-model-pom)
7. [Paso 6: Suites de Pruebas y Cobertura de Flujos](#paso-6-suites-de-pruebas-y-cobertura-de-flujos)
8. [Paso 7: Configuración de `.gitignore`](#paso-7-configuración-de-gitignore)
9. [Cómo Ejecutar y Depurar las Pruebas](#cómo-ejecutar-y-depurar-las-pruebas)

---

## 1. Contexto y Motivación

El proyecto contaba originalmente con una configuración basada en **Protractor**, una herramienta que quedó oficialmente obsoleta (deprecated) en el ecosistema de Angular. 

**Playwright** fue seleccionado porque ofrece:
- **Mayor velocidad y estabilidad**: No sufre de "flakiness" gracias a su mecanismo de *auto-waiting*.
- **Soporte nativo para TypeScript**: Tipado estricto en locators, assertions y configuración.
- **Excelente Developer Experience (DX)**: Modo interactivo UI, grabación de trazas (*trace viewer*) y capturas automáticas ante fallos.
- **Inicio automático del servidor**: Puede levantar `npm start` bajo demanda para ejecutar los tests.

---

## Paso 1: Instalación de Dependencias y Navegadores

### 1.1 Instalar `@playwright/test`
Se instaló `@playwright/test` como dependencia de desarrollo:

```bash
npm install --save-dev @playwright/test
```

### 1.2 Instalar los Binarios del Navegador
Se descargó el navegador Chromium headless optimizado para pruebas automatizadas:

```bash
npx playwright install chromium
```

---

## Paso 2: Limpieza de la Configuración Antigua (Protractor)

Se eliminaron los archivos heredados de Protractor que ya no eran necesarios:
- `e2e/protractor.conf.js`
- `e2e/src/app.e2e-spec.ts`
- `e2e/src/app.po.ts`

Se actualizó `e2e/tsconfig.json` para dar soporte a TypeScript moderno y tipos de Node/Playwright:

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/e2e",
    "module": "commonjs",
    "target": "ES2022",
    "types": [
      "node"
    ]
  },
  "include": [
    "**/*.ts"
  ]
}
```

---

## Paso 3: Configuración de Playwright (`playwright.config.ts`)

En la raíz del proyecto se creó el archivo de configuración central [`playwright.config.ts`](./playwright.config.ts):

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/specs',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  workers: process.env['CI'] ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }]
  ],
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  webServer: {
    command: 'npm start',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env['CI'],
    timeout: 120000
  }
});
```

### Puntos Clave de la Configuración:
- **`webServer`**: Inicia automáticamente la aplicación Angular en `http://localhost:4200` si no está corriendo.
- **`fullyParallel`**: Ejecuta las pruebas en paralelo utilizando múltiples *workers* para reducir el tiempo total a ~12 segundos.
- **`trace` & `screenshot`**: Captura capturas de pantalla y trazas únicamente cuando un test falla para facilitar la depuración.

---

## Paso 4: Actualización de Scripts en `package.json`

Se agregaron comandos útiles en la sección `"scripts"` de [`package.json`](./package.json):

```json
"scripts": {
  "start": "ng serve",
  "build": "ng build",
  "test": "ng test",
  "lint": "ng lint",
  "e2e": "playwright test",
  "e2e:ui": "playwright test --ui",
  "e2e:headed": "playwright test --headed",
  "e2e:report": "playwright show-report"
}
```

---

## Paso 5: Arquitectura Page Object Model (POM)

Para evitar duplicación de selectores y acoplamiento directo en las pruebas, se implementó el patrón **Page Object Model** en el directorio [`e2e/pages/`](./e2e/pages):

```text
e2e/pages/
├── base.po.ts          # Navegación del Navbar y utilidades (localStorage)
├── home.po.ts          # Encapsula Home (títulos, logo, botones)
├── destinations.po.ts  # Encapsula Destinos (input búsqueda, cards, filtro)
├── hotels.po.ts        # Encapsula Hoteles (fechas, contador pasajeros, add to cart)
├── cart.po.ts          # Encapsula Carrito y Checkout (tablas, formularios débito/crédito, thanks)
└── about.po.ts         # Encapsula About Us (pilares, misión, visión, CTA)
```

### Ejemplo de Page Object (`destinations.po.ts`):
```typescript
import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.po';

export class DestinationsPage extends BasePage {
  readonly searchInput: Locator;
  readonly filterButton: Locator;
  readonly errorText: Locator;
  readonly destinationCards: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('input.searcher-input');
    this.filterButton = page.locator('button.searcher-button');
    this.errorText = page.locator('.searcher-error-text');
    this.destinationCards = page.locator('section.destinations app-card');
  }

  async goto(): Promise<void> {
    await this.page.goto('/information/destinations');
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
  }

  async getDestinationNames(): Promise<string[]> {
    return this.destinationCards.locator('h5.destinations__heading').allInnerTexts();
  }
}
```

---

## Paso 6: Suites de Pruebas y Cobertura de Flujos

Se construyeron 6 suites de pruebas completas en [`e2e/specs/`](./e2e/specs), cubriendo un total de **21 escenarios**:

```text
e2e/specs/
├── home.spec.ts         # 4 tests: Carga de Home y navegación hacia todas las páginas
├── destinations.spec.ts # 5 tests: Catálogo de 6 destinos, búsqueda en vivo, aviso de error y navegación
├── hotels.spec.ts       # 4 tests: Fechas requeridas, límites de huéspedes, búsqueda y adición al carrito
├── cart.spec.ts         # 3 tests: Estado vacío, cálculo de totales, eliminación y persistencia tras recarga
├── checkout.spec.ts     # 3 tests: Validación de datos, pago Débito, pago Crédito y pantalla de éxito
└── about.spec.ts        # 2 tests: Pilares corporativos y botón de navegación
```

---

## Paso 7: Configuración de `.gitignore`

Se agregaron los directorios generados por las ejecuciones de Playwright a [`.gitignore`](./.gitignore) para evitar subirlos al repositorio:

```gitignore
# Playwright
/playwright-report
/test-results
/blob-report
/playwright/.cache
```

---

## Cómo Ejecutar y Depurar las Pruebas

### 1. Ejecución Rápida en Terminal (Headless)
```bash
npm run e2e
```

### 2. Modo Interactivo con UI (Recomendado para desarrollo)
Permite ver paso a paso lo que hace cada test en tiempo real, pausar la ejecución y ver el árbol DOM:
```bash
npm run e2e:ui
```

### 3. Ejecución con Navegador Visible (Headed)
```bash
npm run e2e:headed
```

### 4. Ver el Reporte Gráfico en HTML
```bash
npm run e2e:report
```

---

## ✅ Resumen de Resultados

Toda la suite se ejecuta en paralelo y pasa con **100% de éxito**:

```text
Running 21 tests using 5 workers
21 passed (12.4s)
```
