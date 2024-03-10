import { Helmet } from "react-helmet-async";
import Cover from "../../Home/Shared/Cover/Cover";
import menuImg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import soupImg from '../../../assets/menu/dessert-bg.jpeg'
import saladImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/dessert-bg.jpeg'
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";


const Menu = () => {
    const [menu] = useMenu();
    const dessert = menu && menu.filter(item => item.category === 'dessert')
    const soup = menu && menu.filter(item => item.category === 'soup')
    const salad = menu && menu.filter(item => item.category === 'salad')
    const pizza = menu && menu.filter(item => item.category === 'pizza')
    const offered = menu && menu.filter(item => item.category === 'offered')
    return (
        <div>
            <Helmet>
                <title>Bistro Boss || Menu</title>
            </Helmet>
            {/* Main section Cover */}
            <Cover img={menuImg} title={"Menu"}></Cover>
                <div className='max-w-screen-xl mx-auto'>
                    <SectionTitle heading={"Today's Offer"} subHeading={"Don't Miss"}></SectionTitle>
                </div>

                {/* Offered item */}
                <MenuCategory items={offered}></MenuCategory>
                {/* Dessert */}
                <MenuCategory items={dessert} title={"dessert"} img={dessertImg} ></MenuCategory>
                <MenuCategory items={soup} title={"soup"} img={soupImg} ></MenuCategory>
                <MenuCategory items={salad} title={"salad"} img={saladImg} ></MenuCategory>
                <MenuCategory items={pizza} title={"pizza"} img={pizzaImg} ></MenuCategory>
            

        </div>
    );
};

export default Menu;