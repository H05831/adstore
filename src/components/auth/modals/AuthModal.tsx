"use client";

import React, { useCallback } from "react";
import { RiCloseLine } from "react-icons/ri";

interface AuthModalProps {
  body: React.ReactElement;
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ body, isOpen, onClose }: AuthModalProps) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="w-full h-full fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg flex flex-col items-center gap-6 relative">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-wider">
          ADSTORE
        </h2>
        <span
          className="absolute right-4 top-4 cursor-pointer hover:scale-90 transition-transform"
          onClick={handleClose}
        >
          <RiCloseLine size={24} />
        </span>
        {body}
      </div>
    </div>
  );
};

export default AuthModal;
