import './header.css'
import {ReactComponent as Logo} from "./logo.svg"
import Icon from "../icons/Icon";
import logout from '../icons/icons8-logout-50.png';

const Header = (props) => {
    return <div className = "header">
        <div className = "headerCenter">
            <div className = "logo">
                <Logo/>
            </div>
            <nav>
                <div className={"headerButton"}
                    onClick={() => {
                        document.getElementsByClassName("addRequest")[0].style.display = 'flex';
                        document.getElementsByClassName("inspector")[0].style.filter = 'blur(4px)';
                    }}
                >
                    <Icon text={"Отпуск"} name={"holiday"} size={25} />
                </div>

                {/*<Icon text={"Настройки"} name={"settings"} size={22}/>*/}
                {/*<Icon text={""} name={"bell"} size={27}/>*/}
                <div className={"headerButton"}
                     style={{'flexDirection': 'column', 'position': 'relative'}}
                     onClick={() => {
                         document.getElementsByClassName('logout')[0].style.opacity = '1';
                     }}
                     onMouseLeave={() => {
                         document.getElementsByClassName('logout')[0].style.opacity = '0';
                     }}
                     >
                    <Icon text={props.name} name={"profile"} size={25}/>
                    <div className="logout" onClick={() => props.authorize(0)}>
                        <img src={logout} alt="" width={15} height={15}/>
                        <a href=""> Выход </a>
                    </div>
                </div>
            </nav>
        </div>
    </div>
}

export default Header;