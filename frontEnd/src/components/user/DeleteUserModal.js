import { useState } from 'react';
import "../../styles/common.css";

function DeleteUserModal({ open, onClose, onDelete }) {
  if (!open) return null;

  return (
    <div
      className="modal-backdrop fade show"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)', // 배경만 블러
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="modal-content p-4 rounded shadow-lg"
        style={{
          maxWidth: 400,
          backgroundColor: '#ffffff', // ✅ 확실히 불투명한 흰색
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)', // 그림자 강조
        }}
      >
        <h5 className="modal-title mb-3">회원 탈퇴</h5>
        <p>
          정말 회원 탈퇴를 진행하시겠습니까?
          <br />
          모든 데이터가 삭제되며, 되돌릴 수 없습니다.
        </p>
        <div className="mt-4 d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>취소</button>
          <button className="btn btn-danger" onClick={onDelete}>탈퇴하기</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUserModal;