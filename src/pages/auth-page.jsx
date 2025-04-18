import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { LoginForm, RegisterForm } from "@/components/auth/auth-forms";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const { user, isLoading } = useAuth();
  const [, navigate] = useLocation();
  const [isLogin, setIsLogin] = useState(true);

  // If user is already logged in, redirect to home page
  useEffect(() => {
    if (user && !isLoading) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Netflix Logo */}
      <header className="w-full p-6">
        <svg className="w-32 h-12" viewBox="0 0 1024 276.742" fill="#E50914">
          <path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
        </svg>
      </header>

      {/* Auth Content */}
      <div className="flex-1 flex">
        <div
          className="relative w-full min-h-screen flex items-center justify-center px-4 py-12 bg-black"
          style={{
            backgroundImage:
              "url(https://assets.nflxext.com/ffe/siteui/vlv3/77d35039-751f-4c3e-9c5d-a5c4e85812b3/604db567-e19e-4da4-86ac-fb7bec455a0e/CA-en-20231030-popsignuptwoweeks-perspective_alpha_website_large.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        >
          {/* Netflix-style overlay gradient */}
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(0deg, rgba(0,0,0,0.8) 0, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.9) 100%)",
            }}
          ></div>

          {/* Auth box */}
          <div className="relative z-10 w-full max-w-md">
            <div className="p-4 md:p-0">
              {isLogin ? <LoginForm /> : <RegisterForm />}

              <div className="mt-4 text-center bg-black bg-opacity-75 p-4 rounded-b-md">
                <p className="text-gray-400">
                  {isLogin ? "New to Netflix?" : "Already have an account?"}
                  <Button
                    variant="link"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-white font-medium ml-1"
                  >
                    {isLogin ? "Sign up now" : "Sign in"}
                  </Button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
