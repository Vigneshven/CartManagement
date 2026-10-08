
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "Collection",
        link: "/"
    },
    {
        name: "Cart",
        link: "/"
    },
    {
        name: "Contact",
        link: "/"
    },
];


const menuItems = [
    {
        name: "Shops",
        link: "/"
    },
    {
        name: "Account",
        link: "/"
    }
];

const Header = () => {
    return (
        <div className="flex px-5 py-5  border-b border-gray-200 items-center">

            <ul className='md:flex gap-6 flex-1 hidden'>
                <MenuItem items={navItems} />

            </ul>
            <div className=' flex justify-center items-center'>

                <h1 className='text-2xl md:text-base' >Cart</h1>
            </div>

            <div className='flex-1 justify-end flex gap-6 items-center'>
                <ul className='flex gap-6'>

                    <MenuItem items={menuItems} />
                </ul>
                <Search className='text-gray-400 ' size={22} />

                <div className='w-9 h-9 rounded-full bg-blue-500 grid place-items-center text-white '>
                        <span className='text-sm'>MV</span>
                </div>

            </div>

        </div>
    )
}

export default Header



const MenuItem = function ({ items }) {
    return items.map((item) => (

        <li key={item.name}><Link to={item.link} className='hover:underline text-gray-400 font-medium hover:text-amber-600 ease-in'>{item.name}</Link></li>
    ))
} 