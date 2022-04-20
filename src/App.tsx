import React, { useEffect, useRef, useState } from 'react';

function App() {

  /** @const {React.RefObject<HTMLTextAreaElement>} refInput Reference of the input field */
  const refInput = useRef<HTMLTextAreaElement>(null);

  /** @const {string} inputText That typed text */
  const [inputText, setInputText] = useState<string>('');

  /** Prevents textarea to loose focus */
  useEffect(() => {
    if (refInput && refInput.current) {
      refInput.current.focus();

      refInput.current.onblur = () => {
        refInput.current?.focus();
      }
    }
  }, []);

  /**
   * Saves the typed text
   * @param e 
   */
  const handleType = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInputText(e.target.value);
  }

  // -----------------------------------------

  return (
    <main>
      <div className="background"></div>

      <div>
        <span>{inputText}</span>
      </div>
      <div className="text-shine">
        <span>{inputText}</span>
      </div>

      <textarea ref={refInput} onChange={handleType}></textarea>
    </main>
  );
}

export default App;
