import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { SlLock } from "react-icons/sl";

export default function SignUp() {
  return (
    <div className="min-h-screen mt-6">
      {/* <div className="flex p-3 max-w-screen mx-auto flex-col md:flex-row md:items-center gap-6"> */}
      <div className="flex-1">
        <div id="heading" className="text-3xl mb-6">
          <SlLock className="mx-auto mb-2" />
          <h1 className="text-center">Sign Up</h1>
        </div>
        <form className="flex flex-col gap-4 max-w-sm mx-auto">
          <div>
            <Label value="Your username" />
            <TextInput type="text" placeholder="Username" id="username" />
          </div>
          <div>
            <Label value="Your email" />
            <TextInput type="text" placeholder="name@company.com" id="email" />
          </div>
          <div>
            <Label value="Your password" />
            <TextInput type="text" placeholder="Password" id="password" />
          </div>
          <Button gradientDuoTone="purpleToPink" type="submit">
            Sign Up
          </Button>
          <Button gradientDuoTone="purpleToPink" type="submit" outline>
            Continue with Google
          </Button>
          <div className="flex gap-2 text-sm ">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </form>
      </div>
      {/* </div> */}
    </div>
  );
}
