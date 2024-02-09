import { Button } from './ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Book } from '@/store';
import BookDetailsModal from './BookDetailsModal';
import { useState } from 'react';
// import { useStore } from '@/store';

interface BookListProps {
  books: Book[];
  onMoveBook: (book: Book, targetList: Book['status']) => void;
  onRemoveBook: (book: Book) => void;
}

const BookList = ({ books, onMoveBook, onRemoveBook }: BookListProps) => {

    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    //  const openDetailsModal = (book: Book) => {
    //  setSelectedBook(book);
    // };

    const closeDetailsModal = () => {
    setSelectedBook(null);
    };


  const renderBookItem = (book: Book, index: number, listType: string) => (
    <Card key={index}>
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>{book.author_name}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button variant="destructive" onClick={() => onRemoveBook(book)}>
          Remove
        </Button>
        <div className="inline-flex gap-2">
          <Button
            variant="outline"
            onClick={() => onMoveBook(book, 'inProgress')}
            disabled={listType === 'inProgress'}
          >
            In Progress
          </Button>
          <Button
            variant="outline"
            onClick={() => onMoveBook(book, 'backlog')}
            disabled={listType === 'backlog'}
          >
            Backlog
          </Button>
          <Button
            variant="outline"
            onClick={() => onMoveBook(book, 'done')}
            disabled={listType === 'done' || listType === 'inProgress'}
          >
            Done
          </Button>
        </div>
      </CardFooter>
    </Card>
  );

  return (
    <div className="space-y-8 p-4">
      <div className="mb-4 text-2xl font-bold">
        {books.filter((book) => book.status === 'inProgress').length > 0 && (
          <>
            <h3 className="mb-2 text-xl font-semibold">In Progress</h3>
            <div>
              {books
                .filter((book) => book.status === 'inProgress')
                .map((book, index) => renderBookItem(book, index, 'inProgress'))}
            </div>
          </>
        )}
        {books.filter((book) => book.status === 'backlog').length > 0 && (
          <>
            <h3 className="mb-2 text-xl font-semibold">Backlog</h3>
            <div>
              {books
                .filter((book) => book.status === 'backlog')
                .map((book, index) => renderBookItem(book, index, 'backlog'))}
            </div>
          </>
        )}
        {books.filter((book) => book.status === 'done').length > 0 && (
          <>
            <h3 className="mb-2 text-xl font-semibold">Done</h3>
            <div>
              {books
                .filter((book) => book.status === 'done')
                .map((book, index) => renderBookItem(book, index, 'done'))}
            </div>
          </>
        )}
        <div>
            <BookDetailsModal isOpen={true} onClose={closeDetailsModal} book={selectedBook} />
        </div>
      </div>
    </div>
  );
};

export default BookList;
