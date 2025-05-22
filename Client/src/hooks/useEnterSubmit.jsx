import { useEffect } from "react";

const useEnterSubmit = (buttonId) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const submitButton = document.getElementById(buttonId);
        if (submitButton) {
          submitButton.click();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [buttonId]);
};

export default useEnterSubmit;
