# Diagrama general de conectU

```text
Estudiante
   ↓
Interfaz web conectU
   ↓
Frontend React
   ↓
Backend Node.js + Express
   ↓
Módulos principales
   ├── Usuarios
   ├── Recomendaciones de profesores
   ├── Guía de cursos
   ├── Repositorio académico
   ├── Historias universitarias
   ├── Pasantías e intercambios
   ├── Grupos de estudio
   ├── Tutorías
   └── Moderación
   ↓
Base de datos MongoDB
   ↓
Vercel / Render / MongoDB Atlas
```

## Explicación corta

El estudiante entra a conectU desde una interfaz web. Desde ahí puede consultar profesores, cursos, recursos, historias, oportunidades, grupos de estudio y tutorías. El frontend en React muestra la información al usuario, mientras que el backend en Node.js y Express procesa las solicitudes. Toda la información se almacena en MongoDB. La solución puede desplegarse usando Vercel para el frontend, Render para el backend y MongoDB Atlas para la base de datos.
