
import style from './Title.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function Title({titleText, toggleContentVisibility, navigateTo}) {
  const icon = navigateTo?<FontAwesomeIcon icon={faArrowLeft} onClick={navigateTo} />:null
  return (
    <div className={style["title"]}>
      <div>{icon}</div>
      <span onClick={toggleContentVisibility} >{titleText}</span> 
      <div className={style['titleEnd']}></div> 
    </div>
  );
}

export default Title;
