import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth-provider/AuthProvider";
import toast from "react-hot-toast";
import GoogleLogin from "../../../shared-components/social-login/googleLogin/GoogleLogin";
const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);
    const from = location?.state?.from || "/";
    const {emailPassLogin} = useContext(AuthContext);
    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        // login user 
        emailPassLogin(email, password)
        .then(userCredential => {
            const loggedUser = userCredential.user;
            toast.success("Login successfully !")
            navigate(from, {replace: true});
            console.log(loggedUser, "logged user");
        })
        .catch(err => {
            const errMessage = err.message;
            toast.error(errMessage);
            console.error(errMessage);
        })
    };
    return (
        <div className="mt-20 w-full max-w-2xl mx-auto">
            <h3 className="text-4xl font-bold">Please Login</h3>
            <form onSubmit={handleLogin} className="mt-7">
                <div>
                    <label htmlFor="email">Email</label>
                    <input className="mt-2 py-4 px-5 w-full border-[#BCBEC0] border rounded-3xl" placeholder="username@gmail.com" type="email" name="email" id="email" required/>
                </div>

                <div className="mt-8">
                    <label htmlFor="Password">Password</label>
                    <input className="mt-2 py-4 px-5 w-full border-[#BCBEC0] border rounded-3xl" placeholder="password" type="password" name="password" id="password" required/>
                </div>
                <button className="mt-10 py-3 font-bold text-xl bg-[#A93159] text-white w-full rounded-3xl">Login</button>
            </form>
            <p className="mt-11 text-center">or continue with</p>
            <div className="mt-4 text-center">
               <GoogleLogin/>
            </div>
            <p className="mt-8 text-center">Don&apos;t have an account yet? <Link to="/register" className="font-medium underline decoration-[#A93159]">Resiger</Link></p>
        </div>
    );
};

export default Login;