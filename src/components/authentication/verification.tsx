import "./styles/Verification.css"

type VerificationFormProps = {
  verificationCode: string
  isLoading: boolean
  handleSubmit: (e: React.FormEvent) => void
  handleVerificationChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClose: () => void
}

export default function VerificationForm({
  verificationCode,
  isLoading,
  handleSubmit,
  handleVerificationChange,
  onClose
}: VerificationFormProps) {
  return (
    <div className="verification-form-overlay">
      <div className="verification-form-container">
        <h2 className="verification-form-header">Verify Account</h2>
        <form onSubmit={handleSubmit} className="verification-form">
          <div className="verification-form-group">
            <label htmlFor="verificationCode" className="verification-form-label">
              Verification Code
            </label>
            <input
              id="verificationCode"
              type="text"
              value={verificationCode}
              onChange={handleVerificationChange}
              className="verification-form-input"
              required
            />
          </div>
          <div className="verification-form-submit-container">
            <button type="submit" className="verification-form-submit" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Submit"}
            </button>
          </div>
        </form>
        <button onClick={onClose} className="verification-form-cancel">
          Cancel
        </button>
      </div>
    </div>
  )
}
