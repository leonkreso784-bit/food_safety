interface Props {
  dim?: boolean
}

export default function ThreeBackground({ dim = false }: Props) {
  return (
    <div className={`bg-canvas${dim ? " bg-canvas--dim" : ""}`}>
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-blob bg-blob-3" />
      <div className="bg-blob bg-blob-4" />
      <div className="bg-blob bg-blob-5" />
    </div>
  )
}

