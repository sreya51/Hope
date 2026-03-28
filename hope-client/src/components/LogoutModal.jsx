import './LogoutModal.css'

function LogoutModal({ onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-icon">🕊️</div>
        <h2>Stay Safe Out There</h2>
        <p>You are leaving the Hope platform. Remember, help is always just one click away when you need it.</p>
        <div className="modal-buttons">
          <button className="stay-btn" onClick={onCancel}>Stay on Hope</button>
          <button className="leave-btn" onClick={onConfirm}>Log Out</button>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal