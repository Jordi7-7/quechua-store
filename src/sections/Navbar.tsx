
import Logo from "../components/logo-kwaski";
import { SignOutButtonServer } from "../components/sign-out-button-server";

const Navbar: React.FC = () => {

    return (
        <nav className="bg-slate-700 flex flex-col justify-around items-center">
            <div className="flex justify-center">
                <Logo className="h-32" fill="white" />
            </div>
            <div className="flex flex-col justify-between mx-auto align-middle">
                <ul>
                    <li>Menu</li>
                    <li>Productos</li>
                </ul>
            </div>

            <div>
            <SignOutButtonServer />
            </div>
        </nav>
    )

};

export default Navbar;