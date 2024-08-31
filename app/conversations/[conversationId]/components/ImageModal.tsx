"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  src
}) => {
  if (!src) {
    return null;
  }

  return ( 
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative">
        <Image
          alt="Image"
          src={src}
          layout="intrinsic"
          objectFit="contain"
          width={800}  // Default width, can be adjusted or dynamically calculated
          height={600} // Default height, can be adjusted or dynamically calculated
        />
      </div>
    </Modal>
  );
}
 
export default ImageModal;
