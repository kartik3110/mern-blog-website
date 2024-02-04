import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { SlLock } from "react-icons/sl";
import { useState } from "react";

export default function SignUp() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userValues = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userValues),
      });
      const errorData = await res.json();
      if (!res.ok) {
        throw new Error(errorData.err); // err comes from the server
      } else {
        // if the user is successfully created, redirect to the sign-in page
        navigate("/sign-in");
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };
  return (
    <div className="min-h-screen mt-6">
      <div className="flex-1">
        <div id="heading" className="text-3xl mb-6">
          <SlLock className="mx-auto mb-2" />
          <h1 className="text-center">Sign Up</h1>
        </div>
        {error && (
          <Alert
            className="my-5 max-w-sm mx-auto"
            color="failure"
            onDismiss={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-sm mx-auto"
        >
          <div>
            <Label value="Your username" />
            <TextInput
              type="text"
              placeholder="Username"
              id="username"
              name="username"
              required
            />
          </div>
          <div>
            <Label value="Your email" />
            <TextInput
              type="text"
              placeholder="name@company.com"
              id="email"
              name="email"
              required
            />
          </div>
          <div>
            <Label value="Your password" />
            <TextInput
              type="text"
              placeholder="Password"
              id="password"
              name="password"
              required
            />
          </div>
          <Button
            gradientDuoTone="purpleToPink"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner size="sm" /> <span className="pl-3"> Loading...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
          <Button gradientDuoTone="purpleToPink" type="submit" outline>
            Continue with Google
          </Button>
          <div className="flex gap-2 text-sm ">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500 mb-5">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
