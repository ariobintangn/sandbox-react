import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EditQuotePage from './pages/EditQuotePage';

function App() {
  const [counter, setCounter] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [quote, setQuote] = useState("");
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  const incrementCounter = () => {
    setCounter(counter + 1);

    if (counter + 1 === 3) {
      setShowPopup(true);
    }
  };

  const decrementCounter = () => {
    setCounter(counter - 1);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  

  const handleInputChange = (e) => {
    setQuote(e.target.value);
  };


  useEffect(() => {
    // Retrieve saved quotes from local storage on initial load
    const storedQuotes = JSON.parse(localStorage.getItem("quotes"));
    if (storedQuotes) {
      setSavedQuotes(storedQuotes);
    }
  }, []);

  

  const handleEditQuote = (index) => {
    setQuote(savedQuotes[index]);
    setEditingIndex(index);
  };

  const handleAddQuote = () => {
    if (quote.trim() !== '') {
      if (editingIndex === -1) {
        // Add a new quote to the list
        const updatedQuotes = [...savedQuotes, quote];
        setSavedQuotes(updatedQuotes);
        localStorage.setItem('quotes', JSON.stringify(updatedQuotes));
      } else {
        // Update an existing quote in the list
        const updatedQuotes = [...savedQuotes];
        updatedQuotes[editingIndex] = quote;
        setSavedQuotes(updatedQuotes);
        localStorage.setItem('quotes', JSON.stringify(updatedQuotes));
        setEditingIndex(-1); // Clear the editing state
      }

      setQuote(''); // Clear the input field after adding/updating
    }
    // const handleSaveQuote = (editedQuote) => {
    //   if (editingIndex !== -1) {
    //     const updatedQuotes = [...savedQuotes];
    //     updatedQuotes[editingIndex] = editedQuote;
    //     setSavedQuotes(updatedQuotes);
    //     localStorage.setItem('quotes', JSON.stringify(updatedQuotes));
    //     setEditingIndex(-1);
    //   }
    // };
  
    // const handleCancelEdit = () => {
    //   setEditingIndex(-1);
    // };
  };

  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <a className="bg-black">TESTING</a>
        <div>
          <input
            className="text-black"
            type="text"
            value={quote}
            onChange={handleInputChange}
          />
          <button
            className="bg-gray-500 text-black p-1 m-1"
            onClick={handleAddQuote}
          >
            add quote
          </button>
        </div>
        <div className="flex flex-row mt-20">
          <div className="bg-yellow-500">Counter</div>
          <div className="bg-green-500">Current Count: {counter}</div>
          <div>
            <button className="w-12 bg-green-800" onClick={incrementCounter}>
              +
            </button>
            <button className="w-12 bg-red-800" onClick={decrementCounter}>
              -
            </button>
          </div>
        </div>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={closePopup}>
                &times;
              </span>
              <img
                src="https://t3.ftcdn.net/jpg/02/95/44/22/360_F_295442295_OXsXOmLmqBUfZreTnGo9PREuAPSLQhff.jpg"
                alt="Pop-up Image"
              />
            </div>
          </div>
        )}

<div>
        <h2>Saved Quotes:</h2>
        {savedQuotes.map((quote, index) => (
          <div key={index} className="flex flex-row">
            <p>{quote}</p>
            <button onClick={() => handleEditQuote(index)} className="bg-gray-400 m-2">Edit</button>
          </div>
        ))}
        
      </div>
      <div>
          <h2>Saved Quotes 2:</h2>
          {savedQuotes.map((quote, index) => (
            <div key={index}>
              <p>
                <Link to={`/edit/${index}`}>{quote}</Link>
              </p>
              <button onClick={() => handleEditQuote(index)}>Edit</button>
            </div>
          ))}
        </div>
      </header>
      <Routes>
          <Route
            path="/edit/:index"
            element={
              <EditQuotePage
                quote={editingIndex !== -1 ? quote : ''}

              />
            }
          />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
