import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";
import { Link } from "react-router-dom";

const PopularMenu = () => {
    const [menu] = useMenu();
    const popularItems =menu && menu.filter(item => item.category === 'popular')
    console.log(menu)
    return (
        <div className="mb-12 flex flex-col justify-center ">
            <SectionTitle heading={"From Our Menu"} subHeading={"Popular Items "}></SectionTitle>
            <div className="w-11/12 mx-auto grid md:grid-cols-2 gap-10">
                {popularItems &&
                    popularItems.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>
                    )
                }
            </div>
            <button className="btn-brand1 mt-20 mx-auto">
                <Link to="/menu">View Full Menu</Link>
            </button>
            <div className="bg-black flex justify-center py-24 mt-24">
                <p className="text-4xl text-white text-center">Call Us: +88 0192345678910</p>
            </div>
        </div>
    );
};

export default PopularMenu;