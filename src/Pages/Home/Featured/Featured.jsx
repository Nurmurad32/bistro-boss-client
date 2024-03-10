import SectionTitle from '../../../Components/SectionTitle/SectionTitle'
import featuredImg from '../../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {
    const divStyle = {
        background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1614030424754-24d0eebd46b2")',
    };

    return (
        <div className='featured-item bg-fixed text-white pt-8 my-20 '>
            <SectionTitle subHeading={"Check it Out"} heading={"Featured Item"}></SectionTitle>
            <div className='md:flex justify-center items-center p-5 z-10 md:pb-20 md:pt-12 md:px-36 relative'>
                {/* Dark overlay */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
                </div>

                {/* Image */}
                <div>
                    <img src={featuredImg} alt="" className='z-10'/>
                </div>
                <div className='md:ml-10 z-10 text-white '>
                    <p>Aug 20,2029</p>
                    <p className="uppercase text-white text-xl">Where can i get some?</p>
                    <p className='text-white'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis magnam quidem repudiandae, tenetur ipsam exercitationem nesciunt asperiores porro consectetur debitis, consequuntur quam. Temporibus veritatis error veniam totam nihil provident quia aut. Ducimus qui eos nulla magni itaque, ratione illo incidunt voluptatum eaque sequi commodi ad! Rem ipsam repellendus aliquid iure?</p>
                    <button className='btn-brand1 border-0 border-b-4 '>Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;