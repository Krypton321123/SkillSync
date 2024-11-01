import {useNavigate} from 'react-router-dom';

export default function AppBarForAuth({children}) {
    const navigate = useNavigate();
    return(<>
        <div className="w-full h-full">
            <div className="flex w-full h-[10%] items-center border-y-2 justify-between p-4">
                <div className="logo w-[10%] h-full">
                    <span className="text-xl whitespace-nowrap">SkillSync</span>
                </div>
                <div>
                    <button onClick={(e) => {
                        e.preventDefault();
                        navigate('/signup');
                    }} className={"mr-5 border-2 p-[0.3rem] hover:bg-purpleBg rounded-md"}>Register
                    </button>

                    <button onClick={(e) => {
                        e.preventDefault();
                        navigate('/signin');
                    }} className={"border-2 p-[0.3rem] hover:bg-purpleBg"}>Login
                    </button>
                </div>
            </div>
            {children}
        </div>

        </>
    )
}