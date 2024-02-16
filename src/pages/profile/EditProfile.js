import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import { selectUser } from "../../redux/features/auth/authSlice";
import "./Profile.css";
import { toast } from "react-toastify";
import { updateUser } from "../../services/authService";
import ChangePassword from "../../components/changePassword/ChangePassword";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const saveProfile = async (e) => {
  e.preventDefault();
  console.log("eee",e);

   setIsLoading(true);
    try {
      // Handle Image upload
      let imageURL;
      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "saveencloud");
        image.append("upload_preset", "zj3nwzh9");
                  
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/saveencloud/image/upload",
          { method: "post", body: image }
        );
        // const image = new FormData();
        // image.append("file", profileImage);
        // image.append("cloud_name", "saveencloud");
        // image.append("upload_preset", "wk66xdkq");

        // // First save image to cloudinary
        // const response = await fetch(
        //   "https://console.cloudinary.com/pm/c-b9bf2d5c08c1a623ece4d2151ae54a/media-explorer/upload",
        //   { method: "post", body: image }
        // );
        const imgData = await response.json();
        imageURL = imgData.url.toString();

        // Save Profile
        const formData = {
          name: profile.name,
          phone: profile.phone,
          bio: profile.bio,
          photo: profileImage ? imageURL : profile.photo,
        };

        const data = await updateUser(formData);
        console.log("data",data);
        toast.success("User updated");
        navigate("/profile");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  // const saveProfile = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     let imageURL;
  //     if (
  //       profileImage &&
  //       (profileImage.type === "image/jpeg" ||
  //         profileImage.type === "image/jpg" ||
  //         profileImage.type === "image/png")
  //     ) {
  //       const image = new FormData();
  //       image.append("file", profileImage);
  //       image.append("cloud_name", "saveencloud");
  //       image.append("upload_preset", "zj3nwzh9");
                  
  //       const response = await fetch(
  //         "https://api.cloudinary.com/v1_1/saveencloud/image/upload",
  //         { method: "post", body: image }
  //       );
  //       const imgData = await response.json();
  //       console.log("imgData:", imgData); // Add this line to check the structure of imgData
  //       imageURL = imgData.url.toString();
  
  //       const formData = {
  //         name: profile.name,
  //         phone: profile.phone,
  //         bio: profile.bio,
  //         photo: profileImage ? imageURL : profile.photo,
  //       };
  
  //       const data = await updateUser(formData);
  //       console.log("data", data);
        
  //       // Update the profile state with the new data
  //       setProfile({
  //         ...profile,
  //         name: formData.name,
  //         phone: formData.phone,
  //         bio: formData.bio,
  //         photo: formData.photo
  //       });
  
  //       toast.success("User updated");
  //       navigate("/profile");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  
  return (
    <div className="profile --my2">
      {isLoading && <Loader />}

      <Card cardClass={"card --flex-dir-column"}>
        <span className="profile-photo">
          <img src={user?.photo} alt="profilepic" />
        </span>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email:</label>
              <input type="text" name="email" value={profile?.email} disabled />
              <br />
              <code>Email cannot be changed.</code>
            </p>
            <p>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={profile?.phone}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Bio:</label>
              <textarea
                name="bio"
                value={profile?.bio}
                onChange={handleInputChange}
                cols="30"
                rows="10"
              ></textarea>
            </p>
            <p>
              <label>Photo:</label>
              <input type="file" name="image" onChange={handleImageChange} />
            </p>
            <div>
              <button type="submit" className="--btn --btn-primary">Edit Profile</button>
            </div>
          </span>
        </form>
       
      </Card>
   <br/>  <ChangePassword />
  
     
    </div>
  );
};

export default EditProfile;
