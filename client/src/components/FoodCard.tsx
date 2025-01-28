import { ArrowRight } from 'lucide-react';
import React from 'react';

import { Link } from 'react-router-dom';

const FoodCard: React.FC = () => {
  
    return (
        <div className=" flex flex-col items-center justify-center max-w-xs rounded overflow-hidden shadow-lg">
            <img
                src="/images/indianfood1.jpeg" // Replace with actual image URL
                alt="Indian Food"
                className="w-1/2 h-28 object-cover rounded-full"
            />
            <div className="px-6 py-4 text-center">
               
                <Link to='/search/india'  
                        className=" text-blue-500 font-bold  hover:text-blue-700 flex">
                        Indian Food <ArrowRight/>
                   
                </Link>
                
            </div>
        </div>
    );
};

export default FoodCard;
