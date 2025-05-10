import Image from "next/image";
import Link from "next/link";

const About = () => {
  const features = [
    {
      id: 1,
      title: "Shop With Confidence",
      description: "Every item sold goes through our proprietary multi-step Verification process, or comes directly from a Verified Seller who has met our rigorous standards for condition, safety, and security.",
      learnMore: true,
    },
    {
      id: 2,
      title: "Transparent Pricing",
      description: "Our real-time marketplace works just like the stock market allowing you to buy and sell the most coveted items at their true market price.",
    },
    {
      id: 3,
      title: "Global Access",
      description: "Whether it's pre-release, regionally limited, or \"sold out\" our millions of customers from over 200 countries allow you to easily secure those hard-to-find, coveted items.",
    },
    {
      id: 4,
      title: "No BS",
      description: "No chargebacks, no taking photos, no writing catchy descriptions, and no dealing with rogue buyers or sellers. We handle everything to make sure you can buy and sell with confidence.",
    },
    {
      id: 5,
      title: "Secure",
      description: "Preserving the integrity of our marketplace means putting a step ahead. Our security and fraud systems, powered by our world class partners, have your personal information covered 24/7.",
    },
    {
      id: 6,
      title: "Here For You",
      description: "Thanks to our Help Center, chatbot, and dedicated global-support staff, you can be sure that we're always available to answer any and every question regarding our marketplace.",
    },
  ];

  return (
    <div className="space-y-4 min-h-screen py-20 bg-slate-400"> 
      <div className="flex md:flex-row flex-col justify-around items-center p-10"> 
        <div> 
          <h1 className="text-5xl font-bold text-center"> 
            The Current Culture Marketplace 
          </h1> 
          <h2 className="text-gray-100 text-sm pt-5 max-w-full md:max-w-xl lg:max-w-2xl text-center md:text-left"> 
            Our mission is to provide access to the world is most coveted items 
            in the smartest way possible. Buy and sell the hottest sneakers, 
            apparel, electronics, collectibles, trading cards and accessories. 
          </h2> 
        </div> 

        <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:w-[600px] xl:w-[600px]"> 
          <Image 
            fill 
            alt="Store_Front" 
            src={"/images/about_us_cover.webp"} 
            quality={100} 
            className="object-cover rounded-md" 
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 600px"
          /> 
        </div> 
      </div> 

      <div className="bg-white py-16 rounded-t-3xl"> 
        <div className="container mx-auto px-4"> 
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose With Us</h2> 
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> 
            {features.map((feature) => ( 
              <div key={feature.id} className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"> 
                <div className="w-16 h-16 mb-4 relative"> 
                  {feature.id === 1 && ( 
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center"> 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /> 
                      </svg> 
                    </div> 
                  )} 
                  {feature.id === 2 && ( 
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center"> 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /> 
                      </svg> 
                    </div> 
                  )} 
                  {feature.id === 3 && ( 
                    <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center"> 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> 
                      </svg> 
                    </div> 
                  )} 
                  {feature.id === 4 && ( 
                    <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center"> 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /> 
                      </svg> 
                    </div> 
                  )} 
                  {feature.id === 5 && ( 
                    <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center"> 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /> 
                      </svg> 
                    </div> 
                  )} 
                  {feature.id === 6 && ( 
                    <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center"> 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /> 
                      </svg> 
                    </div> 
                  )} 
                </div> 
                
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3> 
                <p className="text-gray-600 mb-4">{feature.description}</p> 
                
                {feature.learnMore && ( 
                  <Link href="#" className="text-green-600 hover:text-green-700 font-medium"> 
                    Learn More 
                  </Link> 
                )} 
              </div> 
            ))} 
          </div> 
        </div> 
      </div>
    </div> 
  ); 
}; 

export default About;