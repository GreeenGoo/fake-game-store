type PopUpProps = {
  message: string
  onClose: () => void
}

export const Popup = ({ message, onClose }: PopUpProps) => {
  return (
    <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded shadow-lg">
      {message}
      <button onClick={onClose} className="ml-4 bg-red-500 p-1 rounded">
        X
      </button>
    </div>
  )
}
