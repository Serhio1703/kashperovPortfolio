# Портфолио — Кашперов Сергей Анатольевич

Персональный сайт-портфолио веб-разработчика.

## Стек

- **React 19** + **TypeScript**
- **Vite** (сборка и dev-сервер)
- **Tailwind CSS v4**
- **Motion** (анимации на пружинах, `motion/react`)
- `clsx` + `tailwind-merge` для классов

## Запуск

```bash
npm install
npm run dev
```

Откройте адрес, который покажет Vite (обычно `http://localhost:5173`).

## Сборка

```bash
npm run build
npm run preview
```

Готовые файлы появятся в `dist/` — их можно выложить на любой статический хостинг
(Vercel, Netlify, GitHub Pages, Cloudflare Pages).

## Как выложить бесплатно

Сайт статический, поэтому подходит любой бесплатный хостинг. Два самых простых пути — без git:

### Netlify Drop (быстрее всего)

1. `npm run build`
2. Откройте https://app.netlify.com/drop
3. Перетащите папку `dist/` прямо в окно браузера
4. Сайт сразу получит адрес `https://какое-то-имя.netlify.app` — имя меняется в Site settings → Change site name

### Cloudflare Pages (прямая загрузка)

1. `npm run build`
2. dash.cloudflare.com → Workers & Pages → Create → Pages → Upload assets
3. Укажите имя проекта и перетащите `dist/`
4. Адрес: `https://имя-проекта.pages.dev`

### GitHub Pages (для разработчиков)

Нужен репозиторий на GitHub. После `git push` — GitHub Actions или ветка `gh-pages`.
Важно: в `vite.config.ts` нужно добавить `base: "/имя-репозитория/"`, иначе пути
к стилям и скриптам сломаются (сайт живёт в подпапке).

> После каждого обновления сайта: снова `npm run build` и загрузите `dist/` заново.
> Netlify и Cloudflare умеют автоматический деплой из git-репозитория — тогда достаточно `git push`.

## Что заменить на своё

- `src/components/Contact.tsx` — Email (сейчас `kashperovsergei@gmail.com`) и Telegram (`@Acter1703`).
- `src/components/Projects.tsx` — реальные кейсы: название, описание, стек, результат.
- `src/components/Stack.tsx` — список технологий.
- `src/components/Hero.tsx` — подпись «Веб-разработчик · 5 лет опыта» и статистика.
- `index.html` — `<title>` и `<meta name="description">`.
- `src/components/Footer.tsx` — год и подпись.

## Структура

```
index.html
src/
  main.tsx
  App.tsx
  index.css
  lib/cn.ts, lib/motion.ts
  components/
    Nav, Hero, About, Services, Projects, Process, Stack, Testimonials,
    Contact, Footer, Reveal, SectionHeading, MagneticButton, TiltCard,
    Counter, Background, Cursor, ScrollProgress
  components/demos/
    DemoShell, DemoLanding, DemoBot, DemoDashboard — встроенные демо,
    открываются по hash-ссылкам #/demo/landing, #/demo/bot, #/demo/analytics
  lib/router.ts — лёгкий hash-роутер для демо
```
