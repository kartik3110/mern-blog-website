import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { SlLock } from "react-icons/sl";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

export default function Signin() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userValues = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userValues),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.err); // err property comes from the custom error handler
      } else {
        // if the user is successfully signedin, redirect to the sign-in page
        console.log(data);
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };
  return (
    <div className="min-h-screen mt-10">
      <div className="flex-1">
        <div id="heading" className="text-3xl mb-6">
          <SlLock className="mx-auto mb-2" />
          <h1 className="text-center">Sign In</h1>
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
            <Label value="Your password" />
            <TextInput
              type="password"
              placeholder="********"
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
              "Sign In"
            )}
          </Button>
          <Button gradientDuoTone="purpleToPink" type="submit" outline>
            <FaGoogle className="pr-2 w-5 h-5" />
            Continue with Google
          </Button>
          <div className="flex gap-2 text-sm ">
            <span>Don't have an account?</span>
            <Link to="/sign-un" className="text-blue-500 mb-5">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
