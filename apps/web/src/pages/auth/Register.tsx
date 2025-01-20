import React from "react";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Formik, ErrorMessage } from "formik";
import AppFormField from "@/components/common/appInputs/AppFormField";
import { FcGoogle } from "react-icons/fc";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { AppState, useAppDispatch, useAppSelector } from "@/store/store";
import { registerUser } from "@/store/actions/authActions";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loading } from "@/components/common/Loading";
import AuthLayout from "@/layout/AuthLayout";

interface initialValues {
  email: string;
  company: string;
  category: string;
  role: "operator" | "receptionist";
  phone?: string;
  username: string;
  password: string;
}

// Define your initial values and validation schema
const initialValues: initialValues = {
  email: "",
  company: "",
  category: "Health care products/services",
  role: "operator",
  phone: "",
  username: "",
  password: "",
};

// Validation schema with Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("email address is required"),
  company: Yup.string().required("company name is required"),
  category: Yup.string().required("category is required"),
  role: Yup.mixed<initialValues["role"]>()
    .oneOf(["operator", "receptionist"])
    .required("role is required"),
  phone: Yup.string(),
  username: Yup.string().required("username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("password is required"),
});

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuthenticating } = useAppSelector((state: AppState) => state.auth);

  const handleSubmit = async (values: initialValues) => {
    // Dispatch the register thunk
    const resultAction = await dispatch(registerUser(values));

    // Handle successful Register
    if (registerUser.fulfilled.match(resultAction)) {
      const successMessage =
        resultAction.payload?.message || "Register successful!";
      toast.success(successMessage);
      navigate("/");
    }

    // Handle rejected login
    if (registerUser.rejected.match(resultAction)) {
      toast.error(resultAction.payload as string);
    }
  };

  return (
    <AuthLayout title="Register" description="Enter Credential to create account" >
  <div className="flex w-full items-center justify-center  md:p-5 p-[5px]">
    <div className=" w-full  shadow-sm">

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <>
              {/* Email Field */}
              <div className="mb-1">
                <AppFormField
                
                  className="h-[54px]"name="email" type="email" placeholder="Email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Username Field */}
              <div className="mb-1">
                <AppFormField

                  className="h-[54px]"
                  name="company"
                  type="text"
                  placeholder="Company Name"
                />
                <ErrorMessage
                  name="company"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Category Field */}
              <div className="mb-1">
                <label className="text-sm">Category</label>
                <Select
                  defaultValue={values["category"]}
                  onValueChange={(value) => setFieldValue("category", value)}
                >
                  <SelectTrigger className="w-full h-[54px] mt-1 border-[#BDBDBD] focus-within:border-[#918EF4]">
                    <SelectValue placeholder={"Select the category"} />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      <SelectItem value="Health care products/services">
                        Health care products/services
                      </SelectItem>
                      <SelectItem value="Construction Materials/Service">
                        Construction Materials/Service
                      </SelectItem>
                      <SelectItem value="Food, Beverage & Home Accessories">
                        Food, Beverage & Home Accessories
                      </SelectItem>
                      <SelectItem value="Stationaries & School supplies">
                        Stationaries & School supplies
                      </SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Role Field */}
              <div className="mb-1">
                <label className="text-sm">Role</label>
                <Select
                  defaultValue={values["role"]}
                  onValueChange={(value) => setFieldValue("role", value)}
                >
                  <SelectTrigger className="w-full h-[54px] mt-1 border-[#BDBDBD] focus-within:border-[#918EF4]">
                    <SelectValue placeholder={values["role"]} />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      <SelectItem value="operator">Retail</SelectItem>
                      <SelectItem value="receptionist">Wholesale</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Phone Field */}
              <div className="mb-1">
                <AppFormField

                  className="h-[54px]"
                  name="phone"
                  type="phone"
                  placeholder="Phone (Optional)"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Username Field */}
              <div className="mb-1">
                <AppFormField

                  className="h-[54px]"
                  name="username"
                  type="text"
                  placeholder="Username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Password Field */}
              <div className="mb-1">
                <AppFormField

                  className="h-[54px]"
                
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Submit Button */}
              <Button
                
                type="button"
                
                disabled={isAuthenticating}
                onClick={() => handleSubmit()}
                className="w-full h-[54px] bg-blue-500  hover:bg-blue-400 text-white rounded-lg mt-3"
              >
                {isAuthenticating ? <Loading size={25} /> : "Register"}
              </Button>
              <h2 className="flex items-center gap-1 justify-end w-full text-[18px] font-normal mt-2">
                <span>already have an account? </span>
                <Link to={"/auth/login"} className="text-blue-600"> 
                  sign in
                </Link>
              </h2>
            </>
          )}
        </Formik>
        <div className=" w-full pt-5 flex items-center justify-between gap-3">
          <Separator className="w-[45%] bg-gray-200" />
          <h2 className="text-sm text-gray-400">Or</h2>
          <Separator className="w-[45%] bg-gray-200" />
        </div>
        <div className="py-3">
          <Button className="flex h-[54px] items-center justify-center gap-2 w-full rounded-lg border border-gray-200">
            <FcGoogle fontSize={24} />
            <h2 className="text-sm font-medium text-gray-700">
              Sign up with Google
            </h2>
          </Button>
        </div>
      </div>
    </div>
    </AuthLayout>
  
  );
};

export default Register;
