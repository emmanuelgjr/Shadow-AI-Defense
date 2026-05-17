import { useStack } from './StackContext';

export default function StackBadge() {
  const [stack] = useStack();
  if (!stack) {
    return (
      <a
        href="/stack"
        className="badge-accent hover:bg-accent-100 transition-colors"
      >
        Pick your stack →
      </a>
    );
  }
  return (
    <a href="/stack" className="badge-accent hover:bg-accent-100 transition-colors">
      Stack: {stack} · change
    </a>
  );
}
