interface Props {
  id: string
  text: string
}

export default function AccessibleChartSummary({ id, text }: Props) {
  return (
    <p id={id} className="sr-only">
      {text}
    </p>
  )
}
