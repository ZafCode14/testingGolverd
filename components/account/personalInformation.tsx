import useAuthUser from "@/hooks/user";
import { useEffect, useState } from "react";
import EditAccount from "./editAccount";
import ChangePassword from "./changePassword";
import ResetPassword from "./resetPassword";
import DeleteAccount from "./deleteAccount";

function PersonalInformation() {
  const [editFirstName, setEditFirstName] = useState<boolean>(false);
  const [editLastName, setEditLastName] = useState<boolean>(false);
  const [editEmail, setEditEmail] = useState<boolean>(false);
  const [editPhone, setEditPhone] = useState<boolean>(false);
  const [resetPassword, setResetPassword] = useState<boolean>(false);
  const [savedInputs, setSavedInputs] = useState({
    firstName:  "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [inputs, setInputs] = useState({
    firstName:  "",
    lastName: "",
    email: "",
    phone: "",
  })

  const [theuser] = useAuthUser();
  const user = theuser;

  useEffect(() => {
    if (theuser) {
      setInputs({
        firstName: theuser.firstName || "",
        lastName: theuser.lastName || "",
        email: theuser.email || "",
        phone: theuser.phone || "",
      });
      setSavedInputs({
        firstName: theuser.firstName || "",
        lastName: theuser.lastName || "",
        email: theuser.email || "",
        phone: theuser.phone || "",
      })
    }
  }, [theuser]);

  if (!user) return;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!resetPassword) {
    return (
      <div className="relative w-full flex justify-center pb-24">
        <div className="w-[500px] lg:w-[1000px] max-w-full">
          <EditAccount
            statement={"First Name"}
            answer={savedInputs.firstName}
            edit={editFirstName}
            setEdit={setEditFirstName}
            editText={"Edit First name"}
            name={"firstName"}
            value={inputs.firstName}
            handleChange={handleChange}
            setSavedInputs={setSavedInputs}
            userId={user.id}
          />
          <EditAccount
            statement={"Last Name"}
            answer={savedInputs.lastName}
            edit={editLastName}
            setEdit={setEditLastName}
            editText={"Edit Last name"}
            name={"lastName"}
            value={inputs.lastName}
            handleChange={handleChange}
            setSavedInputs={setSavedInputs}
            userId={user.id}
          />
          <EditAccount
            statement={"Email Address"}
            answer={savedInputs.email}
            edit={editEmail}
            setEdit={setEditEmail}
            editText={"Change Email"}
            name={"email"}
            value={inputs.email}
            handleChange={handleChange}
            setSavedInputs={setSavedInputs}
            userId={user.id}
          />
          <EditAccount
            statement={"Phone Number"}
            answer={savedInputs.phone}
            edit={editPhone}
            setEdit={setEditPhone}
            editText={"Change Phone Number"}
            name={"phone"}
            value={inputs.phone}
            handleChange={handleChange}
            setSavedInputs={setSavedInputs}
            userId={user.id}
          />
          <ChangePassword
            setResetPassword={setResetPassword}
          />
          <DeleteAccount userId={user.id}/>
        </div>
      </div>
    );
  } else {
    return <ResetPassword setResetPassword={setResetPassword}/>
  }
}

export default PersonalInformation;