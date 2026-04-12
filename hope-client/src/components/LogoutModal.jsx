import './LogoutModal.css'

function LogoutModal({ onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-top">
          <div className="modal-top-bg"></div>
          <div className="modal-icon">🕊️</div>
          <h2>Stay Safe Out There</h2>
          <p>You are leaving the Hope platform. Remember, help is always just one click away when you need it.</p>
        </div>
        <div className="modal-bottom">
          <button className="stay-btn" onClick={onCancel}>Stay on Hope</button>
          <button className="leave-btn" onClick={onConfirm}>Log Out</button>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal