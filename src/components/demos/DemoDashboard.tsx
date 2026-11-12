import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { easeOutExpo } from "../../lib/motion";
import { FadeIn, Reveal } from "../Reveal";
import { DemoShell } from "./DemoShell";

const kpis = [
  { label: "Выручка", value: "₽ 1,28M", delta: "+12%", up: true },
  { label: "Заказы", value: "3 842", delta: "+8%", up: true },
  { label: "Конверсия", value: "4,6%", delta: "+0,4%", up: true },
  { label: "Возвраты", value: "1,2%", delta: "-0,3%", up: false },
];

const orders = [
  { id: "#1024", client: "ООО «Вектор»", date: "12.11", amount: "₽ 24 800", status: "Оплачен" },
  { id: "#1023", client: "ИП Смирнов", date: "12.11", amount: "₽ 8 400", status: "Новый" },
  { id: "#1022", client: "Кафе «Утро»", date: "11.11", amount: "₽ 12 300", status: "Доставлен" },
  { id: "#1021", client: "ООО «ТехноПарк»", date: "11.11", amount: "₽ 41 000", status: "Оплачен" },
  { id: "#1020", client: "ИП Ковалёва", date: "10.11", amount: "₽ 6 900", status: "Новый" },
  { id: "#1019", client: "Студия «Формат»", date: "10.11", amount: "₽ 18 200", status: "Доставлен" },
];

type Status = "Все" | "Новый" | "Оплачен" | "Доставлен";
const TABS: Status[] = ["Все", "Новый", "Оплачен", "Доставлен"];

const statusStyle: Record<string, string> = {
  Новый: "bg-amber-400/15 text-amber-300 ring-amber-400/25",
  Оплачен: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/25",
  Доставлен: "bg-sky-400/15 text-sky-300 ring-sky-400/25",
};

function LineChart() {
  const reduce = useReducedMotion();
  const W = 600;
  const H = 200;
  const PAD = 26;
  const data = [120, 160, 150, 210, 195, 260, 310];
  const max = 340;
  const pts = data.map((v, i) => ({
    x: PAD + (i * (W - PAD * 2)) / (data.length - 1),
    y: H - PAD - (v / max) * (H - PAD * 2),
  }));
  const line = "M" + pts.map((p) => p.x + " " + p.y).join(" L");
  const area =
    line + " L" + pts[pts.length - 1].x + " " + (H - PAD) + " L" + pts[0].x + " " + (H - PAD) + " Z";

  return (
    <svg viewBox={"0 0 " + W + " " + H} className="w-full">
      <defs>
        <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(139,92,246,0.32)" />
          <stop offset="1" stopColor="rgba(139,92,246,0)" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={PAD}
          x2={W - PAD}
          y1={PAD + f * (H - PAD * 2)}
          y2={PAD + f * (H - PAD * 2)}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}
      <motion.path
        d={area}
        fill="url(#chart-fill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1, delay: 0.7 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="#a78bfa"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={reduce ? undefined : { pathLength: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.6, ease: easeOutExpo }}
      />
      {pts.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="4"
          fill="#0a0d14"
          stroke="#a78bfa"
          strokeWidth="2"
          initial={reduce ? false : { opacity: 0, scale: 0 }}
          whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.6, delay: 0.5 + i * 0.14 }}
        />
      ))}
    </svg>
  );
}

function BarChart() {
  const bars = [38, 62, 45, 74, 58, 88, 70];
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-end gap-2">
        {bars.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
            <motion.div
              initial={{ scaleY: 0.1 }}
              whileInView={{ scaleY: h / 100 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", bounce: 0.25, duration: 0.9, delay: 0.15 + i * 0.07 }}
              style={{ originY: 1 }}
              className={
                "w-full rounded-t-md " +
                (i === 5
                  ? "bg-gradient-to-t from-violet-500/80 to-fuchsia-400/80"
                  : "bg-white/15")
              }
            />
            <span className="text-[10px] text-neutral-500">{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DemoDashboard() {
  const [tab, setTab] = useState<Status>("Все");
  const filtered = tab === "Все" ? orders : orders.filter((o) => o.status === tab);

  return (
    <DemoShell title="Панель аналитики" url="app.demo.kashperov.ru">
      <div className="px-5 py-10">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Обзор за неделю
                </h1>
                <p className="mt-2 text-sm text-neutral-500">
                  7 – 12 ноября · магазин «Кофейня №1»
                </p>
              </div>
              <div className="flex gap-2">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-neutral-300">
                  Неделя
                </span>
                <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-300">
                  Сегодня
                </span>
              </div>
            </div>
          </FadeIn>

          {/* KPI */}
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {kpis.map((k, i) => (
              <FadeIn key={k.label} delay={0.1 + i * 0.06}>
                <div className="glass rounded-2xl p-5 transition-colors duration-300 hover:border-violet-400/30">
                  <p className="text-xs text-neutral-500">{k.label}</p>
                  <p className="mt-2 font-display text-xl font-bold tabular-nums text-white sm:text-2xl">
                    {k.value}
                  </p>
                  <p
                    className={
                      "mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium " +
                      (k.up ? "bg-emerald-400/15 text-emerald-300" : "bg-rose-400/15 text-rose-300")
                    }
                  >
                    {k.up ? "▲" : "▼"} {k.delta}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* charts */}
          <div className="mt-4 grid gap-3 lg:grid-cols-5">
            <Reveal delay={0.05} className="lg:col-span-3">
              <div className="glass h-full rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white">Выручка, тыс. ₽</p>
                  <span className="text-[11px] text-neutral-500">обновлено 5 мин назад</span>
                </div>
                <div className="mt-4">
                  <LineChart />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-2">
              <div className="glass h-full rounded-2xl p-5">
                <p className="text-sm font-medium text-white">Заказы по дням</p>
                <div className="mt-4 h-44">
                  <BarChart />
                </div>
              </div>
            </Reveal>
          </div>

          {/* table */}
          <Reveal delay={0.05}>
            <div className="glass mt-4 overflow-hidden rounded-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 pb-2 pt-5">
                <p className="text-sm font-medium text-white">Последние заказы</p>
                <div className="flex flex-wrap gap-1.5">
                  {TABS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={
                        "rounded-full px-3 py-1.5 text-xs transition-colors duration-200 " +
                        (tab === t
                          ? "bg-white/10 text-white ring-1 ring-white/15"
                          : "text-neutral-500 hover:text-neutral-300")
                      }
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-neutral-500">
                      <th className="px-5 py-3 font-medium">Заказ</th>
                      <th className="px-5 py-3 font-medium">Клиент</th>
                      <th className="px-5 py-3 font-medium">Дата</th>
                      <th className="px-5 py-3 font-medium">Сумма</th>
                      <th className="px-5 py-3 font-medium">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence initial={false}>
                      {filtered.map((o) => (
                        <motion.tr
                          key={o.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-b border-white/5 last:border-0"
                        >
                          <td className="px-5 py-3.5 font-medium text-white">{o.id}</td>
                          <td className="px-5 py-3.5 text-neutral-300">{o.client}</td>
                          <td className="px-5 py-3.5 text-neutral-500">{o.date}</td>
                          <td className="px-5 py-3.5 tabular-nums text-neutral-300">{o.amount}</td>
                          <td className="px-5 py-3.5">
                            <span
                              className={
                                "inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 " +
                                statusStyle[o.status]
                              }
                            >
                              {o.status}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </DemoShell>
  );
}
