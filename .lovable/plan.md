
Root cause:
- La pregunta sí existe en `src/components/dashboard/FinalSummaryPacket.tsx`, pero hoy depende de una condición derivada (`isUpgraded = previousPlan === 'entry' && planType !== 'entry'`).
- El flujo de upgrade también sigue mezclado con `showUpgradeDialog`, así que la UI está repartida entre el resumen final y un banner/modal separado.
- Resultado: aunque el usuario ya esté en el “final packet”, la pregunta A/B/C no siempre aparece de forma confiable dentro del paquete final.

Plan de implementación:
1. Unificar la condición del upgrade
- Dejar de depender del banner viejo/modal para mostrar la decisión.
- Pasar a `FinalSummaryPacket` una prop explícita como `showUpgradeChoices` o `isTrialUpgrade`.
- Derivarla en `BrandOSQuestionnaire` usando el estado real del store (`previousPlanType`, `upgradedToPlan`, `planType`).

2. Mover la pregunta definitivamente dentro del final packet
- Renderizar dentro de `FinalSummaryPacket`, debajo del resumen de los 7 packets y antes del warning normal / CTA final.
- Texto exacto visible:
  - “Do you want to:”
  - “A) Start over”
  - “B) Edit the responses you used in your trial”
  - “C) I am happy with my response please generate my reports”
- Hacerlo visualmente como banner inline, no modal.

3. Hacer que las opciones sean el elemento principal en upgrade
- Si `showUpgradeChoices` es true:
  - mostrar el banner “Upgraded from Free Trial to Foundation / Growth Suite”
  - mostrar inmediatamente debajo la pregunta y las 3 respuestas clickeables
- Si no hay upgrade:
  - mantener solo el warning normal de costos de resubmission

4. Conectar acciones correctamente
- A → `onStartOver()`
- B → `onEditResponses()`
- C → `onKeepResponses()` y abrir luego el warning box
- Asegurar que estas acciones no dependan de `showUpgradeDialog`.

5. Limpiar el flujo viejo para evitar conflicto visual
- Quitar o dejar sin uso el `UpgradeDialog` como superficie principal de decisión.
- El componente `BrandOSQuestionnaire` debe tratar `FinalSummaryPacket` como la única fuente de verdad para esa pregunta dentro del packet final.

6. Ajustar el footer del final packet
- Cuando el usuario viene de upgrade trial→paid, el foco debe estar en la pregunta A/B/C dentro del final packet.
- Evitar que el botón grande del footer compita visualmente con esas opciones si todavía no eligieron A/B/C.

Detalles técnicos
- Archivos a tocar:
  - `src/components/dashboard/BrandOSQuestionnaire.tsx`
  - `src/components/dashboard/FinalSummaryPacket.tsx`
  - posiblemente `src/components/dashboard/UpgradeDialog.tsx` para desactivar el flujo antiguo o dejarlo solo para el warning
- Cambio recomendado:
  - En `BrandOSQuestionnaire`, calcular algo como:
    - `const showUpgradeChoices = previousPlanType === 'entry' && planType !== 'entry' && !!upgradedToPlan;`
  - Pasar `showUpgradeChoices` y `upgradedToPlan` a `FinalSummaryPacket`.
  - En `FinalSummaryPacket`, usar esa prop directamente en vez de inferir todo solo con `previousPlan`.

Resultado esperado
- En el final packet, debajo del resumen completo de los 7 packets, el usuario verá claramente:
  - el banner de upgrade
  - la pregunta “Do you want to:”
  - las tres opciones A / B / C
- Ya no dependerá del modal viejo ni de una condición escondida, por eso sí se verá donde tú lo necesitas.

QA a validar después de implementar
- Completar trial, hacer upgrade a Foundation: la pregunta A/B/C aparece dentro del final packet.
- Completar trial, hacer upgrade a Growth Suite: también aparece.
- A funciona y reinicia.
- B funciona y deja editar respuestas del trial.
- C abre el warning box.
- Usuario sin upgrade: no ve A/B/C, solo el warning normal.
