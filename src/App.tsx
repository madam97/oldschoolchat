import React, { useEffect, useRef, useState } from 'react';

function App() {

  /** @const {React.RefObject<HTMLTextAreaElement>} refInput Reference of the input field */
  const refInput = useRef<HTMLTextAreaElement>(null);

  /** @const {string} inputText That typed text */
  const [inputText, setInputText] = useState<string>('');

  /** @const {string[]} texts The already wrote texts */
  const [texts, setTexts] = useState<string[]>([]);

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

  /**
   * After pressing up Enter, saves a new line
   * @param e 
   */
  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.code.toLowerCase() === 'enter') {
      const newTexts = texts.slice();
      newTexts.push(inputText);
      setTexts(newTexts);

      setInputText('');
    }
  }

  // -----------------------------------------

  return (
    <main>
      <div className="background"></div>

      <div>
        <pre>{texts.join('')}</pre>
        <span>{inputText}</span>
      </div>
      <div className="text-shine">
        <pre>{texts.join('')}</pre>
        <span>{inputText}</span>
      </div>

      <textarea 
        ref={refInput} 
        value={inputText}
        onChange={handleType}
        onKeyUp={handleKeyUp}
      ></textarea>
    </main>
  );
}

export default App;
