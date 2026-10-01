# Guía Paso a Paso: Desplegar el Frontend Angular (Countries-Pensyco) en Amazon S3

Esta guía explica detalladamente cómo alojar tu aplicación frontend Angular en **Amazon S3 (Simple Storage Service)** para que consuma tu backend en **AWS Lambda**.

---

## 1. ¿Cómo funciona un Frontend en Amazon S3?

Una aplicación Angular (después de compilarse con `ng build`) produce archivos estáticos puros:
- `index.html`
- Archivos `.js` (JavaScript)
- Archivos `.css` (Estilos)
- Imágenes y fuentes (`assets/`)

**Amazon S3** tiene una función nativa llamada **Static Website Hosting (Alojamiento de sitios web estáticos)**. Esto te permite servir tu Single Page Application (SPA) directamente a los usuarios con alta velocidad, disponibilidad y costo prácticamente nulo.

```
[Usuario en el navegador]
        ↓ 
[Amazon S3 Bucket (Static Website)] ── Sirve index.html, JS y CSS
        ↓ 
[Peticiones HTTP vía HttpClient] ──▶ [AWS API Gateway + Lambda] ──▶ [PostgreSQL RDS]
```

---

## 2. Paso 1: Configurar la URL del Backend en Angular

Tu aplicación Angular tiene dos archivos de entorno:
1. `src/environments/environment.ts` (desarrollo local: `http://localhost:3000/api/v1`)
2. `src/environments/environment.prod.ts` (producción)

En **`src/environments/environment.prod.ts`**, actualiza la variable `apiUrl` con la URL de tu API Gateway en AWS:

```typescript
export const environment = {
  production: true,
  // Reemplaza con tu URL real generada al desplegar la Lambda
  apiUrl: 'https://xxxxxx.execute-api.us-east-1.amazonaws.com/prod/api/v1'
};
```

---

## 3. Paso 2: Compilar el Frontend para Producción

En tu terminal, dentro de la carpeta del frontend (`Countries-Pensyco`):

```bash
cd /Users/jgarcia/Documents/antigravity/practice/Countries-Pensyco
npm run build
```

Esto generará la carpeta optimizada y minificada en:
```text
dist/app/
```
Aquí estarán tu `index.html`, los bundles `.js` y la carpeta `assets/`.

---

## 4. Paso 3: Crear y Configurar el Bucket S3 en AWS

### A. Crear el Bucket
1. Entra a la consola de AWS -> Busca **S3** -> Haz clic en **Create bucket** (Crear bucket).
2. **Bucket name:** Debe ser un nombre único a nivel mundial en todo AWS (ejemplo: `countries-pensyco-frontend-julio`).
3. **AWS Region:** Selecciona la misma región de tu backend (por ejemplo, `us-east-1`).
4. **Block Public Access settings for this bucket:**
   - ⚠️ Desmarca la casilla **Block *all* public access** (Bloquear todo acceso público).
   - Marca la casilla de confirmación que dice *"I acknowledge that the current settings might result in this bucket and the objects within becoming public"*.
5. Haz clic abajo en **Create bucket**.

---

### B. Habilitar "Static Website Hosting" (Alojamiento Web)
1. Haz clic en el nombre de tu bucket recién creado.
2. Ve a la pestaña **Properties** (Propiedades) y baja hasta el final.
3. En la sección **Static website hosting**, haz clic en **Edit**.
4. Selecciona **Enable** (Habilitar).
5. **Hosting type:** Hosting a static website.
6. **Index document:** Escribe `index.html`.
7. **Error document:** Escribe `index.html` (⚠️ *Muy importante en Angular: como es una Single Page Application con rutas como `/destinations` o `/hotels`, si el usuario recarga la página, S3 debe redirigir a `index.html` para que el enrutador de Angular tome el control y no dé error 404*).
8. Haz clic en **Save changes**.
9. **Copia la URL del sitio web** que aparece abajo (ejemplo: `http://countries-pensyco-frontend-julio.s3-website-us-east-1.amazonaws.com`).

---

### C. Configurar los Permisos Públicos de Lectura (Bucket Policy)
Para que cualquier persona pueda ver los archivos HTML y JS en el navegador:

1. En tu bucket de S3, ve a la pestaña **Permissions** (Permisos).
2. Baja hasta **Bucket policy** (Política de bucket) y haz clic en **Edit**.
3. Pega la siguiente política JSON (reemplaza `NOMBRE-DE-TU-BUCKET` con el nombre real de tu bucket):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::NOMBRE-DE-TU-BUCKET/*"
    }
  ]
}
```
4. Haz clic en **Save changes**.

---

## 5. Paso 4: Subir los Archivos de Angular a S3

### Opción A: Mediante AWS CLI (Rápido y Profesional)
Desde la carpeta raíz del frontend, corre:

```bash
aws s3 sync dist/app s3://NOMBRE-DE-TU-BUCKET --delete
```
El comando `--delete` asegura que si borras un archivo viejo en Angular, también se borre en S3.

### Opción B: Desde la Consola Web de AWS
1. Entra a tu bucket en S3 -> pestaña **Objects** (Objetos).
2. Haz clic en el botón naranja **Upload** (Cargar).
3. Arrastra todo el **contenido interior** de la carpeta `dist/app/` (debes ver `index.html`, `assets/`, `main.js`, etc. en la raíz del bucket).
4. Haz clic en **Upload**.

---

## 6. Paso 5: Probar tu Frontend en Producción 🚀

Abre en tu navegador la URL de tu sitio web de S3:
```text
http://countries-pensyco-frontend-julio.s3-website-us-east-1.amazonaws.com
```

- Tu frontend cargará la interfaz visual de Countries-Pensyco desde S3.
- Al cargar, Angular disparará las peticiones HTTP a la URL de tu Lambda en AWS API Gateway (`/api/v1/destinations`, `/api/v1/hotels`).
- ¡Tu backend en Lambda procesará la petición, consultará PostgreSQL en RDS y le responderá a tu frontend en S3!
