export default function Title({ question }) {
  if (!question) return null;
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold leading-snug pl-7">{question}</h1>
    </div>
  );
}