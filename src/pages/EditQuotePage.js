// EditQuotePage.js
import React, { useState } from 'react';

function EditQuotePage({ quote, onSave, onCancel }) {
  const [editedQuote, setEditedQuote] = useState(quote);

  const handleInputChange = (e) => {
    setEditedQuote(e.target.value);
  };

  const handleSave = () => {
    onSave(editedQuote);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div>
      <h1>Edit Quote</h1>
      <textarea
        rows="4"
        cols="50"
        value={editedQuote}
        onChange={handleInputChange}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default EditQuotePage;
