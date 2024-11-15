import { FaGithub, FaLinkedin } from "react-icons/fa";
import './Footer.css';
import '/image1.jpeg';
import '/image2.jpg';
import '/image3.jpeg';
import '/image4.jpeg';


const Footer = () => {
    return (
    <div className="footer">
        <div className="footer-content">
            <div className="team-member-info">
                 <div className="member-image">
                      <img src="/image1.jpeg"/>
                 </div>
                 <div className="member-info">
                    Ryan Cerney
                    <div className='member-icons'>
                            <a target='_blank' rel="noreferrer" href='https://github.com/rcerney1' ><FaGithub /></a>
                            <a target='_blank' rel="noreferrer" href='#' ><FaLinkedin /></a>
                        </div>
                 </div>
            </div>
            <div className="team-member-info">
                 <div className="member-image">
                    <img src="/image4.jpeg"/>
                 </div>
                 <div className="member-info">
                    Zheng Zhao
                    <div className='member-icons'>
                            <a target='_blank' rel="noreferrer" href='https://github.com/KatttZ' ><FaGithub /></a>
                            <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/zheng-%EF%BC%88kat%EF%BC%89-zhao-5785ab149/' ><FaLinkedin /></a>
                        </div>
                 </div>
            </div>
            <div className="team-member-info">
                 <div className="member-image">
                    <img src='/image2.jpg'/>
                 </div>
                 <div className="member-info">
                    Gavin Campbell
                    <div className='member-icons'>
                            <a target='_blank' rel="noreferrer" href='https://github.com/gavinjcampbell83' ><FaGithub /></a>
                            <a target='_blank' rel="noreferrer" href='#' ><FaLinkedin /></a>
                        </div>
                 </div>
            </div>
            <div className="team-member-info">
                 <div className="member-image">
                     <img src='/image3.jpeg'/>
                 </div>
                 <div className="member-info">
                    Liudmila Umeslakkht
                    <div className='member-icons'>
                            <a target='_blank' rel="noreferrer" href='https://github.com/Mila7158' ><FaGithub /></a>
                            <a target='_blank' rel="noreferrer" href='#' ><FaLinkedin /></a>
                        </div>
                 </div>
            </div>
        </div>
    </div>
    )
}


export default Footer;