import { useEffect } from "react";
import BookSearch from "./components/BookSearch";
import BookList from "./components/BookList";
import { useStore } from "./store";
// import BookDetailsModal from "./components/BookDetailsModal";

const App = () => {
  const { books, loadBooksFromLocalStorage, addBook, moveBook, removeBook } = useStore(
    (state) => state
  );

  useEffect(() => {
    loadBooksFromLocalStorage();
  }, [loadBooksFromLocalStorage]);

  return (
    <div className="container mx-auto">
      <BookSearch onAddBook={addBook} />
      <BookList books={books} onMoveBook={moveBook} onRemoveBook={removeBook} />
    </div>
  );
};

export default App;
