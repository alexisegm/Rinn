# Alcance del Proyecto: RINN (MVP)
**Documento de Especificación:** Priorización MoSCoW
**Fase de Desarrollo:** Implementación de Maqueta Funcional (DWF)

---

## 1. Resumen Ejecutivo
El presente documento define el alcance técnico y funcional de la primera versión operativa (MVP) de **RINN**. Utilizando la metodología de priorización MoSCoW, se delimitan las características exactas que componen esta entrega. El objetivo principal es demostrar un flujo completo y coherente de la experiencia de usuario (UX), respaldado por una arquitectura de software limpia y una integración de datos funcional (Supabase).

---

## 2. Matriz de Priorización MoSCoW

### 🟢 MUST HAVE (Requisitos Críticos del MVP)
*Estas funcionalidades son el núcleo del sistema. Sin ellas, el producto no puede ser evaluado ni cumple con la propuesta de valor fundamental de RINN.*

*   **Autenticación y Gestión de Sesión:** Sistema seguro de registro y login (implementado a través de Supabase Auth) para garantizar la persistencia del contexto del usuario.
*   **Catálogo de Repuestos Dinámico:** Interfaz de visualización de productos con **filtros por categoría**, permitiendo al usuario navegar y localizar eficientemente los componentes requeridos.
*   **Gestión del Carrito de Compras:** Módulo de estado global que permite la acumulación de repuestos, cálculo de subtotales y preparación de la orden de negocio.
*   **Checkout y Logística de Entrega:** Flujo de cierre de pedido que incluye la lógica de dominio para seleccionar entre "Envío a Domicilio" o "Retiro en Sucursal" (`tipo_entrega`). Integra un **selector de sucursales con soporte de mapas** para la asignación precisa de la localidad (`sucursal_id`).
*   **Integración Básica del "Garage":** Espacio virtual donde el usuario puede vincular la información base de su vehículo para personalizar la experiencia de búsqueda de repuestos.
*   **Historial de Compras:** Panel de usuario que recupera y renderiza las órdenes previamente consolidadas, validando la integridad referencial de la base de datos relacional.

### 🟡 SHOULD HAVE (Requisitos Importantes pero no Críticos)
*Características de alto valor que mejoran significativamente la experiencia, viables en el ciclo de desarrollo actual.*

*   **Manual del Vehículo Digitalizado:** Acceso rápido a las especificaciones técnicas o guías de mantenimiento básicas correspondientes al vehículo registrado en el Garage del usuario.
*   **Gestión de Perfiles Multidirección:** Capacidad de guardar más de una dirección de entrega habitual para agilizar futuros checkouts.
*   **Paginación y Optimización de Catálogo:** Implementación de *lazy loading* o paginación en la vista principal de repuestos para asegurar un rendimiento óptimo de la interfaz si el volumen de datos aumenta.

### 🔵 COULD HAVE (Requisitos Deseables / Futuras Iteraciones)
*Funcionalidades adicionales que expanden el modelo de negocio, proyectadas para fases de escalamiento posteriores.*

*   **Módulo de Mantenimiento Preventivo:** Sistema de agendamiento y recordatorios automáticos basados en el kilometraje o tiempo de uso del vehículo del Garage.
*   **Gestión de Servicios de Emergencia:** Integración de un botón de pánico o solicitud rápida para servicios de grúa y asistencia vial en tiempo real.
*   **Módulo de Servicios RCV:** Cotización y gestión de pólizas de Responsabilidad Civil Vehicular directamente desde la plataforma.

### 🔴 WON'T HAVE (Fuera del Alcance de esta Versión)
*Elementos explícitamente excluidos del MVP actual para mantener el enfoque en la maqueta funcional y los flujos principales.*

*   **Pasarela de Pagos Transaccional:** No se integrarán APIs reales de procesamiento financiero (Stripe, PayPal, bancos locales). El flujo de pago será simulado (mockeado) en el frontend para validar la experiencia de usuario.
*   **Backoffice / Panel de Administrador de Inventario:** No se desarrollará una interfaz administrativa para la gestión de stock del proveedor. La administración de la base de datos se manejará temporalmente de forma directa a través del panel nativo del backend (Supabase).
*   **Aplicación Móvil Nativa:** El desarrollo se mantiene estrictamente como una aplicación web (React/Frontend), responsiva, pero sin empaquetado para tiendas de aplicaciones (App Store/Play Store).

---

## 3. Criterios de Aceptación Técnicos (Diferenciador del Proyecto)
Aunque la rúbrica exige una maqueta funcional con datos simulados, RINN excede este requerimiento base al implementar:
1.  **Backend Real:** Uso de PostgreSQL vía Supabase.
2.  **Arquitectura Hexagonal:** Implementación de un patrón de puertos y adaptadores (ej. `globalStoreSupabase`) para desacoplar la lógica de presentación de la infraestructura de datos.
3.  **Diseño Guiado por el Dominio (DDD):** Uso de lenguaje ubicuo y agregados lógicos coherentes en el código fuente.