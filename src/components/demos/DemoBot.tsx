import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { DemoShell } from "./DemoShell";

type CartItem = { name: string; price: number };
type Msg = { from: "user" | "bot"; text: string };

const MENU: CartItem[] = [
  { name: "Капучино", price: 190 },
  { name: "Латте", price: 210 },
  { name: "Раф", price: 240 },
  { name: "Эспрессо", price: 120 },
  { name: "Флэт уайт", price: 230 },
];

const QUICK = ["Меню", "Корзина", "Оплатить"];

function total(cart: CartItem[]): number {
  return cart.reduce((s, i) => s + i.price, 0);
}

function makeReply(raw: string, cart: CartItem[]): { reply: string; cart: CartItem[] } {
  const t = raw.toLowerCase();

  const item = MENU.find((m) => t.includes(m.name.toLowerCase()));
  if (item) {
    const next = [...cart, item];
    return {
      reply:
        "Добавил: " + item.name + " — " + item.price + " ₽ ☕\nВ корзине: " +
        next.length + " поз. на " + total(next) + " ₽.",
      cart: next,
    };
  }
  if (t.includes("меню")) {
    return {
      reply:
        "Вот наше меню:\n" +
        MENU.map((m) => "• " + m.name + " — " + m.price + " ₽").join("\n") +
        "\n\nНапишите название напитка, чтобы добавить его в корзину.",
      cart,
    };
  }
  if (t.includes("корзин") || t.includes("заказ")) {
    if (cart.length === 0) {
      return {
        reply: "Корзина пока пуста. Напишите «меню», чтобы выбрать напиток.",
        cart,
      };
    }
    return {
      reply:
        "Ваш заказ:\n" +
        cart.map((c) => "• " + c.name + " — " + c.price + " ₽").join("\n") +
        "\n\nИтого: " + total(cart) + " ₽\nНапишите «оплатить», чтобы оформить.",
      cart,
    };
  }
  if (t.includes("оплат")) {
    if (cart.length === 0) {
      return {
        reply: "Пока нечего оплачивать — корзина пустая. Загляните в «меню» ☕",
        cart,
      };
    }
    return {
      reply:
        "✅ Заказ оформлен! Номер #1024, сумма " + total(cart) +
        " ₽. Курьер приедет через ~30 минут. Приятного кофе!",
      cart: [],
    };
  }
  if (t.includes("привет") || t.includes("здравств") || t.includes("хай") || t.includes("добр")) {
    return { reply: "Привет! 👋 Я CoffeeBot. Напишите «меню» — покажу напитки.", cart };
  }
  return {
    reply:
      "Понял! Я принимаю заказы: «меню» — выбрать кофе, «корзина» — посмотреть заказ, «оплатить» — оформить.",
    cart,
  };
}

export function DemoBot() {
  const reduce = useReducedMotion();
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "bot",
      text: "Привет! Я CoffeeBot ☕ Принимаю заказы на кофе. Напишите «меню» — покажу напитки.",
    },
  ]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    setInput("");
    setMessages((m) => [...m, { from: "user", text }]);
    setTyping(true);
    window.setTimeout(() => {
      const { reply, cart: next } = makeReply(text, cart);
      setCart(next);
      setMessages((m) => [...m, { from: "bot", text: reply }]);
      setTyping(false);
    }, 700 + Math.random() * 500);
  };

  return (
    <DemoShell title="Telegram-бот кофейни" url="@coffee_demo_bot">
      <div className="px-5 py-10">
        <div className="mx-auto max-w-md">
          <div className="glass overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-30px_rgba(34,211,238,0.25)]">
            {/* header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 text-lg">
                ☕
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">CoffeeBot</p>
                <p className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                  <span className="size-1.5 rounded-full bg-emerald-400" /> онлайн
                </p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-neutral-300">
                🛒 {cart.length}
              </span>
            </div>

            {/* messages */}
            <div ref={listRef} className="flex h-[54vh] flex-col gap-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  className={
                    m.from === "user"
                      ? "ml-auto max-w-[80%] whitespace-pre-line rounded-2xl rounded-br-md bg-gradient-to-r from-cyan-400/90 to-emerald-400/90 px-3.5 py-2.5 text-[13px] font-medium text-[#04211a]"
                      : "max-w-[85%] whitespace-pre-line rounded-2xl rounded-bl-md bg-white/10 px-3.5 py-2.5 text-[13px] text-neutral-200"
                  }
                >
                  {m.text}
                </motion.div>
              ))}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-md bg-white/10 px-3.5 py-3"
                  >
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="size-1.5 animate-bounce rounded-full bg-neutral-300"
                        style={{ animationDelay: d * 0.15 + "s" }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* quick replies */}
            <div className="flex gap-2 px-4 pb-2">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-neutral-300 transition-colors duration-200 hover:border-cyan-400/40 hover:text-white"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-white/10 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Напишите сообщение…"
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-cyan-400/50 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Отправить"
                className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 text-[#04211a] transition-transform duration-150 hover:scale-105 active:scale-95"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                  aria-hidden
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </form>
          </div>

          <p className="mt-4 text-center text-xs text-neutral-500">
            Это интерактивная демо-симуляция бота: напишите «меню», добавьте кофе
            в корзину и оплатите.
          </p>
        </div>
      </div>
    </DemoShell>
  );
}
