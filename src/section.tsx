export default function Section({
  title,
  children
}: { title: string; children?: React.ReactNode }) {
    return (
      <section>
        <h2 className="text-center mb-1 border-b border-black/30 pb-1">{title}</h2>
        {children}
      </section>
    )
}
