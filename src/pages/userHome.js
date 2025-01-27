import UserNavbar from "../components/userNavbar";
import UserProfile from "../components/userProfile";

export default function UserHome({ userData }) {
  const fname = userData.fname;
  const lname = userData.lname;
  const name = "Dr. " + lname + " " + fname;
  const title = userData.title + "   |   " + userData.hospital;
  return (
    <div classNme="container">
      <UserNavbar />
      <UserProfile
        email={userData.email}
        name={name}
        title={title}
        hospital={userData.hospital}
        phone={userData.phone}
      />
    </div>
   
  );
}
