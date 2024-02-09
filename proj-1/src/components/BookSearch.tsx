import axios from 'axios';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  // TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Book, useStore } from '@/store';

export type SearchResults = {
  docs: Book[];
  numFound: number;
};

interface BookSearchProps {
  onAddBook: (newBook: Book) => void;
}

const BookSearch = ({ onAddBook }: BookSearchProps) => {
  const { books } = useStore((state) => state);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 50;



  const searchBooks = async (page: number = 1) => {
    if (!query) return;

    setIsLoading(true);
    try {
      const response = await axios.get<SearchResults>(
        `https://openlibrary.org/search.json?q=${query}&page=${page}&limit=${resultsPerPage}`,
      );

      setResults(response.data.docs);
      setTotalResults(response.data.numFound);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error Detected', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchBooks();
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      searchBooks(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const lastPage = Math.ceil(totalResults / resultsPerPage);
    if (currentPage < lastPage) {
      searchBooks(currentPage + 1);
    }
  };

  return (
    <div className="p-4">
      <div className="sm:max-w-xs">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={handleKeyPress}
          placeholder="Enter book title or author name..."
        />
      </div>

      <Button onClick={() => searchBooks()} disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </Button>

      <div className="mt-4 max-h-64 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="p-2">Title</TableCell>
              <TableCell className="p-2">Author</TableCell>
              <TableCell className="p-2">Year</TableCell>
              <TableCell className="p-2">Page Count</TableCell>
              <TableCell className="p-2">Add</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((book, index) => (
              <TableRow key={index}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author_name}</TableCell>
                <TableCell>{book.first_publish_year}</TableCell>
                <TableCell>{book.number_of_pages_median || ''}</TableCell>
                <TableCell>
                  <Button
                    variant="link"
                    onClick={() => {
                      onAddBook({
                        key: book.key,
                        title: book.title,
                        author_name: book.author_name,
                        first_publish_year: book.first_publish_year,
                        number_of_pages_median: book.number_of_pages_median || null,
                        status: 'backlog',
                      });
                    }}
                    disabled={books.some((b) => b.key === book.key)}
                  >
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePreviousPage}
          disabled={currentPage <= 1 || isLoading}
        >
          Previous
        </Button>
        <span className="text-gray-600">
          Page {currentPage} of {Math.ceil(totalResults / resultsPerPage)}
        </span>
        <Button
          variant="outline"
          onClick={handleNextPage}
          disabled={currentPage >= Math.ceil(totalResults / resultsPerPage) || isLoading}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default BookSearch;
