import Cover from "../../Home/Shared/Cover/Cover";
import MenuItem from "../../Home/Shared/MenuItem/MenuItem";
import { Link } from "react-router-dom";

const MenuCategory = ({ items, title, img }) => {
    return (
        <div className="pt-8">
            {title && <Cover img={img} title={title}></Cover>}
            <div className='max-w-screen-xl mx-auto w-11/12 '>
                <div className="grid md:grid-cols-2 gap-10 my-16">
                    {items &&
                        items.map(item => <MenuItem
                            key={item._id}
                            item={item}
                        ></MenuItem>
                        )
                    }
                </div>
                <Link to={`/order/${title}`} className="flex justify-center mb-12">
                    <button className='btn-brand1 border-0 border-b-4  text-center'>ORDER YOUR FAVOURITE FOOD</button>
                </Link>
            </div>

        </div>
    );
};

export default MenuCategory;