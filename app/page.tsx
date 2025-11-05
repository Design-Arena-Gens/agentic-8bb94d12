"use client";

import { useEffect, useRef, useState } from 'react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'm1', role: 'assistant', content: 'Hello ? how can I help today?' },
    { id: 'm2', role: 'user', content: 'Show me a minimalist grayscale chat UI.' },
    { id: 'm3', role: 'assistant', content: 'Done. Responsive and monochrome throughout.' },
  ]);
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  function handleSend() {
    const trimmed = draft.trim();
    if (!trimmed || isSending) return;

    const id = crypto.randomUUID();
    const userMsg: Message = { id, role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setDraft('');
    setIsSending(true);

    // Placeholder assistant response
    setTimeout(() => {
      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'This is a placeholder response in grayscale.',
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsSending(false);
    }, 600);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <main className="page">
      <section className="chat">
        <header className="chat__header">
          <div className="chat__brand">Monochrome Chat</div>
        </header>

        <div ref={listRef} className="chat__messages" aria-live="polite">
          {messages.map((m) => (
            <article key={m.id} className={m.role === 'user' ? 'bubble bubble--user' : 'bubble bubble--assistant'}>
              <div className="bubble__role" aria-label={m.role}>{m.role === 'user' ? 'You' : 'AI'}</div>
              <p className="bubble__content">{m.content}</p>
            </article>
          ))}
          {isSending && (
            <article className="bubble bubble--assistant">
              <div className="bubble__role">AI</div>
              <p className="bubble__content bubble__content--muted">Thinking?</p>
            </article>
          )}
        </div>

        <footer className="composer">
          <div className="composer__field">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Type a message?"
              rows={1}
              className="composer__textarea"
              aria-label="Message"
            />
            <button onClick={handleSend} disabled={!draft.trim() || isSending} className="composer__send" aria-label="Send">
              Send
            </button>
          </div>
          <div className="composer__hint">Press Enter to send ? Shift+Enter for newline</div>
        </footer>
      </section>

      <aside className="tools" aria-label="Tools panel">
        <div className="tools__header">Tools</div>
        <div className="tools__list">
          <div className="toolcard">
            <div className="toolcard__title">Search</div>
            <div className="toolcard__desc">Placeholder integration</div>
          </div>
          <div className="toolcard">
            <div className="toolcard__title">Web Browser</div>
            <div className="toolcard__desc">Placeholder integration</div>
          </div>
          <div className="toolcard">
            <div className="toolcard__title">Code Interpreter</div>
            <div className="toolcard__desc">Placeholder integration</div>
          </div>
        </div>
      </aside>
    </main>
  );
}
