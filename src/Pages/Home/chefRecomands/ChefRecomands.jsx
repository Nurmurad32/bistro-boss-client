import FoodCard from '../../../Components/FoodCard/FoodCard';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useMenu from '../../../hooks/useMenu';

const ChefRecomands = () => {
    const [menu] = useMenu();
    const recommandItems = menu && menu.filter(item => item.category === 'offered')

    return (
        <div className='my-16'>
            <SectionTitle heading={"CHEF RECOMMENDS"} subHeading={"Should Try"}></SectionTitle>
            <div className='grid md:grid-cols-3 gap-20 justify-center'>
                {recommandItems &&
                    recommandItems.slice(0, 3).map(item => <FoodCard
                        key={item._id}
                        item={item}
                    >
                    </FoodCard>)
                }
            </div>
        </div>
    );
};

export default ChefRecomands;