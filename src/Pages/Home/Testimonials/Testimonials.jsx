import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper";
import { useEffect, useState } from "react";
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import quote from "../../../assets/icon/Group.png"

const Testimonials = () => {
    const [reviews, setReviews] = useState();
    useEffect(() => {
        fetch("https://bistro-boss-server-sage-five.vercel.app/reviews")
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    console.log(reviews)
    return (
        <div>
            <SectionTitle heading={"Testimonials"} subHeading={"What Our Client Say"}></SectionTitle>
            <div>
                <Swiper
                    navigation={true}
                    modules={[Autoplay, Navigation]}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    className="mySwiper">
                    {reviews &&
                        reviews.map(review => <SwiperSlide
                            key={review._id}>
                            <div className="flex flex-col items-center mx-24 mt-6 mb-16">
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <img src={quote} alt="" className="my-3" />
                                <p className="py-8">{review.details || review?.review}</p>
                                <h3 className="text-2xl text-orange-400">{review.name}</h3>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;