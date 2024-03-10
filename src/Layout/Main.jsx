import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/Home/Shared/Footer/Footer';
import NavBar from '../Pages/Home/Shared/NavBar/NavBar';

const Main = () => {
    const location =  useLocation();

    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup') 
    return (
        <div>
            { noHeaderFooter || <NavBar></NavBar>}
            {/* className='max-w-screen-xl mx-auto' */}
            <Outlet></Outlet>
            { noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;