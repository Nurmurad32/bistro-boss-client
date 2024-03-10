import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper";

import slider1 from '../../../assets/home/slide1.jpg'
import slider2 from '../../../assets/home/slide2.jpg'
import slider3 from '../../../assets/home/slide3.jpg'
import slider4 from '../../../assets/home/slide4.jpg'
import slider5 from '../../../assets/home/slide5.jpg'
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

import bg from "../../../assets/home/chef-service.jpg"

const Category = () => {
    return (
        <section>
            <SectionTitle
                subHeading={"From 11.00am to 10.00"}
                heading={"Order Online"}
            ></SectionTitle>
            {/* <Swiper
                slidesPerView={4}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-24"
            > */}
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                freeMode={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination]}
                className="mySwiper mb-24"
            >
                <SwiperSlide>
                    <div className="absolute">
                        <img src={slider1} alt="" />
                        <h3 className="relative sm:text-md md:text-3xl uppercase text-center text-white" style={{ marginTop: "-80px" }}>Salads</h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider2} alt="" />
                    <h3 className="relative sm:text-md md:text-3xl uppercase text-center text-white" style={{ marginTop: "-80px" }}>Soups</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider3} alt="" />
                    <h3 className="relative sm:text-md md:text-3xl uppercase text-center text-white" style={{ marginTop: "-80px" }}>Pizzas</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider4} alt="" />
                    <h3 className="relative sm:text-md md:text-3xl uppercase text-center text-white" style={{ marginTop: "-80px" }}>Deserts</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider5} alt="" />
                    <h3 className="relative sm:text-md md:text-3xl uppercase text-center text-white" style={{ marginTop: "-80px" }}>Salads</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider2} alt="" />
                    <h3 className="relative sm:text-md md:text-3xl uppercase text-center text-white" style={{ marginTop: "-80px" }}>Soups</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider3} alt="" />
                    <h3 className="relative sm:text-md md:text-3xl uppercase text-center text-white" style={{ marginTop: "-80px" }}>Pizzas</h3>
                </SwiperSlide>
            </Swiper>
            <div className="flex items-center" style={{ backgroundImage: `url(${bg})` }}>
                <div className="bg-white w-3/4 mx-auto m-12 p-3 md:py-16 md:px-36">
                    <h2 className="text-3xl text-center mb-2">Bistro Boss</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.</p>
                </div>
            </div>
        </section>
    );
};

export default Category;