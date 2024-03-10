import { Parallax } from 'react-parallax';

const Cover = ({img , title}) => {
    return (
        <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage={img}
        bgImageAlt="Menu"
        strength={-200}
    >
        <div className="hero h-[700px]">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-lg bg-transparent px-16 py-10" style={{boxShadow: "rgba(0, 0, 0, 1) 0px 3px 8px"}}>
                    <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
                    <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
            </div>
        </div>
    </Parallax>
        
    );
};

export default Cover;