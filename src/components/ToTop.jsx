import { useEffect, useState } from 'react';
import { BiArrowToTop } from "react-icons/bi";


const ToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScrollButton = () => {
      window.pageYOffset > 300 ? setShowButton(true) : setShowButton(false);
    };

    window.addEventListener("scroll", handleScrollButton);

    return () => window.removeEventListener("scroll", handleScrollButton);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {showButton && (
        <button className="totop" onClick={handleClick} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
       <BiArrowToTop className="arrow"/>
        </button>
      )}
    </div>
  );
};

export default ToTop;