import React from "react";
import { Book } from "@/store";

interface BookDetailsModalProps {
    isOpen:boolean;
    onClose?:() => void;
    book: Book | null;
}

const BookDetailsModal: React.FC<BookDetailsModalProps> = ({ isOpen, onClose, book }) => {
    if (!isOpen || !book) {
      return null;
    }
  
    return (
      <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-red p-6 max-w-md mx-auto rounded-md">
          <h2 className="text-xl font-semibold mb-4">{book.title}</h2>
          <p className="text-gray-600 mb-2">Author: {book.author_name.join(', ')}</p>
          <p className="text-gray-600 mb-2">Year: {book.first_publish_year}</p>
  
          <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
            Close
          </button>
        </div>
      </div>
    );
  };
  export default BookDetailsModal;